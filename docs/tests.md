# Tests del front

Estado a **2026-10-01**. La parte del backend está en `train-fit-back/docs/tests.md`.

## Cómo se ejecutan

```
npm test                                          # todo: 358 casos
node --experimental-strip-types --test <fichero>  # uno solo
npm run verify                                    # lint + test (lo que corre el hook pre-push)
```

`npm test` **descubre los ficheros por glob** (`packages/**`, `apps/*/src/**`,
`tests/**`). No hay lista a mano que mantener, y `tests/test-discovery.test.cjs`
falla si aparece un test fuera de esas raíces o con una extensión que los globs
no recogen.

> Hasta 2026-10 la lista sí era a mano: 18 ficheros en disco y 10 en el script.
> De los 8 que se quedaban fuera, 5 casos llevaban meses sin pasar (un método
> renombrado, un texto migrado a i18n, un constructor con una dependencia nueva)
> y uno tapaba un bug real en el RIR de la tabla del microciclo.

No hay Karma ni Jest a propósito: todo corre con `node --test`, que es lo que ya
usaba el repo.

`npm run verify` (= `lint` + `test`) es lo que corre el hook `pre-push` antes
de un push a `develop` o `main`, así que un test que falle impide subir. Los
builds no lo ejecutan. Ver `docs/lint.md`.

## Cómo se prueba código de Angular sin TestBed

`tests/support/ng-harness.cjs` compila el TypeScript real con esbuild
(resolviendo los alias `src/*`) y lo carga sustituyendo de Angular solo lo que
hace falta para que el módulo se pueda importar: decoradores que no hacen nada,
`signal` equivalente y `toObservable`, que necesita contexto de inyección.
**El código que se prueba es el de producción, sin tocar**; los dobles son los
colaboradores que el test pasa al construir la clase.

```js
const fs = require('node:fs');
const path = require('node:path');
function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) {
    dir = path.dirname(dir);
  }
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { MealComponent } = loadFromSource(__filename, __dirname, {
  MealComponent: 'src/app/features/diets/components/meal/meal.component',
});
```

Si la clase se renombra o se mueve, `loadFromSource` **lanza**. Sin eso, el test
seguiría "pasando" sobre `undefined`, que es exactamente lo que le ocurrió a
`my-checkins-track-by` durante meses.

Para un componente basta `Object.create(Clase.prototype)` y asignarle a mano los
colaboradores que usan los métodos que se prueban: ver
`meal-card.test.cjs` o `workout-inline-edit.test.cjs`.

Para extraer unos pocos métodos de un fichero enorme sin cargarlo entero, hay
otro patrón con el AST de TypeScript en `tests/my-checkins-track-by.test.cjs`.

## Cómo se escribe un test aquí

- **Nombre del caso en castellano y en forma de afirmación**: lo que tiene que
  pasar, no el nombre del método.
- **Un comentario con el POR QUÉ** cuando el caso existe por un bug real o por
  una decisión de producto.
- **Los límites, por los dos lados**; y los datos a medias (`null`, `0`, `""`,
  texto donde se espera número, el documento sin poblar) cuentan como casos.
- **La lógica pura, a un `.util.ts` con su `.test.js`** cuando se pueda: es más
  barato de probar que a través del componente. Ejemplos:
  `shared-core/utils/quick-add.util.ts`, `shopping-list.util.ts`,
  `body-metrics.util.ts`.

## Espejos con el backend

La misma aritmética existe en los dos lados. Si se separa, el cliente y su
profesional ven números distintos de lo mismo, así que los tests de las dos
mitades afirman **los mismos números con los mismos datos**:

| Cálculo | Front | Backend |
|---|---|---|
| Macros de una comida y de una receta | `shared-core/.../services/nutrition-math.test.cjs` | `dietDays/diet-days-nutrition-util.test.js` |
| Totales del día (pautado vs. consumido) | `shared-core/.../diet-day/diet-day-totals.test.cjs` | `dietDays/diet-days-nutrition-util.test.js` |
| Lista de la compra | `shared-core/utils/shopping-list.test.js` | `dietDays/shopping-list-service.test.js` |

Las diferencias que se dejan a propósito están escritas como casos con el
prefijo `DIFERENCIA CONOCIDA` o `DIFERENCIA DELIBERADA`, para que salten si
alguien cambia un lado. Hoy hay dos:

- Un **ingrediente de receta con cantidad negativa** (dato imposible por las
  vías normales): el front lo ignora, el backend lo resta.
- Los **chips de una comida** cuentan lo pautado sin marcar; el **total del día**
  no. Son dos preguntas distintas a propósito ("de qué es esta comida" vs. "qué
  he comido hoy").

## Qué está cubierto

| Área | Líneas TS | Ficheros de test |
|---|---|---|
| `shared-core/services` | 12801 | 5 |
| `shared-features/diets` | 13772 | 1 |
| `shared-features/tables` | 12223 | 1 |
| `shared-features/coach` | 1217 | 2 |
| `shared-core/utils` | 620 | 3 |
| `shared-ui/pipes` | 316 | 1 |
| `shared-core/models` | 1180 | 1 |
| `shared-ui/directives` | 55 | 1 |

Dentro de esas áreas, lo cubierto es la aritmética nutricional, los totales del
día, la carrera de creación del día, el pipe de medidas, la tarjeta de comida,
la edición en línea de la tabla del microciclo, las notificaciones del coach y
la comparación de microciclos del planificador. El resto de esos miles de líneas
son componentes de pantalla todavía sin probar.

## Qué NO está cubierto

| Área | Líneas TS | Por qué importa |
|---|---|---|
| `shared-ui/components` | 5499 | Teclado numérico, selector de RIR, antropometría, media |
| `shared-features/profile` | 4897 | Configuración, objetivos nutricionales, editor |
| `shared-features/authentication` | 2646 | Alta, verificación y recuperación de contraseña |
| `shared-features/exercises` | 2596 | Buscador de ejercicios y notas del entrenador |
| `shared-ui/constants` | 1774 | Catálogos de pantalla |
| `shared-core/models` | 1180 | `rir.ts` ya está cubierto; el resto son tipos |
| `shared-features/onboarding-status` | 867 | Alta guiada (intake) |
| `shared-core/constants` | 853 | Traducciones de BD y catálogos |
| `shared-features/diet-days` | 692 | Peso y medidas del día |
| `shared-features/checkins` | 628 | Respuesta a check-ins |
| `shared-features/premium` | 524 | Límites de plan y RevenueCat |
| Otras 10 áreas | ~2700 | Dolor, suplementos, preferencias, lista de la compra, i18n, validadores |

**Por dónde seguir**, en orden de lo que más duele que falle en silencio:

1. `shared-core/validators` y `shared-core/interceptors` — validación de
   formularios y renovación del token. Puros o casi.
2. `shared-features/premium` — decide qué puede hacer cada plan; un fallo abre
   funciones de pago o bloquea a quien ha pagado.
3. `shared-ui/components/rir-picker` y `numeric-keypad` — por donde entra lo que
   el cliente apunta serie a serie. El modelo que hay detrás (`models/rir.ts`)
   ya está cubierto; falta el componente.
4. `shared-features/authentication` — verificación y recuperación de contraseña.
5. `shared-features/checkins` y `onboarding-status` — formularios con reglas por
   campo.
