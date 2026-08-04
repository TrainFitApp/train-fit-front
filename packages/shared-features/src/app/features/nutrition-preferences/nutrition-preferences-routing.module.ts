import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionPreferencesPage } from './nutrition-preferences.page';

const routes: Routes = [
  {
    path: '',
    component: NutritionPreferencesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class NutritionPreferencesPageRoutingModule {}
