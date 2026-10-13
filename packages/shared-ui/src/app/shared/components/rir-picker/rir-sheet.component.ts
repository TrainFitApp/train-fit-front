import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { parseRirSelection, RirValue } from 'src/app/core/models/rir';
import {
  getRirWheelOptions,
  RirWheelOption,
  rirFromWheel,
  rirWheelIndex,
} from './rir-wheel.util';

// El selector de RIR como hoja inferior con dos ruedas, las mismas del
// registro (peso, altura, fecha de nacimiento): el RIR y, si la serie fue un
// rango, el otro extremo. Se abre con RIR_SHEET_OPTIONS y se cierra con
// role 'confirm' y el valor nuevo (null = sin RIR) o con cualquier otro role
// (cancelar, tocar fuera, deslizar la hoja) sin dato.
@Component({
  selector: 'app-rir-sheet',
  templateUrl: './rir-sheet.component.html',
  styleUrls: ['./rir-sheet.component.scss'],
})
export class RirSheetComponent implements OnInit {
  // El RIR de la serie al abrir la hoja.
  @Input() public value: RirValue = null;

  // «FALLO» ("FAILURE") cabe en 108px a 20px de letra; con las 84px de las
  // ruedas del registro, no.
  public readonly wheelWidth = 108;
  public options: RirWheelOption[] = [];
  public firstIndex = 0;
  public secondIndex = 0;

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    this.options = getRirWheelOptions();
    const selection = parseRirSelection(this.value);
    this.firstIndex = rirWheelIndex(this.options, selection.first);
    this.secondIndex = rirWheelIndex(this.options, selection.second);
  }

  public confirm(): void {
    this.modalController.dismiss(
      rirFromWheel(this.options, this.firstIndex, this.secondIndex),
      'confirm'
    );
  }

  public cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }
}

// Alto automático (ver .rir-sheet-modal en global.scss), con tirador y
// deslizable como el resto de hojas.
export const RIR_SHEET_OPTIONS = {
  component: RirSheetComponent,
  cssClass: 'rir-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};
