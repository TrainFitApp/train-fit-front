import { Component, Input, OnChanges } from '@angular/core';
import { ClientDetailApiService } from '../../services/client-detail-api.service';

type ViewState = 'idle' | 'loading' | 'error' | 'loaded';

interface ShoppingItem {
  name: string;
  quantity: number;
  dayCount: number;
}

// Los rangos con los que se hace la compra de verdad. Cerrados a propósito:
// un selector de fechas libre convertiría dos toques en un formulario.
const RANGES = [
  { days: 7, label: '1 semana' },
  { days: 14, label: '2 semanas' },
  { days: 30, label: 'Un mes' },
];

/**
 * Movimiento 5 Coach Pro — lo que el cliente tiene que comprar para cumplir
 * el plan, sumado por producto.
 *
 * Del lado del entrenador sirve para lo contrario que del lado del cliente:
 * él no va a comprarlo, la usa para comprobar de un vistazo que lo que ha
 * pautado es comprable y razonable ("¿de verdad le estoy mandando 3 kg de
 * pollo a la semana?"). Por eso arranca PLEGADA y no carga nada hasta que se
 * abre: es una comprobación puntual, no algo que se mire cada vez que se
 * entra en la ficha, y su consulta trae los días de dieta poblados enteros.
 */
@Component({
  selector: 'app-shopping-list-panel',
  templateUrl: 'shopping-list-panel.component.html',
  styleUrls: ['shopping-list-panel.component.scss'],
})
export class ShoppingListPanelComponent implements OnChanges {
  @Input() public clientId = '';

  public state: ViewState = 'idle';
  public expanded = false;
  public items: ShoppingItem[] = [];
  public daysWithPlan = 0;
  public readonly ranges = RANGES;
  public selectedDays = 7;

  constructor(private clientDetailApi: ClientDetailApiService) {}

  public ngOnChanges(): void {
    // Al cambiar de cliente se olvida lo cargado: enseñar la compra del
    // anterior sería peor que no enseñar nada.
    this.state = 'idle';
    this.expanded = false;
    this.items = [];
  }

  public toggle(): void {
    this.expanded = !this.expanded;
    if (this.expanded && this.state === 'idle') this.load();
  }

  public selectRange(days: number): void {
    if (this.selectedDays === days) return;
    this.selectedDays = days;
    this.load();
  }

  public load(): void {
    if (!this.clientId) return;
    this.state = 'loading';

    const from = new Date().toISOString().slice(0, 10);
    const to = new Date(Date.now() + (this.selectedDays - 1) * 86400000)
      .toISOString()
      .slice(0, 10);

    this.clientDetailApi.getShoppingList(this.clientId, from, to).subscribe({
      next: (list) => {
        this.items = list?.items || [];
        this.daysWithPlan = list?.daysWithPlan || 0;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Por encima del kilo en kg: "3400 g de pollo" obliga a dividir de cabeza.
  public quantityLabel(item: ShoppingItem): string {
    if (item.quantity >= 1000) return `${Math.round(item.quantity / 100) / 10} kg`;
    return `${item.quantity} g`;
  }

  public trackByName(_index: number, item: ShoppingItem): string {
    return item.name;
  }

  public trackByDays(_index: number, range: { days: number }): number {
    return range.days;
  }
}
