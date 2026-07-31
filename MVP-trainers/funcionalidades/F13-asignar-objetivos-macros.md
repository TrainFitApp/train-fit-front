# F13 — Asignar objetivos de macros al cliente

**Prioridad**: P0. **Fase**: 4.

## 1. Objetivo

Permitir que un nutricionista configure los objetivos nutricionales (`nutritionalGoals`) de un cliente — la parte "más simple" del alcance de nutrición del MVP, comparado con `F12` (pautar comidas concretas).

## 2. Alcance exacto para el MVP

- El nutricionista introduce (o calcula, si se decide incluir alguna calculadora simple) calorías objetivo y distribución de macros (proteína/carbohidratos/grasa) para el cliente.
- Se guarda como un `NutritionalGoal` nuevo del cliente (`userId: clientId`), reutilizando el modelo/DAO ya existente.

## 3. Qué NO se incluye en el MVP

- No se incluye la calculadora avanzada multi-ecuación (Harris-Benedict, Mifflin-St Jeor, etc., identificada en `PLAN_TRAINFIT_ENTRENADORES.md` §10.7) — eso es P1/P2, un diferenciador a futuro, no bloqueante. En el MVP, el nutricionista introduce los números finales directamente (puede haberlos calculado fuera, en su propia hoja de cálculo o herramienta, igual que hace hoy sin esta app).
- No se ajustan los objetivos automáticamente por % graso vía perímetros — eso depende de `funcionalidades/F17-checkin-catalogo-campos.md` (P1) existiendo primero, y de la calculadora avanzada (P1/P2) que no está en el MVP.

## 4. Flujos de usuario paso a paso

1. Desde el detalle de cliente (`F06`), sección Nutrición, el nutricionista pulsa "Editar objetivos".
2. Ve el formulario ya existente de configuración de objetivos nutricionales (reutiliza `nutritional-objectives.component` del cliente, en modo "para un tercero").
3. Introduce/ajusta calorías y macros.
4. Guarda.
5. El cliente ve sus objetivos actualizados la próxima vez que entre a su pantalla de nutrición.

## 5. Pantallas necesarias

- Sección/formulario "Objetivos nutricionales" dentro de `F06` — reutiliza el componente ya existente `nutritional-objectives.component`.

## 6. Componentes UI requeridos

Ninguno nuevo — reutiliza `nutritional-objectives.component` tal cual, parametrizado por `clientId` en vez de por el usuario autenticado.

## 7. Lógica de negocio

Backend, `POST /trainer/clients/:clientId/nutritional-goals`:
1. `requireActiveClient("nutrition")`.
2. Llama al DAO/servicio ya existente de creación/actualización de `nutritionalGoals`, con `userId: clientId` en vez del actor autenticado.
3. Setea `assignedByTrainerId: trainerId` en el documento resultante (campo nuevo, ver `modelos-de-datos/05-cambios-modelos-existentes.md`, sección 2.3).
4. **No debe pasar por `canCreateNutritionalGoal`/el conteo de objetivos propios del cliente** (confirmado en `00-decisiones-pendientes.md` D10, ver `funcionalidades/F14-premium-automatico.md`) — resuelve la ambigüedad que quedaba abierta en la sección 9 de este mismo archivo: el objetivo asignado por el nutricionista NUNCA cuenta contra el límite FREE de 1 objetivo propio del cliente, igual que las rutinas asignadas (`F11`).
5. Si el cliente ya tiene un objetivo activo (`goalInUse`), decidir si esta operación lo reemplaza directamente o crea uno nuevo y lo activa — **replicar exactamente el mismo comportamiento que ya tiene el flujo del propio cliente al editar sus objetivos**, no inventar una variante distinta para el profesional.

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md`.
- Depende de (sin modificar): el DAO/servicio de `nutritionalGoals` ya existente.
- Relacionado con: `F10-lectura-nutricion-cliente.md` (el nutricionista ve los objetivos actuales antes de cambiarlos).

## 9. Validaciones

- `requireActiveClient("nutrition")`.
- Las mismas validaciones de rango/coherencia que ya aplica el flujo del cliente. El límite `FREE_LIMITS.nutritionalGoals`/`PREMIUM_LIMITS.nutritionalGoals` de `feature-access-service.js` NO se comprueba para objetivos asignados por el profesional (resuelto en `00-decisiones-pendientes.md` D10) — solo aplica cuando el cliente crea/edita un objetivo por su cuenta.
- **Hallazgo real al implementar (2026-07-31), no anticipado en el diseño original**: `nutritional-goal-controller.js` no solo bloquea CREAR más allá del límite — tiene un mecanismo de "bloqueo" (`isGoalLockedForPlan`) que hace INACCESIBLES (`get`/`update`/`activate`, no solo `create`) los objetivos por encima del límite FREE del cliente, dejando solo uno "desbloqueado". Ya adaptado (`nutritional-goal-service.js#getGoalsForLockCheck`) para que un objetivo asignado por el profesional NUNCA se bloquee mientras la relación `nutrition` siga activa, y para que no cuente contra el cálculo de qué está bloqueado. Sin este ajuste, un objetivo recién asignado podría quedar bloqueado para el propio cliente que lo necesita.

## 10. Casos límite y posibles errores

- **El cliente es FREE y ya alcanzó su límite de objetivos nutricionales propios** (`FREE_LIMITS.nutritionalGoals`): NO bloquea esta operación — el objetivo asignado por el profesional está exento (ver punto 9). El cliente sigue sin poder crear un SEGUNDO objetivo por su cuenta más allá de su límite propio, pero eso es un caso distinto, no afectado por este endpoint.
- **El profesional con scope `training` (sin `nutrition`) intenta acceder**: 403.

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

- `POST /trainer/clients/:clientId/nutritional-goals` — requiere relación `nutrition`.

## 13. Criterios de aceptación verificables

- [ ] Asignar objetivos de macros a un cliente actualiza correctamente su `NutritionalGoal` activo, con `assignedByTrainerId` correcto.
- [ ] El cliente ve los objetivos actualizados en su propia app.
- [ ] Un profesional con scope `training` (sin `nutrition`) no puede acceder.
- [ ] Un cliente FREE en su límite de objetivos nutricionales PROPIOS recibe igualmente el objetivo asignado por su profesional, sin ningún error de límite.

## 14. Checklist de implementación

- [ ] Endpoint reutilizando el DAO/servicio existente de `nutritionalGoals`.
- [ ] Setear `assignedByTrainerId` y confirmar que se omite el check de límite FREE para este flujo.
- [ ] UI reutilizando `nutritional-objectives.component`.
- [ ] Verificar los 4 criterios de aceptación.
