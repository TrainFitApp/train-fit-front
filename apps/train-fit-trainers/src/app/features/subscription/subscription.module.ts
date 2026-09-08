import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { SubscriptionPageRoutingModule } from './subscription-routing.module';
import { SubscriptionPage } from './subscription.page';

@NgModule({
  imports: [SharedModule, NavigationModule, SubscriptionPageRoutingModule],
  declarations: [SubscriptionPage],
})
export class SubscriptionPageModule {}
