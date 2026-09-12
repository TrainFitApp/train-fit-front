import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NutritionalGoal } from 'src/app/core/models/nutritional-goal';
import { NutritionalGoalService } from 'src/app/core/services/nutritional-goal/nutritional-goal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { NutritionEditorPage } from '../editor/components/nutrition-editor/nutrition-editor.page';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.page.html',
  styleUrls: ['./goal-list.page.scss'],
})
export class GoalListPage implements OnInit, OnDestroy {
  @ViewChild('goalNameInput') goalNameInput: ElementRef<HTMLInputElement>;

  public goals: NutritionalGoal[] = [];
  public activeGoalId: string | null = null;
  public isCreating: boolean = false;
  public newGoalName: string = '';
  public isLoading: boolean = true;

  private destroy$ = new Subject<void>();

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private translate: TranslateService,
    private nutritionalGoalService: NutritionalGoalService,
    private userService: UserService,
    private ionicUtilService: IonicUtilService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit() {
    const user = this.userService.getLocalUser;
    this.activeGoalId = user?.goalInUse || null;
    this.loadGoals();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadGoals() {
    this.isLoading = true;
    this.nutritionalGoalService.refreshFromServer()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (goals) => {
          this.activeGoalId = this.userService.getLocalUser?.goalInUse || null;
          this.goals = [...goals].sort((a, b) => {
            if (a._id === this.activeGoalId) return -1;
            if (b._id === this.activeGoalId) return 1;
            return 0;
          });
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.ionicUtilService.showToast({
            message: this.translate.instant('COMMON.ERROR'),
            duration: 2000,
            color: 'danger',
          });
        },
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async startCreateGoal() {
    if (this.hasReachedGoalLimit()) {
      await this.showGoalLimitAlert();
      return;
    }

    this.isCreating = true;
    this.newGoalName = '';
    setTimeout(() => {
      this.goalNameInput?.nativeElement?.focus();
    }, 100);
  }

  confirmCreateGoal() {
    const name = this.newGoalName.trim();
    if (!name) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('NUTRITION_GOALS.REQUIRED_FIELDS'),
        duration: 2000,
        color: 'warning',
      });
      return;
    }

    this.nutritionalGoalService.create({ name })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (goal) => {
          this.isCreating = false;
          this.newGoalName = '';
          this.openEditor(goal);
        },
        error: (error) => {
          if (this.isNutritionalGoalLimitError(error)) {
            this.isCreating = false;
            this.newGoalName = '';
            void this.showGoalLimitAlert();
            return;
          }

          void this.ionicUtilService.showToast({
            message: this.translate.instant('COMMON.ERROR'),
            duration: 2000,
            color: 'danger',
          });
        },
      });
  }

  cancelCreateGoal() {
    this.isCreating = false;
    this.newGoalName = '';
  }

  public isTrainerAssigned(goal: NutritionalGoal): boolean {
    return Boolean(goal.assignedByTrainerId);
  }

  async openEditor(goal: NutritionalGoal) {
    if (this.isTrainerAssigned(goal)) {
      await this.showTrainerAssignedAlert();
      return;
    }

    if (this.isGoalLocked(goal)) {
      await this.showLockedGoalAlert();
      return;
    }

    const modal = await this.ionicUtilService.showModal({
      component: NutritionEditorPage,
      componentProps: { goalId: goal._id },
      cssClass: 'fullscreen-modal',
    });
    if (modal?.data) {
      this.activeGoalId = this.userService.getLocalUser?.goalInUse || null;
    }
    this.loadGoals();
  }

  async deleteGoal(goal: NutritionalGoal, event: Event) {
    event.stopPropagation();

    if (this.isTrainerAssigned(goal)) {
      await this.showTrainerAssignedAlert();
      return;
    }

    if (this.goals.length <= 1) {
      const alert = await this.alertController.create({
        header: this.translate.instant('NUTRITION_GOALS.DELETE_HEADER'),
        message: this.translate.instant('NUTRITION_GOALS.MINIMUM_ONE_MSG'),
        cssClass: 'custom-alert',
        buttons: [{ text: this.translate.instant('COMMON.OK'), role: 'cancel' }],
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: this.translate.instant('NUTRITION_GOALS.DELETE_HEADER'),
      message: this.translate.instant('NUTRITION_GOALS.DELETE_MSG', { name: goal.name }),
      cssClass: 'custom-alert',
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.nutritionalGoalService.delete(goal._id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  this.activeGoalId = this.userService.getLocalUser?.goalInUse || null;
                  this.loadGoals();
                },
                error: () => {
                  this.loadGoals();
                  this.ionicUtilService.showToast({
                    message: this.translate.instant('COMMON.ERROR'),
                    duration: 2000,
                    color: 'danger',
                  });
                },
              });
          },
        },
      ],
    });
    await alert.present();
  }

  public getMacroPct(goal: NutritionalGoal, macro: 'p' | 'c' | 'f'): number {
    const kcalPerG = { p: 4, c: 4, f: 9 };
    const grams = {
      p: goal.proteinsGTotal || 0,
      c: goal.carbohydratesGTotal || 0,
      f: goal.fatGTotal || 0,
    };
    const total = grams.p * kcalPerG.p + grams.c * kcalPerG.c + grams.f * kcalPerG.f;
    if (total <= 0) return 0;
    return Math.round((grams[macro] * kcalPerG[macro] / total) * 100);
  }

  private get goalLimit(): number {
    return this.userService.getLocalUser?.premium?.entitled ? 10 : 1;
  }

  private hasReachedGoalLimit(): boolean {
    return this.goals.length >= this.goalLimit;
  }

  public isGoalLocked(goal: NutritionalGoal): boolean {
    if (this.userService.getLocalUser?.premium?.entitled) return false;
    if (this.goals.length <= this.goalLimit) return false;
    return goal._id !== this.getUnlockedFreeGoalId();
  }

  private getUnlockedFreeGoalId(): string | null {
    const activeGoalId = this.userService.getLocalUser?.goalInUse || this.activeGoalId;
    const activeGoal = this.goals.find((goal) => goal._id === activeGoalId);
    return activeGoal?._id || this.goals[0]?._id || null;
  }

  private isNutritionalGoalLimitError(error: any): boolean {
    return (
      error?.code === 'NUTRITIONAL_GOALS_LIMIT_REACHED' ||
      error?.error?.code === 'NUTRITIONAL_GOALS_LIMIT_REACHED'
    );
  }

  private async showGoalLimitAlert(): Promise<void> {
    const isPremium = Boolean(this.userService.getLocalUser?.premium?.entitled);
    if (!isPremium) {
      await this.ionicUtilService.showPremiumLimitAlert({
        message: this.translate.instant('NUTRITION_GOALS.LIMIT_REACHED_FREE'),
        onUpgrade: () => this.navigationService.goToPremium(),
      });
      return;
    }

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('PREMIUM.LIMIT_REACHED'),
      message: this.translate.instant('NUTRITION_GOALS.LIMIT_REACHED_PRO'),
      buttons: [
        {
          text: this.translate.instant('COMMON.OK'),
          role: 'cancel',
        },
      ],
    });
  }

  private async showLockedGoalAlert(): Promise<void> {
    await this.ionicUtilService.showPremiumLimitAlert({
      message: this.translate.instant('NUTRITION_GOALS.LOCKED_FREE'),
      onUpgrade: () => this.navigationService.goToPremium(),
    });
  }

  private async showTrainerAssignedAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translate.instant('NUTRITION_GOALS.TRAINER_ASSIGNED_ALERT_HEADER'),
      message: this.translate.instant('NUTRITION_GOALS.TRAINER_ASSIGNED_ALERT_MSG'),
      cssClass: 'custom-alert',
      buttons: [{ text: this.translate.instant('COMMON.OK'), role: 'cancel' }],
    });
    await alert.present();
  }
}
