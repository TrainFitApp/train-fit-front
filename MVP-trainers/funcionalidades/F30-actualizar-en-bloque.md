# F30 — Actualizar en bloque (push explícito a todos los clientes asignados)

**Prioridad**: P1. **Fase**: 6. Depende de `F11`, `F12`, `F13`.

## 1. Objetivo

Dar al profesional una forma explícita y controlada de propagar un cambio (una rutina, una comida, unos objetivos) a VARIOS clientes a la vez, sin caer en el modelo de "plantilla compartida por referencia" de Traineeks que este proyecto rechaza explícitamente (`00-riesgos.md` R4, `PLAN_TRAINFIT_ENTRENADORES.md` §11.2a) — la alternativa es una acción de copia explícita y puntual, no un vínculo permanente.

## 2. Alcance exacto para el MVP

- Desde una rutina/comida/objetivo YA asignado a un cliente (origen), el profesional puede elegir "Aplicar también a otros clientes".
- Selecciona de una lista (multi-selección) los clientes destino, entre los que tiene relación activa con el scope correspondiente.
- El sistema ejecuta, para CADA cliente destino, la MISMA operación de copia profunda que ya usan `F11`/`F12`/`F13` individualmente (`pasteMeal`, duplicación de rutina, etc.) — es literalmente una iteración de la operación existente sobre una lista de destinatarios, no un mecanismo nuevo de propagación.
- Cada cliente recibe una copia independiente; tras la operación, no existe ningún vínculo entre las copias resultantes ni con el origen.

## 3. Qué NO se incluye en el MVP

- No hay un vínculo persistente "estos N clientes comparten esta rutina" — si el profesional quiere cambiarla después, debe repetir la acción de aplicar en bloque, cliente por cliente o en bloque de nuevo; no hay sincronización automática.
- No hay historial de "qué se aplicó en bloque cuándo" más allá de lo que ya registra cada operación individual (mismo criterio que `F11`/`F12`).
- No hay programación de la aplicación en una fecha futura — es una acción inmediata.

## 4. Flujos de usuario paso a paso

1. El profesional está en la pantalla de una rutina/comida/objetivo ya asignado a un cliente concreto (resultado de `F11`/`F12`/`F13`).
2. Pulsa "Aplicar también a otros clientes".
3. Ve una lista de sus clientes activos con el scope correspondiente (entrenamiento para `F11`, nutrición para `F12`/`F13`), y selecciona uno o varios (checkbox múltiple).
4. Confirma.
5. El sistema ejecuta, en un bucle backend, la misma operación de copia profunda para cada cliente seleccionado.
6. Ve un resumen de resultado ("Aplicado a 4 de 5 clientes; 1 falló: [razón]") — no es una operación todo-o-nada, cada cliente se procesa independientemente.

## 5. Pantallas necesarias

- Modal/pantalla de selección múltiple de clientes destino, accesible desde las pantallas ya existentes de `F11`/`F12`/`F13`.

## 6. Componentes UI requeridos

- Lista con checkboxes de selección múltiple (patrón ya usado en otras partes de la app para selección múltiple, p. ej. selección de ejercicios).
- Resumen de resultado post-operación (éxitos/fallos por cliente).

## 7. Lógica de negocio

- Backend: un endpoint que recibe `{ sourceOperation, targetClientIds: [...] }` y por cada `targetClientId` ejecuta la operación equivalente a la de `F11`/`F12`/`F13` individual, capturando errores por cliente sin abortar el resto (`Promise.allSettled`, no `Promise.all`).
- **Cada aplicación individual pasa por las MISMAS validaciones de `requireActiveClient` y de negocio que la operación individual** — no hay un atajo que salte la verificación de relación activa por estar en modo "bloque"; si el profesional no tiene relación activa con alguno de los clientes seleccionados (caso raro, pero posible si se revocó justo antes de confirmar), esa aplicación concreta falla y se reporta como fallo individual, sin bloquear las demás.

## 8. Dependencias con otros módulos

- Depende de: `F11-asignar-rutina.md`, `F12-pautar-comida.md`, `F13-asignar-objetivos-macros.md` (reutiliza la lógica de cada una).
- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (`requireActiveClient`, aplicado por cada cliente destino individualmente).

## 9. Validaciones

- Debe seleccionarse al menos 1 cliente destino.
- Cada cliente destino debe tener relación activa con el scope correspondiente a la operación que se está propagando (validado individualmente, no en bloque).

## 10. Casos límite y posibles errores

- **Uno o más clientes de la selección fallan la operación** (p. ej. relación revocada justo antes de confirmar): se reporta el fallo específico de ese cliente sin afectar a los demás — respuesta parcial, no todo-o-nada.
- **El profesional selecciona un número grande de clientes** (p. ej. 30): la operación puede tardar unos segundos; debe haber feedback de progreso o al menos un estado de carga claro mientras se procesa, para no parecer que la app se ha congelado.
- **El profesional aplica en bloque una rutina/comida que ya existía previamente en un cliente destino**: mismo comportamiento de "sustituir" que ya define `F11`/`F12` para el caso individual (copia profunda, sin fusión salvo que la operación base ya soporte `merge`) — se hereda el comportamiento existente, no se define uno nuevo aquí.

## 11. Estructura de datos necesaria

Ninguna nueva — reutiliza las estructuras ya definidas por `F11`/`F12`/`F13`. Esta funcionalidad es una capa de orquestación sobre operaciones existentes, no introduce un modelo de datos propio.

## 12. Endpoints/API necesarios

- `POST /trainer/routines/:routineId/apply-to-clients` — `{ targetClientIds: [...] }`, reutiliza la lógica de `F11`.
- `POST /trainer/clients/:clientId/diet-days/:date/meals/:mealSlot/apply-to-clients` — `{ targetClientIds: [...] }`, reutiliza la lógica de `F12`.
- `POST /trainer/clients/:clientId/nutrition-goals/apply-to-clients` — `{ targetClientIds: [...] }`, reutiliza la lógica de `F13`.
- Los tres devuelven un resultado por cliente (`{ clientId, success, error? }[]`), nunca un único booleano global.

## 13. Criterios de aceptación verificables

- [ ] Aplicar en bloque a 3 clientes con relación activa válida crea 3 copias independientes, sin vínculo entre sí ni con el origen.
- [ ] Si 1 de 3 clientes falla la validación de relación activa, los otros 2 se aplican correctamente y el fallo se reporta específicamente.
- [ ] Modificar posteriormente la copia de un cliente no afecta a las copias de los demás (prueba directa de que no hay referencia compartida).
- [ ] La operación reutiliza literalmente el mismo código de `F11`/`F12`/`F13` (verificar en code review que no se duplica lógica de negocio, solo se itera).

## 14. Checklist de implementación

- [ ] Endpoint de aplicación en bloque para rutinas (`F11`).
- [ ] Endpoint de aplicación en bloque para comidas (`F12`).
- [ ] Endpoint de aplicación en bloque para objetivos (`F13`).
- [ ] UI de selección múltiple de clientes destino.
- [ ] UI de resumen de resultado (éxitos/fallos).
- [ ] Verificar los 4 criterios de aceptación.
