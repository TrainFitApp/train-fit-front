import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { AssistantService } from '../../services/assistant.service';
import { AssistantTextService } from '../../services/assistant-text.service';
import { energyTone } from '../../assistant-view.util';
import { AssistantMascotComponent } from '../assistant-mascot/assistant-mascot.component';

const HIDDEN_KEY = 'tf-assistant-hidden';

// La mascota en el menú lateral de trainers, abajo a la izquierda: no tapa
// nada del contenido. Se puede ocultar y se queda en el menú como una fila
// más; con el menú contraído, solo el icono. Abre el panel del chat
// (AssistantPanelComponent, montado fuera del menú).
@Component({
  selector: 'app-assistant-dock',
  templateUrl: './assistant-dock.component.html',
  styleUrls: ['./assistant-dock.component.scss'],
})
export class AssistantDockComponent implements OnInit {
  public readonly assistant = inject(AssistantService);
  public readonly text = inject(AssistantTextService);

  // El menú está contraído (solo iconos).
  @Input() public collapsed = false;

  @ViewChild(AssistantMascotComponent) private mascot?: AssistantMascotComponent;

  public hidden = this.readHidden();

  public ngOnInit(): void {
    if (!this.assistant.state()) this.assistant.load();
  }

  public get tone(): string {
    return energyTone(this.assistant.energy()?.level);
  }

  public get hintKey(): string {
    if (!this.assistant.available()) return 'ASSISTANT.DOCK.RESTING';
    if (this.tone === 'empty') return 'ASSISTANT.DOCK.EMPTY';
    return this.assistant.open() ? 'ASSISTANT.DOCK.OPEN' : 'ASSISTANT.DOCK.ASK';
  }

  public get resetsOn(): string {
    const energy = this.assistant.energy();
    return energy ? this.text.day(energy.resetsOn) : '';
  }

  public greet(): void {
    this.mascot?.wave();
  }

  public toggleChat(): void {
    this.greet();
    if (!this.assistant.open()) this.assistant.load();
    this.assistant.open.set(!this.assistant.open());
  }

  public setHidden(hidden: boolean): void {
    this.hidden = hidden;
    try {
      localStorage.setItem(HIDDEN_KEY, hidden ? '1' : '0');
    } catch {
      // Sin almacenamiento, se recuerda solo mientras dure la sesión.
    }
  }

  private readHidden(): boolean {
    try {
      return localStorage.getItem(HIDDEN_KEY) === '1';
    } catch {
      return false;
    }
  }
}
