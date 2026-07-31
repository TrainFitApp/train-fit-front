# F16 — Portal web para PC

**Prioridad**: P0 (confirmado como requisito por el usuario, coste marginal casi nulo). **Fase**: 5 (depende de que las pantallas móviles ya existan).

## 1. Objetivo

Que un profesional pueda gestionar sus clientes desde el navegador de un ordenador, no solo desde el móvil — sin construir una segunda app ni infraestructura nueva.

## 2. Alcance exacto para el MVP

- El mismo proyecto Angular/Ionic (`apps/train-fit-trainers`) se publica también como build web (`ionic build` sin `cap sync`), desplegado en un subdominio propio (p. ej. `entrenadores.trainfit.net`).
- Todas las funcionalidades P0 (F01-F15) deben ser usables desde este build web, sin ninguna característica exclusiva de móvil que las bloquee (p. ej. si alguna pantalla asumiera un plugin de Capacitor no disponible en web, debe tener un fallback).
- Pase de diseño responsive mínimo: la navegación por tabs inferiores se adapta a una navegación lateral (o superior) en viewports anchos; los listados de una columna se adaptan a más densidad de información en pantalla ancha.

## 3. Qué NO se incluye en el MVP

- No se crea una app/proyecto separado para el portal web — es exactamente el mismo código (ver justificación técnica en el punto 7).
- No se incluye en el MVP el pulido avanzado de escritorio (vistas de tabla completas para listados, acciones en bloque) — eso es `funcionalidades/F30-actualizar-en-bloque.md` y refinamientos de UI, P1. El MVP de este archivo es "funciona correctamente en una ventana ancha de escritorio", no "está optimizado al máximo para ratón y teclado".

## 4. Flujos de usuario paso a paso

Ninguno propio — son los MISMOS flujos que F01-F15, ejecutados desde un navegador de escritorio en vez de la app nativa. El único flujo nuevo es el de ACCESO: el profesional visita la URL del portal en vez de abrir la app instalada, inicia sesión igual (email/password o social), y llega al mismo dashboard.

## 5. Pantallas necesarias

Ninguna pantalla nueva — son las mismas de F01-F15, con su CSS adaptado a viewports anchos.

## 6. Componentes UI requeridos

- Navegación lateral (sidebar) como alternativa a los tabs inferiores en viewports por encima de un breakpoint definido (p. ej. `768px` o el que se decida en la fase de diseño).
- El resto de componentes son los mismos de F01-F15, con estilos `@media` adicionales donde haga falta.

## 7. Lógica de negocio

**Hallazgo técnico que sostiene esta funcionalidad completa** (verificado directamente en el `package.json` de `train-fit-management`, el precedente más cercano en este monorepo):
```json
"scripts": {
  "start": "ionic serve",
  "build": "ionic build",   // sin `cap sync` — esto YA es un build web puro y desplegable
  "build:pre": "ionic build --configuration=pre",
  "build:pro": "ionic build --configuration=production"
},
"homepage": "https://trainfit.net"
```
Un proyecto Ionic/Angular de este monorepo produce, por defecto, un build web (`www/`) sin ningún paso de Capacitor — el `cap sync`/`cap run` es un paso ADICIONAL que solo se ejecuta en los scripts `build:i:*`/`build:a:*` para empaquetar nativo. `train-fit-management` demuestra que este build web ya se sirve como sitio real en producción (`trainfit.net`).

**Autenticación**: cero cambios — `AuthService` ya distingue comportamiento nativo (token en `capacitor-secure-storage-plugin`) vs. web (cookie `HttpOnly`) según `Capacitor.getPlatform()`. Es el mismo mecanismo que ya usa `train-fit-front` cuando se abre en un navegador de escritorio hoy mismo, sin ningún cambio para esta app nueva.

## 8. Dependencias con otros módulos

- Depende de: TODAS las funcionalidades P0 (F01-F15) — no tiene sentido hacer el pase responsive antes de que las pantallas existan y funcionen (ver `00-orden-implementacion.md`).
- Depende de: `arquitectura/01-scaffold-nueva-app.md` (los scripts `build:pre:t`/`build:pro:t` ya definidos ahí).
- Depende de: `arquitectura/03-autenticacion-y-roles.md` (si el dominio del portal web requiere una entrada nueva en CORS, ver ese archivo, sección 3).

## 9. Validaciones

Ninguna nueva de dominio.

## 10. Casos límite y posibles errores

- **CORS**: los orígenes permitidos en `app.js` son hoy por esquema (`capacitor://localhost`, `ionic://localhost`, `https://localhost`, `http://localhost:8100`) — ninguno cubre un dominio real de producción como `entrenadores.trainfit.net`. **Este es el caso límite más probable de toda esta funcionalidad** — si no se añade el origen exacto del portal web a la lista de CORS permitidos, todas las peticiones desde el navegador en producción fallarán silenciosamente con errores de CORS, no con un error de negocio claro. Verificar contra qué origen exacto sirve hoy `trainfit.net` en producción y replicar esa configuración exacta para el subdominio nuevo.
- **Alguna pantalla de F01-F15 usa un plugin de Capacitor no disponible en navegador** (p. ej. si `F25-foto-perfil-profesional.md`, P1, usa la cámara nativa): debe tener un fallback web (input de archivo estándar del navegador) — revisar cada funcionalidad que use un plugin nativo antes de dar el portal web por completo.
- **El usuario abre el portal web en un móvil** (no la app nativa, el navegador del móvil): el CSS responsive debe seguir funcionando razonablemente bien en esa combinación también — no es un caso a ignorar, es un caso real (alguien podría preferir no instalar la app y usar el navegador de su móvil).

## 11. Estructura de datos necesaria

Ninguna.

## 12. Endpoints/API necesarios

Ninguno nuevo — el backend no distingue si la petición viene del build nativo o del build web salvo por `platform` en el header `x-client-platform` (ya existente, gestionado por el interceptor JWT sin cambios).

## 13. Criterios de aceptación verificables

- [ ] `npm run build:pre:t` produce un `www/` que, servido localmente, permite completar el login y navegar el dashboard sin errores de consola.
- [ ] Ninguna petición HTTP desde ese build falla por CORS cuando se sirve desde el dominio de producción real (no solo `localhost`).
- [ ] Las pantallas F01-F15 son usables (no rotas, no inaccesibles) en un viewport de escritorio (p. ej. 1280×800).
- [ ] La navegación se adapta razonablemente entre el layout de tabs (móvil) y sidebar (escritorio) en el breakpoint definido.

## 14. Checklist de implementación

- [ ] Confirmar/añadir el origen de producción del portal web a la configuración de CORS.
- [ ] Verificar que ninguna pantalla de F01-F15 depende de un plugin nativo sin fallback web.
- [ ] Pase de CSS responsive (sidebar vs. tabs, densidad de listados) sobre las pantallas ya construidas.
- [ ] Verificar los 4 criterios de aceptación.
