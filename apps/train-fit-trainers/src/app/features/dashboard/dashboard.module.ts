import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { DateFieldComponent } from '../../shared/components/date-field/date-field.component';

@NgModule({
  imports: [SharedModule, NavigationModule, DashboardPageRoutingModule, DateFieldComponent],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
