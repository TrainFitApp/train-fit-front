import { Component, Input } from '@angular/core';
import { Split } from 'src/app/core/models/split';

type VolumeStatus = 'low' | 'ok' | 'high';

export interface MuscleVolumeRow {
  name: string;
  count: number;
  previousCount: number | null;
  status: VolumeStatus;
}

const COLLAPSE_KEY = 'tf-muscle-volume-collapsed';

/**
 * Rediseño del Planner (Fase B, planner-audit) — series por grupo muscular
 * del microciclo SELECCIONADO en el tablero, con delta contra el microciclo
 * anterior.
 *
 * Distinto de <app-session-load-panel>: ese panel reparte una puntuación
 * MANUAL del entrenador dentro de UNA sesión ("Mi método → Puntuaciones");
 * este cuenta series REALES (Exercise.muscleGroups1 × nº de Set) sobre TODO
 * un microciclo, sin puntuación previa que mantener. Preguntas distintas
 * ("¿cuánto exige hoy?" vs. "¿le doy suficiente espalda esta semana?"),
 * paneles distintos — ninguno sustituye al otro.
 *
 * Vive en la app del entrenador (no en WorkoutComponent, compartido con el
 * cliente): es una lectura de planificación, no algo que el cliente deba ver
 * mientras ejecuta.
 */
@Component({
  selector: 'app-muscle-volume-panel',
  templateUrl: 'muscle-volume-panel.component.html',
  styleUrls: ['muscle-volume-panel.component.scss'],
})
export class MuscleVolumePanelComponent {
  @Input() public split: Split | null = null;
  @Input() public previousSplit: Split | null = null;

  public collapsed = localStorage.getItem(COLLAPSE_KEY) === '1';

  // Rango de referencia (series/semana por grupo muscular) — punto de
  // partida razonable, no una recomendación clínica ni un dato del cliente.
  // Fijo a propósito: un panel de configuración por cliente/plantilla es la
  // siguiente pasada natural (ver planner-audit, roadmap), no algo que
  // anticipar aquí sin que nadie lo haya pedido todavía.
  public readonly targetMin = 10;
  public readonly targetMax = 20;

  // Getter, no ngOnChanges + caché: split/previousSplit son los MISMOS
  // objetos mutados en sitio mientras se edita el microciclo (añadir
  // ejercicio, tocar una serie...) — la referencia no cambia, así que
  // ngOnChanges nunca volvería a disparar y el panel se quedaría con el
  // primer conteo para siempre. El volumen de un puñado de ejercicios es
  // barato de recalcular en cada ciclo de detección de cambios; correcto
  // siempre le gana a cachear algo que se queda obsoleto en silencio.
  public get rows(): MuscleVolumeRow[] {
    return this.computeRows();
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
    localStorage.setItem(COLLAPSE_KEY, this.collapsed ? '1' : '0');
  }

  public statusFor(count: number): VolumeStatus {
    if (count < this.targetMin) return 'low';
    if (count > this.targetMax) return 'high';
    return 'ok';
  }

  // Contra 1.5x el máximo del rango, no contra el propio conteo: así una
  // barra "por encima" se sigue leyendo como "se sale", en vez de reescalar
  // el track entero y esconder el exceso.
  public fillWidth(count: number): number {
    const scale = this.targetMax * 1.5;
    return Math.min(100, Math.round((count / scale) * 100));
  }

  public get rangeStart(): number {
    return Math.round((this.targetMin / (this.targetMax * 1.5)) * 100);
  }

  public get rangeWidth(): number {
    return Math.round(
      ((this.targetMax - this.targetMin) / (this.targetMax * 1.5)) * 100,
    );
  }

  public delta(row: MuscleVolumeRow): number | null {
    if (row.previousCount === null) return null;
    return row.count - row.previousCount;
  }

  public trackByName(_index: number, row: MuscleVolumeRow): string {
    return row.name;
  }

  private computeRows(): MuscleVolumeRow[] {
    const current = this.countByMuscleGroup(this.split);
    const previous = this.countByMuscleGroup(this.previousSplit);
    const hasPrevious = !!this.previousSplit;

    const names = new Set<string>([
      ...Object.keys(current),
      ...Object.keys(previous),
    ]);

    return Array.from(names)
      .map((name) => {
        const count = current[name] || 0;
        return {
          name,
          count,
          previousCount: hasPrevious ? previous[name] || 0 : null,
          status: this.statusFor(count),
        };
      })
      .sort((a, b) => b.count - a.count);
  }

  // Cada serie cuenta entera para cada grupo muscular PRIMARIO del ejercicio
  // (muscleGroups1) — un press banca con 4 series suma 4 a "Pecho" y 4 a
  // "Tríceps" si ambos están listados, no 2+2. Es la misma simplificación
  // que ya usa el resto de la app al listar "músculos principales" por
  // workout (ver WorkoutComponent#getWorkoutMuscleGroups): un reparto
  // fraccionario por grupo sería más preciso pero no es un dato que el
  // catálogo de ejercicios modele hoy (sin peso relativo entre grupos).
  // muscleGroups2 (secundarios) queda fuera a propósito: mezclar primarios y
  // secundarios en la misma cuenta diluiría la señal que el panel existe
  // para dar.
  private countByMuscleGroup(split: Split | null): Record<string, number> {
    const counts: Record<string, number> = {};
    if (!split) return counts;

    for (const workout of split.workouts || []) {
      for (const exercise of workout.exercises || []) {
        const setCount = exercise.sets?.length || 0;
        if (!setCount) continue;

        for (const group of exercise.exercise?.muscleGroups1 || []) {
          counts[group] = (counts[group] || 0) + setCount;
        }
      }
    }

    return counts;
  }
}
