# Orden óptimo de implementación y dependencias técnicas

## Estado de implementación

- ✅ **`arquitectura/01` + F01/F03/F05 (frontend), 2026-07-31**: creada la tercera app Ionic/Angular `apps/train-fit-trainers` con environments y `clientFamily` propios. Incluye registro, activación, login y recuperación de contraseña para profesionales; loader de sesión sin exigir biométricos; shell de tabs; listado de clientes activos; creación/cancelación/listado de invitaciones por scope; y perfil con cierre de sesión. El frontend usa `/api/auth/me` para cargar al profesional y mantiene aislado el flujo de autenticación del consumidor. Verificado con `tsc --noEmit`, `ng build --configuration ci` y `npm run build:pre:t`. Pendiente de prueba manual con credenciales reales: flujo completo contra `pre`.
- ✅ **F09/F10 + F06 (lectura inicial), 2026-07-31**: añadidos endpoints protegidos para rutinas, antropometría, historial de entrenamientos, dieta por fecha y objetivos nutricionales. Todos reutilizan `requireActiveClient`; rutinas/historial exigen `training`, dieta/objetivos exigen `nutrition`, y antropometría acepta cualquier relación activa. La app profesional navega desde el listado al detalle, muestra únicamente las secciones permitidas por los scopes, identifica rutina/objetivo activos y permite recorrer la dieta por fecha. Verificado con `node --check`, TypeScript estricto y build Angular CI. Pendiente de prueba funcional con una relación y datos reales, y de incorporar las acciones F11/F12/F13 para completar F06.
- ✅ **Fase 1 (parcial) — `TrainerClient` + `requireActiveClient`, 2026-07-31**: componente completo (`train-fit-back/components/trainerClients/`: schema, dao, service, controller, routes, dto, middleware) cubriendo F03 (invitar, multi-scope), F04 (aceptar/rechazar), F08 (revocar) y F22 (historial). Montado en `/trainer`. Verificado con un test de integración real contra la BBDD `pre` (18 aserciones: D1 solapamiento, D6 validación de rol `user`, D10 exención sin gracia, índice único parcial, `clientId` ausente no `null`, `revokedBy` enum+null). No requirió `arquitectura/01`/`03` (scaffold/JWT audience) todavía — se probó reutilizando la infraestructura de auth ya existente con usuarios de prueba marcados a mano, ya que el componente es 100% backend y no depende de qué app hace la petición.
- ✅ **`arquitectura/03` + F01 (backend), 2026-07-31**: `POST /api/users/professional` (`users/controller.js`/`routes.js`) — registro sin biométricos, `roles: ["trainer"]` fijo, SIN reutilizar `userDao.createUser` (crea una Diet/DietDay por defecto, incorrecto para un profesional) — usa `userSchema.create` directo, igual que el registro social. Reutiliza `/api/auth/activate` tal cual (ya existente) para la activación + emisión de sesión — no hacía falta ningún endpoint nuevo de activación. **Corrección real de diseño**: `JWT_ALLOWED_AUDIENCES` es código muerto (verificado leyendo `token.service.js`/`validateAuth.js`/`auth-controller.js`) — la audiencia es auto-consistente por `x-client-family`, no un allowlist. No hace falta tocar ningún `.env`. Verificado con test E2E real (servidor Express real en puerto de test, contra `pre`): registro → activación → JWT con `aud` correcto → `auth(["trainer"])` real sobre `/trainer/invites` → mismo token rechazado con family distinta → mismo token rechazado por `auth(["user","admin"])`. 12/12 aserciones.
- ✅ **F14 — motor de exenciones (backend), 2026-07-31**: `feature-access-service.js` extendido (`canSeeAds`, `canAddMicrocycle` con parámetro `isExempt`, `buildEntitlements` con `hasActiveTrainerRelation`) + `table-service.js#countEffectiveUserTables` + `nutritional-goal-service.js#countEffectiveUserGoals`/`getGoalsForLockCheck`, todos condicionados a relación activa AHORA (sin gracia al revocar, D10). Añadidos `Table.assignedByTrainerId` y `NutritionalGoal.assignedByTrainerId` al schema real (no existían todavía). **Hallazgo no anticipado en el diseño original**: `nutritional-goal-controller.js` tiene un mecanismo de "bloqueo" (`isGoalLockedForPlan`) que oculta objetivos por encima del límite FREE en vez de solo bloquear su creación — no tiene equivalente para rutinas. Se adaptó para que un objetivo asignado nunca se bloquee mientras la relación siga activa. Verificado con test de integración real contra `pre`: 17/17 aserciones (conteo con/sin relación, bloqueo de objetivos, microciclos, anuncios, reversión inmediata al revocar, `assignedByTrainerId` permanece tras revocar).
- ⏳ Pendiente: F04/F07 en la app de cliente, prueba funcional de F09/F10 con datos reales, los endpoints reales de F11/F12/F13 (crear/asignar desde el lado profesional — el motor de exención ya existe, falta el endpoint que lo dispara), y el resto de Fase 4 en adelante.

## Regla general

Este proyecto tiene una propiedad poco común: **el 90% del backend de dominio ya existe**. No se está construyendo "rutinas", "dietas" o "entrenamientos" desde cero — se está construyendo una **capa de relación + autorización** sobre algo que ya funciona. Por eso el orden de implementación no sigue el patrón típico "modelo → API → UI" repetido por feature; sigue un patrón de **capas horizontales**: primero la capa de relación (sin la cual nada más tiene sentido), luego la capa de autorización (sin la cual nada más es seguro), y solo entonces las features de lectura/escritura una a una.

## Fases, en orden estricto

### Fase 0 — Terreno (sin esto, nada más puede empezar)

1. `arquitectura/01-scaffold-nueva-app.md` — crear `apps/train-fit-trainers`, `package.json` raíz, environments, capacitor.config.
2. `arquitectura/03-autenticacion-y-roles.md` — `JWT_ALLOWED_AUDIENCES` con `trainfit-trainers`, rol `trainer` operativo en `auth()`.

**Por qué primero**: sin la app scaffoldeada no hay dónde escribir ninguna pantalla; sin el rol/audiencia operativos, ningún endpoint nuevo puede autenticar una petición del profesional. Ninguna de las dos depende de nada más en este proyecto.

### Fase 1 — Modelo de relación (la pieza que todo lo demás usa)

3. `modelos-de-datos/01-trainerclient.md` — schema + colección `trainerclients`.
4. `arquitectura/02-modulo-backend-trainerclients.md` — DAO/service/controller/routes del componente `trainerClients`, incluido el middleware `requireActiveClient`.

**Por qué en este orden y no antes**: depende de Fase 0 (necesita el rol `trainer` para proteger sus propias rutas). **Todo lo que viene después depende de esto** — es la pieza bisagra de todo el proyecto. El middleware `requireActiveClient` en particular es una dependencia dura de CUALQUIER endpoint bajo `/trainer/clients/:clientId/*`.

### Fase 2 — Ciclo de vida de la relación (sin esto no hay clientes que gestionar)

5. `funcionalidades/F01-registro-login-profesional.md`
6. `funcionalidades/F03-invitar-cliente.md`
7. `funcionalidades/F04-aceptar-rechazar-invitacion.md`
8. `funcionalidades/F05-listado-clientes.md`
9. `funcionalidades/F07-mis-profesionales-cliente.md`
10. `funcionalidades/F08-revocar-relacion.md`

**Por qué en este orden**: F01 depende solo de Fase 0. F03 depende de F01 (necesitas estar logueado como profesional para invitar) y de Fase 1 (el schema/DAO de `TrainerClient`). F04 depende de F03 (no hay nada que aceptar sin invitación previa). F05 depende de que existan relaciones `active` (F04). F07 es el espejo de F05 en el lado cliente, misma dependencia. F08 depende de que exista algo que revocar (F04).

**Punto de control**: al final de esta fase, un profesional puede invitar, un cliente puede aceptar, y ambos ven la relación — sin que el profesional pueda ver ni tocar ningún dato del cliente todavía. Es el momento correcto para probar de punta a punta el flujo de relación antes de construir nada de lectura/escritura de datos encima.

### Fase 3 — Lectura de datos del cliente (bajo riesgo, alto valor)

11. `funcionalidades/F09-lectura-entrenamiento-cliente.md`
12. `funcionalidades/F10-lectura-nutricion-cliente.md`

**Por qué después de la Fase 2 y no antes**: ambas dependen del middleware `requireActiveClient` (Fase 1) y de que existan relaciones activas de verdad para probar contra datos reales (Fase 2). Son de las piezas de menor riesgo técnico de todo el proyecto (wrapping de DAOs ya existentes) — conviene hacerlas antes que las de escritura para validar el patrón de autorización con operaciones que, si algo sale mal, solo exponen datos (grave, pero no corrompen nada), antes de pasar a operaciones que escriben.

### Fase 4 — Escritura acotada (el riesgo de seguridad se concentra aquí)

13. `funcionalidades/F11-asignar-rutina.md`
14. `funcionalidades/F12-pautar-comida.md`
15. `funcionalidades/F13-asignar-objetivos-macros.md`
16. `funcionalidades/F15-badge-asignado.md` (lado cliente, depende de F11 escribiendo `assignedByTrainerId`)

**Por qué al final de las funcionalidades P0 y no antes**: son las únicas piezas P0 donde el profesional ESCRIBE en datos del cliente — el riesgo de seguridad (`00-riesgos.md`, riesgo R1) es máximo aquí. Deben construirse cuando el patrón `requireActiveClient` ya está probado y estable (Fases 1-3), no experimentando con autorización y escritura a la vez.

### Fase 5 — Piezas transversales P0 restantes (pueden ir en paralelo entre sí)

17. `funcionalidades/F02-suscripcion-profesional.md`
18. `funcionalidades/F14-premium-automatico.md` (depende de F04 — se dispara cuando una relación pasa a `active`)
19. `funcionalidades/F06-detalle-cliente-navegacion.md` (compone F09+F10+F11+F12+F13 en una sola pantalla — depende de que todas existan)
20. `funcionalidades/F16-portal-web-pc.md` (depende de que TODA la UI móvil de las fases anteriores exista — es una pasada de responsive sobre pantallas ya construidas, no una feature aparte)

**Nota sobre F16**: se lista al final porque es, literalmente, un pase de diseño responsive sobre pantallas que ya existen — no tiene sentido empezarlo antes de que haya pantallas que hacer responsive. Ver `funcionalidades/F16-portal-web-pc.md` para el detalle de por qué esto es barato (reutiliza el build `ionic build` sin `cap sync`).

**Con esto termina el alcance P0 — MVP lanzable.**

### Fase 6 — P1, en cualquier orden salvo las dependencias marcadas

21. `funcionalidades/F19-notas-internas.md` — sin dependencias nuevas (usa el mismo patrón de autorización de Fase 1).
22. `funcionalidades/F17-checkin-catalogo-campos.md` y `F18-checkin-por-sesion.md` — sin dependencias nuevas más allá de Fase 1.
23. `funcionalidades/F20-adherencia-nutricional.md` — depende de F10 (lee los mismos datos, agregados distinto).
24. `funcionalidades/F21-limite-clientes-plan.md` — depende de F02 (extiende el mismo mecanismo de entitlements).
25. `funcionalidades/F22-historial-relaciones.md` — depende de que existan relaciones `revoked`/`declined` reales (Fase 2 en producción, no solo en desarrollo).
26. `funcionalidades/F23-busqueda-filtro-clientes.md` — depende de F05 (añade filtros sobre el listado ya existente).
27. `funcionalidades/F25-foto-perfil-profesional.md` — sin dependencia dura de nada de Fase 6 anterior (F24 se eliminó, ver `modelos-de-datos/01-trainerclient.md`).
28. `funcionalidades/F26-recordatorio-cobro.md` — sin dependencias nuevas.
29. `funcionalidades/F27-gate-datos-biometricos-diferido.md` — depende de F01 (solo aplica si el profesional se registró sin datos biométricos).
30. `funcionalidades/F28-menus-alternativos-nombrados.md` — depende de F12 (extiende el mecanismo de pautar comida).
31. `funcionalidades/F29-preferencias-nutricionales-cliente.md` — sin dependencia dura, pero da más valor si ya existe F12 (el nutricionista lo usa al pautar).
32. `funcionalidades/F30-actualizar-en-bloque.md` — depende de F11 y F12 (es una acción que repite esas operaciones N veces).

## Resumen visual de dependencias duras (no reordenables)

```
Fase 0 (scaffold + auth/roles)
  └─→ Fase 1 (TrainerClient schema + requireActiveClient)
        └─→ Fase 2 (F01, F03, F04, F05, F07, F08 — ciclo de vida de la relación)
              └─→ Fase 3 (F09, F10 — lectura)
                    └─→ Fase 4 (F11, F12, F13, F15 — escritura)
                          └─→ Fase 5 (F02, F14, F06, F16 — piezas transversales + composición)
                                └─→ Fase 6 (F17-F30 — P1, mayormente independientes entre sí)
```

## Qué NO se puede paralelizar aunque parezca tentador

- **F11/F12/F13 (escritura) antes que F09/F10 (lectura)**: técnicamente podrían construirse en paralelo (no hay dependencia de datos entre leer y escribir), pero se recomienda NO hacerlo — validar el patrón de autorización primero contra operaciones de solo lectura reduce el blast radius de cualquier fallo del middleware `requireActiveClient` mientras se está probando.
- **F16 (portal web) en paralelo con las pantallas móviles**: técnicamente el build web ya funciona desde el primer commit (es el mismo código), pero hacer el pase responsive ANTES de que las pantallas estén terminadas significa rehacer el trabajo de CSS cada vez que cambie el layout móvil. Espera a que cada pantalla esté funcionalmente terminada antes de darle su pasada de responsive.
- **Cualquier cosa de Fase 6 antes de que Fase 4 esté completa y probada**: todas las piezas P1 asumen que el ciclo completo profesional↔cliente (invitar → aceptar → ver datos → asignar) ya funciona de punta a punta. Construir notas internas o check-ins sobre un ciclo de relación todavía inestable es trabajo que probablemente haya que revisar.
