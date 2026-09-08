import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core';
import { PickerController, ToastOptions, PickerOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { PRODUCT_FILTERS } from 'src/app/shared/constants/filters';
import {
  MEASURE_FILTER,
  MEASURE_FILTER_TYPES,
} from '../../constants/measureFilter';
import { SearchFilterGroup } from '../../models/filterGroup';

export type FilterMode = 'products' | 'recipes';

@Component({
  selector: 'app-filter-icons',
  templateUrl: './filter-icons.component.html',
  styleUrls: ['./filter-icons.component.scss'],
})
export class FilterIconsComponent implements OnInit, OnChanges {
  @Input()
  public disabled: boolean;

  @Input()
  public tablesMode: boolean;

  @Input()
  public ingredientMode: boolean = false; // When true, only products mode available

  @Input()
  public currentMode: FilterMode = 'products'; // Accept mode from parent

  // Chip "Pautados": solo tiene sentido si hay algo pautado que enseñar, así
  // que lo decide el padre (la comida abierta) y no este componente.
  @Input()
  public showPautadoFilter = false;

  @Output()
  public filterSelection = new EventEmitter<SearchFilterGroup>();
  @Output()
  public filterMeasureSelect = new EventEmitter();
  @Output()
  public modeChange = new EventEmitter<FilterMode>();

  public filters: string[] = [];
  public filterDescription: string;

  public ownFilter: boolean = false;
  public favFilter: boolean = false;
  public shieldFilter: boolean = false;
  // Exclusivo con los otros tres: own/shield/fav acotan el CATÁLOGO en el
  // backend, mientras que pautado enseña lo que ya está en la comida. Son dos
  // universos distintos, y cruzarlos no significaría nada.
  public pautadoFilter: boolean = false;

  public picker: HTMLIonPickerElement;
  private pickerOptions: PickerOptions;

  public measureFilterColumnIndex = MEASURE_FILTER_TYPES.auto;
  public measureFilter = MEASURE_FILTER[MEASURE_FILTER_TYPES.auto].name;

  public PRODUCT_FILTERS = PRODUCT_FILTERS;
  public MEASURE_FILTER_TYPES = MEASURE_FILTER_TYPES;
  public MEASURE_FILTER = MEASURE_FILTER;

  private isInitialized = false;

  constructor(
    private pickerCtrl: PickerController,
    private _utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    console.log(
      '[DEBUG - FILTER-ICONS] ngOnInit, currentMode:',
      this.currentMode,
      'isInitialized:',
      this.isInitialized
    );
    // Do NOT emit during first setFilterDescription
    this.setFilterDescription();
    // NOW mark as initialized so future calls will emit
    this.isInitialized = true;
    console.log('[DEBUG - FILTER-ICONS] Marked as initialized');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(
      '[DEBUG - FILTER-ICONS] ngOnChanges:',
      changes,
      'isInitialized:',
      this.isInitialized
    );
    if (changes['currentMode'] && !changes['currentMode'].firstChange) {
      console.log(
        '[DEBUG - FILTER-ICONS] currentMode changed from',
        changes['currentMode'].previousValue,
        'to',
        changes['currentMode'].currentValue
      );
      // Reset filters when mode changes from parent
      this.ownFilter = false;
      this.favFilter = false;
      this.shieldFilter = false;
      this.pautadoFilter = false;
      // Update description but DON'T emit event - parent already handles search
      this.updateFilterDescriptionWithoutEmit();
    } else if (changes['currentMode'] && changes['currentMode'].firstChange) {
      console.log(
        '[DEBUG - FILTER-ICONS] ngOnChanges - firstChange for currentMode, skipping setFilterDescription'
      );
    }
  }

  public setMode(mode: FilterMode): void {
    if (this.ingredientMode && mode === 'recipes') {
      return; // Don't allow recipes mode when in ingredient mode
    }
    if (this.currentMode !== mode) {
      this.currentMode = mode;
      // Reset filters when switching modes
      this.ownFilter = false;
      this.favFilter = false;
      this.shieldFilter = false;
      this.pautadoFilter = false;
      this.setFilterDescription();
      this.modeChange.emit(this.currentMode);
    }
  }

  public addFilter(filter: string): void {
    // Pautados no convive con los demás (ver pautadoFilter): elegir uno
    // apaga el otro lado en vez de dejar una combinación sin significado.
    if (filter === PRODUCT_FILTERS.pautado) {
      this.pautadoFilter = !this.pautadoFilter;
      this.ownFilter = false;
      this.favFilter = false;
      this.shieldFilter = false;
      this.setFilterDescription();
      return;
    }

    this.pautadoFilter = false;

    switch (filter) {
      case PRODUCT_FILTERS.own:
        this.ownFilter = !this.ownFilter;
        this.shieldFilter = false;
        break;
      case PRODUCT_FILTERS.fav:
        this.favFilter = !this.favFilter;
        break;

      case PRODUCT_FILTERS.shield:
        this.shieldFilter = !this.shieldFilter;
        break;
    }

    this.setFilterDescription();
  }

  public selectAllFilter(): void {
    this.ownFilter = false;
    this.favFilter = false;
    this.shieldFilter = false;
    this.pautadoFilter = false;
    this.setFilterDescription();
  }

  public isAllSelected(): boolean {
    return !this.ownFilter && !this.favFilter && !this.shieldFilter && !this.pautadoFilter;
  }

  public showShieldDisabledToast(): void {
    const itemType = this.translate.instant(this.currentMode === 'products' ? 'FILTER.PRODUCT' : 'FILTER.RECIPE');
    const toastOptions: ToastOptions = {
      message: this.translate.instant('FILTER.SHIELD_DISABLED', { itemType }),
      duration: 3000,
    };
    this.ionicUtilService.showToast(toastOptions);
  }

  public onShieldChipClick(): void {
    if (this.ownFilter) {
      this.showShieldDisabledToast();
    } else if (!this.disabled) {
      this.addFilter(PRODUCT_FILTERS.shield);
    }
  }

  public onOwnChipClick(): void {
    if (this.shieldFilter) {
      this.showOwnDisabledToast();
    } else if (!this.disabled) {
      this.addFilter(PRODUCT_FILTERS.own);
    }
  }

  private async showOwnDisabledToast(): Promise<void> {
    const itemTypePlural = this.translate.instant(
      this.currentMode === 'products' ? 'FILTER.VERIFIED_PRODUCTS' : 'FILTER.VERIFIED_RECIPES'
    );
    const toastOptions: ToastOptions = {
      message: this.translate.instant('FILTER.OWN_DISABLED', { itemTypePlural }),
      duration: 3000,
    };
    await this.ionicUtilService.showToast(toastOptions);
  }

  public setFilterDescription(): void {
    console.log(
      '[DEBUG - FILTER-ICONS] setFilterDescription called, currentMode:',
      this.currentMode,
      'isInitialized:',
      this.isInitialized
    );
    this.updateFilterDescriptionText();

    const filterGroup: SearchFilterGroup = {
      favFilter: this.favFilter,
      ownFilter: this.ownFilter,
      shieldFilter: this.shieldFilter,
      pautadoFilter: this.pautadoFilter,
    };

    // Only emit after initialization to avoid duplicate searches
    if (this.isInitialized) {
      console.log('[DEBUG - FILTER-ICONS] Emitting filterSelection');
      this.filterSelection.emit(filterGroup);
    } else {
      console.log(
        '[DEBUG - FILTER-ICONS] NOT emitting filterSelection (not initialized yet)'
      );
    }
  }

  private updateFilterDescriptionWithoutEmit(): void {
    console.log(
      '[DEBUG - FILTER-ICONS] updateFilterDescriptionWithoutEmit called (mode changed from parent)'
    );
    this.updateFilterDescriptionText();
  }

  private updateFilterDescriptionText(): void {
    this.filterDescription = '';

    // Corta antes de las cadenas de own/shield/fav: con Pautados activo esos
    // tres están apagados, así que caería siempre en el "todos" y diría lo
    // contrario de lo que se está viendo.
    if (this.pautadoFilter) {
      this.filterDescription = this.translate.instant(
        this.currentMode === 'products' ? 'FILTER_DESC.PAUTADO_PRODUCTS' : 'FILTER_DESC.PAUTADO_RECIPES'
      );
      return;
    }

    if (this.currentMode === 'products') {
      this.setProductFilterDescription();
    } else {
      this.setRecipeFilterDescription();
    }
  }

  private setProductFilterDescription(): void {
    if (this.ownFilter && !this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.PRODUCT_ADDED_BY_ME');
    else if (this.ownFilter && this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.MY_VERIFIED_PRODUCTS');
    else if (this.ownFilter && !this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.MY_FAVORITE_PRODUCTS');
    else if (this.ownFilter && this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.MY_FAVORITE_VERIFIED_PRODUCTS');
    else if (!this.ownFilter && !this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.ALL_PRODUCTS');
    else if (!this.ownFilter && this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.VERIFIED_PRODUCTS');
    else if (!this.ownFilter && !this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.FAVORITE_PRODUCTS');
    else if (!this.ownFilter && this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.VERIFIED_FAVORITE_PRODUCTS');
  }

  private setRecipeFilterDescription(): void {
    if (this.ownFilter && !this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.RECIPE_ADDED_BY_ME');
    else if (this.ownFilter && this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.MY_VERIFIED_RECIPES');
    else if (this.ownFilter && !this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.MY_FAVORITE_RECIPES');
    else if (this.ownFilter && this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.MY_FAVORITE_VERIFIED_RECIPES');
    else if (!this.ownFilter && !this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.ALL_RECIPES');
    else if (!this.ownFilter && this.shieldFilter && !this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.VERIFIED_RECIPES');
    else if (!this.ownFilter && !this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.FAVORITE_RECIPES');
    else if (!this.ownFilter && this.shieldFilter && this.favFilter)
      this.filterDescription = this.translate.instant('FILTER_DESC.VERIFIED_FAVORITE_RECIPES');
  }

  public setFilterMeasure(): void {
    this.pickerOptions = {
      mode: 'ios',
      columns: [
        {
          name: 'measureFilter',
          options: [
            {
              text: this.translate.instant(MEASURE_FILTER[MEASURE_FILTER_TYPES.auto].description),
              value: MEASURE_FILTER[MEASURE_FILTER_TYPES.auto].id,
            },
            {
              text: this.translate.instant(MEASURE_FILTER[MEASURE_FILTER_TYPES.cieng].description),
              value: MEASURE_FILTER[MEASURE_FILTER_TYPES.cieng].id,
            },
            {
              text: this.translate.instant(MEASURE_FILTER[MEASURE_FILTER_TYPES.racion].description),
              value: MEASURE_FILTER[MEASURE_FILTER_TYPES.racion].id,
            },
            {
              text: this.translate.instant(MEASURE_FILTER[MEASURE_FILTER_TYPES.total].description),
              value: MEASURE_FILTER[MEASURE_FILTER_TYPES.total].id,
            },
          ],
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('FILTER.CONFIRM'),
          handler: (value) => {
            const selectedVal = value.measureFilter.value;
            this.measureFilterColumnIndex = selectedVal;
            this.measureFilter = MEASURE_FILTER[selectedVal].name;
            this.filterMeasureSelect.emit(this.measureFilterColumnIndex);
          },
        },
      ],
    };

    this.pickerCtrl.create(this.pickerOptions).then((picker) => {
      this.picker = picker;
      if (picker.columns && picker.columns[0]) {
        const selectedIndex = this.pickerOptions.columns[0].options.findIndex(
          (opt) => opt.value === this.measureFilterColumnIndex
        );
        picker.columns[0].selectedIndex = selectedIndex !== -1 ? selectedIndex : 0;
      }
      picker.present();
    });
  }
}
