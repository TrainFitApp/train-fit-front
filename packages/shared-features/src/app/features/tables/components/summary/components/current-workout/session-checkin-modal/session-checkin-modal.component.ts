import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { localizeList } from 'src/app/core/i18n/localized-catalog';
import { SORENESS_ANCHORS, SORENESS_MUSCLES, SorenessEntry } from 'src/app/core/constants/soreness';

// Movimiento 2 Coach Pro — anclas de "¿cómo llegas hoy?".
//
// Antes eran cinco botones numerados con "(agotado)" y "(a tope)" sueltos en
// el enunciado: los tres niveles de en medio no significaban nada, y son
// justamente donde caen casi todas las respuestas.
const READINESS_ANCHORS = [
  'Agotado, hoy me cuesta hasta empezar',
  'Bajo de energía, iré tirando',
  'Normal, ni bien ni mal',
  'Bien, con ganas',
  'A tope, me como el mundo',
];

localizeList(READINESS_ANCHORS, 'TABLES.READINESS_ANCHORS');

export interface SessionCheckinResult {
  readiness: number | null;
  soreness: SorenessEntry[];
}

/**
 * Movimiento 2 Coach Pro — sustituye al aviso de readiness de antes.
 *
 * Un modal y no un `ion-alert` porque ahora hay dos cosas que responder y
 * dieciséis músculos que ofrecer: un alert con radios no puede con eso, y
 * partirlo en dos avisos seguidos antes de entrenar sería justo la manera de
 * que el cliente le diera a "saltar" en los dos.
 *
 * Todo es opcional y se puede cerrar sin responder: nunca debe interponerse
 * entre alguien y su entrenamiento. Las agujetas arrancan plegadas — quien
 * no tenga nada que reportar solo ve la pregunta de readiness, como antes.
 */
@Component({
  selector: 'app-session-checkin-modal',
  templateUrl: 'session-checkin-modal.component.html',
  styleUrls: ['session-checkin-modal.component.scss'],
})
export class SessionCheckinModalComponent implements OnInit {
  // Valores ya guardados, si se vuelve a abrir sobre una sesión retomada.
  @Input() public readiness: number | null = null;
  @Input() public soreness: SorenessEntry[] = [];

  public readonly readinessAnchors = READINESS_ANCHORS;
  public readonly muscles = SORENESS_MUSCLES;
  public readonly sorenessAnchors = SORENESS_ANCHORS;

  public showSoreness = false;

  // Nivel por músculo mientras se edita. Un Map y no el array final para que
  // marcar y desmarcar no obligue a recorrer y reconstruir el array en cada
  // pulsación.
  private levelByMuscle = new Map<string, number>();

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    for (const entry of this.soreness || []) {
      this.levelByMuscle.set(entry.muscle, entry.level);
    }
    // Si ya había agujetas apuntadas, la sección se abre sola: esconder lo
    // que el cliente respondió la última vez le haría pensar que se perdió.
    this.showSoreness = this.levelByMuscle.size > 0;
  }

  public selectReadiness(level: number): void {
    // Volver a pulsar el nivel marcado lo deselecciona: sin esto, un toque
    // por error no se puede deshacer sin cerrar el modal.
    this.readiness = this.readiness === level ? null : level;
  }

  public levelFor(muscle: string): number {
    // 1 = "nada", que es el estado por defecto y el que no se guarda.
    return this.levelByMuscle.get(muscle) || 1;
  }

  public setLevel(muscle: string, level: number): void {
    if (level <= 1) {
      this.levelByMuscle.delete(muscle);
      return;
    }
    this.levelByMuscle.set(muscle, level);
  }

  public get soreMuscleCount(): number {
    return this.levelByMuscle.size;
  }

  public toggleSoreness(): void {
    this.showSoreness = !this.showSoreness;
  }

  public trackByMuscle(_index: number, muscle: string): string {
    return muscle;
  }

  public skip(): void {
    // Saltar no borra lo que ya hubiera guardado: devuelve null y quien
    // llama deja el workout como estaba.
    this.modalController.dismiss(null);
  }

  public confirm(): void {
    const result: SessionCheckinResult = {
      readiness: this.readiness,
      // En el orden del catálogo, igual que hace el backend, para que las
      // dos representaciones del mismo dato no salgan distintas.
      soreness: this.muscles
        .filter((muscle) => this.levelByMuscle.has(muscle))
        .map((muscle) => ({ muscle, level: this.levelByMuscle.get(muscle) as number })),
    };
    this.modalController.dismiss(result);
  }
}
