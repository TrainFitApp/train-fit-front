import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { CategoryGridModule } from '../../shared/components/category-grid/category-grid.module';
import { MethodPageRoutingModule } from './method-routing.module';
import { MethodPage } from './method.page';

@NgModule({
  imports: [SharedModule, NavigationModule, MethodPageRoutingModule, CategoryGridModule],
  declarations: [MethodPage],
})
export class MethodPageModule {}
