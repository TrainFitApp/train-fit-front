# Middlewares (Backend)

## `middleware/index.js`

- **validateAuth**: wrapper de `auth()` con roles `[user, admin]`.
- **auth**: middleware JWT con roles configurables.
- **basicAuth**: decodifica header Basic y coloca credenciales en `req.body`.
- **error404Handler**: crea error 404.
- **errorHandler**: responde errores con status y mensaje.

## `middleware/validateAuth.js`

- **JWT RS256** con claves `PUBLIC_KEY` en env (PEM o Base64).
- Extrae token `Bearer`, verifica expiración y validez.
- Carga usuario desde DB por email y guarda en `req.user`.
- Valida roles contra `permissions`.
- Errores:
  - 402 si no hay token
  - 401 si expirado
  - 400 si inválido
  - 403 sin permisos

## `middleware/logger.js`

- Morgan con formato custom y email de JWT.
- Escribe en `middleware/file.log`.

## Cascadas (Hooks en Schemas)

- **User**: elimina `dietInUse`, `ownTables`, `ownProducts`.
- **Diet** → `DietDay` → `Meal` → `CustomProduct`/`CustomRecipeInstance`/`DataRecipe`.
- **OwnProduct** → `CustomProduct`.
- **CustomRecipeInstance** → `DataRecipe` huérfano.
- **Table/OwnTable** → `Split` → `Workout` → `CustomExercise` → `Set`.
