import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailPanelComponent } from './product-detail-panel.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ProductDetailPanelComponent],
  exports: [ProductDetailPanelComponent],
})
export class ProductDetailPanelModule {}
