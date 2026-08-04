import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietTemplatesListPage } from './pages/diet-templates-list/diet-templates-list.page';
import { DietTemplateBuilderPage } from './pages/diet-template-builder/diet-template-builder.page';

const routes: Routes = [
  { path: '', component: DietTemplatesListPage },
  { path: ':id', component: DietTemplateBuilderPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietTemplatesPageRoutingModule {}
