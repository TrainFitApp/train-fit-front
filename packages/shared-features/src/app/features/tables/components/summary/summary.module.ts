import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ExercisesPageModule } from 'src/app/features/exercises/exercises.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SummmaryPageRoutingModule } from './summary-routing.module';
import { SummaryPage } from './summary.page';
import { SetsHeatmapComponent } from './components/sets-heatmap/sets-heatmap.component';
import { HeatmapCellPopoverComponent } from './components/sets-heatmap/heatmap-cell-popover/heatmap-cell-popover.component';

@NgModule({
  declarations: [SummaryPage, SetsHeatmapComponent, HeatmapCellPopoverComponent],
  imports: [SharedModule, ExercisesPageModule, SummmaryPageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SummaryPageModule {}
