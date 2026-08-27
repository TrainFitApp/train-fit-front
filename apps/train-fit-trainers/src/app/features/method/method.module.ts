import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryGridModule } from '../../shared/components/category-grid/category-grid.module';
import { MethodPageRoutingModule } from './method-routing.module';
import { MethodPage } from './method.page';

@NgModule({
  imports: [SharedModule, MethodPageRoutingModule, CategoryGridModule],
  declarations: [MethodPage],
})
export class MethodPageModule {}
