import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemplatesPageRoutingModule } from './templates-routing.module';
import { TemplatesPage } from './templates.page';
import { CategoryGridModule } from '../../shared/components/category-grid/category-grid.module';

@NgModule({
  imports: [SharedModule, TemplatesPageRoutingModule, CategoryGridModule],
  declarations: [TemplatesPage],
})
export class TemplatesPageModule {}
