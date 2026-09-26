import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
// Ruta relativa, no alias: 'src/app/shared/*' apunta al paquete shared-ui
// del monorepo — este shared/ es el local de la app de entrenadores.
import { CategoryCard } from '../../shared/components/category-grid/category-grid.component';
import { CheckinTemplatesApiService } from '../checkin-templates/services/checkin-templates-api.service';
import { CheckinTemplateDefinition } from '../checkin-templates/models/checkin-template.model';
import { ApplyCheckinTemplateModalComponent } from '../checkin-templates/components/apply-checkin-template-modal/apply-checkin-template-modal.component';
import { CoachRulesApiService } from '../automations/services/coach-rules-api.service';
import { CoachRule } from '../automations/models/coach-rule.model';
import { CoachProtocolsApiService } from '../protocols/services/coach-protocols-api.service';
import { CoachProtocol } from '../protocols/models/coach-protocol.model';

// Movimiento 1 Coach Pro — mitad del antiguo hub "Plantillas".
//
// La otra mitad (Biblioteca, /tabs/templates) guarda lo que el entrenador
// PREPARA PARA UN CLIENTE: entrenamientos, rutinas, dietas.
// Aquí vive lo que define CÓMO TRABAJA: qué le pregunta a cada cliente
// (check-ins), qué le monta a uno nuevo de golpe (protocolos) y de qué se
// entera solo sin mirar (automatizaciones). Es la misma distinción que un
// entrenador ya hace de cabeza; el menú simplemente deja de ocultarla.
//
// "Automatizaciones" deja de ser destino del sidebar y entra aquí: la
// escribes una vez y trabaja sola, no es una pantalla de uso diario.
@Component({
  selector: 'app-method',
  templateUrl: 'method.page.html',
  styleUrls: ['method.page.scss'],
})
export class MethodPage implements OnInit {
  public readonly categories: CategoryCard[] = [
    {
      // Antes vivía también como acceso duplicado en Configuración
      // ("Plantillas de check-in") — un solo punto de entrada aquí, mismo
      // nombre que usaba ese acceso para no partir la terminología.
      name: 'Check-in',
      description: 'Qué le preguntas a tus clientes y cada cuánto',
      icon: 'document-text-outline',
      colorVar: 'var(--tf-success)',
      path: '/tabs/checkin-templates',
    },
    {
      // Fase 4 Coach Pro — un protocolo NO es contenido nuevo: es una lista
      // de referencias a las plantillas de la Biblioteca (objetivo, check-in,
      // dieta, rutina, reglas, hábitos) que se aplican de una vez.
      name: 'Protocolos',
      description: 'Tu metodología completa, lista para aplicar de una vez a un cliente nuevo',
      icon: 'layers-outline',
      colorVar: 'var(--tf-accent-2, #ff6b35)',
      path: '/tabs/protocols',
    },
    {
      // Fase 3 Coach Pro — reglas CUÁNDO/SI/ENTONCES.
      name: 'Avisos automatizados',
      description: 'Reglas que vigilan por ti y te avisan cuando algo se sale de lo previsto',
      icon: 'git-branch-outline',
      colorVar: 'var(--tf-accent)',
      path: '/tabs/automations',
    },
    {
      // Movimiento 6 Coach Pro — tu criterio sobre cada ejercicio, en
      // números. Va aquí y no en Biblioteca: la biblioteca es lo que le das
      // al cliente, esto es cómo decides tú qué darle.
      name: 'Puntuaciones',
      description: 'Qué músculos trabaja y qué articulaciones castiga cada ejercicio, según tú',
      icon: 'analytics-outline',
      colorVar: 'var(--tf-accent-2, #4fc79a)',
      path: '/tabs/exercise-scores',
    },
  ];

  // --- Recientes por tipo, mismo patrón que TemplatesPage: misma fuente de
  // datos que cada lista completa, recortada a las 4 más nuevas. ---
  public checkinTemplates: CheckinTemplateDefinition[] = [];
  public loadingCheckinTemplates = true;
  public protocols: CoachProtocol[] = [];
  public loadingProtocols = true;
  public rules: CoachRule[] = [];
  public loadingRules = true;

  constructor(
    private checkinTemplatesApi: CheckinTemplatesApiService,
    private protocolsApi: CoachProtocolsApiService,
    private coachRulesApi: CoachRulesApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadAll();
  }

  // Mismo bug de caché de ion-router-outlet ya corregido en TemplatesPage —
  // sin esto, tras crear algo desde aquí y volver, la preview seguiría
  // mostrando el estado anterior.
  public ionViewWillEnter(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.loadCheckinTemplates();
    this.loadProtocols();
    this.loadRules();
  }

  private loadCheckinTemplates(): void {
    this.loadingCheckinTemplates = true;
    this.checkinTemplatesApi.list().subscribe({
      next: (templates) => {
        this.checkinTemplates = (templates || [])
          .slice()
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
          .slice(0, 4);
        this.loadingCheckinTemplates = false;
      },
      error: () => {
        this.checkinTemplates = [];
        this.loadingCheckinTemplates = false;
      },
    });
  }

  private loadProtocols(): void {
    this.loadingProtocols = true;
    this.protocolsApi.getMine().subscribe({
      next: (protocols) => {
        this.protocols = (protocols || [])
          .slice()
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
          .slice(0, 4);
        this.loadingProtocols = false;
      },
      error: () => {
        this.protocols = [];
        this.loadingProtocols = false;
      },
    });
  }

  private loadRules(): void {
    this.loadingRules = true;
    this.coachRulesApi.getMine().subscribe({
      next: (rules) => {
        this.rules = (rules || [])
          .slice()
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
          .slice(0, 4);
        this.loadingRules = false;
      },
      error: () => {
        this.rules = [];
        this.loadingRules = false;
      },
    });
  }

  public get isEmpty(): boolean {
    return (
      !this.loadingCheckinTemplates &&
      !this.loadingProtocols &&
      !this.loadingRules &&
      !this.checkinTemplates.length &&
      !this.protocols.length &&
      !this.rules.length
    );
  }

  public trackById(_index: number, item: { _id: string }): string {
    return item._id;
  }

  // --- Check-ins ---
  // Sin builder propio con ruta ':id' (se edita desde un panel dentro de la
  // propia lista) — el acceso rápido lleva al listado, no a una plantilla
  // concreta.
  public goToCheckinTemplates(): void {
    this.router.navigate(['/tabs/checkin-templates']);
  }

  // Mismo modal real que checkin-templates.page.ts (ver comentario en
  // ApplyCheckinTemplateModalComponent).
  public async openApplyPanel(template: CheckinTemplateDefinition): Promise<void> {
    await this.ionicUtilService.showModal({
      component: ApplyCheckinTemplateModalComponent,
      componentProps: { template },
      cssClass: 'tf-panel-modal',
    });
  }

  public async confirmDeleteCheckinTemplate(template: CheckinTemplateDefinition): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Borrar plantilla',
      message: `¿Seguro que quieres borrar "${template.name}"? Los clientes que ya la tengan aplicada conservan su configuración actual.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => this.deleteCheckinTemplate(template),
        },
      ],
    });
  }

  private deleteCheckinTemplate(template: CheckinTemplateDefinition): void {
    this.checkinTemplatesApi.delete(template._id).subscribe({
      next: () => {
        this.ionicUtilService.showToast({ message: 'Plantilla borrada', duration: 2000 });
        this.loadCheckinTemplates();
      },
      error: () => {
        this.ionicUtilService.showErrorToast('No se pudo borrar la plantilla', 'Error', 2500);
      },
    });
  }

  // --- Protocolos ---
  public goToProtocols(): void {
    this.router.navigate(['/tabs/protocols']);
  }

  // Un protocolo puede referenciar check-in, dieta, rutina, reglas y hábitos:
  // se cuenta lo que realmente trae, no las ranuras que existen.
  public protocolMeta(protocol: CoachProtocol): string {
    const pieces = [
      protocol.checkinTemplateId ? 1 : 0,
      protocol.dietTemplateId ? 1 : 0,
      protocol.routineTemplateId ? 1 : 0,
      (protocol.ruleIds || []).length,
      (protocol.dailyTasks || []).length,
    ].reduce((total, n) => total + n, 0);
    return `${pieces} elemento${pieces === 1 ? '' : 's'}`;
  }

  // --- Automatizaciones ---
  public openRule(rule: CoachRule): void {
    this.router.navigate(['/tabs/automations', rule._id]);
  }

  public ruleMeta(rule: CoachRule): string {
    return rule.enabled ? 'Activa' : 'Pausada';
  }
}
