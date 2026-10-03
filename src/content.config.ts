import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const MODES = ['simple', 'chef'] as const;

const ingredient = z.object({
  nom: z.string(),
  qte: z.number().positive().optional(),
  // g, kg, ml, cl, dl, l, cs, cc, pincee, gousse, tranche, bouquet, botte, brin, branche, feuille, cm, boite, sachet, pot, cube
  unite: z.string().optional(),
  note: z.string().optional(),
  // Identifiant utilisé dans les étapes : {cle} affiche la quantité mise à l'échelle.
  cle: z.string().optional(),
  mode: z.enum(MODES).optional(),
  optionnel: z.boolean().optional(),
  // Préparation faite dans la recette (bouillon maison…) : pas dans la liste de courses.
  maison: z.boolean().optional(),
  rayon: z.string().optional(),
});

const etape = z.union([
  z.string(),
  z.object({
    titre: z.string().optional(),
    texte: z.string(),
    minuteur: z.number().int().positive().optional(), // en secondes
    alerte: z.array(z.string()).optional(),
  }),
]);

const temps = z.object({
  preparation: z.number().int().nonnegative().default(0),
  cuisson: z.number().int().nonnegative().default(0),
  attente: z.number().int().nonnegative().default(0),
});

const version = z.object({
  temps,
  etapes: z.array(etape).min(1),
  astuces: z.array(z.string()).optional(),
});

const recettes = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/recettes' }),
  schema: z.object({
    titre: z.string(),
    cuisine: z.enum(['francaise', 'belge', 'italienne', 'mediterraneenne', 'americaine', 'asiatique', 'autres-horizons']),
    origine: z.string().optional(),
    type: z.enum(['entree', 'plat', 'accompagnement', 'sauce', 'dessert']),
    saison: z.enum(['hiver', 'ete']).optional(),
    resume: z.string(),
    portions: z.object({
      base: z.number().positive(),
      defaut: z.number().positive().optional(),
      unite: z.string().default('personne'),
      pluriel: z.string().default('personnes'),
      pas: z.number().positive().default(1),
      min: z.number().positive().optional(),
    }),
    ingredients: z
      .array(
        z.object({
          groupe: z.string().optional(),
          mode: z.enum(MODES).optional(),
          items: z.array(ingredient).min(1),
        }),
      )
      .min(1),
    simple: version,
    chef: version,
    notes: z
      .array(z.object({ titre: z.string(), texte: z.string(), mode: z.enum(MODES).optional() }))
      .optional(),
    sources: z.array(z.object({ titre: z.string(), url: z.string().url() })).optional(),
    servirAvec: z.array(z.string()).optional(),
    voirAussi: z.array(z.string()).optional(),
    outil: z.enum(['cuisson-entrecote']).optional(),
    deroule: z.object({ titre: z.string(), url: z.string() }).optional(),
  }),
});

const idees = defineCollection({
  loader: file('src/data/idees.yaml'),
  schema: z.object({
    titre: z.string(),
    cuisine: z.string(),
    note: z.string().optional(),
    lien: z.string().url().optional(),
  }),
});

export const collections = { recettes, idees };
