import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WorkoutBlockType } from 'src/app/core/models/workout';
import {
  WorkoutBlocksInput,
  WorkoutOrderItem,
  buildOrderItems,
  moveOrderItem,
  moveOrderItemExercise,
  orderFromItems,
} from 'src/app/core/utils/workout-blocks.util';

// Lista de "Mover ejercicios" con bloques: cada ejercicio suelto y cada bloque
// entero es una fila que se arrastra (los miembros del bloque viajan con él);
// dentro de un bloque, flechas arriba/abajo para ordenar sus ejercicios. La
// comparten el modal OrderExercisesPage y el modo mover de current-workout.
//
// Emite `order[posición] = índice original` (lo que consume
// updateWorkoutsOrder). Nunca toca workout.exercises: lo guarda quien la usa.
@Component({
  selector: 'app-exercise-order-list',
  templateUrl: './exercise-order-list.component.html',
  styleUrls: ['./exercise-order-list.component.scss'],
})
export class ExerciseOrderListComponent implements OnChanges {
  @Input() workout: WorkoutBlocksInput | null = null;
  @Input() disabled = false;
  @Output() orderChange = new EventEmitter<number[]>();

  // Lo que pinta el *ngFor. No se reordena durante el arrastre:
  // ion-reorder-group ya mueve los nodos del DOM por su cuenta (mismo patrón
  // que tenía OrderExercisesPage), solo se rastrea a dónde fue cada elemento.
  public items: WorkoutOrderItem[] = [];
  // Los mismos elementos en el orden actual.
  private current: WorkoutOrderItem[] = [];
  // Número de ejercicio con el que empieza cada elemento, en el orden actual.
  private startNumbers = new Map<string, number>();

  public showReorderGroup = true;

  constructor(private translate: TranslateService) {}

  // Solo si cambia el entreno: un `disabled` que parpadea no debe tirar el
  // orden que el usuario ya ha montado.
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['workout']) this.rebuild();
  }

  public get hasBlocks(): boolean {
    return this.items.some((item) => !!item.block);
  }

  /** Vuelve al orden con el que se abrió (la lista se recrea para que Ionic suelte los nodos movidos). */
  public reset(): void {
    this.showReorderGroup = false;
    this.rebuild();
    setTimeout(() => (this.showReorderGroup = true), 0);
  }

  public trackByItem(_index: number, item: WorkoutOrderItem): string {
    return item.key;
  }

  public startNumber(item: WorkoutOrderItem): number {
    return this.startNumbers.get(item.key) ?? 1;
  }

  public blockLabel(item: WorkoutOrderItem): string {
    if (!item.block) return '';
    return item.block.name || this.blockTypeLabel(item.block.type);
  }

  public blockTypeLabel(type: WorkoutBlockType): string {
    switch (type) {
      case 'superset':
        return this.translate.instant('TABLES.BLOCK_TYPE_SUPERSET');
      case 'circuit':
        return this.translate.instant('TABLES.BLOCK_TYPE_CIRCUIT');
      case 'warmup':
        return this.translate.instant('TABLES.BLOCK_TYPE_WARMUP');
      case 'finisher':
        return this.translate.instant('TABLES.BLOCK_TYPE_FINISHER');
      default:
        return this.translate.instant('TABLES.BLOCK_TYPE_STRAIGHT');
    }
  }

  public handleReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    const { from, to } = event.detail;
    this.current = moveOrderItem(this.current, from, to);
    // Sin argumento: el array fuente no se reordena, ver `items`.
    event.detail.complete();
    this.publish();
  }

  public moveWithinBlock(renderIndex: number, from: number, to: number): void {
    const item = this.items[renderIndex];
    if (!item?.block) return;
    const [next] = moveOrderItemExercise([item], 0, from, to);
    if (next === item) return;
    this.items[renderIndex] = next;
    this.current = this.current.map((candidate) => (candidate.key === next.key ? next : candidate));
    this.publish();
  }

  private rebuild(): void {
    this.items = buildOrderItems(this.workout);
    this.current = [...this.items];
    this.refreshNumbers();
  }

  private publish(): void {
    this.refreshNumbers();
    this.orderChange.emit(orderFromItems(this.current));
  }

  private refreshNumbers(): void {
    let next = 1;
    this.startNumbers = new Map();
    this.current.forEach((item) => {
      this.startNumbers.set(item.key, next);
      next += item.exercises.length;
    });
  }
}
