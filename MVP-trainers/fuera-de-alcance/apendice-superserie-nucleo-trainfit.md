# Apéndice — Agrupación de ejercicios en superserie/circuito (mejora del núcleo de TrainFit)

**Fuera de alcance de `TrainFit: Entrenadores`.** Este hallazgo se documenta con el mismo nivel de profundidad técnica que el resto de este proyecto, aunque su implementación tocaría la app de consumidor (`train-fit-front`/`train-fit-back`, núcleo de TrainFit) y no la app nueva de entrenadores — precisamente por eso se conserva aquí en detalle en vez de resumirse en una línea: para que exista un análisis técnico real cuando se decida abordarlo, sin tener que repetir la investigación desde cero.

## Origen del hallazgo

Durante el análisis de un competidor real en producción (Traineeks, `PLAN_TRAINFIT_ENTRENADORES.md` §11), se observó que su constructor de rutinas permite agrupar dos ejercicios ("Press militar en máquina" + "Jalón al pecho") como un bloque visual etiquetado "SUPERSET x3 rounds". Durante la sesión de entrenamiento, el cliente alterna una serie de cada ejercicio del grupo en vez de completar todas las series de un ejercicio antes de pasar al siguiente. Es una técnica de entrenamiento real y ampliamente usada (superserie, circuito, tri-set), no una particularidad inventada por ese producto.

## Por qué TrainFit no lo tiene hoy

La jerarquía actual de datos es:

```
Table > Split > Workout > CustomExercise > Set
```

`Workout.exercises` es una **lista plana ordenada** de `CustomExercise`, cada uno con su propio `order`, sus `sets` y sus `notes`. No existe ningún concepto de "estos N ejercicios van agrupados y se alternan entre sí" — ni en el schema de datos, ni en la pantalla de construcción de rutinas, ni en la ejecución de un entrenamiento en curso (`current-workout.page.ts`).

## Por qué es del núcleo y no de la app de entrenadores

Cualquier usuario de TrainFit que entrena por su cuenta, sin ningún entrenador vinculado, se beneficiaría igual de poder programar superseries en su propia rutina — no es una necesidad exclusiva del flujo profesional→cliente. Si se construyera esta capacidad únicamente dentro de `train-fit-trainers` (p. ej. como metadato exclusivo de rutinas asignadas por un profesional), el dato quedaría inconsistente entre las dos apps: una rutina con superseries creada por un entrenador no se interpretaría correctamente en la app del cliente, que no sabría qué hacer con el agrupamiento. La única implementación coherente vive en el núcleo (`train-fit-front`/`train-fit-back`), disponible para cualquier usuario, y `train-fit-trainers` simplemente heredaría la capacidad al reutilizar los mismos DAOs (igual que ya hereda `copyTable`/`pasteMeal` para todo lo demás).

## Qué tocaría, concretamente

### Schema de datos

`train-fit-back/components/customExercises/*-schema.js` — añadir un campo opcional:

```js
groupId: { type: String, default: null } // o Schema.Types.ObjectId si se prefiere generarlo server-side
```

Los `CustomExercise` de un mismo `Workout` que comparten `groupId` forman un bloque. Es un campo puramente aditivo y opcional — no rompe ningún documento existente (todos los `CustomExercise` actuales seguirían con `groupId: null`, comportándose exactamente igual que hoy).

`train-fit-back/components/workouts/workout-schema.js` — añadir un array ligero para no duplicar metadatos del grupo en cada ejercicio miembro:

```js
exerciseGroups: [{
  groupId: String,
  type: { type: String, enum: ["superset", "circuit"] },
  rounds: Number,
}]
```

Guardar `type`/`rounds` una sola vez por grupo (en `Workout.exerciseGroups`) en vez de repetirlos en cada `CustomExercise` del grupo evita inconsistencias (dos ejercicios del "mismo" grupo con `rounds` distintos por error de edición).

### DAO/servicio

`components/customExercises/*`, `components/workouts/*`:
- Al crear/reordenar ejercicios dentro de un `Workout`, permitir asignar/quitar `groupId` sobre 2+ `CustomExercise` ya existentes del mismo workout.
- Al leer un `Workout` completo, decidir si el backend devuelve los ejercicios ya agrupados (agregación en el DAO) o si se devuelven planos con su `groupId` y el frontend agrupa client-side a partir de ese campo — la segunda opción es más simple de implementar y suficiente, dado que el volumen de ejercicios por workout es pequeño (no hay motivo de rendimiento para forzar la agregación en el servidor).
- Validar que un `groupId` referenciado en `exerciseGroups` corresponde efectivamente a `CustomExercise` del mismo `Workout` — evitar grupos "huérfanos" o que mezclen ejercicios de workouts distintos por error de implementación.

### Constructor de rutinas (UI)

En la pantalla/componente donde se editan los ejercicios de un `Workout` (dentro de `packages/shared-features/.../mesocycle/...` o equivalente, donde viva hoy la edición de splits/ejercicios): nueva acción "Agrupar como superserie/circuito" sobre 2 o más ejercicios seleccionados, con un selector de tipo (superserie/circuito) y de número de rondas. Acción simétrica de "desagrupar" para deshacer.

### Ejecución del entrenamiento en curso — la pieza de mayor esfuerzo real

`current-workout.page.ts`, `custom-exercise.component.ts`, `set.component.ts`: el flujo actual asume "el usuario completa todas las series de este ejercicio, luego pasa al siguiente ejercicio de la lista". Con superseries, hay que intercalar el registro de series **ronda a ronda entre los ejercicios del grupo** (serie 1 del ejercicio A → serie 1 del ejercicio B → serie 2 del ejercicio A → ...), no ejercicio por ejercicio. Esto no es un cambio de modelo de datos, es un cambio de **flujo de UX** sobre una pantalla ya compleja (el cronómetro de entreno, el registro de RIR/peso por serie, todo lo ya construido y depurado en sesiones previas de este proyecto) — es la parte que requiere más diseño de interacción, no más código de backend.

### Resumen de entrenamiento

`workout-summary-modal` (componente trabajado a fondo en una sesión previa de este mismo proyecto, con su propio fix de padding/safe-area ya aplicado): mostrar los ejercicios agrupados visualmente como un bloque en el resumen post-entreno, en vez de listarlos como si fueran ejercicios independientes sin relación entre sí.

## Clasificación

**Fuera del alcance de `TrainFit: Entrenadores`.** Si se decide abordar, es un **ticket independiente sobre TrainFit (la app de consumidor)**, no sobre `train-fit-trainers`. Complejidad **media-alta**, concentrada casi enteramente en la ejecución en vivo del entrenamiento (cambio de UX no trivial sobre una pantalla ya madura), no en el modelo de datos — el cambio de schema es pequeño, aditivo y no disruptivo (un campo opcional en `CustomExercise` más un array pequeño en `Workout`).

## Relación con `TrainFit: Entrenadores`, si algún día se implementa

Si el núcleo de TrainFit llegara a soportar superseries/circuitos, `train-fit-trainers` heredaría la capacidad automáticamente en `funcionalidades/F11-asignar-rutina.md` — al reutilizar `createTableToUser`/`copyTable`, cualquier `Workout` con `groupId`/`exerciseGroups` ya poblados se copiaría igual de bien que cualquier otro, sin requerir ningún cambio en esta app. No haría falta ningún trabajo adicional en `train-fit-trainers` para beneficiarse de la mejora — es otra confirmación de que el diseño de reutilización de este proyecto (copia profunda de estructuras ya existentes) es robusto frente a mejoras futuras del núcleo, no solo frente al estado actual del código.
