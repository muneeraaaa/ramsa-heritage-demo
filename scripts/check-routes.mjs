import assert from 'node:assert/strict';
import {state} from '../src/shared.js';

const app = {};
const events = new Map();
globalThis.location = {hash: '#/home'};
globalThis.window = {
  addEventListener(name, listener) { events.set(name, listener); },
  scrollTo() {},
};
globalThis.document = {
  documentElement: {},
  addEventListener() {},
  getElementById(id) { return id === 'app' ? app : null; },
};
await import('../src/app.js');

const routes = [
  ['home', /class="home-hero|class="hero/],
  ['government', /data-action="choose-practice"/],
  ['government/inventory', /data-action="choose-practice"/],
  ['government/assessment', /id="metric-scarcity"/],
  ['government/interventions', /<details>/],
  ['government/documentation', /data-action="approve"/],
  ['government/impact', /class="mini-kpi"/],
  ['tourist', /href="#\/pearl"/],
  ['pearl', /data-action="set-(ar|en)"/],
  ['weaving', /data-action="weave-over"/],
  ['youth', /data-action="select-learn"/],
  ['artisan', /data-action="artisan-contribute"/],
  ['map', /data-action="region"/],
  ['gallery', /<video\b/],
  ['explore', /ajman2030\.ae/],
];
events.get('DOMContentLoaded')();
for (const [language, direction] of [['ar', 'rtl'], ['en', 'ltr']]) {
  state.lang = language;
  for (const [route, expected] of routes) {
    location.hash = '#/' + route;
    app.innerHTML = '';
    try {
      events.get('hashchange')();
      assert.equal(document.documentElement.dir, direction);
      assert.match(app.innerHTML, expected);
    } catch (cause) {
      throw new Error(`Could not render ${route} in ${language}`, {cause});
    }
  }
}
console.log(`${routes.length * 2} bilingual route checks passed`);
