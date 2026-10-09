import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Exercise } from "src/app/core/models/exercise";
import { ExerciseService } from "src/app/core/services/exercise/exercise.service";
import { SearchFilterGroupExercises } from "../../models/filterGroup";
import { MUSCLE_GROUPS, MuscleGroup } from "src/app/core/constants/muscle-catalog";

type ExerciseTypeFilter = "all" | "strength" | "cardio" | "isometric";

@Component({
  selector: "app-filter-input",
  templateUrl: "./filter-input.page.html",
  styleUrls: ["./filter-input.page.scss"],
})
export class FilterInputPage implements OnInit {
  // From exercises component
  public searchFilterGroupExercises: SearchFilterGroupExercises;
  public exercises: Exercise[];
  public isCreateMode: boolean = false;
  public showExerciseTypeFilter: boolean = false;
  // Quien abre los filtros puede relanzar él la búsqueda (el buscador
  // paginado necesita el total y volver a la primera página). Sin él, se
  // busca aquí y se publica la lista en ExerciseService, como siempre.
  public onFiltersChange?: () => void;

  public categories = [
    "Cardio",
    "Empujes",
    "Tirón",
    "Tirón horizontal",
    "Tirón vertical",
    "Cadena posterior",
    "Cadena anterior",
    "Tren inferior",
    "Torso/Tren superior",
  ];

  // Catálogo muscular de dos niveles (2026-09): los 14 grupos a la vista y,
  // al elegir uno, sus porciones para afinar. El cliente casi siempre busca
  // "pectoral"; el entrenador puede bajar a "pectoral superior".
  public readonly muscleGroups = MUSCLE_GROUPS;

  public equipment: string[] = [
    "Barra",
    "Mancuernas",
    "Polea",
    "Peso corporal",
    "Kettlebell",
    "Máquina",
    "Máquina smith/multipower",
    "Disco",
    "Banda elástica",
  ];

  constructor(
    private exerciseService: ExerciseService,
    private modalController: ModalController,
  ) {}

  public ngOnInit(): void {}

  public get selectedExerciseType(): ExerciseTypeFilter {
    if (this.searchFilterGroupExercises.isStrength) return "strength";
    if (this.searchFilterGroupExercises.isCardio) return "cardio";
    if (this.searchFilterGroupExercises.isIsometric) return "isometric";
    return "all";
  }

  public selectExerciseType(type: ExerciseTypeFilter): void {
    if (this.selectedExerciseType === type) return;

    this.searchFilterGroupExercises.isStrength = type === "strength" ? true : undefined;
    this.searchFilterGroupExercises.isCardio = type === "cardio" ? true : undefined;
    this.searchFilterGroupExercises.isIsometric = type === "isometric" ? true : undefined;
    this.searchExercises();
  }

  public selectCategory(category: string): void {
    if (this.searchFilterGroupExercises.category.includes(category)) {
      const indexCategory =
        this.searchFilterGroupExercises.category.indexOf(category);
      this.searchFilterGroupExercises.category.splice(indexCategory, 1);
    } else {
      this.searchFilterGroupExercises.category.push(category);
    }

    this.searchExercises();
  }

  private get selectedMuscles(): string[] {
    // Filtros guardados antes de 2026-09 no traen el campo.
    return (this.searchFilterGroupExercises.muscles ||= []);
  }

  public isMuscleSelected(id: string): boolean {
    return this.selectedMuscles.includes(id);
  }

  // Un grupo está activo si se filtra por él entero o por alguna porción.
  public isGroupActive(group: MuscleGroup): boolean {
    return (
      this.isMuscleSelected(group.id) ||
      group.muscles.some((portion) => this.isMuscleSelected(portion.id))
    );
  }

  public toggleMuscleGroup(group: MuscleGroup): void {
    const ids = [group.id, ...group.muscles.map((portion) => portion.id)];
    const wasActive = this.isGroupActive(group);
    this.searchFilterGroupExercises.muscles = this.selectedMuscles.filter(
      (id) => !ids.includes(id),
    );
    if (!wasActive) this.selectedMuscles.push(group.id);
    this.searchExercises();
  }

  // Afinar sustituye al grupo entero por las porciones elegidas; quitar la
  // última porción vuelve al grupo entero en vez de dejarlo sin filtro.
  public toggleMusclePortion(group: MuscleGroup, portionId: string): void {
    const selected = this.selectedMuscles.filter((id) => id !== group.id);
    const next = selected.includes(portionId)
      ? selected.filter((id) => id !== portionId)
      : [...selected, portionId];
    const hasPortion = group.muscles.some((portion) => next.includes(portion.id));
    this.searchFilterGroupExercises.muscles = hasPortion ? next : [...next, group.id];
    this.searchExercises();
  }

  public selectEquipment(equipment: string): void {
    if (this.searchFilterGroupExercises.equipment.includes(equipment)) {
      const indexEquipment =
        this.searchFilterGroupExercises.equipment.indexOf(equipment);
      this.searchFilterGroupExercises.equipment.splice(indexEquipment, 1);
    } else {
      this.searchFilterGroupExercises.equipment.push(equipment);
    }

    this.searchExercises();
  }

  private searchExercises(): void {
    if (this.isCreateMode) return;
    if (this.onFiltersChange) {
      this.onFiltersChange();
      return;
    }
    this.exerciseService
      .searchExercise(this.searchFilterGroupExercises)
      .subscribe((resExercises) => {
        this.exerciseService.setExercises = resExercises;
      });
  }

  public close(): void {
    this.modalController.dismiss({
      searchFilterGroupExercises: this.searchFilterGroupExercises,
    });
  }
}
