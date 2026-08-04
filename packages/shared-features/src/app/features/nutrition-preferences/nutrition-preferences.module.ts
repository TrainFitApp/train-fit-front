import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NutritionPreferencesPageRoutingModule } from './nutrition-preferences-routing.module';
import { NutritionPreferencesPage } from './nutrition-preferences.page';

@NgModule({
  imports: [SharedModule, NutritionPreferencesPageRoutingModule],
  declarations: [NutritionPreferencesPage],
})
export class NutritionPreferencesPageModule {}
