import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoachPageRoutingModule } from './coach-routing.module';
import { CoachPage } from './coach.page';

@NgModule({
  imports: [SharedModule, CoachPageRoutingModule],
  declarations: [CoachPage],
})
export class CoachPageModule {}
