const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { loadFromSource, repoRoot } = require('../../../../../../../../../tests/support/ng-harness.cjs');

// Navegación de la ficha de cliente: secciones y subpestañas. Suplementación
// salió de la columna lateral de Plan > Nutrición a una subpestaña propia
// junto a Hábitos, visible con cualquier scope (el back no lo pide).

const { CLIENT_DETAIL_SECTIONS, SECTION_BY_TAB } = loadFromSource(
  __filename,
  __dirname,
  {
    CLIENT_DETAIL_SECTIONS: './client-detail.model',
    SECTION_BY_TAB: './client-detail.model',
  },
  { app: 'train-fit-trainers' }
);

const planTabs = () => CLIENT_DETAIL_SECTIONS.find((section) => section.key === 'plan').tabs;

test('Suplementación es una subpestaña de Plan justo después de Hábitos', () => {
  const keys = planTabs().map((tab) => tab.key);
  assert.equal(keys.indexOf('supplements'), keys.indexOf('tasks') + 1);
  assert.equal(SECTION_BY_TAB.supplements, 'plan');
});

test('Suplementación no depende del scope del cliente', () => {
  const supplements = planTabs().find((tab) => tab.key === 'supplements');
  assert.equal(supplements.requiresScope, undefined);
  assert.ok(supplements.icon);
});

test('cada sección y subpestaña tiene su nombre en es y en', () => {
  const i18nDir = path.join(repoRoot(__dirname), 'apps/train-fit-trainers/src/assets/i18n');
  for (const lang of ['es', 'en']) {
    const clientDetail = require(path.join(i18nDir, `${lang}.json`)).CLIENT_DETAIL;
    for (const section of CLIENT_DETAIL_SECTIONS) {
      assert.ok(clientDetail.SECTIONS[section.key], `${lang}: CLIENT_DETAIL.SECTIONS.${section.key}`);
      for (const tab of section.tabs) {
        assert.ok(clientDetail.TABS[tab.key], `${lang}: CLIENT_DETAIL.TABS.${tab.key}`);
      }
    }
  }
});
