import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';

@Component({
  selector: 'app-clipboard-meal-modal',
  templateUrl: './clipboard-meal-modal.component.html',
  styleUrls: ['./clipboard-meal-modal.component.scss'],
})
export class ClipboardMealModalComponent implements OnInit {
  @Input()
  public products: CustomProduct[] = [];

  @Input()
  public recipes: CustomRecipe[] = [];

  @Input()
  public selectedProductIds: string[] = [];

  @Input()
  public selectedRecipeIds: string[] = [];

  @Input()
  public mode: 'view' | 'paste' = 'view';

  public localSelectedProductIds = new Set<string>();
  public localSelectedRecipeIds = new Set<string>();

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    this.selectedProductIds.forEach((id) => this.localSelectedProductIds.add(id));
    this.selectedRecipeIds.forEach((id) => this.localSelectedRecipeIds.add(id));
  }

  public getRecipeName(recipe: CustomRecipe): string {
    const r = typeof recipe.recipe === 'object' ? recipe.recipe : null;
    return r?.name || '';
  }

  public get selectedCount(): number {
    return this.localSelectedProductIds.size + this.localSelectedRecipeIds.size;
  }

  public isProductSelected(id: string): boolean {
    return this.localSelectedProductIds.has(id);
  }

  public isRecipeSelected(id: string): boolean {
    return this.localSelectedRecipeIds.has(id);
  }

  public toggleProduct(id: string): void {
    if (this.localSelectedProductIds.has(id)) {
      this.localSelectedProductIds.delete(id);
    } else {
      this.localSelectedProductIds.add(id);
    }
  }

  public toggleRecipe(id: string): void {
    if (this.localSelectedRecipeIds.has(id)) {
      this.localSelectedRecipeIds.delete(id);
    } else {
      this.localSelectedRecipeIds.add(id);
    }
  }

  public dismiss(): void {
    this.modalController.dismiss(undefined, 'cancel');
  }

  public confirm(): void {
    this.modalController.dismiss(
      {
        selectedProductIds: Array.from(this.localSelectedProductIds),
        selectedRecipeIds: Array.from(this.localSelectedRecipeIds),
      },
      'confirm'
    );
  }
}
