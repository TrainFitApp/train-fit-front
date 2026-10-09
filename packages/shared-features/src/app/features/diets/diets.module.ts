import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DietDayPageModule } from '../diet-days/diet-day.module';
import { DailyWeightComponent } from './components/daily-weight/daily-weight.component';
import { SearchFoodsPageModule } from './components/meal/components/search-foods/search-foods.module';
import { MealComponent } from './components/meal/meal.component';
import { ClipboardMealModalComponent } from './components/clipboard-meal-modal/clipboard-meal-modal.component';
import { PautadoItemViewModule } from './components/pautado-item-view/pautado-item-view.module';
import { QuickAddSheetModule } from './components/meal/components/search-foods/components/quick-add-sheet/quick-add-sheet.module';
import { DatesSliderComponent } from './components/toolbar-calendar/components/dates-slider/dates-slider.component';
import { ToolbarCalendarComponent } from './components/toolbar-calendar/toolbar-calendar.component';
import { DietsPageRoutingModule } from './diets-routing.module';
import { DietsPage } from './diets.page';
import { MacrosBarsModule } from './components/macros-bars/macros-bars.module';
import { MenuPreviewModalComponent } from './components/menu-preview-modal/menu-preview-modal.component';
import { SupplementSheetComponent } from './components/supplement-sheet/supplement-sheet.component';

@NgModule({
  declarations: [
    DietsPage,
    DatesSliderComponent,
    ToolbarCalendarComponent,
    DailyWeightComponent,
    MealComponent,
    ClipboardMealModalComponent,
    MenuPreviewModalComponent,
    SupplementSheetComponent,
  ],
  imports: [
    SharedModule,
    MacrosBarsModule,
    PautadoItemViewModule,
    QuickAddSheetModule,
    DietsPageRoutingModule,
    NgChartsModule,
    SearchFoodsPageModule,
    DietDayPageModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DietsPageModule {}

