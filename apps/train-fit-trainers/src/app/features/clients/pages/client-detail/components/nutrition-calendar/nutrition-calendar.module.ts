import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NutritionCalendarComponent } from './nutrition-calendar.component';

// Módulo propio porque lo usan dos pantallas: la ficha del cliente (Plan ›
// Nutrición) y la hoja para elegir desde qué día empieza una fase de dieta
// (diet-templates/components/phase-start-sheet).
@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [NutritionCalendarComponent],
  exports: [NutritionCalendarComponent],
})
export class NutritionCalendarModule {}
