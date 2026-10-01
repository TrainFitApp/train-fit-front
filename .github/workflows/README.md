# Workflows

| Workflow | Cuándo | Qué hace |
| --- | --- | --- |
| `web-ci.yml` | push a `main`, o a mano | lint + tests + build de las tres apps. **No despliega** |
| `mobile-release.yml` | a mano (**Actions → Mobile release → Run workflow**) | construye y publica las apps Capacitor en Google Play y TestFlight |

## Quién despliega qué

| Rama | Entorno | Web de trainers | Apps móviles |
| --- | --- | --- | --- |
| `develop` | PRE | app de Cloudflare `train-fit-trainers-pre`, automática en cada push | a mano (`build:i:pre` / `build:a:pre`) |
| `main` | PRO | app de Cloudflare `train-fit-trainers`, automática en cada push | `mobile-release.yml` |

Cloudflare compila y publica por su cuenta, sin mirar el resultado de
`web-ci.yml`. Lo que protege las dos ramas es el hook local `.githooks/pre-push`
(lint + tests antes de cualquier push a `develop` o `main`). `web-ci.yml` es la
segunda red para `main`: pilla lo que entra sin pasar por el hook (un merge
desde la web de GitHub, un `--no-verify`).

---

# Web CI (`web-ci.yml`)

```
lint ──┐
test ──┴──> build (3 apps en paralelo, build:pro)
```

- `lint` y `test` corren a la vez. `build` es matriz sobre las tres apps porque
  comparten `packages/`: un cambio ahí puede romper el AOT de una app y compilar
  en otra.
- `test` usa **Node 22**: varios tests importan los `.ts` de la app con
  `--experimental-strip-types`, que Node 20 no conoce. Lint y build siguen en
  Node 20.
- No hay secretos. Lo que cambia entre entornos (API, client IDs de
  Google/Apple, claves de RevenueCat) está en
  `apps/<app>/src/environments/environment.pre.ts` y `environment.prod.ts`, y lo
  elige `fileReplacements` de `angular.json`. MongoDB no se configura en el
  front: la web habla solo con la API.

---

# Móvil (`mobile-release.yml`)

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
- Los scripts de build de cada app llaman a `ng build`, no a `ionic build`:
  `@ionic/cli` no está en las dependencias del repo y en un clon limpio fallaría
  con "ionic: command not found". `ionic build` no es más que `ng build`. Los
  scripts que sí necesitan el CLI de Ionic (`serve*`, `live:*`) son solo de uso
  local.
