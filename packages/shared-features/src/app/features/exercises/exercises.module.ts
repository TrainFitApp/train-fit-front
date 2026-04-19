import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageSetComponent } from '../tables/components/summary/components/manage-set/manage-set.component';
import { ConfigExercisePage } from './components/config-exercise/config-exercise.page';
import { SearchExercisesPageComponent } from './components/search-exercises/search-exercises.page';
import { ExercisesPageRoutingModule } from './exercises-routing.module';

@NgModule({
  imports: [SharedModule, ExercisesPageRoutingModule],
  exports: [SearchExercisesPageComponent, ConfigExercisePage],
  declarations: [
    SearchExercisesPageComponent,
    ConfigExercisePage,
    ManageSetComponent,
  ],
})
export class ExercisesPageModule {}
