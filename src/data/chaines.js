// Les chaînes YouTube (et quelques sites) où chercher des idées, rangées par cuisine.
// `aime: true` : les chaînes que je suis déjà. `videos` : des recettes à regarder.
const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

export const GROUPES = [
  {
    titre: 'Cuisine française',
    chaines: [
      {
        nom: 'Philippe Etchebest',
        url: 'https://www.youtube.com/@ChefEtchebest',
        aime: true,
        texte: 'Les classiques français expliqués pas à pas par un Meilleur Ouvrier de France, avec les quantités sur son site.',
        videos: [
          { titre: 'Le bœuf bourguignon', url: yt('F_53yUD3Je4'), recette: 'boeuf-bourguignon' },
          { titre: 'La tarte au citron', url: yt('N7kY8vuCbVI'), recette: 'tarte-citron-meringuee' },
          { titre: 'La crème brûlée', url: yt('lROX8gJ8SPE'), recette: 'creme-brulee' },
          { titre: 'La pâte brisée', url: yt('TUcbb8bbmgs') },
        ],
      },
      {
        nom: 'Hervé Cuisine',
        url: 'https://www.youtube.com/@HerveCuisine',
        texte: 'Cuisine et pâtisserie maison, des recettes simples et bien expliquées. Une des plus anciennes chaînes de cuisine en français.',
      },
      {
        nom: 'Chef Michel Dumas',
        url: 'https://www.youtube.com/@chefmicheldumas',
        texte: 'Un chef québécois, des recettes faciles avec beaucoup d’humour. Recettes écrites sur micheldumas.com.',
        videos: [{ titre: 'Crevettes à l’ail', url: yt('0zvziyJ8nfQ'), recette: 'scampi-a-l-ail' }],
      },
    ],
  },
  {
    titre: 'Cuisine belge',
    chaines: [
      {
        nom: 'Omiam',
        url: 'https://www.youtube.com/@omiamtv',
        texte: 'Les recettes de « Mon plat préféré » (RTBF) : les grands classiques belges, simples et familiaux.',
        videos: [{ titre: 'Vol-au-vent', url: yt('bgG479XvQkk'), recette: 'vol-au-vent' }],
      },
      {
        nom: 'The Mastercooks of Belgium',
        url: 'https://mastercooks.be/fr',
        site: true,
        texte: 'Le site des Maîtres Cuisiniers de Belgique : les recettes des grandes maisons, comme le vol-au-vent des Armes de Bruxelles.',
      },
    ],
  },
  {
    titre: 'Cuisine britannique et technique',
    chaines: [
      {
        nom: 'Fallow',
        url: 'https://www.youtube.com/@FallowChefs',
        aime: true,
        anglais: true,
        texte: 'La chaîne du restaurant londonien Fallow : des recettes de restaurant refaites à la maison, souvent en plusieurs niveaux, avec les ingrédients en description.',
        videos: [
          { titre: 'Le mac and cheese préféré des chefs', url: yt('0NlML-xA_lA'), recette: 'mac-and-cheese' },
          { titre: 'Le bœuf bourguignon en trois morceaux', url: yt('fVvYTWAHoBQ'), recette: 'boeuf-bourguignon' },
          { titre: 'Le poulet, du débutant à l’étoilé', url: yt('8VY0RnxaZJc'), recette: 'poulet-champignons-jambon-parme' },
          { titre: 'Le mac and cheese de Heston Blumenthal', url: yt('KS4BJPINl5Q') },
          { titre: 'Les côtes de bœuf braisées (short ribs)', url: yt('G0n2OHlBPcQ') },
          { titre: 'La tourte au bœuf', url: yt('XE6JvrChQ_Q') },
          { titre: 'Un poulet de restaurant à la maison', url: yt('RoKoOI1BUSc') },
        ],
      },
      {
        nom: 'Ethan Chlebowski',
        url: 'https://www.youtube.com/@ethanchlebowski',
        anglais: true,
        texte: 'Pour comprendre le comment et le pourquoi : chaque vidéo explique la technique derrière la recette.',
      },
      {
        nom: 'J. Kenji López-Alt',
        url: 'https://www.youtube.com/@JKenjiLopezAlt',
        anglais: true,
        texte: 'L’auteur de The Food Lab et The Wok : la science de la cuisine, filmée en caméra subjective dans sa cuisine. Une référence pour le wok.',
      },
      {
        nom: 'Andy Cooks',
        url: 'https://www.youtube.com/@AndyCooks',
        anglais: true,
        texte: 'Un chef australien, des recettes de restaurant courtes et directes.',
      },
    ],
  },
  {
    titre: 'Cuisine asiatique',
    chaines: [
      {
        nom: 'Cooking With Morgane',
        url: 'https://www.youtube.com/@CookingWithMorgane',
        aime: true,
        texte: 'La cuisine familiale chinoise, laotienne et d’Asie du Sud-Est, en français, avec les ingrédients pour 4 en description.',
        videos: [
          { titre: 'Poulet du Général Tao', url: yt('nL_x4wCtldI'), recette: 'poulet-general-tao' },
          { titre: 'Bœuf aux oignons', url: yt('kSAhmnt5UaE'), recette: 'boeuf-aux-oignons' },
          { titre: 'Poulet à l’ananas', url: yt('eVvgyOOFudg'), recette: 'poulet-ananas' },
          { titre: 'Gyoza', url: yt('mmoCEkTg_RI'), recette: 'gyoza' },
          { titre: 'Crevettes aigre-douces à l’ananas', url: yt('yLUFHEUWgdI') },
          { titre: 'Porc aigre-doux', url: yt('LkV-lnWPmw8') },
          { titre: 'Riz sauté au poulet et à l’ananas', url: yt('GcZ73LzF7GQ') },
        ],
      },
      {
        nom: 'Chinese Cooking Demystified',
        url: 'https://www.youtube.com/@ChineseCookingDemystified',
        anglais: true,
        texte: 'La cuisine chinoise authentique, région par région, avec beaucoup d’explications sur les ingrédients.',
      },
      {
        nom: 'Just One Cookbook',
        url: 'https://www.youtube.com/@JustOneCookbook',
        anglais: true,
        texte: 'La cuisine japonaise maison : ramen, donburi, gyoza, teriyaki, bento.',
      },
      {
        nom: 'Pailin’s Kitchen',
        url: 'https://www.youtube.com/@PailinsKitchen',
        anglais: true,
        texte: 'La cuisine thaïe expliquée par une cheffe thaïlandaise : currys, pad thaï, salades.',
      },
      {
        nom: 'Marion’s Kitchen',
        url: 'https://www.youtube.com/@marionskitchen',
        anglais: true,
        texte: 'Des saveurs asiatiques franches pour tous les jours, rapides à faire.',
      },
    ],
  },
  {
    titre: 'Cuisine italienne',
    chaines: [
      {
        nom: 'Vincenzo’s Plate',
        url: 'https://www.youtube.com/@VincenzosPlate',
        anglais: true,
        texte: 'La cuisine italienne de famille, avec la nonna : pâtes, sauces, pizza.',
      },
      {
        nom: 'Pasta Grammar',
        url: 'https://www.youtube.com/@PastaGrammar',
        anglais: true,
        texte: 'Un couple italo-américain qui fait les recettes régionales italiennes dans les règles, comme la vraie carbonara.',
      },
    ],
  },
];
