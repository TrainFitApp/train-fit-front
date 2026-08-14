import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutinesPageRoutingModule } from './routines-routing.module';
import { RoutinesPage } from './routines.page';
import { RoutineBuilderPage } from './pages/routine-builder/routine-builder.page';

@NgModule({
  imports: [SharedModule, RoutinesPageRoutingModule],
  declarations: [RoutinesPage, RoutineBuilderPage],
})
export class RoutinesPageModule {}
