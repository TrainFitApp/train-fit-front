import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutineTemplatesPageRoutingModule } from './routine-templates-routing.module';
import { RoutineTemplatesPage } from './routine-templates.page';

@NgModule({
  imports: [SharedModule, RoutineTemplatesPageRoutingModule],
  declarations: [RoutineTemplatesPage],
})
export class RoutineTemplatesPageModule {}
