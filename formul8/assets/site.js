/* Formul8 site script. Plain JavaScript, no build step.
   Three small jobs: the signup forms, the questions, and the phone menu. */
(() => {
'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ------------------------------------------------------------------
   Phone menu
------------------------------------------------------------------ */
const menuBtn = $('.menu-btn');
const menu = $('#menu');
if (menuBtn && menu) {
  const setMenu = open => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  };
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
  matchMedia('(min-width: 821px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
}

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
   The waitlist forms (one in the hero, one at the bottom)
   The endpoint lives in each form's action attribute. Formspree answers JSON when asked:
   200 on success, 4xx with { errors: [{ field, message }] } otherwise.
------------------------------------------------------------------ */
const COPY = {
  badEmail: 'That email looks off. Mind checking it?',
  ok: 'You are on the list. We will email you when Formul8 is ready.',
  fail: 'Something went wrong on our side. Please try again in a moment.'
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SEND_TIMEOUT_MS = 12000;

async function sendToFormspree(form) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SEND_TIMEOUT_MS);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),                  // email, subject line, which form it came from, and the spam trap
      headers: { Accept: 'application/json' },
      signal: ctrl.signal
    });
    if (res.ok) return { ok: true };
    let data = null;
    try { data = await res.json(); } catch (_) { /* not JSON: fall through to the generic error */ }
    const emailProblem = !!(data && Array.isArray(data.errors) && data.errors.some(x => x.field === 'email'));
    return { ok: false, emailProblem };
  } finally {
    clearTimeout(timer);
  }
}

$$('.wl-form').forEach(form => {
  const input = $('input[name="email"]', form);
  const msg = $('.msg', form);
  const btn = $('button[type="submit"]', form);
  let sending = false;

  const show = (kind, text) => { msg.className = kind ? 'msg ' + kind : 'msg'; msg.textContent = text; };
  const badEmail = () => { input.setAttribute('aria-invalid', 'true'); show('err', COPY.badEmail); input.focus(); };
  const sent = () => { form.classList.add('sent'); show('ok', COPY.ok); };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending) return;
    const value = input.value.trim();
    input.value = value;
    if (!EMAIL_RE.test(value)) { badEmail(); return; }
    input.removeAttribute('aria-invalid');
    show('', '');
    const trap = form.elements._gotcha;
    if (trap && trap.value) { sent(); return; }   // a bot filled the trap: look happy, send nothing
    sending = true;
    btn.disabled = true;
    form.setAttribute('aria-busy', 'true');
    try {
      const result = await sendToFormspree(form);
      if (result.ok) sent();
      else if (result.emailProblem) badEmail();
      else show('err', COPY.fail);
    } catch (err) {
      show('err', COPY.fail);                     // offline, timed out, or blocked
    } finally {
      sending = false;
      btn.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
  input.addEventListener('input', () => { if (input.getAttribute('aria-invalid')) input.removeAttribute('aria-invalid'); });
});
})();
