import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkoutComponent } from './workout.component';

// Planificador visual (Fase C) — WorkoutComponent (<app-workout>) se extrae a
// su propio módulo para poder reutilizarlo fuera de mesocycle.page.ts (la
// nueva feature planner/ en train-fit-trainers lo usa como card del
// tablero, vía @Input() plannerMode). Importar MesocyclePageModule
// directamente arrastraría también MesocyclePageRoutingModule
// (RouterModule.forChild con path:'' → MesocyclePage), lo que competiría con
// la ruta propia del módulo que lo importe — este módulo evita ese problema.
@NgModule({
  imports: [SharedModule, FormsModule, DragDropModule],
  declarations: [WorkoutComponent],
  exports: [WorkoutComponent],
})
export class WorkoutComponentModule {}
