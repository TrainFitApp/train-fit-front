import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MesocyclePageRoutingModule } from './mesocycle-routing.module';
import { MesocyclePage } from './mesocycle.page';
import { OrderExercisesPageModule } from './components/order-exercises/order-exercises.module';
import { SplitMenuPopoverComponent } from './components/split-menu-popover/split-menu-popover.component';
import { WorkoutComponentModule } from './components/workout/workout.module';
import { DeleteSplitsModalComponent } from './components/delete-splits-modal/delete-splits-modal.component';
import { SkipWorkoutModalComponent } from './components/skip-workout-modal/skip-workout-modal.component';
import { ClipboardExercisesModalComponent } from './components/clipboard-exercises-modal/clipboard-exercises-modal.component';

@NgModule({
  imports: [SharedModule, MesocyclePageRoutingModule, OrderExercisesPageModule, WorkoutComponentModule],
  declarations: [
    MesocyclePage,
    SplitMenuPopoverComponent,
    DeleteSplitsModalComponent,
    SkipWorkoutModalComponent,
    ClipboardExercisesModalComponent,
  ],
})
export class MesocyclePageModule {}
