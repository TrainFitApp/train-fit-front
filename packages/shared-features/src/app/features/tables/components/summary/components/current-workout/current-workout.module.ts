import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrentWorkoutPage } from './current-workout.page';
import { CustomExerciseComponent } from './custom-exercise/custom-exercise.component';
import { SetComponent } from './custom-exercise/set/set.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderExercisesPageModule } from '../mesocycle/components/order-exercises/order-exercises.module';
import { OrderSetsPageModule } from './custom-exercise/order-sets/order-sets.module';

const routes: Routes = [
  {
    path: '',
    component: CurrentWorkoutPage,
  },
];

@NgModule({
  declarations: [
    CurrentWorkoutPage,
    CustomExerciseComponent,
    SetComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes), OrderExercisesPageModule, OrderSetsPageModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CurrentWorkoutPageModule {}

