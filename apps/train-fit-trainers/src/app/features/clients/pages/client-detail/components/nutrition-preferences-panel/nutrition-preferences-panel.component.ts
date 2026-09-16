import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DIETARY_FLAG_UI } from '../../../../../../shared/utils/dietary-flag-ui.util';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { ClientNutritionPreferences } from '../../models/client-detail.model';

type CooksAtHome = 'yes' | 'no' | 'sometimes';
type DietaryFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';

// Debe coincidir con diet-days-util.js#MEALS del backend (es lo que valida
// el PUT). Un icono por comida: se reconoce antes que la etiqueta.
const MEAL_SLOTS: { key: string; icon: string }[] = [
  { key: 'Desayuno', icon: 'cafe-outline' },
  { key: 'Almuerzo', icon: 'sunny-outline' },
  { key: 'Comida', icon: 'restaurant-outline' },
  { key: 'Merienda', icon: 'ice-cream-outline' },
  { key: 'Cena', icon: 'moon-outline' },
  { key: 'Recena', icon: 'bed-outline' },
];

const COOKS_AT_HOME_OPTIONS: { value: CooksAtHome; label: string; icon: string }[] = [
  { value: 'yes', label: 'Sí', icon: 'home-outline' },
  { value: 'sometimes', label: 'A veces', icon: 'swap-horizontal-outline' },
  { value: 'no', label: 'No', icon: 'fast-food-outline' },
];

// Mismo icono y color por restricción que las cards de dieta y el cajón de
// sugerencias (DIETARY_FLAG_UI): lo que el profesional marca aquí es lo que
// luego filtra allí, y tiene que leerse como la misma cosa.
const DIETARY_FLAG_OPTIONS = (['vegan', 'vegetarian', 'lactoseFree', 'glutenFree'] as DietaryFlag[]).map(
  (key) => ({ key, ...DIETARY_FLAG_UI[key] })
);

/**
 * F29 — editor de preferencias nutricionales del cliente desde la ficha del
 * profesional (alergias, favoritos, restricciones, si cocina, comidas al
 * día). Sustituye a la hoja inferior que vivía inline en client-detail.
 *
 * Panel lateral derecho en escritorio (se rellena mirando el calendario y
 * las gráficas del tab Nutrición) y hoja inferior en móvil; ver
 * _panel-sheet.scss#tf-side-panel.
 */
@Component({
  selector: 'app-nutrition-preferences-panel',
  templateUrl: 'nutrition-preferences-panel.component.html',
  styleUrls: ['nutrition-preferences-panel.component.scss'],
})
export class NutritionPreferencesPanelComponent implements AfterViewInit, OnDestroy {
  @Input() public clientId = '';
  @Input() public preferences: ClientNutritionPreferences | null = null;
  @Output() public saved = new EventEmitter<ClientNutritionPreferences>();

  // El panel se traslada al body al montar (ngAfterViewInit), igual que
  // supplements-panel: dentro de la ficha, su position:fixed lo capturaba el
  // contain de ion-content, y las gráficas de Chart.js (canvas, con capa de
  // composición propia) se dibujaban POR ENCIMA del panel, que se veía
  // atravesado justo sobre ellas.
  @ViewChild('panelHost') private panelHost!: ElementRef<HTMLElement>;

  public readonly mealSlots = MEAL_SLOTS;
  public readonly cooksAtHomeOptions = COOKS_AT_HOME_OPTIONS;
  public readonly dietaryFlagOptions = DIETARY_FLAG_OPTIONS;

  public showPanel = false;
  public isSaving = false;

  public allergies = '';
  public favoriteFoods = '';
  public dislikedFoods = '';
  public cooksAtHome: CooksAtHome | null = null;
  public dietaryFlags = new Set<DietaryFlag>();
  public disabledMealSlots: Record<string, boolean> = {};
  public mealSlotLabels: Record<string, string> = {};

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  // Se mueve UNA vez y se queda ahí: Angular sigue gobernando la vista
  // (bindings, *ngIf, eventos) aunque el nodo cuelgue de otro padre.
  public ngAfterViewInit(): void {
    document.body.appendChild(this.panelHost.nativeElement);
  }

  // Ya no cuelga de la ficha, así que nadie lo retira por él al cambiar de
  // pestaña.
  public ngOnDestroy(): void {
    this.panelHost?.nativeElement?.remove();
  }

  public open(): void {
    const prefs = this.preferences;
    this.allergies = prefs?.allergies || '';
    this.favoriteFoods = prefs?.favoriteFoods || '';
    this.dislikedFoods = prefs?.dislikedFoods || '';
    this.cooksAtHome = prefs?.cooksAtHome ?? null;
    this.dietaryFlags = new Set((prefs?.dietaryFlags || []) as DietaryFlag[]);
    this.disabledMealSlots = Object.fromEntries(
      MEAL_SLOTS.map((slot) => [slot.key, !!prefs?.disabledMealSlots?.includes(slot.key)])
    );
    this.mealSlotLabels = { ...(prefs?.mealSlotLabels || {}) };
    this.showPanel = true;
  }

  public close(): void {
    if (this.isSaving) return;
    this.showPanel = false;
  }

  public setCooksAtHome(value: CooksAtHome): void {
    this.cooksAtHome = this.cooksAtHome === value ? null : value;
  }

  public toggleDietaryFlag(flag: DietaryFlag): void {
    if (this.dietaryFlags.has(flag)) this.dietaryFlags.delete(flag);
    else this.dietaryFlags.add(flag);
  }

  public toggleMealSlot(slot: string): void {
    this.disabledMealSlots[slot] = !this.disabledMealSlots[slot];
  }

  public get enabledMealSlotsCount(): number {
    return MEAL_SLOTS.filter((slot) => !this.disabledMealSlots[slot.key]).length;
  }

  public save(): void {
    if (this.isSaving) return;
    this.isSaving = true;
    this.clientDetailApi
      .updateNutritionPreferences(this.clientId, {
        allergies: this.allergies.trim(),
        favoriteFoods: this.favoriteFoods.trim(),
        dislikedFoods: this.dislikedFoods.trim(),
        cooksAtHome: this.cooksAtHome,
        dietaryFlags: [...this.dietaryFlags],
        disabledMealSlots: MEAL_SLOTS.map((slot) => slot.key).filter((key) => this.disabledMealSlots[key]),
        mealSlotLabels: Object.fromEntries(
          Object.entries(this.mealSlotLabels).filter(([, label]) => (label || '').trim().length > 0)
        ),
      })
      .subscribe({
        next: (preferences) => {
          this.isSaving = false;
          this.showPanel = false;
          this.saved.emit(preferences);
          this.ionicUtilService.showToast({
            message: 'Preferencias nutricionales guardadas',
            duration: 2500,
          });
        },
        error: (err) => {
          this.isSaving = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudieron guardar las preferencias',
            'Error',
            3000
          );
        },
      });
  }
}
