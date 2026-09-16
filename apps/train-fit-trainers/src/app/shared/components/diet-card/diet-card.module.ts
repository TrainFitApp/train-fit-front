import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DietCardComponent } from './diet-card.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [DietCardComponent],
  exports: [DietCardComponent],
})
export class DietCardModule {}
