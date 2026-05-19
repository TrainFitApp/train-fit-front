import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementHomePage } from './management-home.page';
import { ManagementHomePageRoutingModule } from './management-home-routing.module';

@NgModule({
  declarations: [ManagementHomePage],
  imports: [SharedModule, ManagementHomePageRoutingModule],
})
export class ManagementHomePageModule {}
