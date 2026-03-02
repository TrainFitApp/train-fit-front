import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetButton, ActionSheetOptions } from '@ionic/angular';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import {
  ACTIONS_FAB,
  ACTIONS_FAB_TYPE,
  ACTIONS_FAB_TYPES,
  ACTIONS_FAB_VALUES,
} from '../../constants/actions-fab';
import { TABLE_MODE_TYPES } from '../../constants/table-mode';

@Component({
  selector: 'app-actions-fab',
  templateUrl: './actions-fab.component.html',
  styleUrls: ['./actions-fab.component.scss'],
})
export class ActionsFabComponent implements OnInit {
  @Input()
  public isFooterHidden!: boolean;
  @Input()
  public user!: User;
  @Input()
  public meal!: Meal;
  @Input()
  public dietDay!: DietDay;
  @Input()
  public tableInUse!: Table;
  @Input()
  public currentWorkoutMode!: boolean;

  // Permite ignorar el tableMode global en contextos específicos (p.ej. search-exercises)
  @Input()
  public disableTableMode: boolean = false;

  @Input()
  public loading!: boolean;
  @Input()
  public ignoreModalHide: boolean = false;

  @Output()
  public onClose = new EventEmitter<ACTIONS_FAB_TYPES>();

  public cancelMode!: boolean;
  public modalOpen: boolean = false;

  public tableMode!: TABLE_MODE_TYPES;
  public optionsFab!: ACTIONS_FAB_TYPE[];

  public ACTIONS_FAB_TYPES = ACTIONS_FAB_TYPES;
  public TABLE_MODE_TYPES = TABLE_MODE_TYPES;

  constructor(
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.initVariables();
  }

  private initVariables(): void {
    this.utilService.getTableMode.subscribe((res) => (this.tableMode = res));

    this.utilService.getCancelMode.subscribe(
      (resCancelMode) => (this.cancelMode = resCancelMode)
    );

    this.utilService.getModalOpen.subscribe(
      (isOpen) => (this.modalOpen = isOpen)
    );
  }

  private initOptions(): void {
    this.optionsFab = [...ACTIONS_FAB_VALUES];
    if (this.tableMode && !this.disableTableMode) {
      switch (this.tableMode) {
        case TABLE_MODE_TYPES.mesocycle:
          this.optionsFab = this.optionsFab.filter(
            (optionTemp) => optionTemp.id === ACTIONS_FAB_TYPES.cancelCopy
          );

          break;
        case TABLE_MODE_TYPES.summaryGeneral:
          this.optionsFab = this.optionsFab.filter(
            (optionTemp) =>
              (optionTemp.id === ACTIONS_FAB_TYPES.addMicrocycle &&
                this.currentWorkoutMode) ||
              (optionTemp.id === ACTIONS_FAB_TYPES.deleteMicrocycle &&
                this.currentWorkoutMode &&
                this.tableInUse?.splits?.length > 0)
          );
          break;

        case TABLE_MODE_TYPES.summaryWorkout:
          this.optionsFab = this.optionsFab.filter(
            (optionTemp) => optionTemp.id === ACTIONS_FAB_TYPES.addMicrocycle
          );
          break;
      }
    } else if (this.meal) {
      // Meal context: handled directly in actionFab
      this.optionsFab = this.optionsFab.filter(
        (optionTemp) => optionTemp.id === ACTIONS_FAB_TYPES.createProduct
      );
    }
    // Exercise context is handled directly in actionFab() without ActionSheet
  }

  public actionFab(): void {
    // Forzar acción directa si se desactiva tableMode desde el padre
    if (this.disableTableMode) {
      this.onClose.emit(
        this.meal
          ? ACTIONS_FAB_TYPES.createProduct
          : ACTIONS_FAB_TYPES.createExercise
      );
      return;
    }
    // Si estamos en contexto de meal (productos), mostrar opciones crear producto/receta
    if (this.meal) {
      this.presentMealActionSheet();
      return;
    }
    // Si no hay tableMode ni meal, es contexto de búsqueda de ejercicios
    if (!this.tableMode && !this.meal) {
      this.onClose.emit(ACTIONS_FAB_TYPES.createExercise);
      return;
    }

    this.initOptions();
    // Emit directly if there is only one option in this context
    if (this.optionsFab && this.optionsFab.length === 1) {
      this.onClose.emit(this.optionsFab[0].id);
      return;
    }

    this.presentActionsSheet();
  }

  private async presentMealActionSheet(): Promise<void> {
    const actionSheetOptions: ActionSheetOptions = {
      cssClass: 'create-action-sheet',
      mode: 'ios',
      buttons: [
        {
          text: 'Nuevo Producto',
          icon: 'nutrition-outline',
          data: ACTIONS_FAB_TYPES.createProduct,
          cssClass: 'action-sheet-product',
        },
        {
          text: 'Nueva Receta',
          icon: 'restaurant-outline',
          data: ACTIONS_FAB_TYPES.createRecipe,
          cssClass: 'action-sheet-recipe',
        },
      ],
    };

    const result = await this.ionicUtilService.showActionSheet(
      actionSheetOptions
    );
    if (result.data !== undefined) {
      this.onClose.emit(result.data);
    }
  }

  private presentActionsSheet(): void {
    const actionSheetButtons: ActionSheetButton[] = [];
    for (let i = 0; i < this.optionsFab.length; i++) {
      const actionSheetButton: ActionSheetButton = {
        text: this.optionsFab[i].value,
        icon: this.optionsFab[i].icon,
        data: this.optionsFab[i].id,
        role: this.optionsFab[i].role,
      };
      actionSheetButtons.push(actionSheetButton);
    }

    const actionSheetOptions: ActionSheetOptions = {
      header: 'OPCIONES',
      buttons: actionSheetButtons,
    };
    this.ionicUtilService
      .showActionSheet(actionSheetOptions)
      .then((res) => this.onClose.emit(res.data));
  }

  public cancelCancelMode(event: Event): void {
    event.stopImmediatePropagation();
    this.utilService.setCancelMode = false;
  }
}
