import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageSetComponent } from '../tables/components/summary/components/manage-set/manage-set.component';
import { ConfigExercisePage } from './components/config-exercise/config-exercise.page';
import { QuickSeriesGeneratorModalComponent } from './components/config-exercise/quick-series-generator-modal/quick-series-generator-modal.component';
import { SearchExercisesPageComponent } from './components/search-exercises/search-exercises.page';
import { ExercisesPageRoutingModule } from './exercises-routing.module';

@NgModule({
  imports: [SharedModule, ExercisesPageRoutingModule],
  exports: [SearchExercisesPageComponent, ConfigExercisePage],
  declarations: [
    SearchExercisesPageComponent,
    ConfigExercisePage,
    ManageSetComponent,
    QuickSeriesGeneratorModalComponent,
  ],
})
export class ExercisesPageModule {}
