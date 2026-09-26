import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  COOKS_AT_HOME_OPTIONS,
  CooksAtHome,
  DIETARY_FLAG_OPTIONS,
  DietaryFlag,
  MEAL_SLOT_ICONS,
  NutritionPreferences,
  STANDARD_MEAL_SLOTS,
  StandardMealSlot,
} from './models/nutrition-preferences.model';
import { NutritionPreferencesApiService } from './services/nutrition-preferences-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

// Solo se entra desde el tab Coach (tarjeta del menú, "Pendiente de ti" y
// notificaciones antiguas), así que volver y guardar llevan siempre ahí.
const COACH_TAB_URL = '/tabs/coach';

@Component({
  selector: 'app-nutrition-preferences',
  templateUrl: 'nutrition-preferences.page.html',
  styleUrls: ['nutrition-preferences.page.scss'],
})
export class NutritionPreferencesPage implements OnInit {
  public state: ViewState = 'loading';
  public preferences: NutritionPreferences | null = null;
  public isSaving = false;

  public readonly dietaryFlagOptions = DIETARY_FLAG_OPTIONS;
  public readonly cooksAtHomeOptions = COOKS_AT_HOME_OPTIONS;
  public readonly mealSlotIcons = MEAL_SLOT_ICONS;

  public allergies = '';
  public favoriteFoods = '';
  public dislikedFoods = '';
  public cooksAtHome: CooksAtHome | null = null;
  public dietaryFlags = new Set<DietaryFlag>();

  // TASK-004 (MASTER_BACKLOG.md) — fix mínimo: qué slots de los 6 estándar
  // le aplican al cliente (ayuno intermitente, 4-5 tomas...). Nota: esta
  // preferencia todavía NO se aplica a la renderización real de la dieta
  // (diets.page.ts) — ver seguimiento en MASTER_BACKLOG.md.
  public readonly mealSlots = STANDARD_MEAL_SLOTS;
  public disabledMealSlots: Record<StandardMealSlot, boolean> = this.emptyDisabledMap();

  constructor(
    private nutritionPreferencesApi: NutritionPreferencesApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
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
        this.dietaryFlags = new Set(preferences?.dietaryFlags || []);
        this.disabledMealSlots = this.emptyDisabledMap();
        (preferences?.disabledMealSlots || []).forEach((slot) => {
          if (slot in this.disabledMealSlots) this.disabledMealSlots[slot as StandardMealSlot] = true;
        });
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Pendiente si se pidió después de la última respuesta: el intake y el
  // entrenador también dejan respondedAt puesto (ver request-status.js del back).
  public get wasRequested(): boolean {
    const prefs = this.preferences;
    if (!prefs?.requestedAt) return false;
    return !prefs.respondedAt || new Date(prefs.requestedAt) > new Date(prefs.respondedAt);
  }

  public get enabledMealSlotsCount(): number {
    return this.mealSlots.filter((slot) => !this.disabledMealSlots[slot]).length;
  }

  public close(): void {
    void this.router.navigateByUrl(COACH_TAB_URL);
  }

  public setCooksAtHome(value: CooksAtHome): void {
    this.cooksAtHome = value;
  }

  public toggleDietaryFlag(flag: DietaryFlag): void {
    if (this.dietaryFlags.has(flag)) this.dietaryFlags.delete(flag);
    else this.dietaryFlags.add(flag);
  }

  public toggleMealSlot(slot: StandardMealSlot): void {
    this.disabledMealSlots[slot] = !this.disabledMealSlots[slot];
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
        dietaryFlags: [...this.dietaryFlags],
        disabledMealSlots: this.mealSlots.filter((slot) => this.disabledMealSlots[slot]),
      })
      .subscribe({
        next: (preferences) => {
          this.isSaving = false;
          this.preferences = preferences;
          this.ionicUtilService.showToast({
            message: 'Preferencias nutricionales guardadas',
            duration: 2500,
          });
          this.close();
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

  private emptyDisabledMap(): Record<StandardMealSlot, boolean> {
    return STANDARD_MEAL_SLOTS.reduce((acc, slot) => ({ ...acc, [slot]: false }), {} as Record<StandardMealSlot, boolean>);
  }
}
