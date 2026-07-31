# F03 — Invitar cliente por email

**Prioridad**: P0. **Fase**: 2.

## 1. Objetivo

Permitir que un profesional invite a un cliente (existente o no en TrainFit) a establecer una relación de entrenamiento, nutrición, o ambas.

## 2. Alcance exacto para el MVP

- El profesional introduce un email y elige libremente para qué ámbito(s) invita — Entrenamiento, Nutrición, o ambos (checkboxes independientes, no un tercer valor "both") — no hay ninguna restricción basada en el rol de la cuenta (todo profesional tiene `roles: ["trainer"]`, ver `arquitectura/03-autenticacion-y-roles.md`). Si marca los dos, se crean 2 `TrainerClient` independientes (uno `scope: "training"`, otro `scope: "nutrition"`) en la misma acción.
- Se crea un `TrainerClient` en estado `pending` por cada scope marcado — la relación SIEMPRE la inicia el profesional (no hay campo `initiatedBy`, ver `modelos-de-datos/01-trainerclient.md`).
- Se envía un email de notificación al cliente (reutilizando la infraestructura de envío de correo ya existente, `mail.sendMailSES`) informando de la invitación.

## 3. Qué NO se incluye en el MVP

- No hay invitación por SMS/WhatsApp — solo email.
- No hay mensaje personalizado del profesional en la invitación (texto libre) — el email es una plantilla fija con el nombre del profesional y el scope invitado.
- No se valida en este flujo si el profesional ha alcanzado su límite de clientes de forma bloqueante desde el primer día — ver `00-decisiones-pendientes.md` D3 y `funcionalidades/F21-limite-clientes-plan.md` para cuándo se activa el enforcement estricto.

## 4. Flujos de usuario paso a paso

1. El profesional, desde el tab "Invitar" (o un botón "+" en "Clientes"), introduce el email del cliente.
2. Marca uno o los dos checkboxes de ámbito (Entrenamiento/Nutrición) que quiere llevar con este cliente — ambos siempre disponibles, sin restricción previa.
3. Pulsa "Enviar invitación".
4. El frontend llama a `POST /trainer/invites` con `{ clientEmail, scopes: ["training"] }` (o `["training", "nutrition"]` si marcó los dos).
5. El backend valida (ver punto 9) y crea un `TrainerClient` en `pending` POR CADA scope en el array, y dispara el envío del email de notificación (uno solo, mencionando ambos ámbitos si aplica).
6. El profesional ve la(s) invitación(es) en su lista de "Invitaciones pendientes" (`GET /trainer/invites`) con un estado visual claro ("Pendiente de respuesta").
7. El cliente recibe el email, y si abre TrainFit (o se registra si no tiene cuenta), ve la(s) invitación(es) pendiente(s) (`funcionalidades/F04-aceptar-rechazar-invitacion.md`) — puede aceptar/rechazar cada una independientemente.

## 5. Pantallas necesarias

- Formulario de invitación: campo de email + selector de scope + botón de envío.
- Lista de invitaciones enviadas (pendientes + históricas), con su estado — puede ser una sección dentro de la misma pantalla de "Clientes" (`F05`) o una pestaña separada ("Invitaciones"), decisión de UI no bloqueante para el diseño técnico.

## 6. Componentes UI requeridos

- Input de email con validación de formato en tiempo real.
- 2 checkboxes independientes ("Entrenamiento" / "Nutrición", no mutuamente excluyentes) — ambos siempre habilitados, ningún profesional tiene restringido de antemano qué puede ofrecer.
- Lista/card de invitación pendiente con botón de cancelar (`DELETE /trainer/invites/:id`).

## 7. Lógica de negocio

- Backend (`trainer-client-service.js`, `inviteClient(trainerId, clientEmail, scopes[])`):
  1. Normaliza el email (`lowercase`, `trim`).
  2. No valida el `scope` contra ningún atributo de la cuenta del profesional — cualquier scope (`training`/`nutrition`) es válido para cualquier `trainerId`, siempre (ver `arquitectura/03-autenticacion-y-roles.md`).
  3. Para CADA scope del array `scopes`, valida solapamiento (`findOverlapping`, ver `modelos-de-datos/01-trainerclient.md`) — si ya existe una relación `active` de ESE scope con OTRO profesional para ese email, rechaza esa invitación concreta con un mensaje claro ("Este cliente ya tiene un profesional de este tipo") sin bloquear la del otro scope si solo una tiene conflicto.
  4. Si `clientEmail` resuelve a un `User` YA EXISTENTE, comprueba que su `roles` incluye `"user"` (confirmado en `00-decisiones-pendientes.md` D6) — si es un profesional puro (`roles: ["trainer"]` sin `"user"`), rechaza con 400 y un mensaje claro ("Este email no corresponde a una cuenta de cliente de TrainFit"). Si el email no corresponde a ningún `User` todavía, la invitación se crea igual (queda vinculada solo por `clientEmail`, ver caso límite de la sección 10) — esta validación solo aplica cuando la cuenta YA existe.
  5. Crea un `TrainerClient` (`pending`) por cada scope que pasó la validación.
  6. Envía el email de notificación (plantilla fija, mencionando el/los ámbito(s) invitado(s), reutilizando `mail.sendMailSES`/`generateHashMail`-style helper, adaptado con un texto propio de invitación en vez del código de verificación).
  7. Devuelve el/los documento(s) creado(s) (vía DTO).

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (el componente completo), `modelos-de-datos/01-trainerclient.md`.
- Depende de: `F01-registro-login-profesional.md` (el profesional debe estar autenticado).
- Bloquea: `F04-aceptar-rechazar-invitacion.md` (no hay nada que aceptar sin esto).
- Relacionado con: `00-decisiones-pendientes.md` D1 (regla de solapamiento exacta) y D6 (validación de rol `"user"` al invitar a un email ya existente).

## 9. Validaciones

- Email con formato válido (reutilizar la validación ya usada en el registro de usuarios).
- No se puede invitar el propio email del profesional.
- Regla de solapamiento (ver `modelos-de-datos/01-trainerclient.md`, sección 9).
- Si el email corresponde a un `User` existente, su `roles` debe incluir `"user"` (`00-decisiones-pendientes.md` D6) — un profesional puro no es invitable como cliente.

## 10. Casos límite y posibles errores

- **El profesional invita al mismo email dos veces con el mismo scope mientras la primera sigue pendiente**: rechazado por el índice único parcial (ver `modelos-de-datos/01-trainerclient.md`, caso límite ya documentado) — el mensaje de error debe ser de negocio ("ya tienes una invitación pendiente para este email"), no el error crudo de Mongo.
- **El email invitado no corresponde a ninguna cuenta de TrainFit**: la invitación se crea igual (queda vinculada por `clientEmail`, `clientId` ausente del documento); el email de notificación en este caso debe invitar también a registrarse en TrainFit, no solo a "aceptar la invitación" (un enlace a "descargar TrainFit" o similar, decisión de copy/marketing, no bloqueante para el diseño técnico). Al registrarse ese email como `User` normal (`roles: ["user"]`), la invitación pendiente ya existente queda resoluble con normalidad en `F04`.
- **El email invitado corresponde a un `User` existente con `roles: ["trainer"]` puro (sin `"user"`)**: rechazado en el momento de invitar (`00-decisiones-pendientes.md` D6) — si esa persona quiere ser cliente de este u otro profesional, primero debe añadirse el rol `"user"` a su propia cuenta (p. ej. desde `configuration.page` de TrainFit, fuera del alcance de F03), no lo puede provocar la invitación de un tercero.
- **El profesional cancela una invitación pendiente** (`DELETE /trainer/invites/:id`): cambia el estado a algo equivalente a cancelado, o se borra directamente el documento (decisión de implementación: si se quiere conservar como historial de "invitaciones canceladas", usar un estado nuevo; el modelo actual de `TrainerClient` no tiene un estado `"cancelled"` explícito, solo `"declined"` — decidir si cancelar una invitación pendiente reutiliza `"declined"` con `revokedBy: "trainer"` o si merece su propio estado. **No resuelto explícitamente en el modelo de datos actual — señalar antes de implementar `DELETE /trainer/invites/:id`.**)

## 11. Estructura de datos necesaria

Ninguna nueva — usa `TrainerClient` tal cual (`modelos-de-datos/01-trainerclient.md`).

## 12. Endpoints/API necesarios

- `POST /trainer/invites` — body `{ clientEmail, scopes: ["training"|"nutrition", ...] }`, protegido con `auth(["trainer"])`. Crea un `TrainerClient` por cada scope del array.
- `GET /trainer/invites` — lista las invitaciones enviadas por el profesional autenticado (pendientes + históricas).
- `DELETE /trainer/invites/:id` — cancela una invitación pendiente (ver caso límite de la sección 10 sobre qué estado usar).

## 13. Criterios de aceptación verificables

- [ ] Cualquier profesional puede marcar cualquiera de los 2 checkboxes de ámbito, sin ninguna opción deshabilitada.
- [ ] Marcar ambos checkboxes al invitar crea 2 `TrainerClient` independientes (`training` + `nutrition`), cada uno revocable/aceptable por separado.
- [ ] Invitar dos veces al mismo email/scope mientras la primera está pendiente → error de negocio claro, no un 500.
- [ ] El email de notificación llega al cliente invitado.
- [ ] Cancelar una invitación pendiente hace que deje de aparecer como "pendiente" en `GET /trainer/invites` y en `GET /trainer/invites/mine` del lado cliente.
- [ ] Invitar a un email de un `User` existente con `roles: ["trainer"]` puro → rechazado con 400.
- [ ] Invitar a un email de un `User` existente con `roles: ["trainer", "user"]` → aceptado con normalidad.

## 14. Checklist de implementación

- [ ] Endpoint `POST /trainer/invites` con toda la validación de la sección 9.
- [ ] Endpoint `GET /trainer/invites`.
- [ ] Endpoint `DELETE /trainer/invites/:id` (resolver primero el punto abierto de qué estado usar).
- [ ] Plantilla de email de invitación.
- [ ] Pantalla de formulario de invitación + lista de invitaciones enviadas.
- [ ] Verificar los 4 criterios de aceptación.
