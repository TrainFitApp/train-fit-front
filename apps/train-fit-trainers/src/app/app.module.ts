import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { AppUpdateModule } from 'src/app/features/app-update/app-update.module';
import { MaintenanceModule } from 'src/app/features/maintenance/maintenance.module';
import { ExerciseScoreEditHandler } from 'src/app/core/services/exercise/exercise-score-edit-handler';
import { TrainerExerciseScoreEditHandlerService } from 'src/app/features/exercise-scores/services/trainer-exercise-score-edit-handler.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicModule.forRoot(),
    CoreModule,
    AppUpdateModule,
    MaintenanceModule,
    AppRoutingModule,
  ],
  providers: [
    // Único punto donde se conecta el botón "puntuar" de
    // ConfigExercisePage (shared-features, compilado en las 3 apps) con la
    // feature real de puntuaciones (exclusiva de esta app) — ver
    // exercise-score-edit-handler.ts para el porqué.
    { provide: ExerciseScoreEditHandler, useClass: TrainerExerciseScoreEditHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
