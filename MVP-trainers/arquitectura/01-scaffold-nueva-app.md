# Arquitectura 01 — Scaffold de la nueva app `train-fit-trainers`

## 1. Objetivo

Crear la tercera app del monorepo (`apps/train-fit-trainers`), publicable en App Store, Play Store, y como portal web, reutilizando el 100% de la infraestructura de monorepo, servicios (`CoreModule`) y componentes (`SharedModule`) ya existentes. Esta es la base física sobre la que se construye cualquier pantalla del resto de la documentación — ninguna funcionalidad puede implementarse sin esto.

## 2. Alcance exacto para el MVP

- Estructura de carpetas Angular/Ionic completa, calcada de `apps/train-fit-management` (el precedente más cercano de "app nueva añadida al monorepo") y `apps/train-fit-front` (el precedente de "app Capacitor con tabs").
- `capacitor.config.ts` propio con `appId: "com.trainfit.trainers"`.
- 4 archivos de environment (`environment.ts`, `environment.pre.ts`, `environment.prod.ts`, `environment.live.ts`), mismo patrón que las otras dos apps.
- Scripts en el `package.json` raíz calcados de los de `:m` (`train-fit-management`) con sufijo `:t`.
- `app.module.ts` importando `CoreModule` (una sola vez, en esta app) y el resto de módulos compartidos.
- `app-routing.module.ts` con las rutas raíz (`user-loader`, `tabs`, `sign-in`, `disconnected` como mínimo, mismo patrón que `train-fit-front`).
- Shell de navegación por tabs: **Clientes | Invitar | Perfil** (nombres de tab ajustables en UI, no en esta documentación).
- El mismo proyecto se publica en 3 canales (ver `funcionalidades/F16-portal-web-pc.md` para el detalle del canal web): `build:i:t`/`build:a:t` (nativo) y `build:pre:t`/`build:pro:t` (web, sin `cap sync`).

## 3. Qué NO se incluye en el MVP

- No se crea una app separada para el portal web — es el mismo proyecto (ver `funcionalidades/F16-portal-web-pc.md`).
- No se diseña el pulido responsive de escritorio en este archivo — eso es contenido de `F16`. Aquí solo se garantiza que el build web es posible desde el día 1.
- No se decide aún el copy/textos finales de las tabs ni el diseño visual — es tarea de UI, no de scaffold.
- No se configuran certificados de Apple/Google ni cuentas de desarrollador — es un prerequisito operativo fuera del alcance de este documento técnico, pero bloquea la publicación real (ver `00-riesgos.md`, R2).

## 4. Flujos de usuario paso a paso

Esta es una tarea de infraestructura, no tiene un flujo de usuario final — el "flujo" es el de desarrollo:

1. Copiar la estructura de `apps/train-fit-management/` como plantilla de partida (más cercana en cuanto a "app nueva en el monorepo") pero sustituyendo la configuración de Capacitor por la de `apps/train-fit-front/` (tabs + Capacitor real, no panel web puro).
2. Renombrar el paquete a `@trainfit/train-fit-trainers` en su `package.json`.
3. Ajustar `capacitor.config.ts`: `appId: "com.trainfit.trainers"`, `appName: "TrainFit Trainers"` (o el nombre comercial final que se decida en UI).
4. Crear los 4 archivos de `environment.*.ts` con `clientFamily: 'trainfit-trainers'` (ver `arquitectura/03-autenticacion-y-roles.md` para el resto de campos de auth) y `API_URL` apuntando al mismo backend que las otras dos apps.
5. Configurar `app.module.ts` importando `CoreModule`, `AppUpdateModule`, `MaintenanceModule` (igual que `train-fit-front`).
6. Crear `app-routing.module.ts` con lazy loading, arrancando en `user-loader` (mismo patrón que `train-fit-front`).
7. Crear el shell de tabs (`features/tabs/`) con 3 tabs: Clientes, Invitar, Perfil.
8. Añadir los scripts al `package.json` raíz (ver punto 6 más abajo).
9. Verificar que `npm run build:pre:t` (sin `cap sync`) produce un `www/` funcional sirviéndolo localmente.
10. Verificar que `npm run build:i:pre:t`/`build:a:pre:t` sincronizan correctamente con Capacitor (aunque no se publique todavía).

## 5. Pantallas necesarias (solo el shell, sin contenido de negocio)

- Shell de tabs vacío (3 tabs con placeholder), para verificar que la navegación funciona antes de construir ninguna feature.
- Reutiliza `sign-in.page`, `user-loader.page` de `packages/shared-features` — no se crean pantallas de login nuevas (ver `funcionalidades/F01-registro-login-profesional.md` para el matiz de registro sin datos biométricos).

## 6. Componentes UI requeridos

Ninguno nuevo en esta pieza — se importa `SharedModule` completo (popovers, notas, skeletons, filtros) tal cual, sin modificarlo.

## 7. Lógica de negocio

Ninguna — esto es scaffold puro.

## 8. Dependencias con otros módulos

- Depende de: nada (es la base de todo lo demás).
- Bloquea: absolutamente todas las funcionalidades de `funcionalidades/`.
- Relacionado con: `arquitectura/03-autenticacion-y-roles.md` (el `clientFamily` del environment debe coincidir exactamente con el valor añadido a `JWT_ALLOWED_AUDIENCES`).

## 9. Validaciones

- El `appId` de `capacitor.config.ts` debe ser único y no colisionar con `com.trainfit.trainfit` (consumidor) ni `com.trainfit.management` (admin).
- El `clientFamily` del environment debe ser una cadena exacta que luego se registre en `JWT_ALLOWED_AUDIENCES` — un typo aquí rompe silenciosamente toda la autenticación de la app (los tokens se emitirían con una audiencia que el backend no reconoce).

## 10. Casos límite y errores posibles

- **Olvidar añadir `trainfit-trainers` a `JWT_ALLOWED_AUDIENCES` en el backend**: el login parecería funcionar (se emite el token) pero cualquier petición autenticada devolvería 401 al validar la audiencia — un fallo confuso de diagnosticar si no se sabe dónde mirar. Ver `arquitectura/03-autenticacion-y-roles.md`.
- **CORS**: si el hosting del build web usa un origen no cubierto por la lista de orígenes permitidos en `app.js` (hoy son por esquema: `capacitor://localhost`, `ionic://localhost`, `https://localhost`, `http://localhost:8100` — ninguno de estos cubre un dominio real de producción como `trainers.trainfit.net`), las peticiones desde el portal web en producción fallarán por CORS. **Este es un caso límite real, no solo teórico** — verificar contra qué origen exacto sirve hoy `trainfit.net`/`train-fit-management` en producción y replicar esa configuración.

## 11. Estructura de datos necesaria

Ninguna (esto es frontend/infra puro).

## 12. Endpoints/API necesarios

Ninguno nuevo — reutiliza `/api/auth/*` tal cual.

## 13. Criterios de aceptación verificables

- [x] `npm run serve:t` levanta la app en local y muestra el shell de autenticación (los tabs requieren sesión profesional).
- [x] `npm run build:pre:t` produce una carpeta `www/` sin errores.
- [ ] `npm run build:i:pre:t` sincroniza correctamente con un proyecto iOS (Xcode abre sin errores de configuración).
- [ ] `npm run build:a:pre:t` sincroniza correctamente con un proyecto Android (Android Studio abre sin errores de configuración).
- [ ] Un login de prueba contra el backend de `pre` completa el flujo `sign-in → user-loader → tabs` sin errores de red ni de auth (asumiendo que `arquitectura/03-autenticacion-y-roles.md` ya está implementado).

## 14. Checklist de implementación

- [x] Crear `apps/train-fit-trainers/` con la estructura de carpetas.
- [x] `package.json` del nuevo workspace (`@trainfit/train-fit-trainers`).
- [x] `capacitor.config.ts`.
- [x] 4 archivos de `environment.*.ts`.
- [x] `app.module.ts`, `app-routing.module.ts`, `app.component.ts/html/scss`.
- [x] Shell de tabs con 3 tabs funcionales: clientes, invitaciones y perfil.
- [x] Scripts nuevos en el `package.json` raíz (`serve:t`, `serve:pre:t`, `serve:pro:t`, `build:pre:t`, `build:pro:t`, `build:i:t`, `build:a:t`, `build:i:pre:t`, `build:a:pre:t`, `build:i:pro:t`, `build:a:pro:t`, `live:i:t`, `live:a:t`, `lint:t`).
- [ ] Verificar los 4 criterios de aceptación de arriba.
