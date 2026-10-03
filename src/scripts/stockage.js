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

export function ajouterRecette(slug, portions, mode) {
  const liste = lireListe();
  const existante = liste.recettes.find((r) => r.slug === slug);
  if (existante) Object.assign(existante, { portions, mode });
  else liste.recettes.push({ slug, portions, mode });
  ecrireListe(liste);
}

export function dansLaListe(slug) {
  return lireListe().recettes.find((r) => r.slug === slug) || null;
}

export function nombreDansLaListe() {
  const l = lireListe();
  return l.recettes.length + l.extras.length;
}
