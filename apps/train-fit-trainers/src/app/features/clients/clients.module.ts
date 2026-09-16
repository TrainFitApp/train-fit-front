import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';
import { ClientDetailPage } from './pages/client-detail/client-detail.page';
import { SelectClientsModalModule } from './components/select-clients-modal/select-clients-modal.module';
import { ApplyDietTemplateModalComponent } from './components/apply-diet-template-modal/apply-diet-template-modal.component';
import { ApplyRoutineModalComponent } from './components/apply-routine-modal/apply-routine-modal.component';
import { ProductSearchModalModule } from '../../shared/components/product-search-modal/product-search-modal.module';
import { NutritionCalendarComponent } from './pages/client-detail/components/nutrition-calendar/nutrition-calendar.component';
import { CheckinHistoryChartComponent } from './pages/client-detail/components/checkin-history-chart/checkin-history-chart.component';
import { CheckinWorkspaceComponent } from './pages/client-detail/components/checkin-workspace/checkin-workspace.component';
import { NutritionTrackingChartComponent } from './pages/client-detail/components/nutrition-tracking-chart/nutrition-tracking-chart.component';
import { WeightAdherenceChartComponent } from './pages/client-detail/components/weight-adherence-chart/weight-adherence-chart.component';
import { CycleComparisonCardsComponent } from './pages/client-detail/components/cycle-comparison-cards/cycle-comparison-cards.component';
import { NutritionHistoryFeedComponent } from './pages/client-detail/components/nutrition-history-feed/nutrition-history-feed.component';
import { ClientSummaryComponent } from './pages/client-detail/components/client-summary/client-summary.component';
import { ClientRosterComponent } from './components/client-roster/client-roster.component';
import { BodyCalculatorComponent } from './pages/client-detail/components/body-calculator/body-calculator.component';
import { PainPanelComponent } from './pages/client-detail/components/pain-panel/pain-panel.component';
import { SupplementsPanelComponent } from './pages/client-detail/components/supplements-panel/supplements-panel.component';
import { ShoppingListPanelComponent } from './pages/client-detail/components/shopping-list-panel/shopping-list-panel.component';
import { NutritionPreferencesPanelComponent } from './pages/client-detail/components/nutrition-preferences-panel/nutrition-preferences-panel.component';
import { TrainingCalendarComponent } from './pages/client-detail/components/training-calendar/training-calendar.component';
import { TrainingComparisonChartComponent } from './pages/client-detail/components/training-comparison-chart/training-comparison-chart.component';
import { TrainingDayDetailComponent } from './pages/client-detail/components/training-day-detail/training-day-detail.component';
import { DietCardModule } from '../../shared/components/diet-card/diet-card.module';

@NgModule({
  imports: [
    SharedModule,
    NavigationModule,
    ClientsPageRoutingModule,
    ProductSearchModalModule,
    SelectClientsModalModule,
    DietCardModule,
  ],
  declarations: [
    ClientsPage,
    ClientDetailPage,
    ApplyDietTemplateModalComponent,
    ApplyRoutineModalComponent,
    NutritionCalendarComponent,
    CheckinHistoryChartComponent,
    CheckinWorkspaceComponent,
    NutritionTrackingChartComponent,
    WeightAdherenceChartComponent,
    CycleComparisonCardsComponent,
    NutritionHistoryFeedComponent,
    ClientSummaryComponent,
    ClientRosterComponent,
    BodyCalculatorComponent,
    PainPanelComponent,
    SupplementsPanelComponent,
    ShoppingListPanelComponent,
    NutritionPreferencesPanelComponent,
    TrainingCalendarComponent,
    TrainingComparisonChartComponent,
    TrainingDayDetailComponent,
  ],
})
export class ClientsPageModule {}
