import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietTemplateApiService } from '../../services/diet-template-api.service';
import {
  DietTemplate,
  MEAL_SLOTS,
  TemplateDay,
  TemplateFoodItem,
  TemplateMeal,
} from '../../models/diet-template.model';
import {
  ProductSearchModalComponent,
  ProductSearchResult,
} from '../../../../shared/components/product-search-modal/product-search-modal.component';

type ViewState = 'loading' | 'error' | 'loaded';

// Replanteamiento MVP (nutrición) — constructor de la plantilla: días con sus
// 6 comidas fijas (mismo enum que DietDay real), cada comida con varios
// alimentos (mismo patrón multi-alimento que client-detail.page.ts#panel de
// pautar). Se guarda explícitamente (sin autosave) para no disparar un PUT
// por cada pulsación.
@Component({
  selector: 'app-diet-template-builder',
  templateUrl: 'diet-template-builder.page.html',
  styleUrls: ['diet-template-builder.page.scss'],
})
export class DietTemplateBuilderPage implements OnInit {
  public state: ViewState = 'loading';
  public templateId = '';
  public name = '';
  public days: TemplateDay[] = [];
  public expandedDayIndex: number | null = 0;
  public expandedMealKey: string | null = null;
  public isSaving = false;
  public readonly mealSlots = MEAL_SLOTS;
  public readonly maxDays = 14;
  public readonly maxFoodItemsPerMeal = 8;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dietTemplateApi: DietTemplateApiService,
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('id') || '';
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.dietTemplateApi.list().subscribe({
      next: (templates) => {
        const template = (templates || []).find((t) => t._id === this.templateId);
        if (!template) {
          this.state = 'error';
          return;
        }
        this.applyTemplate(template);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private applyTemplate(template: DietTemplate): void {
    this.name = template.name;
    this.days = (template.days || []).map((day: any) => ({
      dayLabel: day.dayLabel,
      meals: this.mealSlots.map((slot) => {
        const existing = (day.meals || []).find((m: any) => m.slot === slot);
        return { slot, items: this.customProductsToItems(existing?.customProducts) };
      }),
    }));
  }

  // El backend persiste cada alimento como "clipboard" (mismo formato que
  // customProducts en meal-schema.js), no como TemplateFoodItem — se
  // reconstruye la vista editable a partir de eso. No se guarda el nombre
  // real del producto (solo su _id), así que un alimento real reaparece
  // como "picked" con un nombre genérico en vez del nombre original.
  private customProductsToItems(customProducts: any[] | undefined): TemplateFoodItem[] {
    if (!Array.isArray(customProducts)) return [];
    return customProducts.map((cp) => {
      const item: TemplateFoodItem = {
        kcal: cp.energyKcal100g ?? null,
        proteinG: cp.protein100g ?? null,
        carbsG: cp.carbohydrates100g ?? null,
        fatG: cp.fat100g ?? null,
      };
      if (cp.product) {
        item.productId = typeof cp.product === 'string' ? cp.product : cp.product?._id;
        item.productName = 'Alimento guardado';
        item.quantity = cp.quantity;
      }
      return item;
    });
  }

  // Espejo de alternativeToCustomProducts en client-detail.page.ts — mismo
  // formato "clipboard" que ya acepta mealModel.pasteMeal (F12/F28), ahora
  // reutilizado por diet-template-controller.js#applyToClient.
  private itemsToCustomProducts(items: TemplateFoodItem[]): Record<string, unknown>[] {
    return items.map((item) => {
      const base = {
        energyKcal100g: item.kcal || 0,
        protein100g: item.proteinG || 0,
        carbohydrates100g: item.carbsG || 0,
        fat100g: item.fatG || 0,
      };
      if (item.productId) {
        return { ...base, product: item.productId, quantity: item.quantity || 100 };
      }
      return { ...base, quantity: 100 };
    });
  }

  public addDay(): void {
    if (this.days.length >= this.maxDays) return;
    this.days.push({
      dayLabel: `Día ${this.days.length + 1}`,
      meals: this.mealSlots.map((slot) => ({ slot, items: [] })),
    });
    this.expandedDayIndex = this.days.length - 1;
  }

  public removeDay(index: number): void {
    this.days.splice(index, 1);
    if (this.expandedDayIndex === index) this.expandedDayIndex = null;
  }

  public toggleDay(index: number): void {
    this.expandedDayIndex = this.expandedDayIndex === index ? null : index;
  }

  private mealKey(dayIndex: number, mealIndex: number): string {
    return `${dayIndex}:${mealIndex}`;
  }

  public isMealExpanded(dayIndex: number, mealIndex: number): boolean {
    return this.expandedMealKey === this.mealKey(dayIndex, mealIndex);
  }

  public toggleMeal(dayIndex: number, mealIndex: number): void {
    const key = this.mealKey(dayIndex, mealIndex);
    this.expandedMealKey = this.expandedMealKey === key ? null : key;
  }

  public mealSummary(meal: TemplateMeal): string {
    if (!meal.items.length) return 'Vacía';
    return `${meal.items.length} alimento${meal.items.length === 1 ? '' : 's'}`;
  }

  private emptyFoodItem(): TemplateFoodItem {
    return { kcal: null, proteinG: null, carbsG: null, fatG: null };
  }

  public addFoodItem(dayIndex: number, mealIndex: number): void {
    const meal = this.days[dayIndex].meals[mealIndex];
    if (meal.items.length >= this.maxFoodItemsPerMeal) return;
    meal.items.push(this.emptyFoodItem());
  }

  public removeFoodItem(dayIndex: number, mealIndex: number, itemIndex: number): void {
    this.days[dayIndex].meals[mealIndex].items.splice(itemIndex, 1);
  }

  public async openProductSearch(dayIndex: number, mealIndex: number, itemIndex: number): Promise<void> {
    const modal = await this.modalController.create({ component: ProductSearchModalComponent });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<ProductSearchResult>();
    if (role !== 'confirm' || !data) return;

    const item = this.days[dayIndex].meals[mealIndex].items[itemIndex];
    item.productId = data.product._id;
    item.productName = data.product.name;
    item.quantity = data.quantity;
    item.kcal = data.product.energyKcal100g || 0;
    item.proteinG = data.product.protein100g || 0;
    item.carbsG = data.product.carbohydrates100g || 0;
    item.fatG = data.product.fat100g || 0;
  }

  public clearProduct(dayIndex: number, mealIndex: number, itemIndex: number): void {
    const item = this.days[dayIndex].meals[mealIndex].items[itemIndex];
    item.productId = undefined;
    item.productName = undefined;
    item.quantity = undefined;
    item.kcal = null;
    item.proteinG = null;
    item.carbsG = null;
    item.fatG = null;
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public get canSave(): boolean {
    if (!this.name.trim()) return false;
    return this.days.every((day) =>
      day.meals.every((meal) => meal.items.every((item) => item.kcal !== null && item.kcal >= 0))
    );
  }

  public save(): void {
    if (!this.canSave || this.isSaving) return;
    this.isSaving = true;
    // Solo se envían las comidas con al menos un alimento — un slot vacío no
    // aporta nada al aplicar la plantilla (applyToClient lo saltaría igual).
    // Cada alimento se convierte a formato "clipboard" (customProducts) —
    // el que realmente espera el backend, no el TemplateFoodItem de la UI.
    const daysToSave = this.days.map((day) => ({
      dayLabel: day.dayLabel.trim() || 'Día',
      meals: day.meals
        .filter((meal) => meal.items.length > 0)
        .map((meal) => ({
          slot: meal.slot,
          customProducts: this.itemsToCustomProducts(meal.items),
          customRecipes: [],
        })),
    }));

    this.dietTemplateApi.update(this.templateId, this.name.trim(), daysToSave).subscribe({
      next: () => {
        this.isSaving = false;
        this.ionicUtilService.showToast({ message: 'Plantilla guardada', duration: 2000 });
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast('No se pudo guardar la plantilla', 'Error', 3000);
      },
    });
  }

  public goBack(): void {
    this.router.navigate(['/tabs/diet-templates']);
  }
}
