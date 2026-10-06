import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ApplyCheckinTemplateModalComponent } from './apply-checkin-template-modal.component';

// Modal de "Aplicar plantilla de check-in" (Plantillas y Método).
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
  declarations: [ApplyCheckinTemplateModalComponent],
})
export class ApplyCheckinTemplateModalModule {}
