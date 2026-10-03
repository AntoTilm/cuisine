// Les types de cuisine, dans l'ordre du sommaire.
export const CUISINES = [
  {
    slug: 'francaise',
    titre: 'Cuisine française',
    nom: 'Française',
    intro: 'Fondue savoyarde, entrecôtes au beurre et desserts de pâtissier.',
  },
  {
    slug: 'belge',
    titre: 'Cuisine belge',
    nom: 'Belge',
    intro: 'Les classiques de brasserie : vol-au-vent, croquettes au fromage, scampis à l’ail.',
  },
  {
    slug: 'italienne',
    titre: 'Cuisine italienne',
    nom: 'Italienne',
    intro: 'La sauce qui mijote tout l’après-midi.',
  },
  {
    slug: 'mediterraneenne',
    titre: 'Cuisine méditerranéenne',
    nom: 'Méditerranéenne',
    intro: 'Grèce, Liban et légumes rôtis : la cuisine des beaux jours.',
  },
  {
    slug: 'americaine',
    titre: 'Cuisine américaine',
    nom: 'Américaine',
    intro: 'Burgers, chili tex-mex et brunch.',
  },
  {
    slug: 'asiatique',
    titre: 'Cuisine asiatique',
    nom: 'Asiatique',
    intro: 'Japon, Chine et Vietnam : ramen, plats au wok, rouleaux et leurs sauces.',
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
