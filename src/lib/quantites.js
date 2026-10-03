// Mise à l'échelle et affichage des quantités.
// Partagé entre le rendu des pages (Astro) et les scripts du navigateur.

const MASSES = { g: 1, kg: 1000 };
const VOLUMES = { ml: 1, cl: 10, dl: 100, l: 1000 };

// Unités comptées : [singulier, pluriel]. Une chaîne vide = pas d'unité affichée (« 2 » oignons).
export const LIBELLES = {
  piece: ['', ''],
  cs: ['c. à soupe', 'c. à soupe'],
  cc: ['c. à café', 'c. à café'],
  pincee: ['pincée', 'pincées'],
  gousse: ['gousse', 'gousses'],
  tranche: ['tranche', 'tranches'],
  bouquet: ['bouquet', 'bouquets'],
  botte: ['botte', 'bottes'],
  brin: ['brin', 'brins'],
  branche: ['branche', 'branches'],
  feuille: ['feuille', 'feuilles'],
  cm: ['cm', 'cm'],
  boite: ['boîte', 'boîtes'],
  sachet: ['sachet', 'sachets'],
  pot: ['pot', 'pots'],
  cube: ['cube', 'cubes'],
};

// Unités qu'on achète à l'unité : on arrondit au-dessus dans la liste de courses.
const ENTIERES = new Set(['piece', 'gousse', 'tranche', 'bouquet', 'botte', 'branche', 'boite', 'sachet', 'pot', 'cube']);

const FRACTIONS = [
  [0, ''], [0.125, '⅛'], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾'], [1, ''],
];

const nf = (max) => new Intl.NumberFormat('fr-BE', { maximumFractionDigits: max });

/** Ramène g/kg en g et ml/cl/dl/l en ml. Les autres unités restent telles quelles. */
export function normaliser(q, u = 'piece') {
  if (u in MASSES) return { q: q * MASSES[u], u: 'g' };
  if (u in VOLUMES) return { q: q * VOLUMES[u], u: 'ml' };
  return { q, u: u || 'piece' };
}

export function famille(u) {
  if (u in MASSES) return 'g';
  if (u in VOLUMES) return 'ml';
  return u || 'piece';
}

function arrondi(v, pas) {
  return Math.round(v / pas) * pas;
}

/** 1,5 → « 1 ½ », 0,25 → « ¼ », 7,4 → « 7 ½ », 12,3 → « 12 ». */
export function enFraction(v) {
  if (v >= 10) return String(Math.round(v));
  if (v >= 4) {
    const r = arrondi(v, 0.5);
    return r % 1 ? `${Math.floor(r)} ½` : String(r);
  }
  let entier = Math.floor(v);
  const reste = v - entier;
  let best = FRACTIONS[0];
  for (const f of FRACTIONS) if (Math.abs(f[0] - reste) < Math.abs(best[0] - reste)) best = f;
  if (best[0] === 1) {
    entier += 1;
    best = FRACTIONS[0];
  }
  if (entier === 0 && best[0] === 0) best = FRACTIONS[1];
  if (!entier) return best[1];
  return best[1] ? `${entier} ${best[1]}` : String(entier);
}

function texteMasse(g) {
  if (g >= 1000) return `${nf(2).format(arrondi(g, 50) / 1000)} kg`;
  if (g >= 100) return `${nf(0).format(arrondi(g, 5))} g`;
  if (g >= 10) return `${nf(0).format(Math.round(g))} g`;
  return `${nf(1).format(Math.max(0.5, arrondi(g, 0.5)))} g`;
}

function texteVolume(ml) {
  if (ml >= 1000) return `${nf(2).format(arrondi(ml, 50) / 1000)} l`;
  if (ml >= 100) return `${nf(1).format(arrondi(ml / 10, 0.5))} cl`;
  if (ml >= 10) return `${nf(0).format(Math.round(ml))} ml`;
  return `${nf(1).format(Math.max(0.5, arrondi(ml, 0.5)))} ml`;
}

/** Texte affiché pour une quantité, ex. formater(1.5, 'gousse') → « 1 ½ gousse ». */
export function formater(q, u = 'piece') {
  if (q == null || Number.isNaN(q)) return '';
  const n = normaliser(q, u);
  if (n.u === 'g') return texteMasse(n.q);
  if (n.u === 'ml') return texteVolume(n.q);
  const lib = LIBELLES[n.u] || [n.u, n.u];
  const nombre = enFraction(n.q);
  const unite = n.q >= 2 ? lib[1] : lib[0];
  return unite ? `${nombre} ${unite}` : nombre;
}

/** Quantité à acheter : on ne vend pas ½ oignon. */
export function quantiteAchat(q, u) {
  if (q == null) return q;
  return ENTIERES.has(u) ? Math.max(1, Math.ceil(q - 0.05)) : q;
}

/** Minutes → « 1 h 30 », « 45 min », « 2 jours ». */
export function formaterDuree(min) {
  if (!min) return '';
  if (min >= 1440 && min % 1440 === 0) {
    const j = min / 1440;
    return j > 1 ? `${j} jours` : '1 jour';
  }
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
}

export function libellePortions(n, portions) {
  const unite = n >= 2 ? portions.pluriel : portions.unite;
  return unite;
}
