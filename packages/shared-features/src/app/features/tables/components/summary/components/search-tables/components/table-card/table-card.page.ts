import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PopoverController, ModalController, ToastOptions } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';
import { BillingService } from 'src/app/core/services/billing/billing.service';

import { MUSCLE_GROUPS_ES } from 'src/app/shared/constants/muscle-groups';
import { DB_ES_EN_MAP } from 'src/app/shared/constants/db-translations/es-en-db.map';
import { EXERCISE_NAMES_ES_EN } from 'src/app/shared/constants/db-translations/exercise-names-es-en.map';
import { TablePreviewModalComponent } from '../table-preview-modal/table-preview-modal.component';

const TRANSLATE_DB_MAP: Record<string, string> = {
  ...DB_ES_EN_MAP,
  ...EXERCISE_NAMES_ES_EN,
};

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.page.html',
  styleUrls: ['./table-card.page.scss'],
})
export class TableCardPage {
  @Input()
  public tableCard: Table;
  @Input()
  public user: User;
  @Input()
  public own: boolean;
  @Input()
  public ownFilter: boolean;

  @Output()
  public duplicateTableEv = new EventEmitter<Table>();
  @Output()
  public deletedTable = new EventEmitter<string>();
  @Output()
  public loadingChange = new EventEmitter<boolean>();

  @ViewChild('bar', { static: false })
  public barChartRef: ElementRef;

  public loadAction: boolean = true;
  public progress: number = 0;
  public context: CanvasRenderingContext2D;
  public bar: Chart;

  @Input()
  public anyLoading: boolean = false;

  public MUSCLE_GROUPS = MUSCLE_GROUPS_ES;
  public isMenuOpen = false;
  public menuEvent?: Event;

  public get microcyclesCount(): number {
    if (typeof this.tableCard?.microcyclesCount === 'number') {
      return this.tableCard.microcyclesCount;
    }
    return this.tableCard?.splits?.length || 0;
  }

  public get workoutsCount(): number {
    if (typeof this.tableCard?.workoutsCount === 'number') {
      return this.tableCard.workoutsCount;
    }
    return this.tableCard?.splits?.[0]?.workouts?.length || 0;
  }

  // `own` es "¿la posees?" (propia/copiada), no "¿es la que está en uso?" —
  // son cosas distintas y hay que distinguirlas explícitamente.
  public get isActiveTable(): boolean {
    return this.tableCard?._id === this.tableService.getTableInUseId(this.user?.tableInUse);
  }

  public get hasBackgroundImage(): boolean {
    return this.getUsableBackgroundImageUrl() !== '';
  }

  public get backgroundImage(): string {
    const imageUrl = this.getUsableBackgroundImageUrl();
    return imageUrl ? `url(${imageUrl})` : 'none';
  }

  constructor(
    private userService: UserService,
    private tableService: TableService,
    private workoutService: WorkoutService,
    private ionicUtilService: IonicUtilService,
    private navigationService: NavigationService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private translate: TranslateService,
    private adMobService: AdMobService,
    private billingService: BillingService
  ) { }

  private getUsableBackgroundImageUrl(): string {
    const imageUrl = this.tableCard?.urlImage?.trim() || '';
    const normalizedImageUrl = imageUrl.replace(/^\/+/, '');

    if (!normalizedImageUrl) return '';
    if (normalizedImageUrl.startsWith('assets/img/tablas/')) return '';

    return imageUrl;
  }

  public async previewTable(): Promise<void> {
    if (!this.tableCard?._id) return;

    this.loadAction = false;
    this.loadingChange.emit(true);
    this.tableService.getTableById(this.tableCard._id).subscribe({
      next: async (fullTable) => {
        this.loadAction = true;
        this.loadingChange.emit(false);
        const isOwned = this.user.tables?.includes(fullTable._id) || fullTable.userId === this.user._id;
        const modal = await this.modalController.create({
          component: TablePreviewModalComponent,
          componentProps: {
            table: fullTable,
            own: isOwned,
            isActive: fullTable?._id === this.tableService.getTableInUseId(this.user?.tableInUse),
          },
          cssClass: 'table-preview-modal',
        });
        await modal.present();
        const { data, role } = await modal.onDidDismiss();
        if (role === 'confirm' && data?.action === 'use') {
          this.useTable();
        }
      },
      error: () => {
        this.loadAction = true;
        this.loadingChange.emit(false);
      },
    });
  }

  public openMenu(event: Event): void {
    event.stopPropagation();
    this.menuEvent = event;
    this.isMenuOpen = true;
  }

  public onMenuDidDismiss(): void {
    this.isMenuOpen = false;
    this.menuEvent = undefined;
  }

  public initChart() {
    const labels = this.MUSCLE_GROUPS;
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Ejercicios',
          data: [1, 2, 3, 4, 5, 6, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 2,
        },
      ],
    };

    if (this.bar) this.bar.destroy();

    this.context = (<HTMLCanvasElement>(
      this.barChartRef.nativeElement
    )).getContext('2d');

    this.bar = new Chart(this.context, {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  public useTable(): void {
    const activeId = this.tableService.getTableInUseId(this.user?.tableInUse);
    if (this.tableCard._id === activeId) {
      this.ionicUtilService.showWarningToast(
        this.translate.instant('TABLES.ROUTINE_ALREADY_IN_USE_TOAST')
      );
      return;
    }

    if (this.user.tableInUse) {
      const alOptions = {
        header: this.translate.instant('TABLES.ROUTINE_IN_USE'),
        message: this.translate.instant('TABLES.ROUTINE_IN_USE_MSG'),
        buttons: [
          {
            text: this.translate.instant('COMMON.CANCEL'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('COMMON.CONFIRM'),
            role: 'confirm',
            handler: () => this.showConfirmationDialog(),
          },
        ],
      };
      this.ionicUtilService.showAlert(alOptions);
    } else {
      this.showConfirmationDialog();
    }
  }

  private showConfirmationDialog(): void {
    const html = this.ownFilter
      ? this.translate.instant('TABLES.ROUTINE_CAN_PAUSE')
      : this.translate.instant('TABLES.ROUTINE_WILL_BE_ADDED');

    const alertOptions = {
       header: this.translate.instant('TABLES.USE_ROUTINE', { name: this.translateDbValue(this.tableCard.name) }),
       message: html,
       buttons: [
         {
           text: this.translate.instant('COMMON.CANCEL'),
           role: 'cancel',
           cssClass: 'alert-button-primary',
         },
         {
           text: this.translate.instant(this.ownFilter ? 'TABLES.START_ROUTINE' : 'TABLES.ACQUIRE_ROUTINE', { name: this.translateDbValue(this.tableCard.name) }),
           cssClass: 'alert-button-success',
           handler: () => {
            if (!this.user?.premium?.entitled) {
              this.adMobService
                .interstitial('acquire_routine')
                .catch((error) =>
                  console.error(
                    'Error mostrando interstitial acquire_routine:',
                    error
                  )
                );
            }

            this.loadAction = false;
            if (this.ownFilter) {
              this.user.tableInUse = this.tableCard._id;
              this.userService.updateUser(this.user).subscribe(() => {
                this.tableService
                  .getTableById(this.tableCard._id)
                  .subscribe((resTable) => {
                    this.tableService.setCurrentTable = resTable;
                    this.workoutService.setCurrentWorkout = undefined;
                    delete this.user.workoutInUse;
                    this.userService.updateUser(this.user).subscribe(() => {
                      this.navigationService.goToMesocycle();
                      this.loadAction = true;
                      const toastOptions: ToastOptions = {
                        message: this.translate.instant('TABLES.ROUTINE_STARTED_SUCCESS'),
                        duration: 2000,
                      };
                      this.ionicUtilService.showToast(toastOptions);
                    });
                  });
              });
            } else {
              this.tableService
                .copyTable(this.user._id, this.tableCard._id)
                .subscribe({
                  next: (resTable) => {
                    this.user.tableInUse = resTable._id;
                    if (!this.user.tables) this.user.tables = [];
                    this.user.tables.push(resTable._id);
                    this.tableService.setCurrentTable = resTable;
                    this.workoutService.setCurrentWorkout = undefined;
                    delete this.user.workoutInUse;
                    this.userService.updateUser(this.user).subscribe(() => {
                      this.navigationService.goToMesocycle();
                    });

                    this.loadAction = true;
                    void this.billingService.refreshBackendEntitlements();
                    const toastOptions: ToastOptions = {
                      message: this.translate.instant('TABLES.ROUTINE_ACQUIRED_SUCCESS'),
                      duration: 2000,
                    };
                    this.ionicUtilService.showToast(toastOptions);
                  },
                  error: (error) => this.handleRoutineLimitOrGenericError(error),
                });
            }
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public editTableName(): void {
    this.popoverController.dismiss();
    const alertOptions = {
      header: this.translate.instant('TABLES.EDIT_ROUTINE_NAME'),
      inputs: [
        {
          name: 'tableName',
          type: 'textarea' as 'textarea',
          value: this.tableCard.name,
          placeholder: this.translate.instant('TABLES.ROUTINE_NAME_PLACEHOLDER'),
          attributes: { maxlength: 100 },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: 'alert-button-primary',
          handler: (data) => {
            if (data.tableName.trim() === '') {
              this.ionicUtilService.showToast({
                message: this.translate.instant('TABLES.FIELD_NOT_EMPTY'),
                duration: 2000,
              });
              return false;
            }
            this.tableCard.name = data.tableName;
            this.tableService.updateTableName(this.tableCard).subscribe(() => {
              this.tableService.setCurrentTable = {
                ...this.tableService.tableInUse,
                name: data.tableName,
              };
              const toastOptions: ToastOptions = {
                message: this.translate.instant('TABLES.ROUTINE_NAME_UPDATED'),
                duration: 1000,
              };
              this.ionicUtilService.showToast(toastOptions);
            });
            return true;
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public duplicateTable(idTable: string, event: Event): void {
    this.popoverController.dismiss();
    event.stopPropagation();
    const alertOptions = {
      header: this.translate.instant('TABLES.DUPLICATE_ROUTINE', { name: this.translateDbValue(this.tableCard.name) }),
      message: this.translate.instant('TABLES.DUPLICATE_ROUTINE_MSG'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.loadAction = false;
            this.tableService
              .duplicateTable(this.user._id, idTable)
              .subscribe({
                next: (resTable) => {
                  this.duplicateTableEv.emit(resTable);
                  void this.billingService.refreshBackendEntitlements();
                  const toastOptions: ToastOptions = {
                    message: this.translate.instant('TABLES.ROUTINE_COPIED', { name: this.translateDbValue(this.tableCard.name) }),
                    duration: 1000,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                  this.loadAction = true;
                },
                error: (error) => this.handleRoutineLimitOrGenericError(error),
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private handleRoutineLimitOrGenericError(error: any): void {
    this.loadAction = true;

    if (
      error?.code === 'PREMIUM_LIMIT_ROUTINES' ||
      error?.error?.code === 'PREMIUM_LIMIT_ROUTINES'
    ) {
      void this.ionicUtilService.showPremiumLimitAlert({
        message: this.translate.instant('TABLES.ROUTINE_LIMIT_REACHED'),
        onUpgrade: () => this.navigationService.goToPremium(),
      });
      return;
    }

    this.ionicUtilService.showErrorToast(
      error,
      this.translate.instant('TABLES.ROUTINE_ACTION_ERROR'),
    );
  }

  public deleteTable(idTable: string, event: Event): void {
    this.popoverController.dismiss();
    event.stopPropagation();
    const message = this.user.tableInUse === idTable
      ? this.translate.instant('TABLES.DELETE_ROUTINE_IN_USE_MSG')
      : this.translate.instant('TABLES.DELETE_ROUTINE_MSG');

    const alertOptions = {
      header: this.translate.instant('TABLES.DELETE_ROUTINE', { name: this.translateDbValue(this.tableCard.name) }),
      message,
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('TABLES.DELETE_BTN'),
          role: 'destructive',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.loadAction = false;
            this.tableService
              .deleteTableById(this.user._id, idTable)
              .subscribe(() => {
                this.deletedTable.emit(idTable);
                void this.billingService.refreshBackendEntitlements();
                const toastOptions: ToastOptions = {
                  message: this.translate.instant('TABLES.ROUTINE_DELETED', { name: this.translateDbValue(this.tableCard.name) }),
                  duration: 1000,
                };
                this.ionicUtilService.showToast(toastOptions);
                this.loadAction = true;
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private translateDbValue(value: string): string {
    const currentLang = this.translate.currentLang || 'es';
    if (currentLang === 'en') {
      const translated = TRANSLATE_DB_MAP[value.trim()];
      if (translated) {
        return translated;
      }
    }
    return value;
  }
}
