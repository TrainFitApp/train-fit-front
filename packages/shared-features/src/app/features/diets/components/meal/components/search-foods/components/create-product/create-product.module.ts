import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateProductPage } from './create-product.page';
import { SharedModule } from 'src/app/shared/shared.module';

// Fix5 (train-fit-trainers) — el routing vive aparte, en
// CreateProductPageRoutingModule: así este módulo solo declara/exporta el
// componente y puede importarse desde OTRA app (el constructor de
// plantillas del trainer, vía ion-modal) sin arrastrar un
// RouterModule.forChild({path:''}) que pisaría las rutas propias de quien
// lo importe. NG6007 exige que el componente se declare en un único
// NgModule dentro del mismo programa TS — por eso un único punto de
// declaración+exports, reutilizado por rutas y por modal.
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SharedModule],
  declarations: [CreateProductPage],
  exports: [CreateProductPage],
})
export class CreateProductPageModule {}
