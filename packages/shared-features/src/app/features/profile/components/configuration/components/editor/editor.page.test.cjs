const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { Subject, of, throwError } = require('rxjs');

// Configuración › Editar perfil. Teclear recalcula lo que se ve (calorías y
// macros), pero no escribe nada en el servidor: antes cada pulsación hacía un
// PUT del objetivo nutricional (y varios por cambio, porque un cambio dispara
// varios valueChanges; sin objetivo en uso llegaba a crear varios «Default»).
// Solo guardar (botón, o atrás → GUARDAR) escribe el perfil y el objetivo.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

// El arnés no trae formularios reactivos reales (piden el compilador JIT):
// estos dobles guardan el valor y emiten valueChanges como los de Angular.
class FakeControl {
  constructor(value) {
    this.value = value === undefined ? null : value;
    this.valueChanges = new Subject();
  }
  setValue(value, options = {}) {
    this.value = value;
    if (options.emitEvent !== false) this.valueChanges.next(value);
  }
  setValidators() {}
  clearValidators() {}
  updateValueAndValidity() {}
}

class FakeGroup {
  constructor(controls = {}) {
    this.controls = controls;
  }
  get value() {
    return Object.fromEntries(Object.entries(this.controls).map(([name, control]) => [name, control.value]));
  }
  get valid() {
    return true;
  }
  addControl(name, control) {
    this.controls[name] = control;
  }
  get(name) {
    return this.controls[name];
  }
  reset(values) {
    for (const [name, control] of Object.entries(this.controls)) control.setValue(values[name] ?? null);
  }
}

const validator = () => () => null;
const forms = {
  FormControl: FakeControl,
  FormGroup: FakeGroup,
  Validators: {
    required: () => null,
    compose: () => null,
    min: validator,
    max: validator,
    minLength: validator,
    maxLength: validator,
  },
};

const { EditorPage } = loadFromSource(
  __filename,
  __dirname,
  { EditorPage: 'src/app/features/profile/components/configuration/components/editor/editor.page' },
  { app: 'train-fit-front', requires: { '@angular/forms': forms } }
);

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

// Perfil con 70 kg. El doble de la calculadora da macros que cuadran con las
// kcal (4·proteína + 4·hidratos + 9·grasa = kcal) y dependen del peso, para
// ver que al guardar se mandan los del formulario actual y no unos viejos.
function setup({ withGoal = true, coach = false, userFails = false, goalFails = false } = {}) {
  const server = [];
  const ui = { toasts: [], alerts: [], closed: 0 };
  let local = {
    _id: 'u1',
    name: 'Ana',
    lastname: 'Pérez',
    email: 'ana@test.dev',
    weight: 70,
    height: 170,
    birth: '1990-01-01',
    sex: 0,
    steps: 1.37,
    activity: null,
    objetive: -300,
    training: 1.264,
    workoutInUse: 'w1',
    tableInUse: 't1',
    goalInUse: withGoal ? 'g1' : undefined,
  };

  const userService = {
    get getLocalUser() {
      return local;
    },
    set setLocalUser(user) {
      local = user;
    },
    setUserMacrosAndKcal: (user) => ({
      ...user,
      kcalTotal: user.weight * 30,
      proteinsGTotal: user.weight * 2,
      carbohydratesGTotal: user.weight * 3.5,
      fatGTotal: (user.weight * 8) / 9,
    }),
    getActivityFactor: () => undefined,
    // Como el real: el usuario local queda con la respuesta del servidor.
    updateUser: (body) => {
      server.push(['user', body]);
      if (userFails) return throwError(() => new Error('PUT /users'));
      local = { ...local, ...body };
      return of(local);
    },
  };
  const goals = {
    update: (id, data) => {
      server.push(['goal.update', id, data]);
      return goalFails ? throwError(() => new Error('PUT /goals')) : of({ _id: id, ...data });
    },
    create: (data) => {
      server.push(['goal.create', data]);
      const goal = { _id: 'g-new', ...data };
      if (!local.goalInUse) local = { ...local, goalInUse: goal._id };
      return of(goal);
    },
    setActive: (id) => {
      server.push(['goal.setActive', id]);
      local = { ...local, goalInUse: id };
      return of({ goalInUse: id });
    },
  };
  const ionic = {
    showToast: (options) => ui.toasts.push(options),
    showAlert: (options) => {
      ui.alerts.push(options);
      return Promise.resolve({});
    },
    closeModal: () => {
      ui.closed++;
    },
  };
  const translate = { instant: (key) => key, currentLang: 'es' };
  const coachService = { hasNutritionCoach: () => coach };

  const component = new EditorPage(userService, goals, ionic, translate, coachService);
  component.ngOnInit();
  return { component, server, ui, local: () => local };
}

const set = (component, name, value) => component.userForm.controls[name].setValue(value);

// Lo que haría quien teclea: varias pulsaciones en peso y alguna en otros campos.
async function typeSomething(component) {
  for (const weight of [7, 71, 72, 73]) set(component, 'weight', weight);
  set(component, 'height', 1);
  set(component, 'height', 175);
  set(component, 'steps', 1.46);
  set(component, 'objetive', 250);
  await tick();
}

test('teclear recalcula las kcal y los macros de la vista', async () => {
  const { component } = setup();
  await typeSomething(component);
  assert.equal(component.userForm.controls.kcalTotal.value, 2190);
  assert.equal(component.userForm.controls.proteinsGTotal.value, 146);
});

test('teclear no escribe nada en el servidor (ni perfil ni objetivo)', async () => {
  const { component, server } = setup();
  await typeSomething(component);
  assert.deepEqual(server, []);
});

test('teclear sin objetivo en uso tampoco crea objetivos', async () => {
  const { component, server } = setup({ withGoal: false });
  await typeSomething(component);
  assert.deepEqual(server, []);
});

test('guardar escribe el perfil y el objetivo en uso, una vez, con los macros del formulario', async () => {
  const { component, server, ui } = setup();
  await typeSomething(component);

  component.updateUser();

  assert.equal(server.length, 2);
  const [[userCall, body], [goalCall, goalId, macros]] = server;
  assert.equal(userCall, 'user');
  assert.equal(body.weight, 73);
  assert.equal(body.height, 175);
  assert.equal(body.objetive, -250);
  assert.equal(goalCall, 'goal.update');
  assert.equal(goalId, 'g1');
  assert.deepEqual(macros, {
    kcalTotal: 2190,
    proteinsGTotal: 146,
    carbohydratesGTotal: 255.5,
    fatGTotal: 64.89,
  });
  assert.equal(ui.closed, 1);
  assert.equal(ui.toasts[0].color, 'success');
  assert.equal(component.loading, false);
});

test('atrás → GUARDAR hace lo mismo que el botón', async () => {
  const { component, server, ui } = setup();
  await typeSomething(component);

  component.close();
  assert.equal(ui.alerts.length, 1);
  assert.deepEqual(server, [], 'abrir el aviso de salida no guarda');

  ui.alerts[0].buttons.find((button) => button.text === 'EDITOR.SAVE_BTN').handler();

  assert.deepEqual(server.map(([call]) => call), ['user', 'goal.update']);
  assert.equal(ui.closed, 1);
});

test('atrás → DESCARTAR cierra sin escribir nada', async () => {
  const { component, server, ui } = setup();
  await typeSomething(component);

  component.close();
  ui.alerts[0].buttons.find((button) => button.role === 'destructive').handler();
  await tick();

  assert.deepEqual(server, []);
  assert.equal(ui.closed, 1);
});

test('atrás sin cambios cierra sin avisar ni escribir', async () => {
  const { component, server, ui } = setup();
  component.close();
  assert.deepEqual(server, []);
  assert.equal(ui.alerts.length, 0);
  assert.equal(ui.closed, 1);
});

test('guardar sin cambios avisa y no llama al servidor', () => {
  const { component, server, ui } = setup();
  component.updateUser();
  assert.deepEqual(server, []);
  assert.equal(ui.toasts[0].color, 'warning');
  assert.equal(ui.closed, 0);
  assert.equal(component.loading, false);
});

test('cambiar solo el nombre guarda el perfil y deja el objetivo como está', async () => {
  const { component, server } = setup();
  set(component, 'name', 'Bea');
  await tick();

  component.updateUser();

  assert.deepEqual(server.map(([call]) => call), ['user']);
  assert.equal(server[0][1].name, 'Bea');
});

test('con profesional de nutrición, cambiar el perfil no pisa su objetivo', async () => {
  const { component, server } = setup({ coach: true });
  await typeSomething(component);

  component.updateUser();

  assert.deepEqual(server.map(([call]) => call), ['user']);
});

test('sin objetivo en uso, guardar crea el primero y lo activa sin perder goalInUse', async () => {
  const { component, server, local } = setup({ withGoal: false });
  await typeSomething(component);

  component.updateUser();

  assert.deepEqual(server.map(([call]) => call), ['user', 'goal.create', 'goal.setActive']);
  assert.equal(server[1][1].name, 'Default');
  assert.equal(server[1][1].kcalTotal, 2190);
  assert.equal(server[2][1], 'g-new');
  assert.equal(local().goalInUse, 'g-new');
});

test('si falla guardar el perfil, el objetivo no se toca y el aviso sale', async () => {
  const { component, server, ui } = setup({ userFails: true });
  await typeSomething(component);

  component.updateUser();

  assert.deepEqual(server.map(([call]) => call), ['user']);
  assert.equal(ui.closed, 0);
  assert.equal(ui.toasts[0].color, 'danger');
  assert.equal(component.loading, false);
});

test('si falla guardar el objetivo, avisa y no cierra', async () => {
  const { component, ui } = setup({ goalFails: true });
  await typeSomething(component);

  component.updateUser();

  assert.equal(ui.closed, 0);
  assert.equal(ui.toasts[0].color, 'danger');
  assert.equal(component.loading, false);
});
