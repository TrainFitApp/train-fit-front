import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyShoppingListPageRoutingModule } from './my-shopping-list-routing.module';
import { MyShoppingListPage } from './my-shopping-list.page';

@NgModule({
  imports: [SharedModule, MyShoppingListPageRoutingModule],
  declarations: [MyShoppingListPage],
})
export class MyShoppingListPageModule {}
