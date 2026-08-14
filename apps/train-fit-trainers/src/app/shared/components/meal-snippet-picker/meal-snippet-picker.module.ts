import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealSnippetPickerComponent } from './meal-snippet-picker.component';

// TAREA5 (auditoría UX, Fase C) — reutilizado desde diet-templates (tablero
// semanal), meal-compose y client-detail; vive en shared por el mismo
// motivo que ProductSearchModalModule (un componente no puede declararse en
// dos NgModules distintos).
@NgModule({
  imports: [SharedModule],
  declarations: [MealSnippetPickerComponent],
  exports: [MealSnippetPickerComponent],
})
export class MealSnippetPickerModule {}
