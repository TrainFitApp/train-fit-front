import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NutritionalGoal } from 'src/app/core/models/nutritional-goal';
import { NutritionalGoalService } from 'src/app/core/services/nutritional-goal/nutritional-goal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
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

  private destroy$ = new Subject<void>();

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private translate: TranslateService,
    private nutritionalGoalService: NutritionalGoalService,
    private userService: UserService,
    private ionicUtilService: IonicUtilService,
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
    this.nutritionalGoalService.refreshFromServer()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (goals) => {
          this.goals = [...goals].sort((a, b) => {
            if (a._id === this.activeGoalId) return -1;
            if (b._id === this.activeGoalId) return 1;
            return 0;
          });
        },
        error: () => {
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

  startCreateGoal() {
    this.isCreating = true;
    this.newGoalName = '';
    setTimeout(() => {
      this.goalNameInput?.nativeElement?.focus();
    }, 100);
  }

  confirmCreateGoal() {
    const name = this.newGoalName.trim();
    if (!name) return;

    this.nutritionalGoalService.create({ name })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (goal) => {
          this.isCreating = false;
          this.newGoalName = '';
          this.openEditor(goal);
        },
        error: () => {
          this.ionicUtilService.showToast({
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

  async openEditor(goal: NutritionalGoal) {
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
    const alert = await this.alertController.create({
      header: this.translate.instant('NUTRITION_GOALS.DELETE_HEADER'),
      message: this.translate.instant('NUTRITION_GOALS.DELETE_MSG', { name: goal.name }),
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
                  if (this.activeGoalId === goal._id) {
                    const user = this.userService.getLocalUser;
                    if (user) {
                      const updatedUser = { ...user, goalInUse: undefined };
                      this.userService.setLocalUser = updatedUser as any;
                      this.activeGoalId = null;
                    }
                  }
                  this.loadGoals();
                },
                error: () => {
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
}
