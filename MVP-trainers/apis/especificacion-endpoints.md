# Especificación completa de endpoints — TrainFit: Entrenadores

Consolidación de TODOS los endpoints ya definidos, dispersos en la sección "12. Endpoints/API necesarios" de cada archivo de `funcionalidades/*.md`. Este archivo no introduce ningún endpoint nuevo — es un índice de referencia rápida para no tener que abrir 30 archivos al implementar la capa de rutas. Si hay una discrepancia entre este archivo y el `funcionalidades/*.md` de origen, **el archivo de origen es la fuente de verdad** (este índice puede desincronizarse si se edita un F*.md sin actualizar aquí — verificar contra el origen en caso de duda).

Convención de prefijo: todas las rutas nuevas de este módulo cuelgan de `/trainer/*` en `train-fit-back`, salvo las que operan explícitamente del lado cliente dentro de TrainFit consumidor (marcadas explícitamente).

## 1. Autenticación y registro de profesional

| Método | Ruta | Descripción | Auth/Scope | Origen | Reutiliza |
|---|---|---|---|---|---|
| POST | `/api/users` o `/api/users/professional` | Registro de profesional sin biométricos, `roles: ["trainer"]` fijo, sin selección | Pública | F01 | `POST /api/users` existente, adaptado |
| GET | `/api/users/send/mail/code/:email` | Envío de código de verificación | Pública | F01 | Existente, sin cambios |
| POST | `/api/users/send/mail/code` | Reenvío de código | Pública | F01 | Existente, sin cambios |
| GET | `/api/users/hash/:id/:hash` | Verificación de código | Pública | F01 | Existente, sin cambios |
| POST | `/api/auth/login` | Login estándar | Pública | F01 | Existente, sin cambios |
| POST | `/api/auth/social/google/verify` | Login social Google | Pública | F01 | Existente, sin cambios |
| POST | `/api/auth/social/apple/verify` | Login social Apple | Pública | F01 | Existente, sin cambios |

## 2. Suscripción del profesional (billing)

| Método | Ruta | Descripción | Auth/Scope | Origen | Reutiliza |
|---|---|---|---|---|---|
| POST | `/billing/webhooks/revenuecat` | Webhook de confirmación de compra | Firma RevenueCat | F02 | Existente, sin cambios |
| POST/GET | rutas de `billing-routes.js` (`syncFromCustomerInfo`, `restoreFromRevenueCat`) | Sincronización de compra | `auth(["trainer"])` | F02 | Existente, sin cambios |

## 3. Invitaciones y ciclo de vida de la relación TrainerClient

| Método | Ruta | Descripción | Auth/Scope | Origen |
|---|---|---|---|---|
| POST | `/trainer/invites` | Crear invitación(es) `{ clientEmail, scopes: [...] }` — 1 documento por scope | `auth(["trainer"])` | F03 |
| GET | `/trainer/invites` | Invitaciones enviadas por el profesional (pendientes + históricas) | `auth(["trainer"])` | F03 |
| DELETE | `/trainer/invites/:id` | Cancelar invitación pendiente | `auth(["trainer"])`, autoría | F03 |
| GET | `/trainer/invites/mine` | Invitaciones pendientes del email de la sesión (lado cliente) | `auth(["user","admin"])` | F04 |
| POST | `/trainer/invites/:id/accept` | Aceptar invitación (lado cliente) | `auth(["user","admin"])`, email coincide | F04 |
| POST | `/trainer/invites/:id/decline` | Rechazar invitación (lado cliente) | `auth(["user","admin"])`, email coincide | F04 |
| GET | `/trainer/info` | Profesionales activos del cliente autenticado | `auth(["user","admin"])` | F04, F07 |
| GET | `/trainer/clients` | Listado de clientes activos del profesional, agregado por cliente | `auth(["trainer"])` | F05 |
| DELETE | `/trainer/clients/:clientId?scope=training\|nutrition` | Revocar relación (lado profesional) — scope obligatorio, revoca solo ese documento | `auth(["trainer"])`, autoría | F08 |
| DELETE | `/trainer/link/:scope` | Desvincularse (lado cliente) | `auth(["user","admin"])`, autoría | F08 |
| GET | `/trainer/clients?status=revoked,declined` o `/trainer/history` | Historial de relaciones pasadas (profesional) | `auth(["trainer"])` | F22 |
| GET | equivalente lado cliente de historial | Historial de relaciones pasadas (cliente) | `auth(["user","admin"])` | F22 |

## 4. Lectura de datos del cliente (entrenamiento)

| Método | Ruta | Descripción | Scope requerido | Origen | Reutiliza |
|---|---|---|---|---|---|
| GET | `/trainer/clients/:clientId/tables` | Rutina(s)/tablas del cliente | `training` | F09 | `tableModel.getTables` |
| GET | `/trainer/clients/:clientId/anthropometry` | Peso/antropometría reciente | Cualquier relación activa (`training` o `nutrition`), sin scope exacto | F09 | `anthropometryService.getAnthropometriesBetweenDates` |
| GET | `/trainer/clients/:clientId/workouts/history` | Historial de entrenamientos completados | `training` | F09 | Agregación equivalente a `getExerciseHistoryStats` |

## 5. Lectura de datos del cliente (nutrición)

| Método | Ruta | Descripción | Scope requerido | Origen | Reutiliza |
|---|---|---|---|---|---|
| GET | `/trainer/clients/:clientId/diet?date=YYYY-MM-DD` | Dieta del cliente para una fecha | `nutrition` | F10 | `dietDayModel.getDietDayByIdDietAndDate` |
| GET | `/trainer/clients/:clientId/nutritional-goals` | Objetivos de macros actuales | `nutrition` | F10 | DAO existente de `nutritionalGoals` |
| GET | `/trainer/clients/:clientId/nutrition-preferences` | Preferencias nutricionales (alergias, favoritos...) | `nutrition` | F29 | — |
| GET | `/trainer/clients/:clientId/adherence?from=...&to=...` | % de adherencia nutricional en un rango | `nutrition` | F20 | Agregación sobre `DietDay` + `nutritionalGoals` |

## 6. Escritura sobre datos del cliente (entrenamiento) — riesgo de seguridad concentrado, ver `00-riesgos.md` R1

| Método | Ruta | Descripción | Scope requerido | Origen | Reutiliza |
|---|---|---|---|---|---|
| GET | `/trainer/clients/:clientId/tables/available-templates` | Plantillas disponibles para duplicar (públicas + propias del profesional) | `training` | F11 | `GET /tables` filtrado |
| POST | `/trainer/clients/:clientId/tables` | Asignar rutina — `{ mode: "new"\|"duplicate", ... }` | `training` | F11 | `createTableToUser`/`copyTable` (revisar antes de reutilizar tal cual, ver F11 §7) |
| POST | `/trainer/routines/:routineId/apply-to-clients` | Aplicar rutina en bloque a varios clientes | `training` por cada cliente destino | F30 | Itera `POST /trainer/clients/:clientId/tables` |

## 7. Escritura sobre datos del cliente (nutrición) — riesgo de seguridad + riesgo de reutilización, ver `00-riesgos.md` R1/R3

| Método | Ruta | Descripción | Scope requerido | Origen | Reutiliza |
|---|---|---|---|---|---|
| POST | `/trainer/clients/:clientId/diet-days/:date/meals/:mealId/prescribe` | Pautar una comida concreta | `nutrition` | F12 | `mealDao.pasteMeal` |
| POST | `/trainer/clients/:clientId/diet-days/:date/meals/:mealSlot/propose` | Proponer 2+ alternativas nombradas para un hueco | `nutrition` | F28 | Extiende F12 |
| GET | `/diets/:date/meal-proposals` | Ver alternativas pendientes de elegir (lado cliente) | `auth(["user","admin"])` | F28 | — |
| POST | `/diets/:date/meal-proposals/:proposalId/choose` | Elegir una alternativa (lado cliente) | `auth(["user","admin"])` | F28 | Dispara `pasteMeal` |
| POST | `/trainer/clients/:clientId/nutritional-goals` | Asignar/editar objetivos de macros | `nutrition` | F13 | DAO existente de `nutritionalGoals` |
| POST | `/trainer/clients/:clientId/diet-days/:date/meals/:mealSlot/apply-to-clients` | Pautar la misma comida en bloque a varios clientes | `nutrition` por cada cliente destino | F30 | Itera el endpoint de F12 |
| POST | `/trainer/clients/:clientId/nutrition-goals/apply-to-clients` | Aplicar objetivos en bloque a varios clientes | `nutrition` por cada cliente destino | F30 | Itera el endpoint de F13 |

## 8. Preferencias nutricionales del cliente (lado cliente)

| Método | Ruta | Descripción | Auth | Origen |
|---|---|---|---|---|
| GET | `/nutrition-preferences` | Ver las propias preferencias | `auth(["user","admin"])` | F29 |
| PUT | `/nutrition-preferences` | Editar las propias preferencias | `auth(["user","admin"])` | F29 |
| POST | `/trainer/clients/:clientId/nutrition-preferences/request` | Solicitar el cuestionario al cliente | `nutrition` | F29 |

## 9. Check-ins (catálogo periódico + por sesión)

| Método | Ruta | Descripción | Scope/Auth | Origen |
|---|---|---|---|---|
| GET/POST/PUT/DELETE | `/trainer/checkin-templates` | CRUD de plantillas de check-in nombradas y reutilizables | `auth(["trainer"])` | F17 |
| POST | `/trainer/checkin-templates/:id/apply` | Aplicar (copiar) una plantilla a uno o varios clientes | Cualquier scope activo por cliente | F17 |
| GET | `/trainer/clients/:clientId/checkin-config` | Ver configuración YA aplicada a ese cliente | Cualquier scope activo | F17 |
| GET | `/trainer/clients/:clientId/checkin-responses` | Histórico de respuestas del cliente | Cualquier scope activo | F17 |
| GET | `/trainer/checkins/mine` | Ver qué campos le piden (lado cliente, por profesional) | `auth(["user","admin"])` | F17 |
| POST | `/trainer/checkins/:trainerId/respond` | Responder check-in (lado cliente) — reparte valores entre `Anthropometry` (composición/perímetros) y `CheckinResponse` (bienestar) según D8 | `auth(["user","admin"])` | F17 |
| — | Integrado en creación/actualización de `Workout` existente | `readinessPre`/`perceivedEffortPost` | `auth(["user","admin"])` | F18 |

## 10. Notas internas del profesional

| Método | Ruta | Descripción | Scope/Auth | Origen |
|---|---|---|---|---|
| GET | `/trainer/clients/:clientId/notes` | Listar notas (pinned primero) | Cualquier scope activo | F19 |
| POST | `/trainer/clients/:clientId/notes` | Crear nota nueva | Cualquier scope activo | F19 |
| PATCH | `/trainer/clients/:clientId/notes/:noteId` | Fijar/desfijar nota | Cualquier scope activo | F19 |

## 11. Recordatorio de cobro

| Método | Ruta | Descripción | Scope/Auth | Origen |
|---|---|---|---|---|
| GET | `/trainer/clients/:clientId/payments` | Listar cobros | Cualquier scope activo | F26 |
| POST | `/trainer/clients/:clientId/payments` | Crear cobro pendiente | Cualquier scope activo | F26 |
| PATCH | `/trainer/clients/:clientId/payments/:paymentId` | Marcar cobro como pagado | Cualquier scope activo | F26 |

## 12. Foto de perfil profesional

| Método | Ruta | Descripción | Auth | Origen |
|---|---|---|---|---|
| POST | `/trainer/profile/photo/upload-url` | Obtener URL prefirmada de subida | `auth(["trainer"])` | F25 |
| POST | `/trainer/profile/photo/confirm` | Confirmar subida completada | `auth(["trainer"])` | F25 |

## 13. Gate de datos biométricos diferido

| Método | Ruta | Descripción | Auth | Origen |
|---|---|---|---|---|
| PUT | `/api/users` | Completar biométricos diferidos (endpoint YA existente de actualización de perfil) | `auth(["user","admin"])` | F27 |

## 14. Portal web (sin endpoints propios)

F16 no introduce ningún endpoint nuevo — reutiliza absolutamente todos los anteriores desde el mismo build Angular servido como web. El único cambio de infraestructura es CORS (ver `arquitectura/03-autenticacion-y-roles.md` y F16 §10).

## Notas de implementación transversales

- **Todos los endpoints bajo `/trainer/clients/:clientId/*`** deben pasar por `requireActiveClient(scope)` (`arquitectura/02-modulo-backend-trainerclients.md`) — ninguno debe implementarse sin ese middleware, incluso si parece de solo lectura y "de bajo riesgo".
- **Ningún endpoint de escritura debe confiar en un `trainerId`/`clientId` recibido en el body** — el `trainerId` siempre sale de `req.auth.userId` (sesión), nunca del payload (principio repetido en `README.md` de esta carpeta, motivado directamente por la vulnerabilidad real encontrada en `duplicateTable`/`copyTable` durante la auditoría que originó este proyecto).
- **Los endpoints de F30 (aplicación en bloque) son los únicos que iteran una operación de escritura sobre múltiples `clientId`** — cada iteración interna vuelve a pasar por `requireActiveClient` individualmente, sin excepción ni atajo.
