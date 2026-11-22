/* Agent B (Claude) — small runtime for visitor/community "islands".
   Lets experiences.js and community.js handle their own interactions without new
   data-action handlers in src/app.js: elements use data-xp="name" instead, and only the
   island that changed is re-rendered. Styles are scoped (.xpb-*) and built on the shared
   RAMSA design tokens from styles.css; candidates to move into styles.css via an integration PR. */
import {state,s} from '../shared.js';

const handlers = {};
const islands = {};
const STORE = 'ramsa-agent-b';

export function on(name, fn) { handlers[name] = fn; }
/** Register an island renderer; returns the wrapped HTML for the first render. */
export function island(id, render) { islands[id] = render; return `<div id="${id}" class="xpb-island">${render()}</div>`; }
/** Re-render every registered island that is currently on the page, keeping keyboard focus. */
export function refresh() {
  const active = document.activeElement;
  const key = active && active.dataset ? active.dataset.focus : null;
  for (const [id, render] of Object.entries(islands)) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = render();
  }
  if (key) { const again = document.querySelector(`[data-focus="${CSS.escape(key)}"]`); if (again) again.focus({preventScroll: true}); }
}

/* ---------- persistence (demo progress only, never personal data) ---------- */
const defaults = {pearlDone: false, pearlBest: null, weaveDone: false, interests: [], contributions: [], workshops: [], terms: []};
export const store = (() => { try { return {...defaults, ...(JSON.parse(localStorage.getItem(STORE)) || {})}; } catch { return {...defaults}; } })();
export function save() { try { localStorage.setItem(STORE, JSON.stringify(store)); } catch { /* private mode: progress simply isn't kept */ } }
export function learnTerm(id) { if (!store.terms.includes(id)) { store.terms.push(id); save(); } }

/* ---------- feedback ---------- */
export function toast(message) {
  const target = document.getElementById('toast');
  if (!target) return;
  target.innerHTML = `<div class="notification">${message}</div>`;
  clearTimeout(toast.timer); toast.timer = setTimeout(() => { target.innerHTML = ''; }, 3200);
}
/** Optional narration with the device's own voices (not recorded Emirati narration). */
export function speak(text, lang) {
  if (!('speechSynthesis' in window)) { toast(s('النطق غير متاح في هذا المتصفح', 'Speech is unavailable in this browser')); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'ar' ? 'ar-AE' : 'en-US'; u.rate = .92;
  speechSynthesis.speak(u);
}
export function stopSpeech() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
export const reducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-xp]');
  if (!el || el.disabled) return;
  const fn = handlers[el.dataset.xp];
  if (!fn) return;
  e.preventDefault();
  fn(el.dataset, el);
});
document.addEventListener('submit', e => {
  const form = e.target.closest('form[data-xp-form]');
  if (!form) return;
  e.preventDefault();
  const fn = handlers[form.dataset.xpForm];
  if (fn) fn(Object.fromEntries(new FormData(form)), form);
});
document.addEventListener('keydown', e => {
  if (e.target.matches('input,textarea,select')) return;
  const host = e.target.closest('[data-xp-keys]') || document.querySelector('[data-xp-keys].xpb-keys-global');
  if (!host) return;
  const fn = handlers[host.dataset.xpKeys];
  if (fn && fn(e.key)) e.preventDefault();
});
window.addEventListener('hashchange', stopSpeech);

/* ---------- small shared view helpers ---------- */
export const chip = (label, on = false) => `<span class="xpb-chip ${on ? 'on' : ''}">${on ? '✓ ' : ''}${label}</span>`;
export const meter = (value, max, label) => `<div class="xpb-meter" role="progressbar" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${value}" aria-label="${label}"><span style="width:${Math.round(Math.min(1, value / max) * 100)}%"></span></div>`;
export const illustrative = () => `<span class="badge warning">${s('مثال توضيحي — ليس بيانات حقيقية', 'Illustrative example — not real data')}</span>`;
export const proposed = () => `<span class="badge">${s('ميزة مقترحة', 'Proposed feature')}</span>`;
export const isAr = () => state.lang === 'ar';

/* ---------- scoped styles (uses shared tokens only) ---------- */
const css = `
.xpb-island{display:contents}
.xpb-chip{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;background:#eef3f4;color:#3a5367;font-weight:700;font-size:.85rem;border:1px solid transparent}
.xpb-chip.on{background:#e6f4ed;color:#2d7863;border-color:#b9dccb}
.xpb-chips{display:flex;flex-wrap:wrap;gap:8px}
.xpb-meter{height:9px;border-radius:9px;background:rgba(255,255,255,.18);overflow:hidden}
.surface .xpb-meter,.xpb-light .xpb-meter{background:#e8ecef}
.xpb-meter span{display:block;height:100%;border-radius:9px;background:var(--gold);transition:width .35s}
.xpb-steps{display:flex;gap:8px;flex-wrap:wrap;margin:22px 0;padding:0;list-style:none}
.xpb-steps li{display:flex;align-items:center;gap:8px;padding:9px 13px;border:1px solid var(--line);border-radius:11px;background:#fff;color:var(--muted);font-size:.86rem;font-weight:700}
.xpb-steps li b{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#eef1f3;color:var(--navy);font-size:.8rem}
.xpb-steps li.on{background:var(--navy);color:#fff;border-color:var(--navy)}.xpb-steps li.on b{background:var(--gold);color:var(--navy)}
.xpb-steps li.done{color:#2d7863;border-color:#b9dccb;background:#f2faf6}.xpb-steps li.done b{background:#2d7863;color:#fff}
/* ---- pearl scene ---- */
.xpb-scene{position:relative;min-height:560px;border-radius:22px;overflow:hidden;color:#fff;border:1px solid #214c69;box-shadow:var(--shadow);isolation:isolate}
.xpb-layer{position:absolute;inset:0;z-index:0}
.xpb-sky{background:linear-gradient(180deg,#f1c995 0%,#f6dfb6 34%,#9fd0cf 46%,#2d7d96 62%,#0b4466 100%)}
.xpb-sun{position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#fff6d8 0,#ffd98f 45%,rgba(255,200,120,0) 70%);top:9%;inset-inline-end:12%}
.xpb-waves{position:absolute;inset:44% 0 auto;height:40px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 18px,transparent 18px 60px);opacity:.35;animation:xpbDrift 9s linear infinite}
.xpb-dhow{position:absolute;bottom:31%;inset-inline-start:50%;transform:translateX(-50%);width:min(560px,82%);filter:drop-shadow(0 18px 14px rgba(6,34,56,.45));animation:xpbBob 5s ease-in-out infinite}
[dir=rtl] .xpb-dhow{transform:translateX(50%)}
.xpb-underwater{background:radial-gradient(ellipse at 50% -10%,rgba(160,230,240,.55),transparent 55%),linear-gradient(180deg,#0e6b8f 0%,#0d5776 38%,#0a3e57 72%,#08293b 100%)}
.xpb-rays{position:absolute;inset:0;background:repeating-linear-gradient(105deg,transparent 0 40px,rgba(255,255,255,.07) 40px 70px,transparent 70px 150px);animation:xpbRays 14s linear infinite;mix-blend-mode:screen}
.xpb-seabed{position:absolute;inset:auto 0 0;height:30%;background:radial-gradient(ellipse at 20% 100%,#8a7a58 0,#5d5a48 40%,transparent 72%),radial-gradient(ellipse at 78% 105%,#7d6c4d 0,#4f4c3f 45%,transparent 75%),linear-gradient(180deg,transparent,#3f3f35 85%)}
.xpb-rock{position:absolute;border-radius:50% 50% 40% 45%;background:linear-gradient(160deg,#5f6a63,#323a37);box-shadow:inset -8px -10px 0 rgba(0,0,0,.18)}
.xpb-grass{position:absolute;bottom:0;width:6px;border-radius:6px 6px 0 0;background:linear-gradient(#3f8a62,#245a43);transform-origin:bottom;animation:xpbSway 4s ease-in-out infinite}
.xpb-fish{position:absolute;font-size:0;width:34px;height:14px;border-radius:50%;background:#e9b45c;opacity:.85;animation:xpbSwim 16s linear infinite}
.xpb-fish::after{content:'';position:absolute;inset-inline-end:-10px;top:1px;border:6px solid transparent;border-inline-end:0;border-inline-start-color:#e9b45c}
.xpb-content{position:relative;z-index:5;display:flex;flex-direction:column;min-height:560px;padding:24px}
.xpb-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.xpb-guide{display:flex;gap:12px;align-items:flex-start;max-width:640px;background:rgba(4,24,43,.66);backdrop-filter:blur(8px);border:1px solid rgba(160,190,210,.35);border-radius:16px;padding:14px 16px}
.xpb-avatar{flex:0 0 46px;height:46px;border-radius:50%;background:radial-gradient(circle at 50% 38%,#f0d1a8 0 30%,#16324f 31%);border:2px solid var(--gold)}
.xpb-guide p{margin:0;color:#e6f1f8;line-height:1.75}
.xpb-guide .who{font-size:.78rem;color:#f2d9a8;font-weight:800;margin-bottom:3px}
.xpb-hud{display:flex;gap:10px;flex-wrap:wrap}
.xpb-hud > div{background:rgba(5,30,46,.78);border:1px solid rgba(160,200,220,.3);border-radius:12px;padding:8px 12px;min-width:120px;font-weight:800;font-size:.88rem}
.xpb-hud .xpb-meter{margin-top:6px}
.xpb-bottom{margin-top:auto;display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;align-items:center}
.xpb-bottom .hint{margin-inline-end:auto;color:#eaf3f7;font-size:.9rem}
.xpb-hotspot{position:absolute;z-index:6;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;border:2px solid #fff;background:rgba(198,162,107,.88);color:#102747;font-weight:900;box-shadow:0 0 0 0 rgba(255,230,180,.7);animation:xpbPulse 2.2s infinite}
.xpb-hotspot.seen{background:rgba(255,255,255,.85);animation:none}
.xpb-hotspot:focus-visible,.xpb-oyster:focus-visible,.xpb-cell:focus-visible{outline:3px solid #ffd27a;outline-offset:3px}
.xpb-card-dark{background:rgba(4,24,43,.74);border:1px solid rgba(160,190,210,.35);border-radius:16px;padding:16px;color:#e6f1f8}
.xpb-tools{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:14px}
.xpb-tool{display:flex;flex-direction:column;gap:6px;text-align:start;color:#fff;background:rgba(4,24,43,.66);border:1px solid rgba(160,190,210,.4);border-radius:14px;padding:14px;min-height:150px}
.xpb-tool .ico{font-size:28px;line-height:1}
.xpb-tool.on{border-color:#7fd1a5;background:rgba(16,86,62,.72)}
.xpb-tool small{color:#cfe2ee;line-height:1.6}
.xpb-oyster{position:absolute;z-index:7;width:64px;height:48px;border:0;background:none;padding:0;translate:-50% 0;transition:transform .18s}
.xpb-oyster:hover{transform:scale(1.15)}
.xpb-oyster svg{width:100%;height:100%;filter:drop-shadow(0 6px 4px rgba(0,0,0,.35))}
.xpb-oyster.got{animation:xpbCollect .6s forwards;pointer-events:none}
.xpb-descend{position:absolute;inset:0;z-index:20;display:grid;place-items:center;background:linear-gradient(180deg,#2d7d96,#0a3e57);animation:xpbFadeOut 2.4s forwards}
.xpb-descend b{font-size:2.6rem}
.xpb-opened{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px;margin-top:14px}
.xpb-shell{border:1px solid rgba(255,255,255,.3);border-radius:14px;background:rgba(4,24,43,.6);color:#fff;padding:12px;min-height:110px;display:grid;place-items:center;text-align:center;font-weight:700}
.xpb-shell .pearl{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0,#efe9f3 40%,#bfb6c9 100%);box-shadow:0 0 18px #fff8;margin:auto}
.xpb-langs{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:16px}
.xpb-lang{border-radius:14px;padding:14px;border:1px solid rgba(255,255,255,.35);background:rgba(4,24,43,.86);color:#fff;font-weight:800;text-align:start}
.xpb-lang.on{background:var(--gold);color:#102747;border-color:var(--gold)}
.xpb-lang[disabled]{opacity:.55;cursor:not-allowed}
.xpb-lang small{display:block;font-weight:600;opacity:.85;margin-top:4px}
.xpb-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:16px 0}
.xpb-summary div{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);border-radius:14px;padding:14px;text-align:center}
.xpb-summary b{display:block;font-size:1.9rem;color:#f3d79f}
/* ---- weaving ---- */
.xpb-weave{border-radius:20px;padding:26px;background:linear-gradient(135deg,#b98d59,#6e5236);color:#fff;position:relative;overflow:hidden}
.xpb-weave::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,235,205,.05) 0 2px,transparent 2px 32px);pointer-events:none}
.xpb-weave > *{position:relative}
.xpb-mat{--n:6;display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:4px;padding:14px;border:8px solid #563b27;border-radius:14px;background:#4a3322;max-width:460px;margin-inline:auto}
.xpb-cell{aspect-ratio:1;border-radius:5px;border:0;padding:0;position:relative;overflow:hidden;background:repeating-linear-gradient(0deg,#d9c193 0 6px,#cbb07c 6px 12px)}
.xpb-cell::after{content:'';position:absolute;inset:0 30%;border-radius:3px;background:linear-gradient(90deg,#c4a46e,#e2cd9d,#c4a46e);opacity:.9}
.xpb-cell.over::after{inset:22% 0;background:var(--weft,#e9d9b0);box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -2px 0 rgba(0,0,0,.18);opacity:1}
.xpb-cell.under::before{content:'';position:absolute;inset:22% 0;background:var(--weft,#e9d9b0);opacity:.55}
.xpb-cell.under::after{z-index:1}
.xpb-cell.next{box-shadow:0 0 0 3px #ffd27a;animation:xpbPulse 1.6s infinite}
.xpb-cell.wrong{animation:xpbShake .35s}
.xpb-dyes{display:flex;gap:8px;flex-wrap:wrap}
.xpb-dye{width:38px;height:38px;border-radius:50%;border:3px solid rgba(255,255,255,.5)}
.xpb-dye.on{border-color:#fff;box-shadow:0 0 0 3px #102747}
.xpb-order{display:grid;gap:9px;margin-top:12px}
.xpb-order button{text-align:start;border-radius:12px;padding:12px 14px;border:1px solid #c6a578aa;background:rgba(29,25,20,.55);color:#fff;font-weight:700}
.xpb-order button.done{background:rgba(31,96,70,.75);border-color:#7fd1a5}
.xpb-material{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-top:12px}
.xpb-material button{text-align:start;border-radius:14px;padding:14px;border:1px solid #c6a578aa;background:rgba(29,25,20,.55);color:#fff}
.xpb-material button.seen{border-color:#7fd1a5}
.xpb-material b{display:block;font-size:1.05rem;margin-bottom:4px}
.xpb-material small{color:#f4e2c6;line-height:1.6}
.xpb-panel{background:rgba(29,25,20,.62);border:1px solid #c6a57880;border-radius:15px;padding:16px;margin-top:16px}
/* ---- community ---- */
.xpb-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.xpb-filter{border:1px solid #d6dde2;background:#fff;color:#4a5f73;border-radius:999px;padding:8px 14px;font-weight:800;font-size:.88rem}
.xpb-filter.on{background:var(--navy);color:#fff;border-color:var(--navy)}
.xpb-ws{display:flex;flex-direction:column;gap:10px}
.xpb-ws .meta{display:flex;flex-wrap:wrap;gap:6px}
.xpb-ws .actions{margin-top:auto;display:flex;gap:8px;flex-wrap:wrap}
.xpb-path{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:14px 0}
.xpb-path div{border-radius:12px;padding:12px 8px;text-align:center;background:#f1f5f6;color:#5b6c7d;font-weight:800;font-size:.84rem;border:1px solid transparent}
.xpb-path div.done{background:#e6f4ed;color:#2d7863;border-color:#b9dccb}
.xpb-path div.now{background:#fff7e8;color:#88643b;border-color:#e7cf9f}
.xpb-path div span{display:block;font-size:1.2rem;margin-bottom:4px}
.xpb-form{display:grid;gap:12px}
.xpb-form label{display:grid;gap:6px;font-weight:800;font-size:.9rem;color:var(--ink)}
.xpb-form input,.xpb-form select,.xpb-form textarea{border:1px solid #d6dde2;border-radius:10px;padding:10px 12px;background:#fff;color:var(--ink)}
.xpb-form .row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.xpb-review{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:10px 0}
.xpb-review div{font-size:.78rem;font-weight:800;text-align:center;padding:8px 4px;border-radius:9px;background:#f1f5f6;color:#6b7b8a}
.xpb-review div.done{background:#e6f4ed;color:#2d7863}
.xpb-review div.now{background:#fff7e8;color:#88643b}
.xpb-list{display:grid;gap:12px}
.xpb-item{border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff}
.xpb-profile{display:flex;gap:14px;align-items:flex-start}
.xpb-profile .ph{flex:0 0 58px;height:58px;border-radius:16px;display:grid;place-items:center;font-size:26px;background:#f5ecdc;color:#88643b}
.xpb-empty{color:var(--muted);font-size:.9rem;padding:12px;border:1px dashed #d6dde2;border-radius:12px;text-align:center}
@keyframes xpbDrift{to{background-position:240px 0}}
@keyframes xpbBob{0%,100%{translate:0 0}50%{translate:0 -8px}}
@keyframes xpbRays{to{background-position:600px 0}}
@keyframes xpbSway{0%,100%{rotate:-6deg}50%{rotate:6deg}}
@keyframes xpbSwim{from{inset-inline-start:-60px}to{inset-inline-start:110%}}
@keyframes xpbPulse{0%{box-shadow:0 0 0 0 rgba(255,220,150,.75)}70%{box-shadow:0 0 0 14px rgba(255,220,150,0)}100%{box-shadow:0 0 0 0 rgba(255,220,150,0)}}
@keyframes xpbCollect{to{transform:translateY(-60px) scale(.3);opacity:0}}
@keyframes xpbFadeOut{0%,65%{opacity:1}100%{opacity:0;visibility:hidden}}
@keyframes xpbShake{25%{translate:-4px 0}75%{translate:4px 0}}
@media(max-width:790px){.xpb-tools{grid-template-columns:repeat(2,minmax(0,1fr))}.xpb-path{grid-template-columns:repeat(2,minmax(0,1fr))}.xpb-review{grid-template-columns:repeat(2,minmax(0,1fr))}.xpb-form .row{grid-template-columns:1fr}.xpb-summary{grid-template-columns:1fr}}
@media(max-width:500px){.xpb-content{padding:14px}.xpb-scene,.xpb-content{min-height:720px}.xpb-hotspot{width:40px;height:40px}.xpb-dive .hint{display:none}.xpb-oyster{width:52px;height:40px}}
@media(prefers-reduced-motion:reduce){.xpb-island *{animation:none!important}}
`;
if (!document.getElementById('xpb-style')) {
  const tag = document.createElement('style'); tag.id = 'xpb-style'; tag.textContent = css; document.head.appendChild(tag);
}
