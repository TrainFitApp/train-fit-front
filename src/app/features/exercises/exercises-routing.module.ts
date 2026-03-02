import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigExercisePage } from './components/config-exercise/config-exercise.page';
import { SearchExercisesPageComponent } from './components/search-exercises/search-exercises.page';

const routes: Routes = [
  {
    path: 'exercises',
    component: SearchExercisesPageComponent,
  },
  {
    path: 'config-exercise',
    component: ConfigExercisePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesPageRoutingModule {}
