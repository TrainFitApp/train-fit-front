import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyShoppingListPage } from './my-shopping-list.page';

const routes: Routes = [{ path: '', component: MyShoppingListPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MyShoppingListPageRoutingModule {}
