// Outils côté serveur (rendu des pages).
import { getCollection } from 'astro:content';
import { CUISINES } from '../data/cuisines.js';
import { formater } from './quantites.js';
import { textesCalcul } from './entrecote.js';

export async function toutesLesRecettes() {
  const recettes = await getCollection('recettes');
  return recettes.sort((a, b) => a.data.titre.localeCompare(b.data.titre, 'fr'));
}

/** Les recettes affichées dans les sommaires : les variantes sont rangées sous leur recette principale. */
export async function recettesListees() {
  return (await toutesLesRecettes()).filter((r) => !r.data.varianteDe);
}

export function parCuisine(recettes) {
  return CUISINES.map((c) => ({ ...c, recettes: recettes.filter((r) => r.data.cuisine === c.slug) })).filter(
    (c) => c.recettes.length,
  );
}

/** Lien interne qui respecte le `base` d'Astro (utile si le site est publié dans un sous-dossier). */
export function lien(chemin = '') {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return base + chemin.replace(/^\//, '');
}

export function portionsDefaut(r) {
  return r.portions.defaut ?? r.portions.base;
}

/** Durée totale, pour la liste des recettes. */
export function dureeTotale(temps) {
  return (temps.preparation || 0) + (temps.cuisson || 0);
}

const echapper = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function trouverIngredient(recette, cle) {
  for (const g of recette.ingredients) for (const it of g.items) if (it.cle === cle) return it;
  return null;
}

/**
 * Texte d'étape → HTML. {cle} devient la quantité de l'ingrédient (mise à jour avec les portions),
 * {@face} etc. devient un résultat du calculateur de cuisson.
 */
export function etapeEnHtml(texte, recette, slug) {
  const facteur = portionsDefaut(recette) / recette.portions.base;
  const calc = textesCalcul(3, 'saignant');
  return echapper(texte).replace(/\{(@?)([a-z]+)\}/g, (_, arobase, cle) => {
    if (arobase) {
      if (!(cle in calc)) throw new Error(`${slug} : résultat de calcul inconnu {@${cle}}`);
      return `<span class="calc" data-calc="${cle}">${calc[cle]}</span>`;
    }
    const it = trouverIngredient(recette, cle);
    if (!it || it.qte == null) throw new Error(`${slug} : ingrédient {${cle}} introuvable ou sans quantité`);
    const u = it.unite || 'piece';
    return `<span class="qte" data-q="${it.qte}" data-u="${u}">${formater(it.qte * facteur, u)}</span>`;
  });
}

/** Notes : paragraphes séparés par une ligne vide, lignes « - » en liste. */
export function noteEnHtml(texte) {
  return texte
    .trim()
    .split(/\n\s*\n/)
    .map((bloc) => {
      const lignes = bloc.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lignes.every((l) => l.startsWith('- '))) {
        return `<ul>${lignes.map((l) => `<li>${echapper(l.slice(2))}</li>`).join('')}</ul>`;
      }
      return `<p>${echapper(lignes.join(' '))}</p>`;
    })
    .join('');
}

/** Données minimales envoyées au navigateur pour les listes de courses. */
export function donneesClient(entree) {
  const r = entree.data;
  return {
    slug: entree.id,
    titre: r.titre,
    portions: r.portions,
    ingredients: r.ingredients,
  };
}

/** Temps total de la version simple, pour les petites fiches d'accompagnement. */
export function dureeSimple(r) {
  return dureeTotale(r.data.simple.temps);
}
