import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DietDay } from 'src/app/core/models/dietDay';
import { User } from 'src/app/core/models/user';
import { NutritionalData } from 'src/app/shared/models/nutritional-data';

@Component({
  selector: 'app-nutritional-objectives',
  templateUrl: './nutritional-objectives.component.html',
  styleUrls: ['./nutritional-objectives.component.scss'],
})
export class NutritionalObjectivesComponent implements OnInit {
  @Input() dietDay: DietDay;
  @Input() user: User;

  public nutritionalData: NutritionalData = new NutritionalData();
  private modalCtrl = inject(ModalController);

  // Reference values (RDA/AI) in grams
  public references = {
    fiber: 30,
    sugar: 50,
    salt: 5,
    sodium: 2,
    cholesterol: 0.3,
    saturatedFat: 20,
    calcium: 1,
    iron: 0.018,
    magnesium: 0.4,
    phosphorus: 0.7,
    potassium: 3.5,
    zinc: 0.011,
    copper: 0.0009,
    manganese: 0.0023,
    selenium: 0.000055,
    iodine: 0.00015,
    vitaminA: 0.0009,
    vitaminD: 0.000015,
    vitaminE: 0.015,
    vitaminK: 0.00012,
    vitaminC: 0.09,
    vitaminB1: 0.0012,
    vitaminB2: 0.0013,
    vitaminB3: 0.016,
    vitaminB5: 0.005,
    vitaminB6: 0.0013,
    vitaminB9: 0.0004,
    vitaminB12: 0.0000024,
    biotin: 0.00003,
  };

  public animateBars = false;

  ngOnInit() {
    this.personalizeReferences();
    this.calculateNutritionalData();

    // Trigger animations after a short delay for smoothness
    setTimeout(() => {
      this.animateBars = true;
    }, 300);
  }

  private personalizeReferences() {
    if (!this.user || !this.user.kcalTotal) return;

    const kcal = this.user.kcalTotal;
    const isFemale = this.user.sex === 0; // SEX_TYPES.female = 0

    // 1. Fibra: 14g por cada 1000 kcal (Recomendación clínica estándar)
    this.references.fiber = parseFloat(((kcal / 1000) * 14).toFixed(1));

    // 2. Azúcar: Límite del 10% de la energía total (OMS)
    // 4 kcal por gramo de azúcar
    this.references.sugar = Math.round((kcal * 0.1) / 4);

    // 3. Grasas Saturadas: Límite del 10% de la energía total
    // 9 kcal por gramo de grasa
    this.references.saturatedFat = Math.round((kcal * 0.1) / 9);

    // 4. Hierro: Varía significativamente por sexo
    // Hombres: ~8mg | Mujeres fértiles: ~18mg
    this.references.iron = isFemale ? 0.018 : 0.008;

    // 5. Calcio: Aunque suele ser 1000mg, en adolescentes o +50 años sube a 1200mg
    // Por ahora lo dejamos en 1g (1000mg) como base sólida.
    this.references.calcium = 1;

    // 6. Colesterol: Límite estándar de 300mg
    this.references.cholesterol = 0.3;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  private calculateNutritionalData() {
    if (!this.dietDay) return;

    const data = new NutritionalData();

    this.dietDay.meals.forEach((meal) => {
      // 1. Productos directos en la comida
      if (meal.customProducts) {
        meal.customProducts.forEach((cp: any) => {
          this.appendNutrients(data, cp, cp.quantity);
        });
      }

      // 2. Instancias de recetas en la comida
      if (meal.customRecipeInstances) {
        meal.customRecipeInstances.forEach((instance: any) => {
          this.processRecipeInstance(data, instance);
        });
      }
    });

    this.nutritionalData = data;
  }

  private processRecipeInstance(data: NutritionalData, instance: any) {
    const dataRecipe =
      typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
    if (!dataRecipe) return;

    const recipe =
      typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
    if (!recipe || !recipe.customProducts) return;

    // Escala de la instancia: segun la logica de DietDayService, instance.quantity actua como multiplicador / 100
    const scaleFactor = instance.quantity / 100;

    // Mapear overrides
    const overridesMap = new Map();
    if (instance.customProductsOverrides) {
      instance.customProductsOverrides.forEach((override: any) => {
        const id =
          typeof override.customProductId === 'string'
            ? override.customProductId
            : (override.customProductId as any)?._id ||
              override.customProductId;
        overridesMap.set(id, override);
      });
    }

    // 2a. Ingredientes de la receta base (con sus cantidades escaladas)
    recipe.customProducts.forEach((cpData: any) => {
      const cpId = cpData._id;
      const override = overridesMap.get(cpId);
      if (override?.removed) return;

      const baseQuantity = override?.quantity ?? cpData.quantity;
      const scaledQuantity = baseQuantity * scaleFactor;

      this.appendNutrients(data, cpData, scaledQuantity);
    });

    // 2b. Productos adicionales en esta instancia
    if (instance.additionalCustomProducts) {
      instance.additionalCustomProducts.forEach((addCP: any) => {
        const scaledQuantity = (addCP.quantity || 0) * scaleFactor;
        this.appendNutrients(data, addCP, scaledQuantity);
      });
    }
  }

  private appendNutrients(
    target: NutritionalData,
    cpData: any,
    quantity: number
  ) {
    if (!quantity) return;
    const factor = quantity / 100;

    const getVal = (key: string) => {
      return cpData[key] ?? cpData.product?.[key] ?? 0;
    };

    // Macros
    target.energyKcal += getVal('energyKcal100g') * factor;
    target.protein += getVal('protein100g') * factor;
    target.carbohydrate += getVal('carbohydrates100g') * factor;
    target.fat += getVal('fat100g') * factor;

    // Basic nutrients
    target.fiber += getVal('fiber100g') * factor;
    target.sugar += getVal('sugars100g') * factor;
    target.salt += getVal('salt100g') * factor;
    target.saturatedFat += getVal('saturatedFat100g') * factor;
    target.sodium += getVal('sodium100g') * factor;
    target.cholesterol += getVal('cholesterol100g') * factor;
    target.transFat += getVal('transFat100g') * factor;
    target.omega3 += getVal('omega3100g') * factor;
    target.omega6 += getVal('omega6100g') * factor;
    target.omega9 += getVal('omega9100g') * factor;
    target.alcohol += getVal('alcohol100g') * factor;

    // Minerals
    target.calcium += getVal('calcium100g') * factor;
    target.iron += getVal('iron100g') * factor;
    target.magnesium += getVal('magnesium100g') * factor;
    target.phosphorus += getVal('phosphorus100g') * factor;
    target.potassium += getVal('potassium100g') * factor;
    target.zinc += getVal('zinc100g') * factor;
    target.copper += getVal('copper100g') * factor;
    target.manganese += getVal('manganese100g') * factor;
    target.selenium += getVal('selenium100g') * factor;
    target.iodine += getVal('iodine100g') * factor;

    // Vitamins
    target.vitaminA += getVal('vitaminA100g') * factor;
    target.vitaminD += getVal('vitaminD100g') * factor;
    target.vitaminE += getVal('vitaminE100g') * factor;
    target.vitaminK += getVal('vitaminK100g') * factor;
    target.vitaminC += getVal('vitaminC100g') * factor;
    target.vitaminB1 += getVal('vitaminB1100g') * factor;
    target.vitaminB2 += getVal('vitaminB2100g') * factor;
    target.vitaminB3 += getVal('vitaminB3100g') * factor;
    target.vitaminB5 += getVal('vitaminB5100g') * factor;
    target.vitaminB6 += getVal('vitaminB6100g') * factor;
    target.vitaminB9 += getVal('vitaminB9100g') * factor;
    target.vitaminB12 += getVal('vitaminB12100g') * factor;
    target.biotin += getVal('biotin100g') * factor;

    // Others
    target.caffeine += getVal('caffeine100g') * factor;
    target.taurine += getVal('taurine100g') * factor;
  }

  public getProgress(current: number, goal: number): number {
    if (!goal || goal <= 0) return 0;
    const progress = current / goal;
    return progress > 1 ? 1 : progress;
  }

  public getPercent(current: number, goal: number): number {
    if (!goal || goal <= 0) return 0;
    return (current / goal) * 100;
  }

  public getProgressClass(current: number, goal: number, type: string): string {
    if (!goal || goal <= 0) return 'primary';
    const percentage = (current / goal) * 100;

    if (type === 'limit') {
      return percentage > 100 ? 'danger' : 'primary';
    } else {
      return percentage >= 100 ? 'success' : 'primary';
    }
  }
}
