import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DietCardProfile {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

const FLAG_LABELS: Record<string, string> = {
  vegan: 'Vegana',
  vegetarian: 'Vegetariana',
  lactoseFree: 'Sin lactosa',
  glutenFree: 'Sin gluten',
};

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
  @Input() public flags: string[] = [];
  // Restricciones del cliente que esta dieta NO cumple (ver missingFlags en
  // diet-suggestion.model.ts). Se avisa nombrando la restricción incumplida
  // y no acusando al contenido: un flag falta tanto si algún alimento no lo
  // cumple como si el catálogo simplemente no lo declara.
  @Input() public missingFlags: string[] = [];
  @Input() public selected = false;
  @Input() public highlight = false;

  @Output() public picked = new EventEmitter<void>();

  public flagLabel(flag: string): string {
    return FLAG_LABELS[flag] ?? flag;
  }

  public missingFlagsLabel(): string {
    return this.missingFlags.map((flag) => this.flagLabel(flag)).join(', ');
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
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
