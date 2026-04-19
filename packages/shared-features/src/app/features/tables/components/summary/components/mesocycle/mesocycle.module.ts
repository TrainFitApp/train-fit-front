import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MesocyclePageRoutingModule } from './mesocycle-routing.module';
import { MesocyclePage } from './mesocycle.page';
import { OrderExercisesPage } from './components/order-exercises/order-exercises.page';
import { SplitMenuPopoverComponent } from './components/split-menu-popover/split-menu-popover.component';
import { WorkoutComponent } from './components/workout/workout.component';

@NgModule({
  imports: [SharedModule, MesocyclePageRoutingModule],
  declarations: [
    WorkoutComponent,
    OrderExercisesPage,
    MesocyclePage,
    SplitMenuPopoverComponent,
  ],
})
export class MesocyclePageModule {}
