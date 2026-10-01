import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  CustomProduct,
  QuickAddMacros,
} from 'src/app/core/models/customProduct';
import {
  canSubmitQuickAdd,
  kcalFromMacros,
  parseQuickAddNumber,
  shouldOfferKcalFromMacros,
} from 'src/app/core/utils/quick-add.util';

export const QUICK_ADD_SHEET_OPTIONS = {
  cssClass: 'quick-add-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};

/**
 * Adición rápida: apuntar kcal y macros a mano en una comida, sin pasar por
 * crear un producto del catálogo ni una receta. Es la tercera opción del
 * botón + del buscador de alimentos, y solo del cliente (al entrenador no le
 * sirve: lo que él pauta tiene que ser un alimento de verdad).
 *
 * Devuelve los valores escritos (QuickAddMacros) al confirmar, o undefined al
 * cancelar o deslizar la hoja fuera — quien la abre decide qué hacer con
 * ellos (crear la línea o guardarla editada), igual que CreateFoodSheet.
 *
 * La aritmética vive en quick-add.util.ts (puro y con test propio); aquí solo
 * queda el formulario.
 */
@Component({
  selector: 'app-quick-add-sheet',
  templateUrl: './quick-add-sheet.component.html',
  styleUrls: ['./quick-add-sheet.component.scss'],
})
export class QuickAddSheetComponent implements OnInit {
  /** Nombre de la comida destino, solo para el subtítulo. */
  @Input() public mealName = '';
  /** Presente = editar una adición rápida ya guardada, en vez de crear una. */
  @Input() public customProduct?: CustomProduct;

  public form!: FormGroup;

  // Las kcal se rellenan solas desde los macros hasta que el cliente las
  // escribe él: a partir de ahí mandan las suyas (una etiqueta real no
  // siempre cuadra con Atwater y no hay que corregirle el dato).
  private kcalEdited = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {}

  public get isEditMode(): boolean {
    return !!this.customProduct;
  }

  public ngOnInit(): void {
    const current = this.customProduct;
    this.form = this.formBuilder.group({
      name: [current?.name ?? ''],
      kcal: [this.toInput(current?.energyKcal100g)],
      protein: [this.toInput(current?.protein100g)],
      carbs: [this.toInput(current?.carbohydrates100g)],
      fat: [this.toInput(current?.fat100g)],
    });

    // Lo ya guardado nunca se recalcula por detrás: sus kcal son las que el
    // cliente dio por buenas en su día.
    this.kcalEdited = this.isEditMode;
  }

  /** kcal de los macros escritos, para el atajo bajo el campo. */
  public get kcalFromMacros(): number {
    return kcalFromMacros(this.form.value);
  }

  public get canSubmit(): boolean {
    return canSubmitQuickAdd(this.form.value);
  }

  /** El atajo solo sale si ya hay kcal propias que no cuadran con los macros. */
  public get showKcalHint(): boolean {
    return this.kcalEdited && shouldOfferKcalFromMacros(this.form.value);
  }

  /** Mientras no las toque, las kcal siguen a los macros. */
  public onMacroInput(): void {
    if (this.kcalEdited) return;
    const computed = this.kcalFromMacros;
    this.form.patchValue(
      { kcal: computed ? computed.toString() : '' },
      { emitEvent: false }
    );
  }

  public onKcalInput(): void {
    this.kcalEdited = true;
  }

  /** Volver a enganchar las kcal a los macros tras haberlas tocado. */
  public applyKcalFromMacros(): void {
    this.kcalEdited = false;
    this.onMacroInput();
  }

  public submit(): void {
    if (!this.canSubmit) return;

    const { name, kcal, protein, carbs, fat } = this.form.value;
    const result: QuickAddMacros = {
      // Sin nombre se queda vacío y lo rotula quien lo pinte con el texto
      // traducido de "Adición rápida": el idioma de la app puede cambiar
      // después de guardarla.
      name: (name || '').trim(),
      kcal: parseQuickAddNumber(kcal),
      protein: parseQuickAddNumber(protein),
      carbs: parseQuickAddNumber(carbs),
      fat: parseQuickAddNumber(fat),
    };

    void this.modalController.dismiss(result);
  }

  public cancel(): void {
    void this.modalController.dismiss();
  }

  private toInput(value: number | null | undefined): string {
    return value === null || value === undefined ? '' : value.toString();
  }
}
