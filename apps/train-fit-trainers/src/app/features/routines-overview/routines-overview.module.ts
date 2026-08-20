import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutinesOverviewPageRoutingModule } from './routines-overview-routing.module';
import { RoutinesOverviewPage } from './routines-overview.page';

@NgModule({
  imports: [SharedModule, RoutinesOverviewPageRoutingModule],
  declarations: [RoutinesOverviewPage],
})
export class RoutinesOverviewPageModule {}
