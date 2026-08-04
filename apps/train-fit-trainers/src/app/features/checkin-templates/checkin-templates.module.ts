import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckinTemplatesPageRoutingModule } from './checkin-templates-routing.module';
import { CheckinTemplatesPage } from './checkin-templates.page';

@NgModule({
  imports: [SharedModule, CheckinTemplatesPageRoutingModule],
  declarations: [CheckinTemplatesPage],
})
export class CheckinTemplatesPageModule {}
