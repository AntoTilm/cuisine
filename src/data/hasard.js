// Vidéos YouTube pour le dé « Une idée au hasard » (page /hasard/).
// cuisine : un slug de cuisines.js ; type : entree, plat, accompagnement, sauce, dessert.
// recette : nom du fichier YAML si la recette est déjà au carnet.
import { PLUS } from './hasard-plus.js';
import { NOUVELLES, IDS_HEALTHY, RECETTES_HEALTHY } from './healthy.js';

const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

const ETCHEBEST = 'Philippe Etchebest';
const MORGANE = 'Cooking With Morgane';
const FALLOW = 'Fallow';

const BASE = [
  // Philippe Etchebest
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'Le bœuf bourguignon', url: yt('F_53yUD3Je4'), recette: 'boeuf-bourguignon' },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'La tarte au citron', url: yt('N7kY8vuCbVI'), recette: 'tarte-citron-meringuee' },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'La crème brûlée', url: yt('lROX8gJ8SPE'), recette: 'creme-brulee' },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'Les îles flottantes', url: yt('Yr-iaXtiNWo') },
  { chaine: ETCHEBEST, cuisine: 'americaine', type: 'dessert', titre: 'Les cookies', url: yt('v2jRON37oy8') },
  { chaine: ETCHEBEST, cuisine: 'italienne', type: 'plat', titre: 'Des lasagnes faites maison', url: yt('wU9I1PQz2sg') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'Le poulet frites revisité', url: yt('QduSWrbE97Q') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'Poulet et légumes au four', url: yt('Ku5aj50iFYs') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'Le bœuf mijoté en sauce', url: yt('niywYJVSq08') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'Les financiers aux amandes', url: yt('eSg_smF9TW8') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'Le strudel aux pommes', url: yt('n2qziO6WfOQ') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'Le gâteau au chocolat', url: yt('GENxS5H7HqI') },
  { chaine: ETCHEBEST, cuisine: 'americaine', type: 'dessert', titre: 'Le cheesecake', url: yt('3tUiagzSN5o') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'La bûche de Noël', url: yt('yRruiWDVv5o') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'dessert', titre: 'La pâte à tartiner maison', url: yt('QnX6rG3ug1k') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'Les filets de poisson au beurre blanc', url: yt('px_nqt_Zw1o') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'Le poisson en papillote', url: yt('m4d329EokYY') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'Le saumon cuit à l’unilatéral', url: yt('Jtac5X9YBYQ') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'plat', titre: 'La cuisson du faux-filet', url: yt('JXWMClUoodU') },
  { chaine: ETCHEBEST, cuisine: 'francaise', type: 'sauce', titre: 'Le fumet de poisson', url: yt('1XsRUpJeelc') },
  { chaine: 'Chef Michel Dumas', cuisine: 'francaise', type: 'entree', titre: 'Crevettes à l’ail', url: yt('0zvziyJ8nfQ'), recette: 'scampi-a-l-ail' },
  { chaine: 'Omiam', cuisine: 'belge', type: 'plat', titre: 'Vol-au-vent', url: yt('bgG479XvQkk'), recette: 'vol-au-vent' },

  // Cooking With Morgane
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Poulet du Général Tao', url: yt('nL_x4wCtldI'), recette: 'poulet-general-tao' },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Bœuf aux oignons', url: yt('kSAhmnt5UaE'), recette: 'boeuf-aux-oignons' },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Poulet à l’ananas', url: yt('eVvgyOOFudg'), recette: 'poulet-ananas' },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'entree', titre: 'Gyoza', url: yt('mmoCEkTg_RI'), recette: 'gyoza' },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Crevettes aigre-douces à l’ananas', url: yt('yLUFHEUWgdI') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Porc aigre-doux', url: yt('LkV-lnWPmw8') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Riz sauté au poulet et à l’ananas', url: yt('GcZ73LzF7GQ') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Poulet sauté aux légumes', url: yt('jIXh7SgVPzg') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Vermicelles de riz croustillants, sauce aigre-douce', url: yt('7KePFZLhdXs') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Ribs fondants au four, sauce piquante coréenne', url: yt('FAjDZklr8DA') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Poulet frit façon fast-food', url: yt('Rllyw5ba7d4') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Bo bun traditionnel', url: yt('m3PpNqWXeOo') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Bo bun au poulet', url: yt('4vK7H53AHDI') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Riz taïwanais', url: yt('NFT-Lz683Sw') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'sauce', titre: 'Les sauces indispensables de la cuisine asiatique', url: yt('_VxULYrcm68') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Pho chinois au bœuf', url: yt('XfcNGTz9NUk') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Miso ramen', url: yt('EwD-SxupgTQ') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Nouilles sautées aux brocolis', url: yt('jXKS8JSMMMw') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Nouilles sautées au poulet', url: yt('itPIdmCjIWI') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Nouilles sautées aux crevettes', url: yt('0tU1_9bYmpo') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Chow mein', url: yt('5Sf62hLcusw') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Pho thaï au bouillon clair', url: yt('YsJ3hQRSaNw') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Pho à la poule', url: yt('zrpidKF2YKM') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Boulettes de porc sauce aigre-douce', url: yt('JR4ChcpmM4w') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Poulet sauce aigre-douce', url: yt('RwZeVCLonvU') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Bœuf sauté au gingembre', url: yt('8DQzhCTG8BE') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Bœuf sauté au saté', url: yt('UIAQ5Lj4fg4') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Poulet croustillant sel et poivre', url: yt('0-XIWhkhzbU') },
  { chaine: MORGANE, cuisine: 'asiatique', type: 'plat', titre: 'Poulet sauté au gingembre', url: yt('oWUDWU9W6jE') },

  // Fallow
  { chaine: FALLOW, cuisine: 'americaine', type: 'plat', titre: 'Le mac and cheese préféré des chefs', url: yt('0NlML-xA_lA'), recette: 'mac-and-cheese' },
  { chaine: FALLOW, cuisine: 'francaise', type: 'plat', titre: 'Le bœuf bourguignon en trois morceaux', url: yt('fVvYTWAHoBQ'), recette: 'boeuf-bourguignon' },
  { chaine: FALLOW, cuisine: 'britannique', type: 'plat', titre: 'Le poulet, du débutant à l’étoilé', url: yt('8VY0RnxaZJc'), recette: 'poulet-champignons-jambon-parme' },
  { chaine: FALLOW, cuisine: 'britannique', type: 'plat', titre: 'Le mac and cheese de Heston Blumenthal', url: yt('KS4BJPINl5Q') },
  { chaine: FALLOW, cuisine: 'britannique', type: 'plat', titre: 'Les côtes de bœuf braisées (short ribs)', url: yt('G0n2OHlBPcQ') },
  { chaine: FALLOW, cuisine: 'britannique', type: 'plat', titre: 'La tourte au bœuf', url: yt('XE6JvrChQ_Q') },
  { chaine: FALLOW, cuisine: 'britannique', type: 'plat', titre: 'Un poulet de restaurant à la maison', url: yt('RoKoOI1BUSc') },
  { chaine: FALLOW, cuisine: 'britannique', type: 'accompagnement', titre: 'La purée de restaurant', url: yt('MvSYttvUxA0') },
  { chaine: FALLOW, cuisine: 'americaine', type: 'plat', titre: 'Le meilleur burger', url: yt('3BcnNOJPyBU') },
  { chaine: FALLOW, cuisine: 'britannique', type: 'plat', titre: 'Le steak et la sauce les plus célèbres de Londres', url: yt('IaMMnRiAvY4') },
];

// Cuisines qui n'existent que dans le dé (pas encore de rubrique dans le carnet).
export const CUISINES_HASARD = [
  { slug: 'indienne', nom: 'Indienne' },
  { slug: 'latino', nom: 'Mexique et Amérique latine' },
];

const dejaLa = new Set(BASE.map((v) => v.url));
const idDe = (url) => url.split('v=')[1];
const plus = [...PLUS, ...NOUVELLES].map(([chaine, cuisine, type, titre, id, recette]) => ({ chaine, cuisine, type, titre, url: yt(id), ...(recette ? { recette } : {}) }));
export const VIDEOS = [...BASE, ...plus.filter((v) => !dejaLa.has(v.url))]
  .filter((v, i, t) => t.findIndex((w) => w.url === v.url) === i)
  .map((v) => (IDS_HEALTHY.has(idDe(v.url)) ? { ...v, healthy: true } : v))
  .map((v) => (RECETTES_HEALTHY[idDe(v.url)] && !v.recette ? { ...v, recette: RECETTES_HEALTHY[idDe(v.url)] } : v));
