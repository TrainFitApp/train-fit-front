import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyFoodExchangesPageRoutingModule } from './my-food-exchanges-routing.module';
import { MyFoodExchangesPage } from './my-food-exchanges.page';

@NgModule({
  imports: [SharedModule, MyFoodExchangesPageRoutingModule],
  declarations: [MyFoodExchangesPage],
})
export class MyFoodExchangesPageModule {}