import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuickAddSheetComponent } from './quick-add-sheet.component';

// Módulo propio (y no una declaración suelta en SearchFoodsPageModule, como
// CreateFoodSheetComponent) porque la hoja la abren dos sitios: el botón + del
// buscador para crear la línea, y la comida de la pantalla de dieta para
// editarla. Mismo criterio que PautadoItemViewModule.
@NgModule({
  declarations: [QuickAddSheetComponent],
  imports: [SharedModule],
  exports: [QuickAddSheetComponent],
})
export class QuickAddSheetModule {}
