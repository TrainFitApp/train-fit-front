import { Component, Input } from '@angular/core';
import { MuscleTreePortionRow, MuscleTreeRow } from '../../utils/planner-metrics';

type VolumeStatus = 'low' | 'ok' | 'high';

const COLLAPSED_KEY = 'tf-muscle-tree-collapsed';

function readCollapsed(): Set<string> {
  try {
    const raw = localStorage.getItem(COLLAPSED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

/**
 * Lista jerárquica grupo → porciones de la pestaña Análisis (2026-09). La
 * usan la vista Semana (<app-muscle-volume-panel>, con rango de referencia
 * y delta contra el microciclo anterior) y la vista Sesión
 * (<app-session-load-panel>, sin rango: 10-20 series es una referencia
 * SEMANAL y compararla con una sola sesión la pintaría siempre en rojo).
 *
 * El grupo lleva la barra y el número que se compara con el rango; las
 * porciones cuelgan debajo con el reparto del énfasis dentro del grupo.
 * Plegar un grupo se recuerda entre sesiones y es común a las dos vistas:
 * quien no programa por porciones de hombro no quiere volver a cerrarlas.
 */
@Component({
  selector: 'app-muscle-tree',
  templateUrl: 'muscle-tree.component.html',
  styleUrls: ['muscle-tree.component.scss'],
})
export class MuscleTreeComponent {
  @Input() public rows: MuscleTreeRow[] = [];
  @Input() public showRange = false;
  @Input() public targetMin = 10;
  @Input() public targetMax = 20;

  private collapsed = readCollapsed();

  public isExpanded(row: MuscleTreeRow): boolean {
    return !this.collapsed.has(row.groupId);
  }

  public toggle(row: MuscleTreeRow): void {
    if (this.collapsed.has(row.groupId)) this.collapsed.delete(row.groupId);
    else this.collapsed.add(row.groupId);
    try {
      localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...this.collapsed]));
    } catch {
      // Sin almacenamiento el plegado dura lo que la pantalla: no es un dato.
    }
  }

  public statusFor(row: MuscleTreeRow): VolumeStatus {
    if (!this.showRange) return 'ok';
    if (row.sets < this.targetMin) return 'low';
    if (row.sets > this.targetMax) return 'high';
    return 'ok';
  }

  // Con rango: contra 1,5× el máximo, para que pasarse se siga leyendo como
  // "se sale" en vez de reescalar la barra. Sin rango: contra el grupo con
  // más series de la lista.
  public fillWidth(row: MuscleTreeRow): number {
    const scale = this.showRange
      ? this.targetMax * 1.5
      : Math.max(...this.rows.map((item) => item.sets), 1);
    return Math.min(100, Math.round((row.sets / scale) * 100));
  }

  public get rangeStart(): number {
    return Math.round((this.targetMin / (this.targetMax * 1.5)) * 100);
  }

  public get rangeWidth(): number {
    return Math.round(((this.targetMax - this.targetMin) / (this.targetMax * 1.5)) * 100);
  }

  public delta(row: MuscleTreeRow): number | null {
    if (row.previousSets === null) return null;
    return row.sets - row.previousSets;
  }

  public setsTitle(row: MuscleTreeRow): string {
    const parts = [`${row.directSets} como músculo principal`];
    if (row.indirectSets) parts.push(`${row.indirectSets} como secundario (cuentan ×0,5)`);
    return `Series: ${parts.join(' + ')}`;
  }

  public hasPortions(row: MuscleTreeRow): boolean {
    return row.portions.length > 0 && row.sets > 0;
  }

  public trackByGroup(_index: number, row: MuscleTreeRow): string {
    return row.groupId;
  }

  public trackByPortion(_index: number, portion: MuscleTreePortionRow): string {
    return portion.id;
  }
}
