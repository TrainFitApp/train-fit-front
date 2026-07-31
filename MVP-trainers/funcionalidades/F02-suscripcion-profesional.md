# F02 — Suscripción del profesional a TrainFit (RevenueCat)

**Prioridad**: P0. **Fase**: 5.

## 1. Objetivo

Cobrar al profesional por usar `TrainFit: Entrenadores` — es la fuente de ingresos de este producto ("el entrenador es el que nos paga a nosotros", decisión confirmada del usuario). Reutiliza al 100% la integración de RevenueCat ya existente para las suscripciones de TrainFit consumidor.

## 2. Alcance exacto para el MVP

- 3 `entitlementId` nuevos en RevenueCat: `trainer_pro` y `trainer_unlimited` (el free no requiere entitlement, es la ausencia de ambos), distintos de `no_adds_and_features` (el de consumidor) — ver `00-decisiones-pendientes.md` D3 para el pricing completo, confirmado tras analizar Traineeks:
  - **FREE**: 3 clientes gratis para siempre.
  - **PRO** (`trainer_pro`): 19,90€/mes, hasta 15 clientes, 2,90€/cliente extra por encima.
  - **UNLIMITED** (`trainer_unlimited`): 59,90€/mes, clientes ilimitados.
- Límites por plan expresados como número máximo de clientes activos, reutilizando exactamente la forma de `FREE_LIMITS`/`PREMIUM_LIMITS` de `feature-access-service.js`.
- Pantalla de paywall/suscripción en `train-fit-trainers`, calcada de `premium.page.ts` de TrainFit consumidor, con 3 tarjetas de plan (no 2).
- El gate de "¿puedo invitar a un cliente más?" se aplica en `funcionalidades/F03-invitar-cliente.md` y `funcionalidades/F21-limite-clientes-plan.md` (P1) — este archivo cubre solo la suscripción en sí, no el enforcement contra el límite.

## 3. Qué NO se incluye en el MVP

- No se construye ningún sistema de pagos nuevo — cero infraestructura nueva, es la misma tubería de RevenueCat que ya cobra las suscripciones de TrainFit hoy.
- No se construye el marketplace de pagos cliente→profesional (eso es `fuera-de-alcance/p2-futuro.md`, explícitamente descartado).

## 4. Flujos de usuario paso a paso

1. El profesional completa el registro (`F01`) y llega al dashboard con el plan FREE por defecto (3 clientes).
2. Si intenta superar el límite de clientes del plan actual (al invitar un cliente más de los permitidos, `F03`), se le muestra el paywall.
3. El paywall (calcado de `premium.page.ts`) muestra las 3 tarjetas (FREE ya activo/PRO/UNLIMITED) con precio y límite de clientes de cada una.
4. El profesional selecciona PRO o UNLIMITED, se procesa la compra a través del SDK de RevenueCat (igual que en TrainFit consumidor).
5. Al confirmarse la compra (webhook de RevenueCat → `POST /billing/webhooks/revenuecat`, ya existente), se actualiza `User.premium` (reutilizando `billing-service.js` tal cual, sin ningún cambio de código en ese archivo) con el `entitlementId` correcto (`trainer_pro` o `trainer_unlimited`).
6. El profesional puede seguir invitando clientes hasta el nuevo límite (15 en PRO, sin límite en UNLIMITED).

## 5. Pantallas necesarias

- Paywall/pantalla de suscripción del profesional (calcada de `premium.page.ts`, con el `entitlementId`/productos correspondientes a esta app).
- Indicador de "X de Y clientes usados" visible en algún punto del dashboard (probablemente en `F05-listado-clientes.md` o en el perfil del profesional) — no es una pantalla nueva, es un elemento de UI dentro de una pantalla ya prevista.

## 6. Componentes UI requeridos

- Reutiliza los componentes de `premium.page` existentes — tarjetas de plan, botón de compra, indicador de carga durante la compra.

## 7. Lógica de negocio

- `feature-access-service.js` se EXTIENDE (no se reescribe) con una función equivalente a `getLimits(user)` pero para el contexto profesional — p. ej. `getTrainerLimits(user)` devolviendo `{ clients: N }` según `isPremiumUser(user)` (misma función ya existente, reutilizada sin cambios — la comprobación de "¿es premium?" es genérica, no depende de qué entitlement específico se comprueba salvo que el `ENTITLEMENT_ID` usado en `billing-service.js` sea configurable por contexto, ver el siguiente punto).
- **Punto técnico importante a resolver en implementación**: `billing-service.js` hoy tiene un único `ENTITLEMENT_ID` global (`process.env.REVENUECAT_ENTITLEMENT_ID || "no_adds_and_features"`). Si el profesional necesita un entitlement DISTINTO (`trainer_pro`), hay que decidir cómo convive con el entitlement de consumidor en el mismo `User.premium` — un mismo usuario podría en teoría tener ambos si además es cliente de TrainFit (ver `F27`). Esto requiere que `parseRCSubscriberPayload`/`updateUserPremium` sepan distinguir de qué app/entitlement viene la actualización, no solo aplicar el primero que encuentren. **Este es un punto de diseño técnico no resuelto por este documento** — señalado aquí explícitamente para que se resuelva antes de implementar, no durante.

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/01-scaffold-nueva-app.md` (la app necesita su propia configuración de RevenueCat en el `environment.ts`, ver ese archivo sección de `revenueCat: {...}`).
- Relacionado con: `funcionalidades/F03-invitar-cliente.md` (el gate del límite se aplica ahí) y `F21-limite-clientes-plan.md` (P1, el enforcement completo).
- Relacionado con: `funcionalidades/F14-premium-automatico.md` — mecanismos completamente independientes desde el rediseño de D10 (2026-07-31): F02 es el profesional pagando por SU CUENTA propia vía `billing-service.js`/RevenueCat; F14 ya NO toca `billing-service.js` ni `User.premium`, son beneficios de negocio sobre `feature-access-service.js` exclusivamente. No comparten infraestructura, no hay riesgo de confusión de entitlements entre ambos.

## 9. Validaciones

- El backend debe validar el webhook de RevenueCat con la misma firma/autenticación que ya usa (`validateWebhookAuth`, ya existente, sin cambios).

## 10. Casos límite y posibles errores

- **Un profesional que también es cliente de TrainFit (ver F27) tiene DOS suscripciones potenciales**: la del consumidor (`no_adds_and_features`) y la de profesional (`trainer_pro`). El modelo actual de `User.premium` es un único objeto, no un array por entitlement — esto es una limitación real del modelo actual que debe resolverse en el punto técnico señalado en la sección 7 antes de dar por cerrado el diseño de F02, no descubrirse durante el desarrollo.
- **El profesional cancela su suscripción con clientes ya activos por encima del límite free**: no se revoca acceso retroactivo a los clientes ya vinculados en el MVP (comportamiento más simple y menos hostil) — simplemente no puede invitar clientes NUEVOS hasta volver a estar dentro del límite. Confirmar que este es el comportamiento deseado antes de implementar `F21`.

## 11. Estructura de datos necesaria

Ninguna nueva si se resuelve reutilizando `User.premium` (con el punto técnico de la sección 7 resuelto). Si se decide que necesita distinguir "premium de consumidor" vs "premium de profesional" como conceptos separados, requeriría extender `User.premium` con un campo adicional (p. ej. `professionalPremium: {...}`, mismo shape) — a decidir en implementación.

## 12. Endpoints/API necesarios

- Reutiliza `POST /billing/webhooks/revenuecat` (sin cambios).
- Reutiliza los endpoints de sincronización de compra ya existentes en `billing-routes.js` (`syncFromCustomerInfo`, `restoreFromRevenueCat`) — sin cambios de código, solo apuntando al `entitlementId` correcto según la app que hace la llamada.

## 13. Criterios de aceptación verificables

- [ ] Un profesional nuevo ve el plan FREE por defecto, con límite de 3 clientes.
- [ ] Comprar el plan de pago actualiza `User.premium`/el entitlement correspondiente correctamente.
- [ ] El webhook de RevenueCat procesado para este `entitlementId` no interfiere con el procesamiento de eventos del entitlement de consumidor (si el mismo usuario tuviera ambos).
- [ ] Cancelar la suscripción no revoca acceso a clientes ya vinculados (según el caso límite de la sección 10).

## 14. Checklist de implementación

- [ ] Crear el `entitlementId`/productos nuevos en el panel de RevenueCat.
- [ ] Resolver el punto técnico de convivencia de entitlements en `User.premium` (sección 7) ANTES de escribir código.
- [ ] Extender `feature-access-service.js` con los límites de profesional.
- [ ] Pantalla de paywall calcada de `premium.page.ts`.
- [ ] Verificar los 4 criterios de aceptación.
