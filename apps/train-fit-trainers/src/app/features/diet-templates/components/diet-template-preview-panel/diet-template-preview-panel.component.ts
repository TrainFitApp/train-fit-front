import { AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { dietaryFlagUi } from '../../../../shared/utils/dietary-flag-ui.util';
import {
  DietTemplate,
  DietTemplateMenuPayload,
  MEAL_SLOTS,
  TemplateFoodItem,
} from '../../models/diet-template.model';
import { alternativeTotals, MacroTotals } from '../../utils/alternative-macros';

interface PreviewAlternative {
  label: string;
  items: TemplateFoodItem[];
  totals: MacroTotals | null;
}

interface PreviewMeal {
  slot: string;
  alternatives: PreviewAlternative[];
}

interface PreviewMenu {
  name: string;
  meals: PreviewMeal[];
  // Total del día con la misma regla que el perfil de la card
  // (diet-macro-profile.js): por comida, MEDIA de sus alternativas.
  totals: MacroTotals | null;
  // true cuando alguna comida tiene 2+ alternativas y el total es una media.
  averaged: boolean;
}

// Vista previa de solo lectura de una plantilla de la biblioteca: todos sus
// menús, con sus comidas, alternativas y alimentos, sin entrar al constructor.
// Usa el contenido que el listado ya trae poblado (mismo que alimenta el
// macroProfile de la card): no hace ninguna petición.
@Component({
  selector: 'app-diet-template-preview-panel',
  templateUrl: 'diet-template-preview-panel.component.html',
  styleUrls: ['diet-template-preview-panel.component.scss'],
})
export class DietTemplatePreviewPanelComponent implements OnChanges, AfterViewInit {
  private readonly translate = inject(TranslateService);

  @Input() public template: DietTemplate | null = null;
  // Aptitud efectiva (derivada ∪ forzada), la misma que pinta la card.
  @Input() public flags: string[] = [];
  @Output() public closed = new EventEmitter<void>();
  // Hueco a la derecha que otro panel ya ocupa (en "Empezar fase", el panel de
  // parámetros de 400px flota ENCIMA de la página): el panel se pega a él en
  // vez de quedar tapado. Solo aplica desde 768px; por debajo el otro es un
  // modal a pantalla completa.
  @Input() @HostBinding('style.--preview-right') public rightOffset: string | null = null;

  @ViewChild('closeButton') private closeButton?: ElementRef<HTMLButtonElement>;

  public menus: PreviewMenu[] = [];

  constructor(
    private customProductService: CustomProductService,
    private recipeService: RecipeService
  ) {}

  public ngOnChanges(): void {
    this.menus = (this.template?.menus || []).map((menu) => this.buildMenu(menu));
  }

  // El panel es aria-modal: el foco entra en él (y Esc lo cierra).
  public ngAfterViewInit(): void {
    this.closeButton?.nativeElement.focus();
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    this.closed.emit();
  }

  public get menuCount(): number {
    return this.template?.menus?.length || 0;
  }

  public get hasAnyFood(): boolean {
    return this.menus.some((menu) => menu.meals.length > 0);
  }

  public flagLabel(flag: string): string {
    return dietaryFlagUi(flag).label;
  }

  public flagIcon(flag: string): string {
    return dietaryFlagUi(flag).icon;
  }

  public itemLabel(item: TemplateFoodItem): string {
    return (item.recipeId ? item.recipeName : item.productName) || this.translate.instant('DIET_TEMPLATES.SIN_ALIMENTO');
  }

  // Misma numeración descendente que las cabeceras del editor de comida
  // (day-meal-editor-modal) y las celdas del constructor: "Opción 2" es la
  // misma aquí que allí.
  public alternativeLabel(alt: PreviewAlternative, index: number, total: number): string {
    return alt.label || this.translate.instant('DIET_TEMPLATES.OPCION_2', { p0: total - index });
  }

  private buildMenu(menu: DietTemplateMenuPayload): PreviewMenu {
    const meals: PreviewMeal[] = [];
    const day: MacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    let averaged = false;

    // Orden fijo del día, no el de guardado; las comidas sin alimentos no se
    // pintan (aquí solo se lee lo que hay).
    for (const slot of MEAL_SLOTS) {
      const payload = (menu.meals || []).find((meal) => meal.slot === slot);
      const alternatives = (payload?.alternatives || [])
        .map((alt) => this.buildAlternative(alt))
        .filter((alt) => alt.items.length);
      if (!alternatives.length) continue;

      meals.push({ slot, alternatives });
      if (alternatives.length > 1) averaged = true;
      for (const alt of alternatives) {
        if (!alt.totals) continue;
        day.kcal += alt.totals.kcal / alternatives.length;
        day.protein += alt.totals.protein / alternatives.length;
        day.carbs += alt.totals.carbs / alternatives.length;
        day.fat += alt.totals.fat / alternatives.length;
      }
    }

    return { name: menu.name, meals, totals: meals.length ? day : null, averaged };
  }

  // Payload poblado por autopopulate (cp.product / cr.recipe llegan como
  // documentos): mismo tratamiento que customProductsToItems /
  // customRecipesToItems del constructor, sin micros ni cache de edición.
  private buildAlternative(alt: any): PreviewAlternative {
    const items: TemplateFoodItem[] = [
      ...(Array.isArray(alt?.customProducts) ? alt.customProducts : [])
        .filter((cp: any) => cp?.product)
        .map((cp: any): TemplateFoodItem => {
          const macros = this.customProductService.getMacros(cp as CustomProduct);
          return {
            productId: typeof cp.product === 'string' ? cp.product : cp.product?._id,
            productName: cp.product?.name || this.translate.instant('DIET_TEMPLATES.ALIMENTO_GUARDADO'),
            quantity: cp.quantity,
            ...macros,
          };
        }),
      ...(Array.isArray(alt?.customRecipes) ? alt.customRecipes : [])
        .filter((cr: any) => cr?.recipe)
        .map((cr: any): TemplateFoodItem => {
          const macros = this.recipeService.calculateCustomRecipeTotals(
            cr.recipe,
            cr as CustomRecipe
          ).portionMacros;
          return {
            recipeId: typeof cr.recipe === 'string' ? cr.recipe : cr.recipe?._id,
            recipeName: cr.recipe?.name || this.translate.instant('DIET_TEMPLATES.RECETA_GUARDADA'),
            quantity: cr.quantity,
            kcal: macros.kcal,
            protein: macros.protein,
            carbs: macros.carbs,
            fat: macros.fat,
          };
        }),
    ];
    const label = (alt?.label || '').toString().trim();
    return { label, items, totals: alternativeTotals({ label, items }) };
  }
}
