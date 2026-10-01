import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CoachRulesApiService } from './services/coach-rules-api.service';
import {
  CoachRule,
  RULE_LEVELS,
  RULE_TRIGGERS,
  RuleLevel,
  RuleTrigger,
} from './models/coach-rule.model';

type ViewState = 'loading' | 'error' | 'loaded';

const LEVEL_LABELS: Record<RuleLevel, string> = RULE_LEVELS.reduce(
  (acc, l) => ({ ...acc, [l.key]: l.label }),
  {} as Record<RuleLevel, string>
);

const TRIGGER_LABELS: Record<RuleTrigger, string> = RULE_TRIGGERS.reduce(
  (acc, t) => ({ ...acc, [t.key]: t.label }),
  {} as Record<RuleTrigger, string>
);

// Fase 3 Coach Pro — listado de automatizaciones. El constructor vive en su
// propia ruta (/tabs/automations/:id) porque una regla es un formulario
// largo: dentro de un panel deslizante, el botón de volver del móvil
// cerraría la pantalla entera en vez de la regla a medio escribir.
@Component({
  selector: 'app-automations',
  templateUrl: 'automations.page.html',
  styleUrls: ['automations.page.scss'],
})
export class AutomationsPage {
  private readonly translate = inject(TranslateService);

  public state: ViewState = 'loading';
  public rules: CoachRule[] = [];
  private togglingIds = new Set<string>();

  constructor(
    private coachRulesApi: CoachRulesApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.coachRulesApi.getMine().subscribe({
      next: (rules) => {
        this.rules = rules;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public levelLabel(rule: CoachRule): string {
    return LEVEL_LABELS[rule.level] || this.translate.instant('AUTOMATIONS.SOLO_INFORMAR');
  }

  public triggerLabel(rule: CoachRule): string {
    return TRIGGER_LABELS[rule.trigger] || this.translate.instant('AUTOMATIONS.CADA_DIA');
  }

  public scopeLabel(rule: CoachRule): string {
    if (rule.appliesTo === 'all_clients') return this.translate.instant('AUTOMATIONS.TODOS_TUS_CLIENTES');
    const count = rule.clientIds?.length || 0;
    return `${count} cliente${count === 1 ? '' : 's'}`;
  }

  public conditionsLabel(rule: CoachRule): string {
    const count = rule.conditions?.length || 0;
    const joiner = rule.conditionLogic === 'any' ? 'o' : 'y';
    return count === 1 ? this.translate.instant('AUTOMATIONS.CONDICION', { count, joiner }) : `${count} condiciones (${joiner})`;
  }

  public isToggling(rule: CoachRule): boolean {
    return this.togglingIds.has(rule._id);
  }

  public toggleRule(rule: CoachRule, event: Event): void {
    event.stopPropagation();
    if (this.togglingIds.has(rule._id)) return;

    const next = !rule.enabled;
    this.togglingIds.add(rule._id);
    rule.enabled = next;
    // Reactivar a mano limpia el cartel de "se desactivó sola": el motivo ya
    // no describe el estado actual.
    if (next) rule.disabledReason = null;

    this.coachRulesApi.toggle(rule._id, next).subscribe({
      next: () => this.togglingIds.delete(rule._id),
      error: (error) => {
        this.togglingIds.delete(rule._id);
        rule.enabled = !next;
        void this.ionicUtilService.showErrorToast(error, this.translate.instant('AUTOMATIONS.NO_SE_PUDO_CAMBIAR_EL'));
      },
    });
  }

  public openRule(rule: CoachRule): void {
    void this.router.navigate(['/tabs/automations', rule._id]);
  }

  public createRule(): void {
    void this.router.navigate(['/tabs/automations', 'new']);
  }

  public async confirmDelete(rule: CoachRule, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('AUTOMATIONS.ELIMINAR_AVISO_AUTOMATIZADO'),
      message: this.translate.instant('AUTOMATIONS.DEJARA_DE_EVALUARSE_LAS_ALERTAS', { name: rule.name }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.coachRulesApi.remove(rule._id).subscribe({
              next: () => {
                this.rules = this.rules.filter((r) => r._id !== rule._id);
              },
              error: (error) =>
                void this.ionicUtilService.showErrorToast(error, this.translate.instant('AUTOMATIONS.NO_SE_PUDO_ELIMINAR_LA')),
            });
          },
        },
      ],
    });
  }

  public trackByRuleId(_index: number, rule: CoachRule): string {
    return rule._id;
  }
}
