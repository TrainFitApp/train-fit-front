import { Component } from '@angular/core';
import { TableService } from 'src/app/core/services/table/table.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { HeatmapCellPopoverComponent } from './heatmap-cell-popover/heatmap-cell-popover.component';

interface MatrixCell {
  date: string | null; // fecha real de esa sesión (workout.date), null si no se ha hecho
  count: number;
  level: number; // 0-4, 0 = sin series
  total: number; // series planificadas ese workout, para el tooltip
  workoutName: string | null;
  isRest: boolean; // descanso (manual o planificado) en ese hueco del split
}

interface SplitLike {
  workouts: {
    date?: Date | null;
    rest?: boolean;
    isPlannedRestDay?: boolean;
    name?: string;
    exercises?: { sets?: { doned?: boolean }[] }[];
  }[];
}

interface MatrixColumn {
  splitLabel: string;
  cells: MatrixCell[];
}

const LEVELS = 4;
const MAX_SPLITS = 104; // techo defensivo, igual de generoso que el anterior MAX_WEEKS

@Component({
  selector: 'app-sets-heatmap',
  templateUrl: './sets-heatmap.component.html',
  styleUrls: ['./sets-heatmap.component.scss'],
})
export class SetsHeatmapComponent {
  // Matriz splits × workouts: cada columna es un microciclo (en orden
  // cronológico), cada fila es el mismo "hueco" de workout dentro del split
  // (Día 1, Día 2...). Reemplaza al calendario día-a-día anterior: con
  // varios microciclos por rutina, "qué día de la semana cayó" importaba
  // menos que "cómo fue el Día Push a lo largo de los splits".
  public columns: MatrixColumn[] = [];
  public totalSets = 0;
  public microcyclesCount = 0;
  public hasData = false;
  private lastSignature = '';

  constructor(
    private tableService: TableService,
    private ionicUtilService: IonicUtilService
  ) {}

  // Se recalcula en cada ciclo de detección de cambios en vez de cachear en
  // un effect: la tabla activa se muta in-place en varios sitios (marcar una
  // serie no reemplaza el objeto Table entero), así que un effect() sobre
  // currentTable() no se dispararía en la mayoría de los casos reales.
  public ngDoCheck(): void {
    const table = this.tableService.tableInUse;
    if (!table?.splits?.length) {
      this.hasData = false;
      return;
    }
    this.microcyclesCount = table.splits.length;
    this.build(table.splits);
  }

  // Ámbito: SOLO la rutina activa (no el histórico de otras rutinas que haya
  // tenido el usuario) — sus propios microciclos (splits), todos los que
  // tenga la rutina. La fecha de cada celda sale de Workout.date (se fija
  // una única vez, al terminar la sesión — ver comentario en workout.ts).
  private build(splits: SplitLike[]): void {
    const rowCount = splits.reduce((max, split) => Math.max(max, (split.workouts || []).length), 0);
    if (rowCount === 0) {
      this.hasData = false;
      return;
    }

    const limitedSplits = splits.slice(0, MAX_SPLITS);

    type RawCell = { count: number; total: number; workoutName: string | null; date: string | null; isRest: boolean };
    const rawColumns: RawCell[][] = [];
    const positiveCounts: number[] = [];
    let totalSets = 0;

    for (const split of limitedSplits) {
      const cells: RawCell[] = [];
      const workouts = split.workouts || [];
      for (let row = 0; row < rowCount; row++) {
        const workout = workouts[row];
        if (!workout) {
          cells.push({ count: 0, total: 0, workoutName: null, date: null, isRest: true });
          continue;
        }
        const isRest = !!(workout.rest || workout.isPlannedRestDay);
        const exercises = workout.exercises || [];
        const count = exercises.reduce((sum, exercise) => sum + (exercise.sets || []).filter((set) => set.doned).length, 0);
        const total = exercises.reduce((sum, exercise) => sum + (exercise.sets || []).length, 0);
        cells.push({
          count,
          total,
          workoutName: workout.name || null,
          date: workout.date ? new Date(workout.date).toISOString() : null,
          isRest,
        });
        if (count > 0) {
          positiveCounts.push(count);
          totalSets += count;
        }
      }
      rawColumns.push(cells);
    }

    this.totalSets = totalSets;
    this.hasData = positiveCounts.length > 0;
    if (!this.hasData) return;

    // ngDoCheck corre en cada ciclo de detección de cambios (ver comentario
    // arriba); reconstruir la matriz entera en cada uno, aunque nada
    // cambiase, es trabajo tirado — solo se reconstruye si la firma
    // (nº de splits + nº de filas + total de series) cambió de verdad.
    const signature = `${limitedSplits.length}:${rowCount}:${totalSets}`;
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;

    const thresholds = this.buildLevelThresholds(positiveCounts);

    this.columns = rawColumns.map((cells, index) => ({
      splitLabel: `S${index + 1}`,
      cells: cells.map((cell) => ({
        date: cell.date,
        count: cell.count,
        level: cell.isRest ? 0 : this.levelFor(cell.count, thresholds),
        total: cell.total,
        workoutName: cell.workoutName,
        isRest: cell.isRest,
      })),
    }));
  }

  // Cortes por CUANTILES sobre los workouts con actividad, no por porcentaje
  // del máximo. Con escala relativa al máximo el mapa salía casi monocromo:
  // el volumen real de un entrenamiento varía poco (9 a 15 series aquí), así
  // que todo caía en los dos niveles altos y el degradado no se veía. Por
  // cuantiles, los niveles reparten los workouts que HAY, sea cual sea el rango.
  private buildLevelThresholds(counts: number[]): number[] {
    const sorted = counts.filter((c) => c > 0).sort((a, b) => a - b);
    if (!sorted.length) return [0, 0, 0];
    return [0.25, 0.5, 0.75].map(
      (q) => sorted[Math.floor(q * (sorted.length - 1))]
    );
  }

  private levelFor(count: number, thresholds: number[]): number {
    if (count <= 0) return 0;
    const level = thresholds.filter((threshold) => count > threshold).length + 1;
    return Math.min(LEVELS, level);
  }

  // Solo si el workout tiene datos reales (workoutName viene del split, no
  // se rellena para huecos de descanso) — evita abrir un popover vacío al
  // tocar un cuadradito gris.
  public async showCellInfo(event: Event, cell: MatrixCell): Promise<void> {
    if (cell.isRest || !cell.workoutName) return;
    await this.ionicUtilService.showPopover({
      component: HeatmapCellPopoverComponent,
      componentProps: {
        date: cell.date,
        workoutName: cell.workoutName,
        done: cell.count,
        total: cell.total,
      },
      event,
    });
  }
}
