import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableService } from 'src/app/core/services/table/table.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { HeatmapCellPopoverComponent } from './heatmap-cell-popover/heatmap-cell-popover.component';

interface HeatmapCell {
  date: string | null;
  count: number;
  level: number; // 0-4, 0 = sin series
  total: number; // series planificadas ese día (doned o no), para el tooltip
  workoutName: string | null;
}

interface DayInfo {
  count: number;
  total: number;
  workoutName: string;
}

interface HeatmapColumn {
  cells: HeatmapCell[];
  monthLabel: string | null;
}

const LEVELS = 4;
const MAX_WEEKS = 52; // techo defensivo — una rutina no deberia generar mas de un año de rejilla

// Solo Lun/Mié/Vie llevan etiqueta (mismo criterio visual que GitHub: una
// fila de cada dos, para no amontonar texto contra la rejilla) — nombres
// completos de 3 letras, no una sola inicial (medido en el diseño de
// referencia).
const ROW_LABELS = ['Lun', '', 'Mié', '', 'Vie', '', ''];

@Component({
  selector: 'app-sets-heatmap',
  templateUrl: './sets-heatmap.component.html',
  styleUrls: ['./sets-heatmap.component.scss'],
})
export class SetsHeatmapComponent {
  public columns: HeatmapColumn[] = [];
  public rowLabels = ROW_LABELS;
  public totalSets = 0;
  public microcyclesCount = 0;
  public hasData = false;
  private lastSignature = '';

  constructor(
    private tableService: TableService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
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
  // tenga la rutina. La fecha de cada día sale de Workout.date (se fija una
  // única vez, al terminar la sesión — ver comment en workout.ts); cada
  // serie marcada `doned` de ese workout cuenta para ese día.
  private build(splits: { workouts: { date?: Date | null; rest?: boolean; isPlannedRestDay?: boolean; name?: string; exercises?: { sets?: { doned?: boolean }[] }[] }[] }[]): void {
    const dayInfo = new Map<string, DayInfo>();
    let totalSets = 0;

    for (const split of splits) {
      for (const workout of split.workouts || []) {
        if (!workout.date || workout.rest || workout.isPlannedRestDay) continue;
        const day = new Date(workout.date).toISOString().slice(0, 10);
        const exercises = workout.exercises || [];
        const donedInWorkout = exercises.reduce((sum, exercise) => {
          return sum + (exercise.sets || []).filter((set) => set.doned).length;
        }, 0);
        if (donedInWorkout === 0) continue;
        const totalInWorkout = exercises.reduce((sum, exercise) => sum + (exercise.sets || []).length, 0);
        const existing = dayInfo.get(day);
        dayInfo.set(day, {
          count: (existing?.count || 0) + donedInWorkout,
          total: (existing?.total || 0) + totalInWorkout,
          // Si dos workouts caen el mismo día (raro), se queda el último —
          // el tooltip es una ayuda visual, no un desglose exhaustivo.
          workoutName: workout.name || existing?.workoutName || '',
        });
        totalSets += donedInWorkout;
      }
    }

    this.totalSets = totalSets;
    this.hasData = dayInfo.size > 0;
    if (!this.hasData) return;

    // ngDoCheck corre en cada ciclo de deteccion de cambios (ver comentario
    // arriba); reconstruir la rejilla entera (con su churn de Date) en cada
    // uno, aunque nada cambiase, es trabajo tirado — solo se reconstruye si
    // la firma (dias distintos + total de series) cambio de verdad.
    const signature = `${dayInfo.size}:${totalSets}`;
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;

    this.columns = this.buildColumns(dayInfo);
  }

  private buildColumns(dayInfo: Map<string, DayInfo>): HeatmapColumn[] {
    const days = Array.from(dayInfo.keys());
    const thresholds = this.buildLevelThresholds(
      Array.from(dayInfo.values()).map((info) => info.count)
    );

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const earliest = days.reduce((min, d) => (d < min ? d : min), days[0]);
    const earliestDate = new Date(`${earliest}T00:00:00.000Z`);

    // El límite superior de la rejilla es "hoy" salvo que exista un
    // workout con fecha posterior (p.ej. datos de prueba, o un desfase de
    // reloj) — si no se contempla, ese día se trataba como "futuro" y se
    // descartaba de la rejilla aunque tuviera series doned reales.
    const latest = days.reduce((max, d) => (d > max ? d : max), days[0]);
    const latestDate = new Date(`${latest}T00:00:00.000Z`);
    const boundary = latestDate > today ? latestDate : today;

    const boundaryWeekday = (boundary.getUTCDay() + 6) % 7; // 0 = lunes
    const lastMonday = new Date(boundary);
    lastMonday.setUTCDate(boundary.getUTCDate() - boundaryWeekday);

    const earliestWeekday = (earliestDate.getUTCDay() + 6) % 7;
    const firstMonday = new Date(earliestDate);
    firstMonday.setUTCDate(earliestDate.getUTCDate() - earliestWeekday);

    let weeks = Math.round((lastMonday.getTime() - firstMonday.getTime()) / (7 * 86400000)) + 1;
    weeks = Math.min(Math.max(weeks, 1), MAX_WEEKS);

    const columns: HeatmapColumn[] = [];
    let lastMonthSeen = -1;

    for (let week = 0; week < weeks; week++) {
      const cells: HeatmapCell[] = [];
      let monthLabel: string | null = null;

      for (let weekday = 0; weekday < 7; weekday++) {
        const day = new Date(firstMonday);
        day.setUTCDate(firstMonday.getUTCDate() + week * 7 + weekday);

        if (day > boundary) {
          cells.push({ date: null, count: 0, level: 0, total: 0, workoutName: null });
          continue;
        }

        const iso = day.toISOString().slice(0, 10);
        const info = dayInfo.get(iso);
        const count = info?.count || 0;
        cells.push({
          date: iso,
          count,
          level: this.levelFor(count, thresholds),
          total: info?.total ?? 0,
          workoutName: info?.workoutName ?? null,
        });

        const month = day.getUTCMonth();
        if (day.getUTCDate() <= 7 && month !== lastMonthSeen) {
          monthLabel = day.toLocaleDateString(this.translate.currentLang || 'es', { month: 'short' });
          lastMonthSeen = month;
        }
      }

      columns.push({ cells, monthLabel });
    }

    return columns;
  }

  // Cortes por CUANTILES sobre los días con actividad, no por porcentaje del
  // máximo. Con escala relativa al máximo el mapa salía casi monocromo: el
  // volumen real de un entrenamiento varía poco (9 a 15 series aquí), así
  // que todo caía en los dos niveles altos y el degradado no se veía. Por
  // cuantiles, los niveles reparten los días que HAY, sea cual sea el rango.
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

  // Solo si el día tiene datos reales (workoutName viene de dayInfo, no se
  // rellena para huecos sin sesión) — evita abrir un popover vacío al tocar
  // un cuadradito gris.
  public async showCellInfo(event: Event, cell: HeatmapCell): Promise<void> {
    if (!cell.date || !cell.workoutName) return;
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
