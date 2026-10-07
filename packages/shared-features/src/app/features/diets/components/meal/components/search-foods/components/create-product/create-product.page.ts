import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonInput, ModalController } from '@ionic/angular';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { IProduct } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { BarCodeScannerService } from 'src/app/core/services/util/bar-code-scanner.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { Theme } from 'src/app/shared/models/theme';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  public readonly isTrainerApp = environment.auth?.clientFamily === 'trainfit-trainers';
  @ViewChild('enterSubmitTarget', { read: ElementRef }) public enterSubmitButton?: ElementRef<HTMLElement>;
  // From previous modal
  public user: User;
  public meal: Meal;
  public dietDay: DietDay;
  public codeBar: string;
  public highlightCodeInput: boolean = false;

  // Theme support
  @Input() public theme: Theme;

  // TAREA5/Fix5 (train-fit-trainers) — permite abrir esta misma pantalla
  // (la real y completa: macros+micros+alérgenos+vegano+escáner) como
  // ion-modal en vez de como ruta del cliente, sin duplicar el formulario
  // en un componente aparte del trainer. En modalMode se salta
  // loadParametersFromRoute (no hay ActivatedRoute útil dentro de un
  // modal) y, al guardar/cancelar, se cierra el modal en vez de navegar
  // por rutas que no existen en la app del entrenador.
  @Input() public modalMode = false;
  // Editar un producto propio ya existente en modalMode (ver
  // SearchFoodsPage#editTrainerPreviewProduct) — mismo formulario que crear,
  // solo precargado. En modo ruta normal esto sigue llegando por query
  // params (loadParametersFromRoute), sin usar este input.
  @Input() public modalEditProduct?: IProduct;

  public productForm: FormGroup;
  public saveInProgress = false;

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
    private dietDayService: DietDayService,
    private ionicUtilService: IonicUtilService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private barCodeScannerService: BarCodeScannerService,
    private adMobService: AdMobService,
    private translate: TranslateService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    if (this.modalMode) {
      this.user = this.userService.getLocalUser;
      if (this.modalEditProduct) {
        this.isEditMode = true;
        this.editingProduct = this.modalEditProduct;
      }
      this.initForm();
      return;
    }

    this.loadParametersFromRoute();
    this.initForm();

    // Load ingredient mode from navigation state
    const state: any = window.history.state || {};
    this.ingredientMode = state.ingredientMode || false;
    console.log('[DEBUG] CreateProduct - ingredientMode:', this.ingredientMode);
  }

  public createCustomProduct(): void {
    if (this.saveInProgress || this.productForm.invalid) return;

    this.saveInProgress = true;

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
          const t = this.translate.instant.bind(this.translate);
          this.dietDayService.syncUpdatedProductInCurrentDietDay(
            updatedProduct || newProduct
          );

          this.ionicUtilService.showToast({
            message: t('CREATE_PRODUCT.UPDATE_SUCCESS', { name: updatedProduct?.name || newProduct.name }),
            duration: 2000,
            color: 'success',
          });

          if (this.modalMode) {
            void this.modalController.dismiss(
              { kind: 'product', product: updatedProduct || newProduct, quantity: 100 },
              'confirm'
            );
            return;
          }

          this.navigationService.setTempData(
            'updatedProductForAddProduct',
            updatedProduct || newProduct
          );
          this.adMobService.interstitial('create_product');
          this.navigationService.backNoAnim();
        },
        error: (err) => {
          this.saveInProgress = false;
          console.error('[EditProduct] Error al actualizar:', err);
          this.ionicUtilService.showToast({
            message: this.translate.instant('CREATE_PRODUCT.UPDATE_ERROR'),
            duration: 2000,
            color: 'danger',
          });
        },
      });
      return;
    }

    // Crear solo el Product base. La cantidad y su posible incorporación a
    // una meal/receta pertenecen al flujo de add-product.
    newProduct.userId = this.user._id;
    this.productService.saveProduct(newProduct).subscribe({
      next: (createdProduct: IProduct) => {
        this.navigationService.setTempData('searchFoodsResult', {
          refresh: true,
        });
        this.ionicUtilService.showToast({
          message: this.translate.instant('CREATE_PRODUCT.CREATE_SUCCESS', { name: createdProduct.name }),
          duration: 1200,
          color: 'success',
        });
        this.adMobService.interstitial('create_product');
        this.openAddProduct(createdProduct, false, true);
      },
      error: (error) => {
        this.saveInProgress = false;
        console.error('[CreateProduct] Error al crear:', error);
        this.ionicUtilService.showToast({
          message: this.translate.instant('CREATE_PRODUCT.CREATE_ERROR'),
          duration: 2000,
          color: 'danger',
        });
      },
    });
  }

  public async openScanner(): Promise<void> {
    this.codeBar = undefined;
    this.highlightCodeInput = false;
    const scannedCode = await this.barCodeScannerService.startScanner();
    if (!scannedCode) return;
    const idUser = this.user?._id || this.userService.getLocalUser?._id;
    if (idUser) {
      await this.ionicUtilService.showLoading({
        message: this.translate.instant('CREATE_PRODUCT.SEARCHING'),
        spinner: 'crescent',
        cssClass: 'loading-orange',
      });

      this.productByCodeSub = this.productService
        .getProductByCode(scannedCode)
        .subscribe({
          next: (resProduct: any) => {
            const product = resProduct?.product;

            if (product) {
              // 🔧 FIX: Producto encontrado - manejar según modo
              this.ionicUtilService.hideLoading();

                if (this.ingredientMode) {
                  console.log(
                    '[DEBUG] create-product.openScanner: producto encontrado en ingredientMode'
                  );
                  const t = this.translate.instant.bind(this.translate);
                  this.ionicUtilService.showAlert({
                    header: t('CREATE_PRODUCT.PRODUCT_FOUND_HEADER'),
                    message: t('CREATE_PRODUCT.PRODUCT_FOUND_MESSAGE', { name: product.name }),
                    buttons: [
                      {
                        text: t('COMMON.CANCEL'),
                        role: 'cancel',
                        handler: () => {
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
                        text: t('CREATE_PRODUCT.USE_PRODUCT'),
                        handler: () => {
                          this.openAddProduct(product, true);
                        },
                      },
                    ],
                  });
                } else {
                this.openAddProduct(product, true);
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
            const t = this.translate.instant.bind(this.translate);
            this.ionicUtilService.showAlert({
              header: t('COMMON.ERROR'),
              message: t('CREATE_PRODUCT.SEARCH_ERROR'),
              buttons: [t('COMMON.OK')],
            });
          },
          complete: () => {
            this.productByCodeSub = undefined;
          },
        });
    }
  }

  public goBack(): void {
    this.cancelProductLookup();
    if (this.modalMode) {
      void this.modalController.dismiss(null, 'cancel');
      return;
    }
    this.navigationService.backNoAnim();
  }

  private openAddProduct(
    product: IProduct,
    isScanned: boolean,
    justCreated: boolean = false,
  ): void {
    if (this.modalMode) {
      void this.modalController.dismiss({ kind: 'product', product, quantity: 100 }, 'confirm');
      return;
    }

    const returnUrl = this.returnUrl || '/search-foods';
    const queryParams: any = {
      product: JSON.stringify(product),
      isScanned: String(isScanned),
      justCreated: String(justCreated),
      ingredientMode: String(this.ingredientMode),
      returnUrl,
    };

    if (this.meal) queryParams.meal = JSON.stringify(this.meal);
    if (this.dietDay) queryParams.dietDay = JSON.stringify(this.dietDay);

    this.navigationService.goToAddProduct({
      replaceUrl: false,
      queryParams,
      state: {
        product,
        isScanned,
        justCreated,
        ingredientMode: this.ingredientMode,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl,
      },
    });
  }

  private initForm(): void {
    this.productForm = new FormGroup({
      code: new FormControl(
        this.codeBar ? this.codeBar : null,
        Validators.compose([Validators.nullValidator, Validators.maxLength(100)])
      ),
      brand: new FormControl(null, Validators.maxLength(200)),
      name: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(300)])),

      // Basic macronutrients (required)
      carbohydrates100g: new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100000)])),
      energyKcal100g: new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100000)])),
      fat100g: new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100000)])),
      protein100g: new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100000)])),

      // Basic macronutrients (optional)
      fiber100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      sugars100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      salt100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      saturatedFat100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      sodium100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      cholesterol100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      transFat100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),

      // Vitamins (existing)
      vitaminA100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminC100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),

      // Additional minerals
      calcium100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      iron100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      magnesium100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      phosphorus100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      potassium100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      zinc100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      copper100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      manganese100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      selenium100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      iodine100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),

      // Additional vitamins
      vitaminB1100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminB2100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminB3100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminB5100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminB6100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminB9100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminB12100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminD100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminE100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      vitaminK100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      biotin100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),

      // Fatty acids
      omega3100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      omega6100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      omega9100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),

      // Other nutrients
      caffeine100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      taurine100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      alcohol100g: new FormControl(null, [Validators.min(0), Validators.max(100000)]),

      // Product information
      productQuantity: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      servingQuantity: new FormControl(null, [Validators.min(0), Validators.max(100000)]),
      servingUnit: new FormControl(null),
      ingredients: new FormControl(null, Validators.maxLength(5000)), // Will be split into array

      // Allergens and dietary
      allergens: new FormControl(null, Validators.maxLength(1000)), // Will be split into array
      traces: new FormControl(null, Validators.maxLength(1000)), // Will be split into array
      vegan: new FormControl(false),
      vegetarian: new FormControl(false),
      lactoseFree: new FormControl(false),
      glutenFree: new FormControl(false),

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

  public ionViewWillEnter(): void {
    // Ionic mantiene viva la instancia de la página en el stack; sin esto,
    // un saveInProgress=true que quedó colgado de una creación anterior
    // (nunca se resetea en el camino de éxito, solo en el de error) se
    // arrastra a la siguiente vez que se entra en modo edición.
    this.saveInProgress = false;
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
