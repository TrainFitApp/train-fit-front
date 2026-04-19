# Auth & Token (Backend)

## Token Service (`services/token.service.js`)

- **Access Token**: JWT RS256, expira en 15m.
- **Refresh Token**: JWT RS256, expira en 30d con `tokenVersion`.
- **verifyAccessToken / verifyRefreshToken**: valida firma con `PUBLIC_KEY`.
- **hashToken**: SHA-256 para persistencia segura.
- **setRefreshTokenCookie**: cookie httpOnly, secure en prod, `sameSite` strict/lax, `path: /api`.
- **clearRefreshTokenCookie**: limpia cookie de refresh.

## validateAuth (JWT Middleware)

- Lee `Authorization: Bearer <token>`.
- Verifica con `PUBLIC_KEY` (RS256).
- Carga usuario por email y adjunta en `req.user`.
- Valida roles contra permisos.

## Claves

- `PUBLIC_KEY` y `PRIVATE_KEY` soportan PEM directo o Base64.
- Convierte `\n` en saltos reales antes de usar.
