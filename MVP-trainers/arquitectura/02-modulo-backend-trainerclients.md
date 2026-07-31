# Arquitectura 02 — Módulo backend `trainerClients` + middleware de autorización

## 1. Objetivo

Crear el componente de dominio backend que sostiene toda la relación profesional↔cliente, siguiendo exactamente el patrón `schema/dao/service/controller/routes/dto` que ya usan los ~20 módulos existentes de `train-fit-back/components/`. Este módulo, junto con su middleware de autorización, es la dependencia dura de **todos** los endpoints de `apis/especificacion-endpoints.md`.

## 2. Alcance exacto para el MVP

- `train-fit-back/components/trainerClients/trainer-client-schema.js` — el schema Mongoose (definido en detalle en `modelos-de-datos/01-trainerclient.md`, no se repite aquí).
- `trainer-client-dao.js` — funciones de acceso a datos: crear invitación, listar por `trainerId`, listar por `clientId`/`clientEmail`, cambiar `status`, comprobar solapamiento de `scope`.
- `trainer-client-service.js` — lógica de negocio: validación de solapamiento de `scope` (ver `00-decisiones-pendientes.md`, D1), orquestación de "aceptar invitación" (incluye disparar `F14-premium-automatico.md`).
- `trainer-client-controller.js` — handlers Express, delgados, delegan en el service.
- `trainer-client-routes.js` — monta las rutas bajo `/api/trainer` (ver `apis/especificacion-endpoints.md` para la lista completa).
- `trainer-client-dto.js` — transforma el documento Mongoose antes de enviarlo al cliente (nunca exponer el documento crudo).
- **El middleware `requireActiveClient`** — la pieza más importante de todo este archivo, ver sección 7.

## 3. Qué NO se incluye en el MVP

- No se crea un componente separado para "invitaciones" vs "relaciones" — es el mismo documento (`TrainerClient`) en distintos estados de su máquina de estados (`pending`/`active`/`revoked`/`declined`).
- No se crea un sistema de eventos/webhooks internos para cuando una relación cambia de estado — las acciones que dependen de un cambio de estado (conceder premium al activar, ver `F14`) se llaman de forma síncrona y directa desde `trainer-client-service.js`, no vía un bus de eventos.
- No se implementa todavía el componente `trainerNotes` en este archivo — tiene su propio archivo, `modelos-de-datos/02-trainernote.md`, aunque sigue el mismo patrón de componente.

## 4. Flujos paso a paso (desarrollo, no de usuario final)

1. Crear el schema (copiar la definición exacta de `modelos-de-datos/01-trainerclient.md`).
2. Escribir el DAO con, como mínimo, estas funciones:
   - `create({ trainerId, clientEmail, scope })`
   - `findActiveByTrainerAndClient(trainerId, clientId)` — la que usa el middleware.
   - `findPendingByEmail(clientEmail)` — para que el cliente vea sus invitaciones pendientes.
   - `findActiveByClient(clientId)` — para que el cliente vea sus profesionales activos.
   - `findAllByTrainer(trainerId, { status })` — para el listado de clientes/histórico del profesional.
   - `findOverlapping(clientEmailOrId, scope, excludingId?)` — para la regla de negocio de solapamiento.
   - `updateStatus(id, status, extra)` — transición de estado genérica (usada por aceptar/rechazar/revocar).
3. Escribir el service con la lógica de negocio (no en el DAO ni en el controller):
   - `inviteClient(trainerId, clientEmail, scope)`: valida solapamiento (`findOverlapping`), crea el documento en `pending`. Si el profesional quiere invitar para `training` Y `nutrition` a la vez, esta función se llama dos veces (una por scope) — nunca crea un único documento `"both"`.
   - `respondToInvite(invitationId, clientId, decision)`: valida que el `clientId` que responde coincide con el email invitado (una vez resuelto a usuario real), cambia `status` a `active`/`declined`, si `active` dispara la concesión de premium (llamada directa a la función de `billing-service.js`, ver `funcionalidades/F14-premium-automatico.md`).
   - `revoke(actorId, relationId, actorRole)`: valida que quien revoca es una de las dos partes de la relación, cambia `status` a `revoked`, guarda `revokedBy`, dispara la retirada de premium si aplica.
4. Escribir el controller — cada handler es una función corta que llama al service y devuelve el DTO.
5. Escribir las rutas, montando cada una con `auth([...])` según corresponda (ver `apis/especificacion-endpoints.md` para qué rol protege cada ruta).
6. Escribir el DTO — como mínimo, nunca exponer el `_id` interno de Mongo de forma que permita a un cliente HTTP adivinar otros `clientId`/`trainerId` fácilmente más allá de lo que ya es visible por diseño (los ids son parte del contrato de la API, esto no es ofuscación, es solo no añadir campos internos innecesarios).
7. **Escribir el middleware `requireActiveClient`** (ver sección 7) — independiente del resto del componente, vive en `middleware/` o dentro del propio módulo, decisión de estilo de código, no de arquitectura.
8. Montar el router en `routes/index.js` bajo el prefijo `/trainer`.

## 5. Pantallas necesarias

Ninguna — este archivo es 100% backend.

## 6. Componentes UI requeridos

Ninguno.

## 7. Lógica de negocio — el middleware `requireActiveClient` (la pieza crítica de seguridad de todo el proyecto)

```js
// Firma conceptual — el nombre exacto del archivo y la implementación de detalle
// quedan a criterio de quien lo escriba, pero el CONTRATO no es negociable:
function requireActiveClient(requiredScope) {
  return async (req, res, next) => {
    const trainerId = req.auth.userId;       // SIEMPRE de la sesión, nunca del body/query
    const clientId = req.params.clientId;    // el único lugar de donde se lee el cliente objetivo

    const relation = await trainerClientDao.findActiveByTrainerAndClient(trainerId, clientId);

    if (!relation) {
      return res.status(403).send({ message: "No tienes una relación activa con este cliente" });
    }

    if (requiredScope && relation.scope !== requiredScope) {
      return res.status(403).send({ message: "Esta acción requiere otro ámbito de relación" });
    }

    req.trainerClientRelation = relation; // disponible para el controller si lo necesita
    next();
  };
}
```

**Reglas no negociables** (repetidas aquí a propósito, ver también `00-riesgos.md` R1):
- `trainerId` se deriva EXCLUSIVAMENTE de `req.auth.userId` (inyectado por `validateAuth.js` tras verificar el JWT). Nunca de `req.body`, `req.query`, ni de un header no verificado.
- Este middleware es la ÚNICA implementación de esta comprobación en todo el backend. Ningún controller de `funcionalidades/` debe reimplementar su propia versión ad-hoc de "¿tengo relación con este cliente?".
- Se usa con un parámetro de scope requerido (`training`, `nutrition`, o `null`/omitido si la acción no depende de scope, como leer notas internas).

## 8. Dependencias con otros módulos

- Depende de: `middleware/validateAuth.js` (para que `req.auth.userId` exista) — no se modifica ese archivo, solo se consume su resultado.
- Depende de: el rol `trainer` estando operativo en `auth()` (ver `arquitectura/03-autenticacion-y-roles.md`).
- Bloquea: todos los endpoints de `apis/especificacion-endpoints.md` bajo `/trainer/clients/:clientId/*`.
- Relacionado con: `funcionalidades/F14-premium-automatico.md` (se dispara desde `trainer-client-service.js`, no es un módulo aparte).

## 9. Validaciones

- `scope` debe ser uno de `"training"`, `"nutrition"` — rechazar con 400 cualquier otro valor (`"both"` ya no existe, ver `modelos-de-datos/01-trainerclient.md`).
- `clientEmail` debe tener formato de email válido antes de crear la invitación (reutilizar la misma validación que ya usa `users/controller.js` en el registro, no inventar una nueva).
- No se puede invitar al mismo `trainerId` que ya es el propio `clientId` (un profesional no puede invitarse a sí mismo).
- Validación de solapamiento (`findOverlapping`, ver `00-decisiones-pendientes.md` D1 para el supuesto exacto): antes de crear una invitación de un scope concreto, comprobar que no exista ya una relación `active` de ESE MISMO scope para ese `clientEmail`/`clientId` con OTRO profesional.

## 10. Casos límite y posibles errores

- **El cliente invitado no tiene cuenta en TrainFit todavía**: la invitación se crea igualmente (`clientId` ausente del documento, solo `clientEmail`). Cuando esa persona se registra en TrainFit con ese email, debe poder ver la invitación pendiente en `F04-aceptar-rechazar-invitacion.md` — esto implica que el flujo de "invitaciones pendientes por email" (`GET /trainer/invites/mine`) se resuelve por email de la sesión actual, no por `clientId`, precisamente para cubrir este caso.
- **El cliente cambia de email** (fuera de alcance de este documento en cuanto a "cómo", pero relevante aquí): una invitación con `clientEmail` desactualizado quedaría huérfana. No se resuelve en el MVP — se acepta como limitación conocida.
- **Doble aceptación simultánea** (el cliente pulsa "aceptar" dos veces rápido, o en dos pestañas): `respondToInvite` debe ser idempotente — si la relación ya está `active`, la segunda llamada no debe fallar ni duplicar el efecto (no conceder premium dos veces, no re-disparar nada). Usar el `status` actual como guarda antes de aplicar la transición.
- **Revocación simultánea por ambas partes**: si el profesional revoca justo cuando el cliente también revoca, la segunda llamada debe encontrar `status` ya `revoked` y responder de forma idempotente (200 sin error, no 500), no asumir que siempre parte de `active`.
- **Se pasa un `clientId` que no existe en `users`**: `requireActiveClient` debe devolver 403 (no relación activa) en vez de un error 500 por referencia rota — la ausencia de relación cubre este caso de forma natural si `findActiveByTrainerAndClient` simplemente no encuentra nada, no hace falta un chequeo de existencia de usuario aparte.

## 11. Estructura de datos necesaria

Ver `modelos-de-datos/01-trainerclient.md` para el schema completo — no se repite aquí.

## 12. Endpoints/API necesarios

Ver `apis/especificacion-endpoints.md` — la sección de invitaciones/relaciones completa. Este archivo de arquitectura describe el módulo que los implementa, no repite la tabla de rutas.

## 13. Criterios de aceptación verificables

- [ ] Crear una invitación con `scope: "training"` y comprobar que queda en estado `pending`.
- [ ] Intentar crear una segunda invitación `training` activa para el mismo `clientEmail` desde otro profesional mientras la primera sigue `active` → debe rechazarse (regla de solapamiento).
- [ ] Aceptar una invitación dos veces seguidas (simulando doble clic) → segunda llamada no falla ni duplica efectos.
- [ ] Revocar una relación y comprobar que una petición posterior a cualquier endpoint `/trainer/clients/:clientId/*` con ese `trainerId`/`clientId` devuelve 403.
- [ ] Un `trainerId` correcto pero un `clientId` de un cliente CON el que no tiene relación → 403, nunca 200 con datos.
- [ ] Probar `requireActiveClient("training")` contra una relación `scope: "nutrition"` → 403.
- [ ] Un profesional con relaciones `training` y `nutrition` separadas (2 documentos) con el mismo cliente pasa `requireActiveClient` correctamente para cada scope de forma independiente.

## 14. Checklist de implementación

- [ ] `trainer-client-schema.js`
- [ ] `trainer-client-dao.js` (7 funciones mínimas listadas en el punto 4.2)
- [ ] `trainer-client-service.js` (`inviteClient`, `respondToInvite`, `revoke`)
- [ ] `trainer-client-controller.js`
- [ ] `trainer-client-routes.js`
- [ ] `trainer-client-dto.js`
- [ ] Middleware `requireActiveClient`
- [ ] Montar router en `routes/index.js`
- [ ] Verificar los 6 criterios de aceptación de arriba
