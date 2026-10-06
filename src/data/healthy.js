// Cuisine « Healthy » dans le dé : plats sains mais vraiment savoureux, quitte à y passer du temps.
// VIDEOS_HEALTHY_EXISTANTES : vidéos déjà dans le dé (hasard.js / hasard-plus.js) marquées healthy.
// NOUVELLES : vidéos ajoutées au dé pour la partie healthy.
//   [chaîne, cuisine, type, titre, id YouTube, recette du carnet (facultatif)]

const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

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

// Vidéos dont la recette est déjà au carnet.
export const RECETTES_HEALTHY = {
  uLmhRzBBMa0: 'black-cod-miso',
  WlosNFMCnE4: 'pho-bo',
  jaN3qsqXt38: 'ragout-pois-chiches-coco',
  '-2RjqDwbrZQ': 'bun-cha',
  sFr_9c9akhc: 'bun-cha',
  I152PpC4Vnc: 'chou-fleur-roti-entier',
  yCRUvp_JY8E: 'laab-gai',
  OzZRJ4Ol6ME: 'mejadra',
  guXtz64bIlo: 'poke-bowl-saumon',
  neLfSG9C8VU: 'poke-bowl-saumon',
  hXaaZiMgvgI: 'tom-yum-goong',
  eghpIo84fY8: 'aubergines-roties-yaourt-safran',
};
