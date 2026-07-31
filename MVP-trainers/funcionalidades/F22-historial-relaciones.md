# F22 — Historial de relaciones pasadas

**Prioridad**: P1. **Fase**: 6. Depende de que existan relaciones `revoked`/`declined` reales.

## 1. Objetivo

Que tanto el profesional como el cliente puedan consultar relaciones pasadas (ya no activas), no solo las activas actuales — trazabilidad de "quién fue mi entrenador antes", útil para ambas partes.

## 2. Alcance exacto para el MVP

- Lista de relaciones en estado `revoked`/`declined` del profesional (todas las que tuvo con cualquier cliente) y del cliente (todas las que tuvo con cualquier profesional), con fecha de inicio, fin, y motivo de fin (`revokedBy`).

## 3. Qué NO se incluye en el MVP

- No hay reactivación directa desde el historial (para volver a vincularse, hay que pasar por `F03`/invitación nueva, no un botón de "reactivar" sobre el registro histórico).
- No incluye lo asignado durante esa relación (qué rutinas/dietas se pautaron) — sería una extensión de valor, pero añade complejidad de agregación no incluida en este primer corte P1 (se podría cruzar `assignedByTrainerId` con fechas, pero no está en el alcance descrito por el `PLAN_TRAINFIT_ENTRENADORES.md` original para esta pieza).

## 4. Flujos de usuario paso a paso

1. Desde el listado de clientes (`F05`) o el perfil, el profesional accede a "Historial".
2. Ve las relaciones pasadas (no activas), con cliente, scope, fechas, y quién la terminó.
3. Simétrico para el cliente desde "Mis profesionales" (`F07`).

## 5. Pantallas necesarias

- Pantalla/sección "Historial" (profesional) y equivalente (cliente).

## 6. Componentes UI requeridos

- Lista simple de tarjetas (mismo componente visual que las de clientes/profesionales activos, con un estado visual distinto para "terminada").

## 7. Lógica de negocio

- `GET /trainer/clients?status=revoked,declined` (o un endpoint separado `GET /trainer/history`) — filtra `TrainerClient` por `trainerId` y estado no-activo.
- Simétrico del lado cliente.

## 8. Dependencias con otros módulos

- Depende de: `F08-revocar-relacion.md` (necesita que existan relaciones revocadas de verdad).

## 9-10. Validaciones y casos límite

- Ninguno propio más allá de asegurar que solo se muestran relaciones donde el usuario autenticado es parte (`trainerId` o `clientId` según el lado), nunca relaciones de terceros.

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

- `GET /trainer/clients?status=...` (extensión del endpoint de `F05` con un filtro de estado) o `GET /trainer/history` (endpoint separado, decisión de implementación).

## 13. Criterios de aceptación verificables

- [ ] El profesional ve sus relaciones pasadas con fecha de inicio/fin y quién la terminó.
- [ ] El cliente ve el equivalente desde su lado.
- [ ] Ningún usuario ve relaciones históricas de las que no es parte.

## 14. Checklist de implementación

- [ ] Endpoint de historial (extensión o nuevo, decidir).
- [ ] Pantalla de historial en ambos lados.
- [ ] Verificar los 3 criterios de aceptación.
