import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import { DailyDeviation, PhaseCyclesResponse } from '../../../diet-templates/models/diet-suggestion.model';

// Ciclos por contenido (docs/plan-ciclos-por-contenido.md) — el siguiente
// ciclo de la fase: qué dice la sugerencia (peso + adherencia del ciclo
// actual, con los desvíos día a día) y con qué kcal se quiere preparar. No
// guarda nada: "Preparar" lleva al builder con el contenido ya escalado, y
// es el builder quien persiste (o no, si no cambia nada). "Descartar" borra
// un ciclo ya preparado para volver a heredar.
@Component({
  selector: 'app-next-cycle-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './next-cycle-modal.component.html',
  styleUrls: ['./next-cycle-modal.component.scss'],
})
export class NextCycleModalComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public phaseId!: string;
  @Input() public clientName = 'este cliente';
  @Input() public cycles!: PhaseCyclesResponse;

  public targetKcal = 0;
  public discarding = false;
  public showDeviations = false;

  constructor(
    private modalController: ModalController,
    private api: DietSuggestionApiService,
    private ionicUtil: IonicUtilService
  ) {}

  public ngOnInit(): void {
    const next = this.cycles.next;
    this.targetKcal = next.override?.profile.kcal ?? (next.suggestion.hasData ? next.suggestion.nextCycleKcal : next.inherits?.profile.kcal ?? 0);
  }

  public get next(): PhaseCyclesResponse['next'] {
    return this.cycles.next;
  }

  public get suggestion(): PhaseCyclesResponse['next']['suggestion'] {
    return this.cycles.next.suggestion;
  }

  public get alreadyPrepared(): boolean {
    return !!this.cycles.next.override;
  }

  // Contra qué se compara el cambio: las kcal del ciclo actual.
  public get baseKcal(): number {
    return this.cycles.current.override.profile.kcal;
  }

  public get kcalDelta(): number {
    return Math.round(this.targetKcal - this.baseKcal);
  }

  public get periodLabel(): string {
    return `Del ${this.fmt(this.next.start)} al ${this.fmt(this.next.end)}`;
  }

  public get deviations(): DailyDeviation[] {
    return this.suggestion.deviations || [];
  }

  public deviationLine(d: DailyDeviation): string {
    if (!d.hasPlan) return 'Sin nada pautado ese día';
    const parts: string[] = [];
    if (d.unchecked.length) parts.push(`sin marcar: ${d.unchecked.join(', ')}`);
    if (d.unplanned.length) {
      parts.push(`fuera de pauta: ${d.unplanned.map((u) => `${u.name} ${u.quantity} g`).join(', ')}`);
    }
    return parts.join(' · ');
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
  }

  public prepare(): void {
    if (!(this.targetKcal > 0)) return;
    void this.modalController.dismiss({ kcal: Math.round(this.targetKcal) }, 'prepare');
  }

  public discard(): void {
    if (this.discarding) return;
    this.discarding = true;
    this.api.discardNextCycle(this.clientId, this.phaseId).subscribe({
      next: () => {
        this.ionicUtil.showToast({ message: `Ciclo ${this.next.number} descartado: repetirá el anterior`, duration: 2500 });
        void this.modalController.dismiss(null, 'discarded');
      },
      error: (err) => {
        this.discarding = false;
        this.ionicUtil.showErrorToast(err?.error?.message || 'No se pudo descartar el ciclo', 'Error', 3500);
      },
    });
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public fmt(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  }
}
