import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainerBillingPage } from './trainer-billing.page';
import { TrainerBillingPageRoutingModule } from './trainer-billing-routing.module';

@NgModule({
  declarations: [TrainerBillingPage],
  imports: [SharedModule, TrainerBillingPageRoutingModule],
})
export class TrainerBillingPageModule {}
