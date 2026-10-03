// Temps de cuisson de l'entrecôte : les formules de la feuille « Entrecote » du fichier Excel.

export const CUISSONS = {
  bleu: { nom: 'Bleu', face: (e) => Math.min(2, 0.5 + 0.4 * e), repos: 2, coeur: '45 à 50 °C' },
  saignant: { nom: 'Saignant', face: (e) => Math.min(3, 0.8 + 0.6 * e), repos: 3, coeur: '52 à 55 °C' },
  'a-point': { nom: 'À point', face: (e) => Math.min(4, 1 + 0.8 * e), repos: 3, coeur: '58 à 60 °C' },
  'bien-cuit': { nom: 'Bien cuit', face: (e) => Math.min(5, 1.5 + 1 * e), repos: 3, coeur: '65 °C et plus' },
};

// Temps d'arrosage au beurre (« sauçage » dans le fichier).
export const ARROSAGE = 1.5;

export function calculer(epaisseur, cuisson) {
  const c = CUISSONS[cuisson] || CUISSONS.saignant;
  const face = c.face(epaisseur);
  return {
    face,
    saisie: face * 2,
    arrosage: ARROSAGE,
    repos: c.repos,
    total: face * 2 + ARROSAGE + c.repos,
    coeur: c.coeur,
  };
}

/** 2,6 → « 2 min 30 » (arrondi au quart de minute). */
export function minSec(min) {
  const s = Math.round((min * 60) / 15) * 15;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (!m) return `${r} s`;
  return r ? `${m} min ${String(r).padStart(2, '0')}` : `${m} min`;
}

export function textesCalcul(epaisseur, cuisson) {
  const r = calculer(epaisseur, cuisson);
  return {
    face: minSec(r.face),
    saisie: minSec(r.saisie),
    arrosage: minSec(r.arrosage),
    repos: minSec(r.repos),
    total: minSec(r.total),
    coeur: r.coeur,
  };
}
