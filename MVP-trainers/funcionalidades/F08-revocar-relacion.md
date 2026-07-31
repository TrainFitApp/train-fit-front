# F08 — Revocar relación (por cualquiera de las dos partes)

**Prioridad**: P0. **Fase**: 2.

## 1. Objetivo

Permitir que tanto el profesional como el cliente terminen una relación activa, por `scope`, en cualquier momento.

## 2. Alcance exacto para el MVP

- El profesional puede revocar la relación con un cliente concreto (desde `F05`/`F06`).
- El cliente puede desvincularse de un profesional concreto (desde `F07`), por `scope` si tiene relaciones separadas.
- Al revocar, TODOS los beneficios de `F14-premium-automatico.md` (sin anuncios, exención de límite de rutinas/objetivos, microciclos ilimitados) dejan de aplicar de inmediato si esa era la última relación activa del scope correspondiente — ninguno depende de un campo fijo, todos se reevalúan contra el estado ACTUAL de la relación (corrección de diseño, 2026-07-31). Lo ya asignado (`assignedByTrainerId`) NO se borra ni se archiva (D2 intacto), simplemente deja de estar exento de los límites FREE.

## 3. Qué NO se incluye en el MVP

- No hay motivo obligatorio de revocación (texto libre explicando por qué) — un simple confirm/cancel basta.
- No hay periodo de gracia ni "deshacer revocación" — es inmediata y definitiva (para reactivar, hay que volver a invitar/aceptar desde cero).
- No se decide en este documento qué pasa con rutinas/dietas ya asignadas al revocar (ver `00-decisiones-pendientes.md` D2 — supuesto de trabajo: se quedan con el cliente tal cual, `assignedByTrainerId` como dato histórico).

## 4. Flujos de usuario paso a paso

**Desde el profesional**:
1. En el detalle de cliente (`F06`) o en el listado (`F05`), el profesional pulsa "Finalizar relación" (o similar).
2. Confirmación (alert simple: "¿Seguro que quieres dejar de ser el [entrenador/nutricionista] de [nombre]?").
3. `DELETE /trainer/clients/:clientId` (con el `scope` a revocar si el cliente tiene varias relaciones con el mismo profesional — ver caso límite).
4. La relación pasa a `revoked`, `revokedBy: "trainer"`, `revokedAt: now`.
5. El cliente deja de estar exento de anuncios por esta relación (`F14`) — si tenía otra relación activa con otro profesional, sigue exento por esa.
6. El cliente desaparece de la lista de clientes activos del profesional (`F05`).

**Desde el cliente**:
1. En "Mis profesionales" (`F07`), el cliente pulsa "Desvincular" en la tarjeta del profesional (o del scope concreto si tiene dos scopes con distintas personas).
2. Confirmación.
3. `DELETE /trainer/link/:scope`.
4. Misma transición de estado, `revokedBy: "client"`.
5. El profesional deja de ver a ese cliente en su lista.

## 5. Pantallas necesarias

Ninguna nueva — el botón de revocar vive dentro de pantallas ya definidas (`F05`/`F06` para el profesional, `F07` para el cliente).

## 6. Componentes UI requeridos

- Alert de confirmación (reutilizar `IonicUtilService.showAlert`, patrón ya usado en toda la app para acciones destructivas, p. ej. "Eliminar producto"/"Vaciar comida").

## 7. Lógica de negocio

`trainer-client-service.js`, `revoke(actorId, relationId, actorRole)`:
1. Carga la relación por `id` (o por `trainerId`+`clientId`+`scope` si se revoca por scope desde el lado cliente, que puede no conocer el `id` interno del documento).
2. Valida que `actorId` es efectivamente el `trainerId` o el `clientId` de esa relación (nunca un tercero).
3. Si ya está `revoked`, responde de forma idempotente (200, sin duplicar efectos).
4. Cambia `status` a `revoked`, rellena `revokedAt`, `revokedBy`.
5. No hay ninguna llamada a `billing-service.js` que hacer aquí — el beneficio de `F14` (sin anuncios) se recalcula solo, en la siguiente comprobación de `canSeeAds`, a partir de si sigue existiendo alguna relación `active`; no requiere ninguna acción explícita al revocar.

## 8. Dependencias con otros módulos

- Depende de: `F04` (tiene que existir una relación activa para revocar algo).
- Relacionado con: `F14-premium-automatico.md` — los 3 beneficios (anuncios, exención de límite, microciclos) dependen de relación activa y se recalculan sin ninguna acción explícita al revocar, no hace falta ningún efecto secundario en `revoke()` para esto.
- Relacionado con: `modelos-de-datos/05-cambios-modelos-existentes.md` (`assignedByTrainerId` no se toca al revocar, ver `00-decisiones-pendientes.md` D2).

## 9. Validaciones

- Solo el `trainerId` o el `clientId` de la relación exacta pueden revocarla — verificado contra `req.auth.userId`, nunca contra un valor del body.

## 10. Casos límite y posibles errores

- **El cliente tiene relación `training` Y `nutrition` con el mismo profesional (2 documentos separados) y quiere desvincularse solo de nutrición**: esto ya funciona sin ningún caso especial — cada scope es su propio documento `TrainerClient`, revocar uno no toca el otro. El problema que existía cuando `scope: "both"` era un único documento (no se podía "revocar solo la mitad") desaparece con el modelo actual, ver `modelos-de-datos/01-trainerclient.md`.
- **Doble revocación simultánea** (ambas partes revocan casi a la vez): idempotencia ya cubierta en el punto 7.3.
- **Se revoca mientras el profesional tiene una asignación de rutina/comida en curso** (poco probable dado que las operaciones son síncronas y rápidas, pero mencionado por completitud): no hay una operación "en curso" de larga duración en este sistema (todo es petición-respuesta síncrona), así que este caso límite no aplica realmente al MVP tal como está diseñado — se anota para descartarlo explícitamente, no por omisión.

## 11. Estructura de datos necesaria

Ninguna nueva — transición de estado sobre `TrainerClient`.

## 12. Endpoints/API necesarios

- `DELETE /trainer/clients/:clientId?scope=training|nutrition` (lado profesional) — `scope` obligatorio en el query, ya que cada documento es de un único scope; revoca solo el documento de ese scope, sin afectar al otro si existe.
- `DELETE /trainer/link/:scope` (lado cliente).

## 13. Criterios de aceptación verificables

- [ ] El profesional revoca una relación → el cliente desaparece de `F05` inmediatamente (próxima carga).
- [ ] El cliente se desvincula → el profesional deja de verlo en su lista.
- [ ] Un cliente con relaciones `training` y `nutrition` con el mismo profesional puede revocar solo una, conservando la otra intacta.
- [ ] Intentar revocar una relación de la que no se es parte (ni `trainerId` ni `clientId`) → rechazado, nunca 200.
- [ ] Revocar dos veces seguidas la misma relación → segunda llamada idempotente, no error 500.

## 14. Checklist de implementación

- [ ] `revoke()` en `trainer-client-service.js` con la validación de autoría.
- [ ] Endpoints `DELETE /trainer/clients/:clientId` y `DELETE /trainer/link/:scope`.
- [ ] Botón + confirmación en las pantallas correspondientes.
- [ ] Verificar los 5 criterios de aceptación.
