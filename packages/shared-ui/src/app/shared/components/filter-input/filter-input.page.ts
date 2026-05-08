import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Exercise } from "src/app/core/models/exercise";
import { ExerciseService } from "src/app/core/services/exercise/exercise.service";
import { UtilService } from "src/app/core/services/util/util.service";
import { SearchFilterGroupExercises } from "../../models/filterGroup";

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

  public muscleGroup1: string[] = [
    "Brazos",
    "Bíceps",
    "Tríceps",
    "Antebrazo",
    "Hombro",
    "Deltoides anterior",
    "Deltoides lateral",
    "Deltoides posterior",
    "Pectoral",
    "Pectoral superior",
    "Pectoral inferior",
    "Abdomen",
    "Cuello",
    "Espalda",
    "Espalda alta",
    "Espalda baja",
    "Piernas",
    "Cuádriceps",
    "Aductor",
    "Femoral",
    "Glúteo",
    "Gemelo",
    "Sóleo",
  ];

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
    private utilService: UtilService,
  ) {}

  public ngOnInit(): void {}

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

  public selectMuscleGroup1(muscle: string): void {
    if (this.searchFilterGroupExercises.muscleGroups1.includes(muscle)) {
      const indexCategory =
        this.searchFilterGroupExercises.muscleGroups1.indexOf(muscle);
      this.searchFilterGroupExercises.muscleGroups1.splice(indexCategory, 1);
    } else {
      this.searchFilterGroupExercises.muscleGroups1.push(muscle);
    }
    this.searchExercises();
  }

  public selectMuscleGroup2(muscle: string): void {
    if (this.searchFilterGroupExercises.muscleGroups2.includes(muscle)) {
      const indexCategory =
        this.searchFilterGroupExercises.muscleGroups2.indexOf(muscle);
      this.searchFilterGroupExercises.muscleGroups2.splice(indexCategory, 1);
    } else {
      this.searchFilterGroupExercises.muscleGroups2.push(muscle);
    }
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
