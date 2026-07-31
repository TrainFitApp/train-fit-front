# F10 — Lectura de datos de nutrición del cliente

**Prioridad**: P0. **Fase**: 3.

## 1. Objetivo

Dar al profesional con relación `nutrition` visibilidad de: dieta activa día a día, objetivos de macros del cliente. Igual que `F09`, es wrapping de DAOs existentes con autorización encima.

## 2. Alcance exacto para el MVP

- Dieta activa del cliente, navegable día a día (misma estructura `Diet > DietDay > Meal` que ve el propio cliente).
- Objetivos de macros actuales del cliente (`nutritionalGoals` ya existente).

## 3. Qué NO se incluye en el MVP

- No se muestra adherencia calculada en este archivo — eso es `F20-adherencia-nutricional.md`, P1, con su propia agregación.
- No se muestran preferencias nutricionales del cliente en este archivo — eso es `F29-preferencias-nutricionales-cliente.md`, P1 (aunque son datos de lectura muy relacionados, se documentan por separado porque su origen de datos es distinto: un formulario fijo nuevo, no `Diet`/`DietDay` existentes).

## 4. Flujos de usuario paso a paso

1. El profesional entra al detalle de un cliente (`F06`) con relación `nutrition`.
2. Ve la dieta activa: selector de día (calendario, mismo patrón que `diets.page` del cliente), comidas de ese día con productos/recetas y sus macros.
3. Ve los objetivos de macros configurados actualmente para el cliente.

## 5. Pantallas necesarias

- Sección "Nutrición" dentro del detalle de cliente (`F06`) — parte de esa composición, no una pantalla independiente.

## 6. Componentes UI requeridos

- Reutiliza, en modo solo lectura, los componentes ya existentes de `diets.page`/`meal.component` (selector de calendario, tarjetas de comida) — sin las acciones de edición propias del dueño de la dieta (añadir producto, borrar, copiar/pegar), que no tienen sentido en modo lectura de un tercero.

## 7. Lógica de negocio

Ninguna nueva. El controller de `/trainer/clients/:clientId/diet`:
1. Pasa por `requireActiveClient("nutrition")`.
2. Llama a `dietDayModel.getDietDayByIdDietAndDate(clientId, date)`/`dietModel` equivalentes, ya existentes, sustituyendo el `idUser` de la sesión por `clientId`.
3. Devuelve el resultado vía el DTO ya existente de `DietDay`/`Meal`.

Para objetivos de macros: llama al DAO ya existente de `nutritionalGoals`, parametrizado por `clientId`.

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md`.
- Depende de (sin modificarlos): `diet-dao.js`, `diet-days-dao.js`, `meal-dao.js`, el DAO de `nutritionalGoals`.
- Es un prerequisito de: `F06`, `F12-pautar-comida.md` (el nutricionista necesita ver la dieta actual antes de pautar algo sobre ella).

## 9. Validaciones

Ninguna nueva de dominio — hereda las de los DAOs reutilizados.

## 10. Casos límite y posibles errores

- **El cliente no tiene ninguna dieta activa** (`user.dietInUse` vacío): mostrar estado vacío, igual que `F09` para rutinas.
- **El cliente no tiene objetivos de macros configurados**: estado vacío, con indicación clara de que el nutricionista puede asignarlos (`F13`).
- **El profesional con scope `training` (sin `nutrition`) intenta acceder**: 403 vía `requireActiveClient("nutrition")`.

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

- `GET /trainer/clients/:clientId/diet` — requiere relación `nutrition`. Debe aceptar un parámetro de fecha (query `?date=YYYY-MM-DD`) para navegar día a día, igual que el cliente navega su propio calendario de dietas.
- Endpoint (puede ser el mismo o uno separado, decisión de implementación) para los objetivos de macros actuales — `GET /trainer/clients/:clientId/nutritional-goals` si se separa de `/diet`.

## 13. Criterios de aceptación verificables

- [ ] Un profesional con scope `nutrition` ve la dieta del cliente para una fecha concreta, idéntica en contenido a lo que el cliente ve en su propia app para esa fecha.
- [ ] Un profesional con scope `training` (sin `nutrition`) recibe 403 al intentar este endpoint.
- [ ] Los objetivos de macros mostrados coinciden con los realmente configurados para el cliente.
- [ ] Navegar entre distintas fechas del calendario de dieta del cliente funciona correctamente desde la vista del profesional.

## 14. Checklist de implementación

- [x] Endpoint(s) con `requireActiveClient("nutrition")` y wrapping de los DAOs existentes.
- [x] Sección de UI dentro de `F06` con selector de fecha.
- [ ] Verificar los 4 criterios de aceptación.
