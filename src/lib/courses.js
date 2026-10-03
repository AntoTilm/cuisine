// Construction des listes de courses : une recette, ou plusieurs recettes fusionnées.
import { normaliser, famille, formater, quantiteAchat } from './quantites.js';
import { rayonDe, sansAccents, RAYONS } from './rayons.js';

/** Clé de fusion : « Oignons rouges » et « oignon rouge » donnent la même clé. */
export function cleNom(nom) {
  return sansAccents(nom)
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z0-9' -]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((m) => (m.length > 3 && m.endsWith('s') ? m.slice(0, -1) : m))
    .join(' ');
}

const estEau = (nom) => /^eau\b/.test(sansAccents(nom));

/** Ingrédients visibles pour un mode donné, groupe par groupe. */
export function ingredientsDuMode(recette, mode) {
  return recette.ingredients
    .filter((g) => !g.mode || g.mode === mode)
    .map((g) => ({ ...g, items: g.items.filter((it) => !it.mode || it.mode === mode) }))
    .filter((g) => g.items.length);
}

/** Lignes brutes à acheter pour une recette, mises à l'échelle. */
export function lignesRecette(recette, portions, mode) {
  const facteur = portions / recette.portions.base;
  const lignes = [];
  for (const groupe of ingredientsDuMode(recette, mode)) {
    for (const it of groupe.items) {
      if (it.maison || estEau(it.nom)) continue;
      const unite = it.unite || 'piece';
      const n = it.qte != null ? normaliser(it.qte * facteur, unite) : null;
      lignes.push({
        nom: it.nom,
        cle: cleNom(it.nom),
        q: n ? n.q : null,
        u: n ? n.u : famille(unite),
        rayon: it.rayon || rayonDe(it.nom),
        optionnel: !!it.optionnel,
        recette: recette.titre,
      });
    }
  }
  return lignes;
}

/** Additionne les lignes identiques (même nom, même famille d'unité). */
export function fusionner(lignes) {
  const parCle = new Map();
  for (const l of lignes) {
    const cle = `${l.cle}|${l.u}`;
    const ex = parCle.get(cle);
    if (!ex) {
      parCle.set(cle, { ...l, cleFusion: cle, recettes: new Set([l.recette]) });
      continue;
    }
    ex.recettes.add(l.recette);
    if (l.q != null) ex.q = (ex.q || 0) + l.q;
    ex.optionnel = ex.optionnel && l.optionnel;
  }
  // « Sel » sans quantité + « Sel 2 pincées » : on garde une seule ligne.
  const resultat = [];
  for (const item of parCle.values()) {
    if (item.q == null) {
      const autre = [...parCle.values()].find((x) => x !== item && x.cle === item.cle && x.q != null);
      if (autre) {
        item.recettes.forEach((r) => autre.recettes.add(r));
        continue;
      }
    }
    resultat.push(item);
  }
  return resultat.map((x) => ({ ...x, recettes: [...x.recettes] }));
}

/** Regroupe par rayon, dans l'ordre du magasin. */
export function parRayon(items) {
  return RAYONS.map((r) => ({
    ...r,
    items: items
      .filter((i) => i.rayon === r.id)
      .sort((a, b) => a.nom.localeCompare(b.nom, 'fr')),
  })).filter((r) => r.items.length);
}

export function texteQuantite(item) {
  if (item.q == null) return '';
  return formater(quantiteAchat(item.q, item.u), item.u);
}

/** Version texte, pour copier dans un message ou une note. */
export function enTexte(rayons, titre) {
  const lignes = [titre, ''];
  for (const r of rayons) {
    lignes.push(r.nom);
    for (const i of r.items) {
      const q = texteQuantite(i);
      lignes.push(`- ${i.nom}${q ? ` : ${q}` : ''}${i.optionnel ? ' (facultatif)' : ''}`);
    }
    lignes.push('');
  }
  return lignes.join('\n').trim();
}
