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
// lista de sugerencias al empezar una fase. `deltas`/`medal`/`lead` solo
// aparecen en el contexto de sugerencia (hay un objetivo de cliente contra
// el que comparar); `dayCount` en el de biblioteca.
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
  @Input() public lead = '';
  @Input() public verified = false;
  @Input() public ownedByClient = false;
  @Input() public dayCount: number | null = null;
  @Input() public basedOnDays = 0;
  @Input() public flags: string[] = [];
  @Input() public selected = false;
  @Input() public highlight = false;

  @Output() public picked = new EventEmitter<void>();

  public flagLabel(flag: string): string {
    return FLAG_LABELS[flag] ?? flag;
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
  }
}
