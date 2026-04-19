# Frontend Models (TypeScript)

## Users

- **User**: perfil, métricas, objetivos, relaciones con dietas/tablas y favoritos.
- **Token**: access/refresh token (ver `token.ts`).

## Nutrition

- **IProduct**: macros por 100g, marca, código, verificación.
- **CustomProduct**: ingrediente instanciado con `quantity`, `product` o `ownProduct`, macros override y `mealId`.
- **Recipe**: receta base con `customProducts`, `userId`, `verified`.
- **DataRecipe**: plantilla con `quantity`, `quantityCooked`, `servings`.
- **CustomRecipeInstance**: instancia en meal con overrides y adicionales.

## Diets

- **Diet**: `dietsDay[]`, promedios macros.
- **DietDay**: `meals[]`, `weight`, `steps`, `notes`, macros diarios.
- **Meal**: `customProducts[]`, `customRecipeInstances[]`, macros por comida.

## Training

- **Exercise**: base con grupos musculares, equipo, categoría.
- **CustomExercise**: instancia con `exercise` y `sets[]`.
- **Set**: series con reps, peso, RIR, tiempos, flags.
- **Workout**: `exercises[]`, `name`, `notes`, `date`.
- **Split**: `workouts[]`.
- **Table**: `splits[]`, `type`, `urlImage`, `description`.

## Infra

- **HttpHeader**: modelo de headers custom (ver `http-header.ts`).
