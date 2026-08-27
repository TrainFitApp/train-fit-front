import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodExchangesPage } from './food-exchanges.page';

const routes: Routes = [{ path: '', component: FoodExchangesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodExchangesPageRoutingModule {}