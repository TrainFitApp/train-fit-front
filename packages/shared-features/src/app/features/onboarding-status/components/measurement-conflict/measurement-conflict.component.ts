import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InitialMeasurementConflict } from '../../models/initial-measurements';

@Component({
  selector: 'app-measurement-conflict',
  standalone: true,
  imports: [CommonModule],
  template: `<section *ngIf="conflicts.length" role="alert" class="conflict">
    <strong>Hay una medida distinta guardada</strong>
    <p *ngFor="let item of conflicts">{{ item.label }} · {{ item.date }}<br />
      Registrado: {{ item.currentValue === null ? 'sin dato' : item.currentValue }} {{ item.currentValue === null ? '' : item.unit }}.
      Tu valor: {{ item.value }} {{ item.unit }}.</p>
    <p>Corregirla actualizará el historial compartido. Se conservará el cambio.</p>
    <button type="button" [disabled]="disabled" (click)="cancelled.emit()">Revisar mi entrada</button>
    <button type="button" [disabled]="disabled" (click)="confirmed.emit()">Confirmar mi corrección</button>
  </section>`,
  styles: [`.conflict{padding:16px 20px;background:var(--bg-secondary,#202126);color:var(--text-primary,#f5f5f5);font-size:14px;line-height:1.5}.conflict p{margin:8px 0}button{font:inherit;font-weight:600;min-height:44px;padding:10px 12px;border:1px solid var(--accent-primary,#fe9000);border-radius:10px;background:transparent;color:var(--accent-primary,#fe9000);margin:8px 8px 0 0}button:focus-visible{outline:2px solid var(--accent-primary,#fe9000);outline-offset:3px}button:disabled{opacity:.6}`],
})
export class MeasurementConflictComponent {
  @Input() public conflicts: InitialMeasurementConflict[] = [];
  @Input() public disabled = false;
  @Output() public confirmed = new EventEmitter<void>();
  @Output() public cancelled = new EventEmitter<void>();
}
