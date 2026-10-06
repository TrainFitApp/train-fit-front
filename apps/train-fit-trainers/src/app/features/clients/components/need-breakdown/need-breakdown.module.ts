import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NeedBreakdownComponent } from './need-breakdown.component';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [NeedBreakdownComponent],
  exports: [NeedBreakdownComponent],
})
export class NeedBreakdownModule {}
