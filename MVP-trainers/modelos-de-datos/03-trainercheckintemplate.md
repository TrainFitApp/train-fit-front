# Modelo de datos 03 — Plantillas de check-in (`CheckinTemplateDefinition` + `TrainerCheckinTemplate`)

## 1. Objetivo

Permitir que un profesional cree **plantillas de check-in nombradas y reutilizables** (p. ej. "Básico", "Pro") que definen qué campos pedir y con qué cadencia, y las **aplique** a uno o varios clientes — sin construir un form builder libre. Confirmado en `00-decisiones-pendientes.md` D4 (2026-07-31): reemplaza el diseño anterior de este documento, que era una configuración 1:1 por cliente sin nombre ni reutilización.

**Principio que sigue aplicando sin cambios**: catálogo cerrado de campos con toggles (`modelos-de-datos/04-catalogo-campos-checkin.md`), nunca preguntas de texto libre inventadas por el profesional.

**Principio de copia profunda (README, principio 1)**: aplicar una plantilla a un cliente COPIA su configuración (`enabledFields`/`cadence`) al momento de aplicar — no crea una referencia viva a la plantilla maestra. Si el profesional edita la plantilla después, los clientes ya asignados NO cambian automáticamente. Este es el mismo motivo por el que se rechazó el modelo de "plantilla compartida por referencia" de Traineeks para rutinas/dietas (`00-riesgos.md` R4) — aquí se aplica igual, por consistencia arquitectónica.

## 2. Alcance exacto para el MVP

- **`CheckinTemplateDefinition`**: la plantilla maestra, nombrada, propiedad de un `trainerId`. Contiene `enabledFields` + `cadence`. Se crea, edita y borra independientemente de cualquier cliente.
- **`TrainerCheckinTemplate`**: la configuración YA APLICADA a un cliente concreto (un documento por `(trainerId, clientId)`, igual que en el diseño anterior) — pero ahora se rellena por COPIA desde una `CheckinTemplateDefinition` en el momento de aplicar, guardando además `sourceTemplateId` como referencia informativa (no viva) de qué plantilla se usó.
- Aplicar la misma plantilla a varios clientes a la vez reutiliza el mismo patrón que `funcionalidades/F30-actualizar-en-bloque.md` (iterar la operación de "aplicar" sobre una lista de `clientId`, cada aplicación es una copia independiente).

## 3. Qué NO se incluye en el MVP

- No hay preguntas de texto libre inventadas por el profesional — solo activar/desactivar claves del catálogo cerrado dentro de una plantilla.
- No hay sincronización automática entre la plantilla maestra y los clientes ya aplicados — editar la plantilla NO propaga sola, hay que reaplicarla (acción explícita).
- No se guarda aquí el HISTÓRICO de respuestas del cliente al check-in — eso sigue siendo una colección de "respuestas" aparte (`funcionalidades/F17-checkin-catalogo-campos.md`), este modelo es solo la CONFIGURACIÓN de qué se pide.

## 4-6. Flujos, pantallas, componentes UI

Ver `funcionalidades/F17-checkin-catalogo-campos.md` para el flujo completo (crear plantilla, aplicarla, ver respuestas). Este archivo describe solo el modelo de datos.

## 7. Estructura de datos — los dos schemas completos

```js
// train-fit-back/components/trainerCheckins/checkin-template-definition-schema.js
const CheckinTemplateDefinitionSchema = new Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true }, // p. ej. "Básico", "Pro"
  enabledFields: {
    type: [String],
    default: [],
    validate: {
      validator: function (fields) { return fields.every((f) => CHECKIN_FIELD_KEYS.includes(f)); },
      message: "Campo de check-in no reconocido en el catálogo",
    },
  },
  cadence: { type: String, enum: ["weekly"], default: "weekly" },
  createdAt: { type: Date, default: Date.now },
}, { collection: "checkintemplatedefinitions" });

CheckinTemplateDefinitionSchema.index({ trainerId: 1, name: 1 }, { unique: true }); // no dos plantillas con el mismo nombre para el mismo profesional

module.exports = mongoose.model("CheckinTemplateDefinition", CheckinTemplateDefinitionSchema);
```

```js
// train-fit-back/components/trainerCheckins/trainer-checkin-template-schema.js
const TrainerCheckinTemplateSchema = new Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  clientId:  { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  enabledFields: { type: [String], default: [] }, // COPIA de la definition en el momento de aplicar, no una referencia
  cadence: { type: String, enum: ["weekly"], default: "weekly" },
  sourceTemplateId: { type: Schema.Types.ObjectId, ref: "CheckinTemplateDefinition", default: null }, // informativo: "de qué plantilla vino", nunca se lee para resolver el contenido real
  updatedAt: { type: Date, default: Date.now },
}, { collection: "trainercheckintemplates" });

TrainerCheckinTemplateSchema.index({ trainerId: 1, clientId: 1 }, { unique: true });

module.exports = mongoose.model("TrainerCheckinTemplate", TrainerCheckinTemplateSchema);
```

**Por qué `sourceTemplateId` es informativo y no autoritativo**: si se leyera en tiempo real para resolver `enabledFields`, sería exactamente el modelo de referencia compartida que este proyecto rechaza — serviría solo para que la UI pueda mostrar "aplicado desde: Pro" y, opcionalmente, ofrecer un botón "reaplicar" que vuelve a copiar el contenido actual de la definición.

## 8. Dependencias con otros módulos

- Depende de: `modelos-de-datos/04-catalogo-campos-checkin.md` (la lista cerrada de claves válidas, usada por ambos schemas).
- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (protegido por `requireActiveClient`).
- Relacionado con: `funcionalidades/F30-actualizar-en-bloque.md` (mismo patrón de "aplicar a varios clientes a la vez").

## 9. Validaciones

- `CheckinTemplateDefinition`: nombre único por `trainerId` — no se permiten dos plantillas con el mismo nombre.
- `TrainerCheckinTemplate`: índice único `(trainerId, clientId)` sin cambios — un profesional solo tiene UNA configuración aplicada por cliente; aplicar una plantilla nueva SUSTITUYE la anterior (mismo documento actualizado), no crea un segundo.
- Cada valor de `enabledFields` (en ambos schemas) debe existir en el catálogo cerrado — rechazar con 400 cualquier clave desconocida.

## 10. Casos límite y posibles errores

- **El profesional borra una `CheckinTemplateDefinition` que ya se aplicó a varios clientes**: los `TrainerCheckinTemplate` ya aplicados NO se ven afectados (son copias independientes) — solo deja de estar disponible para aplicar a clientes nuevos. `sourceTemplateId` queda apuntando a un documento borrado (referencia rota, no cascada), la UI debe manejarlo con gracia (mismo criterio que `assignedByTrainerId` en `modelos-de-datos/05-cambios-modelos-existentes.md`).
- **El profesional edita una plantilla después de aplicarla a 5 clientes y quiere propagar el cambio**: no hay propagación automática — debe reaplicarla explícitamente a esos 5 clientes (acción manual, uno a uno o en bloque vía el patrón de `F30`).
- **El profesional intenta activar 0 campos en una plantilla**: técnicamente válido, se trata como "check-in desactivado" para quien la tenga aplicada.
- **Se revoca la relación y luego se vuelve a crear**: mismo criterio que antes — se conserva la configuración aplicada (`TrainerCheckinTemplate`) para cuando/si se reactiva.
- **El catálogo de campos cambia después de que ya existan plantillas/configuraciones guardadas**: los documentos existentes quedarían con una clave "huérfana". No hay migración automática en el MVP.

## 11. Estructura de datos

Ya completa en la sección 7.

## 12. Endpoints/API necesarios

- `GET /trainer/checkin-templates` / `POST /trainer/checkin-templates` / `PUT .../:id` / `DELETE .../:id` — CRUD de plantillas maestras (`CheckinTemplateDefinition`).
- `POST /trainer/checkin-templates/:id/apply` — body `{ clientIds: [...] }`, copia la definición a `TrainerCheckinTemplate` de cada cliente listado (mismo patrón que `F30`).
- `GET /trainer/clients/:clientId/checkin-config` — configuración YA aplicada a ese cliente (sin cambios respecto al diseño anterior).

Ver `apis/especificacion-endpoints.md` para el listado consolidado.

## 13. Criterios de aceptación verificables

- [ ] Crear una plantilla nombrada con campos válidos del catálogo → éxito.
- [ ] Intentar crear una segunda plantilla con el mismo nombre para el mismo profesional → rechazado.
- [ ] Aplicar una plantilla a 3 clientes a la vez crea/actualiza 3 `TrainerCheckinTemplate` independientes con el mismo contenido copiado.
- [ ] Editar la plantilla maestra después de aplicarla NO cambia el contenido ya copiado en los clientes (prueba directa de que es copia, no referencia).
- [ ] Borrar una plantilla maestra no borra ni invalida las configuraciones ya aplicadas a clientes.

## 14. Checklist de implementación

- [ ] `checkin-template-definition-schema.js` y `trainer-checkin-template-schema.js` con el contenido de la sección 7.
- [ ] Importar `CHECKIN_FIELD_KEYS` desde el catálogo en ambos schemas.
- [ ] Endpoint de aplicar plantilla a uno o varios clientes (copia, no referencia).
- [ ] Verificar los 5 criterios de aceptación.
