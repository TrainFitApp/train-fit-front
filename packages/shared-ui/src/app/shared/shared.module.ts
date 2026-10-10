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
import { SessionCheckinModalComponent } from 'src/app/features/tables/components/summary/components/current-workout/session-checkin-modal/session-checkin-modal.component';
import { ActionsFabComponent } from './components/actions-fab/actions-fab.component';
import { ActionsSheetComponent } from './components/actions-sheet/actions-sheet.component';
import { ConfirmSheetComponent } from './components/confirm-sheet/confirm-sheet.component';
import { TrainerNoteSheetComponent } from './components/trainer-note-sheet/trainer-note-sheet.component';
import { TrainerNoteDotComponent } from './components/trainer-note-dot/trainer-note-dot.component';
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
import { NumericKeypadModule } from './components/numeric-keypad/numeric-keypad.module';
import { PopoverActionsComponent } from './components/popover-actions/popover-actions.component';
import { SearchExercisesPage } from './components/search-exercises/search-exercises.page';
import { RirPickerComponent } from './components/rir-picker/rir-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { MediaVideoPlayerComponent } from './components/media/media-video-player.component';
import { PhotoCompareComponent } from './components/media/photo-compare.component';
import { PremiumMediaCardComponent } from './components/media/premium-media-card.component';
import { MediaConsentSheetComponent } from './components/media/media-consent-sheet.component';
import { PhotoSessionModalComponent } from './components/media/photo-session-modal.component';
import { MediaCameraModalComponent } from './components/media/media-camera-modal.component';
import { PhotoViewerModalComponent } from './components/media/photo-viewer-modal.component';
import { ProgressPhotosComponent } from './components/media/progress-photos.component';
import { ProgressVideosComponent } from './components/media/progress-videos.component';
import { FormCheckSubmitModalComponent } from './components/media/form-check-submit-modal.component';
import { FormCheckListComponent } from './components/media/form-check-list.component';
import { TechniqueVideoPlayerComponent } from './components/media/technique-video-player.component';
import { CheckinPhotosFieldComponent } from './components/media/checkin-photos-field.component';
import { IntakeVideoFieldComponent } from './components/media/intake-video-field.component';
import { ClientTechniqueVideoPickerComponent } from './components/media/client-technique-video-picker.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ExpectedPipe } from './pipes/expected-reps.pipe';
import { MeasurePipe } from './pipes/measure.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TranslateDbPipe } from './pipes/translate-db.pipe';
import { TranslateDescPipe } from './pipes/translate-desc.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { LocalNumberPipeModule } from './pipes/local-number-pipe.module';
import { SubmitOnEnterDirective } from './directives/submit-on-enter.directive';
import { HorizontalScrollDirective } from './directives/horizontal-scroll.directive';

@NgModule({
  declarations: [
    SubmitOnEnterDirective,
    HorizontalScrollDirective,
    PopoverActionsComponent,
    ActionsSheetComponent,
    ConfirmSheetComponent,
    TrainerNoteSheetComponent,
    TrainerNoteDotComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
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
    LocalDatePipe,
    DisconnectedComponent,
    RoutineCalendarComponent,
    VideoModalComponent,
    WorkoutSummaryModalComponent,
    SessionCheckinModalComponent,
    CursorEndDirective,
    DecimalInputDirective,
    HideKeyboardOnScrollDirective,
    LowercaseEmailInputDirective,
    AnthropometryModalComponent,
    AnthropometryChartComponent,
    GlossaryInfoComponent,
    GlossaryPopoverComponent,
    MaintenanceWarningBannerComponent,
    MediaVideoPlayerComponent,
    PhotoCompareComponent,
    PremiumMediaCardComponent,
    MediaConsentSheetComponent,
    PhotoSessionModalComponent,
    MediaCameraModalComponent,
    PhotoViewerModalComponent,
    ProgressPhotosComponent,
    ProgressVideosComponent,
    FormCheckSubmitModalComponent,
    FormCheckListComponent,
    TechniqueVideoPlayerComponent,
    CheckinPhotosFieldComponent,
    IntakeVideoFieldComponent,
    ClientTechniqueVideoPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    NumericKeypadModule,
    LocalNumberPipeModule,
  ],
  exports: [
    SubmitOnEnterDirective,
    HorizontalScrollDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    NumericKeypadModule,
    PopoverActionsComponent,
    ActionsSheetComponent,
    ConfirmSheetComponent,
    TrainerNoteSheetComponent,
    TrainerNoteDotComponent,
    FilterInputPage,
    NotesComponent,
    NumericInputComponent,
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
    LocalDatePipe,
    LocalNumberPipeModule,
    DisconnectedComponent,
    RoutineCalendarComponent,
    CursorEndDirective,
    DecimalInputDirective,
    HideKeyboardOnScrollDirective,
    LowercaseEmailInputDirective,
    AnthropometryModalComponent,
    AnthropometryChartComponent,
    GlossaryInfoComponent,
    GlossaryPopoverComponent,
    MaintenanceWarningBannerComponent,
    MediaVideoPlayerComponent,
    PhotoCompareComponent,
    PremiumMediaCardComponent,
    MediaConsentSheetComponent,
    PhotoSessionModalComponent,
    MediaCameraModalComponent,
    PhotoViewerModalComponent,
    ProgressPhotosComponent,
    ProgressVideosComponent,
    FormCheckSubmitModalComponent,
    FormCheckListComponent,
    TechniqueVideoPlayerComponent,
    CheckinPhotosFieldComponent,
    IntakeVideoFieldComponent,
    ClientTechniqueVideoPickerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
