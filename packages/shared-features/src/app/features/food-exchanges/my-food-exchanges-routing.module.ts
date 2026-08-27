import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFoodExchangesPage } from './my-food-exchanges.page';

const routes: Routes = [{ path: '', component: MyFoodExchangesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MyFoodExchangesPageRoutingModule {}