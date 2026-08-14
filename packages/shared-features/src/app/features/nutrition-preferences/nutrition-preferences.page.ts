import { Component, OnInit } from '@angular/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  CooksAtHome,
  NutritionPreferences,
  STANDARD_MEAL_SLOTS,
  StandardMealSlot,
} from './models/nutrition-preferences.model';
import { NutritionPreferencesApiService } from './services/nutrition-preferences-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

@Component({
  selector: 'app-nutrition-preferences',
  templateUrl: 'nutrition-preferences.page.html',
  styleUrls: ['nutrition-preferences.page.scss'],
})
export class NutritionPreferencesPage implements OnInit {
  public state: ViewState = 'loading';
  public preferences: NutritionPreferences | null = null;
  public isSaving = false;

  public allergies = '';
  public favoriteFoods = '';
  public dislikedFoods = '';
  public cooksAtHome: CooksAtHome | null = null;

  // TASK-004 (MASTER_BACKLOG.md) — fix mínimo: qué slots de los 6 estándar
  // le aplican al cliente (ayuno intermitente, 4-5 tomas...) y cómo prefiere
  // llamarlos. Nota: esta preferencia todavía NO se aplica a la
  // renderización real de la dieta (diets.page.ts) — ver seguimiento en
  // MASTER_BACKLOG.md.
  public readonly mealSlots = STANDARD_MEAL_SLOTS;
  public disabledMealSlots: Record<StandardMealSlot, boolean> = this.emptyDisabledMap();
  public mealSlotLabels: Record<string, string> = {};

  private emptyDisabledMap(): Record<StandardMealSlot, boolean> {
    return STANDARD_MEAL_SLOTS.reduce((acc, slot) => ({ ...acc, [slot]: false }), {} as Record<StandardMealSlot, boolean>);
  }

  public toggleMealSlot(slot: StandardMealSlot): void {
    this.disabledMealSlots[slot] = !this.disabledMealSlots[slot];
  }

  constructor(
    private nutritionPreferencesApi: NutritionPreferencesApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.nutritionPreferencesApi.getMine().subscribe({
      next: (preferences) => {
        this.preferences = preferences;
        this.allergies = preferences?.allergies || '';
        this.favoriteFoods = preferences?.favoriteFoods || '';
        this.dislikedFoods = preferences?.dislikedFoods || '';
        this.cooksAtHome = preferences?.cooksAtHome || null;
        this.disabledMealSlots = this.emptyDisabledMap();
        (preferences?.disabledMealSlots || []).forEach((slot) => {
          if (slot in this.disabledMealSlots) this.disabledMealSlots[slot as StandardMealSlot] = true;
        });
        this.mealSlotLabels = { ...(preferences?.mealSlotLabels || {}) };
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public get wasRequested(): boolean {
    return !!this.preferences?.requestedAt && !this.preferences?.respondedAt;
  }

  public setCooksAtHome(value: CooksAtHome): void {
    this.cooksAtHome = value;
  }

  public submit(): void {
    if (this.isSaving) return;

    this.isSaving = true;
    this.nutritionPreferencesApi
      .updateMine({
        allergies: this.allergies.trim(),
        favoriteFoods: this.favoriteFoods.trim(),
        dislikedFoods: this.dislikedFoods.trim(),
        cooksAtHome: this.cooksAtHome,
        disabledMealSlots: this.mealSlots.filter((slot) => this.disabledMealSlots[slot]),
        mealSlotLabels: Object.fromEntries(
          Object.entries(this.mealSlotLabels).filter(([, label]) => (label || '').trim().length > 0)
        ),
      })
      .subscribe({
        next: (preferences) => {
          this.isSaving = false;
          this.preferences = preferences;
          this.ionicUtilService.showToast({
            message: 'Preferencias nutricionales guardadas',
            duration: 2500,
          });
        },
        error: (err) => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudieron guardar tus preferencias',
            'Error',
            3000
          );
        },
      });
  }
}
