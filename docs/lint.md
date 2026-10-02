# Lint del front

Estado a **2026-10-01**. El del backend está en `train-fit-back/.eslintrc.json`.

## Cómo se ejecuta

```
npm run lint          # la PUERTA: solo errores. Verde hoy.
npm run lint:report   # todo, incluidos los ~23.200 avisos heredados
npm run lint:f        # solo una app (también :m y :t)
npm run verify        # lint + test, lo que corre el hook pre-push
```

`lint` cubre `packages/` **y** las tres apps. Antes cubría solo
`apps/train-fit-front/src`: 17 ficheros de 403.

## Qué bloquea lint y tests

`verify` (= `lint && test`) lo lanzan el hook `pre-push` (push a `develop` o
`main`) y `web-ci.yml` en `main`. **Ningún script de build lo ejecuta**: los
`build:*` solo compilan, para que el build de Cloudflare (y cualquier build
local) vaya lo más rápido posible. Hasta 2026-10-02 había un `prebuild:pro` /
`prebuild:i:pro` / `prebuild:a:pro` en cada app que lo enganchaba; se quitó
porque repetía en el servidor lo que el hook ya había comprobado.

## Dónde están las reglas

`.eslintrc.base.json` en la raíz, compartido por las tres apps y por
`packages/`. Cada `.eslintrc.json` de app solo dice qué tsconfig da los tipos.

`packages/.eslintrc.js` va en JS (no JSON) porque necesita `__dirname`:
`tsconfigRootDir` se resuelve contra el directorio de trabajo, no contra el
fichero. Y apunta a `apps/train-fit-front/tsconfig.app.json`, que es el único
tsconfig del repo cuyo `include` abarca `packages/**` entero — el
`tsconfig.json` de cada app no lo incluye, y sin un programa que contenga el
fichero las reglas con información de tipos no pueden funcionar.

La política error/warn y el recuento por regla están comentados dentro de
`.eslintrc.base.json`. En resumen: **error** son las reglas que hoy se cumplen
en todo el monorepo; **warn** las que ya se incumplen a miles. Para subir una
de warn a error, déjala a cero y súbela; nunca al contrario.

## Lo que se arregló para montar esto

- **Una regla que no existía.** Los tres `.eslintrc.json` pedían
  `@typescript-eslint/no-uninitialized-class-properties`, que no está en el
  plugin instalado (6.21.0; llegó en la 8.x). ESLint no avisa de la errata: la
  cuenta como un error por fichero analizado. Eran 253 de los errores que
  salían, y la regla que se quería **nunca estuvo activa**.
- **`no-implied-eval` y `no-duplicate-enum-values` se quedan en error.** Los
  dos únicos sitios que las incumplían están acotados con un
  `eslint-disable-next-line` en su línea y explicados ahí
  (`shared-ui/constants/calculators.ts`, `shared-ui/models/macros-data.ts`),
  para que cualquier caso nuevo rompa el lint. El del enum, por cierto, era un
  falso positivo: proteína y carbohidrato son los dos 4 kcal/g.

## La deuda pendiente

~23.200 avisos. El 57 % son dos reglas de tipado (`typedef` 9301,
`explicit-function-return-type` 4005) y el 24 % el grupo del `any` implícito
(`no-unsafe-*`, 5669 entre todas). El resto está desglosado por regla en
`.eslintrc.base.json`.

Por dónde se empieza, de más fácil a más valioso:

1. **~26 avisos en unos 15 ficheros**, todos de una línea (`prefer-as-const`,
   `no-array-constructor`, `no-useless-constructor`, `prefer-const`,
   `use-lifecycle-interface`, `no-empty-lifecycle-method`, `eqeqeq` en
   plantillas…). Una sentada, y esas reglas vuelven a **error**.
   Ojo con `no-output-native` y `no-input-rename`: renombrar un `@Output` o un
   `@Input` cambia la API del componente y hay que tocar sus plantillas.
2. **`no-unused-vars` (79)**: código muerto de verdad.
3. **`no-floating-promises` (709) y `no-misused-promises` (44)**: aquí sí puede
   haber errores que se tragan en silencio.
4. Las dos de tipado, que son una campaña aparte. `npm run lint:report`
   acepta `--fix` para una parte.

Un paso intermedio útil cuando el número baje: `--max-warnings <n>` con el
recuento actual, para que solo pueda ir hacia abajo.
