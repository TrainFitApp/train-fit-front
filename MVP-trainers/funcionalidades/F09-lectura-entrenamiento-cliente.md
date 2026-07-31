# F09 — Lectura de datos de entrenamiento del cliente

**Prioridad**: P0. **Fase**: 3.

## 1. Objetivo

Dar al profesional con relación `training` visibilidad de: rutina activa del cliente, peso reciente, e historial de entrenamientos completados. Es la funcionalidad de menor riesgo técnico de todo el proyecto — es 100% wrapping de DAOs ya existentes con una capa de autorización encima, sin lógica de negocio de dominio nueva.

## 2. Alcance exacto para el MVP

- Rutina activa del cliente (misma estructura que ve el propio cliente en TrainFit: `Table > Split > Workout > CustomExercise > Set`).
- Peso reciente (últimas N entradas de `Anthropometry`).
- Historial de entrenamientos completados (misma agregación que ya usa `getExerciseHistoryStats`/`statistics.page` del cliente).
- Notas por ejercicio ya existentes (`CustomExercise.notes`) — visibles, no hace falta construir nada nuevo para esto (ver `PLAN_TRAINFIT_ENTRENADORES.md` §10.4).

## 3. Qué NO se incluye en el MVP

- No se muestra el Índice de Estímulo Muscular/Articular/Fatiga (fuera de alcance total, ver `fuera-de-alcance/p2-futuro.md`).
- No se construye ningún reporte "comparación entre bloques" en el primer corte — eso es P1, ver `funcionalidades/F20-adherencia-nutricional.md`'s equivalente de entrenamiento si se decide construirlo (no tiene archivo propio en el MVP P0/P1 actual salvo que se decida añadirlo; señalado como idea de `PLAN_TRAINFIT_ENTRENADORES.md` §10.8, no incluida como archivo de funcionalidad separado en esta carpeta por no estar explícitamente en la lista P0/P1 original — si se quiere, es una extensión natural de este mismo archivo).

## 4. Flujos de usuario paso a paso

1. El profesional entra al detalle de un cliente (`F06`) con relación `training`.
2. Ve la rutina activa del cliente: nombre, splits, workouts, ejercicios, sets (misma estructura visual que el cliente ve en su propia app, en modo solo lectura para el profesional).
3. Ve el peso reciente (gráfico o lista de las últimas entradas).
4. Ve el historial de entrenamientos completados (fecha, duración, ejercicios realizados).

## 5. Pantallas necesarias

- Sección "Entrenamiento" dentro del detalle de cliente (`F06`) — no es una pantalla independiente, es parte de la composición de F06.

## 6. Componentes UI requeridos

- Reutiliza, en modo solo lectura, los componentes ya existentes de visualización de rutina (`mesocycle.page`'s componentes de split/workout, sin las acciones de edición que sí tiene el propio usuario) y de estadísticas (`statistics.page`'s gráficos, en modo lectura para un tercero).

## 7. Lógica de negocio

Ninguna nueva. El controller de `/trainer/clients/:clientId/tables`, `/trainer/clients/:clientId/anthropometry`, `/trainer/clients/:clientId/workouts/history` simplemente:
1. Pasa por `requireActiveClient("training")` para `tables`/`workouts/history` — exige ESE scope exacto. Para `anthropometry`, pasa por `requireActiveClient()` SIN scope (cualquier relación activa, `training` o `nutrition`, basta — ver punto 12, resuelve la ambigüedad de la versión anterior de este documento).
2. Llama a la función YA EXISTENTE del DAO/servicio correspondiente, sustituyendo `req.auth.userId` por `req.params.clientId`:
   - `tableModel.getTables(page, limit, own, clientId)` — mismo DAO que usa el cliente para ver sus propias rutinas.
   - `anthropometryService.getAnthropometriesBetweenDates(clientId, dateMin, dateMax)` — mismo servicio.
   - Agregación equivalente a `getExerciseHistoryStats` para el historial de entrenamientos, parametrizada por `clientId`.
3. Devuelve el resultado tal cual (o vía el DTO ya existente de cada dominio, sin inventar uno nuevo).

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (middleware).
- Depende de (sin modificarlos): `table-dao.js`, `anthropometry-dao.js`/`-service.js`, la agregación de `getExerciseHistoryStats`.
- Es un prerequisito de: `F06-detalle-cliente-navegacion.md`.

## 9. Validaciones

- Ninguna propia de dominio — hereda las validaciones ya existentes de los DAOs reutilizados (p. ej. límites de paginación de `getTables`).
- La única validación NUEVA es la de autorización (`requireActiveClient("training")`), ya cubierta por el middleware.

## 10. Casos límite y posibles errores

- **El cliente no tiene ninguna rutina activa**: mostrar el mismo estado vacío que vería el propio cliente en su app (reutilizar el copy/diseño existente, adaptado a "tu cliente no tiene rutina activa" en vez de "tú no tienes rutina activa").
- **El cliente tiene datos de anthropometry muy antiguos o ninguno**: mostrar estado vacío, no un error.
- **El profesional intenta acceder a `tables`/`workouts/history` con relación `nutrition` únicamente (sin `training`)**: 403 vía `requireActiveClient("training")` — este es exactamente el caso que prueba que el middleware distingue correctamente por scope, no solo por existencia de relación.
- **El profesional con SOLO `nutrition` accede a `anthropometry`**: 200, permitido — ese endpoint no exige scope concreto (ver punto 7), el peso es dato transversal.

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

- `GET /trainer/clients/:clientId/tables` — requiere relación `training`.
- `GET /trainer/clients/:clientId/anthropometry` — requiere CUALQUIER relación activa (`training` o `nutrition`), sin exigir un scope concreto — el peso es dato transversal, relevante para ambos roles (a diferencia de rutinas/entrenamientos, estrictamente del ámbito `training`).
- `GET /trainer/clients/:clientId/workouts/history` — requiere relación `training`.

## 13. Criterios de aceptación verificables

- [ ] Un profesional con scope `training` ve la rutina activa del cliente, idéntica en contenido a lo que el propio cliente ve en su app.
- [ ] Un profesional con relación `nutrition` únicamente (sin `training`) recibe 403 al intentar `GET .../tables`.
- [ ] El peso reciente se muestra correctamente para un profesional con relación `training` O `nutrition` (cualquiera de las dos basta).
- [ ] El historial de entrenamientos coincide con los datos reales del cliente (mismo resultado que `getExerciseHistoryStats` calcularía para ese usuario).

## 14. Checklist de implementación

- [x] 3 endpoints con `requireActiveClient` (2 con scope exacto, 1 sin scope) y wrapping de los DAOs existentes.
- [x] Sección de UI dentro de `F06`.
- [ ] Verificar los 4 criterios de aceptación.
