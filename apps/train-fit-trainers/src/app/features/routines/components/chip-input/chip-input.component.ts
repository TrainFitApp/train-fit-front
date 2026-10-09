import { Component, EventEmitter, Input, Output } from '@angular/core';

// Lista de valores cortos (etiquetas, material) como chips: Enter o coma
// añade, la × o Retroceso con el campo vacío quita. Debajo, sugerencias de
// un toque (las etiquetas que ya usa el entrenador, el material de los
// ejercicios de la plantilla). Sustituye al texto separado por comas, que
// no dejaba ver qué etiquetas existían ni dónde acababa cada una.
@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
})
export class ChipInputComponent {
  @Input() values: string[] = [];
  @Input() suggestions: string[] = [];
  @Input() placeholder = '';
  @Input() inputId = '';
  @Input() icon = 'pricetag-outline';
  @Input() max = 10;
  @Input() maxLength = 30;
  @Input() removeLabel = '';
  @Output() valuesChange = new EventEmitter<string[]>();

  public query = '';

  // Misma referencia mientras no cambie el resultado (se pinta con *ngFor).
  private suggestionsCache: { key: string; value: string[] } = { key: '', value: [] };

  public get full(): boolean {
    return this.values.length >= this.max;
  }

  public get visibleSuggestions(): string[] {
    const next = this.computeSuggestions();
    const key = JSON.stringify(next);
    if (key !== this.suggestionsCache.key) this.suggestionsCache = { key, value: next };
    return this.suggestionsCache.value;
  }

  private computeSuggestions(): string[] {
    if (this.full) return [];
    const taken = new Set(this.values.map((value) => value.toLowerCase()));
    const term = this.query.trim().toLowerCase();
    const seen = new Set<string>();
    return this.suggestions
      .filter((suggestion) => {
        const key = suggestion.toLowerCase();
        if (!suggestion || taken.has(key) || seen.has(key)) return false;
        seen.add(key);
        return !term || key.includes(term);
      })
      .slice(0, 8);
  }

  public add(raw: string): void {
    const next = [...this.values];
    const taken = new Set(next.map((value) => value.toLowerCase()));
    for (const part of (raw || '').split(',')) {
      const value = part.trim().slice(0, this.maxLength);
      if (!value || taken.has(value.toLowerCase()) || next.length >= this.max) continue;
      taken.add(value.toLowerCase());
      next.push(value);
    }
    this.query = '';
    if (next.length !== this.values.length) this.valuesChange.emit(next);
  }

  public remove(value: string): void {
    this.valuesChange.emit(this.values.filter((item) => item !== value));
  }

  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      if (!this.query.trim()) return;
      event.preventDefault();
      this.add(this.query);
      return;
    }
    if (event.key === 'Backspace' && !this.query && this.values.length) {
      this.remove(this.values[this.values.length - 1]);
    }
  }

  public trackByValue(_index: number, value: string): string {
    return value;
  }
}
