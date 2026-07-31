# F11 — Asignar rutina a un cliente

**Prioridad**: P0. **Fase**: 4 (escritura — el riesgo de seguridad se concentra aquí, ver `00-riesgos.md` R1).

## 1. Objetivo

Permitir que un profesional con relación `training` cree una rutina nueva o duplique una plantilla existente **hacia** el cliente — el cliente recibe una copia propia, no una referencia compartida (ver `00-riesgos.md` R4, decisión arquitectónica explícita tras analizar y rechazar el modelo de Traineeks).

## 2. Alcance exacto para el MVP

- Dos formas de asignar (ambas reutilizan DAOs ya existentes de `tables`):
  1. **Crear desde cero**: equivalente a `createTableToUser`, pero con `userId` = `clientId` (no el del profesional) y `assignedByTrainerId` = el profesional.
  2. **Duplicar una plantilla existente hacia el cliente**: equivalente a `copyTable`, mismo ajuste de `userId`/`assignedByTrainerId`.
- La plantilla a duplicar puede ser: una plantilla pública predeterminada de TrainFit (las mismas ~4-5 tablas legítimas sin `userId`, ver contexto de la sesión que originó este documento), o una rutina PROPIA del profesional (si el profesional se ha creado rutinas para sí mismo o como "borradores" — este es el equivalente más cercano a "Mis Rutinas" de Traineeks, aunque en el MVP no se construye una biblioteca de plantillas separada, el profesional simplemente usa sus propias tablas como `userId` = él mismo).

## 3. Qué NO se incluye en el MVP

- No se construye una "biblioteca de plantillas del profesional" como concepto de UI separado (eso sería parte de `fuera-de-alcance/p2-futuro.md`, "Plantillas de rutina/dieta reutilizables por el profesional entre varios clientes").
- No se implementa "actualizar en bloque" (empujar cambios de una rutina ya asignada a todos los clientes que la tienen) — eso es `funcionalidades/F30-actualizar-en-bloque.md`, P1, una acción EXPLÍCITA y opt-in, nunca automática.
- No se soporta agrupación de ejercicios en superserie/circuito — esa capacidad no existe en el núcleo de TrainFit hoy (ver `fuera-de-alcance/apendice-superserie-nucleo-trainfit.md`), así que tampoco existe aquí.

## 4. Flujos de usuario paso a paso

**Flujo A — Crear rutina nueva para el cliente**:
1. Desde el detalle de cliente (`F06`), el profesional pulsa "Asignar rutina" → "Crear nueva".
2. Introduce nombre (y el resto de campos mínimos que ya pide `createTableToUser`/`getStandardTable`).
3. El backend crea la tabla con `userId: clientId`, `assignedByTrainerId: trainerId`.
4. El cliente, la próxima vez que abra TrainFit, ve la rutina nueva en su lista, con el badge "Asignada por tu entrenador" (`F15`).

**Flujo B — Duplicar una plantilla existente hacia el cliente**:
1. El profesional pulsa "Asignar rutina" → "Desde plantilla".
2. Ve una lista de plantillas disponibles: las públicas predeterminadas de TrainFit + sus propias rutinas (`userId` = el profesional).
3. Selecciona una, confirma.
4. El backend ejecuta el equivalente de `copyTable(clientId, idTablaOrigen)`, con el ajuste de que el `userId` resultante es el `clientId` (no el `trainerId`, aunque quien invoca la operación es el profesional) y se añade `assignedByTrainerId: trainerId`.
5. Mismo resultado visible para el cliente que en el Flujo A.

## 5. Pantallas necesarias

- Modal/pantalla de "Asignar rutina": elegir crear nueva vs. desde plantilla.
- Si "desde plantilla": lista de plantillas (reutiliza el patrón de `search-tables.page` ya existente, con otro origen de datos — plantillas públicas + propias del profesional).
- Formulario de "crear nueva" (reutiliza el patrón ya existente de creación de rutina, si existe como componente aislado en `shared-features`).

## 6. Componentes UI requeridos

- Reutiliza `search-tables.page`-style de lista+búsqueda para elegir plantilla.
- Reutiliza el formulario de creación de rutina ya existente en TrainFit consumidor.

## 7. Lógica de negocio

Backend, nuevo endpoint `POST /trainer/clients/:clientId/tables`:
1. `requireActiveClient("training")`.
2. Body: `{ mode: "new", name, ... }` o `{ mode: "duplicate", sourceTableId }`.
3. Si `mode: "new"`: llama a la lógica equivalente de `createTableToUser(clientId, name)` — **importante**: NO llamar literalmente a la función tal cual existe hoy si esa función además hace efectos secundarios pensados para "el usuario se crea SU PROPIA tabla" (p. ej. `addTableToUser` seteando `tableInUse`/`workoutInUse` del propio actor) — hay que revisar `createTableToUser` línea por línea antes de reutilizarla literalmente, porque probablemente asume `idUser === el actor de la petición`, no un tercero. **Este es un punto de implementación real a verificar, no asumir que la función es 100% reutilizable sin ajuste.**
4. Si `mode: "duplicate"`: llama al equivalente de `copyTable(clientId, sourceTableId)` con el mismo cuidado del punto anterior — `copyTable` ya recibe `idUser` como parámetro separado del actor autenticado en su firma actual (`copyTable(idUser, idTable)`), lo cual es una buena señal de que SÍ es directamente reutilizable pasando `clientId` en vez de `req.user.id`. Confirmar esto leyendo `table-dao.js` antes de dar la reutilización por garantizada.
5. Tras crear/duplicar, setea `assignedByTrainerId: trainerId` en el documento resultante (campo nuevo, ver `modelos-de-datos/05-cambios-modelos-existentes.md`).
6. **No debe pasar por `canCreateRoutine`/el conteo de rutinas propias del cliente** (confirmado en `00-decisiones-pendientes.md` D10, ver `funcionalidades/F14-premium-automatico.md`): un cliente FREE con su límite de 1 rutina propia ya usado debe poder recibir esta rutina igualmente — la comprobación de límite FREE es exclusiva de rutinas que el propio cliente crea por su cuenta, nunca de las asignadas por un profesional. Si el endpoint reutiliza literalmente `createTableToUser`, confirmar que esa función NO aplica el límite en este contexto (o pasarle explícitamente que se omita).
7. **No se decide automáticamente el `tableInUse` del cliente** — asignar una rutina no la convierte automáticamente en "la rutina activa" del cliente sin que el propio cliente lo confirme (comportamiento a decidir explícitamente: ¿se activa sola, o el cliente elige activarla como ya hace hoy con cualquier rutina de la biblioteca? **Recomendación de este documento: NO activarla automáticamente** — el cliente mantiene el control de qué rutina está usando activamente, la asignación solo la pone en su biblioteca. Si el negocio prefiere activarla automáticamente, es un cambio pequeño pero debe decidirse explícitamente, no asumirse).

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md`, `modelos-de-datos/05-cambios-modelos-existentes.md` (`assignedByTrainerId`).
- Depende de (revisar antes de reutilizar tal cual, ver punto 7.3): `createTableToUser`, `copyTable` en `table-dao.js`.
- Bloquea: `F15-badge-asignado.md` (necesita que `assignedByTrainerId` se escriba aquí), `F14-premium-automatico.md` (necesita `assignedByTrainerId` para eximir del límite de rutinas y para el tope de microciclos ilimitados).
- Relacionado con: `F30-actualizar-en-bloque.md` (P1, reutiliza esta misma operación N veces).

## 9. Validaciones

- `requireActiveClient("training")` — scope obligatorio, no basta con relación activa de cualquier tipo.
- Si `mode: "duplicate"`, `sourceTableId` debe ser una tabla accesible por el profesional: pública (sin `userId`) o propia (`userId === trainerId`) — un profesional NO puede duplicar la tabla de OTRO cliente suyo hacia este cliente sin más (sería una filtración de datos entre clientes del mismo profesional) a menos que se decida explícitamente permitirlo como feature (no está en el alcance del MVP tal como se ha definido).

## 10. Casos límite y posibles errores

- **El profesional intenta duplicar una tabla que no es suya ni pública** (p. ej. de otro cliente suyo, o de un cliente de otro profesional): debe rechazarse con 403 — esta validación es DISTINTA de `requireActiveClient` (que valida la relación con el cliente DESTINO, no el origen de la plantilla) y debe implementarse explícitamente, no asumir que queda cubierta por otra comprobación.
- **El cliente ya tiene una rutina con el mismo nombre**: no hay restricción de unicidad de nombre en `tables` hoy — se permite, igual que cualquier usuario puede hoy crear dos rutinas con el mismo nombre.
- **La relación se revoca justo después de asignar, antes de que el cliente la vea**: la rutina ya es copia del cliente (con `userId: clientId`) desde el momento de la creación — revocar la relación no la elimina ni la oculta (ver `00-decisiones-pendientes.md` D2).

## 11. Estructura de datos necesaria

Ninguna nueva más allá de `assignedByTrainerId` (ya cubierto en `modelos-de-datos/05-cambios-modelos-existentes.md`).

## 12. Endpoints/API necesarios

- `GET /trainer/clients/:clientId/tables/available-templates` (nuevo, o reutilizar `GET /tables` existente con los filtros adecuados) — lista plantillas públicas + propias del profesional para el selector del Flujo B.
- `POST /trainer/clients/:clientId/tables` — body `{ mode: "new"|"duplicate", ...}`, requiere relación `training`.

## 13. Criterios de aceptación verificables

- [ ] Crear una rutina nueva para un cliente → aparece en la biblioteca del cliente con `assignedByTrainerId` correcto.
- [ ] Duplicar una plantilla pública hacia un cliente → copia profunda completa (splits/workouts/ejercicios/sets), no una referencia.
- [ ] Duplicar una rutina PROPIA del profesional hacia un cliente → funciona igual.
- [ ] Intentar duplicar la rutina de OTRO cliente del mismo profesional hacia este cliente → rechazado.
- [ ] Un profesional con scope `nutrition` (sin `training`) no puede acceder a este endpoint.
- [ ] La rutina asignada NO se convierte automáticamente en `tableInUse` del cliente (salvo que se decida lo contrario explícitamente, ver punto 7.7).
- [ ] Un cliente FREE con su límite de 1 rutina propia ya usado recibe correctamente una rutina asignada por su profesional, sin ningún error de límite.

## 14. Checklist de implementación

- [ ] Revisar `createTableToUser`/`copyTable` en `table-dao.js` línea por línea para confirmar qué ajustes necesitan (punto 7.3-7.4) antes de reutilizarlas.
- [ ] Endpoint `POST /trainer/clients/:clientId/tables` con ambos modos.
- [ ] Endpoint de listado de plantillas disponibles.
- [ ] Validación de que la plantilla de origen es pública o propia del profesional (punto 9-10).
- [ ] UI de asignación (crear/duplicar) en `F06`.
- [ ] Verificar los 6 criterios de aceptación.
