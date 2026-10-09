import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ManageSetComponent } from 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';
import {
  ExerciseKind,
  SetDraft,
  cloneSets,
  formatRange,
  fromManageSet,
  isFailure,
  toManageSet,
} from '../../utils/template-sets';

export interface TemplateExercisePanelResult {
  sets: SetDraft[];
  notes: string;
}

// Cada serie con un id estable mientras el panel está abierto: "Serie
// objetivo" devuelve la serie editada por él aunque entretanto se hayan
// reordenado, copiado o quitado otras.
export interface SetItem {
  id: number;
  set: SetDraft;
}

const SET_ID_PREFIX = 'tpl-set-';

// "Configurar ejercicio" de una plantilla: el mismo panel que abre el
// Planificador al tocar un ejercicio (config-exercise.page): lista de
// series, "Añadir series" con "Serie objetivo" (manage-set) a su izquierda y
// nota del ejercicio. Trabaja sobre la pauta en memoria del builder (aquí no
// hay serie real que guardar en el back); devuelve series y nota al pulsar
// "Guardar" y, si se cierra con cambios, pregunta antes.
@Component({
  selector: 'app-template-exercise-panel',
  templateUrl: './template-exercise-panel.component.html',
  styleUrls: ['./template-exercise-panel.component.scss'],
})
export class TemplateExercisePanelComponent implements OnInit, OnDestroy {
  @Input() exerciseName = '';
  @Input() kind: ExerciseKind = 'strength';
  @Input() sets: SetDraft[] = [];
  @Input() notes = '';

  // Ionic lo inyecta: el panel desde el que se abre "Serie objetivo".
  public modal?: HTMLIonModalElement;

  public items: SetItem[] = [];
  public draftNotes = '';
  public highlightedId: number | null = null;

  private initialSnapshot = '';
  private nextId = 1;
  // "Serie objetivo" abierto: cómo cargarle otra serie sin apilar otro panel.
  private setPanelLoader: ((set?: unknown) => void) | null = null;
  private highlightTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.items = cloneSets(this.sets || []).map((set) => this.item(set));
    this.draftNotes = this.notes || '';
    this.initialSnapshot = this.snapshot();
    this.modal?.addEventListener('tfRequestClose', this.onRequestClose);
  }

  public ngOnDestroy(): void {
    this.modal?.removeEventListener('tfRequestClose', this.onRequestClose);
    clearTimeout(this.highlightTimer);
  }

  // Otro ejercicio pide este panel (el builder solo deja uno abierto).
  private readonly onRequestClose = (event: Event): void => {
    event.preventDefault();
    void this.close(() => (event as CustomEvent).detail?.cancel?.());
  };

  public get draftSets(): SetDraft[] {
    return this.items.map((item) => item.set);
  }

  private item(set: SetDraft): SetItem {
    return { id: this.nextId++, set };
  }

  public get isDirty(): boolean {
    return this.snapshot() !== this.initialSnapshot;
  }

  private snapshot(): string {
    return JSON.stringify({ sets: this.draftSets, notes: this.draftNotes.trim() });
  }

  public trackById(_index: number, item: SetItem): number {
    return item.id;
  }

  // --- Lectura de cada serie (mismo formato que la tabla del Planificador) ---

  public repsLabel(set: SetDraft): string {
    return formatRange(set.repsMin, set.repsMax);
  }

  public rirLabel(set: SetDraft): string {
    return formatRange(set.rirMin, set.rirMax);
  }

  public isFailure(set: SetDraft): boolean {
    return isFailure(set);
  }

  // --- Series una a una ("Serie objetivo") ---

  // Sin serie: añadir. El formulario sale con los valores de la última, y
  // cada "Añadir" deja otra igual sin cerrar el panel (como en el
  // Planificador).
  public openSet(item?: SetItem): void {
    const last = this.items[this.items.length - 1]?.set;
    let set: unknown;
    if (item) set = toManageSet(item.set, this.kind, `${SET_ID_PREFIX}${item.id}`);
    else if (last) set = toManageSet({ ...last, drop: false, restPause: null }, this.kind);

    // Ya abierto: carga esta serie en él en vez de apilar otro panel.
    if (this.setPanelLoader) {
      this.setPanelLoader(set);
      return;
    }
    if (this.ionicUtilService.isSidePanelOpening(ManageSetComponent)) return;

    void this.ionicUtilService
      .showNestedModal(
        {
          component: ManageSetComponent,
          componentProps: {
            set,
            isCardio: this.kind === 'cardio',
            isIsometric: this.kind === 'isometric',
            templateMode: true,
            onSetAdded: (result: unknown) => this.applySet(result),
            registerLoader: (load: (set?: unknown) => void) => (this.setPanelLoader = load),
          },
        },
        this.modal
      )
      .then((res) => {
        this.setPanelLoader = null;
        if (res?.data) this.applySet(res.data);
      });
  }

  // Lo que entrega "Serie objetivo": la serie editada (lleva su _id) o una
  // nueva al final.
  public applySet(result: any): void {
    const set = fromManageSet(result);
    const rawId = typeof result?._id === 'string' ? result._id : '';
    const id = rawId.startsWith(SET_ID_PREFIX) ? Number(rawId.slice(SET_ID_PREFIX.length)) : null;
    const existing = id !== null ? this.items.find((item) => item.id === id) : undefined;

    if (existing) {
      this.items = this.items.map((item) => (item === existing ? { id: item.id, set } : item));
      return;
    }
    const added = this.item(set);
    this.items = [...this.items, added];
    this.highlight(added.id);
  }

  public copySet(item: SetItem, event: Event): void {
    event.stopPropagation();
    const copy = this.item({ ...item.set });
    const next = [...this.items];
    next.splice(next.indexOf(item) + 1, 0, copy);
    this.items = next;
    this.highlight(copy.id);
  }

  public removeSet(item: SetItem, event: Event): void {
    event.stopPropagation();
    this.items = this.items.filter((other) => other !== item);
  }

  public onReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    this.items = event.detail.complete([...this.items]);
  }

  private highlight(id: number): void {
    this.highlightedId = id;
    clearTimeout(this.highlightTimer);
    this.highlightTimer = setTimeout(() => (this.highlightedId = null), 1600);
  }

  // --- Cerrar ---

  public save(): void {
    const result: TemplateExercisePanelResult = {
      sets: this.draftSets,
      notes: this.draftNotes.trim(),
    };
    void this.modalController.dismiss(result, 'save');
  }

  public async close(onStay?: () => void): Promise<void> {
    if (!this.isDirty) {
      void this.modalController.dismiss(null, 'cancel');
      return;
    }
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('COMMON.UNSAVED_CHANGES'),
      message: this.translate.instant('COMMON.UNSAVED_CHANGES_EXIT'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel', handler: () => onStay?.() },
        {
          text: this.translate.instant('COMMON.DISCARD'),
          cssClass: 'alert-button-danger',
          handler: () => void this.modalController.dismiss(null, 'cancel'),
        },
      ],
    });
  }
}
