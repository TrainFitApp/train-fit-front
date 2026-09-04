import { Injectable, signal } from '@angular/core';

// Rediseño de entrenamiento — comparar el mismo día entre microciclos
// (2026-08, rediseñado 2026-09). Provisto UNA VEZ en PlannerPage (ver
// planner.page.ts, `providers: [PlannerRowSyncService]`) e inyectado por
// cada PlannerColumnComponent hijo — todas las columnas comparten la MISMA
// instancia, así que activar la comparación en una columna se ve en todas.
//
// 2026-09 — antes había un checkbox POR FILA en cada card ("Comparar con
// otras semanas"), veinte botones repetidos en un tablero de veinte
// columnas. Sustituido por UN interruptor global en la barra superior
// (ver planner.page.html): al activarlo, TODAS las filas de TODAS las
// columnas comparten el mismo estado abierto/cerrado por índice; al
// desactivarlo, cada columna vuelve a su propio collapsedCardIds local
// (ver planner-column.component.ts#isCardOpen). openIndices se conserva
// tal cual estaba (no se limpia al desactivar): si se reactiva más tarde,
// reaparece como se dejó, en vez de forzar todo a abierto de golpe.
//
// Guarda estado por ÍNDICE de fila (no por workout._id, que es distinto en
// cada split — el índice es lo único comparable entre columnas). Puramente
// UI efímera: no persiste, no toca ningún dato real, solo qué accordions se
// ven expandidos.
@Injectable()
export class PlannerRowSyncService {
  private readonly compareAll = signal(false);
  private readonly openIndices = signal<ReadonlySet<number>>(new Set());

  // Scroll sincronizado (2026-09) — con el modo activo, desplazar la lista de
  // UNA columna desplaza las demás a la misma altura: comparar el día 4 de
  // seis microciclos no sirve de nada si hay que ir columna por columna
  // buscándolo. Se guarda el scrollTop en píxeles, no el índice de fila: las
  // cards no miden lo mismo (una con 8 ejercicios abiertos frente a una de
  // descanso), pero el desfase visual de eso es menor que el de no
  // sincronizar nada, y es lo único que se puede aplicar sin medir cada card.
  //
  // Aquí no vive ningún elemento del DOM: cada columna se suscribe y decide
  // (ver planner-column.component.ts#onBodyScroll). `origin` evita el bucle
  // infinito — la columna que ORIGINA el scroll ignora su propio eco.
  private scrollTopValue = 0;
  private scrollOrigin: string | null = null;
  private readonly scrollListeners = new Map<string, (top: number) => void>();

  public get compareAllMode(): boolean {
    return this.compareAll();
  }

  public toggleCompareAll(): void {
    this.compareAll.update((active) => !active);
  }

  public registerScroll(id: string, apply: (top: number) => void): void {
    this.scrollListeners.set(id, apply);
  }

  public unregisterScroll(id: string): void {
    this.scrollListeners.delete(id);
  }

  public publishScroll(id: string, top: number): void {
    if (!this.compareAll()) return;
    // Eco del scroll que acabamos de aplicar nosotros: se descarta, o dos
    // columnas se empujarían la una a la otra sin parar.
    if (this.scrollOrigin && this.scrollOrigin !== id) return;
    if (Math.abs(top - this.scrollTopValue) < 1) return;

    this.scrollOrigin = id;
    this.scrollTopValue = top;

    for (const [listenerId, apply] of this.scrollListeners) {
      if (listenerId === id) continue;
      apply(top);
    }

    // Se libera en el siguiente tick: los scroll events que dispare el
    // apply() de arriba llegan después, y son justo los que hay que ignorar.
    setTimeout(() => (this.scrollOrigin = null), 0);
  }

  public get scrollTop(): number {
    return this.scrollTopValue;
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
