import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseScoresPage } from './exercise-scores.page';

const routes: Routes = [{ path: '', component: ExerciseScoresPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseScoresPageRoutingModule {}
