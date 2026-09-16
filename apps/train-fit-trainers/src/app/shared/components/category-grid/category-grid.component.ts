import { Component, Input } from '@angular/core';

export interface CategoryCard {
  name: string;
  description: string;
  icon: string;
  colorVar: string;
  path: string;
}

// Movimiento 1 Coach Pro — extraído tal cual del interior de TemplatesPage al
// partirse "Plantillas" en Biblioteca (/tabs/templates) y Mi método
// (/tabs/method). Ambas presentan la misma rejilla de tarjetas-categoría;
// duplicar el markup y sus ~80 líneas de SCSS habría dejado dos copias que se
// desincronizan a la primera. El componente no añade comportamiento nuevo:
// es exactamente lo que ya había, con las categorías como entrada.
@Component({
  selector: 'app-category-grid',
  templateUrl: 'category-grid.component.html',
  styleUrls: ['category-grid.component.scss'],
})
export class CategoryGridComponent {
  @Input() public categories: CategoryCard[] = [];

  public trackByPath(_index: number, category: CategoryCard): string {
    return category.path;
  }
}
