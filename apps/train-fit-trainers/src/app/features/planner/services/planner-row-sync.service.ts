import { Injectable, signal } from '@angular/core';

// Rediseño de entrenamiento — comparar el mismo día entre microciclos
// (2026-08). Provisto UNA VEZ en PlannerPage (ver planner.page.ts,
// `providers: [PlannerRowSyncService]`) e inyectado por cada
// PlannerColumnComponent hijo — todas las columnas comparten la MISMA
// instancia, así que activar la sincronización en una columna se ve en
// todas. Guarda estado por ÍNDICE de fila (no por workout._id, que es
// distinto en cada split — el índice es lo único comparable entre
// columnas). Puramente UI efímera: no persiste, no toca ningún dato real,
// solo qué accordions se ven expandidos — para que el entrenador pueda
// comparar/editar el mismo día en paralelo entre semanas.
@Injectable()
export class PlannerRowSyncService {
  private readonly syncedIndices = signal<ReadonlySet<number>>(new Set());
  private readonly openIndices = signal<ReadonlySet<number>>(new Set());

  public isSynced(index: number): boolean {
    return this.syncedIndices().has(index);
  }

  // `currentlyOpen` es el estado de la card concreta desde la que se activa
  // el checkbox — al sincronizar, el resto de la fila adopta ESE estado en
  // vez de forzar abierto/cerrado, así no se colapsan de golpe cards que el
  // entrenador ya tenía abiertas.
  public toggleSynced(index: number, currentlyOpen: boolean): void {
    const nextSynced = new Set(this.syncedIndices());
    if (nextSynced.has(index)) {
      nextSynced.delete(index);
    } else {
      nextSynced.add(index);
      this.setOpen(index, currentlyOpen);
    }
    this.syncedIndices.set(nextSynced);
  }

  public isOpen(index: number): boolean {
    return this.openIndices().has(index);
  }

  public setOpen(index: number, open: boolean): void {
    const nextOpen = new Set(this.openIndices());
    if (open) nextOpen.add(index);
    else nextOpen.delete(index);
    this.openIndices.set(nextOpen);
  }
}
