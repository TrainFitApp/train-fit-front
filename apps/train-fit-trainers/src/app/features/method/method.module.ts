import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { CategoryGridModule } from '../../shared/components/category-grid/category-grid.module';
import { MethodPageRoutingModule } from './method-routing.module';
import { MethodPage } from './method.page';
import { ApplyCheckinTemplateModalModule } from '../checkin-templates/components/apply-checkin-template-modal/apply-checkin-template-modal.module';

@NgModule({
  imports: [SharedModule, NavigationModule, MethodPageRoutingModule, CategoryGridModule, ApplyCheckinTemplateModalModule],
  declarations: [MethodPage],
})
export class MethodPageModule {}
