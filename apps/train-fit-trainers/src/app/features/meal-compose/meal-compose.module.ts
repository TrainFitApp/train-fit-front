import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealComposePageRoutingModule } from './meal-compose-routing.module';
import { MealSnippetPickerModule } from '../../shared/components/meal-snippet-picker/meal-snippet-picker.module';
import { ComposeMealPage } from './pages/compose-meal/compose-meal.page';

@NgModule({
  imports: [SharedModule, MealComposePageRoutingModule, MealSnippetPickerModule],
  declarations: [ComposeMealPage],
})
export class MealComposePageModule {}
