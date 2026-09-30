import { Component, Input } from '@angular/core';

export interface CompareSide {
  url: string | null;
  label: string;
  sub?: string;
}

/**
 * Antes / después de una misma pose. Dos modos: deslizador (una foto encima
 * de la otra, se descubre arrastrando) y lado a lado. El deslizador es un
 * <input type="range"> de verdad: se maneja con el dedo, el ratón y el teclado.
 */
@Component({
  selector: 'app-photo-compare',
  templateUrl: './photo-compare.component.html',
  styleUrls: ['./photo-compare.component.scss'],
})
export class PhotoCompareComponent {
  @Input() public before: CompareSide | null = null;
  @Input() public after: CompareSide | null = null;
  @Input() public mode: 'slider' | 'side' = 'slider';

  public position = 50;

  public onSlide(event: Event): void {
    this.position = Number((event.target as HTMLInputElement).value);
  }

  public get clip(): string {
    return `inset(0 ${100 - this.position}% 0 0)`;
  }
}
