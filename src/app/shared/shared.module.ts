import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CursorEndDirective } from '../core/directives/cursor-end.directive';
import { DecimalInputDirective } from '../core/directives/decimal-input.directive';
import { VideoModalComponent } from '../features/tables/components/summary/components/current-workout/video-modal/video-modal.component';
import { ActionsFabComponent } from './components/actions-fab/actions-fab.component';
import { DisconnectedComponent } from './components/disconnected/disconnected.component';
import { FilterIconsComponent } from './components/filter-icons/filter-icons.component';
import { ExerciseFilterIconsComponent } from './components/exercise-filter-icons/exercise-filter-icons.component';
import { FilterInputPage } from './components/filter-input/filter-input.page';
import { NotesComponent } from './components/notes/notes.component';
import { NumericInputComponent } from './components/numeric-input/numeric-input.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PopoverActionsComponent } from './components/popover-actions/popover-actions.component';
import { SearchExercisesPage } from './components/search-exercises/search-exercises.page';
import { RirPickerComponent } from './components/rir-picker/rir-picker.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ExpectedPipe } from './pipes/expected-reps.pipe';
import { MeasurePipe } from './pipes/measure.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    PopoverActionsComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
    PageHeaderComponent,
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
    DisconnectedComponent,
    VideoModalComponent,
    CursorEndDirective,
    DecimalInputDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PopoverActionsComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
    PageHeaderComponent,
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
    DisconnectedComponent,
    CursorEndDirective,
    DecimalInputDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
