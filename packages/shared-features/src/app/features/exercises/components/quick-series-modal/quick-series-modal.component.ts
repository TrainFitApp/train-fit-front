import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

export interface QuickSeriesResult {
  count: number;
  expectedTime?: string;
  expectedDistance?: number;
  repsMin?: number;
  repsMax?: number;
  rirMin?: number;
  rirMax?: number;
}

// TASK-021 (MASTER_BACKLOG.md) — antes esto era un ion-alert con 4-5 inputs
// numéricos sin más etiqueta que un placeholder que desaparece al escribir
// (ver historial: "en el alert de 'generar series por esquema' no se
// entiende nada"). Un ion-alert no puede embeber un formulario Angular real
// (mismo motivo por el que existe ManageSetComponent como modal en vez de
// alert), así que se mueve aquí con label + texto de ayuda fijo bajo cada
// campo. La lógica de generación en sí no cambia (config-exercise.page.ts
// #applyQuickSeries): sigue creando `count` series IDÉNTICAS con el mismo
// rango — esto es solo el formulario que recoge esos datos.
@Component({
  selector: 'app-quick-series-modal',
  templateUrl: './quick-series-modal.component.html',
  styleUrls: ['./quick-series-modal.component.scss'],
})
export class QuickSeriesModalComponent implements OnInit {
  @Input() isCardio = false;
  @Input() isIsometric = false;

  public form: FormGroup;

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    if (this.isCardio) {
      this.form = new FormGroup({
        count: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(20)]),
        expectedTime: new FormControl(''),
        expectedDistance: new FormControl(null, [Validators.min(0), Validators.max(1000)]),
      });
    } else if (this.isIsometric) {
      this.form = new FormGroup({
        count: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(20)]),
        expectedTime: new FormControl(''),
      });
    } else {
      this.form = new FormGroup({
        count: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(20)]),
        repsMin: new FormControl(8, [Validators.required, Validators.min(0), Validators.max(999)]),
        repsMax: new FormControl(12, [Validators.required, Validators.min(0), Validators.max(999)]),
        rirMin: new FormControl(1, [Validators.required, Validators.min(0), Validators.max(20)]),
        rirMax: new FormControl(2, [Validators.required, Validators.min(0), Validators.max(20)]),
      });
    }
  }

  public close(): void {
    this.modalController.dismiss();
  }

  public generate(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    const result: QuickSeriesResult = { count: Number(value.count) };

    if (this.isCardio) {
      result.expectedTime = (value.expectedTime || '').toString().trim();
      if (value.expectedDistance !== null && value.expectedDistance !== '') {
        result.expectedDistance = Number(value.expectedDistance);
      }
    } else if (this.isIsometric) {
      result.expectedTime = (value.expectedTime || '').toString().trim();
    } else {
      result.repsMin = Number(value.repsMin);
      result.repsMax = Number(value.repsMax);
      result.rirMin = Number(value.rirMin);
      result.rirMax = Number(value.rirMax);
    }

    this.modalController.dismiss(result);
  }
}
