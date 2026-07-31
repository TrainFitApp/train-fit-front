# F28 — Menús alternativos nombrados para la misma comida

**Prioridad**: P1. **Fase**: 6. Depende de `F12`.

## 1. Objetivo

Permitir que el nutricionista pauté MÁS DE UNA alternativa nutricionalmente equivalente para el mismo hueco de comida (p. ej. "Desayuno - Opción A" y "Desayuno - Opción B"), y que el cliente elija cuál registra cada día — mejora de adherencia identificada tanto en el Excel real (§10.5) como en Traineeks (§11.1, con menús etiquetados por contexto, no solo numerados).

## 2. Alcance exacto para el MVP (de esta funcionalidad P1)

- 2-3 alternativas por hueco de comida (no las 4 fijas del Excel original — número abierto, no una constante rígida).
- Cada alternativa puede tener un NOMBRE/etiqueta libre corto (p. ej. "Días de entreno", "Opción rápida") — a diferencia del catálogo de check-in (`F17`), aquí SÍ se permite texto libre porque es solo una etiqueta descriptiva, no una pregunta nueva que cambie la lógica de negocio.
- El cliente, al ver su dieta del día, elige cuál de las alternativas activas registra.

## 3. Qué NO se incluye en el MVP

- No hay un límite máximo hardcodeado en el modelo de datos (a diferencia del Excel, que tenía 4 fijas) — pero la UI puede limitar razonablemente a un número manejable (2-4) por simplicidad de interfaz, sin que sea una restricción de negocio dura.
- No se decide automáticamente cuál alternativa es "la sugerida" — todas se presentan igual, el cliente elige libremente.

## 4. Flujos de usuario paso a paso

1. El nutricionista, siguiendo el flujo de `F12-pautar-comida.md`, en vez de pautar UNA composición para el hueco, pauta 2-3, cada una con su etiqueta.
2. Cada alternativa se aplica internamente vía `pasteMeal` de la misma forma que F12, pero el resultado no sustituye directamente la comida del cliente — se guardan como opciones disponibles para ESE hueco de comida en esa fecha.
3. El cliente, al abrir su dieta ese día, ve el hueco de comida con un selector ("Elige tu desayuno de hoy: Opción A / Opción B") en vez de un contenido fijo.
4. Al elegir una, esa composición se aplica a su `Meal` real (mismo mecanismo final que F12, solo que el momento de aplicar `pasteMeal` se retrasa hasta que el cliente elige, en vez de aplicarse inmediatamente al pautar).

## 5. Pantallas necesarias

- Extensión de la pantalla de composición de comida de `F12` para permitir añadir más de una alternativa con su etiqueta.
- Extensión de la pantalla de dieta del cliente (`diets.page`/`meal.component` ya existentes) para mostrar un selector cuando hay alternativas pendientes de elegir.

## 6. Componentes UI requeridos

- Selector de alternativa (chips o botones simples "Opción A" / "Opción B") en la vista de comida del cliente.

## 7. Lógica de negocio

- Nueva estructura intermedia: en vez de aplicar `pasteMeal` inmediatamente al pautar (como en `F12`), se guardan las alternativas como propuestas pendientes asociadas a `(clientId, date, mealSlot)`. Solo cuando el cliente elige una, se ejecuta `pasteMeal` de verdad sobre su `Meal` real.
- **Esto es una extensión real de la lógica de `F12`, no solo repetir la misma operación varias veces** — requiere un estado intermedio ("propuestas pendientes de elegir") que `F12` no necesita (ahí la aplicación es inmediata). Modelarlo como una colección ligera: `MealProposal { clientId, trainerId, date, mealSlot, alternatives: [{ label, customProducts, customRecipes }], chosenIndex: null }`.

## 8. Dependencias con otros módulos

- Depende de: `F12-pautar-comida.md` (extiende su mecanismo).
- Toca: la pantalla de dieta del cliente (`diets.page`/`meal.component`) para el selector — un cambio de UI en la app de CONSUMIDOR, no solo en la de entrenadores, ya que es el cliente quien elige.

## 9. Validaciones

- Cada alternativa debe tener contenido válido (mismas validaciones que `F12`).
- Debe haber al menos 2 alternativas para que tenga sentido mostrar un selector (con 1 sola, es simplemente `F12` normal, sin selector).

## 10. Casos límite y posibles errores

- **El cliente no elige ninguna alternativa ese día**: el hueco de comida queda vacío (o con la última comida real que tuviera, si `merge` aplicara) — no se aplica ninguna por defecto automáticamente, la elección es siempre explícita del cliente.
- **El nutricionista pauta alternativas nuevas para un hueco que el cliente ya había elegido y registrado**: las alternativas nuevas no deshacen lo ya registrado — son propuestas para el futuro, no retroactivas.

## 11. Estructura de datos necesaria

```js
const MealProposalSchema = new Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  date: { type: String, required: true }, // YYYY-MM-DD, mismo formato ya usado en DietDay
  mealSlot: { type: String, required: true }, // identificador de qué comida del día (desayuno, comida, cena...)
  alternatives: [{
    label: String,
    customProducts: [Schema.Types.Mixed],
    customRecipes: [Schema.Types.Mixed],
  }],
  chosenIndex: { type: Number, default: null },
}, { collection: "mealproposals" });
```

## 12. Endpoints/API necesarios

- `POST /trainer/clients/:clientId/diet-days/:date/meals/:mealSlot/propose` (nutricionista) — crea las alternativas.
- `GET /diets/:date/meal-proposals` (cliente) — ve si hay alternativas pendientes de elegir ese día.
- `POST /diets/:date/meal-proposals/:proposalId/choose` (cliente) — elige una, dispara `pasteMeal` internamente.

## 13. Criterios de aceptación verificables

- [ ] Pautar 2 alternativas para el mismo hueco de comida las guarda correctamente, sin aplicar ninguna todavía.
- [ ] El cliente ve el selector con las etiquetas correctas.
- [ ] Elegir una alternativa aplica su contenido real a la comida del cliente (mismo resultado final que `F12`).
- [ ] No elegir ninguna no aplica nada por defecto.

## 14. Checklist de implementación

- [ ] `MealProposalSchema`.
- [ ] Endpoints de proponer/ver/elegir.
- [ ] Extensión de la UI de pautar comida (profesional) para múltiples alternativas.
- [ ] Extensión de la UI de dieta del cliente (consumidor) con el selector.
- [ ] Verificar los 4 criterios de aceptación.
