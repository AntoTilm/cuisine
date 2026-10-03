// Les types de cuisine, dans l'ordre du sommaire.
export const CUISINES = [
  {
    slug: 'francaise',
    titre: 'Cuisine française',
    nom: 'Française',
    intro: 'Entrecôte, gratin dauphinois, poulet crème moutarde et desserts de pâtissier.',
  },
  {
    slug: 'belge',
    titre: 'Cuisine belge',
    nom: 'Belge',
    intro: 'Les classiques de brasserie : vol-au-vent, chicons au gratin, frites maison, croquettes au fromage.',
  },
  {
    slug: 'italienne',
    titre: 'Cuisine italienne',
    nom: 'Italienne',
    intro: 'Pizza, carbonara, pesto et la sauce qui mijote tout l’après-midi.',
  },
  {
    slug: 'mediterraneenne',
    titre: 'Cuisine méditerranéenne',
    nom: 'Méditerranéenne',
    intro: 'Grèce, Liban, Maghreb et légumes rôtis : couscous, pitas et tzatziki.',
  },
  {
    slug: 'americaine',
    titre: 'Cuisine américaine',
    nom: 'Américaine',
    intro: 'Burgers, chili tex-mex, salade César et brunch.',
  },
  {
    slug: 'britannique',
    titre: 'Cuisine britannique',
    nom: 'Britannique',
    intro: 'La cuisine des restaurants londoniens d’aujourd’hui, d’après les vidéos de Fallow.',
  },
  {
    slug: 'asiatique',
    titre: 'Cuisine asiatique',
    nom: 'Asiatique',
    intro: 'Japon, Chine et Vietnam : ramen, gyozas, plats au wok, rouleaux et leurs sauces.',
  },
  {
    slug: 'autres-horizons',
    titre: 'Autres horizons',
    nom: 'Autres horizons',
    intro: 'Ce qui ne rentre dans aucune case : la Suède, la cuisine végétale.',
  },
];

export const TYPES = {
  entree: 'Entrée',
  plat: 'Plat',
  accompagnement: 'Accompagnement',
  sauce: 'Sauce',
  dessert: 'Dessert',
};

export const SAISONS = { hiver: 'Recette d’hiver', ete: 'Recette d’été' };

export function cuisine(slug) {
  return CUISINES.find((c) => c.slug === slug);
}
