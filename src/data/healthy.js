// Partie « Healthy » : plats sains mais vraiment savoureux, quitte à y passer du temps.
// TOP5 : la sélection de la page /healthy/ (pas encore de recette écrite : la vidéo sert de base).
// VIDEOS_HEALTHY_EXISTANTES : vidéos déjà dans le dé (hasard.js / hasard-plus.js) marquées healthy.
// NOUVELLES : vidéos ajoutées au dé pour la partie healthy.
//   [chaîne, cuisine, type, titre, id YouTube, recette du carnet (facultatif)]

const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

export const TOP5 = [
  {
    titre: 'Black cod au miso, façon Nobu',
    cuisine: 'asiatique',
    chef: 'Nobu Matsuhisa (vidéo : Just One Cookbook)',
    url: yt('uLmhRzBBMa0'),
    pourquoi: 'Le plat signature de Nobu : un poisson gras qui marine deux à trois jours dans le miso, le saké et le mirin, puis caramélise sous le gril. Fondant, laqué, presque sucré.',
    sain: 'Poisson riche en oméga-3, aucune friture, une marinade qui fait tout le travail.',
    effort: 'La marinade se lance 48 à 72 h avant. À servir avec du riz et un concombre wakame.',
  },
  {
    titre: 'Pho bò, bouillon de bœuf maison',
    cuisine: 'asiatique',
    chef: 'Joshua Weissman',
    url: yt('WlosNFMCnE4'),
    pourquoi: 'Os à moelle et paleron mijotés des heures avec oignon et gingembre brûlés, badiane, cannelle, cardamome. Le bouillon clair et profond qu’aucun cube n’imite.',
    sain: 'Un bouillon dégraissé, de la viande maigre tranchée fine, des herbes fraîches à volonté.',
    effort: '6 h de bouillon (il se congèle très bien) : un dimanche pour plusieurs repas.',
  },
  {
    titre: '« The Stew » : pois chiches, coco et curcuma',
    cuisine: 'autres-horizons',
    chef: 'Alison Roman (New York Times Cooking)',
    url: yt('jaN3qsqXt38'),
    pourquoi: 'La recette devenue virale sous le nom #TheStew : des pois chiches rissolés jusqu’à croustiller, du lait de coco, du gingembre, des feuilles vertes, du yaourt et de la menthe par-dessus.',
    sain: 'Légumineuses, légumes verts, épices : un plat végétarien qui cale vraiment.',
    effort: 'Une heure, sans difficulté : la seule exigence est de bien faire dorer les pois chiches.',
  },
  {
    titre: 'Bún chả de Hanoï',
    cuisine: 'asiatique',
    chef: 'Vidéo de référence sur le plat',
    url: yt('-2RjqDwbrZQ'),
    pourquoi: 'Boulettes et poitrine de porc marinées au caramel et nuoc-mâm, grillées au charbon, servies tièdes dans un bouillon aigre-doux avec vermicelles et une montagne d’herbes.',
    sain: 'Viande grillée sans matière grasse ajoutée, beaucoup d’herbes et de crudités, sauce sans crème.',
    effort: 'Marinade, deux viandes, sauce et garnitures : une belle mise en place. Le barbecue fait la différence.',
  },
  {
    titre: 'Chou-fleur rôti entier, à la Ottolenghi',
    cuisine: 'mediterraneenne',
    chef: 'D’après Yotam Ottolenghi',
    url: yt('I152PpC4Vnc'),
    pourquoi: 'Blanchi entier puis rôti à four très chaud jusqu’à ce qu’il soit doré et fondant, servi avec tahini, herbes, grenade et sumac. Le plat qui convertit ceux qui « n’aiment pas le chou-fleur ».',
    sain: 'Un légume entier en vedette, du tahini et des herbes : végétal, gourmand, sans lourdeur.',
    effort: 'Peu de travail actif, mais une cuisson en deux temps à bien surveiller.',
  },
];

// Vidéos déjà au dé, healthy.
export const VIDEOS_HEALTHY_EXISTANTES = new Set([
  '9BuL3lp4M6U', '4sm39CWrmns', '-h7_lDlfOkk', '1WmcUsc2SnI', '71SHz1kDfAw', '23aS2O9PW8E',
  'JPBwT90d8RA', 'gOtKkU3R_0c', 'n5GpAW0bNzU', 'neLfSG9C8VU', '21BFTc2GEno', 'u-u4uYPYrZw',
  'r5CkIojqayA', 'NczM84NQ6iE', 'a-Yu8qOAEYQ', 'jz2KcqzP7kM', 'VS7ioSo59tk', 'lYDRX83-IRo',
  'Wvv0dqZ_xa4', '6QQ67F8y2b8', '763VL30t8vg', 'JUmFtHqwrnk', '3utCtVG1Gh0', 'R3HQr5Dhmfc',
  'jZUvh-uPgTc', 'RZTjR5OKBO8', 'MsLRAE7q3m8', 's3uI7ip5_5k', 'ct4z5MlL4KQ', 'XMBeR18VB7o',
  '1cHP_-AMquQ', 'al1AsX2YLZg', 'eHk6NSLGAkc', 'MFm0AN0uFPw', 'ifWWRZSWS18', 'E0DJTrlqxVQ',
  'RVutUC4AEZk', 'idOKFJN9wtQ', 'kPRGsy_KRdA', 'uLmhRzBBMa0', 'WlosNFMCnE4', 'dgUwFt2ezW4',
  'mkT1TOL45lM', 'kfgrqTRQ1kM', 'KIO4_cPoncs', 'AmHE1U2Lv9w', 'oRw2YNE5kLU', 'guXtz64bIlo',
  'HAbK252ICdg', 'Pgm4W9LwzDg',
]);

export const NOUVELLES = [
  ['NYT Cooking', 'autres-horizons', 'plat', '« The Stew » d’Alison Roman : pois chiches, coco et curcuma', 'jaN3qsqXt38'],
  ['YouTube', 'asiatique', 'plat', 'Bún chả de Hanoï', '-2RjqDwbrZQ'],
  ['Marion’s Kitchen', 'asiatique', 'plat', 'Bún chả au porc', 'sFr_9c9akhc'],
  ['YouTube', 'mediterraneenne', 'plat', 'Chou-fleur rôti entier, méthode Ottolenghi', 'I152PpC4Vnc'],
  ['YouTube', 'mediterraneenne', 'plat', 'Chou-fleur rôti au beurre pimenté d’Ottolenghi', 'N1rSYX-bVy4'],
  ['YouTube', 'mediterraneenne', 'plat', 'Mejadra : lentilles, riz et oignons croustillants (Ottolenghi, Jérusalem)', 'OzZRJ4Ol6ME'],
  ['YouTube', 'mediterraneenne', 'entree', 'Aubergines rôties, yaourt au safran et grenade (Ottolenghi)', 'eghpIo84fY8'],
  ['YouTube', 'mediterraneenne', 'entree', 'Aubergines rôties sauce yaourt et curry de Yotam Ottolenghi', 'WODnWemKj-E'],
  ['YouTube', 'mediterraneenne', 'plat', 'Boulgour, tomate, aubergine et yaourt citronné (Ottolenghi)', 'xg905xsxKd0'],
  ['Hot Thai Kitchen', 'asiatique', 'entree', 'Laab gai : salade thaïe de poulet épicée', 'yCRUvp_JY8E'],
  ['Hot Thai Kitchen', 'asiatique', 'entree', 'Tom yum goong, soupe thaïe aux crevettes', 'hXaaZiMgvgI'],
  ['Hot Thai Kitchen', 'asiatique', 'entree', 'Tom yum au poulet', 'ybAw3oeSDNk'],
  ['YouTube', 'asiatique', 'entree', 'Gỏi cuốn, rouleaux de printemps frais', 'w4q4Ow9Q3jA'],
  ['Just One Cookbook', 'asiatique', 'plat', 'Salade de soba', '-ojltkREE1c'],
  ['YouTube', 'asiatique', 'plat', 'Les poke bowls les plus sains à la maison', '0ZMRL8blTsY'],
  ['Ethan Chlebowski', 'americaine', 'plat', 'Un blanc de poulet, des repas sains à l’infini', 'jg_0rADAtOE'],
  ['Ethan Chlebowski', 'americaine', 'plat', 'Des plats sains de semaine qui changent la vie', 'pyTHNeRAFwo'],
  ['Ethan Chlebowski', 'americaine', 'plat', 'Bols de riz au poulet faciles', 'EAmC5DhRbz4'],
  ['YouTube', 'mediterraneenne', 'plat', 'Bols de souvlaki de poulet à la grecque', 'T6-K70QK0sQ'],
  ['YouTube', 'mediterraneenne', 'plat', 'Souvlaki de poulet grec', 'vmSnCeOeRO8'],
];

export const IDS_HEALTHY = new Set([...VIDEOS_HEALTHY_EXISTANTES, ...NOUVELLES.map((n) => n[4])]);
