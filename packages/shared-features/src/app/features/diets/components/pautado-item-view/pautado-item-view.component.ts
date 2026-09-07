import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

// Vista de solo lectura de un producto/receta pautados — el cliente puede
// mirar qué es y sus macros, pero no puede cambiar nada aquí (ni siquiera
// la cantidad: eso vive en la propia fila de la comida, con su control
// aparte). Deliberadamente NO reutiliza add-product/config-recipe (2000+
// líneas cada uno, pensados para editar composición) para no arrastrar
// aquí ni su superficie de edición ni su complejidad — solo hace falta
// nombre + cantidad pautada/consumida + macros.
@Component({
  selector: 'app-pautado-item-view',
  templateUrl: './pautado-item-view.component.html',
  styleUrls: ['./pautado-item-view.component.scss'],
})
export class PautadoItemViewComponent implements OnInit {
  @Input()
  public kind!: 'product' | 'recipe';

  @Input()
  public product?: CustomProduct;

  @Input()
  public recipeInstance?: CustomRecipe;

  public name = '';
  public quantity = 0;
  public assignedQuantity: number | null = null;
  public macros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

  constructor(
    private modalController: ModalController,
    private customProductService: CustomProductService,
    private recipeService: RecipeService
  ) {}

  public ngOnInit(): void {
    if (this.kind === 'product' && this.product) {
      this.name = this.product.product?.name || '';
      this.quantity = Number(this.product.quantity) || 0;
      this.assignedQuantity =
        this.product.assignedQuantity != null ? Number(this.product.assignedQuantity) : null;
      this.macros = this.customProductService.getMacros(this.product);
      return;
    }

    if (this.kind === 'recipe' && this.recipeInstance) {
      const recipe =
        typeof this.recipeInstance.recipe === 'object' ? this.recipeInstance.recipe : null;
      this.name = recipe?.name || '';
      this.quantity = Number(this.recipeInstance.quantity) || 0;
      this.assignedQuantity =
        this.recipeInstance.assignedQuantity != null
          ? Number(this.recipeInstance.assignedQuantity)
          : null;
      this.macros = recipe
        ? this.recipeService.calculateCustomRecipeTotals(recipe, this.recipeInstance).portionMacros
        : { kcal: 0, protein: 0, carbs: 0, fat: 0 };
      return;
    }
  }

  // Mismo criterio que el badge de la fila (meal.component.ts) — null o 0
  // de diferencia significa "sin tocar", el propio HTML lo oculta.
  public get delta(): number {
    if (this.assignedQuantity == null) return 0;
    return Math.round(this.quantity - this.assignedQuantity);
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
