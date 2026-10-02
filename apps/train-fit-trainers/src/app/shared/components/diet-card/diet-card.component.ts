import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { dietaryFlagUi } from '../../utils/dietary-flag-ui.util';

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
  private readonly translate = inject(TranslateService);

  @Input() public name = '';
  @Input() public profile: DietCardProfile | null = null;
  @Input() public deltas: DietCardProfile | null = null;
  @Input() public medal = '';
  @Input() public verified = false;
  @Input() public ownedByClient = false;
  @Input() public menuCount: number | null = null;
  @Input() public basedOnDays = 0;
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

  // Menús que entraron en el perfil. `menuCount` (real, biblioteca) manda
  // sobre `basedOnDays` (lo que devuelve el backend con el perfil) cuando
  // ambos existen.
  private get contentUnits(): number {
    return this.menuCount || this.basedOnDays || 0;
  }

  public get modeLabel(): string {
    const n = this.contentUnits;
    return n ? this.translate.instant('SHARED_COMPONENTS.MENU_ELEGIR', { n, p1: n === 1 ? '' : 's' }) : this.translate.instant('SHARED_COMPONENTS.EL_CLIENTE_ELIGE_CADA_DIA');
  }

  // Las kcal/macros del panel NO son un dato asignado a la plantilla: salen
  // de sumar sus alimentos y, con varios menús, de la MEDIA de esos menús
  // (ver diet-macro-profile.js). Solo se avisa a partir de 2: con un menú no
  // hay media que matizar.
  public get averageNote(): string | null {
    const n = this.contentUnits;
    return n < 2 ? null : this.translate.instant('SHARED_COMPONENTS.MEDIA_DE_LOS_MENUS', { n });
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
