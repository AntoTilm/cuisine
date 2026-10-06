// Export de tout le carnet en un document Word, généré au moment du build.
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak,
  TableOfContents, ExternalHyperlink, LevelFormat, Footer, PageNumber,
} from 'docx';
import { CUISINES, TYPES, SAISONS } from '../data/cuisines.js';
import { formater, formaterDuree } from './quantites.js';
import { textesCalcul } from './entrecote.js';

const POLICE = 'Georgia';
const BORDEAUX = '6E1B29';

const p = (texte, opts = {}) => new Paragraph({ children: [new TextRun(texte)], ...opts });
const titre = (texte, niveau) => new Paragraph({ text: texte, heading: niveau });

function trouver(recette, cle) {
  for (const g of recette.ingredients) for (const it of g.items) if (it.cle === cle) return it;
  return null;
}

/** {cle} → quantité pour le nombre de portions de base ; {@calc} → valeur du calculateur. */
function texteEtape(texte, r) {
  const calc = textesCalcul(3, 'saignant');
  return texte.replace(/\{(@?)([a-z]+)\}/g, (m, a, cle) => {
    if (a) return calc[cle] ?? m;
    const it = trouver(r, cle);
    return it?.qte != null ? formater(it.qte, it.unite || 'piece') : m;
  });
}

function ligneIngredient(it) {
  const q = it.qte != null ? `${formater(it.qte, it.unite || 'piece')} ` : '';
  const extra = [it.note, it.optionnel ? 'facultatif' : null].filter(Boolean).join(', ');
  return new Paragraph({
    numbering: { reference: 'puces', level: 0 },
    children: [new TextRun({ text: q, bold: true }), new TextRun(it.nom), ...(extra ? [new TextRun({ text: ` (${extra})`, italics: true })] : [])],
  });
}

function ingredientsPour(r, mode) {
  const out = [];
  for (const g of r.ingredients) {
    if (g.mode && g.mode !== mode) continue;
    const items = g.items.filter((it) => !it.mode || it.mode === mode);
    if (!items.length) continue;
    if (g.groupe) out.push(new Paragraph({ children: [new TextRun({ text: g.groupe, italics: true })], spacing: { before: 120 } }));
    out.push(...items.map(ligneIngredient));
  }
  return out;
}

function version(r, mode, nom) {
  const v = r[mode];
  const temps = [
    ['Préparation', v.temps.preparation], ['Cuisson', v.temps.cuisson], ['Attente', v.temps.attente],
  ].filter(([, m]) => m).map(([l, m]) => `${l} : ${formaterDuree(m)}`).join(' · ');
  const out = [titre(`Version ${nom}`, HeadingLevel.HEADING_3)];
  if (temps) out.push(new Paragraph({ children: [new TextRun({ text: temps, italics: true })] }));
  out.push(titre('Ingrédients', HeadingLevel.HEADING_4), ...ingredientsPour(r, mode));
  out.push(titre('Étapes', HeadingLevel.HEADING_4));
  v.etapes.forEach((e) => {
    const o = typeof e === 'string' ? { texte: e } : e;
    const runs = [];
    if (o.titre) runs.push(new TextRun({ text: `${o.titre}. `, bold: true }));
    runs.push(new TextRun(texteEtape(o.texte, r)));
    if (o.minuteur) runs.push(new TextRun({ text: ` (⏱ ${formaterDuree(Math.round(o.minuteur / 60)) || `${o.minuteur} s`})`, italics: true }));
    out.push(new Paragraph({ numbering: { reference: `etapes-${r._id}-${mode}`, level: 0 }, children: runs, spacing: { after: 80 } }));
  });
  if (v.astuces?.length) {
    out.push(titre(mode === 'chef' ? 'Le mot du chef' : 'Astuces', HeadingLevel.HEADING_4));
    out.push(...v.astuces.map((a) => new Paragraph({ numbering: { reference: 'puces', level: 0 }, children: [new TextRun(a)] })));
  }
  return out;
}

function recette(entree, toutes, saut = true) {
  const r = { ...entree.data, _id: entree.id };
  const nom = (s) => toutes.find((x) => x.id === s)?.data.titre ?? s;
  const meta = [
    r.origine, TYPES[r.type] ?? r.type, r.saison ? SAISONS[r.saison] : null,
    `pour ${r.portions.base} ${r.portions.base >= 2 ? r.portions.pluriel : r.portions.unite}`,
  ].filter(Boolean).join(' · ');
  const out = [
    ...(saut ? [new Paragraph({ children: [new PageBreak()] })] : []),
    titre(r.titre + (r.nomVariante && r.varianteDe ? ` (${r.nomVariante})` : ''), HeadingLevel.HEADING_2),
    new Paragraph({ children: [new TextRun({ text: meta, color: '777777' })] }),
    new Paragraph({ children: [new TextRun({ text: r.resume, italics: true })], spacing: { after: 160 } }),
    ...version(r, 'simple', 'simple'),
    ...version(r, 'chef', 'grande cuisine'),
  ];
  if (r.notes?.length) {
    out.push(titre('Notes du carnet', HeadingLevel.HEADING_3));
    for (const n of r.notes) {
      out.push(new Paragraph({ children: [new TextRun({ text: n.titre, bold: true })] }));
      for (const bloc of n.texte.trim().split(/\n\s*\n/)) {
        const lignes = bloc.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lignes.every((l) => l.startsWith('- '))) out.push(...lignes.map((l) => new Paragraph({ numbering: { reference: 'puces', level: 0 }, children: [new TextRun(l.slice(2))] })));
        else out.push(p(lignes.join(' ')));
      }
    }
  }
  if (r.servirAvec?.length) out.push(p(`Servir avec : ${r.servirAvec.map(nom).join(', ')}`));
  if (r.voirAussi?.length) out.push(p(`Voir aussi : ${r.voirAussi.map(nom).join(', ')}`));
  if (r.sources?.length) {
    out.push(titre('Sources', HeadingLevel.HEADING_4));
    out.push(...r.sources.map((s) => new Paragraph({
      numbering: { reference: 'puces', level: 0 },
      children: [new ExternalHyperlink({ link: s.url, children: [new TextRun({ text: s.titre, style: 'Hyperlink' })] })],
    })));
  }
  return out;
}

export async function carnetWord(recettes, idees) {
  const tri = [...recettes].sort((a, b) => a.data.titre.localeCompare(b.data.titre, 'fr'));
  const corps = [];
  for (const c of CUISINES) {
    const rs = tri.filter((r) => r.data.cuisine === c.slug);
    if (!rs.length) continue;
    corps.push(new Paragraph({ children: [new PageBreak()] }), titre(c.titre, HeadingLevel.HEADING_1), p(c.intro));
    rs.forEach((r, i) => corps.push(...recette(r, tri, i > 0)));
  }
  if (idees.length) {
    corps.push(new Paragraph({ children: [new PageBreak()] }), titre('Idées à tester', HeadingLevel.HEADING_1));
    for (const i of idees) {
      const d = i.data;
      const runs = [new TextRun({ text: d.titre, bold: true })];
      if (d.note) runs.push(new TextRun(` — ${d.note}`));
      if (d.lien) runs.push(new TextRun(' '), new ExternalHyperlink({ link: d.lien, children: [new TextRun({ text: 'lien', style: 'Hyperlink' })] }));
      corps.push(new Paragraph({ numbering: { reference: 'puces', level: 0 }, children: runs }));
    }
  }

  const listesEtapes = tri.flatMap((r) => ['simple', 'chef'].map((m) => ({
    reference: `etapes-${r.id}-${m}`,
    levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.START, style: { paragraph: { indent: { left: 400, hanging: 400 } } } }],
  })));

  const date = new Intl.DateTimeFormat('fr-BE', { dateStyle: 'long' }).format(new Date());
  const doc = new Document({
    creator: 'Carnet de cuisine',
    title: 'Carnet de cuisine',
    features: { updateFields: true },
    styles: {
      default: { document: { run: { font: POLICE, size: 22 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 40, bold: true, color: BORDEAUX, font: POLICE }, paragraph: { spacing: { after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, color: BORDEAUX, font: POLICE }, paragraph: { spacing: { after: 80 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, font: POLICE }, paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 2 } },
        { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 22, bold: true, color: '555555', font: POLICE }, paragraph: { spacing: { before: 160, after: 60 }, outlineLevel: 3 } },
      ],
    },
    numbering: {
      config: [
        { reference: 'puces', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.START, style: { paragraph: { indent: { left: 400, hanging: 260 } } } }] },
        ...listesEtapes,
      ],
    },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1300, left: 1300, right: 1300 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], color: '777777', size: 18 })] })] }) },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 3000 }, children: [new TextRun({ text: 'Carnet de cuisine', size: 64, bold: true, color: BORDEAUX })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${tri.length} recettes, en version simple et grande cuisine`, italics: true })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Exporté le ${date}`, color: '777777' })] }),
        new Paragraph({ children: [new PageBreak()] }),
        titre('Sommaire', HeadingLevel.HEADING_1),
        new TableOfContents('Sommaire', { hyperlink: true, headingStyleRange: '1-2' }),
        ...corps,
      ],
    }],
  });
  return Packer.toBuffer(doc);
}
