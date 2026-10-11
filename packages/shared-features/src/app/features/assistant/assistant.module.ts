import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AssistantMascotComponent } from './components/assistant-mascot/assistant-mascot.component';
import { AssistantChatComponent } from './components/assistant-chat/assistant-chat.component';
import { AssistantSheetComponent } from './components/assistant-sheet/assistant-sheet.component';
import { AssistantHeaderButtonComponent } from './components/assistant-header-button/assistant-header-button.component';
import { AssistantDockComponent } from './components/assistant-dock/assistant-dock.component';
import { AssistantPanelComponent } from './components/assistant-panel/assistant-panel.component';

// Asistente trAInfit. La app cliente monta la mascota en sus cabeceras
// (app-assistant-header-button); trainers, en su menú lateral
// (app-assistant-dock) con el panel del chat en el shell (app-assistant-panel).
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
  declarations: [
    AssistantMascotComponent,
    AssistantChatComponent,
    AssistantSheetComponent,
    AssistantHeaderButtonComponent,
    AssistantDockComponent,
    AssistantPanelComponent,
  ],
  exports: [AssistantMascotComponent, AssistantHeaderButtonComponent, AssistantDockComponent, AssistantPanelComponent],
})
export class AssistantModule {}
