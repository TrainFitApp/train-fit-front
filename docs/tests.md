# Tests del front

Estado a **2026-10-11**. La parte del backend está en `train-fit-back/docs/tests.md`.
Qué test lleva cada desarrollo: `TrainFit/docs/CONTEXT.md` › «Tests de cada
desarrollo».

## Cómo se ejecutan

```
npm test                                          # todo
node --experimental-strip-types --test <fichero>  # uno solo
npm run verify                                    # lint + test (lo que corre el hook pre-push)
```

No se apuntan cifras aquí: cambian con cada desarrollo (la última suite
completa en verde, 744 casos, 2026-10-11 en la rama `trAInfit`).

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

95 ficheros de test (2026-10-11). Por zona:

| Zona | Ficheros | Qué cubren |
|---|---|---|
| `tests/` (raíz) | 10 | Contrato con la API (`api-contract`), integridad de i18n (claves, prefijos dinámicos, capas), paridades con el back (asistente, cuestionario, enlaces de vídeo), descubrimiento de tests |
| `shared-core` (utils, services, models, interceptors, constants) | 22 | Aritmética nutricional, fechas locales, números, totales del día, RIR, renovación del token |
| `shared-features` (diets, coach, tables, assistant, checkins, onboarding, auth, supplements) | 18 | Tarjeta de comida, creación del día, tabla del microciclo, notificaciones del coach, utilidades del asistente, check-ins, alta guiada |
| `shared-ui` (pipes, directives, components, constants) | 7 | Pipes de medidas y números, teclado numérico, catálogos |
| `train-fit-trainers` | 36 | Plantillas de dieta, ficha del cliente, rutinas, Planner, suscripción, cobros, invitaciones, bandeja «Por revisar» |
| `train-fit-management` | 2 | Consumo del asistente, facturación de trainers |

Lo que más se prueba es lógica pura (utilidades `*.util.ts`, catálogos y
servicios) cargada con `ng-harness.cjs`; los componentes de pantalla, poco.

## Qué NO está cubierto

Sin ningún test: `shared-features/profile` (configuración, objetivos,
editor), `shared-features/exercises` (buscador y notas del entrenador),
`shared-features/premium` (límites de plan y RevenueCat),
`shared-features/diet-days` (peso y medidas del día), `shared-core/validators`
y casi todos los componentes de `shared-ui` (selector de RIR, antropometría,
media).

**Por dónde seguir**, en orden de lo que más duele que falle en silencio:

1. `shared-features/premium` — decide qué puede hacer cada plan; un fallo abre
   funciones de pago o bloquea a quien ha pagado.
2. `shared-core/validators` — validación de formularios. Puro.
3. `shared-ui/components/rir-picker` — por donde entra lo que el cliente
   apunta serie a serie (el modelo `models/rir.ts` ya está cubierto).
4. `shared-features/profile` — objetivos nutricionales y editor del perfil.
