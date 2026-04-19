import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  public transform(categories: string | string[]): string {
    if (!categories) {
      return 'No hay categorías';
    }
    // Handle string (new schema)
    if (typeof categories === 'string') {
      return `(${categories})`;
    }
    // Handle array (legacy)
    if (categories.length === 0) {
      return 'No hay categorías';
    }
    return `(${categories.join(', ')})`;
  }
}
