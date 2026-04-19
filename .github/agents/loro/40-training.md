# Training Model

## Estructura

- **Table / OwnTable** → `splits[]`
- **Split** → `workouts[]`
- **Workout** → `customExercises[]`
- **CustomExercise** → `sets[]`
- **Set** → reps/peso/RIR/tiempos

## Flujo (Entrenamientos)

1. **User** puede usar `tableInUse` (Table) u `ownTable`.
2. **Table/OwnTable** agrupa `Split` (ciclos de entreno).
3. **Split** agrupa `Workout` (sesiones repetibles en el tiempo).
4. **Workout** contiene `CustomExercise` (envoltura del ejercicio real).
5. **Exercise** es inmutable (catálogo).
6. **CustomExercise** guarda los sets programados y los sets ejecutados.
7. **Set** contiene campos esperados (`expectedReps`, `expectedRir`, etc.) y ejecutados (`reps`, `rir`, `weight`, tiempos).

## Reglas

- Eliminar tabla elimina cascadas hasta `Set`.
- Exercise es inmutable: cambios del usuario viven en CustomExercise y Set.

## Frontend (Flujo y Pantallas)

- **SummaryPage** (`features/tables/components/summary/summary.page.ts`): vista principal de tablas y estado actual.
- **MesocyclePage** (`features/tables/components/summary/components/mesocycle/mesocycle.page.ts`): navega splits y workouts en el tiempo.
- **WorkoutComponent** (`features/tables/components/summary/components/mesocycle/components/workout/workout.component.ts`): muestra workouts y ejercicios.
- **ManageSetComponent** (`features/tables/components/summary/components/manage-set/manage-set.component.ts`): edita sets ejecutados/esperados.
