import assert from 'node:assert/strict';
import {state} from '../src/shared.js';

const app = {};
const toast = {};
const events = new Map();
const documentEvents = new Map();
const listen = registry => (name, listener) => {
  const listeners = registry.get(name) ?? [];
  listeners.push(listener);
  registry.set(name, listeners);
};
const dispatch = (registry, name, event) => {
  for (const listener of registry.get(name) ?? []) listener(event);
};
let hash = '#/home';
globalThis.location = {
  get hash() { return hash; },
  set hash(value) { hash = value.startsWith('#') ? value : '#' + value; },
};
globalThis.window = {
  location,
  addEventListener: listen(events),
  scrollTo() {},
};
globalThis.document = {
  documentElement: {},
  head: {appendChild() {}},
  createElement() { return {}; },
  addEventListener: listen(documentEvents),
  getElementById(id) {
    if (id === 'app') return app;
    if (id === 'toast') return toast;
    return null;
  },
};
await import('../src/app.js');

const routes = [
  ['home', /class="home-hero|class="hero/],
  ['government', /data-action="choose-practice"/],
  ['government/inventory', /data-action="choose-practice"/],
  ['government/assessment', /id="metric-scarcity"/],
  ['government/interventions', /<details>/],
  ['government/review', /href="#\/government\/documentation"/],
  ['government/documentation', /data-action="approve"/],
  ['government/impact', /class="mini-kpi"/],
  ['tourist', /href="#\/pearl"/],
  ['pearl', /data-xp="pearl-lang"/],
  ['weaving', /data-xp="weave-mat"/],
  ['youth', /data-xp="y-path"/],
  ['artisan', /data-xp="a-tab"/],
  ['map', /data-action="region"/],
  ['gallery', /<video\b/],
  ['explore', /ajman2030\.ae/],
];
dispatch(events, 'DOMContentLoaded');
for (const [language, direction] of [['ar', 'rtl'], ['en', 'ltr']]) {
  state.lang = language;
  for (const [route, expected] of routes) {
    location.hash = '#/' + route;
    app.innerHTML = '';
    try {
      dispatch(events, 'hashchange');
      assert.equal(document.documentElement.dir, direction);
      assert.match(app.innerHTML, expected);
    } catch (cause) {
      throw new Error(`Could not render ${route} in ${language}`, {cause});
    }
  }
}
console.log(`${routes.length * 2} bilingual route checks passed`);

function click(action) {
  dispatch(documentEvents, 'click', {
    target: {closest: selector => selector === '[data-action]' ? {dataset: {action}} : null},
    preventDefault() {},
  });
}

const tour = ['home', 'government/assessment', 'government/review', 'government/documentation',
  'pearl', 'youth', 'artisan', 'government/impact'];
click('tour-start');
for (const [index, route] of tour.entries()) {
  assert.equal(location.hash, '#/' + route);
  assert.match(app.innerHTML, new RegExp(`Judging tour · ${index + 1}/${tour.length}`));
  if (route === 'government/review') {
    assert.match(app.innerHTML, /Safeguarding decision brief/);
    click('tour-prev');
    assert.equal(location.hash, '#/government/assessment');
    click('tour-next');
    assert.equal(location.hash, '#/government/review');
  }
  click('tour-next');
}
assert.equal(location.hash, '#/explore');
assert.equal(state.tour, false);
console.log('Judging tour checks passed');
