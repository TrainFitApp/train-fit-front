import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CursorEndDirective } from 'src/app/core/directives/cursor-end.directive';
import { DecimalInputDirective } from 'src/app/core/directives/decimal-input.directive';
import { HideKeyboardOnScrollDirective } from 'src/app/core/directives/hide-keyboard-on-scroll.directive';
import { VideoModalComponent } from 'src/app/features/tables/components/summary/components/current-workout/video-modal/video-modal.component';
import { ActionsFabComponent } from './components/actions-fab/actions-fab.component';
import { DisconnectedComponent } from './components/disconnected/disconnected.component';
import { FilterIconsComponent } from './components/filter-icons/filter-icons.component';
import { ExerciseFilterIconsComponent } from './components/exercise-filter-icons/exercise-filter-icons.component';
import { FilterInputPage } from './components/filter-input/filter-input.page';
import { NotesComponent } from './components/notes/notes.component';
import { NumericInputComponent } from './components/numeric-input/numeric-input.component';
import { PopoverActionsComponent } from './components/popover-actions/popover-actions.component';
import { SearchExercisesPage } from './components/search-exercises/search-exercises.page';
import { RirPickerComponent } from './components/rir-picker/rir-picker.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { AiLoadingOverlayComponent } from './components/ai-loading-overlay/ai-loading-overlay.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ExpectedPipe } from './pipes/expected-reps.pipe';
import { MeasurePipe } from './pipes/measure.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TranslateDbPipe } from './pipes/translate-db.pipe';

@NgModule({
  declarations: [
    AiLoadingOverlayComponent,
    PopoverActionsComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
    FilterIconsComponent,
    ExerciseFilterIconsComponent,
    SearchExercisesPage,
    ActionsFabComponent,
    MeasurePipe,
    RirPickerComponent,
    SkeletonLoaderComponent,
    SafePipe,
    ExpectedPipe,
    CategoryPipe,
    TranslateDbPipe,
    DisconnectedComponent,
    VideoModalComponent,
    CursorEndDirective,
    DecimalInputDirective,
    HideKeyboardOnScrollDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule],
  exports: [
    AiLoadingOverlayComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    PopoverActionsComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
    FilterIconsComponent,
    ExerciseFilterIconsComponent,
    SearchExercisesPage,
    ActionsFabComponent,
    RirPickerComponent,
    MeasurePipe,
    SkeletonLoaderComponent,
    SafePipe,
    ExpectedPipe,
    CategoryPipe,
    TranslateDbPipe,
    DisconnectedComponent,
    CursorEndDirective,
    DecimalInputDirective,
    HideKeyboardOnScrollDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
