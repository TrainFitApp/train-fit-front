# Sistema de Autenticación Seguro - Frontend

## ✅ Mejoras Implementadas

### 1. **Gestión Segura de Tokens**

#### Access Token

- **Almacenamiento**: LocalStorage (solo access token)
- **Duración**: 15 minutos
- **Uso**: Se envía en header `Authorization: Bearer <token>` en cada petición
- **Rotación**: Se renueva automáticamente cuando expira

#### Refresh Token

- **Almacenamiento**: Cookie HttpOnly (manejada por el navegador)
- **NO se almacena en LocalStorage/SessionStorage**
- **NO es accesible desde JavaScript**
- **Se envía automáticamente con `withCredentials: true`**

### 2. **Interceptor HTTP Mejorado**

El `JWTInterceptor` implementa:

```typescript
// ✅ Añade access token automáticamente
// ✅ Detecta expiración (401)
// ✅ Intenta refresh automáticamente
// ✅ Reintenta la petición original
// ✅ Logout si refresh falla
// ✅ Respeta flag requiresRelogin del backend
```

**Flujo de renovación automática:**

```
1. Petición falla con 401
2. Backend responde con { requiresRelogin: true/false }
3. Si requiresRelogin: true → Logout inmediato (token robado)
4. Si false → Intenta refresh
5. POST /api/users/refresh-token (cookie enviada automáticamente)
6. Guarda nuevo access token
7. Reintenta petición original
8. Si refresh falla → Logout
```

### 3. **Servicio de Autenticación**

#### Login

```typescript
authService.login(email, password).subscribe({
  next: () => {
    // Token guardado automáticamente
    // Refresh token en cookie HttpOnly
  },
});
```

#### Logout Seguro

```typescript
authService.logout(); // Llama al backend para:
// 1. Invalidar refresh token en BD
// 2. Limpiar cookie HttpOnly
// 3. Limpiar localStorage
// 4. Redirigir a login
```

#### Refresh Token

```typescript
// Se llama automáticamente por el interceptor
// También puedes llamarlo manualmente:
authService.refreshToken().subscribe({
  next: (response) => {
    // Nuevo access token guardado
    // Nuevo refresh token en cookie
  },
});
```

### 4. **Servicio HTTP Actualizado**

Ahora soporta `withCredentials` para enviar cookies:

```typescript
// GET con cookies
http.get("endpoint", headers, true);

// POST con cookies
http.post("endpoint", body, headers, true);
```

**Uso interno automático:**

- `/users/refresh-token` → `withCredentials: true`
- `/users/logout` → `withCredentials: true`

### 5. **Servicio de Seguridad (Nuevo)**

Funcionalidades adicionales:

```typescript
// Verificar expiración proactiva
securityService.startTokenExpirationCheck(() => {
  // Se ejecuta si el token expira en menos de 2 min
  authService.refreshToken();
});

// Limpiar todos los datos sensibles
securityService.clearAllSecurityData();

// Generar state para OAuth
const state = securityService.generateRandomState();

// Validar state de OAuth
securityService.validateState(requestState, responseState);
```

## 🔒 Protecciones Implementadas

### XSS (Cross-Site Scripting)

✅ Refresh token NO es accesible desde JavaScript
✅ Cookie HttpOnly protege contra robo por código malicioso
✅ Access token en localStorage es de corta duración (15 min)

### CSRF (Cross-Site Request Forgery)

✅ Cookie con `SameSite: strict`
✅ Backend valida origen de peticiones

### Token Theft Detection

✅ Backend compara hash del refresh token con BD
✅ Si no coincide → invalida todas las sesiones
✅ Frontend respeta flag `requiresRelogin`

### Token Rotation

✅ Cada refresh genera nuevos tokens
✅ Tokens viejos no funcionan
✅ Previene replay attacks

## 📋 Checklist de Migración

### Backend ✅

- [x] Cookie parser instalado
- [x] CORS con credentials habilitado
- [x] Refresh token hasheado en BD
- [x] Token rotation implementado
- [x] Endpoint de logout
- [x] Flag requiresRelogin en respuestas

### Frontend ✅

- [x] HttpService soporta withCredentials
- [x] AuthApiService usa POST para refresh
- [x] AuthService llama a logout endpoint
- [x] Interceptor maneja requiresRelogin
- [x] No se guarda refresh token en localStorage
- [x] Servicio de seguridad creado

## 🚀 Uso en Componentes

### Login

```typescript
onLogin() {
  this.authService.login(email, password).subscribe({
    next: () => {
      // Redirigir a dashboard
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      // Mostrar error
      this.showError(err.message);
    }
  });
}
```

### Logout

```typescript
onLogout() {
  this.authService.logout();
  // Automáticamente limpia y redirige
}
```

### Peticiones Autenticadas

```typescript
// El interceptor añade el token automáticamente
this.http.get("users/profile").subscribe({
  next: (data) => {
    // Si el token expira, se renueva automáticamente
    // La petición se reintenta con el nuevo token
  },
});
```

### Verificar Autenticación

```typescript
// En guards
canActivate(): boolean {
  return this.authService.isAuthenticated();
}

// En componentes
ngOnInit() {
  this.authService.user$.subscribe(user => {
    if (user) {
      // Usuario autenticado
    }
  });
}
```

## 🔧 Configuración de Entorno

### Development

```typescript
// environment.ts
export const environment = {
  production: false,
  API_URL: "http://localhost:3000/api",
};
```

### Production

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  API_URL: "https://api.trainfit.net/api",
};
```

## 📊 Diagrama de Flujo

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ 1. Login
       ▼
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ 2. POST /users/sign-in
       │    (email, password)
       ▼
┌─────────────┐
│   Backend   │───────┐
└──────┬──────┘       │ 3. Genera tokens
       │              │    - Access (15min)
       │◄─────────────┘    - Refresh (7 días)
       │
       │ 4. Respuesta:
       │    - access_token (JSON)
       │    - refresh_token (Cookie HttpOnly)
       ▼
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ 5. Guarda access_token en localStorage
       │    (Refresh en cookie, automático)
       │
       │ 6. Peticiones con Authorization: Bearer
       ▼
┌─────────────┐
│   Backend   │
└──────┬──────┘
       │ 7. Valida access_token
       │
       ├─── ✅ Válido → Responde
       │
       └─── ❌ Expirado → 401 + Token expired
              │
              ▼
       ┌─────────────┐
       │ Interceptor │
       └──────┬──────┘
              │ 8. POST /users/refresh-token
              │    (cookie enviada automáticamente)
              ▼
       ┌─────────────┐
       │   Backend   │
       └──────┬──────┘
              │ 9. Valida refresh token (cookie)
              │    Compara hash con BD
              │
              ├─── ✅ Válido → Nuevos tokens
              │    (Token rotation)
              │
              └─── ❌ Inválido → 401 + requiresRelogin: true
                     │
                     ▼ Logout automático
```

## 🔍 Debugging

### Ver cookies en DevTools

1. Abrir DevTools → Application → Cookies
2. Buscar `refreshToken`
3. Verificar flags: `HttpOnly`, `Secure`, `SameSite`

### Verificar tokens

```typescript
// En consola del navegador
const token = JSON.parse(localStorage.getItem("currentUser"));
console.log("Access Token:", token.access_token);

// Decodificar
const payload = JSON.parse(atob(token.access_token.split(".")[1]));
console.log("Payload:", payload);
console.log("Expira:", new Date(payload.exp * 1000));
```

### Logs del interceptor

El interceptor registra en consola:

- Intentos de refresh
- Errores de autenticación
- Logout forzados

## 🎯 Próximos Pasos Opcionales

1. **Rate Limiting en Frontend**

   - Limitar intentos de login
   - Prevenir fuerza bruta

2. **Verificación Proactiva de Expiración**

   - Usar `SecurityService.startTokenExpirationCheck()`
   - Refrescar antes de que expire

3. **Fingerprinting de Dispositivo**

   - Detectar cambios de dispositivo
   - Requerir re-autenticación

4. **Biometría (Capacitor)**

   - TouchID / FaceID
   - Autenticación local adicional

5. **Offline Support**
   - Token cache con expiración
   - Queue de peticiones fallidas

## 📱 Configuración Capacitor (iOS/Android)

Para que las cookies funcionen en Capacitor:

```typescript
// capacitor.config.ts
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  // ...
  server: {
    cleartext: true, // Solo development
    hostname: "api.trainfit.net",
    androidScheme: "https",
    iosScheme: "https",
  },
  plugins: {
    CapacitorHttp: {
      enabled: true, // Usa HTTP nativo para manejar cookies
    },
  },
};
```

## 🛡️ Security Checklist Final

- [x] Refresh token en cookie HttpOnly
- [x] Access token de corta duración
- [x] Token rotation implementado
- [x] Logout limpia BD y cookies
- [x] Interceptor maneja renovación automática
- [x] Detección de robo de tokens
- [x] CORS con credentials
- [x] HTTPS en producción
- [x] No se exponen tokens sensibles
- [x] Manejo de errores robusto

## 📞 Soporte

Si encuentras problemas:

1. Verifica que el backend esté actualizado
2. Comprueba que CORS permita credentials
3. Revisa que las cookies se estén enviando (DevTools)
4. Verifica logs del interceptor
5. Confirma que el dominio sea correcto (no usar localhost con cookies en producción)
