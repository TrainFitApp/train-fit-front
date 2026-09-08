import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { FoodExchangesPageRoutingModule } from './food-exchanges-routing.module';
import { FoodExchangesPage } from './food-exchanges.page';

@NgModule({
  imports: [SharedModule, NavigationModule, FoodExchangesPageRoutingModule],
  declarations: [FoodExchangesPage],
})
export class FoodExchangesPageModule {}