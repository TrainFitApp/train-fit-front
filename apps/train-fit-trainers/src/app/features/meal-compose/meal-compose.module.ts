import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { MealComposePageRoutingModule } from './meal-compose-routing.module';
import { MealSnippetPickerModule } from '../../shared/components/meal-snippet-picker/meal-snippet-picker.module';
import { ComposeMealPage } from './pages/compose-meal/compose-meal.page';
import { DateFieldComponent } from '../../shared/components/date-field/date-field.component';

@NgModule({
  imports: [SharedModule, NavigationModule, MealComposePageRoutingModule, MealSnippetPickerModule, DateFieldComponent],
  declarations: [ComposeMealPage],
})
export class MealComposePageModule {}
