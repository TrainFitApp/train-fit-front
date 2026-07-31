# Arquitectura 03 — Autenticación y rol de profesional (`trainer`)

## 1. Objetivo

Hacer que el sistema JWT RS256 ya existente reconozca la nueva app (`trainfit-trainers`) sin cambios de configuración, y que un único rol nuevo, `trainer`, funcione con el mismo mecanismo genérico de permisos que ya usan `admin`/`user`. Cero cambios de fondo al sistema de auth.

**Nota de diseño**: este documento usaba antes dos roles independientes, `trainer` y `nutritionist`, pensados para reflejar la especialización de la cuenta. Se simplificó a un único rol `trainer` ("cuenta profesional de esta app") porque un mismo profesional puede llevar entrenamiento de un cliente, nutrición de otro, y ambos de un tercero — la especialización nunca fue un atributo de la cuenta, siempre fue un atributo de cada relación (`TrainerClient.scope`, ver `modelos-de-datos/01-trainerclient.md`). Mantener dos roles de cuenta que no restringían nada real era complejidad sin función — se elimina.

**Corrección de diseño importante (verificado contra el código real, 2026-07-31)**: la versión anterior de este documento asumía que había que añadir `trainfit-trainers` a la variable de entorno `JWT_ALLOWED_AUDIENCES`. Al implementar se comprobó que **esa variable es código muerto** — `TokenService.getAllowedAudiences()` (que la lee) solo se usa como *fallback* dentro de `verifyAccess`/`verifyRefresh` cuando no se pasa `options.audiences` explícitamente, y los DOS únicos puntos que llaman a esas funciones en todo el backend (`middleware/validateAuth.js` y `components/auth/auth-controller.js`, función `refresh`) **siempre** pasan `audiences: [clientFamily]` explícito, derivado del header `x-client-family` de la propia petición — nunca caen al fallback. El sistema real de audiencias no es un allowlist global: es **auto-consistencia por `clientFamily`** — quien firma el token con audiencia X, exige esa misma X en las peticiones siguientes (vía el mismo header), sea cual sea el valor. No hay ninguna lista de audiencias válidas que mantener.

## 2. Alcance exacto para el MVP

- **No se toca `JWT_ALLOWED_AUDIENCES` en ningún `.env`** — no hace falta, ver corrección de diseño arriba.
- `clientFamily: 'trainfit-trainers'` en el `environment.ts` de la nueva app (ver `arquitectura/01-scaffold-nueva-app.md`) es el único valor que importa — se envía como header `x-client-family` en cada petición, y el backend lo usa tal cual, sin validarlo contra ninguna lista.
- Todo `User` creado vía `funcionalidades/F01-registro-login-profesional.md` recibe `roles: ["trainer"]` — un único valor, sin variantes, sin elección del usuario. Sin ninguna migración de schema (`roles` ya es `{ type: [String], default: undefined }`).
- Usar `auth(["trainer"])` como middleware de protección en las rutas de `/api/trainer` que requieran ser profesional (no todas — algunas rutas del lado cliente, como aceptar una invitación, se protegen con `auth(["user", "admin"])`, el mismo que ya usa el resto de rutas de cliente).

## 3. Qué NO se incluye en el MVP

- No hay rol `nutritionist` — ver la nota de diseño en el punto 1.
- No se modifica `middleware/validateAuth.js` ni `services/token.service.js` — el mecanismo de `auth(permissions[])` ya es una factory genérica, añadir un string nuevo no requiere tocar su implementación.
- No se toca ninguna variable de entorno de audiencias — confirmado innecesario.
- No se toca la configuración de CORS por `appId` — los orígenes permitidos en `app.js` son por esquema (`capacitor://localhost`, etc.), una app Capacitor nueva no necesita entrada propia. **Si el portal web (`funcionalidades/F16-portal-web-pc.md`) se sirve desde un dominio nuevo, SÍ hay que añadir ese origen exacto a la lista de CORS permitidos** — esto es lo único de esta pieza que sí toca `app.js`.

## 4. Flujos paso a paso

1. Confirmar en `arquitectura/01-scaffold-nueva-app.md` que el `clientFamily` de los 4 environments de la nueva app es literalmente `'trainfit-trainers'`, sin variaciones de mayúsculas/guiones entre archivos. Es el ÚNICO ajuste de "audiencia" que existe — no hay paso de configuración de servidor.
2. Al implementar `funcionalidades/F01-registro-login-profesional.md`, asegurarse de que el flujo de creación de usuario escribe `roles: ["trainer"]` de forma fija — no hay ninguna rama de UI ni de backend que escriba otro valor.
3. En cada ruta nueva de `/api/trainer/*` que deba ejecutarla un profesional, usar `auth(["trainer"])`. En las rutas que ejecuta el CLIENTE (aceptar invitación, ver info de sus profesionales, etc.), usar el `auth(["user", "admin"])` estándar que ya protege el resto de rutas de cliente.
4. Ninguna ruta necesita distinguir "es entrenador vs. es nutricionista" a nivel de rol — esa distinción no existe a nivel de cuenta. Cuando un endpoint necesita saber qué puede hacer el profesional con un cliente CONCRETO, la respuesta es siempre el `scope` de la relación (`arquitectura/02-modulo-backend-trainerclients.md`), nunca `req.user.roles`.

## 5. Pantallas necesarias

Ninguna directamente. La app `train-fit-trainers` decide qué secciones mostrar **por cliente**, según el `scope` de la relación con ESE cliente concreto (ver `funcionalidades/F06-detalle-cliente-navegacion.md`), no según un rol de cuenta fijo.

## 6. Componentes UI requeridos

Ninguno nuevo.

## 7. Lógica de negocio

Ninguna nueva — se reutiliza `auth(permissions[])` tal cual existe hoy, y el mecanismo de audiencia auto-consistente por `clientFamily` tal cual existe hoy.

## 8. Dependencias con otros módulos

- Bloquea: `arquitectura/02-modulo-backend-trainerclients.md` (las rutas del middleware `requireActiveClient` van montadas detrás de `auth(["trainer"])`) y toda `funcionalidades/`.
- Depende de: nada nuevo — reutiliza infraestructura 100% existente, sin tocar configuración de servidor.

## 9. Validaciones

- Un `User` con `roles: []` o `roles: undefined` no debe poder pasar `auth(["trainer"])` — comportamiento ya garantizado por la implementación actual de `auth()`.
- El `clientFamily` que envía la app nueva (`x-client-family: trainfit-trainers`) debe ser IDÉNTICO en el login y en cada petición autenticada posterior — si cambia entre peticiones (p. ej. un bug que envíe el header solo a veces), `auth()` rechazará el token con "Invalid token audience" porque el `aud` del JWT ya no coincide con el header de la petición actual.

## 10. Casos límite y posibles errores

- **Un usuario con `roles: ["user"]` intenta acceder a una ruta protegida con `auth(["trainer"])`**: 403 (autenticado pero sin permiso).
- **Un profesional intenta acceder a un endpoint de nutrición de un cliente concreto** (p. ej. `POST /trainer/clients/:clientId/diet-days/.../prescribe`): esto NO lo bloquea el rol de cuenta (`roles: ["trainer"]` es igual para todos) — lo bloquea el `scope` de la relación con ESE cliente (`requireActiveClient("nutrition")`).
- **El frontend nuevo olvida enviar `x-client-family: trainfit-trainers`**: `resolveClientFamily` cae al default `"trainfit-front"` — el login "funcionaría" pero emitiría un token con la audiencia de la app de consumidor, mezclando sesiones entre apps de forma confusa. No es un error que el backend pueda detectar por sí solo — es una responsabilidad del frontend nuevo, señalar en el checklist de scaffold (`arquitectura/01`).

## 11. Estructura de datos necesaria

Ninguna nueva — `User.roles: [String]` ya existe.

## 12. Endpoints/API necesarios

Ninguno nuevo en esta pieza.

## 13. Criterios de aceptación verificables

- [ ] Un `User` con `roles: ["trainer"]` autenticado puede llamar con éxito a una ruta protegida con `auth(["trainer"])`.
- [ ] Un `User` con `roles: ["user"]` (sin rol profesional) recibe 403 al intentar la misma ruta.
- [ ] Un login con `x-client-family: trainfit-trainers` emite un token con `aud: "trainfit-trainers"`, y una petición posterior CON ese mismo header se acepta; la MISMA petición sin el header (o con uno distinto) se rechaza con "Invalid token audience" — prueba directa del mecanismo de auto-consistencia, sin tocar ninguna configuración de servidor.
- [ ] Un profesional con relación `scope: "training"` con el Cliente A y `scope: "nutrition"` con el Cliente B puede operar correctamente sobre ambos ámbitos, con la MISMA cuenta y el MISMO rol (`roles: ["trainer"]`).

## 14. Checklist de implementación

- [ ] Confirmar `clientFamily: 'trainfit-trainers'` en los 4 environments de `train-fit-trainers`, y que el interceptor HTTP del frontend lo envía SIEMPRE como `x-client-family`.
- [ ] Si el portal web (`F16`) usa un dominio propio, añadirlo a CORS en `app.js`.
- [ ] Escribir un test/prueba manual de los 4 criterios de aceptación.
