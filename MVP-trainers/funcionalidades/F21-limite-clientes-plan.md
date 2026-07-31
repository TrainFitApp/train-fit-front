# F21 — Límite de clientes por plan (free/premium de profesional)

**Prioridad**: P1. **Fase**: 6. Depende de `F02`.

## 1. Objetivo

Hacer cumplir el límite de nº de clientes según el plan del profesional (free vs. de pago), reutilizando exactamente el patrón de `FREE_LIMITS`/`PREMIUM_LIMITS` de `feature-access-service.js`.

## 2. Alcance exacto para el MVP

- Extender `feature-access-service.js` (o crear un archivo hermano en el mismo componente `billing/`) con 3 tramos, confirmados en `00-decisiones-pendientes.md` D3: `TRAINER_FREE_LIMITS = { clients: 3 }`, `TRAINER_PRO_LIMITS = { clients: 15 }`, `TRAINER_UNLIMITED_LIMITS = { clients: Infinity }`.
- El endpoint `POST /trainer/invites` (`F03`) comprueba, antes de crear la invitación, si el profesional ya alcanzó su límite de clientes ACTIVOS + PENDIENTES (contar ambos, no solo activos, para que no se pueda evadir el límite acumulando invitaciones pendientes sin límite).

## 3. Qué NO se incluye en el MVP

- No hay un cuarto tramo intermedio ni descuentos por volumen — solo los 3 tramos de D3.
- No hay límites distintos por tipo de scope (p. ej. "hasta 5 de entrenamiento y 3 de nutrición por separado") — un único contador total de clientes por profesional, independientemente del scope.

## 4. Flujos de usuario paso a paso

1. El profesional intenta invitar a un cliente cuando ya tiene el nº de relaciones activas+pendientes de su plan (3 en FREE, 15 en PRO — en UNLIMITED nunca se dispara).
2. El backend rechaza `POST /trainer/invites` con un código/mensaje específico ("Has alcanzado el límite de tu plan").
3. El frontend, al recibir ese código, muestra el paywall de `F02` en vez de un error genérico.

## 5. Pantallas necesarias

Ninguna nueva — reutiliza el paywall de `F02`, disparado desde el flujo de invitar (`F03`) al recibir el error de límite.

## 6. Componentes UI requeridos

Ninguno nuevo.

## 7. Lógica de negocio

En `trainer-client-service.js`, `inviteClient`, antes de crear la invitación:
```js
const currentCount = await trainerClientDao.countByTrainer(trainerId, { status: { $in: ["pending", "active"] } });
const limits = getTrainerLimits(trainerUser); // extensión de feature-access-service.js
if (currentCount >= limits.clients) {
  throw new LimitReachedError();
}
```

## 8. Dependencias con otros módulos

- Depende de: `F02-suscripcion-profesional.md` (el concepto de plan premium del profesional).
- Depende de: `F03-invitar-cliente.md` (el punto exacto donde se aplica el gate).

## 9. Validaciones

- El conteo debe incluir `pending` + `active`, nunca solo `active` (de lo contrario, un profesional FREE podría invitar ilimitadamente mientras las invitaciones sigan sin responder).

## 10. Casos límite y posibles errores

- **El profesional tiene invitaciones `pending` que nunca se responden, ocupando "cupo" indefinidamente**: es un caso límite real — un cliente invitado que nunca acepta ni rechaza bloquea ese cupo para siempre en el MVP (no hay expiración automática de invitaciones). Si esto resulta un problema real en producción, una mejora futura sería expirar invitaciones pendientes tras N días — no incluida en este MVP.
- **El profesional pasa de premium a free (cancela su suscripción) teniendo más clientes activos de los que el plan free permite**: no se revocan clientes existentes por encima del límite (ver el mismo criterio ya aplicado en `F02`, sección 10) — simplemente no puede invitar clientes NUEVOS hasta volver a estar dentro del límite (ya sea por revocar clientes existentes o por volver a pagar).

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

Ninguno nuevo propio — modifica el comportamiento de `POST /trainer/invites` (`F03`), añadiendo una comprobación previa.

## 13. Criterios de aceptación verificables

- [ ] Un profesional FREE en su límite de 3 no puede crear una invitación nueva (ni `pending` ni activando una `active` adicional).
- [ ] Un profesional PRO en su límite de 15 recibe el mismo bloqueo.
- [ ] El conteo incluye tanto `pending` como `active`.
- [ ] Un profesional UNLIMITED (`clients: Infinity`) nunca es bloqueado por este gate.
- [ ] Al recibir el error de límite, el frontend muestra el paywall, no un mensaje de error genérico sin acción.

## 14. Checklist de implementación

- [ ] Extender `feature-access-service.js` (o archivo hermano) con los 3 tramos de límites de profesional.
- [ ] Añadir el gate en `inviteClient`.
- [ ] Conectar el error de límite con el paywall en el frontend.
- [ ] Verificar los 5 criterios de aceptación.
