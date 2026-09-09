import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import { WorkoutTemplate } from 'src/app/core/models/workout-template';
import { RoutineTemplateApiService } from 'src/app/core/services/routine-template/routine-template-api.service';
import { Table } from 'src/app/core/models/table';
import { DietTemplateApiService } from '../diet-templates/services/diet-template-api.service';
import { DietTemplate } from '../diet-templates/models/diet-template.model';
// Ruta relativa, no alias: 'src/app/shared/*' apunta al paquete shared-ui
// del monorepo — este shared/ es el local de la app de entrenadores.
import { CategoryCard } from '../../shared/components/category-grid/category-grid.component';

// TASK-003 (MASTER_BACKLOG.md) — la sección "Plantillas de rutinas" mostraba
// 3 tarjetas fijas hardcodeadas ("Hipertrofia 4 días", etc.) cuyo botón
// navegaba a la lista genérica /tabs/routines sin relación real con lo que
// prometía la tarjeta. Ahora muestra las plantillas reales del entrenador
// (WorkoutTemplateApiService, mismo servicio que RoutinesPage) y cada
// tarjeta navega a SU builder concreto (/tabs/routines/:id).
//
// Movimiento 1 Coach Pro — esta página era "Plantillas" y guardaba ocho cosas
// muy distintas: material para el cliente (dietas, rutinas) mezclado con la
// forma de trabajar del entrenador (protocolos, automatizaciones, plantillas
// de check-in). Se queda con lo primero y pasa a llamarse **Biblioteca**; lo
// segundo vive ahora en MethodPage (/tabs/method).
@Component({
  selector: 'app-templates',
  templateUrl: 'templates.page.html',
  styleUrls: ['templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  public readonly categories: CategoryCard[] = [
    {
      name: 'Entrenamientos',
      description: 'Biblioteca de bloques de entrenamiento reutilizables',
      icon: 'barbell-outline',
      colorVar: 'var(--tf-accent)',
      path: '/tabs/routines',
    },
    {
      // Rutinas -> Plantillas (rediseño 2026-08): antes apuntaba a las Table
      // reales ya asignadas a clientes (rutinas en curso, no reutilizables).
      // Ahora es la biblioteca de plantillas de rutina COMPLETA (microciclos/
      // splits/workouts) del profesional, construida con el mismo
      // Planificador que usa con sus clientes — distinta de "Entrenamientos"
      // (plantilla de un solo día/sesión).
      name: 'Rutinas',
      description: 'Plantillas de rutina completa, listas para aplicar a cualquier cliente',
      icon: 'calendar-outline',
      colorVar: 'var(--tf-accent)',
      path: '/tabs/routine-templates',
    },
    {
      name: 'Dietas',
      description: 'Días de comidas reutilizables para aplicar a cualquier cliente',
      icon: 'restaurant-outline',
      colorVar: 'var(--ion-color-tertiary, #ffd359)',
      path: '/tabs/diet-templates',
    },
    {
      // Fase 5 Coach Pro (§16) — qué puede comer el cliente en lugar de qué.
      // Las equivalencias las define el coach: el sistema no las calcula.
      //
      // locked: true — bloqueada como "Próximamente" a propósito (2026-09):
      // la pantalla y el backend ya funcionan, pero se mantiene cerrada al
      // entrenador hasta que se valide del todo. `path` se deja intacto
      // (sigue siendo una ruta real, /tabs/food-exchanges) para no tener que
      // tocarlo el día que se desbloquee — solo hay que quitar esta línea.
      name: 'Intercambios',
      description: 'Grupos de alimentos equivalentes que tus clientes pueden consultar',
      icon: 'swap-horizontal-outline',
      colorVar: 'var(--ion-color-tertiary, #ffd359)',
      path: '/tabs/food-exchanges',
      locked: true,
    },
    {
      name: 'Componer para varios clientes',
      description: 'Pauta la misma comida a un grupo de clientes de una sola vez',
      icon: 'people-circle-outline',
      colorVar: 'var(--tf-accent-2, #4fc79a)',
      path: '/tabs/meal-compose',
    },
    // TASK-042 (MASTER_BACKLOG.md) — antes el catálogo de ejercicios solo era
    // alcanzable como modal picker dentro de construir un workout. Se anida
    // aquí (categoría dentro de "Biblioteca") en vez de como destino nuevo
    // en el sidebar principal, siguiendo el mismo patrón ya usado por
    // rutinas/nutrición/formularios — evita crecer el sidebar
    // (PRODUCT.md > Design Principles) para una pantalla de consulta, no de
    // flujo de trabajo principal.
    {
      name: 'Ejercicios',
      description: 'Consulta el catálogo completo fuera de construir un entrenamiento',
      icon: 'search-outline',
      colorVar: 'var(--tf-danger, #ff5c5c)',
      path: '/tabs/exercises',
    },
  ];

  public routineTemplates: WorkoutTemplate[] = [];
  public loadingRoutineTemplates = true;

  // --- Recientes por tipo (grid de columnas en escritorio) — misma fuente
  // de datos que cada lista completa (RoutinesPage/DietTemplatesListPage),
  // solo recortada a las 4 más nuevas. No hay columna para "Componer para
  // varios clientes"/"Ejercicios": no son plantillas con listado propio, son
  // herramientas.
  public dietTemplates: DietTemplate[] = [];
  public loadingDietTemplates = true;

  // Plantillas de rutina COMPLETA (Table con userId=trainerId, microciclos/
  // splits/workouts) — distinto de "Entrenamientos" arriba (WorkoutTemplate,
  // plantilla de un solo día/sesión). Recortado a las 4 más recientes, mismo
  // criterio que las otras 3 columnas.
  public fullRoutineTemplates: Table[] = [];
  public loadingFullRoutineTemplates = true;

  constructor(
    private workoutTemplateApi: WorkoutTemplateApiService,
    private dietTemplateApi: DietTemplateApiService,
    private routineTemplateApi: RoutineTemplateApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadRoutineTemplates();
    this.loadDietTemplates();
    this.loadFullRoutineTemplates();
  }

  // Mismo bug de caché de ion-router-outlet ya corregido en RoutinesPage/
  // DietTemplatesListPage — sin esto, tras crear una plantilla desde aquí y
  // volver, la preview seguiría mostrando el estado anterior.
  public ionViewWillEnter(): void {
    this.loadRoutineTemplates();
    this.loadDietTemplates();
    this.loadFullRoutineTemplates();
  }

  private loadRoutineTemplates(): void {
    this.loadingRoutineTemplates = true;
    this.workoutTemplateApi.list().subscribe({
      next: (templates) => {
        this.routineTemplates = templates
          .slice()
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
          .slice(0, 4);
        this.loadingRoutineTemplates = false;
      },
      error: () => {
        this.routineTemplates = [];
        this.loadingRoutineTemplates = false;
      },
    });
  }

  private loadDietTemplates(): void {
    this.loadingDietTemplates = true;
    this.dietTemplateApi.list().subscribe({
      next: (templates) => {
        this.dietTemplates = (templates || [])
          .slice()
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
          .slice(0, 4);
        this.loadingDietTemplates = false;
      },
      error: () => {
        this.dietTemplates = [];
        this.loadingDietTemplates = false;
      },
    });
  }

  private loadFullRoutineTemplates(): void {
    this.loadingFullRoutineTemplates = true;
    this.routineTemplateApi.list().subscribe({
      next: (templates) => {
        // Table no tiene createdAt (a diferencia de WorkoutTemplate/
        // DietTemplate) — el ObjectId ya codifica el instante de creación en
        // sus primeros 8 caracteres hex, así que ordena igual de bien sin
        // depender de un campo que no existe.
        this.fullRoutineTemplates = templates
          .slice()
          .sort((a, b) => b._id.localeCompare(a._id))
          .slice(0, 4);
        this.loadingFullRoutineTemplates = false;
      },
      error: () => {
        this.fullRoutineTemplates = [];
        this.loadingFullRoutineTemplates = false;
      },
    });
  }

  public async openFullRoutineTemplate(template: Table): Promise<void> {
    await this.router.navigate(['/tabs', 'routine-templates', template._id, 'planner']);
  }

  public trackByFullRoutineTemplateId(_index: number, template: Table): string {
    return template._id;
  }

  public fullRoutineTemplateMeta(template: Table): string {
    const microcycles = (template.splits || []).length;
    return `${microcycles} microciclo${microcycles === 1 ? '' : 's'}`;
  }

  public exerciseCount(template: WorkoutTemplate): number {
    return (template.blocks || []).reduce(
      (total, block) => total + (block.exercises?.length || 0),
      0
    );
  }

  public openTemplate(template: WorkoutTemplate): void {
    this.router.navigate(['/tabs/routines', template._id]);
  }

  public openDietTemplate(template: DietTemplate): void {
    this.router.navigate(['/tabs/diet-templates', template._id]);
  }

  public dietTemplateMeta(template: DietTemplate): string {
    return template.mode === 'sequential'
      ? `${template.days.length} día${template.days.length === 1 ? '' : 's'}`
      : `${template.dayPatterns.length} patrón${template.dayPatterns.length === 1 ? '' : 'es'}`;
  }
}
