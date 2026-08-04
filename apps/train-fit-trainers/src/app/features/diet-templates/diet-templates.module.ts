import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DietTemplatesPageRoutingModule } from './diet-templates-routing.module';
import { ProductSearchModalModule } from '../../shared/components/product-search-modal/product-search-modal.module';
import { DietTemplatesListPage } from './pages/diet-templates-list/diet-templates-list.page';
import { DietTemplateBuilderPage } from './pages/diet-template-builder/diet-template-builder.page';

@NgModule({
  imports: [SharedModule, DietTemplatesPageRoutingModule, ProductSearchModalModule],
  declarations: [DietTemplatesListPage, DietTemplateBuilderPage],
})
export class DietTemplatesPageModule {}
