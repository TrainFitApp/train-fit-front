# Diets Model

## Estructura

- **Diet** → `dietsDay[]`
- **DietDay** → `meals[]`
- **Meal** → `customProducts[]` y `customRecipeInstances[]`

## Flujo (Dieta y Comidas)

1. **User** referencia una dieta activa (`dietInUse`).
2. **Diet** agrupa días (`DietDay`).
3. **DietDay** representa un día real: peso, pasos, notas, y comidas.
4. **Meal** representa una ingesta en ese día.
5. **CustomProduct** es la envoltura de consumo: guarda gramos y macros para esa meal.
6. **Product** es inmutable (catálogo). Los gramos se guardan solo en `CustomProduct`.
7. **CustomRecipeInstance** añade recetas a la meal (ver módulo recetas).

## Reglas

- Eliminar Diet elimina DietDay → Meal → CustomProduct/CustomRecipeInstance/DataRecipe.
- Product es inmutable: la cantidad consumida vive en CustomProduct.

## Frontend (Flujo y Pantallas)

- **DietsPage** (`features/diets/diets.page.ts`): carga `DietDay` actual por fecha, mantiene `dietDay` en `DietDayService`.
- **MealComponent** (`features/diets/components/meal/meal.component.ts`): muestra `Meal`, maneja add/edit/delete de `CustomProduct` y `CustomRecipeInstance`.
- **SearchFoodsPage** (`features/diets/components/meal/components/search-foods/search-foods.page.ts`): añade productos/recetas a la meal y gestiona ingredientMode.
