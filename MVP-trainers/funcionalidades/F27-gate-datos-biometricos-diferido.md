# F27 — Gate de datos biométricos diferido (profesional que usa TrainFit normal como cliente)

**Prioridad**: P1. **Fase**: 6. Depende de `F01`.

## 1. Objetivo

Cuando un profesional que se registró SIN datos biométricos (`F01`) abre TrainFit normal (la app de consumidor) e intenta usar una función que necesita esos datos (cálculo de calorías, nutrición), pedírselos en ese momento en vez de asumir que ya los tiene.

## 2. Alcance exacto para el MVP

- Reutilizar `data-sheet.page.ts` (ya existente en TrainFit consumidor) como un gate contextual: se muestra la primera vez que el usuario entra a una pantalla que depende de `weight`/`height`/`sex`/`activity`/`objetive`/`birth` y alguno falta.
- Tras completarlo, el usuario continúa a la pantalla que intentaba usar.

## 3. Qué NO se incluye en el MVP

- No se fuerza a rellenar estos datos en ningún otro momento (login, apertura de la app) — solo quedan pedidos EN EL MOMENTO en que hacen falta.
- No se distingue entre "profesional usando TrainFit como cliente" y "cualquier otro usuario con datos incompletos por cualquier motivo" — el gate es genérico, se dispara por datos faltantes, no por el rol del usuario.

## 4. Flujos de usuario paso a paso

1. Un usuario con `roles: ["trainer"]` (registrado vía `F01`, sin biométricos) decide llevar también su propio seguimiento y se añade el rol `"user"` a sí mismo (autoservicio, fuera del alcance de este archivo — p. ej. desde `configuration.page` de TrainFit), quedando `roles: ["trainer", "user"]`. Solo entonces abre TrainFit normal (la app de consumidor) como cliente — un profesional con `roles: ["trainer"]` puro no puede ser invitado ni actuar como cliente de nadie, ni siquiera de sí mismo (`00-decisiones-pendientes.md` D6).
2. Login normal, llega al dashboard.
3. Intenta entrar a una pantalla de nutrición (p. ej. `nutritional-objectives` o cualquiera que dependa de `userService.calculateKcal`).
4. La app detecta que faltan campos biométricos y muestra `data-sheet.page` (o una variante contextual del mismo componente) en vez de la pantalla original.
5. El usuario completa sus datos, `calculateKcal` puede ejecutarse, y navega a la pantalla original que intentaba abrir.

## 5. Pantallas necesarias

Ninguna nueva — reutiliza `data-sheet.page.ts` tal cual, con el punto de entrada cambiado (hoy solo se invoca durante el registro; aquí se invoca también como gate contextual desde cualquier punto de la app que lo necesite).

## 6. Componentes UI requeridos

Ninguno nuevo.

## 7. Lógica de negocio

- Un guard de Angular (`CanActivate`/`CanMatch`, mismo patrón ya usado por `authMatchGuard`) que compruebe, antes de activar las rutas que dependen de biométricos, si `User.weight`/`height`/`sex`/`activity`/`objetive`/`birth` están completos — si falta alguno, redirige a `data-sheet.page` con un parámetro de "volver a X ruta al terminar".
- **Identificar EXACTAMENTE qué rutas/pantallas dependen de estos datos** — no es "toda la app", es específicamente las de nutrición (`nutritional-objectives`, cualquier cálculo de `calculateKcal`). Esto requiere una revisión puntual de qué pantallas llaman a `calculateKcal` o equivalentes, no asumir una lista sin verificarla contra el código real al implementar.

## 8. Dependencias con otros módulos

- Depende de: `F01-registro-login-profesional.md` (el escenario que hace posible que un usuario llegue sin biométricos).
- Depende de (sin modificar el componente en sí, solo su punto de invocación): `data-sheet.page.ts`, `userService.calculateKcal`.

## 9. Validaciones

Ninguna nueva — reutiliza las validaciones ya existentes de `data-sheet.page.ts`.

## 10. Casos límite y posibles errores

- **El usuario cierra `data-sheet.page` sin completarlo** (navega hacia atrás): debe volver a donde estaba antes, sin acceder a la pantalla que requería los datos — no dejar la app en un estado roto a medio completar.
- **El usuario ya tiene ALGUNOS campos pero no todos** (p. ej. completó el registro social parcialmente en otro contexto): el gate debe pedir solo lo que falta, no repetir todo el formulario desde cero si ya hay datos parciales guardados.

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

Ninguno nuevo — reutiliza `PUT /api/users` (actualización de perfil) ya existente.

## 13. Criterios de aceptación verificables

- [ ] Un profesional sin biométricos que intenta abrir una pantalla de nutrición ve el gate en vez de un error o un cálculo incorrecto (p. ej. `NaN` en kcal).
- [ ] Completar el gate navega de vuelta a la pantalla original que se intentaba abrir.
- [ ] Un usuario con datos biométricos completos nunca ve este gate (no debe aparecer para el 99% de usuarios normales de TrainFit que ya pasaron por el registro estándar).

## 14. Checklist de implementación

- [ ] Identificar las rutas/pantallas exactas que dependen de biométricos (revisión de código, no suposición).
- [ ] Guard de Angular con la comprobación descrita.
- [ ] Verificar los 3 criterios de aceptación.
