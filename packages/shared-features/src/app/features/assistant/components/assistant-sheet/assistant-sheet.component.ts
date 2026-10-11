import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';

// El chat a pantalla completa de la app cliente (la abre la mascota de la
// cabecera, que es también quien la cierra cuando el asistente lleva a otra
// pantalla).
@Component({
  selector: 'app-assistant-sheet',
  template: '<app-assistant-chat layout="sheet" (closed)="dismiss()"></app-assistant-chat>',
  styles: [':host { display: block; height: 100%; }'],
})
export class AssistantSheetComponent {
  private readonly modalController = inject(ModalController);

  public dismiss(): void {
    void this.modalController.dismiss().catch(() => undefined);
  }
}
