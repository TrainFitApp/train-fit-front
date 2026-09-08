import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { RoutinesPageRoutingModule } from './routines-routing.module';
import { RoutinesPage } from './routines.page';
import { RoutineBuilderPage } from './pages/routine-builder/routine-builder.page';

@NgModule({
  imports: [SharedModule, NavigationModule, RoutinesPageRoutingModule],
  declarations: [RoutinesPage, RoutineBuilderPage],
})
export class RoutinesPageModule {}
