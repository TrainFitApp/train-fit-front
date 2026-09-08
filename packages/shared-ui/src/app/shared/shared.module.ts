import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CursorEndDirective } from 'src/app/core/directives/cursor-end.directive';
import { DecimalInputDirective } from 'src/app/core/directives/decimal-input.directive';
import { HideKeyboardOnScrollDirective } from 'src/app/core/directives/hide-keyboard-on-scroll.directive';
import { LowercaseEmailInputDirective } from 'src/app/core/directives/lowercase-email-input.directive';
import { RoutineCalendarComponent } from 'src/app/features/tables/components/summary/components/routine-calendar/routine-calendar.component';
import { VideoModalComponent } from 'src/app/features/tables/components/summary/components/current-workout/video-modal/video-modal.component';
import { WorkoutSummaryModalComponent } from 'src/app/features/tables/components/summary/components/current-workout/workout-summary-modal/workout-summary-modal.component';
import { ActionsFabComponent } from './components/actions-fab/actions-fab.component';
import { ActionsSheetComponent } from './components/actions-sheet/actions-sheet.component';
import { AnthropometryCardComponent } from './components/anthropometry/anthropometry-card.component';
import { AnthropometryModalComponent } from './components/anthropometry/anthropometry-modal.component';
import { AnthropometryChartComponent } from './components/anthropometry/anthropometry-chart.component';
import { DisconnectedComponent } from './components/disconnected/disconnected.component';
import { FilterIconsComponent } from './components/filter-icons/filter-icons.component';
import { ExerciseFilterIconsComponent } from './components/exercise-filter-icons/exercise-filter-icons.component';
import { TableFilterIconsComponent } from './components/filter-icons/table-filter-icons.component';
import { FilterInputPage } from './components/filter-input/filter-input.page';
import { GlossaryInfoComponent } from './components/glossary-info/glossary-info.component';
import { GlossaryPopoverComponent } from './components/glossary-popover/glossary-popover.component';
import { MaintenanceWarningBannerComponent } from './components/maintenance-warning-banner/maintenance-warning-banner.component';
import { NotesComponent } from './components/notes/notes.component';
import { NumericInputComponent } from './components/numeric-input/numeric-input.component';
import { NumericKeypadComponent } from './components/numeric-keypad/numeric-keypad.component';
import { PopoverActionsComponent } from './components/popover-actions/popover-actions.component';
import { SearchExercisesPage } from './components/search-exercises/search-exercises.page';
import { RirPickerComponent } from './components/rir-picker/rir-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ExpectedPipe } from './pipes/expected-reps.pipe';
import { MeasurePipe } from './pipes/measure.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TranslateDbPipe } from './pipes/translate-db.pipe';
import { TranslateDescPipe } from './pipes/translate-desc.pipe';

@NgModule({
  declarations: [
    PopoverActionsComponent,
    ActionsSheetComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
    NumericKeypadComponent,
    FilterIconsComponent,
    ExerciseFilterIconsComponent,
    TableFilterIconsComponent,
    SearchExercisesPage,
    ActionsFabComponent,
    MeasurePipe,
    RirPickerComponent,
    TimePickerComponent,
    SkeletonLoaderComponent,
    SafePipe,
    ExpectedPipe,
    CategoryPipe,
    TranslateDbPipe,
    TranslateDescPipe,
    DisconnectedComponent,
    RoutineCalendarComponent,
    VideoModalComponent,
    WorkoutSummaryModalComponent,
    CursorEndDirective,
    DecimalInputDirective,
    HideKeyboardOnScrollDirective,
    LowercaseEmailInputDirective,
    AnthropometryCardComponent,
    AnthropometryModalComponent,
    AnthropometryChartComponent,
    GlossaryInfoComponent,
    GlossaryPopoverComponent,
    MaintenanceWarningBannerComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    PopoverActionsComponent,
    ActionsSheetComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
    NumericKeypadComponent,
    FilterIconsComponent,
    ExerciseFilterIconsComponent,
    TableFilterIconsComponent,
    SearchExercisesPage,
    ActionsFabComponent,
    RirPickerComponent,
    TimePickerComponent,
    MeasurePipe,
    SkeletonLoaderComponent,
    SafePipe,
    ExpectedPipe,
    CategoryPipe,
    TranslateDbPipe,
    TranslateDescPipe,
    DisconnectedComponent,
    RoutineCalendarComponent,
    CursorEndDirective,
    DecimalInputDirective,
    HideKeyboardOnScrollDirective,
    LowercaseEmailInputDirective,
    AnthropometryCardComponent,
    AnthropometryModalComponent,
    AnthropometryChartComponent,
    GlossaryInfoComponent,
    GlossaryPopoverComponent,
    MaintenanceWarningBannerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}