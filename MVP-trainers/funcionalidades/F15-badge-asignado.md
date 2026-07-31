# F15 — Badge "Asignada por tu profesional" (lado cliente)

**Prioridad**: P0. **Fase**: 4 (depende de `F11` escribiendo el campo).

## 1. Objetivo

Que el cliente vea, en TrainFit normal, cuándo una rutina fue asignada por su entrenador en vez de creada por él mismo — cumple directamente el requisito del enunciado original: "el cliente verá reflejado en TrainFit lo que le pauta su entrenador".

## 2. Alcance exacto para el MVP

- Badge visual ("Asignada por tu entrenador") en la card de rutina, cuando `Table.assignedByTrainerId` esté presente.
- Cambio de plantilla únicamente — no hay lógica de negocio nueva, es puramente presentación de un dato que ya se escribe en `F11`.

## 3. Qué NO se incluye en el MVP

- No hay un badge equivalente para las comidas pautadas por el nutricionista (`F12`) en el MVP — esa operación reutiliza `pasteMeal`, que no deja ningún rastro de "quién lo pauteó" en el modelo de `Meal`/`CustomProduct`/`CustomRecipe` actual (a diferencia de `Table`, que sí recibió el campo `assignedByTrainerId`). Si se quiere el mismo badge para comidas, requeriría un campo equivalente en `Meal` o `CustomProduct`/`CustomRecipe`, que **no está en el alcance de `modelos-de-datos/05-cambios-modelos-existentes.md`** — señalar esto como una limitación conocida y una posible extensión futura, no un olvido.
- **Corrección (2026-07-31)**: `NutritionalGoal` SÍ tiene ahora `assignedByTrainerId` (añadido en D10 para la exención de límite FREE, `modelos-de-datos/05-cambios-modelos-existentes.md` sección 2.3) — el dato para un badge equivalente en objetivos de macros ya existe, no haría falta ningún campo nuevo. Aun así, se deja explícitamente FUERA del alcance de este archivo P0 — si se quiere, es una extensión de UI barata (mismo patrón que este archivo, aplicado a la pantalla de objetivos nutricionales en vez de a la de rutinas), no incluida en el MVP salvo que se decida añadirla.

## 4. Flujos de usuario paso a paso

1. El cliente abre su lista de rutinas en TrainFit (pantalla ya existente, `search-tables`/`summary.page` según dónde se muestren las cards).
2. Si una rutina tiene `assignedByTrainerId` no nulo, ve el badge junto al resto de tags de la card (mismo patrón visual que los tags ya existentes, p. ej. "Rutina Activa").

## 5. Pantallas necesarias

Ninguna nueva — modifica pantallas ya existentes (donde se muestran cards de `Table`).

## 6. Componentes UI requeridos

- Un badge/chip nuevo en el componente de card de rutina ya existente (`table-card.page` u otro, según dónde viva ese componente) — condicional a `table.assignedByTrainerId != null`.

## 7. Lógica de negocio

Ninguna — es lectura directa de un campo ya poblado por `F11`. El frontend necesita el campo `assignedByTrainerId` incluido en la respuesta de los endpoints que ya devuelven `Table` al cliente (confirmar que el DTO de tablas no lo esté excluyendo accidentalmente al servirlo al propio dueño).

## 8. Dependencias con otros módulos

- Depende de: `F11-asignar-rutina.md` (que el campo se escriba correctamente).
- Depende de: `modelos-de-datos/05-cambios-modelos-existentes.md` (el campo debe existir en el modelo TypeScript `Table` del frontend, no solo en el schema de Mongoose).

## 9-10. Validaciones y casos límite

- **El profesional que asignó la rutina ya no existe o ya no es el profesional activo del cliente** (relación revocada): el badge se sigue mostrando igual (es un dato histórico, ver `00-decisiones-pendientes.md` D2) — no se oculta el badge al revocar la relación, sería inconsistente con la decisión de que la rutina "se queda con el cliente tal cual".
- **Se quiere mostrar el NOMBRE del profesional en el badge, no solo "tu entrenador" genérico**: requeriría un `populate`/consulta adicional a `User` para resolver el nombre — decisión de UI no bloqueante para el diseño técnico (se puede lanzar con el badge genérico y añadir el nombre después sin cambios de modelo).

## 11. Estructura de datos necesaria

Ninguna nueva — usa `Table.assignedByTrainerId` ya definido en `modelos-de-datos/05-cambios-modelos-existentes.md`.

## 12. Endpoints/API necesarios

Ninguno nuevo — depende de que los endpoints YA EXISTENTES que devuelven `Table` al cliente (p. ej. `getTables`) incluyan el campo nuevo en su respuesta (confirmar que ningún DTO intermedio lo filtre).

## 13. Criterios de aceptación verificables

- [ ] Una rutina con `assignedByTrainerId` presente muestra el badge en la card.
- [ ] Una rutina sin ese campo (creada por el propio usuario) NO muestra ningún badge.
- [ ] El badge se sigue mostrando aunque la relación con el profesional ya esté revocada.

## 14. Checklist de implementación

- [ ] Confirmar que el campo llega al frontend en la respuesta de los endpoints de lectura de tablas del cliente.
- [ ] Añadir el badge condicional en el componente de card de rutina.
- [ ] Verificar los 3 criterios de aceptación.
