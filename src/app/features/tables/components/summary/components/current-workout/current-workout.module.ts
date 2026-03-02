import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CurrentWorkoutPage } from './current-workout.page';
import { CustomExerciseComponent } from './custom-exercise/custom-exercise.component';
import { SetComponent } from './custom-exercise/set/set.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CurrentWorkoutPage,
  },
];

@NgModule({
  declarations: [CurrentWorkoutPage, CustomExerciseComponent, SetComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CurrentWorkoutPageModule {}
