import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderSetsPage } from './order-sets.page';

@NgModule({
  declarations: [OrderSetsPage],
  imports: [SharedModule],
  exports: [OrderSetsPage],
})
export class OrderSetsPageModule {}
