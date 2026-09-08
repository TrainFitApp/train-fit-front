import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { ExerciseScoresPageRoutingModule } from './exercise-scores-routing.module';
import { ExerciseScoresPage } from './exercise-scores.page';
import { ScoreEditorModalComponent } from './components/score-editor-modal/score-editor-modal.component';

@NgModule({
  imports: [SharedModule, NavigationModule, ExerciseScoresPageRoutingModule],
  declarations: [ExerciseScoresPage, ScoreEditorModalComponent],
})
export class ExerciseScoresPageModule {}
