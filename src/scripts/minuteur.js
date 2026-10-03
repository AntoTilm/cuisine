// Minuteurs des étapes : un bouton par étape, plusieurs peuvent tourner en même temps.

let audio = null;

function reveillerAudio() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
  } catch {
    audio = null;
  }
}

function sonner() {
  if (audio) {
    try {
      for (let i = 0; i < 3; i++) {
        const t = audio.currentTime + i * 0.35;
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.type = 'square';
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        o.connect(g).connect(audio.destination);
        o.start(t);
        o.stop(t + 0.26);
      }
    } catch {
      /* pas de son disponible */
    }
  }
  try {
    navigator.vibrate?.([300, 150, 300, 150, 300]);
  } catch {
    /* pas de vibration disponible */
  }
}

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function libelleDuree(s) {
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return mm ? `${h} h ${String(mm).padStart(2, '0')}` : `${h} h`;
  }
  return r ? `${m} min ${String(r).padStart(2, '0')}` : `${m} min`;
}

export function brancherMinuteurs(racine = document) {
  racine.querySelectorAll('button.minuteur').forEach((b) => {
    const total = Number(b.dataset.s);
    let fin = 0;
    let iv = null;
    const repos = () => {
      clearInterval(iv);
      iv = null;
      b.dataset.etat = 'pret';
      b.textContent = `▶ ${libelleDuree(total)}`;
      b.setAttribute('aria-label', `Lancer un minuteur de ${libelleDuree(total)}`);
    };
    const tic = () => {
      const reste = Math.max(0, Math.round((fin - Date.now()) / 1000));
      if (reste <= 0) {
        clearInterval(iv);
        iv = null;
        b.dataset.etat = 'fini';
        b.textContent = 'Terminé';
        b.setAttribute('aria-label', 'Minuteur terminé. Toucher pour le remettre à zéro.');
        sonner();
        return;
      }
      b.textContent = `■ ${mmss(reste)}`;
    };
    b.addEventListener('click', () => {
      reveillerAudio();
      if (b.dataset.etat === 'marche' || b.dataset.etat === 'fini') {
        repos();
        return;
      }
      fin = Date.now() + total * 1000;
      b.dataset.etat = 'marche';
      b.setAttribute('aria-label', 'Arrêter le minuteur');
      tic();
      iv = setInterval(tic, 250);
    });
    repos();
  });
}
