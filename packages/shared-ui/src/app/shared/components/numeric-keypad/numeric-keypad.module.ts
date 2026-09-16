import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NumericKeypadComponent } from './numeric-keypad.component';
import { NumericKeypadDirective } from './numeric-keypad.directive';

// Módulo propio, separado de SharedModule, para que el AppModule de cada
// app pueda montar <app-numeric-keypad> en app.component.html sin arrastrar
// todo SharedModule al bundle inicial. SharedModule lo importa y reexporta.
@NgModule({
  declarations: [NumericKeypadComponent, NumericKeypadDirective],
  imports: [CommonModule, IonicModule],
  exports: [NumericKeypadComponent, NumericKeypadDirective],
})
export class NumericKeypadModule {}
