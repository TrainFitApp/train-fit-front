import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DietCardComponent } from './diet-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [DietCardComponent],
  exports: [DietCardComponent],
})
export class DietCardModule {}
