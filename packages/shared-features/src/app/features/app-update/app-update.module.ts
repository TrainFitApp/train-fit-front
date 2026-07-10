import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppUpdateModalComponent } from './app-update-modal.component';

@NgModule({
  declarations: [AppUpdateModalComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class AppUpdateModule {}
