import { Component, HostListener, Input, inject } from '@angular/core';
import { AssistantService } from '../../services/assistant.service';

// El chat de trAInfit en trainers: un panel pegado al menú lateral, abajo a
// la izquierda, encima del contenido pero sin taparlo entero (se sigue
// trabajando detrás: el asistente navega y el panel se queda). Va montado
// fuera del menú (en el shell) para que el menú no lo recorte. En pantallas
// estrechas ocupa toda la pantalla.
@Component({
  selector: 'app-assistant-panel',
  template: `
    <div class="panel" *ngIf="assistant.open() && assistant.visible()" [style.left.px]="left" role="dialog" [attr.aria-label]="'ASSISTANT.NAME' | translate">
      <app-assistant-chat layout="panel" (closed)="close()"></app-assistant-chat>
    </div>
  `,
  styleUrls: ['./assistant-panel.component.scss'],
})
export class AssistantPanelComponent {
  public readonly assistant = inject(AssistantService);

  // Ancho del menú lateral (el del shell: 268 px, o 72 px contraído).
  @Input() public sidebarWidth = 268;

  public get left(): number {
    return this.sidebarWidth + 12;
  }

  public close(): void {
    this.assistant.open.set(false);
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    if (this.assistant.open()) this.close();
  }
}
