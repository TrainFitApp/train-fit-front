import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PautadoItemViewComponent } from './pautado-item-view.component';

// Módulo propio (antes se declaraba suelto en DietsPageModule) para que
// también pueda abrirlo la búsqueda de alimentos: SearchFoodsPageModule ya
// lo importa DietsPageModule, así que declararlo allí y usarlo aquí habría
// cerrado un ciclo entre los dos módulos.
@NgModule({
  declarations: [PautadoItemViewComponent],
  imports: [SharedModule],
  exports: [PautadoItemViewComponent],
})
export class PautadoItemViewModule {}
