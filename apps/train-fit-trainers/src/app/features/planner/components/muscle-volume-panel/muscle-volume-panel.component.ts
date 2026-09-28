import { Component, Input } from '@angular/core';
import { Split } from 'src/app/core/models/split';
import {
  MuscleTreeRow,
  buildMuscleTreeRows,
  countSplitMuscleTree,
  keepReferenceWhileEqual,
} from '../../utils/planner-metrics';

const COLLAPSE_KEY = 'tf-muscle-volume-collapsed';

/**
 * Rediseño del Planner (Fase B, planner-audit) — series por grupo muscular
 * del microciclo SELECCIONADO en el tablero, con delta contra el microciclo
 * anterior.
 *
 * 2026-09 — cuenta sobre el árbol muscular con énfasis (grupo → porciones,
 * series fraccionales, ver planner-metrics.ts#countMuscleTree) y lo pinta
 * <app-muscle-tree>. Antes contaba muscleGroups1 plano, con cada serie
 * entera para cada músculo principal y los secundarios fuera.
 *
 * Distinto de <app-session-load-panel>: ese panel reparte una puntuación
 * MANUAL del entrenador dentro de UNA sesión ("Mi método → Puntuaciones");
 * este cuenta series REALES (Exercise.muscles × nº de Set) sobre TODO
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
  // Punto 2 (mejoras Planner, 2026-09) — split.name ya no es la etiqueta
  // visible (los microciclos no se pueden renombrar, ver
  // planner-column.component.ts#columnIndex); el padre calcula "Microciclo
  // N" por posición (planner.page.ts#splitLabel) y lo pasa aquí, porque este
  // panel no conoce table.splits para calcular el índice por sí mismo.
  @Input() public splitLabel = '';
  // 2026-09 — dentro de <app-planner-insights-panel> (pestaña "Semana") el
  // marco lo pone el padre: aquí solo se pinta el contenido, sin aside
  // propio, sin ancho fijo y sin botón de plegar.
  @Input() public embedded = false;

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
  public get rows(): MuscleTreeRow[] {
    return this.stableRows(
      buildMuscleTreeRows(
        countSplitMuscleTree(this.split),
        this.previousSplit ? countSplitMuscleTree(this.previousSplit) : null
      )
    );
  }

  private stableRows = keepReferenceWhileEqual<MuscleTreeRow[]>();

  public get unclassifiedSets(): number {
    return countSplitMuscleTree(this.split).unclassifiedSets;
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
    localStorage.setItem(COLLAPSE_KEY, this.collapsed ? '1' : '0');
  }
}
