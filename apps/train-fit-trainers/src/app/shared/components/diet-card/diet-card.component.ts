import { Component, EventEmitter, Input, Output } from '@angular/core';
import { dietaryFlagUi } from '../../utils/dietary-flag-ui.util';
import { PhaseMode } from '../../utils/phase-mode-label.util';

export interface DietCardProfile {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Una sola card de dieta — se usa en la biblioteca de plantillas y en la
// lista de sugerencias al empezar una fase. `deltas`/`medal` solo aparecen
// en el contexto de sugerencia (hay un objetivo de cliente contra el que
// comparar); `dayCount` en el de biblioteca.
@Component({
  selector: 'app-diet-card',
  templateUrl: './diet-card.component.html',
  styleUrls: ['./diet-card.component.scss'],
})
export class DietCardComponent {
  @Input() public name = '';
  @Input() public profile: DietCardProfile | null = null;
  @Input() public deltas: DietCardProfile | null = null;
  @Input() public medal = '';
  @Input() public verified = false;
  @Input() public ownedByClient = false;
  @Input() public dayCount: number | null = null;
  @Input() public basedOnDays = 0;
  // Cómo se resuelve el contenido de esta plantilla al aplicarla — antes solo
  // se decía en el cajón de sugerencias (chosen-box, ya eliminado); ahora
  // vive aquí porque es un dato de LA PLANTILLA, no de haberla elegido.
  @Input() public mode: PhaseMode | null = null;
  @Input() public flags: string[] = [];
  // Restricciones del cliente que esta dieta NO cumple (ver missingFlags en
  // diet-suggestion.model.ts). Se avisa nombrando la restricción incumplida
  // y no acusando al contenido: un flag falta tanto si algún alimento no lo
  // cumple como si el catálogo simplemente no lo declara.
  @Input() public missingFlags: string[] = [];
  @Input() public selected = false;
  @Input() public highlight = false;

  @Output() public picked = new EventEmitter<void>();

  // Oro/plata/bronce por medalla — el borde de la card ya no es un único
  // acento naranja para las tres, sino un tono por puesto (a juego con
  // 🥇🥈🥉). `medal` es el único dato de posición que ya recibe esta card;
  // derivarlo de ahí evita añadir un input de rango solo para esto.
  public get podiumTier(): 'gold' | 'silver' | 'bronze' | null {
    if (this.medal === '🥇') return 'gold';
    if (this.medal === '🥈') return 'silver';
    if (this.medal === '🥉') return 'bronze';
    return null;
  }

  // Días (sequential) o patrones (recurring/choice) que entraron en el
  // perfil. `dayCount` (real, biblioteca) manda sobre `basedOnDays` (lo que
  // devuelve el backend con el perfil) cuando ambos existen.
  private get contentUnits(): number {
    return this.dayCount || this.basedOnDays || 0;
  }

  // ¿Cómo se repite esta plantilla? Texto NEUTRO de plantilla ("Por días"),
  // no el de fase del cajón ("Fase de N días", phase-mode-label.util.ts): en
  // la biblioteca todavía no es una fase de nadie.
  public get modeLabel(): string {
    if (this.mode === 'recurring') return 'Por días de la semana';
    if (this.mode === 'choice') return 'El cliente elige cada día';
    const n = this.contentUnits;
    return n ? `Por días (${n} día${n === 1 ? '' : 's'})` : 'Por días';
  }

  public get modeIcon(): string {
    if (this.mode === 'recurring') return 'repeat-outline';
    if (this.mode === 'choice') return 'shuffle-outline';
    return 'calendar-outline';
  }

  // Las kcal/macros del panel NO son un dato asignado a la plantilla: salen
  // de sumar sus alimentos y, con varios días, de la MEDIA de esos días (ver
  // diet-macro-profile.js). Solo se avisa a partir de 2: con un día no hay
  // media que matizar. En recurring la media ya viene ponderada por los días
  // de la semana que cubre cada patrón; en choice es media simple de menús.
  public get averageNote(): string | null {
    const n = this.contentUnits;
    if (n < 2) return null;
    if (this.mode === 'recurring') return '≈ media de la semana';
    if (this.mode === 'choice') return `≈ media de los ${n} menús`;
    return `≈ media de los ${n} días`;
  }

  public flagLabel(flag: string): string {
    return dietaryFlagUi(flag).label;
  }

  public flagIcon(flag: string): string {
    return dietaryFlagUi(flag).icon;
  }

  public flagColorClass(flag: string): string {
    return dietaryFlagUi(flag).colorClass;
  }

  public missingFlagsLabel(): string {
    return this.missingFlags.map((flag) => this.flagLabel(flag)).join(', ');
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
  }

  // Desviación sobre el objetivo: en verde (encima) o rojo (por debajo) muy
  // sutil — antes el mismo gris apagado para +n y -n no decía si acercarse o
  // alejarse del target era bueno o malo a simple vista.
  public deltaClass(value: number): string {
    if (value > 0) return 'is-positive';
    if (value < 0) return 'is-negative';
    return '';
  }

  // Franja de macros de la cabecera — misma cuenta que macroBarSegments() en
  // diet-template-builder.page.ts (kcal de cada macro sobre el total, no
  // gramos: 1g de grasa pesa más del doble que 1g de proteína/carbo).
  // Reutilizado aquí y no importado de allí porque el builder no expone un
  // servicio, solo un método de página.
  public macroBarSegments(): { protein: number; carbs: number; fat: number } {
    const p = this.profile;
    if (!p) return { protein: 0, carbs: 0, fat: 0 };
    const proteinKcal = (p.protein || 0) * 4;
    const carbsKcal = (p.carbs || 0) * 4;
    const fatKcal = (p.fat || 0) * 9;
    const sum = proteinKcal + carbsKcal + fatKcal;
    if (sum <= 0) return { protein: 0, carbs: 0, fat: 0 };
    return {
      protein: (proteinKcal / sum) * 100,
      carbs: (carbsKcal / sum) * 100,
      fat: (fatKcal / sum) * 100,
    };
  }
}
