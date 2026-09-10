import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckinFieldSelectorComponent } from '../../shared/components/checkin-field-selector/checkin-field-selector.component';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { CheckinTemplatesPageRoutingModule } from './checkin-templates-routing.module';
import { CheckinTemplatesPage } from './checkin-templates.page';

@NgModule({
  imports: [
    SharedModule,
    NavigationModule,
    CheckinTemplatesPageRoutingModule,
    CheckinFieldSelectorComponent,
  ],
  declarations: [CheckinTemplatesPage],
})
export class CheckinTemplatesPageModule {}
