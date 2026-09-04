import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Split, SPLIT_PURPOSES } from 'src/app/core/models/split';
import {
  averageRir,
  countDoneSets,
  countFailureSets,
  countTrainableDays,
  countUnweightedSets,
  formatSignedDelta,
  sumSets,
} from '../../utils/planner-metrics';
import { CompareResult, compareSplits } from '../../utils/planner-compare';

type CompareView = 'exercises' | 'volume';

/**
 * Comparar DOS microciclos (2026-09).
 *
 * Responde la única pregunta que no responde ninguna otra pantalla del
 * panel: "¿qué cambié en la PAUTA del microciclo A al B?". Los agregados
 * (series/RIR) ya se ven en la columna al seleccionarla y el
 * volumen por grupo muscular en el panel lateral — aquí están como
 * contexto, no como plato principal: lo que manda es la lista de
 * ejercicios emparejados con lo que cambió en cada uno.
 *
 * Lo EJECUTADO no se calcula aquí (eso es Estadísticas): solo se declara
 * con el contador de series completadas, porque `set.weight` es a la vez
 * prescripción y ejecución y duplicar un microciclo arrastra los valores
 * del origen borrando solo `doned`.
 *
 * SOLO LECTURA a propósito: no ofrece "igualar" ni "copiar de A a B".
 * reorderWorkoutRows/updateWorkoutsOrder indexan sin comprobar longitud y
 * escribirían undefined con las columnas desalineadas.
 *
 * El cálculo es por INSTANTÁNEA (al abrir y al cambiar A/B), criterio
 * CONTRARIO al del panel de volumen (getter recalculado en cada ciclo).
 * Es correcto SOLO porque este modal es un overlay bloqueante y el tablero
 * no se puede editar debajo: si algún día deja de ser modal, hay que
 * volver a getters o se quedará obsoleto en silencio.
 */
@Component({
  selector: 'app-compare-splits-modal',
  templateUrl: 'compare-splits-modal.component.html',
  styleUrls: ['compare-splits-modal.component.scss'],
})
export class CompareSplitsModalComponent implements OnInit {
  @Input() public splits: Split[] = [];
  @Input() public indexA = 0;
  @Input() public indexB = 1;

  public result: CompareResult | null = null;
  public view: CompareView = 'exercises';
  public onlyChanges = true;

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    this.recalculate();
  }

  public get splitA(): Split | null {
    return this.splits[this.indexA] || null;
  }

  public get splitB(): Split | null {
    return this.splits[this.indexB] || null;
  }

  public recalculate(): void {
    this.result = compareSplits(this.splitA, this.splitB);
  }

  public labelFor(index: number): string {
    return `Microciclo ${index + 1}`;
  }

  // Vacío cuando el microciclo es "normal": lo que hay que ver es dónde
  // están las descargas, no una etiqueta "Normal" en los dos lados.
  public purposeLabel(split: Split | null): string {
    const purpose = split?.purpose;
    if (!purpose || purpose === 'regular') return '';
    return SPLIT_PURPOSES.find((option) => option.key === purpose)?.label || '';
  }

  public onSelectA(value: unknown): void {
    const index = Number(value);
    if (!Number.isInteger(index) || index === this.indexA) return;
    // Exclusión mutua: si se elige el que ya está en el otro lado, se
    // intercambian en vez de comparar un microciclo consigo mismo.
    if (index === this.indexB) this.indexB = this.indexA;
    this.indexA = index;
    this.recalculate();
  }

  public onSelectB(value: unknown): void {
    const index = Number(value);
    if (!Number.isInteger(index) || index === this.indexB) return;
    if (index === this.indexA) this.indexA = this.indexB;
    this.indexB = index;
    this.recalculate();
  }

  public swap(): void {
    const previousA = this.indexA;
    this.indexA = this.indexB;
    this.indexB = previousA;
    this.recalculate();
  }

  public onViewChange(value: unknown): void {
    if (value === 'exercises' || value === 'volume') this.view = value;
  }

  public close(): void {
    void this.modalController.dismiss();
  }

  // --- Agregados de cabecera ---

  public get setsA(): number {
    return sumSets(this.splitA);
  }

  public get setsB(): number {
    return sumSets(this.splitB);
  }

  public get setsDelta(): string {
    return formatSignedDelta(this.setsB - this.setsA, (n) => `${Math.round(n)}`);
  }

  public get rirLabelA(): string {
    return this.formatRir(averageRir(this.splitA));
  }

  public get rirLabelB(): string {
    return this.formatRir(averageRir(this.splitB));
  }

  public get rirDelta(): string | null {
    const a = averageRir(this.splitA);
    const b = averageRir(this.splitB);
    if (a === null || b === null) return null;
    return formatSignedDelta(b - a, (n) =>
      new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)
    );
  }

  private formatRir(value: number | null): string {
    return value === null
      ? '—'
      : new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 }).format(value);
  }

  public get trainableDaysA(): number {
    return countTrainableDays(this.splitA);
  }

  public get trainableDaysB(): number {
    return countTrainableDays(this.splitB);
  }

  public get failureSetsA(): number {
    return countFailureSets(this.splitA);
  }

  public get failureSetsB(): number {
    return countFailureSets(this.splitB);
  }

  public get untonnagedA(): number {
    return countUnweightedSets(this.splitA);
  }

  public get untonnagedB(): number {
    return countUnweightedSets(this.splitB);
  }

  public get doneSetsA(): number {
    return countDoneSets(this.splitA);
  }

  public get doneSetsB(): number {
    return countDoneSets(this.splitB);
  }

  // --- Lista de ejercicios ---

  public get visibleWorkouts() {
    const workouts = this.result?.workouts || [];
    if (!this.onlyChanges) return workouts;
    return workouts.filter((row) => row.hasChanges || row.onlyIn);
  }

  // Un día sin cambios colapsa a UNA línea en vez de dejar un hueco sin
  // explicar: si se filtra en silencio, el entrenador no sabe si el día no
  // cambió o si el comparador se lo saltó.
  public get hiddenWorkouts(): number {
    if (!this.onlyChanges) return 0;
    return (this.result?.workouts || []).filter((row) => !row.hasChanges && !row.onlyIn).length;
  }

  public visibleExercises(row: { exercises: CompareResult['workouts'][number]['exercises'] }) {
    if (!this.onlyChanges) return row.exercises;
    return row.exercises.filter((exercise) => exercise.status !== 'same');
  }

  // --- Lectura de entrenador ---

  // "Declaraste descarga: esto es lo que mide" — sin veredicto ni umbrales.
  // Una descarga de verdad baja series y sube RIR; pero el corte de cuánto
  // es "suficiente" depende del cliente, y un semáforo con un baremo que
  // nadie ha calibrado daría una falsa autoridad. Se enseñan los números
  // que la definen y decide el entrenador.
  public get isDeloadB(): boolean {
    return this.splitB?.purpose === 'deload';
  }

  public get deloadSetsDropPercent(): number | null {
    if (!this.setsA) return null;
    return Math.round(((this.setsB - this.setsA) / this.setsA) * 100);
  }

  public get progress() {
    return this.result?.progress || null;
  }

  public statusLabel(status: string, movedFrom: number | null): string {
    switch (status) {
      case 'added':
        return `nuevo en ${this.labelFor(this.indexB)}`;
      case 'removed':
        return `ya no está en ${this.labelFor(this.indexB)}`;
      case 'moved':
        return movedFrom === null ? 'movido' : `movido de la posición ${movedFrom + 1}`;
      default:
        return '';
    }
  }

  public workoutTitle(row: { index: number; nameA: string | null; nameB: string | null }): string {
    return row.nameB || row.nameA || `Día ${row.index + 1}`;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
