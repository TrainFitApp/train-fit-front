import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { TemplatesPageRoutingModule } from './templates-routing.module';
import { TemplatesPage } from './templates.page';
import { CategoryGridModule } from '../../shared/components/category-grid/category-grid.module';

@NgModule({
  imports: [SharedModule, NavigationModule, TemplatesPageRoutingModule, CategoryGridModule],
  declarations: [TemplatesPage],
})
export class TemplatesPageModule {}
