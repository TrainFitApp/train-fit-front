import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';
import { ClientDetailPage } from './pages/client-detail/client-detail.page';
import { NeedBreakdownModule } from './components/need-breakdown/need-breakdown.module';
import { WeekSummaryPanelComponent } from './components/week-summary-panel/week-summary-panel.component';
import { ApplyRoutineTemplateModalComponent } from './components/apply-routine-template-modal/apply-routine-template-modal.component';
import { NextWeekModalComponent } from './components/next-week-modal/next-week-modal.component';
import { CheckinSchedulesPanelComponent } from './components/checkin-schedules-panel/checkin-schedules-panel.component';
import { CheckinScheduleHistoryPanelComponent } from './components/checkin-schedule-history-panel/checkin-schedule-history-panel.component';
import { TrainingFilterPanelComponent } from './pages/client-detail/components/training-filter-panel/training-filter-panel.component';
import { PerimeterFilterPanelComponent } from './pages/client-detail/components/perimeter-filter-panel/perimeter-filter-panel.component';
import { SelectClientsModalModule } from './components/select-clients-modal/select-clients-modal.module';
import { ApplyDietTemplateModalComponent } from './components/apply-diet-template-modal/apply-diet-template-modal.component';
import { ApplyRoutineModalComponent } from './components/apply-routine-modal/apply-routine-modal.component';
import { ProductSearchModalModule } from '../../shared/components/product-search-modal/product-search-modal.module';
import { NutritionCalendarComponent } from './pages/client-detail/components/nutrition-calendar/nutrition-calendar.component';
import { CheckinHistoryChartComponent } from './pages/client-detail/components/checkin-history-chart/checkin-history-chart.component';
import { CheckinWorkspaceComponent } from './pages/client-detail/components/checkin-workspace/checkin-workspace.component';
import { NutritionTrackingChartComponent } from './pages/client-detail/components/nutrition-tracking-chart/nutrition-tracking-chart.component';
import { WeightAdherenceChartComponent } from './pages/client-detail/components/weight-adherence-chart/weight-adherence-chart.component';
import { WeekComparisonCardsComponent } from './pages/client-detail/components/week-comparison-cards/week-comparison-cards.component';
import { NutritionHistoryFeedComponent } from './pages/client-detail/components/nutrition-history-feed/nutrition-history-feed.component';
import { ClientSummaryComponent } from './pages/client-detail/components/client-summary/client-summary.component';
import { ClientRosterComponent } from './components/client-roster/client-roster.component';
import { IntakeAnswersComponent } from './components/intake-answers/intake-answers.component';
import { PainPanelComponent } from './pages/client-detail/components/pain-panel/pain-panel.component';
import { ClientMediaPanelComponent } from './pages/client-detail/components/client-media-panel/client-media-panel.component';
import { CheckinPhotosCompareComponent } from './pages/client-detail/components/checkin-photos-compare/checkin-photos-compare.component';
import { ClientNotesComponent } from './pages/client-detail/components/client-notes/client-notes.component';
import { SupplementsPanelComponent } from './pages/client-detail/components/supplements-panel/supplements-panel.component';
import { ShoppingListPanelComponent } from './pages/client-detail/components/shopping-list-panel/shopping-list-panel.component';
import { NutritionPreferencesPanelComponent } from './pages/client-detail/components/nutrition-preferences-panel/nutrition-preferences-panel.component';
import { TrainingCalendarComponent } from './pages/client-detail/components/training-calendar/training-calendar.component';
import { TrainingComparisonChartComponent } from './pages/client-detail/components/training-comparison-chart/training-comparison-chart.component';
import { TrainingDayDetailComponent } from './pages/client-detail/components/training-day-detail/training-day-detail.component';
import { PhaseScheduleCalendarComponent } from './components/phase-schedule-calendar/phase-schedule-calendar.component';
import { DietCardModule } from '../../shared/components/diet-card/diet-card.module';
import { CheckinFieldSelectorModule } from '../../shared/components/checkin-field-selector/checkin-field-selector.module';
import { DateFieldModule } from '../../shared/components/date-field/date-field.module';
import { PaymentsSharedModule } from '../payments/payments-shared.module';
import { MacroAdjustModule } from '../../shared/components/macro-adjust/macro-adjust.module';
import { TrackingStatusComponent } from './pages/client-detail/components/tracking-status/tracking-status.component';

@NgModule({
  imports: [
    SharedModule,
    NavigationModule,
    ClientsPageRoutingModule,
    ProductSearchModalModule,
    SelectClientsModalModule,
    DietCardModule,
    // El bloque "cómo se ha calculado" del objetivo nutricional del cliente,
    // el mismo que usan el resumen de semana y el cajón.
    NeedBreakdownModule,
    // "Ajustar macros" al editar el objetivo nutricional.
    MacroAdjustModule,
    // Campos sueltos al programar un check-in o pedir algo puntual
    // (checkin-workspace).
    CheckinFieldSelectorModule,
    // Selector de fecha/hora con ion-datetime.
    DateFieldModule,
    // Cobros: Gestión > Cobros y la tarjeta del Resumen (features/payments).
    PaymentsSharedModule,
  ],
  declarations: [
    ClientsPage,
    ClientDetailPage,
    WeekSummaryPanelComponent,
    ApplyRoutineTemplateModalComponent,
    NextWeekModalComponent,
    CheckinSchedulesPanelComponent,
    CheckinScheduleHistoryPanelComponent,
    TrainingFilterPanelComponent,
    PerimeterFilterPanelComponent,
    ApplyDietTemplateModalComponent,
    ApplyRoutineModalComponent,
    NutritionCalendarComponent,
    CheckinHistoryChartComponent,
    CheckinWorkspaceComponent,
    TrackingStatusComponent,
    NutritionTrackingChartComponent,
    WeightAdherenceChartComponent,
    WeekComparisonCardsComponent,
    NutritionHistoryFeedComponent,
    ClientSummaryComponent,
    ClientRosterComponent,
    IntakeAnswersComponent,
    PainPanelComponent,
    ClientMediaPanelComponent,
    CheckinPhotosCompareComponent,
    ClientNotesComponent,
    SupplementsPanelComponent,
    ShoppingListPanelComponent,
    NutritionPreferencesPanelComponent,
    TrainingCalendarComponent,
    TrainingComparisonChartComponent,
    TrainingDayDetailComponent,
    PhaseScheduleCalendarComponent,
  ],
})
export class ClientsPageModule {}
