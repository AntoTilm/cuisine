// Plats complets : rôles des accompagnements et choix qui ne sont pas des recettes.

export const ROLES = {
  feculent: { titre: 'Féculent', aucun: 'Sans féculent' },
  legume: { titre: 'Légumes', aucun: 'Sans légumes' },
  sauce: { titre: 'Sauce', aucun: 'Sans sauce' },
  autre: { titre: 'À côté', aucun: 'Rien' },
};

// Choix possibles sans recette : rien à cuisiner, rien sur la liste de courses.
export const HORS_RECETTE = {
  friterie: {
    titre: 'Frites de la friterie',
    resume: 'Un cornet par personne, pris en rentrant. Les commander « bien cuites » si la viande attend.',
  },
};

/** Nombre de personnes servies par un plat, selon ses portions (rouleaux, grammes de viande…). */
export function personnes(portions, parPersonne = 1) {
  return Math.max(1, Math.ceil(portions / parPersonne - 0.01));
}
