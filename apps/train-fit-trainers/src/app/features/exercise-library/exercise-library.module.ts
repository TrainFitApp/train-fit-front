import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { ExerciseLibraryPageRoutingModule } from './exercise-library-routing.module';
import { ExerciseLibraryPage } from './exercise-library.page';
import { ExerciseDetailModalComponent } from './components/exercise-detail-modal/exercise-detail-modal.component';
import { ExerciseFormModalComponent } from './components/exercise-form-modal/exercise-form-modal.component';

@NgModule({
  imports: [SharedModule, NavigationModule, ExerciseLibraryPageRoutingModule],
  declarations: [
    ExerciseLibraryPage,
    ExerciseDetailModalComponent,
    ExerciseFormModalComponent,
  ],
})
export class ExerciseLibraryPageModule {}
