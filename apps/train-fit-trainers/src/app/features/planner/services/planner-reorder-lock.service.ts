import { Injectable, signal } from '@angular/core';

// Reordenar microciclos/entrenamientos — arreglo de carrera (2026-08).
// reorderSplits/reorderWorkoutRows hacen un $set del array completo en el
// backend, sin versión ni bloqueo (confirmado leyendo split-dao.js#reorderSplits)
// — la última escritura que LLEGA AL SERVIDOR gana, no la última que soltó el
// entrenador. Si se arrastran dos columnas (o dos entrenamientos) seguidas
// rápido, la segunda petición puede completarse en el servidor antes que la
// primera, y el resultado final no coincide con el último gesto del
// entrenador ni con lo que se ve en pantalla justo antes de refrescar —
// exactamente lo reportado.
//
// La forma más simple y segura de cerrar la carrera es no dejar que exista:
// mientras haya una petición de reorder en curso (columnas O entrenamientos —
// mismo tablero, mismo riesgo de solaparse), se deshabilita CUALQUIER drag
// nuevo hasta que la anterior responda. Servicio único por rutina abierta
// (mismo patrón que PlannerRowSyncService/PlannerExerciseCopyService),
// compartido entre PlannerPage (columnas) y cada PlannerColumnComponent
// (entrenamientos dentro de una columna).
@Injectable()
export class PlannerReorderLockService {
  private readonly _locked = signal(false);
  public readonly locked = this._locked.asReadonly();

  public lock(): void {
    this._locked.set(true);
  }

  public unlock(): void {
    this._locked.set(false);
  }
}
