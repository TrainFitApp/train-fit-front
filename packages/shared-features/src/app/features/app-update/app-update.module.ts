import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppUpdateModalComponent } from './app-update-modal.component';
import { MaintenanceModalComponent } from './maintenance-modal.component';

@NgModule({
  declarations: [AppUpdateModalComponent, MaintenanceModalComponent],
  imports: [CommonModule, IonicModule],
})
export class AppUpdateModule {}
