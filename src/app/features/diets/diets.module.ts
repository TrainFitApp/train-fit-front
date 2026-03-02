import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';
import { DietDayPageModule } from '../diet-days/diet-day.module';
import { DailyWeightComponent } from './components/daily-weight/daily-weight.component';
import { SearchFoodsPageModule } from './components/meal/components/search-foods/search-foods.module';
import { MealComponent } from './components/meal/meal.component';
import { DatesSliderComponent } from './components/toolbar-calendar/components/dates-slider/dates-slider.component';
import { ToolbarCalendarComponent } from './components/toolbar-calendar/toolbar-calendar.component';
import { DietsPageRoutingModule } from './diets-routing.module';
import { DietsPage } from './diets.page';
import { MacrosBarsModule } from './components/macros-bars/macros-bars.module';
import { NutritionalObjectivesModule } from './components/nutritional-objectives/nutritional-objectives.module';

@NgModule({
  declarations: [
    DietsPage,
    DatesSliderComponent,
    ToolbarCalendarComponent,
    DailyWeightComponent,
    MealComponent,
  ],
  imports: [
    SharedModule,
    MacrosBarsModule,
    NutritionalObjectivesModule,
    DietsPageRoutingModule,
    NgChartsModule,
    SearchFoodsPageModule,
    DietDayPageModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DietsPageModule {}
