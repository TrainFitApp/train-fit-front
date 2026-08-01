import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriptionPageRoutingModule } from './subscription-routing.module';
import { SubscriptionPage } from './subscription.page';

@NgModule({
  imports: [SharedModule, SubscriptionPageRoutingModule],
  declarations: [SubscriptionPage],
})
export class SubscriptionPageModule {}
