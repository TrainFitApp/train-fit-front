import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryGridComponent } from './category-grid.component';

@NgModule({
  // RouterModule explícito: SharedModule no lo reexporta y las tarjetas son
  // enlaces (routerLink), no botones con navigate() — así conservan
  // clic-medio, "abrir en pestaña nueva" y URL en la barra de estado.
  imports: [SharedModule, RouterModule],
  declarations: [CategoryGridComponent],
  exports: [CategoryGridComponent],
})
export class CategoryGridModule {}
