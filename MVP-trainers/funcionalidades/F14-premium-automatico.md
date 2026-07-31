# F14 — Beneficios automáticos al cliente con profesional activo

**Prioridad**: P0. **Fase**: 5.

## 1. Objetivo

Dar a un cliente FREE con profesional activo justo lo necesario para que el contenido que le asigna su entrenador funcione sin fallar por sus propios límites FREE — sin regalarle el paquete premium completo. Sustituye el diseño original de este archivo (conceder `grantAdminPremium` completo), descartado tras un análisis de economía del producto (2026-07-31, ver `00-decisiones-pendientes.md` D10): con el tier `UNLIMITED` de `F02` (clientes ilimitados por 59,90€/mes), regalar premium completo a cada cliente FREE de un entrenador con muchos clientes cannibaliza ingresos potenciales de TrainFit muy por encima de lo que aporta el propio plan del entrenador.

## 2. Alcance exacto para el MVP

Tres beneficios, cada uno independiente del concepto de "premium" — no se usa `billing-service.js`, no se toca `User.premium` en ningún punto:

1. **Sin anuncios**: `canSeeAds(user)` pasa a devolver `false` también cuando el usuario tiene al menos una relación `TrainerClient` activa (cualquier scope), no solo cuando es premium real. Coste real: prácticamente cero.
2. **Rutinas/objetivos nutricionales asignados por el profesional NO cuentan contra los límites FREE propios del cliente MIENTRAS el cliente tenga una relación activa del scope correspondiente** (`routines: 1` exento si hay relación `training` activa; `nutritionalGoals: 1` exento si hay relación `nutrition` activa). No es una exención permanente por objeto individual — es condicional al estado ACTUAL de la relación, reevaluada en cada comprobación (ver corrección de diseño más abajo).
3. **Microciclos ilimitados, pero SOLO dentro de una rutina asignada por el profesional, y SOLO mientras haya relación `training` activa**: `canAddMicrocycle` mira si la rutina tiene `assignedByTrainerId` presente Y si el cliente tiene actualmente relación `training` activa. Si ambas se cumplen, tope 21; si no (rutina propia, o ya no hay relación activa), tope 4.

**Corrección de diseño (2026-07-31, tras revisión)**: la primera versión de este archivo ataba la exención al campo `assignedByTrainerId` de forma PERMANENTE, sin mirar si la relación seguía activa — esto permitía acumular exenciones indefinidamente a través de relaciones ya terminadas o de varios entrenadores sucesivos, sin pagar nunca. Se corrige: la exención se reevalúa contra el estado ACTUAL de la relación (¿tiene el cliente, AHORA MISMO, alguna relación activa de ese scope?), no contra el hecho histórico de que algo fue asignado alguna vez. **Esto NO afecta a la titularidad**: `assignedByTrainerId` sigue siendo permanente como dato de trazabilidad/badge (`F15`, `00-decisiones-pendientes.md` D2) — solo cambia si ese dato SIGUE dando derecho a la exención de límite o no.

**Qué NO cambia**: `customExercises` y `recipes` — el cliente FREE sigue con su límite de 2 en ambos, siempre, tenga o no profesional. No están relacionados con recibir contenido asignado, así que no hay motivo funcional para desbloquearlos.

## 3. Qué NO se incluye en el MVP

- No se concede `User.premium` ni se llama a `grantAdminPremium`/`revokeAdminPremium` en ningún punto de este mecanismo — es deliberadamente independiente del sistema de billing.
- No hay ningún indicador de "premium" en la UI del cliente, porque técnicamente no lo tiene — si se quiere comunicar el beneficio, el copy correcto es "sin anuncios y sin límites en lo que te asigna tu entrenador", no "premium gratis".
- No se resuelve aquí si `customExercises`/`recipes` deberían tener algún tratamiento especial en el futuro — se descarta explícitamente para este MVP (ver punto 2, "qué NO cambia").

## 4. Flujos de usuario paso a paso

No hay un flujo de usuario propio — son reglas de negocio evaluadas en el momento de cada acción relevante (ver comportamiento la primera vez, ver anuncios, crear un microciclo), no un evento único disparado al aceptar la invitación como en el diseño anterior.

## 5-6. Pantallas y componentes UI

Ninguna nueva. El único efecto visible es la ausencia de anuncios y la ausencia de bloqueos al recibir contenido asignado — ningún componente nuevo que mostrar.

## 7. Lógica de negocio

Cambios en `feature-access-service.js` (`train-fit-back/components/billing/feature-access-service.js`):

```js
// Antes: canSeeAds(user) { return !isPremiumUser(user); }
function canSeeAds(user, hasActiveTrainerRelation) {
  return !isPremiumUser(user) && !hasActiveTrainerRelation;
}

// Antes: canCreateRoutine(user, routineCount) contaba TODAS las rutinas del usuario.
// Ahora: el caller (table-service.js) cuenta las rutinas del cliente EXCLUYENDO las
// assignedByTrainerId SOLO SI el cliente tiene actualmente relación "training" activa
// (si no la tiene, cuenta TODAS, incluidas las asignadas en el pasado — la exención
// dejó de aplicar al terminar la relación).
function canCreateRoutine(user, effectiveRoutineCount) {
  const limits = getLimits(user);
  return effectiveRoutineCount < limits.routines;
}
// effectiveRoutineCount se calcula en table-service.js:
//   const hasActiveTraining = await trainerClientDao.hasActiveRelation(clientId, "training");
//   const effectiveRoutineCount = hasActiveTraining
//     ? countRoutinesWhere({ userId: clientId, assignedByTrainerId: { $exists: false } })
//     : countRoutinesWhere({ userId: clientId }); // TODAS, exención ya no aplica
// Misma idea para canCreateNutritionalGoal(user, effectiveNutritionalGoalCount) con relación "nutrition".

// canAddMicrocycle: depende de la rutina Y de si sigue habiendo relación training activa.
async function canAddMicrocycle(routine, microcycleCount, clientId) {
  const isExempt = routine.assignedByTrainerId && await trainerClientDao.hasActiveRelation(clientId, "training");
  const limit = isExempt ? PREMIUM_LIMITS.microcyclesPerRoutine : FREE_LIMITS.microcyclesPerRoutine;
  return microcycleCount < limit;
}
```

**Dónde se filtra el conteo**: en el DAO/service que cuenta rutinas antes de crear una nueva (`table-service.js` o equivalente), la query excluye `assignedByTrainerId: { $exists: true }` del conteo SOLO SI existe relación `training` activa en ese momento (una llamada a `trainerClientDao.hasActiveRelation`, misma consulta indexada que ya usa `requireActiveClient`) — si no hay relación activa, cuenta TODAS las rutinas del cliente sin excepción, incluidas las que en su día fueron asignadas. Igual para `nutritionalGoals` con relación `nutrition`. La creación de una rutina asignada por el profesional (`funcionalidades/F11-asignar-rutina.md`) sigue sin pasar NUNCA por este check (el profesional no está sujeto al límite del cliente al asignar) — esto es independiente de la reevaluación descrita aquí, que solo afecta a cuándo el CLIENTE puede crear algo nuevo por su cuenta.

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (para saber si hay relación activa, en el caso de `canSeeAds`).
- Depende de (modifica): `feature-access-service.js` — a diferencia del diseño anterior, este SÍ toca ese archivo.
- Relacionado con: `funcionalidades/F11-asignar-rutina.md` (exime del conteo de rutinas propias + habilita microciclos ilimitados en la rutina asignada), `funcionalidades/F13-asignar-objetivos-macros.md` (exime del conteo de objetivos propios).
- NO depende de: `billing-service.js`, `F02-suscripcion-profesional.md` — mecanismos completamente independientes ahora, sin ningún punto de contacto (a diferencia del diseño anterior, que sí compartía `User.premium`).

## 9. Validaciones

- `canSeeAds` debe consultar la existencia de relación activa de forma barata (misma query ya indexada de `requireActiveClient`, no una consulta nueva y cara en cada carga de pantalla — considerar cachear en el token de sesión o en una llamada de perfil, no en cada render).
- El conteo de "rutinas propias" (excluyendo asignadas) debe ser consistente en TODOS los puntos donde se valida el límite `routines` — si un punto cuenta todas y otro cuenta solo propias, el límite se aplica de forma inconsistente según por dónde entre la petición.

## 10. Casos límite y posibles errores

- **El cliente tiene 1 rutina propia (su límite FREE) Y 3 rutinas asignadas por su entrenador, relación activa**: puede seguir usando las 4 con normalidad; solo se bloquea si intenta crear una QUINTA rutina POR SU CUENTA (la quinta propia, no cuenta las asignadas mientras la relación siga activa). Este es el caso central que motivó el rediseño de D10 — verificar con una prueba real, no solo revisión de código.
- **El cliente revoca la relación (o el entrenador la revoca) y ya NO tiene ninguna relación `training` activa**: las rutinas asignadas se quedan con él tal cual (`00-decisiones-pendientes.md` D2 sigue intacto — no se borra ni se archiva nada), PERO **dejan de estar exentas del límite `routines` de inmediato** (confirmado 2026-07-31, sin periodo de gracia) — a partir de ahora cuentan como si fueran propias. Si eso pone al cliente por encima de su límite FREE (p. ej. 4 rutinas con límite 1), no pasa nada retroactivo: simplemente no podrá crear NINGUNA rutina nueva por su cuenta hasta volver a estar por debajo del límite (borrando alguna, consiguiendo un entrenador activo de nuevo, o pagando premium real). Este es precisamente el caso que motivó la corrección — sin este ajuste, un cliente podría acumular exenciones permanentes a través de relaciones ya terminadas.
- **Mismo caso, pero con microciclos**: los microciclos ya añadidos a una rutina asignada (p. ej. 15, por encima del tope FREE de 4) NO se eliminan al terminar la relación — pero en cuanto no hay relación `training` activa, `canAddMicrocycle` para ESA rutina vuelve a aplicar el tope de 4 para cualquier microciclo NUEVO que se intente añadir. Los 15 ya existentes se conservan intactos.
- **El cliente tiene DOS relaciones `training` simultáneas terminando en momentos distintos** (poco probable dado D1, pero por completitud): la exención depende de "¿existe AL MENOS UNA relación `training` activa ahora mismo?", no de cuál entrenador asignó cada rutina en concreto — mientras quede una activa, cualquiera de sus rutinas asignadas históricamente (de este entrenador o de uno anterior) sigue exenta.
- **Anuncios**: si el cliente tiene una relación `pending` (invitada pero no aceptada), NO cuenta como "relación activa" para quitar anuncios — solo `status: "active"` habilita el beneficio, coherente con que `requireActiveClient` tampoco cuenta `pending`. Mismo criterio de "solo `active` cuenta" se aplica a la exención de rutinas/objetivos.

## 11. Estructura de datos necesaria

Ninguna nueva — no se toca `User.premium` ni ningún schema. Es lógica de negocio pura sobre datos ya existentes (`Table.assignedByTrainerId`, `TrainerClient.status`).

## 12. Endpoints/API necesarios

Ninguno propio — modifica el comportamiento de `feature-access-service.js`, consumido por los endpoints ya existentes de creación de rutinas/objetivos/microciclos y por el endpoint que informa a la app de si mostrar anuncios (`buildEntitlements` o equivalente).

## 13. Criterios de aceptación verificables

- [ ] Un cliente FREE con relación activa no ve anuncios.
- [ ] Un cliente FREE con relación activa puede recibir una segunda rutina de su entrenador aunque ya tenga su 1 rutina propia usada — la nueva no cuenta contra su límite propio.
- [ ] Ese mismo cliente sigue sin poder crear una segunda rutina POR SU CUENTA (su límite propio de 1 sigue aplicando, sin excepción).
- [ ] Un microciclo añadido a una rutina asignada por el entrenador permite hasta 21, mientras que en una rutina propia del mismo cliente el tope sigue siendo 4.
- [ ] `customExercises`/`recipes` del cliente FREE con entrenador siguen limitados a 2, sin excepción.
- [ ] Revocar la relación NO borra ni archiva las rutinas/objetivos ya asignados (D2 intacto), pero SÍ hace que empiecen a contar de inmediato contra el límite propio del cliente — sin relación `training` activa, el cliente no puede crear una rutina nueva por su cuenta si eso le pone por encima de su límite FREE.
- [ ] Tras revocar, una rutina asignada que ya tenía más de 4 microciclos conserva los que tiene, pero no admite añadir uno nuevo por encima del tope FREE.
- [ ] Un cliente con 2 relaciones `training` (de 2 entrenadores distintos, una activa y otra ya revocada) conserva la exención completa mientras la activa siga viva, sin importar cuál entrenador asignó cada rutina.

## 14. Checklist de implementación

- [ ] Modificar `canSeeAds`, `canCreateRoutine`, `canCreateNutritionalGoal`, añadir `canAddMicrocycle` por rutina en `feature-access-service.js`, todos dependientes de relación activa ACTUAL, no de un campo fijo.
- [ ] Implementar `trainerClientDao.hasActiveRelation(clientId, scope)` (o reutilizar la query ya indexada de `requireActiveClient` desde el lado cliente) para las comprobaciones de conteo.
- [ ] Filtrar `assignedByTrainerId` en los conteos de rutinas/objetivos propios SOLO cuando exista relación activa del scope correspondiente — condicional, no incondicional.
- [ ] Confirmar que `funcionalidades/F11-asignar-rutina.md`/`F13-asignar-objetivos-macros.md` no llaman a los checks de límite propio cuando quien crea es el profesional (esto no cambia).
- [ ] Prueba explícita del caso "revocar relación → deja de estar exento de inmediato" antes de dar por cerrado.
- [ ] Verificar los 8 criterios de aceptación.
