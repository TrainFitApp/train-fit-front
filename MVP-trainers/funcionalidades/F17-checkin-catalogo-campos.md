# F17 — Check-in periódico: catálogo de campos activables

**Prioridad**: P1 (mecanismo P0/P1 según `PLAN_TRAINFIT_ENTRENADORES.md` §11.2b — no bloquea el lanzamiento pero es de las piezas P1 de mayor valor). **Fase**: 6.

## 1. Objetivo

Que el profesional decida QUÉ pedir a cada cliente periódicamente (peso, perímetros, bienestar semanal...) activando/desactivando campos de un catálogo cerrado — sin construir un form builder. Reemplaza el diseño original de "check-in fijo de N campos iguales para todos", corregido tras analizar un competidor real en producción.

## 2. Alcance exacto para el MVP (de esta funcionalidad P1)

- El profesional crea plantillas NOMBRADAS y reutilizables (p. ej. "Básico", "Pro") con los campos de `modelos-de-datos/04-catalogo-campos-checkin.md` que quiere activar, y las **aplica** a uno o varios clientes (`modelos-de-datos/03-trainercheckintemplate.md`, confirmado en `00-decisiones-pendientes.md` D4) — aplicar copia el contenido de la plantilla al cliente, no lo enlaza en vivo.
- El cliente, con la cadencia configurada (`weekly`), recibe un recordatorio (local, ver `00-riesgos.md` R5 — sin push remoto) y rellena los campos activos en una pantalla simple.
- El profesional ve el histórico de respuestas del cliente.

## 3. Qué NO se incluye en el MVP

- No hay preguntas de texto libre inventadas por el profesional (ver `modelos-de-datos/04-catalogo-campos-checkin.md`, punto 3) — las plantillas solo activan/desactivan claves del catálogo cerrado.
- No hay sincronización automática entre una plantilla y los clientes que ya la tienen aplicada — editar la plantilla no propaga sola, hay que reaplicarla.
- **Corrección de diseño (D8, 2026-07-31)**: los campos de composición corporal/perímetros SÍ se integran con `Anthropometry` — ya no son almacenamientos separados. Responder un check-in con peso/perímetros escribe directamente en la misma colección que ya alimenta las gráficas de progreso del cliente en TrainFit consumidor. Solo el grupo "bienestar" (escalas subjetivas) sigue en una colección propia, ver punto 7.

## 4. Flujos de usuario paso a paso

**Crear/editar plantilla (profesional)**:
1. Desde una sección "Plantillas de check-in" (nueva, fuera del detalle de un cliente concreto — las plantillas son del profesional, no de un cliente), el profesional crea una plantilla nueva o edita una existente.
2. Le pone nombre (p. ej. "Básico"), ve el catálogo agrupado (Composición corporal / Perímetros / Bienestar), cada campo con un toggle.
3. Activa los campos que quiere incluir, confirma la cadencia (`weekly`, único valor soportado en el MVP).
4. Guarda (`POST`/`PUT /trainer/checkin-templates`).

**Aplicar plantilla a uno o varios clientes (profesional)**:
1. Desde el detalle de un cliente (`F06`) o desde la propia pantalla de plantillas, el profesional elige "Aplicar plantilla".
2. Selecciona la plantilla y uno o varios clientes destino (multi-selección, mismo patrón que `F30-actualizar-en-bloque.md`).
3. Confirma. El backend copia `enabledFields`/`cadence` de la plantilla al `TrainerCheckinTemplate` de cada cliente seleccionado (`POST /trainer/checkin-templates/:id/apply`).

**Respuesta (cliente)**:
1. Con la cadencia configurada, el cliente ve un recordatorio (notificación local del dispositivo, o simplemente un indicador visible en su app la próxima vez que la abre — sin push remoto, ver `00-riesgos.md` R5).
2. Abre la pantalla de check-in, ve SOLO los campos que su profesional activó, agrupados igual que en la configuración.
3. Rellena los valores, confirma.
4. Se guarda una respuesta con fecha.

**Revisión (profesional)**:
1. El profesional ve el histórico de respuestas del cliente en la sección correspondiente del detalle de cliente.

## 5. Pantallas necesarias

- "Plantillas de check-in" (profesional): listado de plantillas propias + crear/editar (catálogo con toggles agrupados + nombre).
- "Aplicar plantilla" (profesional): selector de plantilla + selector múltiple de clientes destino.
- "Mi check-in" (cliente, en TrainFit normal): formulario con solo los campos activos.
- "Histórico de check-ins" (profesional): lista de respuestas pasadas del cliente.

## 6. Componentes UI requeridos

- Lista de toggles agrupada por `group` del catálogo (reutilizable entre creación/edición de plantilla).
- Selector múltiple de clientes destino para "aplicar plantilla" (mismo patrón que `F30-actualizar-en-bloque.md`).
- Formulario de respuesta: inputs numéricos para `type: "number"`, selector 1-5 para `type: "scale_1_5"` (puede reutilizar `RirPickerComponent`-style de selector numérico si aplica visualmente, o un componente nuevo simple de 5 botones).

## 7. Lógica de negocio

- Backend: CRUD de `CheckinTemplateDefinition` sobre `/trainer/checkin-templates` (profesional, no requiere `clientId` — es propiedad del profesional, no de una relación).
- `POST /trainer/checkin-templates/:id/apply` — copia `enabledFields`/`cadence` al `TrainerCheckinTemplate` de cada `clientId` en el body, requiriendo `requireActiveClient` (cualquier scope) por cada uno.
- `GET /trainer/clients/:clientId/checkin-config` sigue existiendo sin cambios — lee la configuración YA aplicada a ese cliente (el resultado de la copia, no la plantilla en sí).
- **Escritura de la respuesta — dos destinos según `storage` de cada campo** (`modelos-de-datos/04-catalogo-campos-checkin.md`, D8): al recibir `POST /trainer/checkins/:trainerId/respond`, el backend separa los valores del body en dos grupos según el catálogo:
  1. Campos `storage: "anthropometry"` → se escriben con upsert por `(clientId, fecha de hoy)` en `Anthropometry[anthropometryField]`, FUSIONANDO con lo que ya hubiera ese día (nunca sobrescribiendo el documento entero — ver caso límite en `modelos-de-datos/05-cambios-modelos-existentes.md`).
  2. Campos `storage: "wellbeing"` → se guardan en `CheckinResponse` (colección propia, ver sección 11), ahora mucho más pequeña que en el diseño original (solo 11 campos posibles, no 29).
- El cliente responde vía `POST /trainer/checkins/:trainerId/respond` — protegido con `auth(["user","admin"])`, resolviendo `trainerId`/`clientId` a partir de la relación activa del cliente que responde (si tiene dos profesionales, dos configuraciones de check-in separadas y potencialmente distintas cadencias).

## 8. Dependencias con otros módulos

- Depende de: `modelos-de-datos/03-trainercheckintemplate.md`, `modelos-de-datos/04-catalogo-campos-checkin.md`, `modelos-de-datos/05-cambios-modelos-existentes.md` (extensión de `Anthropometry`, D8).
- Depende de: `arquitectura/02-modulo-backend-trainerclients.md`.
- Relacionado con: `funcionalidades/F18-checkin-por-sesion.md` — mecanismo DISTINTO (cadencia por sesión de entreno, no semanal; campos fijos, no del catálogo togglable) — no confundir ni fusionar ambos.

## 9. Validaciones

- Los valores de respuesta deben corresponder a campos que estaban activos en `enabledFields` en el momento de responder — rechazar valores de campos no activos (evita que el cliente mande datos de campos que su profesional no pidió).
- Valores de `type: "scale_1_5"` deben estar entre 1 y 5.
- Valores de `type: "number"` deben ser no negativos (peso, perímetros, pasos, horas de sueño — ninguno tiene sentido en negativo).

## 10. Casos límite y posibles errores

- **El cliente tiene dos profesionales con configuraciones de check-in distintas** (uno pidiendo perímetros, otro pidiendo bienestar): debe ver dos check-ins independientes, uno por relación, no fusionados en uno solo — cada uno con su propia cadencia y su propio histórico.
- **El profesional edita una plantilla después de aplicarla a varios clientes**: los clientes ya aplicados NO cambian — debe reaplicar explícitamente si quiere propagar el cambio (ver `modelos-de-datos/03-trainercheckintemplate.md`, caso límite ya documentado).
- **El profesional borra una plantilla que sigue aplicada a clientes activos**: las configuraciones ya aplicadas se conservan intactas (son copias), la plantilla solo deja de estar disponible para aplicar a clientes nuevos.
- **El profesional desactiva un campo después de que el cliente ya haya respondido varias veces con él activo**: las respuestas históricas se conservan tal cual (no se borran ni se ocultan retroactivamente) — solo deja de pedirse en check-ins futuros.
- **El cliente no responde nunca al check-in**: no hay ninguna consecuencia automática en el MVP (no bloquea nada, no genera alertas al profesional más allá de que el histórico simplemente está vacío) — un sistema de alertas por check-ins no respondidos sería una mejora futura, no incluida aquí.
- **El cliente responde un check-in con peso el mismo día que ya se había auto-registrado su peso en TrainFit**: el upsert en `Anthropometry` debe fusionar campo a campo (`$set` solo de los presentes), nunca reemplazar el documento completo — de lo contrario, cualquiera de las dos escrituras podría borrar silenciosamente datos de la otra. Ver el mismo caso límite documentado en `modelos-de-datos/05-cambios-modelos-existentes.md`.
- **No se recibe ningún valor `storage: "wellbeing"` en una respuesta** (el cliente solo tenía activados campos de composición corporal): `CheckinResponse` simplemente no se crea ese día (o se crea con `values: {}`, decisión de implementación) — no es un error, es válido no tener nada que guardar en esa colección si todo lo respondido fue anthropometry-backed.

## 11. Estructura de datos necesaria

```js
// Nueva colección, además de TrainerCheckinTemplate ya definida en modelos-de-datos/03.
// Desde D8 (2026-07-31), SOLO guarda los campos storage: "wellbeing" del catálogo (11 posibles,
// no 29) — composición corporal y perímetros se escriben en Anthropometry, no aquí.
const CheckinResponseSchema = new Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  clientId:  { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  respondedAt: { type: Date, default: Date.now },
  values: { type: Schema.Types.Mixed, required: true }, // { [fieldKey]: number }, solo claves wellbeing-backed
}, { collection: "checkinresponses" });

CheckinResponseSchema.index({ trainerId: 1, clientId: 1, respondedAt: -1 });
```

## 12. Endpoints/API necesarios

- `GET/POST/PUT/DELETE /trainer/checkin-templates` (CRUD de plantillas maestras, profesional).
- `POST /trainer/checkin-templates/:id/apply` (aplicar a uno o varios clientes, profesional).
- `GET /trainer/clients/:clientId/checkin-config` (profesional, configuración ya aplicada a ese cliente).
- `GET /trainer/clients/:clientId/checkin-responses` (profesional, histórico).
- `GET /trainer/checkins/mine` (cliente, ve qué campos le piden actualmente, por cada profesional activo).
- `POST /trainer/checkins/:trainerId/respond` (cliente).

## 13. Criterios de aceptación verificables

- [ ] Crear una plantilla nombrada, aplicarla a un cliente, y confirmar que el cliente solo ve esos campos en su formulario.
- [ ] Aplicar la misma plantilla a 3 clientes a la vez funciona correctamente para los 3.
- [ ] El cliente responde y el profesional ve la respuesta en el histórico.
- [ ] Un cliente con dos profesionales ve dos check-ins independientes.
- [ ] Enviar un valor para un campo no activo → rechazado.
- [ ] Desactivar un campo no borra las respuestas históricas que lo incluían.
- [ ] Responder un check-in con campos de composición corporal/perímetros escribe en `Anthropometry`, visible en las gráficas de progreso del propio cliente en TrainFit — no solo en la vista del profesional.
- [ ] Responder un check-in con campos de bienestar escribe en `CheckinResponse`, nunca en `Anthropometry`.

## 14. Checklist de implementación

- [ ] `CheckinResponseSchema` reducida a solo wellbeing (sección 11).
- [ ] CRUD de plantillas + endpoint de aplicar.
- [ ] Lógica de separación por `storage` al procesar una respuesta (sección 7) — con fusión, no sobrescritura, al escribir en `Anthropometry`.
- [ ] Pantalla de plantillas (crear/editar/listar) con toggles agrupados.
- [ ] Pantalla de "aplicar plantilla" con selector múltiple de clientes.
- [ ] Pantalla de respuesta (cliente) con solo los campos activos.
- [ ] Pantalla de histórico (profesional).
- [ ] Verificar los 8 criterios de aceptación.
