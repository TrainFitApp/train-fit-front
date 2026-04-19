# 95 - Ads System (Anuncios)

## Resumen

TrainFit implementa un sistema de anuncios **AdMob** con:

- Anuncios intersticiales (full-screen)
- NPA dinámico según preferencia del usuario
- Consentimiento explícito del usuario
- Exclusión de usuarios premium

## Librerías

```json
{
  "@capacitor-community/admob": "^7.2.0"
}
```

**iOS (CocoaPods):**

- CapacitorCommunityAdmob (7.2.0)
- Google-Mobile-Ads-SDK (12.12.0)

**Android:**

- play-services-ads (dinámico via Capacitor)

## Configuración: NPA (Non-Personalized Ads)

### La Lógica Clave

```typescript
// En AdMobService.interstitial()
const options: AdOptions = {
  adId: platform.is("ios")
    ? "ca-app-pub-7032025540653355/2146101087"
    : "ca-app-pub-7032025540653355/3650415135",
  isTesting: !environment.production,
  npa: !user.personalAds, // 👈 KEY
};

// Lógica:
// user.personalAds = true  → npa = false → Ads personalizados
// user.personalAds = false → npa = true  → Ads genéricos (privacidad)
// user.personalAds = undefined → Mostrar modal (primera vez)
```

### Almacenamiento

**Backend - MongoDB:**

```javascript
// User schema
personalAds: Boolean; // null | true | false
```

**Frontend - TypeScript:**

```typescript
interface User {
  personalAds?: boolean;
  // ...
}
```

## Flujo Completo

### 1. Inicialización (App Start)

```typescript
// AdMobService constructor
constructor(...) {
  this.initialize();  // Automático
}

// initialize()
await AdMob.initialize();
await AdMob.trackingAuthorizationStatus();  // iOS ATT
await AdMob.requestConsentInfo();           // Google Consent
```

### 2. Mostrar Anuncio

**Dónde:** `ProfilePage.ngOnInit()`

```typescript
public ngOnInit(): void {
  this.initVariables();
  if (!this.user.isPremium) {
    this.adMobService.interstitial();
  }
}
```

**Flujo:**

1. Verificar si usuario es premium
2. Si NO premium → `interstitial()`
3. Si `personalAds === undefined` → Mostrar modal
4. Si `personalAds !== undefined` → Mostrar ad con NPA config

### 3. Solicitar Consentimiento

**Dónde:** Modal `AdPreferencesPage`

**Activación:**

- Primera vez que entra a ProfilePage (si `personalAds === undefined`)
- Usuario cliquea "Anuncios" en Settings

**Flujo:**

1. Modal muestra radio buttons:
   - ○ Anuncios personalizados
   - ○ Anuncios no personalizados
2. Usuario selecciona
3. Guardar en BD via `UserService.updateUser()`

```typescript
// AdMobService.consent()
const selectedOption: boolean = (
  await this.ionicUtilService.showModal(AdPreferencesPage)
).data;

user.personalAds = selectedOption;
await this.userService.updateUser(user).toPromise();
```

### 4. Mostrar Anuncio con NPA Configurado

```typescript
// AdMobService.interstitial() - continuación
const options: AdOptions = {
  adId: this._platform.is("ios")
    ? this.ID_IOS_INTERSECTIAL
    : this.ID_ANDROID_INTERSECTIAL,
  isTesting: !environment.production,
  npa: !user.personalAds, // NPA dinámico
};

await AdMob.prepareInterstitial(options);
await AdMob.showInterstitial();
```

## Componentes

### AdMobService

**Archivo:** `src/app/core/services/util/ad-mob.service.ts`

```typescript
@Injectable()
export class AdMobService {
  private readonly ID_ANDROID_INTERSECTIAL =
    'ca-app-pub-7032025540653355/3650415135';
  private readonly ID_IOS_INTERSECTIAL =
    'ca-app-pub-7032025540653355/2146101087';

  constructor(
    private readonly _platform: Platform,
    private readonly userService: UserService,
    private readonly ionicUtilService: IonicUtilService
  ) {
    this.initialize();
  }

  // Métodos principales
  public async initialize(): Promise<void> { ... }
  public async consent(user: User): Promise<void> { ... }
  public async interstitial(): Promise<void> { ... }
}
```

### AdPreferencesPage (Modal)

**Ubicación:** `src/app/features/profile/components/configuration/components/ad-preferences/`

**Archivos:**

- `ad-preferences.page.ts` - Lógica
- `ad-preferences.page.html` - UI (radio buttons + explicación)
- `ad-preferences.page.scss` - Estilos

**Contenido:**

- Explica diferencia entre ads personalizados vs genéricos
- Radio button group para seleccionar
- Botón "ACEPTAR" para guardar

### ProfilePage

**Ubicación:** `src/app/features/profile/profile.page.ts`

**Inyección:**

```typescript
constructor(
  private adMobService: AdMobService
) {}
```

**Llamada:**

```typescript
public ngOnInit(): void {
  if (!this.user.isPremium) {
    this.adMobService.interstitial();
  }
}
```

### ConfigurationPage

**Ubicación:** `src/app/features/profile/components/configuration/configuration.page.ts`

**Botón en HTML:**

```html
<ion-item button class="config-item" (click)="goToAdConsent()">
  <ion-icon name="notifications-outline"></ion-icon>
  <ion-label>
    <h3>Anuncios</h3>
  </ion-label>
</ion-item>
```

**Método:**

```typescript
public async goToAdConsent(): Promise<void> {
  await this.adMobService.consent(this.user);
}
```

## Backend API

### Endpoint: Actualizar Preferencia

```http
PUT /api/users/:userId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "personalAds": true  // o false
}
```

**Respuesta (200 OK):**

```json
{
  "_id": "...",
  "email": "...",
  "personalAds": true,
  "isPremium": false
  // ... otros campos
}
```

**Códigos de error:**

- `401`: Token expirado
- `403`: Sin permisos
- `404`: Usuario no existe
- `500`: Error del servidor

### UserService - updateUser()

```typescript
// src/app/core/services/user/user.service.ts
public updateUser(user: User): Observable<User> {
  return this.http
    .put<User>(`${this.apiUrl}/users/${user._id}`, user)
    .pipe(
      tap((updatedUser) => {
        this.localUser = updatedUser;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
    );
}
```

## Estados y Transiciones

```
App Start
  ↓
AdMobService.initialize()
  ├─ Request tracking authorization (iOS)
  ├─ Request consent info (Google)
  └─ Show consent form if required
  ↓
ProfilePage.ngOnInit()
  ├─ ¿user.isPremium?
  │  ├─ SÍ → Sin anuncios ✓
  │  └─ NO → interstitial()
  │         ├─ ¿personalAds === undefined?
  │         │  ├─ SÍ → consent() → Modal
  │         │  │       User selecciona
  │         │  │       updateUser() → BD
  │         │  └─ NO → skip consent
  │         ├─ Preparar AdOptions (npa: !personalAds)
  │         ├─ prepareInterstitial()
  │         └─ showInterstitial()
  │            ↓
  │            📺 AD SHOWN
```

## Dónde Aparecen Anuncios

### ProfilePage

- **Momento:** `ngOnInit()`
- **Condición:** `!user.isPremium`
- **Tipo:** Intersticial (full-screen)
- **Frecuencia:** Una vez por app start

### Settings (ConfigurationPage)

- **Botón:** "Anuncios"
- **Acción:** Abrir modal de preferencias
- **No muestra ad:** Solo permite cambiar configuración

## Testing

### Modo Test vs Production

```typescript
isTesting: !environment.production

// environment.ts (dev)
production: false → isTesting: true
  → Anuncios de TEST (no generan ingresos)

// environment.prod.ts (prod)
production: true → isTesting: false
  → Anuncios REALES (generan ingresos)
```

### Casos de Prueba

**1. Nuevo Usuario**

- personalAds === undefined
- → Modal AdPreferences
- Selecciona opción
- → Guardado en BD
- → Ad mostrado con NPA config

**2. Usuario Existente (Personalizado)**

- personalAds === true
- → Skip modal
- → Ad con npa: false

**3. Usuario Existente (NPA)**

- personalAds === false
- → Skip modal
- → Ad con npa: true

**4. Usuario Premium**

- isPremium === true
- → NO entra en if (!isPremium)
- → SIN ANUNCIOS

**5. Cambiar Preferencia**

- Settings → Anuncios
- Modal AdPreferences
- Selecciona opción diferente
- → updateUser()
- → BD actualizada
- → Próximo ad con nueva config

## Compliance & Privacy

### GDPR/CCPA

- ✅ Consentimiento explícito (modal)
- ✅ Opt-out fácil (Settings)
- ✅ NPA flag enviado a Google
- ✅ Preferencia auditable en BD

### iOS (ATT)

- ✅ `trackingAuthorizationStatus()` check
- ✅ `requestTrackingAuthorization()` si necesario
- ✅ ATT compliant

### Android (Consent Mode)

- ✅ `requestConsentInfo()` de Google
- ✅ `showConsentForm()` si requerido

## Ad Unit IDs

```
Publisher ID: ca-app-pub-7032025540653355

Android:
  ID: 3650415135
  Full: ca-app-pub-7032025540653355/3650415135
  Platform check: this._platform.is('android')

iOS:
  ID: 2146101087
  Full: ca-app-pub-7032025540653355/2146101087
  Platform check: this._platform.is('ios')
```

## Integración Capacitor

**capacitor.config.ts:**

```typescript
const config: CapacitorConfig = {
  appId: "com.trainfit.trainfit",
  appName: "TrainFit",
  webDir: "www",
  // AdMob auto-configurado desde
  // @capacitor-community/admob
};
```

**iOS Podfile:**

```ruby
pod 'CapacitorCommunityAdmob', :path => '../../node_modules/@capacitor-community/admob'
pod 'Google-Mobile-Ads-SDK', '= 12.12.0'
```

## Checklist de Implementación

- [x] Librería instalada (@capacitor-community/admob@7.2.0)
- [x] AdMobService registrado en CoreModule
- [x] Inyectado en ProfilePage
- [x] Inyectado en ConfigurationPage
- [x] Ad Unit IDs configurados (iOS + Android)
- [x] Modal de consentimiento funcional
- [x] Preferencia guardada en User.personalAds
- [x] NPA dinámico configurado
- [x] Testing mode en desarrollo
- [x] Premium users sin anuncios
- [x] Endpoints API funcionando
- [x] Error handling implementado

## Enlaces Relacionados

- Backend: `components/users/schema.js` (field personalAds)
- Frontend: `src/app/core/services/util/ad-mob.service.ts`
- Modal: `src/app/features/profile/components/configuration/components/ad-preferences/`
- ProfilePage: `src/app/features/profile/profile.page.ts`
- ConfigurationPage: `src/app/features/profile/components/configuration/configuration.page.ts`

## Referencias Externas

- Google AdMob: https://admob.google.com
- Capacitor AdMob: https://github.com/capacitor-community/admob
- Google Mobile Ads SDK: https://developers.google.com/admob
