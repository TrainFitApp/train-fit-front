import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from './services/client-detail-api.service';
import {
  AnthropometryEntry,
  ClientScope,
  ClientTable,
  DietDaySummary,
  NutritionalGoal,
} from './models/client-detail.model';

type SectionState = 'loading' | 'error' | 'loaded';
type RoutineAssignMode = 'new' | 'template';

@Component({
  selector: 'app-client-detail',
  templateUrl: 'client-detail.page.html',
  styleUrls: ['client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {
  public clientId = '';
  public name = '';
  public scopes: ClientScope[] = [];
  public activeTab: ClientScope = 'training';

  // --- Entrenamiento ---
  public trainingState: SectionState = 'loading';
  public tables: ClientTable[] = [];
  public latestWeight: AnthropometryEntry | null = null;
  public showRoutinePanel = false;
  public routineMode: RoutineAssignMode = 'new';
  public routineForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  public availableTemplates: ClientTable[] = [];
  public templatesLoaded = false;
  public isAssigningRoutine = false;

  // --- Nutrición ---
  public nutritionState: SectionState = 'loading';
  public dietDay: DietDaySummary | null = null;
  public goals: NutritionalGoal[] = [];
  public showGoalPanel = false;
  public goalForm: FormGroup = new FormGroup({
    name: new FormControl('Objetivo asignado', Validators.required),
    kcalTotal: new FormControl(null, [Validators.required, Validators.min(1)]),
    proteinsGTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
    carbohydratesGTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
    fatGTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
  });
  public isAssigningGoal = false;
  public isRevoking = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') || '';
    this.name = this.route.snapshot.queryParamMap.get('name') || 'Cliente';
    const rawScopes = this.route.snapshot.queryParamMap.get('scopes') || '';
    this.scopes = rawScopes
      .split(',')
      .filter((s): s is ClientScope => s === 'training' || s === 'nutrition');

    this.activeTab = this.scopes[0] || 'training';

    if (this.scopes.includes('training')) this.loadTraining();
    if (this.scopes.includes('nutrition')) this.loadNutrition();
  }

  public selectTab(scope: ClientScope): void {
    this.activeTab = scope;
  }

  // --- Entrenamiento ---
  public loadTraining(): void {
    this.trainingState = 'loading';
    Promise.all([
      this.clientDetailApi.getTables(this.clientId).toPromise(),
      this.clientDetailApi.getAnthropometry(this.clientId).toPromise(),
    ])
      .then(([tables, weights]) => {
        this.tables = tables || [];
        this.latestWeight = (weights && weights[0]) || null;
        this.trainingState = 'loaded';
      })
      .catch(() => {
        this.trainingState = 'error';
      });
  }

  public openRoutinePanel(): void {
    this.showRoutinePanel = true;
    this.routineMode = 'new';
    this.routineForm.reset({ name: '' });
    if (!this.templatesLoaded) {
      this.clientDetailApi.getAvailableTemplates(this.clientId).subscribe((templates) => {
        this.availableTemplates = templates || [];
        this.templatesLoaded = true;
      });
    }
  }

  public closeRoutinePanel(): void {
    this.showRoutinePanel = false;
  }

  public setRoutineMode(mode: RoutineAssignMode): void {
    this.routineMode = mode;
  }

  public submitNewRoutine(): void {
    const name = this.routineForm.value.name?.trim();
    if (!name || this.isAssigningRoutine) return;

    this.isAssigningRoutine = true;
    this.clientDetailApi.assignNewRoutine(this.clientId, name).subscribe({
      next: () => this.onRoutineAssigned(name),
      error: (err) => this.onRoutineAssignError(err),
    });
  }

  public assignTemplate(template: ClientTable): void {
    if (this.isAssigningRoutine) return;
    this.isAssigningRoutine = true;
    this.clientDetailApi.assignTemplateRoutine(this.clientId, template._id).subscribe({
      next: () => this.onRoutineAssigned(template.name),
      error: (err) => this.onRoutineAssignError(err),
    });
  }

  private onRoutineAssigned(name: string): void {
    this.isAssigningRoutine = false;
    this.showRoutinePanel = false;
    this.ionicUtilService.showToast({
      message: `Rutina "${name}" asignada a ${this.name}`,
      duration: 3000,
    });
    this.loadTraining();
  }

  private onRoutineAssignError(err: any): void {
    this.isAssigningRoutine = false;
    this.ionicUtilService.showErrorToast(
      err?.error?.message || 'No se pudo asignar la rutina',
      'Error',
      3500
    );
  }

  // --- Nutrición ---
  public loadNutrition(): void {
    this.nutritionState = 'loading';
    Promise.all([
      this.clientDetailApi.getDiet(this.clientId).toPromise(),
      this.clientDetailApi.getNutritionalGoals(this.clientId).toPromise(),
    ])
      .then(([dietDay, goals]) => {
        this.dietDay = dietDay || null;
        this.goals = goals || [];
        this.nutritionState = 'loaded';
      })
      .catch(() => {
        this.nutritionState = 'error';
      });
  }

  public openGoalPanel(): void {
    this.showGoalPanel = true;
    this.goalForm.reset({
      name: 'Objetivo asignado',
      kcalTotal: null,
      proteinsGTotal: null,
      carbohydratesGTotal: null,
      fatGTotal: null,
    });
  }

  public closeGoalPanel(): void {
    this.showGoalPanel = false;
  }

  public submitGoal(): void {
    if (this.goalForm.invalid || this.isAssigningGoal) {
      this.goalForm.markAllAsTouched();
      return;
    }

    this.isAssigningGoal = true;
    this.clientDetailApi.assignNutritionalGoal(this.clientId, this.goalForm.value).subscribe({
      next: () => {
        this.isAssigningGoal = false;
        this.showGoalPanel = false;
        this.ionicUtilService.showToast({
          message: `Objetivos actualizados para ${this.name}`,
          duration: 3000,
        });
        this.loadNutrition();
      },
      error: (err) => {
        this.isAssigningGoal = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudieron asignar los objetivos',
          'Error',
          3500
        );
      },
    });
  }

  public prescribeMeal(): void {
    this.ionicUtilService.showToast({
      message: 'Pautar comida detallada llega pronto (F12)',
      duration: 2500,
    });
  }

  public mealContentSummary(meal: { customProducts: unknown[]; customRecipes: unknown[] }): string {
    const products = meal.customProducts?.length || 0;
    const recipes = meal.customRecipes?.length || 0;
    if (!products && !recipes) return 'Vacía';
    const parts: string[] = [];
    if (products) parts.push(`${products} producto${products === 1 ? '' : 's'}`);
    if (recipes) parts.push(`${recipes} receta${recipes === 1 ? '' : 's'}`);
    return parts.join(' · ');
  }

  public trackByTableId(_index: number, table: ClientTable): string {
    return table._id;
  }

  public trackByGoalId(_index: number, goal: NutritionalGoal): string {
    return goal._id;
  }

  // --- F08: finalizar relación (lado profesional) ---
  public async confirmRevoke(scope: ClientScope): Promise<void> {
    const scopeLabel = scope === 'training' ? 'entrenamiento' : 'nutrición';
    await this.ionicUtilService.showAlert({
      header: 'Finalizar relación',
      message: `¿Seguro que quieres dejar de llevar el ${scopeLabel} de ${this.name}? Esta acción es inmediata y no se puede deshacer.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Finalizar',
          cssClass: 'alert-button-danger',
          handler: () => this.revoke(scope),
        },
      ],
    });
  }

  private revoke(scope: ClientScope): void {
    this.isRevoking = true;
    this.clientDetailApi.revokeRelation(this.clientId, scope).subscribe({
      next: () => {
        this.isRevoking = false;
        this.scopes = this.scopes.filter((s) => s !== scope);
        if (!this.scopes.length) {
          this.ionicUtilService.showToast({
            message: `Ya no llevas a ${this.name}`,
            duration: 3000,
          });
          void this.router.navigate(['/tabs/clients']);
          return;
        }
        this.activeTab = this.scopes[0];
        this.ionicUtilService.showToast({
          message: `Relación de ${scope === 'training' ? 'entrenamiento' : 'nutrición'} finalizada`,
          duration: 3000,
        });
      },
      error: () => {
        this.isRevoking = false;
        this.ionicUtilService.showErrorToast('No se pudo finalizar la relación', 'Error', 3000);
      },
    });
  }
}
