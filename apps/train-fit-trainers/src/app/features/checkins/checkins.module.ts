import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckinsPageRoutingModule } from './checkins-routing.module';
import { CheckinsPage } from './checkins.page';

@NgModule({
  imports: [SharedModule, CheckinsPageRoutingModule],
  declarations: [CheckinsPage],
})
export class CheckinsPageModule {}
