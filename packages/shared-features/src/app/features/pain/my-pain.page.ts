import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  PAIN_BANDS,
  PAIN_LEVELS,
  PAIN_LIMITING_LEVEL,
  PAIN_ZONES,
  PainEntry,
  painLabelFor,
} from 'src/app/core/constants/pain';
import { MyPainApiService } from './services/my-pain-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

interface ZoneRow {
  zone: string;
  // null = hoy no ha apuntado nada de esta zona. Distinto de 0, que es
  // "hoy no me duele" y sí es un dato.
  level: number | null;
  note: string;
}

/**
 * Movimiento 3 Coach Pro — el registro diario de dolor del cliente.
 *
 * Pantalla propia y no un campo más del check-in: un check-in es semanal, y
 * "esta semana me dolió la rodilla" no dice si fue un día o siete ni si va a
 * más o a menos. Además el dolor es lo único de la app que puede obligar a
 * cambiar el entrenamiento de HOY.
 *
 * Arranca con TODAS las zonas plegadas y ninguna marcada: si al abrirla
 * hubiera dieciséis escalas desplegadas, el cliente cerraría sin apuntar
 * nada. Se despliega la zona que duele y se marca; el resto no existe.
 */
@Component({
  selector: 'app-my-pain',
  templateUrl: 'my-pain.page.html',
  styleUrls: ['my-pain.page.scss'],
})
export class MyPainPage implements OnInit {
  public state: ViewState = 'loading';
  public readonly zones = PAIN_ZONES;
  public readonly levels = PAIN_LEVELS;
  public readonly bands = PAIN_BANDS;
  public readonly limitingLevel = PAIN_LIMITING_LEVEL;

  public rows: ZoneRow[] = [];
  public expandedZone: string | null = null;
  public isSaving = false;

  constructor(
    private myPainApi: MyPainApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  // Mismo destino de vuelta que my-checkins y my-food-exchanges: el único
  // punto de entrada es la tarjeta del tab Coach.
  public close(): void {
    void this.router.navigate(['/tabs/coach']);
  }

  public load(): void {
    this.state = 'loading';
    this.myPainApi.getForDate().subscribe({
      next: ({ entries }) => {
        this.rows = this.buildRows(entries || []);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private buildRows(entries: PainEntry[]): ZoneRow[] {
    const byZone = new Map(entries.map((entry) => [entry.zone, entry]));
    return this.zones.map((zone) => ({
      zone,
      level: byZone.has(zone) ? (byZone.get(zone) as PainEntry).level : null,
      note: byZone.get(zone)?.note || '',
    }));
  }

  public get markedRows(): ZoneRow[] {
    return this.rows.filter((row) => row.level !== null);
  }

  public get hasAnyPain(): boolean {
    return this.rows.some((row) => (row.level || 0) >= this.limitingLevel);
  }

  public toggleZone(zone: string): void {
    this.expandedZone = this.expandedZone === zone ? null : zone;
  }

  public labelFor(level: number | null): string {
    return level === null ? '' : painLabelFor(level);
  }

  public isLimiting(level: number | null): boolean {
    return level !== null && level >= this.limitingLevel;
  }

  public setLevel(row: ZoneRow, level: number): void {
    // Volver a pulsar el nivel marcado QUITA el registro. Es la única forma
    // de deshacer un toque por error: apuntar un 0 no sirve, porque 0 es
    // "hoy no me duele" y sigue siendo un dato guardado.
    if (row.level === level) {
      this.clear(row);
      return;
    }

    const previous = row.level;
    row.level = level;
    this.isSaving = true;

    this.myPainApi.save({ zone: row.zone, level, note: row.note }).subscribe({
      next: () => {
        this.isSaving = false;
      },
      error: () => {
        // Se revierte en pantalla: dejar el nivel marcado cuando no se ha
        // guardado le haría creer al cliente que su entrenador lo ha visto.
        row.level = previous;
        this.isSaving = false;
        this.ionicUtilService.showErrorToast(
          'No se pudo guardar. Inténtalo de nuevo.',
          'Error',
          2500
        );
      },
    });
  }

  public clear(row: ZoneRow): void {
    const previous = row.level;
    row.level = null;
    this.isSaving = true;

    this.myPainApi.remove(row.zone).subscribe({
      next: () => {
        this.isSaving = false;
      },
      error: () => {
        row.level = previous;
        this.isSaving = false;
        this.ionicUtilService.showErrorToast('No se pudo borrar.', 'Error', 2500);
      },
    });
  }

  // La nota se guarda al salir del campo, no en cada tecla: una petición por
  // pulsación sobre una conexión de móvil es la forma de perder la mitad.
  public saveNote(row: ZoneRow): void {
    if (row.level === null) return;
    this.myPainApi.save({ zone: row.zone, level: row.level, note: row.note }).subscribe({
      error: () =>
        this.ionicUtilService.showErrorToast('No se pudo guardar la nota.', 'Error', 2500),
    });
  }

  public trackByZone(_index: number, row: ZoneRow): string {
    return row.zone;
  }

  public trackByLevel(_index: number, level: number): number {
    return level;
  }
}
