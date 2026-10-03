// Classement automatique des ingrédients par rayon de magasin.
// Un ingrédient peut forcer son rayon avec `rayon:` dans le fichier de la recette.

// Ordre d'affichage dans la liste de courses (le parcours d'un supermarché).
export const RAYONS = [
  { id: 'fruits-legumes', nom: 'Fruits, légumes et herbes' },
  { id: 'boucherie', nom: 'Boucherie et poissonnerie' },
  { id: 'cremerie', nom: 'Crèmerie et œufs' },
  { id: 'boulangerie', nom: 'Boulangerie' },
  { id: 'epicerie', nom: 'Épicerie salée' },
  { id: 'asiatique', nom: 'Épicerie asiatique' },
  { id: 'sucre', nom: 'Épicerie sucrée' },
  { id: 'surgeles', nom: 'Surgelés' },
  { id: 'cave', nom: 'Vins et alcools' },
  { id: 'divers', nom: 'Divers' },
  { id: 'placard', nom: 'Sans doute dans le placard' },
];

// Première règle qui correspond = rayon retenu. Les noms sont comparés sans accents ni majuscules.
const REGLES = [
  ['asiatique', /sauce soja|soja (claire|foncee)|kikkoman|mirin|\bsake\b|dashi|huitre|sauce de poisson|nuoc|hoisin|shaoxing|vin de riz|alcool de riz|vin de cuisine chinois|vinaigre de riz|huile de sesame|wakame|tamarin|sirop de riz|saucisse chinoise|shiitake|parfume|kimchi|puree de piment|cinq.epice|5 epice|nouille|vermicelle|galette de riz|lait de soja|sriracha|colorant|pate de cacahuete|ciboulette thai|ciboule chinoise|nori/],
  ['placard', /^(gros sel|fleur de sel|sel|poivre|huile|glacon)\b/],
  ['epicerie', /vinaigre|concentre de tomate|coulis|jus de tomate|tomates? (pelee|concassee)|haricots rouges|\bmais\b|chapelure|farine|fecule|maizena|\briz\b|bouillon|moutarde|mayonnaise|ketchup|cornichon|worcestershire|tabasco|piquante|cumin|paprika|origan|muscade|piment (en poudre|d'espelette)|herbes de provence|levure|\bnoix\b|cacahuete|sesame|bicarbonate|poudre d|thym seche|graisse d'oie/],
  ['sucre', /sucre|cassonade|\bmiel\b|vanille|chocolat|lait de coco|sirop/],
  ['cave', /\bvin\b|cognac|kirsch|\bmarc\b|porto|biere/],
  ['surgeles', /sorbet|glacon|petits? poi|surgele/],
  ['cremerie', /beurre|creme|\blait\b|\boeuf|fromage|parmesan|emmental|gruyere|comte|beaufort|vacherin|cheddar|mozzarella|burrata|feta|yaourt|roquefort|pate brisee/],
  ['boulangerie', /\bpain|baguette|brioche|croute/],
  ['boucherie', /boeuf|veau|porc|poulet|\bpoule\b|poularde|viande|hache|entrecote|steak|echine|saucisse|pancetta|lardo|\blard|jambon|poitrine|saumon|crevette|scampi|poisson|cuisse/],
  ['fruits-legumes', /oignon|\bail\b|echalote|tomate|poivron|carotte|poireau|courgette|champignon|concombre|salade|laitue|persil|menthe|coriandre|ciboulette|cebette|ciboule|thym|romarin|laurier|estragon|aneth|basilic|citron|gingembre|pomme|pousse|germe|poire|herbe|piment|celeri|bambou|brocoli|feuille/],
];

export function sansAccents(s) {
  return s
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’`]/g, "'");
}

export function rayonDe(nom) {
  const n = sansAccents(nom);
  for (const [rayon, motif] of REGLES) if (motif.test(n)) return rayon;
  return 'divers';
}

export function nomRayon(id) {
  return (RAYONS.find((r) => r.id === id) || RAYONS.find((r) => r.id === 'divers')).nom;
}
