# Modelo de datos 01 — `TrainerClient`

## 1. Objetivo

Modelar la relación profesional↔cliente: con qué ámbito (entrenamiento o nutrición — nunca "ambos" en un mismo documento, ver punto 2), en qué estado está, y su historial. Es el modelo central de todo el proyecto — no existe ningún concepto de vínculo entre dos usuarios en TrainFit hoy, este documento lo crea desde cero.

## 2. Alcance exacto para el MVP

- Una única colección (`trainerclients`) que sirve tanto para invitaciones pendientes como para relaciones activas e históricas — son el mismo documento en distintos estados de una máquina de estados explícita, no dos conceptos separados.
- **`scope` es SIEMPRE `"training"` o `"nutrition"`, nunca `"both"`** (corrección de diseño, 2026-07-31): si un mismo profesional lleva ambos ámbitos de un cliente, son DOS documentos (uno `training`, uno `nutrition`), no uno con `scope: "both"`. Ya era así de facto para dos profesionales distintos (`F05`/`F07` ya agregan varios documentos del mismo cliente en una sola tarjeta con varios chips) — ahora es la ÚNICA forma de representar "ambos", también cuando es el mismo profesional. Simplifica el modelo (un documento = un ámbito, sin caso especial) y elimina de raíz la ambigüedad de "revocar solo la mitad de una relación both" (ver `funcionalidades/F08-revocar-relacion.md`).
- **No hay `initiatedBy`** (corrección de diseño, 2026-07-31): la relación SIEMPRE la inicia el profesional invitando (`F03`). No existe un flujo de cliente solicitando conexión — se eliminó `funcionalidades/F24-directorio-profesionales.md`.

## 3. Qué NO se incluye en el MVP

- No hay array `clients: [ObjectId]` en `User`, ni ningún campo caché tipo `User.trainerId`/`User.nutritionistId` — ver la justificación completa en la sección 7. La única fuente de verdad es esta colección.
- No hay soft-delete/borrado físico de relaciones revocadas — se conservan como historial (`status: "revoked"`), ver `funcionalidades/F22-historial-relaciones.md`.
- No hay versión "plantilla" reutilizable de esta relación — cada documento es una relación 1:1 entre un `trainerId` y un `clientEmail`/`clientId` concretos, para un único `scope`.
- No hay directorio ni solicitud iniciada por el cliente — eliminado, ver punto 2.

## 4. Flujos de usuario que dependen de este modelo

Ver en detalle: `funcionalidades/F03-invitar-cliente.md`, `F04-aceptar-rechazar-invitacion.md`, `F05-listado-clientes.md`, `F07-mis-profesionales-cliente.md`, `F08-revocar-relacion.md`. Este archivo solo describe el modelo, no los flujos completos.

## 5. Pantallas necesarias

Ninguna directamente — es el modelo de datos que sostiene varias pantallas (ver funcionalidades referenciadas arriba).

## 6. Componentes UI requeridos

Ninguno directamente.

## 7. Lógica de negocio — el schema completo

```js
// train-fit-back/components/trainerClients/trainer-client-schema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainerClientSchema = new Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  clientId:  { type: Schema.Types.ObjectId, ref: "User", index: true }, // AUSENTE hasta que el invitado acepte, nunca `null` explícito (ver nota más abajo)
  clientEmail: { type: String, required: true, trim: true, lowercase: true },
  scope: {
    type: String,
    enum: ["training", "nutrition"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "active", "revoked", "declined"],
    default: "pending",
    index: true,
  },
  invitedAt: { type: Date, default: Date.now },
  respondedAt: { type: Date, default: null },
  revokedAt: { type: Date, default: null },
  // `null` debe estar en la lista del enum explícitamente — Mongoose no exime
  // automáticamente el default:null de la validación de enum (verificado al
  // implementar: sin esto, CUALQUIER creación del documento falla con
  // "revokedBy: `null` is not a valid enum value", no solo al revocar).
  revokedBy: { type: String, enum: ["trainer", "client", null], default: null },
}, { collection: "trainerclients" });

// Evita invitaciones duplicadas del mismo profesional al mismo email para el
// mismo ámbito MIENTRAS estén pendientes o activas — permite reinvitar tras
// un revoked/declined (esos estados quedan fuera del índice parcial).
TrainerClientSchema.index(
  { trainerId: 1, clientEmail: 1, scope: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ["pending", "active"] } } }
);

// Consultas por cliente (F05, F07, requireActiveClient) — ya cubiertas por
// los índices simples de trainerId/clientId arriba, pero un índice compuesto
// acelera la consulta más frecuente de todas (requireActiveClient):
TrainerClientSchema.index({ trainerId: 1, clientId: 1, status: 1 });

module.exports = mongoose.model("TrainerClient", TrainerClientSchema);
```

**Por qué `clientId` no tiene `default: null`**: en vez de guardar explícitamente `null` mientras el invitado no tiene cuenta/no ha aceptado, el campo simplemente NO EXISTE en el documento hasta que se rellena con `$set` al aceptar (`F04`). Es la misma lección de la auditoría de tablas huérfanas de esta sesión: un campo `null` explícito y un campo ausente se confunden fácilmente en queries (`{ clientId: null }` matchea ambos en MongoDB) — evitarlo desde el diseño es más barato que descubrirlo en producción. Las queries que necesiten "todavía sin `clientId`" deben usar `{ clientId: { $exists: false } }`, nunca `{ clientId: null }`.

**Por qué `clientEmail` con `lowercase: true, trim: true`**: los emails deben compararse de forma case-insensitive y sin espacios accidentales — sin esta normalización, `Juan@Gmail.com` y `juan@gmail.com` se tratarían como personas distintas al buscar invitaciones pendientes por email (`findPendingByEmail`), un bug sutil y difícil de reproducir en pruebas manuales si quien prueba siempre escribe el email igual.

## 8. Dependencias con otros módulos

- Referencia a `User` (colección `users`) vía `trainerId`/`clientId` — no se modifica el schema de `User` para esto (ver `modelos-de-datos/05-cambios-modelos-existentes.md`).
- Es la dependencia dura de: el middleware `requireActiveClient` (`arquitectura/02-modulo-backend-trainerclients.md`) y de prácticamente todas las `funcionalidades/`.

## 9. Validaciones

- `scope` ∈ `{"training", "nutrition"}` — enum de Mongoose ya lo garantiza a nivel de escritura; el controller debe devolver 400 (no 500) si llega un valor fuera de esa lista.
- `clientEmail` formato de email válido — reutilizar la misma regex/validador que ya usa el registro de usuarios en `users/controller.js`, no crear uno nuevo.
- Validación de solapamiento (regla de negocio, no de schema — vive en `trainer-client-service.js`): antes de crear una relación con un `scope` concreto, comprobar que no exista ya una relación `active` con ESE MISMO `scope` para el mismo `clientEmail`/`clientId` con OTRO `trainerId`. Ver `00-decisiones-pendientes.md` D1 (como mucho 1 relación activa por scope y cliente).

## 10. Casos límite y posibles errores

- **Un mismo profesional invita dos veces por error al mismo email/scope mientras la primera sigue pendiente**: el índice único parcial lo rechaza a nivel de base de datos (error de duplicado) — el service debe capturar ese error de Mongo (código 11000) y devolver un mensaje de negocio claro ("ya existe una invitación pendiente para este cliente"), no dejar que el error crudo de Mongo llegue al cliente HTTP.
- **El cliente se registra en TrainFit DESPUÉS de que exista una invitación pendiente con su email**: `clientId` se rellena con `$set` en el momento de aceptar (`F04`), no antes — hasta entonces, la invitación vive solo con `clientEmail` y el campo `clientId` está simplemente ausente del documento.
- **Se revoca una relación y luego se vuelve a invitar al mismo cliente/scope**: el índice único parcial lo permite porque `revoked` queda fuera del filtro parcial — se crea un documento NUEVO, no se reutiliza el antiguo (el antiguo se conserva como historial, ver `F22`).
- **Un profesional quiere llevar training Y nutrition del mismo cliente**: se invita dos veces (o en una sola acción de UI que crea 2 documentos, ver `funcionalidades/F03-invitar-cliente.md`) — nunca un único documento con `scope: "both"`.

## 11. Estructura de datos necesaria

Ya completa en la sección 7 — este ES el modelo de datos, no hay una sección separada que añadir.

## 12. Endpoints/API necesarios

Ver `apis/especificacion-endpoints.md`, sección de invitaciones/relaciones — no se repite aquí para evitar que el documento se desincronice en dos sitios.

## 13. Criterios de aceptación verificables

- [ ] Crear un documento con los campos obligatorios (`trainerId`, `clientEmail`, `scope`) y confirmar que `status` toma el valor por defecto `"pending"`, y que `clientId` está AUSENTE (no `null`) en el documento.
- [ ] Intentar crear un segundo documento con el mismo `(trainerId, clientEmail, scope)` mientras el primero sigue `pending` → falla con error de índice único.
- [ ] Crear, revocar, y volver a crear un documento con el mismo `(trainerId, clientEmail, scope)` → la tercera operación SÍ tiene éxito (el índice parcial no bloquea contra documentos `revoked`).
- [ ] Insertar `Juan@Gmail.com` y confirmar que se almacena como `juan@gmail.com` (normalización `lowercase`/`trim`).
- [ ] Un profesional invitando a un cliente para training y nutrition crea 2 documentos independientes, cada uno revocable por separado.

## 14. Checklist de implementación

- [ ] Crear `trainer-client-schema.js` con el contenido exacto de la sección 7.
- [ ] Confirmar los dos índices (único parcial + compuesto de consulta).
- [ ] Verificar los 5 criterios de aceptación con datos de prueba reales contra MongoDB (no solo revisión de código).
