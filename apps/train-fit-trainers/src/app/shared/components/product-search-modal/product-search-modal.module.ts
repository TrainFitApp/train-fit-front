import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductSearchModalComponent } from './product-search-modal.component';

// Movido de features/clients a shared para reutilizarlo también desde
// diet-templates (constructor de plantillas) — un componente no puede
// declararse en dos NgModules distintos.
@NgModule({
  imports: [SharedModule],
  declarations: [ProductSearchModalComponent],
  exports: [ProductSearchModalComponent],
})
export class ProductSearchModalModule {}
