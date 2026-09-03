import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkoutComponentModule } from 'src/app/features/tables/components/summary/components/mesocycle/components/workout/workout.module';
import { PlannerPageRoutingModule } from './planner-routing.module';
import { PlannerPage } from './planner.page';
import { PlannerColumnComponent } from './components/planner-column/planner-column.component';
import { TemplatePickerModalComponent } from './components/template-picker-modal/template-picker-modal.component';
import { SessionLoadPanelComponent } from './components/session-load-panel/session-load-panel.component';
import { MuscleVolumePanelComponent } from './components/muscle-volume-panel/muscle-volume-panel.component';

@NgModule({
  imports: [SharedModule, PlannerPageRoutingModule, DragDropModule, WorkoutComponentModule],
  declarations: [
    PlannerPage,
    PlannerColumnComponent,
    TemplatePickerModalComponent,
    SessionLoadPanelComponent,
    MuscleVolumePanelComponent,
  ],
})
export class PlannerPageModule {}
