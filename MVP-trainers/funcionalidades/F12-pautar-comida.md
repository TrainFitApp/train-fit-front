# F12 — Pautar una comida concreta al cliente

**Prioridad**: P0. **Fase**: 4 (escritura — riesgo de seguridad, ver `00-riesgos.md` R1; también el riesgo de reutilización de nutrición, R3).

## 1. Objetivo

Permitir que un nutricionista (relación `nutrition`) componga una comida (productos/recetas concretos) y la aplique sobre un hueco de comida del cliente (p. ej. "el desayuno del día 15"), reutilizando `mealDao.pasteMeal` — la misma función que sostiene el "portapapeles de comidas" ya existente en TrainFit consumidor (trabajado y depurado a fondo en la sesión que originó este plan).

## 2. Alcance exacto para el MVP

- Nivel de comida individual: el nutricionista pauta UNA comida (p. ej. "comida de mañana") de UN día concreto, no un día completo ni un plan multi-día de una sola vez.
- El nutricionista compone la comida seleccionando productos/recetas (reutiliza el mismo flujo de búsqueda de alimentos que ya usa el cliente, `search-foods.page`).
- Al confirmar, se aplica sobre la comida destino del cliente vía `pasteMeal(mealClipboard, mealToPaste, merge)`.

## 3. Qué NO se incluye en el MVP

- No se pauta un día completo de una vez ni un plan multi-día — eso requeriría un concepto de "plantilla de dieta" que no existe hoy en TrainFit (a diferencia de `tables`, que sí tiene `copyTable`/`duplicateTable`/plantillas públicas). Ver `00-riesgos.md` R3.
- No se pautan menús alternativos nombrados en el primer corte de este archivo — eso es `funcionalidades/F28-menus-alternativos-nombrados.md`, P1, una extensión de este mismo mecanismo.
- No se sustituye el mecanismo de "portapapeles de comidas" del cliente por otro — se reutiliza tal cual, el nutricionista simplemente actúa como origen del "portapapeles" hacia el destino del cliente.

## 4. Flujos de usuario paso a paso

1. Desde el detalle de cliente (`F06`), sección Nutrición, el nutricionista navega al día y comida que quiere pautar (reutilizando la navegación de calendario de `F10`).
2. Pulsa "Pautar esta comida".
3. Se abre el flujo de composición de comida (reutiliza `search-foods.page`/`add-product.page`/`config-recipe.page` ya existentes, en un contexto donde el "origen" no es una comida propia del nutricionista sino una composición ad-hoc para este cliente).
4. El nutricionista añade productos/recetas con sus cantidades, ve el resumen de macros en tiempo real (reutiliza los componentes ya existentes de resumen de macros).
5. Confirma. El backend construye el objeto `MealClipboard`-equivalente (mismo shape que ya usa `packages/shared-ui/src/app/shared/models/meal-clipboard.ts`) con la composición introducida, y llama a `pasteMeal(mealClipboard, mealToPaste=comidaDestinoDelCliente, merge=false o true según elija sustituir o añadir)`.
6. El cliente, la próxima vez que abra su dieta en esa fecha, ve la comida pautada, con el mismo mecanismo visual que si se la hubiera copiado a sí mismo.

## 5. Pantallas necesarias

- Selector de día/comida dentro de la sección Nutrición de `F06`.
- Flujo de composición de comida (reutiliza pantallas ya existentes de búsqueda de alimentos/recetas del cliente, adaptadas a que el "para quién" es el cliente, no el propio usuario autenticado).

## 6. Componentes UI requeridos

- Reutiliza al 100% los componentes de `search-foods.page`, `product.component`, `recipe-card.component`, el resumen de macros en tiempo real.
- Único componente nuevo: el selector de "sustituir" vs "añadir a lo que ya haya" en la comida destino (equivalente al diálogo `MEAL.PASTE_MERGE_MESSAGE` que ya existe en el flujo de portapapeles del cliente — reutilizar ese mismo copy/diálogo, no inventar uno nuevo).

## 7. Lógica de negocio

Backend, `POST /trainer/clients/:clientId/diet-days/:date/meals/:mealId/prescribe`:
1. `requireActiveClient("nutrition")`.
2. Body: `{ customProducts: [...], customRecipes: [...], merge: boolean }` (mismo shape que ya construye el frontend del cliente al usar su propio portapapeles).
3. El backend construye un objeto `MealClipboard` equivalente en memoria (no necesita persistirse como el portapapeles del cliente, que vive en un `BehaviorSubject` de frontend — aquí es una operación de un solo paso, servidor a servidor, no hace falta el estado intermedio de "portapapeles activo" que sí tiene sentido en la UI del cliente para su propio flujo de copiar/pegar entre comidas).
4. Llama a `mealDao.pasteMeal(mealClipboardConstruido, mealDestino, merge)` — **sin modificar esa función**, se reutiliza tal cual.
5. Devuelve la comida actualizada.

**Punto de verificación de seguridad específico de este endpoint** (más allá de `requireActiveClient`, que ya cubre "¿tiene el profesional relación con este cliente?"): confirmar que `mealId`/`date` corresponden efectivamente a una comida del `clientId` de la ruta — es decir, `dietDayModel.getDietDayByIdDietAndDate(clientId, date)` debe resolverse ANTES de llamar a `pasteMeal`, para que el `mealId` que se pasa como destino sea, sin lugar a dudas, una comida que pertenece a ESE cliente y no a otro. No confiar en un `mealId` suelto sin haberlo resuelto primero contra el `clientId` autorizado.

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md`.
- Depende de (sin modificar): `mealDao.pasteMeal`, `search-foods.page` y componentes relacionados del cliente.
- Depende de: `F10-lectura-nutricion-cliente.md` (el nutricionista necesita ver la dieta actual antes de pautar sobre ella).
- Relacionado con: `F28-menus-alternativos-nombrados.md` (P1, extiende esto a "más de una alternativa por hueco").

## 9. Validaciones

- `requireActiveClient("nutrition")`.
- El `mealId`/`date` deben resolverse contra el `clientId` de la ruta antes de operar (punto 7, verificación de seguridad).
- Los productos/recetas introducidos deben ser válidos (mismas validaciones que ya aplica el flujo de composición de comida del cliente — cantidades positivas, productos/recetas existentes).

## 10. Casos límite y posibles errores

- **El cliente no tiene ninguna dieta activa ese día** (`DietDay` no existe todavía para esa fecha): reutilizar el mismo comportamiento que ya tiene `createMealFromClipboard` en el cliente (crea el `DietDay` sobre la marcha si no existe, vía `getStandardDietDay`/`createDietDay`) — no inventar un comportamiento distinto para el flujo del profesional.
- **El nutricionista pauta sobre una comida que el cliente ya había modificado por su cuenta ese mismo día, momentos antes**: no hay bloqueo optimista ni control de concurrencia en el MVP — la operación de `pasteMeal` con `merge: false` sustituye lo que hubiera, con `merge: true` lo combina, igual que ya se comporta el mecanismo existente para el propio cliente. Es un comportamiento heredado, no un caso nuevo a resolver.
- **El profesional intenta pautar una comida usando un `mealId` que pertenece a OTRO cliente suyo** (adivinado o copiado de otra pestaña): debe rechazarse porque el paso de resolución del punto 7 (`getDietDayByIdDietAndDate(clientId, date)`) no encontrará ese `mealId` bajo el `clientId` correcto — esta es precisamente la comprobación que previene el mismo tipo de fallo de seguridad que se encontró esta sesión en `duplicateTable`/`copyTable` (ver `00-riesgos.md` R1). **No omitir este paso de resolución bajo ninguna circunstancia.**

## 11. Estructura de datos necesaria

Ninguna nueva — reutiliza `MealClipboard` (`packages/shared-ui/src/app/shared/models/meal-clipboard.ts`) como forma de construir el payload en memoria, sin persistirlo como colección nueva.

## 12. Endpoints/API necesarios

- `POST /trainer/clients/:clientId/diet-days/:date/meals/:mealId/prescribe` — requiere relación `nutrition`.

## 13. Criterios de aceptación verificables

- [ ] Pautar una comida nueva sobre un hueco vacío del cliente → aparece correctamente con los productos/recetas y macros correctos.
- [ ] Pautar con `merge: true` sobre una comida que ya tenía contenido → se combina, no se pierde lo anterior.
- [ ] Pautar con `merge: false` → sustituye completamente el contenido anterior.
- [ ] Un profesional con scope `training` (sin `nutrition`) no puede acceder a este endpoint.
- [ ] Intentar pautar usando un `mealId` de un cliente DISTINTO al de la ruta → rechazado, nunca aplica el cambio sobre el cliente equivocado.
- [ ] Si el `DietDay` de esa fecha no existía, se crea automáticamente (mismo comportamiento que el flujo del cliente).

## 14. Checklist de implementación

- [ ] Endpoint con la resolución de seguridad del punto 7 (resolver `mealId` contra `clientId` ANTES de `pasteMeal`).
- [ ] UI de composición de comida reutilizando pantallas existentes, adaptada al contexto "para un cliente".
- [ ] Verificar los 6 criterios de aceptación, con especial atención al criterio de seguridad (5º).
