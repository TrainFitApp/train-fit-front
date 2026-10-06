import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MacroAdjustComponent } from './macro-adjust.component';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [MacroAdjustComponent],
  exports: [MacroAdjustComponent],
})
export class MacroAdjustModule {}
