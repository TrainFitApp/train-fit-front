# Workflows de despliegue

`mobile-release.yml` construye y publica las apps Capacitor del monorepo.
Se lanza a mano desde la pestaña **Actions → Mobile release → Run workflow**.

## Grafo de trabajos

```
prepare ──> build-web ──┬──> android ──> Google Play
                        └──> ios     ──> TestFlight
```

`build-web` compila Angular una sola vez en un runner Linux y publica `www/`
como artefacto. `android` e `ios` lo descargan y arrancan **en paralelo**: entre
ellos no hay ninguna dependencia.

## Secretos necesarios

Repositorio → Settings → Secrets and variables → Actions.

### Android

| Secreto | Qué es |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | El `.jks`/`.keystore` de release en base64: `base64 -i release.keystore \| pbcopy` |
| `ANDROID_KEYSTORE_PASSWORD` | Contraseña del almacén |
| `ANDROID_KEY_ALIAS` | Alias de la clave dentro del almacén |
| `ANDROID_KEY_PASSWORD` | Contraseña de esa clave |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | JSON completo de la cuenta de servicio con permiso de release en Play Console |

### iOS

| Secreto | Qué es |
| --- | --- |
| `APPLE_CERTIFICATE_P12_BASE64` | Certificado *Apple Distribution* exportado con su clave privada, en base64 |
| `APPLE_CERTIFICATE_PASSWORD` | Contraseña con la que se exportó el `.p12` |
| `APP_STORE_CONNECT_KEY_ID` | Key ID de la clave de API de App Store Connect |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID de esa clave |
| `APP_STORE_CONNECT_PRIVATE_KEY` | Contenido íntegro del `.p8`, saltos de línea incluidos |

La clave de App Store Connect necesita rol **App Manager** o superior: con
`-allowProvisioningUpdates` es ella la que crea y renueva los perfiles de los dos
bundle IDs (`com.trainfit.trainfit` y `com.trainfit.trainfit.TrainFitWidget`).

### Variables opcionales

| Variable | Por defecto |
| --- | --- |
| `APPLE_TEAM_ID` | `4YRKMJXVS6` |
| `ANDROID_PACKAGE_NAME` | `com.trainfit.trainfit` |

## Numeración de versiones

- **Android**: `versionCode` = `ANDROID_VERSION_CODE_BASE` (101347, definido en el
  workflow) + número de ejecución. Google Play exige que sea estrictamente
  creciente; el contador de runs nunca retrocede.
- **iOS**: `CURRENT_PROJECT_VERSION` = número de ejecución.
- La versión visible se puede forzar en el input `marketing_version`.

## Requisitos del repositorio

- `apps/*/ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme` debe estar
  **commiteado**. Xcode solo crea el esquema en `xcuserdata/`, que está ignorado,
  y sin esquema compartido `xcodebuild -scheme App` falla en un clon limpio.
- Todo el código nativo (`ios/App/App/LiveActivity/`, `ios/App/TrainFitWidget/`)
  tiene que estar commiteado: el `project.pbxproj` lo referencia y el archive
  falla si falta.
- No se usan los scripts `build:pro`/`build:i`/`build:a`: dependen de
  `@ionic/cli`, que no está en las dependencias del repo. El workflow llama a
  `ng build` y `cap sync` directamente.
