// Page recette : mode simple / grande cuisine, portions, liste de courses, minuteurs.
import { formater } from '../lib/quantites.js';
import { lignesRecette, fusionner, parRayon, texteQuantite, enTexte } from '../lib/courses.js';
import { textesCalcul } from '../lib/entrecote.js';
import { modePrefere, memoriserMode, ajouterRecette, dansLaListe } from './stockage.js';
import { brancherMinuteurs } from './minuteur.js';
import { personnes } from '../lib/assiette.js';

const article = document.querySelector('article.recette');
if (article) {
  const recette = JSON.parse(document.getElementById('donnees-recette').textContent);
  const { base, pas, unite, pluriel } = recette.portions;
  const min = recette.portions.min ?? pas;
  const url = new URL(location.href);

  let mode = url.searchParams.get('mode') === 'chef' || url.searchParams.get('mode') === 'simple'
    ? url.searchParams.get('mode')
    : modePrefere();
  let portions = Number(url.searchParams.get('p')) || recette.portions.defaut || base;

  const champPortions = article.querySelector('#portions');
  const uniteEl = article.querySelector('[data-unite-portions]');
  const boutonsMode = article.querySelectorAll('[data-choix-mode]');
  const panneauCourses = article.querySelector('#courses');
  const boutonAjout = article.querySelector('#ajouter-liste');
  const etatAjout = article.querySelector('#etat-liste');

  // --- Assiette (accompagnements) ------------------------------------------
  const choixAssiette = article.querySelectorAll('[data-assiette]');
  const accompagnements = new Map(
    (recette.assiette || []).flatMap((g) => g.choix).map((c) => [c.slug, c]),
  );
  const demandes = url.searchParams.get('avec');
  if (demandes != null && choixAssiette.length) {
    const voulus = new Set(demandes.split(',').filter(Boolean));
    choixAssiette.forEach((i) => (i.checked = i.value ? voulus.has(i.value) : false));
    // Un groupe à choix unique sans rien de coché : « aucun ».
    const groupes = new Set([...choixAssiette].map((i) => i.name));
    groupes.forEach((n) => {
      const ins = [...article.querySelectorAll(`[name="${n}"]`)];
      if (!ins.some((i) => i.checked)) {
        const aucun = ins.find((i) => !i.value);
        if (aucun) aucun.checked = true;
      }
    });
  }
  const choisis = () => [...choixAssiette].filter((i) => i.checked && i.value).map((i) => i.value);
  const nbPersonnes = () => personnes(portions, recette.portions.parPersonne);
  const accompagnementsAAcheter = () =>
    choisis()
      .map((s) => accompagnements.get(s))
      .filter((c) => c && !c.horsRecette)
      .map((c) => ({ slug: c.slug, recette: c, portions: nbPersonnes() }));

  function majAssiette() {
    if (!choixAssiette.length) return;
    const n = nbPersonnes();
    article.querySelectorAll('[data-personnes]').forEach((e) => (e.textContent = String(n)));
    article.querySelectorAll('[data-personnes-unite]').forEach((e) => (e.textContent = n >= 2 ? 'personnes' : 'personne'));
    const actifs = new Set(choisis());
    article.querySelectorAll('[data-menu]').forEach((li) => {
      li.hidden = !actifs.has(li.dataset.menu);
      const a = li.querySelector('[data-lien-accompagnement]');
      if (a) {
        const u = new URL(a.href, location.href);
        u.searchParams.set('p', String(n));
        u.searchParams.set('mode', mode);
        a.href = u.pathname + u.search;
      }
    });
  }

  // --- Quantités ------------------------------------------------------------
  function majQuantites() {
    const f = portions / base;
    article.querySelectorAll('.qte[data-q]').forEach((el) => {
      el.textContent = formater(Number(el.dataset.q) * f, el.dataset.u);
    });
    champPortions.value = String(portions);
    uniteEl.textContent = portions >= 2 ? pluriel : unite;
  }

  // --- Liste de courses de la recette --------------------------------------
  function majCourses() {
    majAssiette();
    const avec = accompagnementsAAcheter();
    const lignes = [
      ...lignesRecette(recette, portions, mode),
      ...avec.flatMap((a) => lignesRecette(a.recette, a.portions, mode)),
    ];
    const rayons = parRayon(fusionner(lignes));
    panneauCourses.replaceChildren(
      ...rayons.map((r) => {
        const bloc = document.createElement('section');
        bloc.className = 'rayon';
        const h = document.createElement('h3');
        h.textContent = r.nom;
        const ul = document.createElement('ul');
        r.items.forEach((i) => {
          const li = document.createElement('li');
          const nom = document.createElement('span');
          nom.className = 'nom';
          nom.textContent = i.nom + (i.optionnel ? ' (facultatif)' : '');
          if (avec.length) {
            const pour = document.createElement('span');
            pour.className = 'pour';
            pour.textContent = i.recettes.join(', ');
            nom.append(pour);
          }
          const q = document.createElement('span');
          q.className = 'quantite';
          q.textContent = texteQuantite(i);
          li.append(nom, q);
          ul.append(li);
        });
        bloc.append(h, ul);
        return bloc;
      }),
    );
    panneauCourses.dataset.texte = enTexte(
      rayons,
      `${recette.titre}${avec.length ? ` avec ${avec.map((a) => a.recette.titre.toLowerCase()).join(', ')}` : ''} (${portions} ${portions >= 2 ? pluriel : unite}, ${mode === 'chef' ? 'grande cuisine' : 'simple'})`,
    );
    majEtatListe();
  }

  function majEtatListe() {
    const e = dansLaListe(recette.slug);
    if (!e) {
      boutonAjout.textContent = 'Ajouter à ma liste de courses';
      etatAjout.hidden = true;
      return;
    }
    const avec = accompagnementsAAcheter().map((a) => a.slug).join(',');
    const identique = e.portions === portions && e.mode === mode && (e.avec || []).join(',') === avec;
    boutonAjout.textContent = identique ? 'Dans ma liste de courses' : 'Mettre à jour ma liste de courses';
    etatAjout.hidden = false;
  }

  boutonAjout.addEventListener('click', () => {
    ajouterRecette(recette.slug, portions, mode, accompagnementsAAcheter());
    majEtatListe();
  });

  article.querySelector('#copier-courses')?.addEventListener('click', async (ev) => {
    const b = ev.currentTarget;
    try {
      await navigator.clipboard.writeText(panneauCourses.dataset.texte || '');
      b.textContent = 'Liste copiée';
    } catch {
      b.textContent = 'Copie impossible ici';
    }
    setTimeout(() => (b.textContent = 'Copier la liste'), 2500);
  });

  // --- Mode --------------------------------------------------------------
  function appliquerMode(m, memoriser) {
    mode = m;
    article.dataset.mode = m;
    boutonsMode.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.choixMode === m)));
    if (memoriser) memoriserMode(m);
    majCourses();
    majUrl();
  }
  boutonsMode.forEach((b) => b.addEventListener('click', () => appliquerMode(b.dataset.choixMode, true)));

  // --- Portions ------------------------------------------------------------
  function changerPortions(n) {
    if (!Number.isFinite(n)) return;
    portions = Math.max(min, Math.round(n / pas) * pas || min);
    majQuantites();
    majCourses();
    majUrl();
  }
  article.querySelector('[data-portions="moins"]').addEventListener('click', () => changerPortions(portions - pas));
  article.querySelector('[data-portions="plus"]').addEventListener('click', () => changerPortions(portions + pas));
  champPortions.addEventListener('change', () => changerPortions(Number(champPortions.value)));

  function majUrl() {
    const u = new URL(location.href);
    u.searchParams.set('mode', mode);
    if (portions !== (recette.portions.defaut || base)) u.searchParams.set('p', String(portions));
    else u.searchParams.delete('p');
    if (choixAssiette.length) u.searchParams.set('avec', choisis().join(','));
    history.replaceState(null, '', u);
  }

  choixAssiette.forEach((i) =>
    i.addEventListener('change', () => {
      majCourses();
      majUrl();
    }),
  );

  // --- Onglets du panneau ------------------------------------------------
  const onglets = article.querySelectorAll('[role="tab"]');
  onglets.forEach((o) =>
    o.addEventListener('click', () => {
      onglets.forEach((x) => {
        const actif = x === o;
        x.setAttribute('aria-selected', String(actif));
        x.tabIndex = actif ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !actif;
      });
    }),
  );

  // --- Étapes cochées dans la marge -------------------------------------
  article.querySelectorAll('.etape .numero').forEach((n) =>
    n.addEventListener('click', () => {
      const fait = n.getAttribute('aria-pressed') !== 'true';
      n.setAttribute('aria-pressed', String(fait));
      n.closest('.etape').classList.toggle('faite', fait);
    }),
  );

  // --- Calculateur de cuisson -------------------------------------------
  const calc = article.querySelector('.calculateur');
  if (calc) {
    const epaisseur = calc.querySelector('#epaisseur');
    const sortie = calc.querySelector('#epaisseur-valeur');
    const majCalc = () => {
      const cuisson = calc.querySelector('input[name="cuisson"]:checked').value;
      const e = Number(epaisseur.value);
      sortie.textContent = `${String(e).replace('.', ',')} cm`;
      const t = textesCalcul(e, cuisson);
      article.querySelectorAll('[data-calc]').forEach((el) => (el.textContent = t[el.dataset.calc]));
    };
    calc.addEventListener('input', majCalc);
    majCalc();
  }

  // --- Écran allumé ---------------------------------------------------------
  const boutonEcran = article.querySelector('#ecran');
  if (boutonEcran) {
    if (!('wakeLock' in navigator)) boutonEcran.hidden = true;
    let verrou = null;
    let voulu = false;
    const demander = async () => {
      try {
        verrou = await navigator.wakeLock.request('screen');
        boutonEcran.setAttribute('aria-pressed', 'true');
        verrou.addEventListener('release', () => {
          verrou = null;
          if (!voulu) boutonEcran.setAttribute('aria-pressed', 'false');
        });
      } catch {
        voulu = false;
        boutonEcran.setAttribute('aria-pressed', 'false');
      }
    };
    boutonEcran.addEventListener('click', () => {
      voulu = !voulu;
      if (voulu) demander();
      else {
        verrou?.release();
        boutonEcran.setAttribute('aria-pressed', 'false');
      }
    });
    document.addEventListener('visibilitychange', () => {
      if (voulu && !verrou && document.visibilityState === 'visible') demander();
    });
  }

  window.addEventListener('carnet:liste', majEtatListe);
  window.addEventListener('storage', majEtatListe);

  brancherMinuteurs(article);
  majQuantites();
  appliquerMode(mode, false);
}
