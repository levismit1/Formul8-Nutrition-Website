/* Formul8 site script. Plain JavaScript, no build step. */
(() => {
'use strict';

/* ------------------------------------------------------------------
   Config. Change values here, nowhere else.
------------------------------------------------------------------ */
const CONFIG = {
  VIDEO_URL: 'assets/hero-scrub.mp4',
  VIDEO_BYTES: 5131741,                  // real byte size of hero-scrub.mp4, the fallback when Content-Length is missing
  POSTER_URL: 'assets/hero-poster.jpg'
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const smoothstep = (p, e0, e1) => {
  const t = clamp((p - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
const easeOut = t => 1 - Math.pow(1 - t, 3);

const reduceQ = matchMedia('(prefers-reduced-motion: reduce)');

/* ------------------------------------------------------------------
   Text splitting: seeded, so the "random" offsets are identical on every load
------------------------------------------------------------------ */
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function splitWords(el) {
  const plain = el.textContent.replace(/\s+/g, ' ').trim();
  const rand = rng(seedFrom(plain));
  const words = [];
  el.childNodes.forEach(n => {
    const em = n.nodeType === 1 && n.tagName === 'EM';
    (n.textContent || '').replace(/\s+/g, ' ').split(' ').forEach(w => { if (w) words.push({ t: w, em }); });
  });
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = plain;
  const vis = document.createElement('span');
  vis.setAttribute('aria-hidden', 'true');
  const n = words.length;
  words.forEach((w, i) => {
    const sp = document.createElement('span');
    sp.className = 'w' + (w.em ? ' em' : '');
    sp.style.setProperty('--th', ((i / n) * 0.46 + rand() * 0.05).toFixed(3));
    sp.textContent = w.t;
    vis.appendChild(sp);
    if (i < n - 1) vis.appendChild(document.createTextNode(' '));
  });
  el.textContent = '';
  el.append(sr, vis);
}
$$('.band .line').forEach(el => splitWords(el));

/* ------------------------------------------------------------------
   The hero: a scroll-scrubbed video, then the page settles
------------------------------------------------------------------ */
const hero = $('#top');
const stage = $('#stage');
const video = $('#heroVideo');
const posterLayer = $('.poster', stage);
const ring = $('.ring', stage);

/* The five static-hero gates. Identical, character for character, to the CSS media query. */
const GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)'
];

const bands = $$('.band', stage).map((el, i, all) => ({
  el,
  a: +el.dataset.a,
  b: +el.dataset.b,
  ramp: el.dataset.ramp ? +el.dataset.ramp : null,
  first: i === 0,
  last: i === all.length - 1,
  op: -1,
  k: -1,
  on: false
}));

/* Layout numbers, measured once and on resize, never inside the scroll handler */
let heroTop = 0, heroRange = 1, vh = innerHeight;
function measure() {
  vh = innerHeight;
  heroTop = hero.getBoundingClientRect().top + scrollY;
  heroRange = Math.max(1, hero.offsetHeight - vh);
}
function heroProgress() { return clamp((scrollY - heroTop) / heroRange, 0, 1); }

/* Band pacing is set in scroll distance (vh), not progress, so it holds when the hero is resized.
   Ramps are 18vh at each edge; text assembly settles about 20vh into a band. */
const RAMP_VH = 18;
const ASSEMBLE_VH = 20;

let loadK = 0;          // band one's time-based opening ramp, handed over to scroll
let pastCue = false;
function updateCaptions(p) {
  const rangeVh = (heroRange / vh) * 100;
  const rampP = RAMP_VH / rangeVh;
  for (const bd of bands) {
    const { a, b } = bd;
    const f = Math.min(rampP, (b - a) / 3);
    const opIn = bd.first ? 1 : smoothstep(p, a, a + f);
    const opOut = bd.last ? 1 : 1 - smoothstep(p, b - f, b);
    const op = opIn * opOut;
    const assemble = bd.ramp || Math.min(ASSEMBLE_VH / rangeVh, (b - a) * 0.5);
    let k = clamp((p - a) / assemble, 0, 1);
    if (bd.first) k = Math.max(k, loadK);

    if (bd.op < 0 || Math.abs(op - bd.op) >= 0.004 || (op === 0 && bd.op !== 0) || (op === 1 && bd.op !== 1)) {
      bd.op = op;
      bd.el.style.opacity = op.toFixed(3);
      const on = op > 0.6;
      if (on !== bd.on) { bd.on = on; bd.el.classList.toggle('on', on); }
    }
    if (bd.k < 0 || Math.abs(k - bd.k) >= 0.008 || (k === 0 && bd.k !== 0) || (k === 1 && bd.k !== 1)) {
      bd.k = k;
      bd.el.style.setProperty('--k', k.toFixed(3));
    }
  }
  const past = p > 0.03;
  if (past !== pastCue) { pastCue = past; stage.classList.toggle('past', past); }
}

/* Gate the seeks: never write currentTime while a seek is in flight */
let seekBusy = false;
let pendingTime = null;
function requestSeek(t) {
  if (!video.duration) return;
  if (seekBusy) { pendingTime = t; return; }
  seekBusy = true;
  video.currentTime = t;
}
video.addEventListener('seeked', () => {
  seekBusy = false;
  if (pendingTime !== null) {
    const t = pendingTime;
    pendingTime = null;
    requestSeek(t);
  }
});
video.addEventListener('error', () => { seekBusy = false; pendingTime = null; });

/* Lerp the displayed time in a rAF loop that rests when converged */
let target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true;
function tick(now) {
  const dt = Math.min(100, now - (lastTick || now));
  lastTick = now;
  const k = 0.16;   // per 60fps frame
  shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
  if (Math.abs(target - shown) < 0.0005) {
    shown = target;
    rafId = null;
    lastTick = 0;
  } else {
    rafId = requestAnimationFrame(tick);
  }
  requestSeek(shown * (video.duration || 0));
  updateCaptions(shown);
}
function onScroll() {
  target = heroProgress();
  if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
}
new IntersectionObserver(([e]) => { heroOnScreen = e.isIntersecting; }, { threshold: 0 }).observe(hero);

/* Streamed Blob with an honest loading ring. The poster paints first, the video streams behind it. */
let heroInited = false;
function initHeroOnce() {
  if (heroInited) return;
  heroInited = true;
  posterLayer.style.backgroundImage = `url('${CONFIG.POSTER_URL}')`;
  let started = false;
  const startBlobFetch = () => {
    if (started) return;
    started = true;
    loadHeroBlob().catch(failVideo);
  };
  const posterImg = new Image();
  posterImg.onload = startBlobFetch;
  posterImg.onerror = startBlobFetch;
  posterImg.src = CONFIG.POSTER_URL;
  setTimeout(startBlobFetch, 4000);   // a hung poster never blocks the video forever
}
async function loadHeroBlob() {
  const ctrl = new AbortController();
  let watchdog = setTimeout(() => ctrl.abort(), 20000);
  const res = await fetch(CONFIG.VIDEO_URL, { priority: 'low', signal: ctrl.signal });
  if (!res.ok) throw new Error('video ' + res.status);
  const total = Number(res.headers.get('Content-Length')) || CONFIG.VIDEO_BYTES || 1;
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0, lastRing = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    clearTimeout(watchdog);
    watchdog = setTimeout(() => ctrl.abort(), 20000);
    chunks.push(value);
    got += value.length;
    const frac = Math.min(1, got / total);
    const now = performance.now();
    if (now - lastRing > 100 || frac === 1) {
      lastRing = now;
      ring.style.setProperty('--ld', Math.round(126 * (1 - frac)));
    }
  }
  clearTimeout(watchdog);
  ring.style.setProperty('--ld', 0);
  video.src = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }));
  video.load();
  video.addEventListener('canplay', () => {
    requestSeek(heroProgress() * video.duration);
    stage.classList.add('video-ready');
  }, { once: true });
}
function failVideo() { stage.classList.add('video-failed'); }

/* Gates are decided live, in both directions: rotate, resize, or flip reduced motion mid-session */
let scrubOn = false;
let loadRampStarted = false;
/* Band one opens settled: its words assemble on load, then scroll takes over */
function startLoadRamp() {
  if (loadRampStarted) return;
  loadRampStarted = true;
  const run = () => {
    let t0 = 0;
    const step = now => {
      t0 = t0 || now;
      loadK = easeOut(clamp((now - t0) / 1200, 0, 1));
      updateCaptions(shown);
      if (loadK < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))]).then(run);
  } else run();
}
function enableScrub() {
  if (scrubOn) return;
  scrubOn = true;
  measure();
  initHeroOnce();
  addEventListener('scroll', onScroll, { passive: true });
  bands.forEach(b => { b.op = -1; b.k = -1; });   // reset caches so stale static styles get rewritten
  unpinFinalStates();
  shown = target = heroProgress();
  updateCaptions(shown);
  onScroll();                                       // re-seek to the current position, or the frame sits stale
  startLoadRamp();
}
function disableScrub() {
  if (!scrubOn) return;
  scrubOn = false;
  removeEventListener('scroll', onScroll);
  if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
}
function applyHeroMode() {
  if (GATES.some(q => matchMedia(q).matches)) disableScrub();
  else enableScrub();
}
const MQLS = GATES.map(q => matchMedia(q));          // keep references so the listeners survive
MQLS.forEach(m => m.addEventListener('change', applyHeroMode));

/* ------------------------------------------------------------------
   Self-drawing lines: the vine, the connector, the closing 8
------------------------------------------------------------------ */
const drawers = [];
$$('.vine').forEach(v => {
  const sec = v.parentElement;
  // A segment is fully drawn exactly when its section's bottom reaches 80% of the viewport,
  // which is when the next segment starts, so the vine reads as one continuous line.
  drawers.push({ path: $('.trace', v), val: -1, p: () => clamp((vh * 0.8 - sec.getBoundingClientRect().top) / sec.offsetHeight, 0, 1) });
});
const partsEl = $('.parts');
if (partsEl) drawers.push({ path: $('.parts-line .trace'), val: -1, p: () => clamp((vh * 0.88 - partsEl.getBoundingClientRect().top) / (vh * 0.42), 0, 1) });
const waitlistEl = $('#waitlist');
if (waitlistEl) drawers.push({ path: $('.eight .trace'), val: -1, p: () => clamp((vh * 0.92 - waitlistEl.getBoundingClientRect().top) / (vh * 0.8), 0, 1), after: p => $('.eight').classList.toggle('sprouted', p > 0.92) });

let drawQueued = false;
function drawFrame() {
  drawQueued = false;
  if (reduceQ.matches) return;
  for (const d of drawers) {
    const p = d.p();
    if (d.val < 0 || Math.abs(p - d.val) >= 0.004 || (p === 0 && d.val !== 0) || (p === 1 && d.val !== 1)) {
      d.val = p;
      d.path.style.strokeDashoffset = p <= 0 ? '1.05' : (1 - p).toFixed(4);
      if (d.after) d.after(p);
    }
  }
}
function queueDraw() {
  if (drawQueued) return;
  drawQueued = true;
  requestAnimationFrame(drawFrame);
}
addEventListener('scroll', queueDraw, { passive: true });

/* ------------------------------------------------------------------
   Entrances, living elements, tab visibility
------------------------------------------------------------------ */
const revealIO = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('in');
      revealIO.unobserve(el);
      const i = parseInt(el.style.getPropertyValue('--i'), 10) || 0;
      setTimeout(() => el.classList.add('settled'), 1100 + i * 110 + 120);   // retire the stagger delay
    }), { threshold: 0.16, rootMargin: '0px 0px -6% 0px' })
  : null;
$$('.reveal, .sprout').forEach(el => revealIO ? revealIO.observe(el) : el.classList.add('in', 'settled'));

const liveIO = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('live', e.isIntersecting)), { threshold: 0 });
$$('.hero, .doubt, .ritual, .inside, .faq, .waitlist').forEach(s => liveIO.observe(s));

document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));

/* ------------------------------------------------------------------
   The one interactive moment: hold to stir
------------------------------------------------------------------ */
const ritual = $('#ritual');
const stir = $('#stir');
const stirLabel = $('.stir-label', stir);
const LABEL = { idle: 'Hold to stir', go: 'Stirring', done: 'Stirred.' };
let sp = 0, spVal = -1, spin = 0, holding = false, stirDone = false, stirPinned = false, stirRaf = 0, stirLast = 0;

function setLabel(t) { if (stirLabel.textContent !== t) stirLabel.textContent = t; }
function writeStir() {
  const v = Math.round(sp * 500) / 500;
  if (v !== spVal) { spVal = v; stir.style.setProperty('--sp', v); }
  stir.style.setProperty('--spin', spin.toFixed(1));
}
function completeStir(pinned) {
  if (stirDone) return;
  stirDone = true;
  stirPinned = !!pinned;
  sp = 1;
  holding = false;
  writeStir();
  ritual.classList.add('done');
  setLabel(LABEL.done);
}
function resetStir() {
  stirDone = false;
  stirPinned = false;
  sp = 0; spVal = -1;
  ritual.classList.remove('done');
  setLabel(LABEL.idle);
  writeStir();
}
function stirTick(now) {
  const dt = Math.min(64, now - (stirLast || now));
  stirLast = now;
  if (!stirDone) {
    sp = clamp(sp + (holding ? dt / 1500 : -dt / 950), 0, 1);   // builds while held, eases back, never snaps
    spin += dt * (holding ? 0.55 : 0.06);
    setLabel(holding || sp > 0 ? LABEL.go : LABEL.idle);
    writeStir();
    if (sp >= 1) completeStir(false);
  }
  if (!stirDone && (holding || sp > 0)) stirRaf = requestAnimationFrame(stirTick);
  else { stirRaf = 0; stirLast = 0; }
}
function kickStir() { if (!stirRaf && !stirDone) stirRaf = requestAnimationFrame(stirTick); }
stir.addEventListener('pointerdown', e => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  holding = true;
  try { stir.setPointerCapture(e.pointerId); } catch (_) {}
  kickStir();
});
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => stir.addEventListener(t, () => { holding = false; }));
stir.addEventListener('contextmenu', e => e.preventDefault());
stir.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); completeStir(false); }   // keyboard and screen readers: one press
});
stir.addEventListener('click', e => { if (e.detail === 0) completeStir(false); });

/* ------------------------------------------------------------------
   Questions
------------------------------------------------------------------ */
$$('.faq-item').forEach(item => {
  const btn = $('.q', item);
  btn.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});

/* ------------------------------------------------------------------
   The waitlist form
------------------------------------------------------------------ */
const form = $('#wlForm');
const emailInput = $('#wlEmail');
const msg = $('#wlMsg');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* The endpoint lives in the form's action attribute (one source of truth).
   Formspree answers JSON when asked: 200 on success, 4xx with { errors: [{ field, message }] } otherwise. */
const COPY = {
  badEmail: 'That email looks off. Mind checking it?',
  ok: 'You are on the list. We will email you when Formul8 is ready.',
  fail: 'Something went wrong on our side. Please try again in a moment.'
};
const SEND_TIMEOUT_MS = 12000;
let sending = false;

function showMsg(kind, text) {
  msg.className = kind ? 'msg ' + kind : 'msg';
  msg.textContent = text;
}
function showBadEmail() {
  emailInput.setAttribute('aria-invalid', 'true');
  showMsg('err', COPY.badEmail);
  emailInput.focus();
}
function showSent() {
  form.classList.add('sent');
  showMsg('ok', COPY.ok);
}
async function sendToFormspree() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SEND_TIMEOUT_MS);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),                  // email, the subject line, and the spam trap
      headers: { Accept: 'application/json' },
      signal: ctrl.signal
    });
    if (res.ok) return { ok: true };
    let data = null;
    try { data = await res.json(); } catch (_) { /* not JSON, fall through to the generic error */ }
    const emailProblem = data && Array.isArray(data.errors) && data.errors.some(x => x.field === 'email');
    return { ok: false, emailProblem };
  } finally {
    clearTimeout(timer);
  }
}
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (sending) return;
  const value = emailInput.value.trim();
  emailInput.value = value;
  if (!EMAIL_RE.test(value)) { showBadEmail(); return; }
  emailInput.removeAttribute('aria-invalid');
  showMsg('', '');
  if (form.elements._gotcha && form.elements._gotcha.value) { showSent(); return; }   // a bot filled the trap: look happy, send nothing
  const btn = $('button[type="submit"]', form);
  sending = true;
  btn.disabled = true;
  form.setAttribute('aria-busy', 'true');
  try {
    const result = await sendToFormspree();
    if (result.ok) showSent();
    else if (result.emailProblem) showBadEmail();
    else showMsg('err', COPY.fail);
  } catch (err) {
    showMsg('err', COPY.fail);                   // offline, timed out, or blocked
  } finally {
    sending = false;
    btn.disabled = false;
    form.removeAttribute('aria-busy');
  }
});
emailInput.addEventListener('input', () => { if (emailInput.getAttribute('aria-invalid')) emailInput.removeAttribute('aria-invalid'); });

/* ------------------------------------------------------------------
   Reduced motion, honored live in both directions
------------------------------------------------------------------ */
function pinToFinalStates() {
  // Lines are pinned by CSS (!important). Here: the stir completes, drives stop.
  completeStir(true);
}
function unpinFinalStates() {
  if (stirPinned) resetStir();
  drawers.forEach(d => { d.val = -1; });
  queueDraw();
}
reduceQ.addEventListener('change', e => {
  if (e.matches) pinToFinalStates();
  else { unpinFinalStates(); applyHeroMode(); }
});

/* ------------------------------------------------------------------
   Go
------------------------------------------------------------------ */
addEventListener('resize', () => { measure(); if (scrubOn) { onScroll(); } queueDraw(); });
addEventListener('load', () => { measure(); if (scrubOn) onScroll(); queueDraw(); });
measure();
applyHeroMode();
if (reduceQ.matches) pinToFinalStates();
queueDraw();
})();
