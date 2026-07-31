# F18 — Check-in por sesión de entrenamiento (readiness/esfuerzo)

**Prioridad**: P1. **Fase**: 6. Sin dependencia de `F17` — mecanismo distinto, más simple, campos fijos.

## 1. Objetivo

Capturar un pulso de 2 datos por CADA sesión de entrenamiento del cliente: "readiness" antes de empezar y "esfuerzo percibido" al terminar — dato identificado en el Excel real analizado (`PLAN_TRAINFIT_ENTRENADORES.md` §10.3), que no existe hoy en TrainFit (el RIR/RPE actual es por serie, no un pulso único de toda la sesión).

## 2. Alcance exacto para el MVP (de esta funcionalidad P1)

- Dos campos fijos, no configurables ni parte del catálogo de `F17` (cadencia distinta: por sesión, no periódica):
  - `readinessPre`: escala 1-5, preguntado al iniciar un entrenamiento.
  - `perceivedEffortPost`: escala 1-5, preguntado al finalizar.
- Visibles para el profesional junto al historial de entrenamientos del cliente (`F09`).

## 3. Qué NO se incluye en el MVP

- No incluye las anclas descriptivas de texto que sí tenía el Excel original para cada nivel de la escala (p. ej. "Me siento completamente recuperado...") — solo el número 1-5, por simplicidad. Añadir el texto descriptivo es una mejora de UI de bajo coste pero no incluida en el primer corte.
- No es configurable por el profesional (a diferencia de `F17`) — estos 2 campos o se piden siempre, o no se pide ninguno; no hay activación selectiva por cliente.

## 4. Flujos de usuario paso a paso

1. El cliente inicia un entrenamiento en TrainFit (flujo ya existente, `current-workout.page`).
2. Al iniciar (o justo antes, en la pantalla previa a empezar), se le pregunta "¿Cómo llegas hoy?" (readiness, 1-5).
3. Entrena normalmente (sin cambios en el flujo existente de registro de sets).
4. Al finalizar/guardar el entrenamiento (mismo punto donde hoy se muestra el resumen, `workout-summary-modal`, trabajado a fondo en la sesión que originó este plan), se le pregunta "¿Cómo de duro ha sido?" (esfuerzo percibido, 1-5).
5. Ambos valores se guardan junto al `Workout`.
6. El profesional, viendo el historial de entrenamientos del cliente (`F09`), ve estos dos valores junto a cada sesión.

## 5. Pantallas necesarias

- Ninguna pantalla nueva independiente — se integran como un paso/modal corto dentro de flujos YA EXISTENTES: el inicio de entrenamiento (`current-workout.page`) y el resumen final (`workout-summary-modal`).

## 6. Componentes UI requeridos

- Selector de escala 1-5 (mismo componente, si se construye, que pueda reutilizarse en `F17` para los campos `scale_1_5` — vale la pena construir un único componente de "selector 1-5" reutilizable entre ambas funcionalidades, aunque sean features distintas).

## 7. Lógica de negocio

- Añadir 2 campos opcionales al modelo `Workout` (ver sección 11) — a diferencia de `F17`, que usa una colección nueva, aquí SÍ se propone extender un modelo existente porque el dato pertenece conceptualmente a la sesión de entrenamiento misma, no a un check-in aparte.
- **Punto a decidir explícitamente antes de implementar**: ¿esto modifica `train-fit-back/components/workouts/workout-schema.js`? Si es así, **este cambio debe añadirse a `modelos-de-datos/05-cambios-modelos-existentes.md`** en el momento de implementarse — ese archivo lista actualmente 4 cambios (`Table.assignedByTrainerId`, la extensión de `Anthropometry` de D8, `NutritionalGoal.assignedByTrainerId` de D10, `User` sin cambios); si se decide seguir adelante con `F18` tal como está descrito aquí, sería el 5º, y ese documento queda desactualizado hasta corregirlo como parte de esta implementación, no dejarlo huérfano.

## 8. Dependencias con otros módulos

- Depende de: `F09-lectura-entrenamiento-cliente.md` (se muestra junto al historial que esa funcionalidad ya expone).
- Toca (si se implementa tal cual está descrito): el modelo `Workout` existente — ver el punto de la sección 7 sobre mantener `modelos-de-datos/05-cambios-modelos-existentes.md` sincronizado.
- Relacionado con (no dependencia dura): `F17-checkin-catalogo-campos.md` — mecanismos hermanos pero independientes, no compartir código de configuración entre ambos salvo el componente visual de selector 1-5.

## 9. Validaciones

- `readinessPre`/`perceivedEffortPost` deben estar entre 1 y 5 si están presentes — ambos opcionales (el cliente puede saltarse la pregunta sin que bloquee el registro del entrenamiento, consistente con que esto es una mejora de seguimiento, no un requisito para poder entrenar).

## 10. Casos límite y posibles errores

- **El cliente cierra la app entre el inicio del entrenamiento y el final, sin completar la pregunta de esfuerzo post**: `perceivedEffortPost` queda simplemente sin valor — no bloquear ni forzar su registro, dado que el resto de la arquitectura de workout ya está diseñada para sobrevivir cierres de app (timestamps, no contador acumulado, según lo documentado del sistema de cronómetro existente).
- **El cliente no tiene ningún profesional vinculado**: estos campos se piden igual (o no, decisión de producto: ¿tiene sentido pedir este dato a un usuario SIN profesional, ya que nadie lo va a revisar? Recomendación: pedirlo igual, es un dato de auto-seguimiento útil incluso sin profesional, y evita tener que condicionar la UI del flujo de entrenamiento según si hay o no relación activa, lo cual sería una complejidad añadida innecesaria).

## 11. Estructura de datos necesaria

```js
// train-fit-back/components/workouts/workout-schema.js — añadir, SI se decide seguir con este diseño
readinessPre: { type: Number, min: 1, max: 5, default: null },
perceivedEffortPost: { type: Number, min: 1, max: 5, default: null },
```

## 12. Endpoints/API necesarios

- Ninguno nuevo si se integra en los endpoints ya existentes de creación/actualización de `Workout` (añadir estos 2 campos al payload ya aceptado) — confirmar en implementación si el DAO/controller actual de workouts necesita un ajuste explícito para aceptar estos campos nuevos o si, al ser opcionales, pasan sin cambios por cualquier `$set` genérico ya existente.
- Lectura: se incluyen en la respuesta ya existente de `GET /trainer/clients/:clientId/workouts/history` (`F09`) sin necesidad de un endpoint aparte.

## 13. Criterios de aceptación verificables

- [ ] Registrar `readinessPre` al iniciar un entrenamiento y `perceivedEffortPost` al finalizar, ambos se guardan correctamente en el `Workout`.
- [ ] Ambos campos son opcionales — un entrenamiento sin responder ninguno de los dos se guarda igual, sin error.
- [ ] El profesional ve estos valores en el historial de entrenamientos del cliente (`F09`).
- [ ] `modelos-de-datos/05-cambios-modelos-existentes.md` se actualiza para reflejar este cambio en `Workout`, si se implementa.

## 14. Checklist de implementación

- [ ] Decidir definitivamente si se extiende `Workout` (como está descrito) o se usa una colección aparte — y actualizar `modelos-de-datos/05-cambios-modelos-existentes.md` en consecuencia.
- [ ] Añadir los 2 campos al schema/modelo correspondiente.
- [ ] Integrar la pregunta de readiness en el inicio de entrenamiento.
- [ ] Integrar la pregunta de esfuerzo en `workout-summary-modal`.
- [ ] Mostrar ambos valores en el historial visible para el profesional (`F09`).
- [ ] Verificar los 4 criterios de aceptación.
