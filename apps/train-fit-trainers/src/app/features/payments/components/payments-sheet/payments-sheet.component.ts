import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';

let sheetSeq = 0;

// Marco común de los paneles de Cobros: panel lateral en escritorio, hoja
// inferior en móvil (mismo patrón tf-side-panel que suplementos o check-ins).
// Se monta con *ngIf desde quien lo abre y se traslada a <ion-app>: dentro de
// ion-content el `position: fixed` quedaría atrapado y Chart.js lo taparía.
// Gestiona el foco (primer campo al abrir, vuelta al disparador al cerrar) y
// Escape para cerrar.
@Component({
  selector: 'app-payments-sheet',
  templateUrl: './payments-sheet.component.html',
  styleUrls: ['./payments-sheet.component.scss'],
})
export class PaymentsSheetComponent implements AfterViewInit, OnDestroy {
  @Input() public title = '';
  @Input() public subtitle: string | null = null;
  @Input() public wide = false;
  @Output() public closed = new EventEmitter<void>();

  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;

  public readonly titleId = `payments-sheet-${++sheetSeq}`;
  private previousFocus: HTMLElement | null = null;

  constructor(private host: ElementRef<HTMLElement>) {}

  public ngAfterViewInit(): void {
    this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    (document.querySelector('ion-app') || document.body).appendChild(this.host.nativeElement);
    setTimeout(() => this.focusFirstField());
  }

  public ngOnDestroy(): void {
    this.host.nativeElement.remove();
    if (this.previousFocus && document.contains(this.previousFocus)) this.previousFocus.focus();
  }

  public close(): void {
    this.closed.emit();
  }

  private focusFirstField(): void {
    const root = this.panel?.nativeElement;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(
      '.sheet-body input:not([type="checkbox"]):not([disabled]), .sheet-body textarea:not([disabled]), .sheet-body select:not([disabled]), .sheet-body [data-autofocus]'
    );
    (target || root).focus({ preventScroll: true });
  }
}
