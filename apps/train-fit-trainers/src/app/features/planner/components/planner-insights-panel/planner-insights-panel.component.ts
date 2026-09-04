import { Component, Input } from '@angular/core';
import { Split } from 'src/app/core/models/split';
import { Workout } from 'src/app/core/models/workout';

type InsightsTab = 'week' | 'session';

const COLLAPSE_KEY = 'tf-planner-insights-collapsed';
const TAB_KEY = 'tf-planner-insights-tab';

/**
 * 2026-09 — un solo panel lateral con dos pestañas, en vez de los dos
 * paneles hermanos que había antes (<app-muscle-volume-panel> 280px +
 * <app-session-load-panel> 260px = 540px de barra lateral).
 *
 * El problema no era el ancho: era que los dos enseñaban listas de músculos
 * con números sin unidad, con vocabularios distintos ("Volumen semanal"
 * cuenta series reales por Exercise.muscleGroups1 de TODO el microciclo;
 * "Carga de la sesión" reparte una puntuación manual del entrenador sobre
 * las etiquetas cerradas de SORENESS_MUSCLES de UNA sesión), y cada uno
 * exigía un gesto de selección distinto que no enseñaba. Puestos uno al lado
 * del otro se leían como el mismo dato contándose de dos formas
 * contradictorias.
 *
 * En pestañas, la pregunta de cada uno queda explícita y solo se ve una a la
 * vez. Los dos componentes hijos siguen siendo los mismos, con su lógica
 * intacta: aquí solo se les quita el marco (ver su @Input embedded).
 */
@Component({
  selector: 'app-planner-insights-panel',
  templateUrl: 'planner-insights-panel.component.html',
  styleUrls: ['planner-insights-panel.component.scss'],
})
export class PlannerInsightsPanelComponent {
  @Input() public split: Split | null = null;
  @Input() public previousSplit: Split | null = null;
  @Input() public splitLabel = '';
  @Input() public workout: Workout | null = null;

  public collapsed = localStorage.getItem(COLLAPSE_KEY) === '1';
  public tab: InsightsTab = localStorage.getItem(TAB_KEY) === 'session' ? 'session' : 'week';

  public toggle(): void {
    this.collapsed = !this.collapsed;
    localStorage.setItem(COLLAPSE_KEY, this.collapsed ? '1' : '0');
  }

  public selectTab(tab: InsightsTab): void {
    this.tab = tab;
    localStorage.setItem(TAB_KEY, tab);
  }

  // ion-segment devuelve el valor como string | undefined.
  public onSegmentChange(value: unknown): void {
    if (value === 'week' || value === 'session') this.selectTab(value);
  }
}
