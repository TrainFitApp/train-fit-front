# Modelo de datos 05 — Cambios en modelos existentes de TrainFit

## 1. Objetivo

Listar, de forma exhaustiva y sin ambigüedad, cada campo que se añade a un schema de TrainFit ya existente. Esta es la lista completa — si un cambio a un modelo existente no está aquí, no está aprobado por este documento.

## 2. Alcance exacto para el MVP

4 cambios. El primero y el tercero son opcionales y no disruptivos. El segundo (D8) SÍ es una migración real de una colección en producción — señalado explícitamente como tal, no se disfraza de "cambio pequeño".

### 2.1 `Table` — `assignedByTrainerId`

```js
// train-fit-back/components/tables/table-schema.js — añadir dentro del schema existente
assignedByTrainerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
```

**Para qué**: permite a la app de consumidor (TrainFit) mostrar el badge "Asignada por tu entrenador" en la card de una rutina (`funcionalidades/F15-badge-asignado.md`), y eximir esa rutina del límite FREE de rutinas propias del cliente (`funcionalidades/F14-premium-automatico.md`, D10). Se escribe cuando `funcionalidades/F11-asignar-rutina.md` crea la copia de la rutina para el cliente; queda en `null` para cualquier rutina creada por el propio usuario sin intervención de un profesional.

**Por qué es seguro añadirlo**: campo opcional, no indexado, no leído por ninguna query existente de `table-dao.js` — el resto del sistema sigue funcionando exactamente igual sin tocar ni un solo DAO/servicio de `tables`.

### 2.2 `Anthropometry` — extensión para check-in de composición corporal/perímetros (confirmado en `00-decisiones-pendientes.md` D8)

**Schema real actual** (`train-fit-back/components/anthropometry/anthropometry-schema.js`):
```js
{ userId, date, weight, neck, chest, bicepsRelaxed, bicepsContracted, waist, abdomen, hip, thighContracted, thighRelaxed, calf }
// índice único (userId, date)
```

**Campos nuevos a añadir**:
```js
muscleMass: { type: Number },
fatMass: { type: Number },
boneMass: { type: Number },
residualMass: { type: Number },
shoulders: { type: Number },
quadL: { type: Number },
quadR: { type: Number },
ankleL: { type: Number },
ankleR: { type: Number },
```

**Campos existentes que se PARTEN en izquierda/derecha** (cambio de forma, no solo adición):
```js
// Antes: bicepsRelaxed, bicepsContracted, calf (un valor único)
// Después:
bicepsRelaxedL: { type: Number },
bicepsRelaxedR: { type: Number },
bicepsContractedL: { type: Number },
bicepsContractedR: { type: Number },
calfL: { type: Number },
calfR: { type: Number },
```

**Mapeo con el catálogo de check-in** (`modelos-de-datos/04-catalogo-campos-checkin.md`): `abdomen` ya existente se interpreta como "Ombligo" (`perimeter_navel`) del catálogo — no necesita renombrarse, solo documentarse aquí para que no se cree un campo duplicado por error. `waist`/`hip`/`neck`/`chest`/`thighRelaxed`/`thighContracted`/`weight` ya coinciden 1:1 con el catálogo sin cambio.

**Por qué esto NO es un cambio seguro/trivial, a diferencia de `assignedByTrainerId`**:
- `bicepsRelaxed`, `bicepsContracted` y `calf` son campos YA ESCRITOS por usuarios reales hoy en producción (el propio cliente registra sus medidas en TrainFit consumidor). Partirlos en `L`/`R` no es aditivo — es un cambio de forma que deja huérfanos los valores históricos si no se migra explícitamente.
- **Estrategia de migración recomendada**: mantener los 3 campos antiguos en el schema (deprecados, no se escriben más desde el frontend actualizado, pero se siguen leyendo para documentos históricos) y escribir SOLO los nuevos `*L`/`*R` desde el momento del despliegue. Un script de migración one-off puede, opcionalmente, copiar el valor histórico único a ambos lados (`bicepsRelaxedL = bicepsRelaxedR = bicepsRelaxed antiguo`) para que las gráficas de progreso no muestren un hueco — decisión de negocio (¿vale la pena ese script?, ¿o se acepta que las medidas bilaterales solo existen desde la fecha de despliegue?), no resuelta por este documento, señalar antes de implementar.
- El índice único `(userId, date)` no cambia, pero ahora ese único documento diario puede recibir escrituras desde DOS orígenes distintos (el cliente auto-registrándose en TrainFit, y el check-in del profesional) — ver caso límite en la sección 10.

### 2.3 `NutritionalGoal` — `assignedByTrainerId` (confirmado en `00-decisiones-pendientes.md` D10)

```js
// train-fit-back/components/nutritionalGoals/nutritional-goal-schema.js — añadir dentro del schema existente
assignedByTrainerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
```

**Para qué**: exime al objetivo nutricional del límite FREE propio del cliente (`nutritionalGoals: 1`) cuando lo crea su nutricionista, sin necesidad de darle premium completo (`funcionalidades/F13-asignar-objetivos-macros.md`, `funcionalidades/F14-premium-automatico.md`) — resuelve la pregunta que quedaba abierta en `F13` sección 9 desde antes de esta decisión. Mismo patrón exacto que `Table.assignedByTrainerId` (2.1), mismo criterio de "no se borra al revocar la relación".

**Por qué es seguro añadirlo**: campo opcional, no indexado, no leído por ninguna query existente del DAO de `nutritionalGoals` — mismo razonamiento que 2.1.

### 2.4 `User` — SIN CAMBIOS (decisión explícita, no un olvido)

**Importante**: una versión anterior de este análisis proponía añadir `User.trainerId` (referencia rápida al entrenador activo del cliente). Esa idea se **abandonó explícitamente**: un campo caché de este tipo puede desincronizarse si alguna ruta de escritura falla o se omite, y entonces no queda ninguna fuente de verdad fiable a la que volver — sobre todo cuando la relación puede cambiar de estado por varias vías distintas (aceptar, revocar desde el profesional, revocar desde el cliente). No se añade ningún campo caché a `User` para "quién es mi entrenador/nutricionista" — esa información se consulta siempre en vivo contra `TrainerClient` (`modelos-de-datos/01-trainerclient.md`), nunca se cachea en `User`.

**Si en algún momento del desarrollo alguien propone añadir un campo así "por rendimiento" o "para simplificar una query"**: señalar este apartado antes de aceptarlo. La consulta `TrainerClient.find({ clientId, status: "active" })` ya está indexada (`modelos-de-datos/01-trainerclient.md`, sección 7) y no es un cuello de botella real.

## 3. Qué NO se incluye en el MVP

- No se añade `roles: "trainer"` como cambio de schema — `User.roles` ya es `{ type: [String], default: undefined }`, no requiere ninguna migración, solo empezar a escribir ese valor (ver `arquitectura/03-autenticacion-y-roles.md`). No existe un rol `"nutritionist"` — la especialización se decide por relación (`TrainerClient.scope`), no a nivel de cuenta.
- No se modifica `Diet`, `DietDay`, `Meal`, `Workout`, `CustomExercise` en este MVP. `Anthropometry` SÍ se modifica (ver 2.2, decisión D8 del 2026-07-31) — corrige una versión anterior de este documento que la daba por intocada.
- Los campos de "bienestar" del catálogo de check-in (escalas subjetivas 1-5, sleep_hours, daily_steps) NO se añaden a `Anthropometry` — dominio distinto, siguen en su propia colección pequeña (`funcionalidades/F17-checkin-catalogo-campos.md`).
- No se modifica ningún schema de `train-fit-management` — la app de administración es ajena a todo este proyecto.

## 4-6. Flujos, pantallas, componentes UI

No aplica — este archivo es puramente de modelo de datos.

## 7-8. Lógica de negocio y dependencias

- `Table.assignedByTrainerId` se escribe desde `funcionalidades/F11-asignar-rutina.md` (al copiar la rutina hacia el cliente) — no se escribe desde ningún otro punto del sistema.
- `NutritionalGoal.assignedByTrainerId` se escribe desde `funcionalidades/F13-asignar-objetivos-macros.md` — mismo criterio.
- No se modifica ningún DAO/servicio existente de `tables`/`nutritionalGoals` para leer o escribir estos campos salvo el punto exacto donde se crea la copia/objetivo asignado — el resto de esos DAOs (búsquedas, ediciones por el propio usuario, etc.) no necesita tocarse porque el campo es opcional y `undefined`/`null` por defecto en cualquier flujo que no pase por la asignación de un profesional.
- Los campos nuevos de `Anthropometry` se escriben desde dos orígenes: el propio cliente auto-registrando sus medidas (flujo YA existente, sin cambios) y el endpoint de respuesta de check-in (`funcionalidades/F17-checkin-catalogo-campos.md`) cuando el campo activado es de tipo "anthropometry-backed". El DAO/servicio de `anthropometry` existente (`getAnthropometriesBetweenDates`, etc.) sigue funcionando igual con los campos viejos; el check-in solo añade escrituras a los campos nuevos/partidos, vía upsert por `(userId, date)`.

## 9. Validaciones

- `assignedByTrainerId`, si está presente, debe ser un `ObjectId` válido de un `User` existente — no se valida activamente en el schema (no hay una referencia con `required` ni verificación de existencia), consistente con cómo TrainFit trata el resto de referencias `ObjectId` opcionales hoy (no se verifica existencia del referenciado en escritura, solo en lectura si se hace `populate`).
- Los campos nuevos de `Anthropometry` son todos opcionales (`type: Number`, sin `required`), igual que los ya existentes — un check-in que solo activa 3 de los 23 campos anthropometry-backed no rompe el documento, el resto quedan simplemente ausentes ese día.

## 10. Casos límite y posibles errores

- **Se revoca la relación profesional-cliente después de asignar una rutina**: `assignedByTrainerId` NO se borra ni se actualiza — queda como dato histórico ("quién te la asignó en su día"), aunque la relación activa ya no exista. Esto es una decisión de diseño deliberada (ver `00-decisiones-pendientes.md` D2): la rutina ya es copia propia del cliente, el campo es solo trazabilidad, no un vínculo de propiedad ni de permiso.
- **El profesional referenciado en `assignedByTrainerId` borra su cuenta**: el campo queda apuntando a un `_id` que ya no existe (referencia rota, no cascada de borrado) — el badge de "asignado por tu entrenador" en `F15` debe manejar este caso con gracia (mostrar el badge genérico sin intentar resolver el nombre del profesional si el `populate` devuelve `null`), no lanzar un error.
- **El cliente auto-registra su peso el mismo día en que responde al check-in del profesional (o viceversa)**: como `Anthropometry` tiene índice único `(userId, date)`, ambas escrituras terminan en el MISMO documento — el upsert debe fusionar campos (`$set` solo de los campos presentes en cada escritura), nunca sobrescribir el documento entero, o una de las dos fuentes de datos borraría silenciosamente lo que puso la otra. Este es el caso límite más importante de todo el cambio D8, verificar con una prueba real antes de dar por cerrado el DAO.
- **Migración de `bicepsRelaxed`/`bicepsContracted`/`calf` históricos**: los documentos anteriores al despliegue tienen el campo antiguo (valor único), no `L`/`R`. Decidir explícitamente (no asumir) si se ejecuta un script que copie el valor antiguo a ambos lados, o si las gráficas históricas simplemente muestran un hueco en el dato bilateral antes de la fecha de migración — ver sección 2.2.

## 11. Estructura de datos

Ya completa en las secciones 2.1, 2.2 y 2.3.

## 12. Endpoints/API necesarios

- `Table.assignedByTrainerId`: ninguno directamente — se escribe como parte del payload de `POST /trainer/clients/:clientId/tables` (ver `apis/especificacion-endpoints.md` y `funcionalidades/F11-asignar-rutina.md`).
- `NutritionalGoal.assignedByTrainerId`: ninguno directamente — se escribe como parte del payload de `POST /trainer/clients/:clientId/nutritional-goals` (`funcionalidades/F13-asignar-objetivos-macros.md`).
- Campos nuevos de `Anthropometry`: ninguno propio — se escriben desde el endpoint YA existente de auto-registro del cliente (sin cambios de ruta) y desde el endpoint de respuesta de check-in de `F17` (`POST /trainer/checkins/:trainerId/respond`).

## 13. Criterios de aceptación verificables

- [ ] Una rutina creada por un usuario normal (sin profesional) tiene `assignedByTrainerId: null`/`undefined` — ninguna query existente de `tables` cambia su resultado por la presencia de este campo.
- [ ] Una rutina creada vía `F11-asignar-rutina.md` tiene `assignedByTrainerId` igual al `trainerId` de la sesión que la creó.
- [ ] `npm run build:pre` (o el equivalente de verificación estricta de plantillas Angular ya usado en el resto del proyecto) sigue en verde tras añadir el campo — confirma que ningún componente existente se rompe por un campo nuevo no esperado en el modelo `Table` del frontend (`packages/shared-core/src/app/core/models/table.ts` necesita el campo añadido en su interfaz TypeScript también, aunque sea opcional).
- [ ] Ningún test/flujo existente de `User` cambia de comportamiento (confirma que, efectivamente, no se tocó ese schema).
- [ ] Un check-in que responde peso + 2 perímetros escribe correctamente en `Anthropometry` del cliente, visible tanto en `F09` (vista del profesional) como en las gráficas de progreso del propio cliente en TrainFit.
- [ ] El cliente auto-registrando medidas el mismo día que respondió un check-in NO pierde ninguno de los dos conjuntos de datos (prueba directa del caso límite de fusión).
- [ ] Los DAOs/queries existentes de `anthropometry-dao.js` (los que ya usa TrainFit consumidor y `F09`) siguen devolviendo resultados correctos tras añadir los campos nuevos — ninguna query existente se rompe por campos adicionales no esperados.
- [ ] Un objetivo nutricional creado vía `F13-asignar-objetivos-macros.md` tiene `assignedByTrainerId` igual al `trainerId` de la sesión, y NO cuenta contra el límite `nutritionalGoals: 1` del cliente FREE.

## 14. Checklist de implementación

- [ ] Añadir `assignedByTrainerId` a `train-fit-back/components/tables/table-schema.js`.
- [ ] Añadir el campo (opcional) a la interfaz TypeScript `Table` en `packages/shared-core/src/app/core/models/table.ts`.
- [ ] Confirmar que NINGÚN cambio se hace a `components/users/schema.js`.
- [ ] Añadir los 9 campos nuevos + partir los 3 campos bilaterales en `anthropometry-schema.js` (sección 2.2).
- [ ] Decidir y, si aplica, ejecutar el script de migración de datos históricos bilaterales.
- [ ] Actualizar el modelo TypeScript de `Anthropometry` en el frontend con los campos nuevos.
- [ ] Implementar el upsert por fusión (no sobrescritura) en el DAO de `anthropometry` para el caso límite de doble origen de escritura.
- [ ] Añadir `assignedByTrainerId` a `nutritional-goal-schema.js` (sección 2.3) y a su interfaz TypeScript.
- [ ] Verificar los 7 criterios de aceptación.
