import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MaintenanceModalComponent } from './maintenance-modal.component';

@NgModule({
  declarations: [MaintenanceModalComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class MaintenanceModule {}
