import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietCardComponent } from './diet-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DietCardComponent],
  exports: [DietCardComponent],
})
export class DietCardModule {}
