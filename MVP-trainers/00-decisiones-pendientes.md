# Decisiones ambiguas — estado de resolución

Cada punto de esta lista bloquea al menos una funcionalidad concreta (referenciada). Las decisiones D1-D7 ya han sido **confirmadas** por el usuario (2026-07-31) y propagadas a los archivos de funcionalidad correspondientes — este archivo queda como registro de la decisión y su razonamiento, no como lista de bloqueos abiertos.

## D1 — ¿Un cliente puede tener relaciones con más de un profesional del mismo `scope` a la vez? — CONFIRMADA

**Decisión**: NO. Como mucho una relación activa por `scope` (`training` o `nutrition` — no existe `"both"` como valor, ver corrección de modelo del 2026-07-31 en `modelos-de-datos/01-trainerclient.md`). Un cliente puede tener 2 profesionales distintos simultáneamente si cada uno cubre un `scope` distinto (uno `training`, otro `nutrition`) — o un único profesional cubriendo ambos, como 2 documentos separados. Nunca dos profesionales con el mismo `scope` activo a la vez.

**Ya implementado tal cual** en `modelos-de-datos/01-trainerclient.md` (índice único parcial) y la validación de solapamiento de `F03`/`F04`. Sin cambios necesarios.

## D2 — ¿Qué pasa si el profesional revoca la relación pero el cliente tiene una rutina/dieta asignada activa? — CONFIRMADA

**Decisión**: se queda con el cliente como una `Table`/`Diet` propia suya — copia normal, sin vínculo activo con el profesional que la creó. `assignedByTrainerId` se conserva solo como dato histórico.

**Ya implementado tal cual** en `F08-revocar-relacion.md` y `modelos-de-datos/05-cambios-modelos-existentes.md`. Sin cambios necesarios.

## D3 — Tiers y precio de la suscripción del profesional — CONFIRMADA (informada por análisis de Traineeks)

**Pricing real de Traineeks** (verificado en `traineeks.com/pricing`, 2026-07-31): STARTER 0€ (2 clientes gratis, 4,90€/cliente extra) · BASIC 39,9€/mes (10 clientes, 3,90€/extra) · ADVANCE 69,9€/mes (20 clientes, 3,50€/extra) · TOP 129€/mes (ilimitado). Las 4 tarifas desbloquean las mismas funcionalidades — el único eje de precio es el nº de clientes. Cobran además 15% de comisión en ventas de su store/marketplace (no aplica a TrainFit, no se construye marketplace).

**Propuesta para destacar** (más simple, más barato en cada tramo — apoyado en que TrainFit no sostiene infraestructura de tienda/contenido que sí paga Traineeks):
- **FREE**: 3 clientes gratis para siempre (Traineeks da 2).
- **PRO**: 19,90€/mes, hasta 15 clientes incluidos, 2,90€/cliente extra por encima de 15.
- **UNLIMITED**: 59,90€/mes, clientes ilimitados (frente a los 129€ de TOP — entrada a "ilimitado" mucho más agresiva).

3 tarifas en vez de 4, todas más baratas que su equivalente directo, sin comisión de ventas (no aplica). Precio final sujeto a validación de negocio antes de lanzar, pero ya no es un hueco vacío — es una propuesta concreta.

**Actualiza**: `funcionalidades/F02-suscripcion-profesional.md` (`entitlementId`s: `trainer_free`/`trainer_pro`/`trainer_unlimited`), `funcionalidades/F21-limite-clientes-plan.md` (`N = 3` free, `15` en Pro).

## D4 — Check-ins: ¿configuración por cliente o plantillas nombradas reutilizables? — CONFIRMADA (cambia el diseño anterior)

**Decisión**: plantillas configurables y nombradas, reutilizables — el profesional crea una plantilla (p. ej. "Básico", "Pro"), la nombra, y la **aplica** a varios clientes.

**Cambio de arquitectura respecto a la versión anterior de este documento** (que asumía config 1:1 por cliente, sin nombre): sigue el principio de copia profunda del proyecto — "aplicar una plantilla a un cliente" COPIA el conjunto de `enabledFields`/cadencia de la plantilla al `TrainerCheckinTemplate` de ESE cliente en ese momento; no es una referencia viva. Si el profesional edita la plantilla maestra después, los clientes ya asignados NO cambian automáticamente (mismo motivo que el rechazo del modelo de Traineeks de plantillas por referencia, ver `00-riesgos.md` R4) — para propagar el cambio, se re-aplica la plantilla (mismo patrón que `F30-actualizar-en-bloque.md`).

**Actualiza**: `modelos-de-datos/03-trainercheckintemplate.md` (nueva colección `CheckinTemplateDefinition { trainerId, name, enabledFields, cadence }` separada de la config por cliente, que pasa a rellenarse por copia al aplicar) y `funcionalidades/F17-checkin-catalogo-campos.md` (flujo: crear/nombrar plantilla → aplicar a uno o varios clientes).

## D5 — ¿El cuestionario de preferencias nutricionales se envía automático o manual? — CONFIRMADA

**Decisión**: manual — el profesional lo solicita explícitamente al cliente (acción "Solicitar cuestionario"), no se dispara solo al aceptar la invitación ni queda como una pantalla que el cliente descubre por su cuenta sin más.

**Cambio respecto a la versión anterior** (que asumía "no bloqueante, el cliente lo rellena cuando quiera sin ningún disparador"): ahora hay un disparador explícito del profesional.

**Actualiza**: `funcionalidades/F29-preferencias-nutricionales-cliente.md` (nuevo paso: el profesional solicita el cuestionario desde el detalle de cliente; el cliente ve un aviso/badge de "cuestionario solicitado" hasta rellenarlo).

## D6 — ¿Se puede invitar a un profesional puro (sin rol `user`) como cliente? — CONFIRMADA (más estricta que la versión anterior)

**Decisión**: NO. Un profesional solo puede invitar emails que correspondan a cuentas con `roles` conteniendo `"user"` (cuentas de consumidor reales, existentes o por registrar). Si el email pertenece a un `User` YA EXISTENTE cuyo `roles` es `["trainer"]` puro (sin `"user"`), la invitación se rechaza — esa cuenta no puede recibir datos de entrenamiento/nutrición porque no es una cuenta de consumidor. Un mismo `User` SÍ puede tener `roles: ["trainer", "user"]` combinados (la misma persona es profesional y cliente a la vez) — a esa cuenta sí se le puede invitar.

**Actualiza**: `funcionalidades/F03-invitar-cliente.md` (validación nueva: si `clientEmail` resuelve a un `User` existente, comprobar que `roles` incluye `"user"`; si no, rechazar con mensaje claro) y `funcionalidades/F27-gate-datos-biometricos-diferido.md` (contexto: el camino para que un profesional se convierta también en cliente es añadirse el rol `"user"` él mismo, p. ej. desde `configuration.page` de TrainFit, no que otro profesional lo invite estando `roles: ["trainer"]` puro).

## D7 — Idioma(s) del contenido fijo — CONFIRMADA

**Decisión**: sí, mismo estándar que el resto de la app — todo el copy nuevo (catálogo de check-in, cuestionario de preferencias, nombres de plantillas) lleva su clave `es.json`/`en.json` desde el primer commit.

**Ya reflejado tal cual** en `funcionalidades/F17-checkin-catalogo-campos.md` y `funcionalidades/F29-preferencias-nutricionales-cliente.md`. Sin cambios necesarios.

## D8 — Check-in de composición corporal/perímetros: ¿colección nueva o reutilizar `Anthropometry`? — CONFIRMADA (2026-07-31)

**Contexto**: `Anthropometry` (`train-fit-back/components/anthropometry/anthropometry-schema.js`) ya existe en producción — `{ userId, date, weight, neck, chest, bicepsRelaxed, bicepsContracted, waist, abdomen, hip, thighContracted, thighRelaxed, calf }`, único por `(userId, date)`. El diseño original de `F17`/`modelos-de-datos/04` proponía una colección `CheckinResponse` separada para TODO el catálogo (29 campos), duplicando datos que el cliente ya ve en sus propias gráficas de progreso.

**Decisión**: fusionar con `Anthropometry` — SOLO los grupos "composición corporal" y "perímetros" del catálogo (23 campos). El grupo "bienestar" (11 campos, escalas subjetivas 1-5) NO se fusiona — dominio distinto, sigue en una colección propia y más pequeña.

**Coste real, no es gratis**: `Anthropometry` no tiene hoy 12 de los 23 campos (`muscleMass`, `fatMass`, `boneMass`, `residualMass`, `shoulders`, `quadL`/`quadR`, `ankleL`/`ankleR` son nuevos; `bicepsRelaxed`/`bicepsContracted`/`calf` deben partirse en L/R). Es una migración de una colección YA en producción con datos reales de usuarios, no una colección nueva vacía — más riesgo que el diseño original, aceptado conscientemente por el valor de unificar datos (el entrenador y el cliente ven lo mismo, sin duplicar). Detalle completo en `modelos-de-datos/05-cambios-modelos-existentes.md`.

**Actualiza**: `modelos-de-datos/04-catalogo-campos-checkin.md`, `modelos-de-datos/05-cambios-modelos-existentes.md`, `funcionalidades/F17-checkin-catalogo-campos.md`, `00-riesgos.md` (nuevo riesgo de migración).

## D9 — Persistir configuración de notificaciones en BBDD — DESCARTADA (2026-07-31)

**Contexto**: se propuso persistir la config de recordatorios del check-in en BBDD, asumiendo que evitaría trabajo.

**Decisión**: no aporta nada nuevo — la cadencia (`TrainerCheckinTemplate.cadence`) ya vive en servidor en el diseño actual; la notificación local ya puede programarse con ese dato sin colección nueva. No resuelve la limitación de fondo (`00-riesgos.md` R5, sin push remoto). Se descarta también la idea derivada de un log de recordatorios enviados/respondidos — se reconsiderará si hay demanda real de entrenadores usando el MVP, no antes.

## D10 — Premium automático al cliente: rediseño completo por revenue leak (2026-07-31)

**Contexto**: el diseño original de `F14` concedía el paquete premium COMPLETO (`grantAdminPremium`, vía `billing-service.js`) a cualquier cliente FREE con un profesional activo. Combinado con el tier `UNLIMITED` de `F02` (59,90€/mes, clientes ilimitados), esto cannibaliza ingresos potenciales de forma significativa: un entrenador con muchos clientes regala premium completo a todos ellos por una única cuota plana — el propio análisis de mercado (competidores como Trainerize/TrueCoach cobran por asiento de cliente, no en plano, precisamente para evitar esto) confirma que es un patrón de riesgo conocido en el sector.

**Decisión**: NO se concede premium completo. Se sustituye por 3 beneficios quirúrgicos, sin tocar `billing-service.js` ni `User.premium`:
1. Sin anuncios (para el cliente con relación activa, cualquier scope).
2. Rutinas y objetivos nutricionales asignados por el profesional (`assignedByTrainerId` presente) NO cuentan contra los límites FREE propios del cliente (`routines: 1`, `nutritionalGoals: 1`) — el cliente conserva su cupo FREE íntegro para lo suyo, y además recibe cualquier número de asignaciones del profesional.
3. Microciclos ilimitados (tope 21, no 4) SOLO dentro de una rutina con `assignedByTrainerId` — no en las rutinas propias del cliente.

`customExercises`/`recipes` NUNCA se desbloquean por tener profesional — no están relacionados con recibir contenido asignado.

**Coste de implementación real**: requiere un campo nuevo, `NutritionalGoal.assignedByTrainerId` (no existía, añadido en `modelos-de-datos/05-cambios-modelos-existentes.md` sección 2.3, mismo patrón que `Table.assignedByTrainerId`), y modificar `canSeeAds`/`canCreateRoutine`/`canCreateNutritionalGoal`/`canAddMicrocycle` en `feature-access-service.js` para que estas dos últimas excluyan del conteo lo asignado por un profesional, y la última dependa de la rutina en vez del usuario.

**Actualiza**: `funcionalidades/F14-premium-automatico.md` (reescrito entero), `funcionalidades/F11-asignar-rutina.md`, `funcionalidades/F13-asignar-objetivos-macros.md` (resuelve su ambigüedad abierta de la sección 9), `modelos-de-datos/05-cambios-modelos-existentes.md`.

**Refinamiento posterior (mismo día)**: la primera versión de esta decisión ataba la exención de límite al campo `assignedByTrainerId` de forma PERMANENTE — esto permitía acumular exenciones indefinidamente a través de relaciones ya terminadas (el usuario que originó esta pregunta lo detectó). Corregido: la exención se reevalúa contra si el cliente tiene, AHORA MISMO, una relación activa del scope correspondiente — sin periodo de gracia, revierte de inmediato al terminar la relación. Lo ya asignado NO se borra ni se archiva (D2 intacto); simplemente deja de estar exento de los límites FREE, pudiendo bloquear la creación de cosas NUEVAS por el cliente si eso lo pone por encima de su límite. Actualiza además `funcionalidades/F08-revocar-relacion.md`.

---

## Cómo usar esta lista

Las 10 decisiones están confirmadas. D3, D4, D5, D6, D8 y D10 requieren propagar cambios a los archivos de funcionalidad/modelo listados en su "Actualiza" — pendiente de aplicar esa propagación antes de considerar esos archivos como fuente de verdad actualizada.
