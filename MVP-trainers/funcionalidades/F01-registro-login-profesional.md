# F01 — Registro y login de profesional

**Prioridad**: P0. **Fase**: 2 (ver `00-orden-implementacion.md`).

## 1. Objetivo

Permitir que un profesional (entrenador y/o nutricionista) se registre y acceda a `TrainFit: Entrenadores`, reutilizando el sistema de autenticación existente, pero SIN exigir los datos biométricos (peso, altura, sexo, actividad, objetivo, fecha de nacimiento) que el registro de consumidor sí exige — porque un profesional no necesariamente es un cliente de TrainFit y no tiene sentido pedirle esos datos.

**Corrección de diseño importante (sustituye una versión anterior de este documento)**: el registro NO pregunta si el profesional es "entrenador", "nutricionista" o "ambos". Un mismo profesional puede llevar la nutrición de un cliente, el entrenamiento de otro, y ambos de un tercero (como 2 relaciones separadas) — la especialización no es un atributo fijo de la cuenta, es una decisión que se toma **por cliente**, en el momento de invitarlo (ver `funcionalidades/F03-invitar-cliente.md`). Preguntarlo en el registro obligaría a elegir una etiqueta que puede no ser cierta para ninguno de sus clientes reales, o no serlo para todos por igual.

## 2. Alcance exacto para el MVP

- Registro por email/password, reutilizando el mecanismo de verificación por `hash` de 6 dígitos ya existente (`generateHashMail`/`sendMailSES`), SIN pedir campos biométricos.
- Login social (Google/Apple) reutilizado tal cual — si un profesional se registra vía social, tampoco se le exige biométricos.
- El registro crea la cuenta con `roles: ["trainer"]` SIEMPRE — un único valor de rol, sin selección por parte del usuario. `"trainer"` aquí significa "cuenta profesional de `TrainFit: Entrenadores`", no "especializado en entrenamiento" — el ámbito real (entrenamiento/nutrición/ambos) se decide después, por cada cliente, no en el registro.
- Login estándar reutilizado sin ningún cambio — un profesional inicia sesión exactamente igual que cualquier otro `User`.

## 3. Qué NO se incluye en el MVP

- No hay selector de rol/especialidad en el registro — ver la corrección de diseño en el punto 1.
- No se pide ningún dato biométrico en este flujo — eso es exactamente lo que se evita (ver `funcionalidades/F27-gate-datos-biometricos-diferido.md` para cuándo SÍ se piden, si el profesional decide usar TrainFit normal como cliente).
- No se pide foto de perfil en el registro — eso es `funcionalidades/F25-foto-perfil-profesional.md`, P1, opcional y posterior.
- No se pide información de negocio (bio, tarifas) en el registro.
- No hay verificación de identidad/credenciales profesionales (títulos, certificaciones) — fuera de alcance total de este MVP.

## 4. Flujos de usuario paso a paso

**Flujo A — Registro tradicional (email/password)**:
1. El usuario abre `train-fit-trainers`, pulsa "Crear cuenta".
2. Introduce nombre, apellidos, email, password.
3. Pulsa "Registrarme". No hay ningún paso de selección de rol/especialidad.
4. El backend crea el `User` con `roles: ["trainer"]`, sin biométricos, genera el `hash` de 6 dígitos y envía el email de verificación (reutilizando `generateHashMail`/`sendMailSES` tal cual).
5. El usuario introduce el código recibido por email.
6. Verificado el código, se genera el token de sesión (mismo mecanismo que hoy) y se navega al dashboard de `train-fit-trainers` (lista de clientes, vacía la primera vez).

**Flujo B — Login social (Google/Apple)**:
1. El usuario pulsa "Continuar con Google/Apple".
2. Se verifica el token social (reutiliza `POST /auth/social/google/verify`/`apple/verify` tal cual).
3. Si es un usuario nuevo, se crea el `User` directamente con `roles: ["trainer"]` — sin ningún paso intermedio de selección, igual que el Flujo A.
4. Se completa el login.

**Flujo C — Login estándar (usuario ya registrado)**:
1. Email/password o social, exactamente igual que en TrainFit consumidor. Sin cambios.

## 5. Pantallas necesarias

- `sign-up.page` (adaptada o una variante ligera): formulario de registro SIN los pasos de `data-sheet.page.ts` (ese componente es exclusivamente para biométricos, no se invoca en este flujo) y SIN ningún paso de selección de rol.
- Pantalla de verificación de código (reutiliza el mismo patrón de `data-sheet.page.ts`'s sección de código — `codeSended`, `verifyCode()`, `resendCode()` — pero extraído/adaptado para no depender del resto de esa página, que es específica de biométricos).
- `sign-in.page` reutilizada sin cambios.

## 6. Componentes UI requeridos

- Formulario de registro (nombre, apellidos, email, password) — puede reutilizar componentes de input ya existentes en `SharedModule` (`NumericInputComponent` no aplica aquí, son inputs de texto estándar de Ionic).
- Input de código de verificación de 6 dígitos con reenvío y cooldown (mismo patrón ya implementado en `data-sheet.page.ts`: `resendDisabled`, `resendCountdown`, `startResendCooldown()`).
- Ningún componente de selección de rol — se eliminó del diseño.

## 7. Lógica de negocio

**✅ Implementado y verificado (2026-07-31)**: opción (b) del análisis original — endpoint hermano `POST /api/users/professional` en `users/controller.js`/`routes.js`.

**Por qué NO se reutilizó `userDao.createUser`/`userModel.createUser` (opción (a) descartada tras verificar el código real)**: esa función SIEMPRE crea una `Diet`/`DietDay` por defecto y setea `user.dietInUse` — correcto para un cliente consumidor, pero regalaría una dieta vacía a cada profesional registrado, algo sin sentido para una cuenta que no es necesariamente cliente de TrainFit. El endpoint nuevo crea el `User` con `userSchema.create(...)` directo, igual que ya hace `registerSocial` en `auth-controller.js` (mismo patrón limpio, ya existente en el codebase, no inventado).

- El mecanismo de `hash`/verificación de email SÍ se reutiliza EXACTAMENTE igual (`generateHashMail`, `sendMailSES`) — es genérico, no depende de datos biométricos.
- **Corrección sobre el endpoint de activación**: NO es `GET /api/users/hash/:id/:hash` (`checkHash`, un flujo legacy que devuelve HTML y NO emite sesión — probablemente para un link de email antiguo) ni `activateAccount` de `users/controller.js` (código MUERTO, su ruta devuelve 410 Gone: "Auth endpoint moved to /api/auth"). El endpoint real y correcto, ya existente, es **`POST /api/auth/activate`** (`{ email, code }`) — valida el hash, lo limpia, y emite la sesión completa (`access_token`/`refresh_token` según plataforma) vía `issueSession`, que además respeta el header `x-client-family` para firmar el token con la audiencia correcta (ver `arquitectura/03`).
- Al completar el registro, el array `roles` del `User` creado es SIEMPRE `["trainer"]` — no hay ninguna variante `["nutritionist"]` ni `["trainer", "nutritionist"]` en este MVP. Nunca `"user"` a menos que el profesional además quiera ser cliente de TrainFit (ver `F27`, que trata ese caso combinado).

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/03-autenticacion-y-roles.md` (el rol `trainer` debe estar reconocido por el sistema de auth).
- Depende de: `arquitectura/01-scaffold-nueva-app.md` (necesita la app creada para tener dónde poner estas pantallas).
- Bloquea: todo lo demás — sin un profesional logueado no hay nada más que hacer en esta app.
- Relacionado con: `funcionalidades/F27-gate-datos-biometricos-diferido.md` (qué pasa si este mismo usuario luego abre TrainFit normal).
- Relacionado con: `funcionalidades/F03-invitar-cliente.md` — donde SÍ se decide, por cliente, qué ámbito (`scope`) lleva el profesional con esa persona concreta.

## 9. Validaciones

- Email único (reutiliza la validación existente de `users/schema.js`, `email: { unique: true }`).
- Password con la misma política de fortaleza que ya aplica el registro de consumidor (reutilizar, no inventar una nueva).
- No hay validación de rol que superar — cualquier registro completado con éxito recibe `roles: ["trainer"]`.

## 10. Casos límite y posibles errores

- **Un profesional intenta registrarse con un email que ya existe como cliente de TrainFit (`roles: ["user"]`)**: debe fallar con el mismo mensaje que hoy usa el registro normal para email duplicado ("Este usuario ya está registrado") — NO se fusiona automáticamente la cuenta de cliente con el rol profesional. Si el negocio quiere permitir "añadir rol profesional a una cuenta de cliente existente", eso es un flujo distinto (probablemente desde `configuration.page` de TrainFit normal, "Conviértete en entrenador"), fuera del alcance de F01 tal como está definido — F01 asume que el registro se hace desde cero, desde la app de entrenadores.
- **Verificación por código fallida repetidas veces**: `POST /api/auth/activate` no tiene rate-limiting propio hoy (a diferencia de `GET /send/mail/code/:email`, que sí usa `rateLimiter`) — mismo comportamiento que el registro de consumidor, que tampoco lo aplica ahí. No es una regresión introducida por F01, es el estado ya existente del endpoint reutilizado.

## 11. Estructura de datos necesaria

Ninguna nueva — usa `User` tal cual (`components/users/schema.js`), sin ningún campo nuevo. Los campos biométricos simplemente quedan `undefined` para estos usuarios, lo cual el schema ya soporta (ninguno es `required: true`).

## 12. Endpoints/API necesarios

- `POST /api/users/professional` — nuevo, implementado. Body `{ name, lastname, email, password }`, público (sin auth). Devuelve el `User` creado (sin campos biométricos), sin sesión todavía.
- `POST /api/auth/activate` — existente, reutilizado sin cambios. Body `{ email, code }`. Devuelve `access_token` (+ `refresh_token` si aplica) con la sesión ya iniciada, firmado con la audiencia del `x-client-family` de la petición.
- `POST /api/auth/login`, `POST /api/auth/social/*` — existentes, reutilizados sin cambios para el login estándar posterior.

## 13. Criterios de aceptación verificables

- [x] **Backend, verificado con test E2E real contra `pre` (2026-07-31)**: Registrar un profesional crea el `User` con `roles: ["trainer"]`, sin ningún campo biométrico ni `dietInUse` en el documento creado.
- [x] **Backend, verificado**: el hash de 6 dígitos se genera correctamente; `POST /api/auth/activate` con ese código emite una sesión válida, con el token firmado con la audiencia `trainfit-trainers` (según el `x-client-family` de la petición).
- [ ] El formulario de registro no muestra ningún control de selección de rol/especialidad. *(pendiente — requiere la pantalla, `arquitectura/01`)*
- [ ] Login social de un profesional nuevo completa el registro directamente, sin ningún paso intermedio de selección de rol. *(pendiente — el backend social (`registerSocial`) sigue asignando `roles: ["user"]` fijo hoy; adaptarlo para profesionales no está implementado todavía, no estaba en el alcance de este slice)*
- [ ] Tras completar el registro y verificar el código, la sesión queda iniciada y navega al dashboard (lista de clientes vacía). *(pendiente — requiere pantalla)*

## 14. Checklist de implementación

- [x] Endpoint `POST /api/users/professional` implementado (`users/controller.js`/`routes.js`), asignando `roles: ["trainer"]` de forma fija, sin reutilizar `userDao.createUser`.
- [x] Confirmado que `POST /api/auth/activate` (ya existente) sirve tal cual para la activación — no hizo falta ningún endpoint nuevo de activación.
- [ ] Pantalla de registro SIN selector de rol — pendiente, requiere `arquitectura/01` (scaffold de la app).
- [ ] Pantalla/paso de verificación de código — pendiente.
- [ ] Adaptar login social para profesionales (hoy `registerSocial` fija `roles: ["user"]`) — pendiente, no bloqueante para el MVP si el registro social de profesional se pospone.
- [x] Verificados los 2 criterios de aceptación de backend; 3 pendientes de la capa de pantallas.
