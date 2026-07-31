# Modelo de datos 02 — `TrainerNote`

## 1. Objetivo

Guardar notas privadas que un profesional escribe sobre un cliente, visibles solo para el propio profesional — nunca para el cliente ni para otro profesional. Es cualitativamente distinto de cualquier campo `notes` ya existente en TrainFit (`DietDay.notes`, `Meal.notes`, `CustomExercise.notes`), que son notas del propio usuario sobre sus propios datos y SÍ son visibles para él.

## 2. Alcance exacto para el MVP

Colección nueva y simple, sin cascada de borrado compleja: texto libre, marca de fijado (`pinned`), fecha de creación. Confirmado como patrón real por un competidor en producción (Traineeks: "Apunta aquí tus notas sobre tu cliente. Escribe lo que quieras, son solo para ti").

## 3. Qué NO se incluye en el MVP

- No hay edición histórica ni versionado de notas — una nota se crea, opcionalmente se marca como fijada, y punto. No hay "editar nota anterior" en el MVP (se puede añadir una nota nueva, no reescribir una vieja).
- No hay categorías/etiquetas de notas.
- No hay campo numérico de dolor/EVA (esa idea, del Excel analizado, se descartó explícitamente para el MVP — ver `PLAN_TRAINFIT_ENTRENADORES.md` §10.10, clasificado P2).
- No se reutiliza el campo `notes` de `DietDay`/`Meal` para esto — mezclar rompería la privacidad (el cliente vería las notas internas del profesional).

## 4-6. Flujos, pantallas, componentes UI

Ver `funcionalidades/F19-notas-internas.md` para el detalle completo — este archivo describe solo el modelo.

## 7. Estructura de datos — el schema completo

```js
// train-fit-back/components/trainerNotes/trainer-note-schema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainerNoteSchema = new Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  clientId:  { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  text: { type: String, required: true, trim: true, maxlength: 2000 },
  pinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { collection: "trainernotes" });

TrainerNoteSchema.index({ trainerId: 1, clientId: 1, createdAt: -1 });

module.exports = mongoose.model("TrainerNote", TrainerNoteSchema);
```

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (el middleware `requireActiveClient` protege el acceso — un profesional solo puede leer/escribir notas de un cliente con el que tiene relación activa, cualquier `scope`, no requiere `training`/`nutrition` específico ya que las notas son transversales).
- No depende de `Table`/`Diet`/`Meal` ni ningún modelo de dominio existente — colección totalmente aislada.

## 9. Validaciones

- `text` no vacío tras `trim()`, máximo 2000 caracteres (mismo orden de magnitud que otros campos de texto libre en TrainFit, p. ej. `DietDay.notes`).
- `trainerId` y `clientId` ambos obligatorios — a diferencia de `TrainerClient`, aquí no tiene sentido una nota "pendiente" sin cliente resuelto; una nota solo puede crearse sobre una relación ya `active`.

## 10. Casos límite y posibles errores

- **El profesional revoca la relación con el cliente**: ¿qué pasa con las notas ya escritas? Se conservan (no se borran) — son propiedad del profesional sobre su propio historial de trabajo, no del cliente. Si el profesional vuelve a tener relación con ese cliente en el futuro, las notas antiguas siguen ahí. Esto es una decisión de diseño razonable pero no estaba explícitamente confirmada por el usuario — si el negocio prefiere borrarlas al revocar, es un cambio pequeño (borrar por `trainerId+clientId` al revocar) pero debe decidirse explícitamente.
- **Un profesional intenta leer notas de un cliente con el que nunca tuvo relación**: bloqueado por `requireActiveClient`, igual que cualquier otro dato del cliente.
- **Texto con HTML/scripts**: aplicar el mismo saneamiento que ya usa el resto de campos de texto libre de la app (si `DietDay.notes`/`Meal.notes` no sanean HTML hoy, no hace falta un tratamiento especial aquí tampoco — consistencia con el resto del sistema, no una isla de seguridad distinta).

## 11. Estructura de datos

Ya completa en la sección 7.

## 12. Endpoints/API necesarios

`GET /trainer/clients/:clientId/notes`, `POST /trainer/clients/:clientId/notes` — ver `apis/especificacion-endpoints.md` para el detalle de request/response.

## 13. Criterios de aceptación verificables

- [ ] Crear una nota de 2001 caracteres → rechazada (400).
- [ ] Crear una nota vacía o solo espacios → rechazada (400).
- [ ] Un profesional sin relación activa con el cliente no puede leer ni crear notas sobre él (403, vía `requireActiveClient`).
- [ ] Las notas de un cliente no son visibles desde la app de consumidor (TrainFit) bajo ninguna pantalla — confirmar que no se expone accidentalmente esta colección en ningún endpoint de `train-fit-front`.

## 14. Checklist de implementación

- [ ] `trainer-note-schema.js` con el contenido de la sección 7.
- [ ] DAO/service/controller/routes/dto siguiendo el mismo patrón que `trainerClients`.
- [ ] Verificar los 4 criterios de aceptación.
