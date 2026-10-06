import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { DateFieldModule } from '../../shared/components/date-field/date-field.module';

@NgModule({
  imports: [SharedModule, NavigationModule, DashboardPageRoutingModule, DateFieldModule],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
