// Arnés para probar código de Angular con `node --test`, sin TestBed ni
// navegador: compila el TypeScript real con esbuild (resolviendo los alias
// `src/*` del monorepo) y lo ejecuta sustituyendo de Angular solo lo que hace
// falta para que el módulo se pueda cargar.
//
// Por qué así y no con Karma/Jest: el repo ya corre todos sus tests con
// `node --test` y es lo que hacían a mano coach-notifications.test.cjs y
// planner-compare.test.cjs. Esto es esa misma técnica en un sitio, para que
// añadir un test nuevo cueste cuatro líneas en vez de cuarenta.
//
// Lo que se prueba es el código de producción tal cual: los dobles son solo
// los colaboradores que el test le pasa al construir la clase.
//
// Uso:
//   const { loadFromSource, repoRoot } = require(...'/tests/support/ng-harness.cjs');
//   const { MealComponent } = loadFromSource(__filename, __dirname, {
//     MealComponent: 'src/app/features/diets/components/meal/meal.component',
//   });

const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');

/** Sube desde `from` hasta la carpeta que tiene apps/ y packages/. */
function repoRoot(from) {
  let dir = path.resolve(from);
  while (true) {
    if (fs.existsSync(path.join(dir, 'apps')) && fs.existsSync(path.join(dir, 'packages'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`No se encontró la raíz del monorepo subiendo desde ${from}`);
    }
    dir = parent;
  }
}

const decorator = () => (target) => target;
const propertyDecorator = () => () => undefined;

/**
 * Lo mínimo de @angular/core para que un módulo se cargue. Cargar el de verdad
 * arrastra @angular/forms y @angular/common, que exigen el compilador JIT.
 *
 * `signal` es una implementación equivalente a la de Angular para lo que usan
 * los servicios (leer, set y update). Si un test necesita los signals reales,
 * puede pasarlos en `requires`.
 */
function angularCoreStub() {
  return {
    Component: decorator,
    Directive: decorator,
    Injectable: decorator,
    NgModule: decorator,
    Pipe: decorator,
    Input: propertyDecorator,
    Output: propertyDecorator,
    ViewChild: propertyDecorator,
    ViewChildren: propertyDecorator,
    HostListener: propertyDecorator,
    HostBinding: propertyDecorator,
    Optional: propertyDecorator,
    Self: propertyDecorator,
    SkipSelf: propertyDecorator,
    Host: propertyDecorator,
    Inject: propertyDecorator,
    EventEmitter: class {
      emit() {}
      subscribe() {
        return { unsubscribe() {} };
      }
    },
    signal: (initial) => {
      let value = initial;
      const accessor = () => value;
      accessor.set = (next) => {
        value = next;
      };
      accessor.update = (fn) => {
        value = fn(value);
      };
      accessor.asReadonly = () => accessor;
      return accessor;
    },
    computed: (fn) => fn,
    effect: () => ({ destroy() {} }),
    inject: () => ({}),
    ChangeDetectorRef: class {
      detectChanges() {}
      markForCheck() {}
    },
  };
}

function angularFormsStub() {
  return {
    FormControl: class {
      constructor(value) {
        this.value = value;
      }
    },
    FormGroup: class {},
    FormBuilder: class {},
    FormsModule: class {},
    ReactiveFormsModule: class {},
    Validators: { required: () => null, min: () => () => null, max: () => () => null },
    NgControl: class {},
  };
}

/**
 * Compila y carga exportaciones de ficheros .ts del monorepo.
 *
 * @param testFilename  __filename del test (para el módulo compilado).
 * @param resolveDir    __dirname del test (desde donde resuelve los imports).
 * @param exportsMap    { NombreExportado: 'ruta/del/modulo' } con alias src/*.
 * @param options.requires  Dobles extra o reales por nombre de módulo.
 * @param options.external  Paquetes que NO se meten en el bundle.
 */
function loadFromSource(testFilename, resolveDir, exportsMap, options = {}) {
  const { buildSync } = require('esbuild');
  const { Subject } = require('rxjs');
  const root = repoRoot(resolveDir);

  const contents = Object.entries(exportsMap)
    .map(([name, from]) => `export { ${name} } from '${from}';`)
    .join('');

  const bundled = buildSync({
    stdin: { contents, resolveDir, loader: 'ts' },
    tsconfig: path.join(root, 'apps/train-fit-front/tsconfig.json'),
    bundle: true,
    platform: 'node',
    format: 'cjs',
    write: false,
    external: options.external || [
      '@angular/*',
      '@ionic/*',
      'rxjs',
      'rxjs/*',
      '@ngx-translate/*',
      '@capacitor/*',
      'ng2-charts',
    ],
  });

  const defaults = {
    '@angular/core': angularCoreStub(),
    '@angular/core/rxjs-interop': { toObservable: () => new Subject() },
    '@angular/forms': angularFormsStub(),
    '@ngx-translate/core': { TranslateService: class {}, TranslateModule: class {} },
    '@ionic/angular': {
      ModalController: class {},
      IonicModule: class {},
      Platform: class {},
      IonRouterOutlet: class {},
    },
  };
  const requires = { ...defaults, ...(options.requires || {}) };

  const compiled = new Module(testFilename);
  compiled.require = (name) =>
    Object.prototype.hasOwnProperty.call(requires, name) ? requires[name] : require(name);
  compiled._compile(bundled.outputFiles[0].text, testFilename);

  const missing = Object.keys(exportsMap).filter((name) => compiled.exports[name] === undefined);
  if (missing.length) {
    // Sin esto, renombrar o mover una clase deja el test "pasando" sobre
    // undefined en vez de fallar.
    throw new Error(`No se pudieron cargar: ${missing.join(', ')}. ¿Cambió el nombre o la ruta?`);
  }

  return compiled.exports;
}

module.exports = { loadFromSource, repoRoot, angularCoreStub, angularFormsStub };
