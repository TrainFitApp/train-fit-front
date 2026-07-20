import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaintenanceConfigPage } from './maintenance-config.page';
import { MaintenanceConfigPageRoutingModule } from './maintenance-config-routing.module';

@NgModule({
  declarations: [MaintenanceConfigPage],
  imports: [SharedModule, MaintenanceConfigPageRoutingModule],
})
export class MaintenanceConfigPageModule {}
