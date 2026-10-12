import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssistantService } from '../../services/assistant.service';
import { AssistantMascotComponent } from '../assistant-mascot/assistant-mascot.component';
import { AssistantSheetComponent } from '../assistant-sheet/assistant-sheet.component';

// La mascota junto al logo TRAINFIT de las cabeceras de la app cliente.
// Tocarla abre el chat. No sale si el usuario tiene un profesional activo.
@Component({
  selector: 'app-assistant-header-button',
  templateUrl: './assistant-header-button.component.html',
  styleUrls: ['./assistant-header-button.component.scss'],
})
export class AssistantHeaderButtonComponent implements OnInit, OnDestroy {
  public readonly assistant = inject(AssistantService);
  private readonly modalController = inject(ModalController);

  @ViewChild(AssistantMascotComponent) private mascot?: AssistantMascotComponent;

  // La hoja que abrió esta mascota (hay una por cabecera: Entreno, Dietas y
  // Perfil). Solo la cierra quien la abrió.
  private sheet: HTMLIonModalElement | null = null;
  private readonly destroy$ = new Subject<void>();

  public ngOnInit(): void {
    if (!this.assistant.state()) this.assistant.load();
    this.assistant.closeRequests$.pipe(takeUntil(this.destroy$)).subscribe(() => void this.sheet?.dismiss());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public greet(): void {
    this.mascot?.wave();
  }

  public async open(event: Event): Promise<void> {
    // La cabecera de Dietas lleva a hoy al tocarla: la mascota no.
    event.stopPropagation();
    this.greet();
    if (this.sheet || this.assistant.open()) return;
    this.assistant.load();
    const sheet = await this.modalController.create({ component: AssistantSheetComponent, cssClass: 'tf-assistant-modal' });
    this.sheet = sheet;
    this.assistant.open.set(true);
    void sheet.onDidDismiss().then(() => {
      if (this.sheet === sheet) this.sheet = null;
      this.assistant.open.set(false);
    });
    await sheet.present();
  }
}
