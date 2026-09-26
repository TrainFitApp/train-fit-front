import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonDatetime, IonicModule, ModalController } from '@ionic/angular';
import { toDateValue, toTimeValue } from './date-field-value.util';

type DateFieldPresentation = 'date' | 'time';

const DATE_FORMAT = new Intl.DateTimeFormat('es-ES', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/**
 * Contenido del selector. Va por ModalController (no inline) porque un
 * ion-modal inline se queda en su sitio del DOM y los paneles con transform
 * (tf-side-panel, panel-sheet) le capturan el position: fixed.
 *
 * Botones propios en slot="buttons": sin botones, ion-datetime confirma solo
 * al tocar un día, pero también al girar la rueda de mes/año, y el modal se
 * cerraría a medio elegir.
 */
@Component({
  selector: 'app-date-picker-sheet',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-datetime
      #datetime
      class="tf-datetime"
      color="primary"
      locale="es-ES"
      hourCycle="h23"
      [firstDayOfWeek]="1"
      [presentation]="presentation"
      [value]="value || undefined"
      [min]="min || undefined"
      [max]="max || undefined"
    >
      <span slot="title" *ngIf="title">{{ title }}</span>
      <ion-buttons slot="buttons">
        <ion-button (click)="cancel()">Cancelar</ion-button>
        <ion-button *ngIf="clearable" color="medium" (click)="clear()">Borrar</ion-button>
        <ion-button class="tf-datetime-confirm" (click)="accept()">Aceptar</ion-button>
      </ion-buttons>
    </ion-datetime>
  `,
})
export class DatePickerSheetComponent {
  @Input() public presentation: DateFieldPresentation = 'date';
  @Input() public value = '';
  @Input() public min: string | null = null;
  @Input() public max: string | null = null;
  @Input() public clearable = false;
  @Input() public title = '';

  @ViewChild('datetime', { static: true }) private datetime!: IonDatetime;

  constructor(private modalController: ModalController) {}

  public cancel(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public clear(): void {
    void this.modalController.dismiss('', 'confirm');
  }

  public async accept(): Promise<void> {
    await this.datetime.confirm();
    const raw = this.datetime.value;
    const picked = this.presentation === 'time' ? toTimeValue(raw) : toDateValue(raw);
    // Calendario sin ningún día tocado: no hay nada que aceptar.
    void this.modalController.dismiss(picked || null, picked ? 'confirm' : 'cancel');
  }
}

/**
 * Campo de fecha u hora para la app de entrenadores: sustituye al
 * <input type="date|time"> nativo (su calendario lo pinta el sistema, en
 * claro y fuera del tema), igual que ion-select.tf-select sustituyó al
 * <select>. Mismo contrato con ngModel que el nativo: "YYYY-MM-DD" o "HH:mm",
 * '' cuando está vacío.
 *
 * No trae caja propia: la pantalla lo estila como a sus inputs, poniéndole su
 * clase (p. ej. class="input-field" dentro de .input-wrapper). Por dentro es
 * transparente y hereda fuente y color.
 */
@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateFieldComponent), multi: true },
  ],
})
export class DateFieldComponent implements ControlValueAccessor {
  @Input() public presentation: DateFieldPresentation = 'date';
  @Input() public min: string | null = null;
  @Input() public max: string | null = null;
  @Input() public placeholder = '';
  // Campos opcionales: botón para vaciar en el propio campo y "Borrar" en el selector.
  @Input() public clearable = false;
  // Solo si el contenedor no pone ya su propio icono.
  @Input() public showIcon = false;
  @Input() public inputId: string | null = null;
  @Input() public ariaLabel: string | null = null;
  // Cabecera del selector (normalmente, el texto de la etiqueta del campo).
  @Input() public pickerTitle = '';

  public value = '';
  public disabled = false;
  private isOpen = false;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor(private modalController: ModalController) {}

  public get display(): string {
    if (!this.value) return '';
    if (this.presentation === 'time') return this.value;
    const [year, month, day] = this.value.split('-').map(Number);
    return DATE_FORMAT.format(new Date(year, month - 1, day));
  }

  public get placeholderText(): string {
    return this.placeholder || (this.presentation === 'time' ? 'Elegir hora' : 'Elegir fecha');
  }

  public get icon(): string {
    return this.presentation === 'time' ? 'time-outline' : 'calendar-outline';
  }

  // En el host y no en el botón: el padding de la caja que pone la pantalla
  // también abre. Teclado: Enter/Espacio en el botón burbujean hasta aquí.
  @HostListener('click')
  public async open(): Promise<void> {
    if (this.disabled || this.isOpen) return;
    this.isOpen = true;
    const modal = await this.modalController.create({
      component: DatePickerSheetComponent,
      componentProps: {
        presentation: this.presentation,
        value: this.value,
        min: this.min,
        max: this.max,
        clearable: this.clearable,
        title: this.pickerTitle,
      },
      cssClass: 'tf-datetime-modal',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss<string | null>();
    this.isOpen = false;
    this.onTouched();
    if (role === 'confirm' && data !== null && data !== undefined) this.setValue(data);
  }

  public clear(event: Event): void {
    event.stopPropagation();
    this.setValue('');
    this.onTouched();
  }

  public writeValue(value: unknown): void {
    this.value = this.presentation === 'time' ? toTimeValue(value) : toDateValue(value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private setValue(value: string): void {
    if (value === this.value) return;
    this.value = value;
    this.onChange(value);
  }
}
