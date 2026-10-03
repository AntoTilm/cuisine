# Carnet de cuisine

Mes recettes, tirées de mon fichier Excel (`sources/Recettes EXCEL2.xlsx`) et mises en site web.

- Rangées par type de cuisine : française, belge, italienne, méditerranéenne, américaine, asiatique, autres horizons.
- Chaque recette existe en version **Simple** et en version **Grande cuisine** (bouton en haut de la recette).
- Les quantités se recalculent selon le nombre de personnes (ou de croquettes, de rouleaux…).
- Chaque recette a sa **liste de courses**, rangée par rayon. Le bouton « Ajouter à ma liste de courses » la verse
  dans une liste globale qui additionne toutes les recettes choisies (page *Liste de courses*). La liste est
  enregistrée dans le navigateur de l'appareil.
- Minuteurs dans les étapes, étapes à cocher dans la marge, calculateur de cuisson pour l'entrecôte.
- La page *Idées à tester* reprend les plats notés dans le fichier sans recette.
- Le déroulé minuté de l'entrecôte bleue est conservé tel quel dans `public/deroules/entrecote-bleue.html`.

Site statique construit avec [Astro](https://astro.build). Pas de base de données, pas de serveur.

## Lancer le site sur son PC

Il faut **Node.js 22.12 ou plus récent** (`node --version` pour vérifier).

```bash
npm install
npm run dev
```

Puis ouvrir <http://localhost:4321>. Les modifications des recettes s'affichent immédiatement.

## Ajouter ou modifier une recette

Une recette = un fichier YAML dans `src/content/recettes/`. Le nom du fichier donne l'adresse de la page
(`ramen.yaml` → `/recette/ramen/`). Le plus simple est de copier une recette proche et de l'adapter.

```yaml
titre: Chili con carne
cuisine: americaine        # francaise, belge, italienne, mediterraneenne, americaine, asiatique, autres-horizons
origine: Tex-Mex           # facultatif
type: plat                 # entree, plat, accompagnement, sauce, dessert
saison: hiver              # facultatif : hiver ou ete
resume: Une phrase qui donne envie.
portions:
  base: 4                  # les quantités ci-dessous sont pour 4
  # defaut: 4              # nombre affiché à l'ouverture, si différent de base
  # unite: croquette       # par défaut « personne » / « personnes »
  # pluriel: croquettes
  # pas: 6                 # de combien les boutons + et − font varier

ingredients:
  - groupe: Le chili       # titre du groupe, facultatif
    items:
      - { nom: Bœuf haché, qte: 600, unite: g }
      - { nom: Oignon, qte: 2 }                       # sans unité = à la pièce
      - { nom: Tabasco, optionnel: true }             # sans quantité
      - { nom: Vin rouge, qte: 25, unite: cl, cle: vin }  # « cle » pour citer la quantité dans une étape
  - groupe: Pour servir
    mode: chef             # groupe affiché seulement en version grande cuisine
    items:
      - { nom: Crème aigre, qte: 150, unite: g }

simple:
  temps: { preparation: 15, cuisson: 30 }   # en minutes ; « attente » aussi possible
  etapes:
    - "Une étape, en une phrase ou deux."
    - texte: "Verser {vin} de vin et laisser mijoter 20 min."   # {vin} affiche la quantité recalculée
      minuteur: 1200                                            # en secondes
  astuces:
    - "Facultatif."

chef:
  temps: { preparation: 40, cuisson: 150 }
  etapes:
    - titre: La veille
      texte: "…"
  astuces:
    - "Affichées sous le titre « Le mot du chef »."
```

Unités possibles : `g`, `kg`, `ml`, `cl`, `dl`, `l`, `cs` (c. à soupe), `cc` (c. à café), `pincee`, `gousse`,
`tranche`, `bouquet`, `botte`, `brin`, `branche`, `feuille`, `cm`, `boite`, `sachet`, `pot`, `cube`.

Autres options d'un ingrédient :

- `mode: simple` ou `mode: chef` : n'apparaît que dans cette version.
- `maison: true` : préparé dans la recette (un bouillon maison…), donc absent de la liste de courses.
- `rayon: epicerie` : force le rayon de la liste de courses si le classement automatique se trompe
  (`fruits-legumes`, `boucherie`, `cremerie`, `boulangerie`, `epicerie`, `asiatique`, `sucre`, `surgeles`, `cave`,
  `placard`, `divers`). Le classement automatique est dans `src/lib/rayons.js`.

Autres champs d'une recette : `notes` (encadrés « Notes du carnet »), `sources` (liens), `servirAvec` et
`voirAussi` (noms de fichiers d'autres recettes, sans `.yaml`). Voir les recettes existantes pour des exemples.

Si un fichier contient une erreur (champ manquant, unité inconnue…), `npm run dev` et `npm run build` l'indiquent
avec le nom du fichier.

Les idées de recettes sont dans `src/data/idees.yaml`.

## Publier le site

### Sur GitHub Pages

Le fichier `.github/workflows/deploy.yml` publie le site à chaque `git push` sur `main`.

1. Créer un dépôt sur GitHub (par exemple `cuisine`) et y pousser ce dossier.
2. Dans le dépôt : **Settings > Pages > Source : GitHub Actions**.
3. Pousser. Le site apparaît sur `https://<utilisateur>.github.io/cuisine/` après une ou deux minutes
   (onglet **Actions** pour suivre la publication).

L'adresse suit le nom du dépôt automatiquement. Avec un compte GitHub gratuit, le dépôt doit être public : le
fichier Excel de `sources/` et les notes seront donc visibles aussi.

### Ailleurs

```bash
npm run build
```

Le site complet est généré dans `dist/` : des fichiers HTML, CSS et JS à déposer sur n'importe quel hébergement
statique (Azure Static Web Apps, Netlify, Cloudflare Pages, GitHub Pages, un IIS…).

Pour un site publié dans un sous-dossier (par exemple `https://exemple.github.io/cuisine/`) :

```bash
BASE_PATH=/cuisine npm run build
```

Sous PowerShell : `$env:BASE_PATH="/cuisine"; npm run build`.

## Organisation des fichiers

```
src/content/recettes/   une recette par fichier YAML
src/data/               cuisines (ordre, textes) et idées à tester
src/lib/                quantités, liste de courses, rayons, calcul de cuisson
src/scripts/            interactivité dans le navigateur (portions, modes, minuteurs, liste)
src/pages/              les pages du site
src/styles/global.css   la mise en page
public/deroules/        pages autonomes (déroulé de l'entrecôte bleue)
sources/                le fichier Excel d'origine
NOTES-CONVERSION.md     ce qui a été corrigé ou complété par rapport à l'Excel
```
