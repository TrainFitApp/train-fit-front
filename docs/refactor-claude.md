# `refactor-claude` → `main` (front)

Qué trae la rama `refactor-claude` respecto a `main` en el monorepo del front.
Estado a **2026-09-25**. El modelo de datos, la API y la migración de la BD están en `train-fit-back/docs/refactor-claude.md`.

## Resumen

- **156 commits** sin merges (sangovis98 114, Davvidar 24), del 2026-08-01 al 2026-09-21.
- `main` (2026-08-21) y `master` (2026-09-06) son ancestros directos de `refactor-claude`, así que la fusión es **fast-forward**.
- El diff son 2.134 ficheros (+113.000 líneas), pero **el 63 % son SVG compilados** en `apps/train-fit-trainers/android/app/src/main/assets/public/` (ver "Pendiente").
- Lo principal:
  1. **App nueva de entrenador** (`apps/train-fit-trainers`).
  2. La **app del cliente** se adapta al nuevo modelo de nutrición y añade la parte "coach".
  3. `train-fit-management` apenas cambia.

## App del entrenador (nueva) — `apps/train-fit-trainers`

- Capacitor: `com.trainfit.trainers` ("TrainFit Trainers"). Es **una ficha nueva en las tiendas**.
- Entornos: `environment.ts`, `.pre`, `.prod` y `.live`.
- Scripts desde la raíz: `serve:t`, `serve:pre:t`, `build:pre:t`, `build:pro:t`, `build:i:t`, `build:a:t` (y sus variantes `pre`/`pro`) y `live:i:t`/`live:a:t`.
- Tema oscuro con acento naranja. Principios de diseño en `PRODUCT.md` y tokens `--tf-*` en `src/theme/tokens.scss` (nunca `--ion-color-*` crudo).

Pestañas: **dashboard**, **clients**, **templates**, **method**. Además: account, subscription, invites y profile.

| Feature | Qué es |
|---|---|
| `dashboard/`, `statistics/` | Resumen del día, elementos que requieren atención y estadísticas |
| `clients/` | Cartera y **ficha del cliente** (`client-detail.page.*`, muy grande, acepta `?tab=`) |
| `invites/`, `professional-sign-up/`, `subscription/` | Alta del entrenador, invitaciones y suscripción (RevenueCat) |
| `diet-templates/`, `meal-compose/` | Biblioteca de dietas (menús y alternativas), sugerencias (`for-phase/:clientId` + `diet-suggestion-drawer`) y comidas guardadas |
| `routine-templates/`, `routines/`, `exercise-library/`, `planner/`, `exercise-scores/` | Plantillas de rutina, rutinas del cliente, ejercicios propios (`exercise-form-modal`), planificador y puntuaciones IEM/IEA |
| `checkin-templates/` | Formularios de check-in |
| `automations/`, `protocols/` | Reglas WHEN/IF/THEN y protocolos |
| `method/` | Pestaña que agrupa automatizaciones, formularios de check-in y protocolos |
| `templates/` | Pestaña que agrupa plantillas de dieta, plantillas de rutina y rutinas |
| `account/`, `profile/` | Cuenta y perfil del entrenador. `account/payments` → Configuración > Cobros |
| `payments/` (2026-09-27) | Cobros a clientes: libro de la ficha (`client-payments-ledger`), tarjeta del Resumen (`client-payments-card`), paneles de pago, cuota, cobro puntual, detalle y avisos (`payments-sheet` = marco común `tf-side-panel`), página global `pages/payments-overview`. Lógica de vista PURA en `utils/payments-view.util.ts` (test `payments-view.test.cjs`). API en `trainer/payments/*`; `TrainerPaymentsService.changes$` refresca ficha, tarjeta y global tras cualquier escritura |

La ficha del cliente incluye:
- **Nutrición**: fases, semanas (`next-week-modal`, `week-summary-panel`, `week-comparison-cards`), desglose de la necesidad (`need-breakdown`), gráfica de peso y adherencia, historial y preferencias.
- **Entrenamiento**: calendario de fases (`phase-schedule-calendar`) y comparación de microciclos.
- **Check-ins**: `checkin-schedules-panel` y `checkin-schedule-history-panel`.
- Resumen con dolor y perímetros, y adherencia. Tarjeta **Cobros** (vencido / vence hoy / próximo / pausada / sin cuota / sin pendientes).
- **Gestión > Cobros**: cuota (configurar, precio con vigencia, pausar, reanudar, finalizar, avisos al cliente), cobros con pagos parciales, correcciones con motivo y anulación de saldo. `?tab=payments&charge=<id>` abre un cobro. Ya no programa avisos locales de Capacitor: `payments/services/legacy-payment-reminders.service.ts` cancela solo los antiguos de cobros ("Recuerda cobrar a …") al entrar en el panel.

Piezas compartidas propias: `macro-adjust` (ajuste de macros con candados, en "Empezar fase" y "Siguiente semana"), `diet-card`, `product-search-modal`, `recipe-builder-modal`, etc. Los paneles laterales usan `tf-side-panel` (`_panel-sheet.scss`).

## App del cliente — `apps/train-fit-front` + `packages/shared-features`

| | Features |
|---|---|
| **Nuevas** | `coach/` (pestaña Coach: sus profesionales, tareas y hábitos, y avisos), `checkins/my-checkins`, `onboarding-status/` (intake), `nutrition-preferences/`, `pain/`, `supplements/`, `shopping-list/` |
| **Cambian** | `diets/`: menús del día (`day-menu`, `menu-preview-modal`), alternativas de comida, lo pautado por el entrenador de solo lectura con cantidad pautada vs. consumida, y saltar día. `tables/`, `exercises/` (`quick-series-modal`, notas del entrenador), `profile/`, `authentication/`, `premium/` |
| **Retiradas** (dentro de la rama) | Intercambios de alimentos (`food-exchanges`), petición de antropometría (`anthropometry-request`), "tipos de día" (sustituidos por menús) |

`packages/shared-ui` añade `confirm-sheet` y la directiva `numeric-keypad`.

Cobros (2026-09-27): el Coach del cliente y la tarjeta "Tu coach" muestran el **saldo restante** con dos decimales (`coach-notification-view.ts#money`) y el aviso nuevo `payment_reminder` (solo informativo, sin acciones de gestión). Test en `coach-notification-view.test.cjs`.

## `packages/shared-core`
- Modelos y servicios de API para todo lo nuevo del back.
- **Catálogos espejo** del back (check-in, agujetas, dolor, puntuaciones), con test de paridad en el back (`verify-checkin-catalog-sync.js` y tests). Si cambias uno, cambia los dos.

## `apps/train-fit-management`
Solo 13 ficheros: marca (logo, `app-shell.config.ts`), i18n, `capacitor.config.ts`, Gradle/Info.plist y `environment.live.ts`.

## Despliegue
1. **Primero el back** con la BD migrada (ver el doc del back). La nueva app del cliente **no funciona** contra el back de `main`.
2. Publicar la app del cliente (`build:i:pro` / `build:a:pro`) y la del entrenador (`build:i:pro:t` / `build:a:pro:t`).
3. Las versiones del cliente ya instaladas siguen funcionando contra el back nuevo (capa `/diets/*`). Si hubiera que forzar la actualización: `remoteConfig.forceUpdate`.

## Pendiente antes de fusionar
- **1.363 ficheros compilados versionados** en `apps/train-fit-trainers/android/app/src/main/assets/public/` (en la app del cliente hay 0). Es la salida de `cap sync`. Conviene añadirlos a `.gitignore` y sacarlos del repo.
- Comprobación: `npx ng build` en cada app (`apps/train-fit-front`, `apps/train-fit-trainers`, `apps/train-fit-management`). `npm test` cubre utilidades puras (body-metrics, lista de la compra, facturación, cobros, avisos del Coach…). `npm run lint:t` arrastra unos 2.570 errores antiguos.
- Ramas **sin integrar**: `pagos` y `fixes-cliente` (Davvidar), `resumen-checkins` y `refactor-checkins` (solo en local, 6 commits sin push).
