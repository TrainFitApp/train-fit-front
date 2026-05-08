import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonInput, ToastOptions } from '@ionic/angular';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { IProduct } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { BarCodeScannerService } from 'src/app/core/services/util/bar-code-scanner.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { Theme } from 'src/app/shared/models/theme';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  // From previous modal
  public user: User;
  public meal: Meal;
  public dietDay: DietDay;
  public codeBar: string;
  public highlightCodeInput: boolean = false;

  // Theme support
  @Input() public theme: Theme;

  public productForm: FormGroup;
  public loading = { value: false };

  public isEditMode: boolean = false;
  public editingProduct: IProduct;
  private returnUrl?: string;
  private productByCodeSub?: Subscription;

  // Ingredient mode support
  public ingredientMode: boolean = false;

  @ViewChild('barcodeInput', { static: false })
  private barcodeInput?: IonInput;

  constructor(
    private productService: ProductService,
    private customProductService: CustomProductService,
    private dietDayService: DietDayService,
    private ionicUtilService: IonicUtilService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private barCodeScannerService: BarCodeScannerService,
    private adMobService: AdMobService
  ) {}

  public ngOnInit(): void {
    this.loadParametersFromRoute();
    this.initForm();

    // Load ingredient mode from navigation state
    const state: any = window.history.state || {};
    this.ingredientMode = state.ingredientMode || false;
    console.log('[DEBUG] CreateProduct - ingredientMode:', this.ingredientMode);
  }

  public createCustomProduct(): void {
    const formValues = { ...this.productForm.value };

    // Unit conversions (UI -> DB/g)
    const mgToG = (val: any) =>
      val !== null && val !== undefined && val !== ''
        ? parseFloat(val) / 1000
        : null;
    const ugToG = (val: any) =>
      val !== null && val !== undefined && val !== ''
        ? parseFloat(val) / 1000000
        : null;
    const toNum = (val: any) =>
      val !== null && val !== undefined && val !== '' ? parseFloat(val) : null;

    // Numeric fields (those already in grams or values as-is)
    const numericFields = [
      'energyKcal100g',
      'carbohydrates100g',
      'fat100g',
      'protein100g',
      'fiber100g',
      'sugars100g',
      'salt100g',
      'saturatedFat100g',
      'alcohol100g',
      'productQuantity',
      'servingQuantity',
      'omega3100g',
      'omega6100g',
      'omega9100g',
      'transFat100g',
    ];
    numericFields.forEach((field) => {
      formValues[field] = toNum(formValues[field]);
    });

    // Minerals (mg)
    [
      'calcium100g',
      'iron100g',
      'magnesium100g',
      'phosphorus100g',
      'potassium100g',
      'zinc100g',
      'copper100g',
      'manganese100g',
      'cholesterol100g',
      'sodium100g',
    ].forEach((field) => {
      formValues[field] = mgToG(formValues[field]);
    });

    // Minerals (µg)
    ['selenium100g', 'iodine100g'].forEach((field) => {
      formValues[field] = ugToG(formValues[field]);
    });

    // Vitamins (mg)
    [
      'vitaminB1100g',
      'vitaminB2100g',
      'vitaminB3100g',
      'vitaminB5100g',
      'vitaminB6100g',
      'vitaminC100g',
      'vitaminE100g',
      'caffeine100g',
      'taurine100g',
    ].forEach((field) => {
      formValues[field] = mgToG(formValues[field]);
    });

    // Vitamins (µg)
    [
      'vitaminA100g',
      'vitaminB9100g',
      'vitaminB12100g',
      'vitaminD100g',
      'vitaminK100g',
      'biotin100g',
    ].forEach((field) => {
      formValues[field] = ugToG(formValues[field]);
    });

    let newProduct =
      this.isEditMode && this.editingProduct
        ? ({ ...this.editingProduct } as IProduct)
        : ({} as IProduct);
    Object.assign(newProduct, formValues);

    // Process text fields as arrays
    const splitText = (text: any) =>
      typeof text === 'string'
        ? text
            .split(',')
            .map((i) => i.trim())
            .filter((i) => i.length > 0)
        : text;

    newProduct.ingredients = Array.isArray(formValues.ingredients)
      ? formValues.ingredients.join(', ')
      : formValues.ingredients;
    newProduct.allergens = splitText(formValues.allergens);
    newProduct.traces = splitText(formValues.traces);

    newProduct = new IProduct(newProduct);

    // Si estamos en modo edición, mantenemos el ID original
    if (this.isEditMode && this.editingProduct) {
      newProduct._id = this.editingProduct._id;
    } else {
      // Eliminar _id para evitar errores de duplicado en MongoDB al crear uno nuevo
      delete (newProduct as any)._id;
    }

    // UPDATE Product
    if (this.isEditMode) {
      console.log(
        '[EditProduct] Iniciando actualización de producto:',
        newProduct._id
      );
      this.productService.updateProduct(newProduct).subscribe({
        next: (updatedProduct: IProduct) => {
          this.dietDayService.syncUpdatedProductInCurrentDietDay(
            updatedProduct || newProduct
          );

          const toastOptions: ToastOptions = {
            message: `¡${
              updatedProduct?.name || newProduct.name
            } actualizado con éxito!`,
            duration: 2000,
            color: 'success',
          };
          this.ionicUtilService.showToast(toastOptions);
          this.navigationService.setTempData(
            'updatedProductForAddProduct',
            updatedProduct || newProduct
          );
          this.adMobService.interstitial('create_product'); // Estrategia AdMob
          this.navigationService.backNoAnim();
        },
        error: (err) => {
          console.error('[EditProduct] Error al actualizar:', err);
          const toastOptions: ToastOptions = {
            message: 'Error al actualizar el producto. Inténtalo de nuevo.',
            duration: 2000,
            color: 'danger',
          };
          this.ionicUtilService.showToast(toastOptions);
        },
      });
      return;
    }

    // 🔧 Ingredient mode: crear producto en DB y volver con el nuevo ingrediente
    if (this.ingredientMode) {
      // Añadir userId para que sea un producto del usuario
      newProduct.userId = this.user._id;

      this.productService.saveProduct(newProduct).subscribe({
        next: (createdProduct: IProduct) => {
          // Componer el customProduct con el nuevo producto
          const newIngredient = this.customProductService.composeCustomProduct(
            createdProduct,
            toNum(this.productForm.controls.quantity.value) || 0,
            0
          );

          this.customProductService.mapNutritionalValues(
            createdProduct,
            newIngredient
          );

          this.navigationService.setTempData('newIngredient', newIngredient);

          const toastOptions: ToastOptions = {
            message: `${createdProduct.name} creado con éxito`,
            duration: 1500,
            color: 'success',
          };
          this.ionicUtilService.showToast(toastOptions);
          this.adMobService.interstitial('create_product'); // Estrategia AdMob
          this.navigationService.backNoAnim();
        },
        error: (error) => {
          console.error('[ERROR] Failed to create product in DB:', error);
          const toastOptions: ToastOptions = {
            message: 'Error al crear el producto. Inténtalo de nuevo.',
            duration: 2000,
            color: 'danger',
          };
          this.ionicUtilService.showToast(toastOptions);
        },
      });
      return;
    }

    // CREATE (modo normal)
    if (this.meal) {
      // Añadir userId al producto para identificarlo como propiedad del usuario
      newProduct.userId = this.user._id;
      const newCustomProduct = this.customProductService.composeCustomProduct(
        newProduct,
        toNum(this.productForm.controls.quantity.value) || 0,
        0
      );

      this.customProductService.mapNutritionalValues(
        newProduct,
        newCustomProduct
      );

      const idDietInUse = !this.dietDay._id ? this.user.dietInUse : undefined;

      this.dietDayService
        .createCustomProduct(
          this.loading,
          this.dietDay,
          newCustomProduct,
          this.meal,
          idDietInUse,
          this.user._id
        )
        .subscribe(() => {
          this.navigationService.setTempData('searchFoodsResult', {
            createdViaCreateProduct: true,
          });

          this.adMobService.interstitial('create_product'); // Estrategia AdMob

          if (this.returnUrl && this.returnUrl.includes('/search-foods')) {
            this.navigationService.backNoAnim();
          } else if (this.returnUrl) {
            const resultState = { result: { refresh: true } };
            const parentUrl = this.returnUrl.replace(
              /\/(create-product|add-product)$/i,
              '/search-foods'
            );
            if (parentUrl.endsWith('/search-foods')) {
              this.navigationService.backNoAnim();
            } else {
              this.navigationService.backTo(parentUrl, { state: resultState });
            }
          } else {
            this.navigationService.backNoAnim();
          }
        });
    }
    // Si provienen de profile (sin meal)
    else {
      newProduct.userId = this.user._id;
      this.productService.saveProduct(newProduct).subscribe((resProduct) => {
        this.navigationService.setTempData('searchFoodsResult', {
          refresh: true,
          switchSegmentToOwn: true,
        });

        const toastOptions: ToastOptions = {
          message: resProduct.name + ' añadido',
          duration: 1000,
        };
        this.ionicUtilService.showToast(toastOptions);
        this.adMobService.interstitial('create_product'); // Estrategia AdMob
        if (this.returnUrl && !this.returnUrl.includes('/search-foods')) {
          this.navigationService.backTo(this.returnUrl);
        } else {
          this.navigationService.backNoAnim();
        }
      });
    }
  }

  public async openScanner(): Promise<void> {
    this.codeBar = undefined;
    this.highlightCodeInput = false;
    const scannedCode = await this.barCodeScannerService.startScanner();
    if (!scannedCode) return;
    const idUser = this.user?._id || this.userService.getLocalUser?._id;
    if (idUser) {
      await this.ionicUtilService.showLoading({
        message: 'Buscando producto...',
        spinner: 'crescent',
        cssClass: 'loading-orange',
      });

      this.productByCodeSub = this.productService
        .getProductByCode(idUser, scannedCode)
        .subscribe({
          next: (resProduct: any) => {
            const product = resProduct?.product;

            if (product) {
              // 🔧 FIX: Producto encontrado - manejar según modo
              this.ionicUtilService.hideLoading();

              if (this.ingredientMode) {
                // ✅ MODO INGREDIENTE: Mostrar alert y crear CustomProduct local
                console.log(
                  '[DEBUG] create-product.openScanner: producto encontrado en ingredientMode'
                );
                const alertOptions = {
                  header: 'Producto encontrado',
                  message: `¿Deseas usar el producto "${product.name}" existente?`,
                  buttons: [
                    {
                      text: 'Cancelar',
                      role: 'cancel',
                      handler: () => {
                        // Mantener código en input para seguir creando
                        this.codeBar = scannedCode;
                        if (this.productForm) {
                          this.productForm.get('code')?.setValue(this.codeBar);
                          this.productForm
                            .get('code')
                            ?.updateValueAndValidity();
                        }
                        this.highlightCodeInput = true;
                        setTimeout(() => this.barcodeInput?.setFocus(), 250);
                      },
                    },
                    {
                      text: 'Usar',
                      handler: () => {
                        // Crear CustomProduct local y volver a search-foods
                        const newIngredient =
                          this.customProductService.composeCustomProduct(
                            product,
                            this.productForm.controls.quantity.value || 100,
                            0
                          );
                        this.navigationService.setTempData(
                          'newIngredient',
                          newIngredient
                        );
                        const toastOptions = {
                          message: `${product.name} añadido a la receta`,
                          duration: 1500,
                          color: 'success',
                        };
                        this.ionicUtilService.showToast(toastOptions);
                        this.navigationService.backNoAnim();
                      },
                    },
                  ],
                };
                this.ionicUtilService.showAlert(alertOptions);
              } else if (this.meal && this.dietDay) {
                // MODO NORMAL con meal: Navegar a add-product
                console.log(
                  '[DEBUG] create-product.openScanner: navegar a add-product (normal mode con meal)'
                );
                const queryParams: any = {
                  product: JSON.stringify(product),
                  isScanned: true,
                  productQuantity: product.servingQuantity,
                  dietDay: JSON.stringify(this.dietDay),
                  meal: JSON.stringify(this.meal),
                };
                this.navigationService.goToAddProduct({
                  replaceUrl: false,
                  queryParams,
                  state: {
                    product,
                    isScanned: true,
                    productQuantity: product.servingQuantity,
                    dietDay: this.dietDay,
                    meal: this.meal,
                    returnUrl: '/search-foods',
                  },
                });
              } else {
                // MODO NORMAL sin meal: Navegar a add-product
                console.log(
                  '[DEBUG] create-product.openScanner: navegar a add-product (normal mode sin meal)'
                );
                const queryParams: any = {
                  product: JSON.stringify(product),
                  isScanned: true,
                  productQuantity: product.servingQuantity,
                };
                this.navigationService.goToAddProduct({
                  replaceUrl: false,
                  queryParams,
                  state: {
                    product,
                    isScanned: true,
                    productQuantity: product.servingQuantity,
                    returnUrl: '/search-foods',
                  },
                });
              }
            } else {
              // ✅ Producto no encontrado: mantener código en input
              this.ionicUtilService.hideLoading();
              this.codeBar = scannedCode;
              if (this.productForm) {
                this.productForm.get('code')?.setValue(this.codeBar);
                this.productForm.get('code')?.updateValueAndValidity();
              }
              this.highlightCodeInput = true;
              setTimeout(() => this.barcodeInput?.setFocus(), 250);
            }
          },
          error: (_) => {
            this.ionicUtilService.hideLoading();
            const alertOptions = {
              header: 'Error',
              message: 'No se pudo buscar el producto',
              buttons: ['OK'],
            };
            this.ionicUtilService.showAlert(alertOptions);
          },
          complete: () => {
            this.productByCodeSub = undefined;
          },
        });
    }
  }

  public goBack(): void {
    this.cancelProductLookup();
    this.navigationService.backNoAnim();
  }

  private initForm(): void {
    this.productForm = new FormGroup({
      code: new FormControl(
        this.codeBar ? this.codeBar : null,
        Validators.nullValidator
      ),
      brand: new FormControl(null),
      name: new FormControl(null, Validators.required),

      // Basic macronutrients (required)
      carbohydrates100g: new FormControl(null, Validators.required),
      energyKcal100g: new FormControl(null, Validators.required),
      fat100g: new FormControl(null, Validators.required),
      protein100g: new FormControl(null, Validators.required),

      // Basic macronutrients (optional)
      fiber100g: new FormControl(null),
      sugars100g: new FormControl(null),
      salt100g: new FormControl(null),
      saturatedFat100g: new FormControl(null),
      sodium100g: new FormControl(null),
      cholesterol100g: new FormControl(null),
      transFat100g: new FormControl(null),

      // Vitamins (existing)
      vitaminA100g: new FormControl(null),
      vitaminC100g: new FormControl(null),

      // Additional minerals
      calcium100g: new FormControl(null),
      iron100g: new FormControl(null),
      magnesium100g: new FormControl(null),
      phosphorus100g: new FormControl(null),
      potassium100g: new FormControl(null),
      zinc100g: new FormControl(null),
      copper100g: new FormControl(null),
      manganese100g: new FormControl(null),
      selenium100g: new FormControl(null),
      iodine100g: new FormControl(null),

      // Additional vitamins
      vitaminB1100g: new FormControl(null),
      vitaminB2100g: new FormControl(null),
      vitaminB3100g: new FormControl(null),
      vitaminB5100g: new FormControl(null),
      vitaminB6100g: new FormControl(null),
      vitaminB9100g: new FormControl(null),
      vitaminB12100g: new FormControl(null),
      vitaminD100g: new FormControl(null),
      vitaminE100g: new FormControl(null),
      vitaminK100g: new FormControl(null),
      biotin100g: new FormControl(null),

      // Fatty acids
      omega3100g: new FormControl(null),
      omega6100g: new FormControl(null),
      omega9100g: new FormControl(null),

      // Other nutrients
      caffeine100g: new FormControl(null),
      taurine100g: new FormControl(null),
      alcohol100g: new FormControl(null),

      // Product information
      productQuantity: new FormControl(null),
      servingQuantity: new FormControl(null),
      servingUnit: new FormControl(null),
      ingredients: new FormControl(null), // Will be split into array

      // Allergens and dietary
      allergens: new FormControl(null), // Will be split into array
      traces: new FormControl(null), // Will be split into array
      vegan: new FormControl(false),
      vegetarian: new FormControl(false),
      lactoseFree: new FormControl(false),
      glutenFree: new FormControl(false),

      // Quantity for meal
      quantity: new FormControl(null, this.meal ? Validators.required : null),
    });

    // Si estamos en modo edición, rellenamos el formulario
    if (this.isEditMode && this.editingProduct) {
      const p = this.editingProduct;
      const mg = (val: any) =>
        val !== undefined && val !== null
          ? parseFloat((val * 1000).toFixed(4))
          : null;
      const ug = (val: any) =>
        val !== undefined && val !== null
          ? parseFloat((val * 1000000).toFixed(4))
          : null;

      this.productForm.patchValue({
        code: p.code,
        brand: p.brand,
        name: p.name,
        carbohydrates100g: p.carbohydrates100g,
        energyKcal100g: p.energyKcal100g ? Math.round(p.energyKcal100g) : null,
        fat100g: p.fat100g,
        protein100g: p.protein100g,
        fiber100g: p.fiber100g,
        sugars100g: p.sugars100g,
        salt100g: p.salt100g,
        saturatedFat100g: p.saturatedFat100g,
        sodium100g: mg(p.sodium100g),
        cholesterol100g: mg(p.cholesterol100g),
        transFat100g: p.transFat100g,
        vitaminA100g: ug(p.vitaminA100g),
        vitaminC100g: mg(p.vitaminC100g),
        calcium100g: mg(p.calcium100g),
        iron100g: mg(p.iron100g),
        magnesium100g: mg(p.magnesium100g),
        phosphorus100g: mg(p.phosphorus100g),
        potassium100g: mg(p.potassium100g),
        zinc100g: mg(p.zinc100g),
        copper100g: mg(p.copper100g),
        manganese100g: mg(p.manganese100g),
        selenium100g: ug(p.selenium100g),
        iodine100g: ug(p.iodine100g),
        vitaminB1100g: mg(p.vitaminB1100g),
        vitaminB2100g: mg(p.vitaminB2100g),
        vitaminB3100g: mg(p.vitaminB3100g),
        vitaminB5100g: mg(p.vitaminB5100g),
        vitaminB6100g: mg(p.vitaminB6100g),
        vitaminB9100g: ug(p.vitaminB9100g),
        vitaminB12100g: ug(p.vitaminB12100g),
        vitaminD100g: ug(p.vitaminD100g),
        vitaminE100g: mg(p.vitaminE100g),
        vitaminK100g: ug(p.vitaminK100g),
        biotin100g: ug(p.biotin100g),
        omega3100g: p.omega3100g,
        omega6100g: p.omega6100g,
        omega9100g: p.omega9100g,
        caffeine100g: mg(p.caffeine100g),
        taurine100g: mg(p.taurine100g),
        alcohol100g: p.alcohol100g,
        productQuantity: p.productQuantity,
        servingQuantity: p.servingQuantity,
        servingUnit: p.servingUnit,
        ingredients: Array.isArray(p.ingredients)
          ? p.ingredients.join(', ')
          : p.ingredients,
        allergens: p.allergens?.join(', '),
        traces: p.traces?.join(', '),
        vegan: p.vegan || false,
        vegetarian: p.vegetarian || false,
        lactoseFree: p.lactoseFree || false,
        glutenFree: p.glutenFree || false,
      });
    }

    setTimeout(() => {
      if (this.codeBar) {
        this.productForm.get('code')?.setValue(this.codeBar);
        this.productForm.get('code')?.updateValueAndValidity();
      }
    });
  }

  private loadParametersFromRoute(): void {
    // Cargar parámetros cuando se abre por ruta
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['user']) {
        try {
          this.user = JSON.parse(params['user']);
        } catch (_) {}
      }
      if (params['meal']) {
        try {
          this.meal = JSON.parse(params['meal']);
        } catch (_) {}
      }
      if (params['dietDay']) {
        try {
          this.dietDay = JSON.parse(params['dietDay']);
        } catch (_) {}
      }
      if (params['codeBar']) {
        this.codeBar = params['codeBar'];
        if (this.productForm) {
          this.productForm.get('code')?.setValue(this.codeBar);
          this.productForm.get('code')?.updateValueAndValidity();
        }
        // Resaltar y enfocar el input cuando venimos desde SearchFoods con código escaneado
        this.highlightCodeInput = true;
        setTimeout(() => this.barcodeInput?.setFocus(), 250);
      }
      if (params['theme']) {
        try {
          this.theme =
            typeof params['theme'] === 'string'
              ? (params['theme'] as any)
              : this.theme;
        } catch (_) {}
      }
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
      if (params['isEditMode']) {
        this.isEditMode =
          params['isEditMode'] === 'true' || params['isEditMode'] === true;
      }
      if (params['product']) {
        try {
          this.editingProduct = JSON.parse(params['product']);
          if (this.productForm) this.initForm(); // Re-init form if product is now available
        } catch (_) {}
      }
    });
    // También leer state al volver del escáner
    const state: any = window.history.state || {};
    // Preferir state para compatibilidad con NavController
    if (state.isEditMode !== undefined) {
      this.isEditMode = !!state.isEditMode;
    }
    if (state.product) {
      this.editingProduct = state.product;
      if (this.productForm) this.initForm();
    }
    if (state.user && !this.user) {
      try {
        this.user = state.user;
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
    if (state.theme && !this.theme) {
      try {
        this.theme = state.theme;
      } catch (_) {}
    }
    if (state.codeBar) {
      this.codeBar = state.codeBar;
      if (this.productForm) {
        this.productForm.get('code')?.setValue(this.codeBar);
        this.productForm.get('code')?.updateValueAndValidity();
      }
      // Resaltar y enfocar el input si hay código en state (flujo de SearchFoods)
      this.highlightCodeInput = true;
      setTimeout(() => this.barcodeInput?.setFocus(), 250);
    }
    if (state.userId && !this.user) this.user = { _id: state.userId } as any;
    if (state.mealName && !this.meal)
      this.meal = { name: state.mealName } as any;
    if (state.returnUrl) this.returnUrl = state.returnUrl;

    // Fallback de usuario si no se pudo reconstruir desde state/query
    if (!this.user && this.userService.getLocalUser) {
      this.user = this.userService.getLocalUser;
    }
    // Si hay código (desde SearchFoods), resaltar y enfocar
    if (this.codeBar) {
      this.highlightCodeInput = true;
      setTimeout(() => this.barcodeInput?.setFocus(), 250);
    }
  }

  public ionViewWillLeave(): void {
    this.cancelProductLookup();
  }

  private cancelProductLookup(): void {
    try {
      this.productByCodeSub?.unsubscribe();
      this.productByCodeSub = undefined;
    } catch {}
    this.ionicUtilService.hideLoading();
  }

  public onCodeInputChange(): void {
    // Quitar resaltado cuando el usuario modifica el código manualmente
    this.highlightCodeInput = false;
  }
}
