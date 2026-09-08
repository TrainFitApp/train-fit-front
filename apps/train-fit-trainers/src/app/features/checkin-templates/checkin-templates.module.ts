import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { CheckinTemplatesPageRoutingModule } from './checkin-templates-routing.module';
import { CheckinTemplatesPage } from './checkin-templates.page';

@NgModule({
  imports: [SharedModule, NavigationModule, CheckinTemplatesPageRoutingModule],
  declarations: [CheckinTemplatesPage],
})
export class CheckinTemplatesPageModule {}
