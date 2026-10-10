import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MacroAdjustComponent } from './macro-adjust.component';
import { LocalNumberPipeModule } from 'src/app/shared/pipes/local-number-pipe.module';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule, LocalNumberPipeModule],
  declarations: [MacroAdjustComponent],
  exports: [MacroAdjustComponent],
})
export class MacroAdjustModule {}
