import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { PendingChangesComponent } from 'src/app/core/guards/pending-changes.guard';
import { confirmDiscardChanges } from '../../../../shared/navigation/confirm-discard-changes';
import { SelectClientsModalComponent } from 'src/app/features/clients/components/select-clients-modal/select-clients-modal.component';
import { TrainerNavigationService } from '../../../../core/services/trainer-navigation.service';
import { CoachRulesApiService } from '../../services/coach-rules-api.service';
import {
  CoachRule,
  RULE_GROUP_LABELS,
  RULE_LEVELS,
  RULE_TRIGGERS,
  RuleAction,
  RuleCatalog,
  RuleCondition,
  RuleLevel,
  RuleMetric,
  RuleOperator,
  RuleTrigger,
} from '../../models/coach-rule.model';

type ViewState = 'loading' | 'error' | 'loaded';

const MAX_CONDITIONS = 5;
const MAX_ACTIONS = 3;

// Fase 3 Coach Pro — el constructor visual (§11 de la especificación).
//
// La regla se compone eligiendo de listas, nunca escribiendo expresiones: no
// hay campo de texto donde quepa una sintaxis, y los operadores que se
// ofrecen dependen de la métrica elegida (el catálogo del backend los trae
// ya filtrados). Eso hace imposible construir una regla sin sentido —
// "el nivel de estrés ha bajado un 5%" ni siquiera aparece como opción.
//
// La página lee el vocabulario del backend en vez de traerlo escrito: si
// mañana se añade una métrica al catálogo, aparece aquí sin tocar el
// frontend.
@Component({
  selector: 'app-rule-builder',
  templateUrl: 'rule-builder.page.html',
  styleUrls: ['rule-builder.page.scss'],
})
export class RuleBuilderPage implements OnInit, PendingChangesComponent {
  public readonly levels = RULE_LEVELS;
  public readonly triggers = RULE_TRIGGERS;
  public readonly groupLabels = RULE_GROUP_LABELS;
  public readonly maxConditions = MAX_CONDITIONS;
  public readonly maxActions = MAX_ACTIONS;

  public state: ViewState = 'loading';
  public catalog: RuleCatalog | null = null;
  public isNew = true;
  public isSaving = false;
  public ruleId: string | null = null;

  // --- La regla en construcción ---
  public name = '';
  public description = '';
  public level: RuleLevel = 'informative';
  public trigger: RuleTrigger = 'daily';
  public conditionLogic: 'all' | 'any' = 'all';
  public conditions: RuleCondition[] = [];
  public actions: RuleAction[] = [];
  public appliesTo: 'all_clients' | 'selected' = 'all_clients';
  public clientIds: string[] = [];
  public selectedClientNames: string[] = [];

  // Índice por clave, para no recorrer el catálogo en cada consulta de la
  // plantilla (que se evalúa en cada ciclo de detección de cambios).
  private metricsByKey = new Map<string, RuleMetric>();

  // Referencia de "lo último guardado" para pendingChangesGuard: esta pantalla
  // no autoguarda, así que salir sin guardar pierde la regla entera.
  private savedSnapshot = '';

  constructor(
    private coachRulesApi: CoachRulesApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private navigation: TrainerNavigationService
  ) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = !id || id === 'new';
    this.ruleId = this.isNew ? null : id;
    this.load();
  }

  private load(): void {
    this.state = 'loading';
    this.coachRulesApi.getCatalog().subscribe({
      next: (catalog) => {
        this.catalog = catalog;
        this.metricsByKey = new Map(catalog.metrics.map((m) => [m.key, m]));
        if (this.isNew) {
          this.seedNewRule();
          this.savedSnapshot = this.snapshot();
          this.state = 'loaded';
        } else {
          this.loadExistingRule();
        }
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Una regla nueva arranca con una condición y una alerta ya puestas: la
  // pantalla en blanco con un botón "añadir condición" obliga a entender el
  // modelo antes de poder tocar nada.
  private seedNewRule(): void {
    this.conditions = [this.emptyCondition()];
    this.actions = [{ type: 'create_alert', message: '', priority: 'medium' }];
  }

  private loadExistingRule(): void {
    this.coachRulesApi.getMine().subscribe({
      next: (rules) => {
        const rule = rules.find((r) => r._id === this.ruleId);
        if (!rule) {
          this.state = 'error';
          return;
        }
        this.applyRule(rule);
        this.savedSnapshot = this.snapshot();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private applyRule(rule: CoachRule): void {
    this.name = rule.name;
    this.description = rule.description || '';
    this.level = rule.level;
    this.trigger = rule.trigger;
    this.conditionLogic = rule.conditionLogic;
    this.conditions = rule.conditions.map((c) => ({ ...c }));
    this.actions = rule.actions.map((a) => ({ ...a }));
    this.appliesTo = rule.appliesTo;
    this.clientIds = [...(rule.clientIds || [])];
  }

  private emptyCondition(): RuleCondition {
    const first = this.catalog?.metrics[0];
    return {
      metric: first?.key || '',
      operator: first?.operators[0]?.key || '',
      value: 0,
      periodDays: this.catalog?.periods[1]?.days || 14,
    };
  }

  // --- Métrica y operadores ---

  public metricFor(condition: RuleCondition): RuleMetric | null {
    return this.metricsByKey.get(condition.metric) || null;
  }

  public operatorsFor(condition: RuleCondition): RuleOperator[] {
    return this.metricFor(condition)?.operators || [];
  }

  public unitFor(condition: RuleCondition): string {
    const operator = this.operatorsFor(condition).find((o) => o.key === condition.operator);
    // Los operadores de variación llevan su propio sufijo (%), que gana
    // sobre la unidad de la métrica: "ha bajado más de 2 kg" sería otra
    // pregunta distinta de la que este operador hace.
    return operator?.suffix || this.metricFor(condition)?.unit || '';
  }

  public showsPeriod(condition: RuleCondition): boolean {
    return this.metricFor(condition)?.periodAware === true;
  }

  // Al cambiar de métrica, el operador anterior puede no aplicar a la nueva.
  // Se reemplaza por el primero válido en vez de dejar una combinación que
  // el backend rechazaría al guardar.
  public onMetricChange(condition: RuleCondition): void {
    const operators = this.operatorsFor(condition);
    if (!operators.some((o) => o.key === condition.operator)) {
      condition.operator = operators[0]?.key || '';
    }
  }

  public get metricGroups(): { key: string; label: string; metrics: RuleMetric[] }[] {
    if (!this.catalog) return [];
    const groups = new Map<string, RuleMetric[]>();
    for (const metric of this.catalog.metrics) {
      if (!groups.has(metric.group)) groups.set(metric.group, []);
      groups.get(metric.group)?.push(metric);
    }
    return [...groups.entries()].map(([key, metrics]) => ({
      key,
      label: this.groupLabels[key] || key,
      metrics,
    }));
  }

  // --- Condiciones y acciones ---

  public addCondition(): void {
    if (this.conditions.length >= MAX_CONDITIONS) return;
    this.conditions = [...this.conditions, this.emptyCondition()];
  }

  public removeCondition(index: number): void {
    if (this.conditions.length <= 1) return;
    this.conditions = this.conditions.filter((_, i) => i !== index);
  }

  public addAction(type: 'create_task'): void {
    if (this.actions.length >= MAX_ACTIONS) return;
    if (this.actions.some((a) => a.type === type)) return;
    this.actions = [...this.actions, { type, message: '' }];
  }

  public removeAction(index: number): void {
    const action = this.actions[index];
    // La alerta es obligatoria: sin ella la regla actuaría en silencio y no
    // habría dónde ver que se disparó (el backend también lo rechaza).
    if (action?.type === 'create_alert') return;
    this.actions = this.actions.filter((_, i) => i !== index);
  }

  public get hasTaskAction(): boolean {
    return this.actions.some((a) => a.type === 'create_task');
  }

  public get alertAction(): RuleAction | undefined {
    return this.actions.find((a) => a.type === 'create_alert');
  }

  // Los niveles "sugerir" y "automático" solo tienen sentido si hay una
  // tarea que sugerir o crear. Se avisa en vez de dejar elegir un nivel que
  // no haría nada.
  public get levelNeedsTask(): boolean {
    return (this.level === 'suggestion' || this.level === 'automatic') && !this.hasTaskAction;
  }

  // --- Alcance ---

  public async openClientPicker(): Promise<void> {
    const modal = await this.modalController.create({
      component: SelectClientsModalComponent,
      componentProps: { preselectedIds: this.clientIds },
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role !== 'confirm' || !data?.targetClientIds) return;
    this.clientIds = data.targetClientIds;
  }

  // --- Guardar ---

  public get validationError(): string | null {
    if (!this.name.trim()) return 'Ponle un nombre a la automatización.';
    if (!this.conditions.length) return 'Añade al menos una condición.';
    if (this.conditions.some((c) => !c.metric || !c.operator)) {
      return 'Completa todas las condiciones.';
    }
    if (this.conditions.some((c) => !Number.isFinite(Number(c.value)))) {
      return 'Cada condición necesita un valor numérico.';
    }
    if (!this.alertAction?.message.trim()) {
      return 'Escribe el aviso que quieres recibir.';
    }
    if (this.hasTaskAction && !this.actions.find((a) => a.type === 'create_task')?.message.trim()) {
      return 'Escribe el título de la tarea.';
    }
    if (this.levelNeedsTask) {
      return 'Ese nivel necesita una tarea. Añádela o cambia a "Solo informar".';
    }
    if (this.appliesTo === 'selected' && !this.clientIds.length) {
      return 'Elige a qué clientes se aplica.';
    }
    return null;
  }

  private buildPayload(): Partial<CoachRule> {
    return {
      name: this.name.trim(),
      description: this.description.trim(),
      level: this.level,
      trigger: this.trigger,
      conditions: this.conditions.map((c) => ({ ...c, value: Number(c.value) })),
      conditionLogic: this.conditionLogic,
      actions: this.actions.map((a) => ({ ...a, message: a.message.trim() })),
      appliesTo: this.appliesTo,
      clientIds: this.appliesTo === 'selected' ? this.clientIds : [],
      enabled: true,
    };
  }

  private snapshot(): string {
    return JSON.stringify(this.buildPayload());
  }

  public async canDeactivate(): Promise<boolean> {
    if (this.state !== 'loaded' || this.snapshot() === this.savedSnapshot) return true;
    return confirmDiscardChanges(this.ionicUtilService);
  }

  public save(): void {
    const error = this.validationError;
    if (error) {
      void this.ionicUtilService.showWarningToast(error);
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;

    const payload = this.buildPayload();

    const request$ = this.isNew
      ? this.coachRulesApi.create(payload)
      : this.coachRulesApi.update(this.ruleId as string, payload);

    request$.subscribe({
      next: () => {
        this.isSaving = false;
        // Guardado: ya no hay cambios pendientes que confirmar al salir.
        this.savedSnapshot = JSON.stringify(payload);
        void this.router.navigate(['/tabs/automations']);
      },
      error: (error) => {
        this.isSaving = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo guardar la automatización');
      },
    });
  }

  // El botón de la cabecera lo resuelve app-page-header; esto lo usa el
  // estado de error de la plantilla ("Volver").
  public goBack(): void {
    this.navigation.back();
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
