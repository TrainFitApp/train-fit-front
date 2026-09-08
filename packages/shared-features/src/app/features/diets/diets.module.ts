import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DietDayPageModule } from '../diet-days/diet-day.module';
import { DailyWeightComponent } from './components/daily-weight/daily-weight.component';
import { SearchFoodsPageModule } from './components/meal/components/search-foods/search-foods.module';
import { MealComponent } from './components/meal/meal.component';
import { ClipboardMealModalComponent } from './components/clipboard-meal-modal/clipboard-meal-modal.component';
import { PautadoItemViewComponent } from './components/pautado-item-view/pautado-item-view.component';
import { DatesSliderComponent } from './components/toolbar-calendar/components/dates-slider/dates-slider.component';
import { ToolbarCalendarComponent } from './components/toolbar-calendar/toolbar-calendar.component';
import { DietsPageRoutingModule } from './diets-routing.module';
import { DietsPage } from './diets.page';
import { MacrosBarsModule } from './components/macros-bars/macros-bars.module';

@NgModule({
  declarations: [
    DietsPage,
    DatesSliderComponent,
    ToolbarCalendarComponent,
    DailyWeightComponent,
    MealComponent,
    ClipboardMealModalComponent,
    PautadoItemViewComponent,
  ],
  imports: [
    SharedModule,
    MacrosBarsModule,
    DietsPageRoutingModule,
    NgChartsModule,
    SearchFoodsPageModule,
    DietDayPageModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DietsPageModule {}

