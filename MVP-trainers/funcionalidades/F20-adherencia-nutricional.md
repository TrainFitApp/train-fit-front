# F20 — Vista de adherencia nutricional

**Prioridad**: P1. **Fase**: 6. Depende de `F10`.

## 1. Objetivo

Dar al nutricionista un RESUMEN de cómo de bien está siguiendo el cliente su pauta nutricional, en vez de obligarle a revisar día a día los datos crudos de `F10`.

## 2. Alcance exacto para el MVP

- Un cálculo simple: % de días, en un periodo (p. ej. últimos 7/30 días), en los que el cliente registró comidas y sus macros estuvieron dentro de un margen razonable de los objetivos (`nutritionalGoals`).
- Presentación como un número/porcentaje + quizá un pequeño calendario/heatmap (patrón visto en Traineeks, `PLAN_TRAINFIT_ENTRENADORES.md` §11, "% Tracking" + calendario) — reutilizar ese patrón visual si encaja, sin construir nada más sofisticado.

## 3. Qué NO se incluye en el MVP

- No hay desglose fino por macro individual (p. ej. "cumples proteína el 80% de los días pero grasa solo el 40%") en el primer corte — un único porcentaje agregado basta para el MVP de esta funcionalidad P1; el desglose por macro es una mejora posterior.
- No es el reporte "comparación entre bloques" de `PLAN_TRAINFIT_ENTRENADORES.md` §10.8 — ese es un reporte de RENDIMIENTO (patrones de movimiento), no de nutrición; si se quiere, sería una funcionalidad hermana no incluida en esta lista P0/P1 explícita.

## 4. Flujos de usuario paso a paso

1. Desde el detalle de cliente (`F06`), sección Nutrición, el nutricionista ve un indicador de adherencia (p. ej. "78% de adherencia últimos 30 días") junto al resto de datos ya mostrados por `F10`.
2. Puede ver, opcionalmente, un calendario/heatmap con los días marcados según si cumplieron o no el margen de macros.

## 5. Pantallas necesarias

Ninguna nueva independiente — un widget dentro de la sección Nutrición de `F06`.

## 6. Componentes UI requeridos

- Indicador de porcentaje (donut/número, reutilizar cualquier componente de gráfico simple ya existente en la app si lo hay, p. ej. de `statistics.page`).
- Calendario/heatmap simple (opcional, mismo patrón visual identificado en Traineeks).

## 7. Lógica de negocio

Backend, `GET /trainer/clients/:clientId/adherence`:
1. `requireActiveClient("nutrition")`.
2. Para un rango de fechas, recorre los `DietDay` del cliente (mismo DAO ya usado por `F10`), calcula el total de macros registrado cada día, lo compara contra `nutritionalGoals` activo, y cuenta cuántos días caen dentro de un margen (p. ej. ±10%, valor a definir junto al negocio, no fijado en este documento como una constante inamovible).
3. Devuelve `{ percentage, daysCounted, daysInRange, dailyBreakdown: [...] }` para alimentar tanto el número como el calendario.

## 8. Dependencias con otros módulos

- Depende de: `F10-lectura-nutricion-cliente.md` (usa los mismos datos de `DietDay`, agregados de otra forma).
- Depende de (sin modificar): el DAO de `nutritionalGoals` para comparar contra el objetivo activo.

## 9. Validaciones

- El margen de tolerancia (±X%) debe ser una constante configurable en código, no hardcodeada en 3 sitios distintos si se usa en más de un lugar.

## 10. Casos límite y posibles errores

- **El cliente no tiene objetivos de macros configurados**: no se puede calcular adherencia contra nada — mostrar un estado explicativo ("Asigna objetivos primero para ver adherencia") en vez de un cálculo sin sentido o un error.
- **El cliente no registró NINGÚN día en el periodo**: 0% o "sin datos", nunca un error o una división por cero en el cálculo del porcentaje (guardar el denominador correctamente).

## 11. Estructura de datos necesaria

Ninguna nueva — cálculo sobre datos ya existentes (`DietDay`, `nutritionalGoals`).

## 12. Endpoints/API necesarios

- `GET /trainer/clients/:clientId/adherence?from=...&to=...` — requiere relación `nutrition`.

## 13. Criterios de aceptación verificables

- [ ] El porcentaje de adherencia se calcula correctamente contra un objetivo de macros real y datos de `DietDay` conocidos (verificar con un caso de prueba manual con números calculados a mano).
- [ ] Un cliente sin objetivos configurados muestra el estado explicativo, no un error ni un cálculo sin sentido.
- [ ] Un cliente sin ningún día registrado en el periodo muestra 0%/sin datos, sin división por cero.

## 14. Checklist de implementación

- [ ] Endpoint de cálculo de adherencia.
- [ ] Definir el margen de tolerancia con el negocio.
- [ ] Widget de UI en la sección Nutrición de `F06`.
- [ ] Verificar los 3 criterios de aceptación.
