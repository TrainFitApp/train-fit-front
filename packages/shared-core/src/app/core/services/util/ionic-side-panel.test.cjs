const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, 'ionic-util.service.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true },
}).outputText;
const token = { ModalController: class {}, AngularDelegate: class {}, EnvironmentInjector: class {} };

function element(classes = []) {
  const values = new Set(classes);
  const attributes = new Map();
  const listeners = new Map();
  return {
    classList: { add: (...names) => names.forEach((name) => values.add(name)), remove: (...names) => names.forEach((name) => values.delete(name)), contains: (name) => values.has(name) },
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
    getAttribute: (name) => attributes.get(name),
    addEventListener(name, fn) { if (!listeners.has(name)) listeners.set(name, []); listeners.get(name).push(fn); },
    removeEventListener(name, fn) { listeners.set(name, (listeners.get(name) || []).filter((value) => value !== fn)); },
    dispatch(name, event = {}) { for (const fn of listeners.get(name) || []) fn(event); },
  };
}

function harness() {
  const outlet = element();
  const overlays = [];
  const document = { ...element(), activeElement: null, body: { querySelector: () => outlet }, querySelector: () => null, querySelectorAll: () => overlays.filter((overlay) => overlay.isConnected) };
  const exportsObject = {};
  vm.runInNewContext(compiled, {
    exports: exportsObject,
    document,
    setTimeout,
    require(name) {
      if (name === '@angular/core') return { Injectable: () => () => undefined, EnvironmentInjector: token.EnvironmentInjector, Injector: { create: (options) => options } };
      if (name === '@ionic/angular') return token;
      return {};
    },
  });
  const service = Object.create(exportsObject.IonicUtilService.prototype);
  const controller = {
    async create(options) {
      const modal = { ...element(['overlay-hidden', ...(options.cssClass || [])]), ...options, id: `panel-${overlays.length}`, isConnected: true };
      const wrapper = element();
      modal.shadowRoot = { querySelector: () => wrapper };
      modal.closest = () => modal;
      let complete;
      const dismissed = new Promise((resolve) => { complete = resolve; });
      modal.onDidDismiss = () => dismissed;
      modal.present = async () => {
        outlet.setAttribute('aria-hidden', 'true');
        overlays.filter((other) => other !== modal).forEach((other) => other.setAttribute('aria-hidden', 'true'));
        modal.classList.remove('overlay-hidden');
      };
      modal.dismiss = async (data, role) => {
        if (!modal.isConnected) return false;
        modal.dispatch('ionModalWillDismiss');
        modal.isConnected = false;
        modal.classList.add('overlay-hidden');
        complete({ data, role });
        return true;
      };
      overlays.push(modal);
      return modal;
    },
    dismiss: (data, role, id) => overlays.find((modal) => modal.id === id)?.dismiss(data, role),
    getTop: async () => overlays.filter((modal) => modal.isConnected).at(-1),
  };
  Object.assign(service, {
    sidePanelStack: [], sidePanelParents: new Map(), sidePanelsOverParent: new Set(), sidePanelAccessibilityCleanup: null,
    modalController: controller,
    injector: { get: (value) => value === token.AngularDelegate ? { create: (_env, injector) => injector } : {} },
  });
  return { service, document, overlays, outlet, controller };
}

const flush = () => new Promise((resolve) => setImmediate(resolve));
const scopedController = (modal) => modal.delegate.providers[0].useValue;

test('Planner crea panel sin backdrop/focus trap y deja router accesible', async () => {
  const state = harness();
  const result = state.service.showSidePanel({ component: class {}, cssClass: 'tf-panel-modal' });
  await flush();
  const panel = state.overlays[0];
  assert.equal(panel.showBackdrop, false);
  assert.equal(panel.classList.contains('ion-disable-focus-trap'), true);
  assert.equal(panel.shadowRoot.querySelector().getAttribute('aria-modal'), 'false');
  assert.equal(state.outlet.getAttribute('aria-hidden'), undefined);
  await panel.dismiss();
  await result;
});

test('guardar/cerrar panel anterior no cierra otro panel independiente', async () => {
  const state = harness();
  const firstResult = state.service.showSidePanel({ component: class {} });
  await flush();
  const secondResult = state.service.showSidePanel({ component: class {} });
  await flush();
  const [first, second] = state.overlays;
  await scopedController(first).dismiss('saved');
  assert.equal((await firstResult).data, 'saved');
  assert.equal(second.isConnected, true);
  assert.equal(second.classList.contains('tf-panel-modal'), true);
  await second.dismiss();
  await secondResult;
});

test('padre e hijo siguen accesibles; cerrar padre descarta su hijo', async () => {
  const state = harness();
  const parentResult = state.service.showSidePanel({ component: class {} });
  await flush();
  const parent = state.overlays[0];
  state.document.activeElement = state.document.body;
  const childResult = state.service.showNestedModal({ component: class {} }, parent);
  await flush();
  const child = state.overlays[1];
  assert.equal(parent.getAttribute('aria-hidden'), undefined);
  assert.equal(parent.classList.contains('tf-panel-modal--covered'), false);
  assert.equal(child.classList.contains('tf-planner-panel'), true);
  await scopedController(parent).dismiss();
  assert.equal((await childResult).role, 'cancel');
  await parentResult;
  assert.equal(child.isConnected, false);
});

test('encima del padre: misma columna, y lo que abra sale a su izquierda', async () => {
  const state = harness();
  const searchResult = state.service.showSidePanel({ component: class {} });
  await flush();
  const search = state.overlays[0];
  const configResult = state.service.showNestedModal({ component: class {} }, search, { overParent: true });
  await flush();
  const config = state.overlays[1];
  assert.equal(config.classList.contains('tf-panel-modal'), true);
  const setResult = state.service.showNestedModal({ component: class {} }, config);
  await flush();
  const set = state.overlays[2];
  assert.equal(set.classList.contains('tf-panel-modal-left'), true);
  await set.dismiss();
  await setResult;
  await config.dismiss();
  await configResult;
  assert.equal(state.service.sidePanelsOverParent.size, 0);
  await search.dismiss();
  await searchResult;
});

test('confirmación modal conserva router oculto hasta que se cierra', async () => {
  const state = harness();
  const result = state.service.showSidePanel({ component: class {} });
  await flush();
  const alert = { ...element(), isConnected: true };
  state.overlays.push(alert);
  state.outlet.setAttribute('aria-hidden', 'true');
  state.service.syncSidePanelAccessibility();
  assert.equal(state.outlet.getAttribute('aria-hidden'), 'true');
  alert.isConnected = false;
  state.service.syncSidePanelAccessibility();
  assert.equal(state.outlet.getAttribute('aria-hidden'), undefined);
  await state.overlays[0].dismiss();
  await result;
});

test('modales fuera de Planner conservan su comportamiento aunque exista un panel', async () => {
  const state = harness();
  const panelResult = state.service.showSidePanel({ component: class {} });
  await flush();
  let ordinaryCalls = 0;
  state.service.showModal = async () => { ordinaryCalls++; return {}; };
  // Aunque el foco siga en Planner, manda el origen explícito de la acción.
  state.document.activeElement = state.overlays[0];
  await state.service.showNestedModal({ component: class {} });
  await state.service.showNestedModal({ component: class {} }, { isConnected: true, closest: () => null });
  const normalModal = { isConnected: true, closest: () => normalModal };
  await state.service.showNestedModal({ component: class {} }, normalModal);
  assert.equal(ordinaryCalls, 3);
  await state.overlays[0].dismiss();
  await panelResult;
});

test('el origen explícito conserva el padre aunque el foco cambie a otro panel', async () => {
  const state = harness();
  const parentResult = state.service.showSidePanel({ component: class {} });
  await flush();
  const otherResult = state.service.showSidePanel({ component: class {} });
  await flush();
  const [parent, other] = state.overlays;
  state.document.activeElement = other;
  const childResult = state.service.showNestedModal({ component: class {} }, parent);
  await flush();
  const child = state.overlays[2];
  assert.equal(state.service.sidePanelParents.get(child), parent);
  await other.dismiss();
  await otherResult;
  assert.equal(child.isConnected, true);
  await parent.dismiss();
  assert.equal((await childResult).role, 'cancel');
  await parentResult;
});

test('origen cerrado durante una espera asíncrona no abre un modal huérfano', async () => {
  const state = harness();
  const parentResult = state.service.showSidePanel({ component: class {} });
  await flush();
  const parent = state.overlays[0];
  await parent.dismiss();
  await parentResult;
  let ordinaryCalls = 0;
  state.service.showModal = async () => { ordinaryCalls++; return {}; };
  const result = await state.service.showNestedModal({ component: class {} }, parent);
  assert.equal(result.role, 'cancel');
  assert.equal(ordinaryCalls, 0);
  assert.equal(state.overlays.length, 1);
});

test('salir de Planner cierra todos los paneles y retira listeners', async () => {
  const state = harness();
  const first = state.service.showSidePanel({ component: class {} });
  await flush();
  const second = state.service.showSidePanel({ component: class {} });
  await flush();
  await state.service.closeSidePanels();
  await Promise.all([first, second]);
  assert.equal(state.overlays.some((panel) => panel.isConnected), false);
  assert.equal(state.service.sidePanelAccessibilityCleanup, null);
});
