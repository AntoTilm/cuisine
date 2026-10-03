// Mémoire du navigateur : mode préféré et liste de courses.
// Tout est protégé : en navigation privée, le stockage peut être indisponible.

const CLE_LISTE = 'carnet:liste';
const CLE_MODE = 'carnet:mode';

function lire(cle, defaut) {
  try {
    const v = localStorage.getItem(cle);
    return v ? JSON.parse(v) : defaut;
  } catch {
    return defaut;
  }
}

function ecrire(cle, valeur) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    /* stockage indisponible : on continue sans mémoriser */
  }
}

export function modePrefere() {
  const m = lire(CLE_MODE, 'simple');
  return m === 'chef' ? 'chef' : 'simple';
}

export function memoriserMode(mode) {
  ecrire(CLE_MODE, mode);
}

export function lireListe() {
  const l = lire(CLE_LISTE, null) || {};
  return {
    recettes: Array.isArray(l.recettes) ? l.recettes : [],
    coches: l.coches && typeof l.coches === 'object' ? l.coches : {},
    extras: Array.isArray(l.extras) ? l.extras : [],
  };
}

export function ecrireListe(liste) {
  ecrire(CLE_LISTE, liste);
  window.dispatchEvent(new CustomEvent('carnet:liste'));
}

/**
 * Ajoute (ou met à jour) une recette dans la liste. `avec` : les accompagnements choisis
 * ({ slug, portions }), rangés sous le plat ; ceux d'un ajout précédent sont remplacés.
 */
export function ajouterRecette(slug, portions, mode, avec = []) {
  const liste = lireListe();
  liste.recettes = liste.recettes.filter((r) => r.pour !== slug);
  const existante = liste.recettes.find((r) => r.slug === slug && !r.pour);
  if (existante) Object.assign(existante, { portions, mode, avec: avec.map((a) => a.slug) });
  else liste.recettes.push({ slug, portions, mode, avec: avec.map((a) => a.slug) });
  const i = liste.recettes.findIndex((r) => r.slug === slug && !r.pour);
  liste.recettes.splice(i + 1, 0, ...avec.map((a) => ({ slug: a.slug, portions: a.portions, mode, pour: slug })));
  ecrireListe(liste);
}

export function dansLaListe(slug) {
  return lireListe().recettes.find((r) => r.slug === slug && !r.pour) || null;
}

export function nombreDansLaListe() {
  const l = lireListe();
  return l.recettes.length + l.extras.length;
}
