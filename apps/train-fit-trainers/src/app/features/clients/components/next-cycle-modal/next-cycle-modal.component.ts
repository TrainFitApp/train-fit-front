import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import { NextCycleResponse } from '../../../diet-templates/models/diet-suggestion.model';

type ViewState = 'loading' | 'ready' | 'error';

// Sugerencias de dieta — progresión ciclo a ciclo. Se abre desde la ficha del
// cliente sobre la fase de nutrición vigente: lee la tendencia de peso y la
// adherencia, sugiere hacia dónde mover las kcal del siguiente ciclo, y al
// confirmar crea el ciclo (contenido escalado) + su objetivo. El entrenador
// puede ajustar las kcal antes de confirmar.
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

  public state: ViewState = 'loading';
  public data: NextCycleResponse | null = null;

  // Editable por el entrenador antes de confirmar.
  public targetKcal = 0;
  public startDate = new Date().toISOString().slice(0, 10);
  public applying = false;

  constructor(
    private modalController: ModalController,
    private api: DietSuggestionApiService,
    private ionicUtil: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.api.nextCycleSuggestion(this.clientId, this.phaseId).subscribe({
      next: (res) => {
        this.data = res;
        this.targetKcal = res.draft.cycleTargetKcal;
        this.state = 'ready';
      },
      error: (err) => {
        this.state = 'error';
        this.ionicUtil.showErrorToast(
          err?.error?.message || 'No se pudo calcular el siguiente ciclo',
          'Error',
          3500
        );
      },
    });
  }

  public get kcalDelta(): number {
    if (!this.data) return 0;
    return this.targetKcal - (this.data.currentCycleKcal ?? this.targetKcal);
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
  }

  public confirm(): void {
    if (!this.data || this.applying) return;
    this.applying = true;

    // Reescala el borrador si el entrenador cambió las kcal respecto a la
    // sugerencia (el backend escala proporcional al recibir el contenido y
    // el kcal objetivo; aquí solo mandamos el contenido del borrador tal
    // cual + el kcal final, el backend NO reescala otra vez, así que si el
    // entrenador subió mucho las kcal a mano el contenido puede quedarse
    // corto — se avisa en la UI).
    const draft = this.data.draft;
    const factor = draft.cycleTargetKcal > 0 ? this.targetKcal / draft.cycleTargetKcal : 1;
    const macros = {
      protein: Math.round(draft.cycleTargetMacros.protein * factor * 10) / 10,
      carbs: Math.round(draft.cycleTargetMacros.carbs * factor * 10) / 10,
      fat: Math.round(draft.cycleTargetMacros.fat * factor * 10) / 10,
    };

    this.api
      .advanceCycle(this.clientId, this.phaseId, {
        startDate: this.startDate,
        mode: draft.mode,
        days: draft.days,
        dayPatterns: draft.dayPatterns,
        cycleTargetKcal: Math.round(this.targetKcal),
        cycleTargetMacros: macros,
      })
      .subscribe({
        next: (cycle) => {
          this.ionicUtil.showToast({
            message: `Ciclo nuevo aplicado a ${this.clientName} (${Math.round(this.targetKcal)} kcal)`,
            duration: 3000,
          });
          void this.modalController.dismiss({ cycle }, 'confirm');
        },
        error: (err) => {
          this.applying = false;
          this.ionicUtil.showErrorToast(
            err?.status === 409
              ? err?.error?.message || 'Esas fechas se solapan con otra fase'
              : err?.error?.message || 'No se pudo aplicar el ciclo',
            'Error',
            4000
          );
        },
      });
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }
}
