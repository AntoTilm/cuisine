# Notes de conversion depuis l'Excel

Ce qui a été corrigé, interprété ou ajouté en passant du fichier `sources/Recettes EXCEL2.xlsx` au site.
À relire : les points marqués **à vérifier** sont des choix faits sans certitude.

## Principe des deux versions

- Quand l'Excel avait des étapes détaillées (vol-au-vent, fondue, croquettes, entrecôte, Général Tao, porc
  caramélisé…), elles sont devenues la version **Grande cuisine**, parfois enrichie (températures, gestes). Une
  version **Simple** a été écrite à côté, avec des raccourcis (bouillon en cube, fromage pour fondue tout prêt,
  pâte brisée du commerce, cuisson à la poêle plutôt qu'en friture…).
- Quand l'Excel n'avait pas d'étapes, les deux versions ont été écrites : légumes grillés, pita, riz cantonais,
  rouleaux de printemps, hamburger, tarte au citron, fin du poulet croustillant.
- Les quantités de l'Excel sont exprimées « par personne » (formules `=150*A5`). Elles ont été converties pour un
  nombre de personnes de base, et le site les recalcule.

## Erreurs corrigées

- **Vol-au-vent et ramen** : la poule était en `300 kg` par personne, ramenée à 300 g.
- **Vol-au-vent** : crème fraîche `0,05 dl` par personne, lue comme 5 cl par personne (20 cl pour 4).
- **Fondue savoyarde** : poivre noir `45 g` par personne (copie de la ligne du dessus), remplacé par « au goût ».
  La case « nombre de personnes » contenait une date ; la recette part sur 4 personnes.
- **Porc caramélisé** : ail, sucre, huile et sauce de poisson étaient multipliés par personne (12 gousses et 8 c. à
  soupe de nuoc-mâm pour 4). Ce sont les quantités pour 500 g de viande, soit 4 personnes : 3 gousses, 2 c. à soupe
  de sucre, 3 c. à soupe d'huile, 2 c. à soupe de nuoc-mâm. **À vérifier.**
- **Rouleaux de printemps** : les deux sauces étaient multipliées par rouleau (480 g de nuoc-mâm pour 8 rouleaux).
  Elles sont devenues deux recettes séparées, avec les quantités de l'Excel pour 4 personnes.
- **Sauce burger** : Excel avait transformé les fractions en dates. Relu comme ¾ de tasse de mayonnaise (190 ml),
  ½ c. à café de Worcestershire, ⅓ de tasse de cornichons (85 ml), ½ c. à café de paprika.
- **Légumes grillés** : prévu « pour 1 personne » avec 500 g de champignons, 400 g de tomates cerises… Traité comme
  une plaque pour 4.
- **Tzatziki** : 0,2 g de menthe par personne, remplacé par ½ brin.

## Ajouts

- **Vol-au-vent** : ris de veau (cité dans l'étape 5 mais absent des ingrédients), croûtes feuilletées, thym et
  laurier chiffrés.
- **Ramen** : ail dans le bouillon (cité dans les étapes) ; gingembre lu comme 1 cm par personne.
- **Fondue** : 1 c. à café de fécule pour 4 (donnée dans les notes d'émulsion).
- **Hamburger** : les quantités étaient « A completer ». Ajoutées : 150 g de bœuf, 2 tranches de cheddar et 2 de
  lardo, ¼ de tomate, ¼ d'oignon, 1 cornichon et un peu de laitue par burger. La sauce de l'Excel suffit pour
  8 burgers. **À vérifier.**
- **Croquettes** : quantités de panure (100 g de farine, 300 g de chapelure pour 24 croquettes), huile de friture.
- **Tarte au citron** : pâte brisée classique (250 g de farine, 125 g de beurre) ; meringue italienne passée de
  2 à 3 blancs (150 g de sucre, 50 ml d'eau).
- **Porc caramélisé** : 75 g de riz par personne.
- **Poulet croustillant teriyaki** : un oignon, comme dans le titre de la vidéo.
- **Entrecôte bleue** : reprise de la page `entrecote-bleue/index.html`. Les quantités se recalculent selon le
  poids de la viande. La page d'origine est conservée telle quelle (`public/deroules/`).

## Laissé tel quel, mais surprenant

- **Sauce teriyaki** : 30 g de sucre et 30 ml de sauce soja par personne, soit 120 g de sucre pour 4. **À goûter.**
- **Pommes de terre Hasselback** : 4 pommes de terre par personne, donc des petites.
- **Vol-au-vent** : 250 g de hachis et 250 g de champignons par personne : des portions généreuses.
- **Salade wakamé** : 5 c. à soupe de vinaigrette par personne.

## Non repris

- Le lien vers une conversation ChatGPT (« Plat libanais ») : il n'est lisible que depuis ton compte. Le plat est
  dans les idées à tester.
- « Chicon au gratin » et « Couscous » n'avaient qu'un titre ou un lien : ils sont dans les idées à tester, avec
  la feuille « Plat à incorporer » et la liste « A rajouter » de la feuille Asiatique.
