# F04 — Aceptar/rechazar invitación (lado cliente, en TrainFit normal)

**Prioridad**: P0. **Fase**: 2.

## 1. Objetivo

Permitir que un cliente de TrainFit vea las invitaciones de profesionales que ha recibido y decida aceptarlas o rechazarlas — el consentimiento explícito del cliente es lo que activa cualquier acceso del profesional a sus datos.

## 2. Alcance exacto para el MVP

- Nueva pantalla/sección en `train-fit-front` (app de consumidor), dentro de `profile` o `configuration` (ver `PLAN_TRAINFIT_ENTRENADORES.md` §5, punto 5): "Mis profesionales" o "Mi entrenador" — muestra invitaciones pendientes recibidas por email y profesionales ya activos.
- Aceptar una invitación activa la relación (`status: "active"`) y dispara la concesión de premium si aplica (`F14-premium-automatico.md`).
- Rechazar una invitación la marca como `declined`.

## 3. Qué NO se incluye en el MVP

- No hay negociación/contraoferta de scope (el cliente acepta o rechaza cada invitación tal cual — si el profesional invitó a `training` Y `nutrition` a la vez, son 2 invitaciones independientes, el cliente puede aceptar una y rechazar la otra sin problema, no hace falta pedir nada).
- No se bloquea la aceptación a que el cliente rellene el cuestionario de preferencias nutricionales (ver `00-decisiones-pendientes.md` D5 — supuesto de trabajo: no bloqueante).

## 4. Flujos de usuario paso a paso

1. El cliente recibe el email de invitación (`F03`) y/o abre TrainFit y ve un badge/notificación en su perfil ("Tienes 1 invitación pendiente").
2. Entra a "Mis profesionales", ve la(s) tarjeta(s) de invitación pendiente: nombre del profesional, scope propuesto (Entrenamiento o Nutrición — si invitó a ambos, son 2 tarjetas separadas), botones "Aceptar"/"Rechazar" por cada una.
3. **Si acepta**:
   a. El frontend llama a `POST /trainer/invites/:id/accept`.
   b. El backend valida que el `clientId` de la sesión coincide con el `clientEmail` de la invitación (rellenando `clientId` con `$set` en este momento si todavía estaba ausente del documento).
   c. Valida de nuevo la regla de solapamiento (puede haber cambiado desde que se creó la invitación — otro profesional pudo haberse activado mientras tanto).
   d. Cambia `status` a `active`, rellena `clientId` y `respondedAt`.
   e. Dispara `F14-premium-automatico.md` si el cliente es FREE.
   f. La UI navega a "Mis profesionales" mostrando ya al profesional como activo.
4. **Si rechaza**:
   a. `POST /trainer/invites/:id/decline`.
   b. `status` pasa a `declined`, `respondedAt` se rellena.
   c. La invitación desaparece de "pendientes".

## 5. Pantallas necesarias

- "Mis profesionales" (nueva, en `packages/shared-features/src/app/features/profile/`): lista de invitaciones pendientes + profesionales activos (uno por scope, hasta 2 tarjetas — ver `PLAN_TRAINFIT_ENTRENADORES.md` §9.9 sobre por qué puede haber hasta 2, no una sola "mi entrenador" singular).

## 6. Componentes UI requeridos

- Card de invitación pendiente: avatar/nombre del profesional (si tiene foto, `F25`, si no un placeholder genérico), scope propuesto, botones aceptar/rechazar con confirmación (un alert simple del tipo ya usado en el resto de la app, reutilizando `IonicUtilService.showAlert`).
- Card de profesional activo: nombre, scope, botón "Desvincular" (lleva a `F08-revocar-relacion.md`).
- Badge/indicador de "invitación pendiente" en el punto de entrada a esta pantalla (perfil), reutilizando el patrón visual ya usado para otros badges de la app (p. ej. el badge de "nota anclada").

## 7. Lógica de negocio

- `trainer-client-service.js`, `respondToInvite(invitationId, clientUser, decision)`:
  1. Carga la invitación por `id`.
  2. Valida que `invitation.clientEmail === clientUser.email` (normalizado) — un cliente NO puede aceptar una invitación dirigida a otro email, aunque conozca el `id` (control de autorización adicional, no solo `requireActiveClient` que es para el lado profesional).
  3. Valida que `invitation.status === "pending"` — si ya está `active`/`declined`/`revoked`, responder de forma idempotente (ver `arquitectura/02-modulo-backend-trainerclients.md`, caso límite de doble aceptación).
  4. Si `decision === "accept"`: re-valida solapamiento (puede haber cambiado), rellena `clientId`, cambia a `active`, `respondedAt = now`, dispara concesión de premium.
  5. Si `decision === "decline"`: cambia a `declined`, `respondedAt = now`.

## 8. Dependencias con otros módulos

- Depende de: `F03-invitar-cliente.md` (no hay nada que aceptar sin invitación previa).
- Bloquea: `F05-listado-clientes.md` (el profesional solo ve clientes con relación `active`), `F09`, `F10`, `F11`, `F12`, `F13` (todo lo que requiere `requireActiveClient`).
- Dispara: `F14-premium-automatico.md` (al aceptar, si aplica).

## 9. Validaciones

- El email de la invitación debe coincidir con el email de la sesión del cliente que responde (case-insensitive, mismo criterio de normalización que `modelos-de-datos/01-trainerclient.md`).
- Re-validación de solapamiento en el momento de aceptar, no solo en el momento de invitar (una invitación puede llevar días pendiente; el estado del mundo puede haber cambiado).

## 10. Casos límite y posibles errores

- **El cliente tenía dos invitaciones pendientes de scope conflictivo (de dos profesionales distintos, ambas `training`) y acepta la segunda después de haber aceptado la primera**: la re-validación de solapamiento en el paso de aceptar debe rechazar la segunda aceptación con un mensaje claro ("ya tienes un entrenador activo, recházala o pide a tu profesional que cambie el scope"), en vez de dejar el sistema en un estado ambiguo con dos relaciones `active` del mismo scope (ver `00-decisiones-pendientes.md` D1).
- **El cliente rechaza una invitación por error**: no hay "deshacer" en el MVP — debe pedir al profesional que vuelva a invitar (el índice único parcial de `TrainerClient` lo permite, ver `modelos-de-datos/01-trainerclient.md`, ya que `declined` queda fuera del filtro).
- **La invitación fue creada antes de que el cliente tuviera cuenta, y ahora se registra**: en el momento del registro (o en el primer login), el sistema debe poder mostrarle la invitación pendiente asociada a su email — esto requiere que `GET /trainer/invites/mine` se resuelva por el email de la sesión actual, no por un `clientId` que hasta ahora estaba ausente del documento.

## 11. Estructura de datos necesaria

Ninguna nueva — usa `TrainerClient` tal cual.

## 12. Endpoints/API necesarios

- `GET /trainer/invites/mine` — invitaciones pendientes del email de la sesión actual, protegido con `auth(["user","admin"])` (el cliente es un `User` normal).
- `POST /trainer/invites/:id/accept`.
- `POST /trainer/invites/:id/decline`.
- `GET /trainer/info` — profesionales activos del cliente (para la sección "activos" de la misma pantalla).

## 13. Criterios de aceptación verificables

- [ ] Un cliente ve exactamente las invitaciones dirigidas a su propio email, ninguna otra.
- [ ] Aceptar una invitación la activa y la hace desaparecer de "pendientes", apareciendo en "activos".
- [ ] Rechazar una invitación la elimina de "pendientes" sin crear ninguna relación activa.
- [ ] Aceptar una invitación cuando ya existe otra relación activa del mismo scope conflictivo → error claro, no un estado inconsistente con dos relaciones activas del mismo scope.
- [ ] Un cliente no puede aceptar/rechazar una invitación dirigida a otro email (probar forzando el `id` de una invitación ajena).

## 14. Checklist de implementación

- [ ] `respondToInvite` en `trainer-client-service.js` con toda la validación de la sección 7.
- [ ] Endpoints `GET /trainer/invites/mine`, `POST .../accept`, `POST .../decline`, `GET /trainer/info`.
- [ ] Pantalla "Mis profesionales" en `train-fit-front`.
- [ ] Badge de invitación pendiente en el punto de entrada.
- [ ] Verificar los 5 criterios de aceptación.
