import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertButton,
  AlertInput,
  AlertOptions,
  Platform,
  ToastOptions,
} from '@ionic/angular';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { IProduct } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

export enum PRODUCT_ATRR {
  name = 0,
  brand = 1,
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit, OnDestroy {
  public product: IProduct;
  public customProduct: CustomProduct;
  public meal: Meal;
  public dietDay: DietDay;
  public isOwnProduct: boolean;
  public productQuantity: number;
  public isScanned: boolean;
  public isArchived: boolean;
  public isVerified: boolean;
  public selectedUnit: 'g' | 'portions' = 'g';
  public hasPortions: boolean = false;
  private returnUrl?: string;
  public ingredientMode = false;
  private targetMealName?: string;
  public editingIngredient = false;
  public recipeName?: string;

  public user: User;
  public addCustomProductForm: FormGroup;

  public getLocalUser$: Subscription;
  public addingFavProduct = false;

  public loading = { value: false };

  public PRODUCT_ATRR = PRODUCT_ATRR;

  // Getters para el resumen de macros dinámico

  /**
   * FIX selector ración/gramos: devuelve la cantidad efectiva en gramos
   * teniendo en cuenta si estamos en modo porciones o gramos.
   * Los getters totalCalories/Protein/Carbs/Fat usan esto para calcular correctamente.
   */
  get effectiveQuantity(): number {
    if (this.selectedUnit === 'portions' && this.hasPortions) {
      const portions = this.addCustomProductForm?.get('portions')?.value || 0;
      const servingQuantity =
        this.product?.servingQuantity ??
        this.customProduct?.product?.servingQuantity ??
        0;
      return (portions || 0) * servingQuantity;
    }
    return this.addCustomProductForm?.get('quantity')?.value || 0;
  }

  get totalCalories(): number {
    const kcal100g =
      this.addCustomProductForm?.get('energyKcal100g')?.value || 0;
    return Math.round((kcal100g * this.effectiveQuantity) / 100);
  }

  get totalProtein(): number {
    const protein100g =
      this.addCustomProductForm?.get('protein100g')?.value || 0;
    return Math.round(((protein100g * this.effectiveQuantity) / 100) * 10) / 10;
  }

  get totalCarbs(): number {
    const carbs100g =
      this.addCustomProductForm?.get('carbohydrates100g')?.value || 0;
    return Math.round(((carbs100g * this.effectiveQuantity) / 100) * 10) / 10;
  }

  get totalFat(): number {
    const fat100g = this.addCustomProductForm?.get('fat100g')?.value || 0;
    return Math.round(((fat100g * this.effectiveQuantity) / 100) * 10) / 10;
  }

  get isDietMode(): boolean {
    return !!this.meal || this.ingredientMode;
  }

  private backButtonSubscription: any;
  private destroy$ = new Subject<void>();

  // Inyección de servicios con Signals
  private readonly userService = inject(UserService);

  constructor(
    private navigationService: NavigationService,
    private dietDayService: DietDayService,
    private customProductService: CustomProductService,
    private ionicUtilService: IonicUtilService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private platform: Platform
  ) {
    // Effect para el usuario
    effect(() => {
      const resUser = this.userService.localUser();
      if (resUser) {
        this.user = resUser;
        this.checkIfArchived();
      }
    });
  }

  public ngOnInit(): void {
    this.user = this.userService.getLocalUser;

    // 1. Initial capture from state (fastest)
    const state: any = window.history.state || {};
    if (state.returnUrl)
      this.returnUrl = this.normalizeReturnUrl(state.returnUrl);
    if (state.ingredientMode) this.ingredientMode = state.ingredientMode;
    if (state.mealName) this.targetMealName = state.mealName;
    if (state.meal) {
      this.meal = state.meal;
      this.targetMealName = this.meal.name;
    }
    if (state.product) this.product = state.product;
    if (state.dietDay) this.dietDay = state.dietDay;
    if (state.customProduct) {
      this.customProduct = state.customProduct;
      this.editingIngredient = !!this.customProduct;
    }
    if (state.recipeName) {
      this.recipeName = state.recipeName;
    }

    if (this.ingredientMode && !this.recipeName) {
      const formState = this.navigationService.getTempData<any>(
        'configRecipeFormState'
      );
      this.recipeName = formState?.name;
    }

    // 2. Load from route (handles deep links/refreshes)
    this.loadParametersFromRoute();

    if (this.meal) this.existCustomProduct();
    this.syncOwnershipFromProduct();
    this.checkHasPortions();
    this.initForm();
    this.subsPortions();

    // 3. Link with shared diet day state for CUMULATIVE additions
    // We subscribe to the service to ensure that if we are adding A then B,
    // we have the latest version of the diet day before saving.
    this.dietDayService.getCurrentDietDay
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: DietDay) => {
        if (res && !this.ingredientMode) {
          console.log('[DEBUG] AddProduct: Syncing with service state');
          this.dietDay = res;

          const mName = this.targetMealName || this.meal?.name;
          if (mName) {
            const found = res.meals.find((m) => m.name === mName);
            if (found) {
              this.meal = found;
              this.existCustomProduct();
              // Re-init form if it's the first time we get valid data
              if (!this.addCustomProductForm && this.product) {
                this.initForm();
              }
            }
          }
        }
      });

    // Fallback init if data was synchronous
    if (this.product) {
      this.existCustomProduct();
      this.initForm();
    }

    this.checkIfArchived();
    this.checkVerified();
  }

  public get headerTitle(): string {
    if (this.ingredientMode && this.recipeName) {
      return this.recipeName;
    }

    return this.meal ? this.meal.name : 'Tus productos';
  }

  public ionViewWillEnter(): void {
    this.initializeBackButtonHandler();

    const state = this.navigationService.getState();
    console.log(
      '[AddProduct] ionViewWillEnter: state recibido:',
      state ? JSON.stringify(Object.keys(state)) : 'null'
    );

    // C-05 FIX: leer tempData 'updatedProductForAddProduct' (mecanismo sin push al historial)
    const updatedProductFromTemp = this.navigationService.getTempData<IProduct>(
      'updatedProductForAddProduct'
    );
    if (updatedProductFromTemp) {
      this.navigationService.clearTempData('updatedProductForAddProduct');

      if (this.meal && this.customProduct) {
        // CASO 1: El producto está en una meal → preguntar si actualizar los valores nutricionales
        // del customProduct con los del nuevo producto base (encapsulamiento independiente)
        this.ionicUtilService.showAlert({
          header: 'Producto actualizado',
          message:
            'Has modificado el producto original. ¿Quieres actualizar también los valores nutricionales de esta entrada en tu comida?',
          buttons: [
            {
              text: 'Mantener',
              role: 'cancel',
              handler: () => {
                // Mantener los valores del customProduct tal como están
                // Solo actualizamos la referencia del producto base
                this.product = updatedProductFromTemp;
                if (this.customProduct) {
                  this.customProduct.product = this.product;
                }
                this.checkIfArchived();
                this.checkVerified();
              },
            },
            {
              text: 'Actualizar',
              handler: () => {
                this.product = updatedProductFromTemp;
                if (this.meal) this.existCustomProduct();

                // Forzar actualización del customProduct con los nuevos valores nutricionales
                if (this.customProduct) {
                  this.customProduct.product = this.product;
                  this.customProductService.mapNutritionalValues(
                    this.product,
                    this.customProduct
                  );
                }

                this.checkHasPortions();
                this.initForm();
                this.checkIfArchived();
                this.checkVerified();
              },
            },
          ],
        });
      } else {
        // CASO 2: No hay meal (modo perfil) o no hay customProduct previo
        // Actualizar directamente para que los cambios sean visibles inmediatamente
        this.product = updatedProductFromTemp;
        if (this.meal) this.existCustomProduct();
        this.checkHasPortions();
        this.initForm();
        this.checkIfArchived();
        this.checkVerified();
      }
    }

    if (state && state.updatedProduct) {
      console.log(
        '[AddProduct] ionViewWillEnter: updatedProduct recibido:',
        state.updatedProduct?.name
      );
      if (this.meal && this.customProduct) {
        // Si estamos editando un CustomProduct existente, preguntamos si queremos actualizar con los nuevos valores del producto base
        this.ionicUtilService.showAlert({
          header: 'Producto actualizado',
          message:
            'Has modificado el producto original. ¿Quieres actualizar también los valores nutricionales de esta entrada en tu comida?',
          buttons: [
            {
              text: 'Mantener',
              role: 'cancel',
              handler: () => {
                // No hacemos nada, mantenemos los valores del customProduct
                // Pero actualizamos la referencia del producto base para futuras ediciones
                this.product = state.updatedProduct;
                if (this.customProduct) {
                  this.customProduct.product = this.product;
                }
                this.checkIfArchived();
                this.checkVerified();
              },
            },
            {
              text: 'Actualizar',
              handler: () => {
                this.product = state.updatedProduct;
                // Re-inicializar todo con el nuevo producto (esto reseteará los valores del formulario a los del producto)
                if (this.meal) this.existCustomProduct();

                // Forzamos actualización del customProduct con los nuevos valores del producto base
                if (this.customProduct) {
                  this.customProduct.product = this.product;
                  // Mapeamos los nuevos valores nutricionales del producto al customProduct
                  this.customProductService.mapNutritionalValues(
                    this.product,
                    this.customProduct
                  );
                }

                this.checkHasPortions();
                this.initForm();
                this.checkIfArchived();
                this.checkVerified();
              },
            },
          ],
        });
      } else {
        // En modo creación o sin customProduct previo, actualizamos directamente
        this.product = state.updatedProduct;
        if (this.meal) this.existCustomProduct();
        this.checkHasPortions();
        this.initForm();
        this.checkIfArchived();
        this.checkVerified();
      }

      // Limpiar el estado para evitar recargas accidentales posteriores
      this.navigationService.clearStateKeys(['updatedProduct']);
    }
  }

  private initializeBackButtonHandler(): void {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(9999, () => {
        this.goBack();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ionViewWillLeave(): void {
    if (this.getLocalUser$) this.getLocalUser$.unsubscribe();
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  public addCustomProduct(): void {
    // Special handling for ingredient mode - no API calls, just create locally
    if (this.ingredientMode) {
      let finalQuantity = this.addCustomProductForm.controls.quantity.value;
      if (this.selectedUnit === 'portions' && this.hasPortions) {
        const servingQuantity =
          this.product?.servingQuantity ||
          this.customProduct?.product?.servingQuantity ||
          0;
        const portions = this.addCustomProductForm.controls.portions.value || 0;
        finalQuantity = portions * servingQuantity;
      }

      const newCustomProduct = this.customProductService.composeCustomProduct(
        this.product,
        finalQuantity,
        0,
        this.isOwnProduct
      );

      // Copy all nutritional values and metadata from form to the custom product as overrides
      this.mapFormToProduct(this.addCustomProductForm.value, newCustomProduct);

      // Preserve ID if we are editing an existing ingredient
      if (this.customProduct && this.customProduct._id) {
        newCustomProduct._id = this.customProduct._id;
      }

      console.log(
        '[DEBUG] Created/updated ingredient locally:',
        newCustomProduct
      );

      // Store in temp data to pass back to config-recipe or search-foods
      this.navigationService.setTempData('newIngredient', newCustomProduct);

      // Navigate back
      this.goBack();
      return;
    }

    // Si no viene de profile
    if (this.meal) {
      // Si proviene de un customProduct ya añadido a la meal
      // Por tanto estamos ante un UDPATE
      if (this.customProduct) {
        this.loading = { value: true };

        let finalQuantity = this.addCustomProductForm.controls.quantity.value;
        if (this.selectedUnit === 'portions' && this.hasPortions) {
          const servingQuantity =
            this.product?.servingQuantity ||
            this.customProduct?.product?.servingQuantity ||
            0;
          const portions =
            this.addCustomProductForm.controls.portions.value || 0;
          finalQuantity = portions * servingQuantity;
        }

        this.customProduct.quantity = finalQuantity;
        this.mapFormToProduct(
          this.addCustomProductForm.value,
          this.customProduct
        );

        this.customProductService
          .updateCustomProduct(this.customProduct)
          .pipe(take(1))
          .subscribe((resCustomProduct) => {
            const index = this.meal.customProducts.findIndex(
              (customProductTemp) =>
                customProductTemp._id === resCustomProduct._id
            );
            if (index !== -1)
              this.meal.customProducts[index] = resCustomProduct;

            const indexMeal = this.dietDay.meals.findIndex(
              (mealTemp) => mealTemp._id === this.meal._id
            );
            this.dietDay.meals[indexMeal] = this.meal;
            this.dietDayService.setCurrentDietDay = this.dietDay;
            this.loading = { value: false };
            this.goBack();
          });
      }
      // CREATE
      else {
        let finalQuantity = this.addCustomProductForm.controls.quantity.value;
        if (this.selectedUnit === 'portions' && this.hasPortions) {
          const servingQuantity = this.product?.servingQuantity ?? 0;
          const portions =
            this.addCustomProductForm.controls.portions.value || 0;
          finalQuantity = portions * servingQuantity;
        }

        const newCustomProduct = this.customProductService.composeCustomProduct(
          this.product,
          finalQuantity,
          0,
          this.isOwnProduct
        );

        this.mapFormToProduct(
          this.addCustomProductForm.value,
          newCustomProduct
        );

        const idDietInUse = this.userService.getLocalUser.dietInUse;

        this.dietDayService
          .createCustomProduct(
            this.loading,
            this.dietDay,
            newCustomProduct,
            this.meal,
            idDietInUse
          )
          .subscribe(() => {
            this.goBack({ closeAll: true });
          });
      }
    }
    // Si viene de profile
    else {
      this.mapFormToProduct(this.addCustomProductForm.value, this.product);

      this.productService.updateProduct(this.product).subscribe(() => {
        const toastOptions: ToastOptions = {
          message: `¡${this.product.name} actualizado con éxito!`,
          duration: 2000,
          color: 'success',
        };
        this.ionicUtilService.showToast(toastOptions);

        this.goBack({ refresh: true });
      });
    }
  }

  public addFavoriteProduct(): void {
    this.addingFavProduct = true;
    this.productService
      .addFavoriteProduct(this.product._id, this.userService.getLocalUser._id)
      .subscribe((res) => {
        const isAdded = !!res; // If res is User, it was added; if it's Product, it might be the deleted state (depending on API)
        // Simplified: The backend returns the updated user if added, or the product if removed (or viceversa)
        // We check if it's in our local list to toggle
        const archivedIndex = this.user.archivedProducts.indexOf(
          this.product._id
        );

        if (archivedIndex === -1) {
          this.user.archivedProducts.push(this.product._id);
          this.ionicUtilService.showToast({
            message: this.product.name + ' archivado',
            duration: 1000,
          });
        } else {
          this.user.archivedProducts.splice(archivedIndex, 1);
          this.ionicUtilService.showToast({
            message: this.product.name + ' desarchivado',
            duration: 1000,
          });
        }

        this.userService.setLocalUser = this.user;
        this.addingFavProduct = false;
        this.checkIfArchived();
      });
  }

  public async goBack(params?: {
    closeAll?: boolean;
    refresh?: boolean;
    deleteOwnProduct?: string;
  }): Promise<void> {
    console.log('AddProductPage: goBack called', {
      params,
      returnUrl: this.returnUrl,
    });

    if (params?.closeAll) {
      const toastOptions: ToastOptions = {
        // B-02 FIX: usar optional chaining para evitar 'undefined' si this.meal es null
        message: 'Producto añadido a ' + (this.meal?.name || 'la comida'),
        duration: 1000,
      };
      this.ionicUtilService.showToast(toastOptions);
    }

    const result = params?.deleteOwnProduct
      ? { deleteOwnProduct: params.deleteOwnProduct }
      : params?.closeAll
      ? { createdViaAddProduct: true }
      : params?.refresh
      ? { refresh: true }
      : undefined;

    // Si venimos de Diets, hacer pop para evitar recargar y rehacer llamadas
    if (this.returnUrl === '/tabs/diets') {
      console.log('AddProductPage: returning to diets');
      this.navigationService.backNoAnim();
      return;
    }

    // Si el retorno es config-recipe, hacer pop
    if (this.returnUrl === '/search-foods/config-recipe') {
      console.log('AddProductPage: returning to config-recipe');
      this.navigationService.backNoAnim();
      return;
    }

    // Si el retorno es SearchFoods (o no hay returnUrl), hacer pop al SearchFoods previo
    if (this.returnUrl === '/search-foods') {
      console.log('AddProductPage: returning to search-foods');
      this.navigationService.backTo(['/search-foods'], {
        state: {
          ...(result || {}),
          ingredientMode: this.ingredientMode,
          // Devolver siempre el producto actualizado por si se ha editado
          updatedProduct: this.product,
        },
      });
    } else if (!this.returnUrl) {
      console.log('AddProductPage: no returnUrl, popping');
      this.navigationService.backNoAnim();
    } else {
      console.log('AddProductPage: returning to ' + this.returnUrl);
      // Para otros returnUrl, mantener comportamiento anterior con posible resultado
      this.navigationService.backTo(this.returnUrl, {
        state: result ? { result } : undefined,
      });
    }
  }

  public changeAtributtes(name: PRODUCT_ATRR): void {
    if (!this.meal) {
      const alertButtons: AlertButton[] = [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (res) =>
            this.addCustomProductForm.controls[
              name === PRODUCT_ATRR.name ? 'name' : 'brand'
            ].setValue(res.attribute),
        },
      ];
      const alertInputs: AlertInput[] = [
        {
          name: 'attribute',
          type: 'textarea',
          value: this.product[name === PRODUCT_ATRR.name ? 'name' : 'brand'],
          placeholder: `${name === PRODUCT_ATRR.name ? 'Nombre' : 'Marca'}`,
        },
      ];

      const alertOptions: AlertOptions = {
        header: `${name === PRODUCT_ATRR.name ? 'Nombre' : 'Marca'} producto`,
        inputs: alertInputs,
        buttons: alertButtons,
      };

      this.ionicUtilService.showAlert(alertOptions);

      // NO FUNCIONA PORQUE ESTA SUPERPUESTA POR ENCIMA DE VARIOS MODALES
      // const sweetAlertOptions = {
      //   text: `${name === PRODUCT_ATRR.name ? 'Nombre' : 'Marca'} de producto`,
      //   inputPlaceholder: `${name === PRODUCT_ATRR.name ? 'nombre' : 'marca'}`,
      //   icon: 'question',
      //   input: 'textarea',
      //   inputValue:
      //     name === PRODUCT_ATRR.name ? this.product.name : this.product.brand,
      //   showCancelButton: true,
      //   showConfirmButton: true,
      //   confirmButtonText: 'GUARDAR',
      //   confirmButtonColor: 'var(--ion-color-primary)',
      //   cancelButtonText: 'CANCELAR',
      // };
      // this.utilService
      //   .showSweetAlert(sweetAlertOptions)
      //   .then((res) => {
      //     if (res.isConfirmed) {
      //       this.ownProductService
      //         .updateOwnProduct({
      //           ...this.product,
      //           [res.value === PRODUCT_ATRR.name
      //             ? 'nombre' : 'marca']: res.value,
      //         })
      //         .subscribe();
      //     }
      //   });
    }
  }

  private checkHasPortions(): void {
    const servingQuantity =
      this.product?.servingQuantity ??
      this.customProduct?.product?.servingQuantity;
    this.hasPortions = !!servingQuantity && servingQuantity > 0;
  }

  private subsPortions(): void {
    if (!this.addCustomProductForm) return;

    // Porciones → gramos: actualizar 'quantity' para que el backend/guardado reciba gramos
    // Se emite el evento para que Angular detecte el cambio y los getters de macros se recalculen
    this.addCustomProductForm.controls.portions.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (this.selectedUnit === 'portions' && this.hasPortions) {
          const servingQuantity =
            this.product?.servingQuantity ??
            this.customProduct?.product?.servingQuantity ??
            0;
          const finalQuantity = Math.round((val || 0) * servingQuantity);
          // FIX: sin 'emitEvent: false' para que Angular actualice los getters del template
          this.addCustomProductForm.controls.quantity.setValue(finalQuantity, {
            emitEvent: false, // mantener false pero los getters ahora leen 'portions' directamente
          });
        }
      });

    // Gramos → porciones: actualizar contador de raciones (UI bidireccional)
    this.addCustomProductForm.controls.quantity.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (this.selectedUnit === 'g' && this.hasPortions) {
          const servingQuantity =
            this.product?.servingQuantity ??
            this.customProduct?.product?.servingQuantity ??
            0;
          if (servingQuantity > 0) {
            const finalPortions =
              Math.round((val / servingQuantity) * 100) / 100;
            this.addCustomProductForm.controls.portions.setValue(
              finalPortions,
              { emitEvent: false }
            );
          }
        }
      });
  }

  public changeUnit(unit: 'g' | 'portions'): void {
    this.selectedUnit = unit;

    if (!this.addCustomProductForm) return;

    const quantityControl = this.addCustomProductForm.controls.quantity;
    const portionsControl = this.addCustomProductForm.controls.portions;

    if (unit === 'portions') {
      // En modo porciones: raciones es obligatorio, gramos no
      quantityControl.clearValidators();
      quantityControl.setErrors(null);
      portionsControl.setValidators([
        Validators.required,
        Validators.min(0.01),
      ]);
    } else {
      // En modo gramos: gramos es obligatorio, raciones no
      quantityControl.setValidators(
        this.meal || this.ingredientMode ? [Validators.required] : []
      );
      portionsControl.clearValidators();
      portionsControl.setErrors(null);
    }

    quantityControl.updateValueAndValidity();
    portionsControl.updateValueAndValidity();
  }

  private mapFormToProduct(formValues: any, target: any): void {
    // Unidades macro y básicas
    target.name = formValues.name;
    target.brand = formValues.brand;
    target.energyKcal100g = formValues.energyKcal100g;
    target.protein100g = formValues.protein100g;
    target.carbohydrates100g = formValues.carbohydrates100g;
    target.fat100g = formValues.fat100g;
    target.saturatedFat100g = formValues.saturatedFat100g;
    target.sugars100g = formValues.sugars100g;
    target.fiber100g = formValues.fiber100g;

    // Minerales (mg -> g)
    target.calcium100g = formValues.calcium100g
      ? formValues.calcium100g / 1000
      : null;
    target.iron100g = formValues.iron100g ? formValues.iron100g / 1000 : null;
    target.magnesium100g = formValues.magnesium100g
      ? formValues.magnesium100g / 1000
      : null;
    target.phosphorus100g = formValues.phosphorus100g
      ? formValues.phosphorus100g / 1000
      : null;
    target.potassium100g = formValues.potassium100g
      ? formValues.potassium100g / 1000
      : null;
    target.zinc100g = formValues.zinc100g ? formValues.zinc100g / 1000 : null;
    target.copper100g = formValues.copper100g
      ? formValues.copper100g / 1000
      : null;
    target.manganese100g = formValues.manganese100g
      ? formValues.manganese100g / 1000
      : null;
    target.sodium100g = formValues.sodium100g
      ? formValues.sodium100g / 1000
      : null;
    target.salt100g = formValues.salt100g;

    // µg -> g
    target.selenium100g = formValues.selenium100g
      ? formValues.selenium100g / 1000000
      : null;
    target.iodine100g = formValues.iodine100g
      ? formValues.iodine100g / 1000000
      : null;

    // Vitaminas
    target.vitaminA100g = formValues.vitaminA100g
      ? formValues.vitaminA100g / 1000000
      : null;
    target.vitaminD100g = formValues.vitaminD100g
      ? formValues.vitaminD100g / 1000000
      : null;
    target.vitaminE100g = formValues.vitaminE100g
      ? formValues.vitaminE100g / 1000
      : null;
    target.vitaminK100g = formValues.vitaminK100g
      ? formValues.vitaminK100g / 1000000
      : null;
    target.vitaminC100g = formValues.vitaminC100g
      ? formValues.vitaminC100g / 1000
      : null;
    target.vitaminB1100g = formValues.vitaminB1100g
      ? formValues.vitaminB1100g / 1000
      : null;
    target.vitaminB2100g = formValues.vitaminB2100g
      ? formValues.vitaminB2100g / 1000
      : null;
    target.vitaminB3100g = formValues.vitaminB3100g
      ? formValues.vitaminB3100g / 1000
      : null;
    target.vitaminB5100g = formValues.vitaminB5100g
      ? formValues.vitaminB5100g / 1000
      : null;
    target.vitaminB6100g = formValues.vitaminB6100g
      ? formValues.vitaminB6100g / 1000
      : null;
    target.vitaminB9100g = formValues.vitaminB9100g
      ? formValues.vitaminB9100g / 1000000
      : null;
    target.vitaminB12100g = formValues.vitaminB12100g
      ? formValues.vitaminB12100g / 1000000
      : null;
    target.biotin100g = formValues.biotin100g
      ? formValues.biotin100g / 1000000
      : null;

    // Otros
    target.cholesterol100g = formValues.cholesterol100g
      ? formValues.cholesterol100g / 1000
      : null;
    target.transFat100g = formValues.transFat100g;
    target.omega3100g = formValues.omega3100g;
    target.omega6100g = formValues.omega6100g;
    target.omega9100g = formValues.omega9100g;
    target.caffeine100g = formValues.caffeine100g
      ? formValues.caffeine100g / 1000
      : null;
    target.taurine100g = formValues.taurine100g
      ? formValues.taurine100g / 1000
      : null;
    target.alcohol100g = formValues.alcohol100g;

    // Textos (Convertir string a array)
    const splitText = (text: any) =>
      typeof text === 'string'
        ? text
            .split(',')
            .map((i) => i.trim())
            .filter((i) => i.length > 0)
        : text;

    if (target.product) {
      target.product.ingredients = formValues.ingredients;
      target.product.allergens = splitText(formValues.allergens);
      target.product.traces = splitText(formValues.traces);
    } else {
      target.ingredients = formValues.ingredients;
      target.allergens = splitText(formValues.allergens);
      target.traces = splitText(formValues.traces);
    }
  }

  public goToEditProduct(): void {
    if (this.isOwnProduct) {
      this.navigationService.goToCreateProduct({
        queryParams: {
          product: JSON.stringify(this.product),
          isEditMode: true,
          returnUrl: '/search-foods/add-product',
        },
        state: {
          product: this.product,
          isEditMode: true,
          returnUrl: '/search-foods/add-product',
          user: this.user,
        },
      });
    }
  }

  public deleteOwnProduct(): void {
    if (this.isOwnProduct) {
      const productName = this.product
        ? this.product.name
        : this.customProduct.product.name;
      const alertOptions: AlertOptions = {
        header: 'Eliminar producto',
        message: `¿Estás seguro de que quieres eliminar ${productName}? Este producto se eliminará permanentemente y de todas tus comidas.`,
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
          },
          {
            text: 'ELIMINAR',
            role: 'destructive',
            handler: () => {
              this.productService
                .deleteProduct(this.product._id)
                .subscribe(() => {
                  // Eliminar de archivedProducts si estaba
                  const archivedIndex = this.user.archivedProducts.indexOf(
                    this.product._id
                  );
                  if (archivedIndex > -1) {
                    this.user.archivedProducts.splice(archivedIndex, 1);
                  }

                  this.userService.setLocalUser = this.user;

                  // Eliminar referencias locales en TODAS las meals/recetas del dietDay
                  if (this.dietDay && this.dietDay.meals) {
                    let shouldUpdateDietDay = false;
                    this.dietDay.meals.forEach((m) => {
                      const mealTemp: any = m;

                      if (m.customProducts) {
                        const originalLength = m.customProducts.length;
                        m.customProducts = m.customProducts.filter(
                          (cp) => cp.product?._id !== this.product._id
                        );
                        if (m.customProducts.length !== originalLength) {
                          shouldUpdateDietDay = true;
                          // Si es la meal actual que estamos editando, actualizar la referencia local
                          if (this.meal && this.meal._id === m._id) {
                            this.meal = m;
                          }
                        }
                      }

                      if (mealTemp.customRecipeInstances?.length) {
                        mealTemp.customRecipeInstances.forEach(
                          (instance: any) => {
                            if (!instance) return;

                            if (
                              Array.isArray(instance.additionalCustomProducts)
                            ) {
                              const originalAdditionalLen =
                                instance.additionalCustomProducts.length;
                              instance.additionalCustomProducts =
                                instance.additionalCustomProducts.filter(
                                  (addCp: any) => {
                                    const addProductId =
                                      typeof addCp?.product === 'string'
                                        ? addCp.product
                                        : addCp?.product?._id;
                                    return addProductId !== this.product._id;
                                  }
                                );
                              if (
                                instance.additionalCustomProducts.length !==
                                originalAdditionalLen
                              ) {
                                shouldUpdateDietDay = true;
                              }
                            }

                            const dataRecipe =
                              typeof instance.dataRecipe === 'object'
                                ? instance.dataRecipe
                                : null;
                            const recipe =
                              dataRecipe &&
                              typeof dataRecipe.recipe === 'object'
                                ? dataRecipe.recipe
                                : null;

                            if (
                              recipe &&
                              Array.isArray(recipe.customProducts)
                            ) {
                              const removedCustomProductIds = new Set<string>();
                              const originalRecipeCpLen =
                                recipe.customProducts.length;

                              recipe.customProducts =
                                recipe.customProducts.filter((cp: any) => {
                                  const cpProductId =
                                    typeof cp?.product === 'string'
                                      ? cp.product
                                      : cp?.product?._id;
                                  const keep = cpProductId !== this.product._id;
                                  if (!keep && cp?._id) {
                                    removedCustomProductIds.add(
                                      cp._id.toString()
                                    );
                                  }
                                  return keep;
                                });

                              if (
                                recipe.customProducts.length !==
                                originalRecipeCpLen
                              ) {
                                shouldUpdateDietDay = true;
                              }

                              if (
                                removedCustomProductIds.size > 0 &&
                                Array.isArray(instance.customProductsOverrides)
                              ) {
                                const originalOverridesLen =
                                  instance.customProductsOverrides.length;
                                instance.customProductsOverrides =
                                  instance.customProductsOverrides.filter(
                                    (override: any) => {
                                      const overrideId =
                                        typeof override?.customProductId ===
                                        'string'
                                          ? override.customProductId
                                          : override?.customProductId?._id;
                                      return !removedCustomProductIds.has(
                                        (overrideId || '').toString()
                                      );
                                    }
                                  );
                                if (
                                  instance.customProductsOverrides.length !==
                                  originalOverridesLen
                                ) {
                                  shouldUpdateDietDay = true;
                                }
                              }
                            }
                          }
                        );
                      }
                    });

                    if (shouldUpdateDietDay) {
                      this.dietDayService.setCurrentDietDay = this.dietDay;
                    }
                  }

                  const toastOptions: ToastOptions = {
                    message: `${this.product.name} eliminado con éxito`,
                    duration: 1000,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                  this.goBack({ deleteOwnProduct: this.product._id });
                });
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    }
  }

  private checkIfArchived(): void {
    if (!this.user || !this.product) return;
    this.isArchived =
      this.user.archivedProducts?.includes(this.product._id) || false;
  }

  private checkVerified(): void {
    this.isVerified =
      this.product?.verified ?? this.customProduct?.product?.verified;
  }

  private existCustomProduct(): void {
    this.customProduct = this.meal?.customProducts.find(
      (customProductTemp) => customProductTemp.product?._id === this.product._id
    );
  }

  private initVariables(): void {
    // Ya gestionado por effect en el constructor
  }

  private initForm(): void {
    const quantity = this.customProduct
      ? this.customProduct.quantity
      : this.productQuantity;

    // Si el producto tiene raciones y es una entrada nueva, preseleccionamos 'raciones'
    if (this.hasPortions && !quantity) {
      this.selectedUnit = 'portions';
    }

    // Redondear kilocalorías sin decimales
    const energyKcal =
      this.customProduct?.energyKcal100g ?? this.product.energyKcal100g;
    const roundedEnergyKcal = energyKcal ? Math.round(energyKcal) : energyKcal;

    // Redondear macronutrientes con máximo 1 decimal
    const protein = this.customProduct?.protein100g ?? this.product.protein100g;
    const roundedProtein = protein ? Math.round(protein * 10) / 10 : protein;

    const carbohydrates =
      this.customProduct?.carbohydrates100g ?? this.product.carbohydrates100g;
    const roundedCarbohydrates = carbohydrates
      ? Math.round(carbohydrates * 10) / 10
      : carbohydrates;

    const fat = this.customProduct?.fat100g ?? this.product.fat100g;
    const roundedFat = fat ? Math.round(fat * 10) / 10 : fat;

    const saturatedFat =
      this.customProduct?.saturatedFat100g ?? this.product.saturatedFat100g;
    const roundedSaturatedFat = saturatedFat
      ? Math.round(saturatedFat * 10) / 10
      : saturatedFat;

    const sugars =
      this.customProduct?.sugars100g ??
      (this.product as any).sugars100g ??
      this.product.sugars100g;
    const roundedSugars = sugars ? Math.round(sugars * 10) / 10 : sugars;

    const fiber = this.customProduct?.fiber100g ?? this.product.fiber100g;
    const roundedFiber = fiber ? Math.round(fiber * 10) / 10 : fiber;

    // Minerales
    this.addCustomProductForm = new FormGroup({
      name: new FormControl(this.product.name, Validators.required),
      brand: new FormControl(this.product.brand),
      quantity: new FormControl(
        quantity,
        this.meal || this.ingredientMode ? Validators.required : null
      ),
      portions: new FormControl(
        this.hasPortions && quantity
          ? quantity / (this.product.servingQuantity || 1)
          : 1
      ),
      energyKcal100g: new FormControl(roundedEnergyKcal, Validators.required),
      protein100g: new FormControl(roundedProtein, [
        Validators.required,
        Validators.min(0),
      ]),
      carbohydrates100g: new FormControl(roundedCarbohydrates, [
        Validators.required,
        Validators.min(0),
      ]),
      fat100g: new FormControl(roundedFat, [
        Validators.required,
        Validators.min(0),
      ]),
      saturatedFat100g: new FormControl(roundedSaturatedFat, [
        Validators.min(0),
      ]),
      sugars100g: new FormControl(roundedSugars, [Validators.min(0)]),
      fiber100g: new FormControl(roundedFiber, [Validators.min(0)]),

      // Minerales (Cargar convirtiendo a unidades de visualización)
      calcium100g: new FormControl(
        this.product.calcium100g
          ? parseFloat((this.product.calcium100g * 1000).toFixed(1))
          : undefined
      ),
      iron100g: new FormControl(
        this.product.iron100g
          ? parseFloat((this.product.iron100g * 1000).toFixed(1))
          : undefined
      ),
      magnesium100g: new FormControl(
        this.product.magnesium100g
          ? parseFloat((this.product.magnesium100g * 1000).toFixed(1))
          : undefined
      ),
      phosphorus100g: new FormControl(
        this.product.phosphorus100g
          ? parseFloat((this.product.phosphorus100g * 1000).toFixed(1))
          : undefined
      ),
      potassium100g: new FormControl(
        this.product.potassium100g
          ? parseFloat((this.product.potassium100g * 1000).toFixed(1))
          : undefined
      ),
      zinc100g: new FormControl(
        this.product.zinc100g
          ? parseFloat((this.product.zinc100g * 1000).toFixed(1))
          : undefined
      ),
      copper100g: new FormControl(
        this.product.copper100g
          ? parseFloat((this.product.copper100g * 1000).toFixed(1))
          : undefined
      ),
      manganese100g: new FormControl(
        this.product.manganese100g
          ? parseFloat((this.product.manganese100g * 1000).toFixed(1))
          : undefined
      ),
      selenium100g: new FormControl(
        this.product.selenium100g
          ? parseFloat((this.product.selenium100g * 1000000).toFixed(1))
          : undefined
      ),
      iodine100g: new FormControl(
        this.product.iodine100g
          ? parseFloat((this.product.iodine100g * 1000000).toFixed(1))
          : undefined
      ),
      sodium100g: new FormControl(
        this.product.sodium100g
          ? parseFloat((this.product.sodium100g * 1000).toFixed(1))
          : undefined
      ),
      salt100g: new FormControl(this.product.salt100g),

      // Vitaminas
      vitaminA100g: new FormControl(
        this.product.vitaminA100g
          ? parseFloat((this.product.vitaminA100g * 1000000).toFixed(1))
          : undefined
      ),
      vitaminD100g: new FormControl(
        this.product.vitaminD100g
          ? parseFloat((this.product.vitaminD100g * 1000000).toFixed(1))
          : undefined
      ),
      vitaminE100g: new FormControl(
        this.product.vitaminE100g
          ? parseFloat((this.product.vitaminE100g * 1000).toFixed(1))
          : undefined
      ),
      vitaminK100g: new FormControl(
        this.product.vitaminK100g
          ? parseFloat((this.product.vitaminK100g * 1000000).toFixed(1))
          : undefined
      ),
      vitaminC100g: new FormControl(
        this.product.vitaminC100g
          ? parseFloat((this.product.vitaminC100g * 1000).toFixed(1))
          : undefined
      ),
      vitaminB1100g: new FormControl(
        this.product.vitaminB1100g
          ? parseFloat((this.product.vitaminB1100g * 1000).toFixed(1))
          : undefined
      ),
      vitaminB2100g: new FormControl(
        this.product.vitaminB2100g
          ? parseFloat((this.product.vitaminB2100g * 1000).toFixed(1))
          : undefined
      ),
      vitaminB3100g: new FormControl(
        this.product.vitaminB3100g
          ? parseFloat((this.product.vitaminB3100g * 1000).toFixed(1))
          : undefined
      ),
      vitaminB5100g: new FormControl(
        this.product.vitaminB5100g
          ? parseFloat((this.product.vitaminB5100g * 1000).toFixed(1))
          : undefined
      ),
      vitaminB6100g: new FormControl(
        this.product.vitaminB6100g
          ? parseFloat((this.product.vitaminB6100g * 1000).toFixed(1))
          : undefined
      ),
      vitaminB9100g: new FormControl(
        this.product.vitaminB9100g
          ? parseFloat((this.product.vitaminB9100g * 1000000).toFixed(1))
          : undefined
      ),
      vitaminB12100g: new FormControl(
        this.product.vitaminB12100g
          ? parseFloat((this.product.vitaminB12100g * 1000000).toFixed(1))
          : undefined
      ),
      biotin100g: new FormControl(
        this.product.biotin100g
          ? parseFloat((this.product.biotin100g * 1000000).toFixed(1))
          : undefined
      ),

      // Otros
      cholesterol100g: new FormControl(
        this.product.cholesterol100g
          ? parseFloat((this.product.cholesterol100g * 1000).toFixed(1))
          : undefined
      ),
      transFat100g: new FormControl(this.product.transFat100g),
      omega3100g: new FormControl(this.product.omega3100g),
      omega6100g: new FormControl(this.product.omega6100g),
      omega9100g: new FormControl(this.product.omega9100g),
      caffeine100g: new FormControl(
        this.product.caffeine100g
          ? parseFloat((this.product.caffeine100g * 1000).toFixed(1))
          : undefined
      ),
      taurine100g: new FormControl(
        this.product.taurine100g
          ? parseFloat((this.product.taurine100g * 1000).toFixed(1))
          : undefined
      ),
      alcohol100g: new FormControl(this.product.alcohol100g),

      // Textos
      ingredients: new FormControl(
        Array.isArray(this.product.ingredients)
          ? this.product.ingredients.join(', ')
          : this.product.ingredients
      ),
      allergens: new FormControl(this.product.allergens?.join(', ')),
      traces: new FormControl(this.product.traces?.join(', ')),
    });

    this.addCustomProductForm.markAllAsTouched();

    // Sincronizar validadores según el modo inicial (puede haber arrancado en 'portions')
    // changeUnit hace el intercambio de required entre quantity <-> portions
    if (this.selectedUnit === 'portions') {
      this.changeUnit('portions');
    }
  }

  public roundCalories(event: any): void {
    const value = event.target.value;
    if (value && !isNaN(value)) {
      const roundedValue = Math.round(parseFloat(value));
      this.addCustomProductForm.patchValue({
        energyKcal100g: roundedValue,
      });
    }
  }

  public roundMicro(event: any, controlName: string): void {
    const value = event.target.value;
    if (value && !isNaN(value)) {
      const roundedValue = Math.round(parseFloat(value) * 10) / 10;
      this.addCustomProductForm.patchValue({
        [controlName]: roundedValue,
      });
    }
  }

  public roundMicro1000(event: any, controlName: string): void {
    const value = event.target.value;
    if (value && !isNaN(value)) {
      const roundedValue = Math.round(parseFloat(value) * 1000) / 1000;
      this.addCustomProductForm.patchValue({
        [controlName]: roundedValue,
      });
    }
  }

  private loadParametersFromRoute(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      let needsInit = false;
      if (params['product']) {
        this.product = JSON.parse(params['product']);
        this.syncOwnershipFromProduct();
        needsInit = true;
      }
      if (params['meal']) {
        this.meal = JSON.parse(params['meal']);
        this.targetMealName = this.meal.name;
        needsInit = true;
      } else if (params['mealName']) {
        this.targetMealName = params['mealName'];
      }

      if (params['dietDay']) {
        this.dietDay = JSON.parse(params['dietDay']);
      }
      if (params['productQuantity']) {
        this.productQuantity = parseFloat(params['productQuantity']);
        needsInit = true;
      }
      if (params['isScanned']) {
        this.isScanned = params['isScanned'] === 'true';
      }

      if (needsInit && this.product && !this.addCustomProductForm) {
        this.existCustomProduct();
        this.initForm();
      }
    });

    // Soportar navegación sin animación via NavController usando history.state
    const state: any = window.history.state || {};
    if (state.product && !this.product) {
      try {
        this.product = state.product;
        this.syncOwnershipFromProduct();
      } catch (_) {}
    }
    if (state.meal && !this.meal) {
      try {
        this.meal = state.meal;
      } catch (_) {}
    }
    if (state.dietDay && !this.dietDay) {
      try {
        this.dietDay = state.dietDay;
      } catch (_) {}
    }
    if (
      state.productQuantity !== undefined &&
      state.productQuantity !== null &&
      !this.productQuantity
    ) {
      const pq = parseFloat(state.productQuantity);
      if (!isNaN(pq)) this.productQuantity = pq;
    }
    if (state.isScanned !== undefined && state.isScanned !== null) {
      this.isScanned = !!state.isScanned;
    }
    if (state.returnUrl)
      this.returnUrl = this.normalizeReturnUrl(state.returnUrl);
  }

  private normalizeReturnUrl(url: string): string {
    if (url === '/config-recipe') {
      return '/search-foods/config-recipe';
    }
    return url;
  }

  private syncOwnershipFromProduct(): void {
    const userId = this.userService.getLocalUser?._id;
    this.isOwnProduct = !!(
      userId &&
      this.product?.userId &&
      this.product.userId === userId
    );
  }
}
