import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DietTemplateApiService } from '../../services/diet-template-api.service';
import { DietTemplate } from '../../models/diet-template.model';
import {
  LibraryDietFlag,
  LibraryDietSource,
  LIBRARY_DIET_SOURCES,
  activeLibraryFilterCount,
  effectiveSuitableFor,
  filterDietLibrary,
} from '../../utils/diet-library-filter';
import { nextSources } from '../../components/diet-suggestion-drawer/diet-source-filter.util';
import { DIETARY_FLAG_UI } from '../../../../shared/utils/dietary-flag-ui.util';

type ViewState = 'loading' | 'error' | 'loaded';

const DIETARY_FLAGS: { key: LibraryDietFlag; label: string; icon: string; colorClass: string }[] = (
  ['vegan', 'vegetarian', 'lactoseFree', 'glutenFree'] as LibraryDietFlag[]
).map((key) => ({ key, ...DIETARY_FLAG_UI[key] }));

// Replanteamiento MVP (nutrición) — biblioteca de plantillas de dieta del
// profesional, reutilizables entre clientes (mismo espíritu que las
// plantillas de Table para rutinas).
@Component({
  selector: 'app-diet-templates-list',
  templateUrl: 'diet-templates-list.page.html',
  styleUrls: ['diet-templates-list.page.scss'],
})
export class DietTemplatesListPage implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly userService = inject(UserService);

  public state: ViewState = 'loading';
  public templates: DietTemplate[] = [];
  // Hoja inferior de alta (nombre + Crear), abierta desde la tarjeta "+ Dieta".
  public showCreateSheet = false;
  public newName = '';
  // Buscador por nombre y filtros del panel derecho; se conservan al volver
  // del builder (la página queda cacheada) para seguir en la misma lista.
  public search = '';
  public readonly dietaryFlagOptions = DIETARY_FLAGS;
  public flags = new Set<LibraryDietFlag>();
  // Mismos chips de origen que el cajón "Empezar fase", salvo "De este
  // cliente", que aquí es "De clientes": la biblioteca no mira a uno solo.
  public readonly sourceOptions: { key: LibraryDietSource; labelKey?: string; label?: string; icon: string }[] = [
    { key: 'general', labelKey: 'DIET_TEMPLATES.ANADIDAS_POR_MI', icon: 'person' },
    { key: 'client', labelKey: 'DIET_TEMPLATES.FROM_CLIENTS', icon: 'person-circle' },
    { key: 'verified', labelKey: 'DIET_TEMPLATES.DE_FABRICA', icon: 'shield' },
  ];
  public sources = new Set<LibraryDietSource>(LIBRARY_DIET_SOURCES);
  // Panel lateral de filtros, abierto desde el botón junto al buscador.
  public showFilters = false;
  public isCreating = false;
  // Plantilla abierta en la vista previa de solo lectura (null = cerrada).
  public previewTemplate: DietTemplate | null = null;

  @ViewChild('createNameInput') private createNameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('filtersClose') private filtersClose?: ElementRef<HTMLButtonElement>;

  constructor(
    private dietTemplateApi: DietTemplateApiService,
    private router: Router,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  // ion-router-outlet cachea la página al volver del builder (push/pop) —
  // sin esto, "Volver" desde diet-template-builder.page.ts mostraría la
  // lista desactualizada (la plantilla recién creada/editada no aparecería
  // hasta un refresco manual). ngOnInit solo se dispara una vez por
  // instancia. Mismo fix ya aplicado en RoutinesPage (TASK-013).
  public ionViewWillEnter(): void {
    this.load();
  }

  // La página queda cacheada al abrir una plantilla: sin esto, la vista
  // previa seguiría abierta al volver.
  public ionViewWillLeave(): void {
    this.closePreview();
    this.showCreateSheet = false;
    this.showFilters = false;
  }

  public openCreateSheet(): void {
    this.newName = '';
    this.showCreateSheet = true;
    // El campo existe tras el siguiente render (*ngIf de la hoja).
    setTimeout(() => this.createNameInput?.nativeElement.focus());
  }

  public closeCreateSheet(): void {
    if (this.isCreating) return;
    this.showCreateSheet = false;
  }

  public openPreview(template: DietTemplate): void {
    this.previewTemplate = template;
  }

  public closePreview(): void {
    this.previewTemplate = null;
  }

  public load(): void {
    this.state = 'loading';
    this.dietTemplateApi.list({ includeOwned: true }).subscribe({
      next: (templates) => {
        this.templates = templates || [];
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public createAndEdit(): void {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;
    this.dietTemplateApi.create(name, []).subscribe({
      next: (template) => {
        this.isCreating = false;
        this.showCreateSheet = false;
        this.openTemplate(template);
      },
      error: () => {
        this.isCreating = false;
        this.ionicUtilService.showErrorToast(this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_CREAR_LA_2'), this.translate.instant('COMMON.ERROR'), 3000);
      },
    });
  }

  public openTemplate(template: DietTemplate): void {
    this.router.navigate(['/tabs/diet-templates', template._id]);
  }

  public async confirmDelete(template: DietTemplate, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('DIET_TEMPLATES.ELIMINAR_PLANTILLA_2'),
      message: this.translate.instant('DIET_TEMPLATES.ELIMINAR_NO_AFECTA_LAS_DIETAS', { name: template.name }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.dietTemplateApi.delete(template._id).subscribe({
              next: () => this.load(),
              error: () => this.ionicUtilService.showErrorToast(this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_ELIMINAR'), this.translate.instant('COMMON.ERROR'), 3000),
            });
          },
        },
      ],
    });
  }

  public onSearch(event: Event): void {
    this.search = String((event as CustomEvent).detail?.value || '');
  }

  public openFilters(): void {
    this.showFilters = true;
    // El foco entra en el panel (existe tras el siguiente render): Esc lo
    // cierra y el teclado no se queda en la lista de detrás.
    setTimeout(() => this.filtersClose?.nativeElement.focus());
  }

  public get filteredTemplates(): DietTemplate[] {
    return filterDietLibrary(this.templates, {
      query: this.search,
      flags: this.flags,
      sources: this.sources,
      trainerId: this.userService.localUser()?._id,
    });
  }

  public get activeFilterCount(): number {
    return activeLibraryFilterCount({ flags: this.flags, sources: this.sources });
  }

  public get allSourcesSelected(): boolean {
    return this.sources.size === LIBRARY_DIET_SOURCES.length;
  }

  public toggleFlag(flag: LibraryDietFlag): void {
    const next = new Set(this.flags);
    if (!next.delete(flag)) next.add(flag);
    this.flags = next;
  }

  public toggleSource(source: LibraryDietSource): void {
    this.sources = nextSources(this.sources, source, LIBRARY_DIET_SOURCES);
  }

  public selectAllSources(): void {
    this.sources = new Set(LIBRARY_DIET_SOURCES);
  }

  public clearPanelFilters(): void {
    this.flags = new Set();
    this.selectAllSources();
  }

  // "Quitar filtros" del aviso de lista vacía: también vacía el buscador.
  public clearFilters(): void {
    this.search = '';
    this.clearPanelFilters();
  }

  public trackByTemplateId(_index: number, template: DietTemplate): string {
    return template._id;
  }

  public menuCount(template: DietTemplate): number {
    return template.menus?.length || 0;
  }

  // Sugerencias de dieta — aptitud efectiva (derivada ∪ forzada a mano).
  public effectiveSuitableFor(template: DietTemplate): string[] {
    return effectiveSuitableFor(template);
  }
}
