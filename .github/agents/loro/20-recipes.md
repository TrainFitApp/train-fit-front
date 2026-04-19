# Recipes Module (Critical)

## Entidades

- **Recipe**: inmutable, base de ingredientes.
- **DataRecipe**: plantilla de consumo (cantidad cruda/cocinada/porciones).
- **CustomRecipeInstance**: instancia en meal con overrides y adicionales.

## Reglas

- Recipe es inmutable tras creación.
- Overrides se guardan solo para cambios.
- Macros se calculan vía merge, no duplicando ingredientes.

## Flujo (Recetas en Meals)

1. **Recipe** es el catálogo base inmutable (ingredientes base).
2. **DataRecipe** envuelve la receta con datos de consumo.
3. **CustomRecipeInstance** es lo que realmente se añade a la `Meal`.
4. Los gramos consumidos viven en la instancia, no en la receta base.

## Frontend (Flujo y Pantallas)

- **MealComponent** (`features/diets/components/meal/meal.component.ts`): abre config de receta y elimina instancias.
- **SearchFoodsPage** (`features/diets/components/meal/components/search-foods/search-foods.page.ts`): selecciona recetas y evita duplicados en meal.
- **ConfigRecipePage** (`features/diets/components/meal/components/search-foods/components/config-recipe/config-recipe.page.ts`): crea/añade/edita receta, genera DataRecipe y CustomRecipeInstance.

## Merge de Macros (backend)

- Lee `DataRecipe` → `Recipe`.
- Aplica overrides/removals.
- Añade adicionales.
- Escala por `quantity` de instancia.
- Suma macros por 100g.
