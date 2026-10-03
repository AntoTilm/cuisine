// Page « Ma liste de courses » : toutes les recettes ajoutées, fusionnées par rayon.
import { lignesRecette, fusionner, parRayon, texteQuantite, enTexte } from '../lib/courses.js';
import { lireListe, ecrireListe } from './stockage.js';

const racine = document.getElementById('liste-courses');
if (racine) {
  const recettes = JSON.parse(document.getElementById('donnees-recettes').textContent);
  const parSlug = new Map(recettes.map((r) => [r.slug, r]));
  const base = racine.dataset.base;

  const zoneRecettes = document.getElementById('liste-recettes');
  const zoneArticles = document.getElementById('liste-articles');
  const vide = document.getElementById('liste-vide');
  const pleine = document.getElementById('liste-pleine');
  const formExtra = document.getElementById('ajout-extra');
  const champExtra = document.getElementById('extra');

  const el = (tag, cls, texte) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texte != null) e.textContent = texte;
    return e;
  };

  function sauver(liste) {
    ecrireListe(liste);
    rendre();
  }

  function ligneRecette(entree, r, liste) {
    const li = el('li', 'recette-liste');
    const a = el('a', 'titre', r.titre);
    a.href = `${base}recette/${r.slug}/?mode=${entree.mode}&p=${entree.portions}`;

    const reglages = el('div', 'reglages-ligne');

    const pas = r.portions.pas || 1;
    const min = r.portions.min || pas;
    const portions = el('div', 'compteur');
    const moins = el('button', 'rond', '−');
    moins.type = 'button';
    moins.setAttribute('aria-label', `Moins de ${r.portions.pluriel} pour ${r.titre}`);
    const valeur = el('span', 'valeur', `${entree.portions} ${entree.portions >= 2 ? r.portions.pluriel : r.portions.unite}`);
    const plus = el('button', 'rond', '+');
    plus.type = 'button';
    plus.setAttribute('aria-label', `Plus de ${r.portions.pluriel} pour ${r.titre}`);
    moins.addEventListener('click', () => {
      entree.portions = Math.max(min, entree.portions - pas);
      sauver(liste);
    });
    plus.addEventListener('click', () => {
      entree.portions += pas;
      sauver(liste);
    });
    portions.append(moins, valeur, plus);

    const choix = el('select', 'choix-mode');
    choix.setAttribute('aria-label', `Version de ${r.titre}`);
    [['simple', 'Simple'], ['chef', 'Grande cuisine']].forEach(([v, t]) => {
      const o = el('option', null, t);
      o.value = v;
      o.selected = entree.mode === v;
      choix.append(o);
    });
    choix.addEventListener('change', () => {
      entree.mode = choix.value;
      sauver(liste);
    });

    const retirer = el('button', 'lien-discret', 'Retirer');
    retirer.type = 'button';
    retirer.addEventListener('click', () => {
      liste.recettes = liste.recettes.filter((x) => x !== entree);
      sauver(liste);
    });

    reglages.append(portions, choix, retirer);
    li.append(a, reglages);
    return li;
  }

  function rendre() {
    const liste = lireListe();
    // Recettes supprimées du site depuis : on les ignore.
    liste.recettes = liste.recettes.filter((e) => parSlug.has(e.slug));

    const rien = !liste.recettes.length && !liste.extras.length;
    vide.hidden = !rien;
    pleine.hidden = rien;
    if (rien) return;

    zoneRecettes.replaceChildren(...liste.recettes.map((e) => ligneRecette(e, parSlug.get(e.slug), liste)));

    const lignes = liste.recettes.flatMap((e) => lignesRecette(parSlug.get(e.slug), e.portions, e.mode));
    const rayons = parRayon(fusionner(lignes));
    if (liste.extras.length) {
      let divers = rayons.find((r) => r.id === 'divers');
      if (!divers) {
        divers = { id: 'divers', nom: 'Ajouts à la main', items: [] };
        const iPlacard = rayons.findIndex((r) => r.id === 'placard');
        rayons.splice(iPlacard === -1 ? rayons.length : iPlacard, 0, divers);
      }
      liste.extras.forEach((x) => divers.items.push({ nom: x.nom, cleFusion: `extra:${x.id}`, q: null, recettes: [], extra: x.id }));
    }

    zoneArticles.replaceChildren(
      ...rayons.map((r) => {
        const bloc = el('section', 'rayon');
        bloc.append(el('h3', null, r.nom));
        const ul = el('ul');
        r.items.forEach((i) => {
          const li = el('li', 'article');
          const id = `art-${i.cleFusion.replace(/[^a-z0-9]/gi, '-')}`;
          const cb = el('input');
          cb.type = 'checkbox';
          cb.id = id;
          cb.checked = !!liste.coches[i.cleFusion];
          cb.addEventListener('change', () => {
            if (cb.checked) liste.coches[i.cleFusion] = true;
            else delete liste.coches[i.cleFusion];
            ecrireListe(liste);
            li.classList.toggle('coche', cb.checked);
          });
          const label = el('label');
          label.htmlFor = id;
          label.append(el('span', 'nom', i.nom + (i.optionnel ? ' (facultatif)' : '')));
          if (i.recettes.length) label.append(el('span', 'pour', i.recettes.join(', ')));
          const q = el('span', 'quantite', texteQuantite(i));
          li.append(cb, label, q);
          if (i.extra) {
            const x = el('button', 'lien-discret', 'Retirer');
            x.type = 'button';
            x.setAttribute('aria-label', `Retirer ${i.nom}`);
            x.addEventListener('click', () => {
              liste.extras = liste.extras.filter((e) => e.id !== i.extra);
              delete liste.coches[i.cleFusion];
              sauver(liste);
            });
            li.append(x);
          }
          li.classList.toggle('coche', cb.checked);
          ul.append(li);
        });
        bloc.append(ul);
        return bloc;
      }),
    );
    zoneArticles.dataset.texte = enTexte(rayons, 'Liste de courses');
  }

  formExtra.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const nom = champExtra.value.trim();
    if (!nom) return;
    const liste = lireListe();
    liste.extras.push({ id: Date.now().toString(36), nom });
    champExtra.value = '';
    sauver(liste);
  });

  document.getElementById('copier-liste').addEventListener('click', async (ev) => {
    const b = ev.currentTarget;
    const texte = zoneArticles.dataset.texte || '';
    try {
      if (navigator.share && matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ title: 'Liste de courses', text: texte });
        return;
      }
      await navigator.clipboard.writeText(texte);
      b.textContent = 'Liste copiée';
    } catch {
      b.textContent = 'Copie impossible ici';
    }
    setTimeout(() => (b.textContent = 'Copier ou partager la liste'), 2500);
  });

  document.getElementById('decocher').addEventListener('click', () => {
    const liste = lireListe();
    liste.coches = {};
    sauver(liste);
  });

  const vider = document.getElementById('vider');
  let arme = null;
  vider.addEventListener('click', () => {
    if (arme) {
      clearTimeout(arme);
      arme = null;
      vider.textContent = 'Vider la liste';
      vider.classList.remove('arme');
      sauver({ recettes: [], coches: {}, extras: [] });
      return;
    }
    vider.textContent = 'Toucher encore pour tout effacer';
    vider.classList.add('arme');
    arme = setTimeout(() => {
      arme = null;
      vider.textContent = 'Vider la liste';
      vider.classList.remove('arme');
    }, 4000);
  });

  window.addEventListener('storage', rendre);
  rendre();
}
