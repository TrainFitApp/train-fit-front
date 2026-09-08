import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { RoutineTemplatesPageRoutingModule } from './routine-templates-routing.module';
import { RoutineTemplatesPage } from './routine-templates.page';

@NgModule({
  imports: [SharedModule, NavigationModule, RoutineTemplatesPageRoutingModule],
  declarations: [RoutineTemplatesPage],
})
export class RoutineTemplatesPageModule {}
