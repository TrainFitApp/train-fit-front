import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  AlertButton,
  AlertInput,
  AlertOptions,
  ItemReorderEventDetail,
  ModalController,
  ModalOptions,
  Platform,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Subscription, lastValueFrom } from 'rxjs';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Exercise } from 'src/app/core/models/exercise';
import { Set } from 'src/app/core/models/set';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { SetService } from 'src/app/core/services/set/set.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ManageSetComponent } from 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';

import { ExerciseService } from '../../../../core/services/exercise/exercise.service';
import { SearchExercisesPage } from 'src/app/shared/components/search-exercises/search-exercises.page';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';
import { FilterInputPage } from 'src/app/shared/components/filter-input/filter-input.page';

@Component({
  selector: 'app-config-exercise',
  templateUrl: './config-exercise.page.html',
  styleUrls: ['./config-exercise.page.scss'],
})
export class ConfigExercisePage implements OnInit {
  public muscleGroups: string[] = [
    'Espalda',
    'Pecho',
    'Pierna',
    'Hombros',
    'Brazos',
    'Abdominales',
  ];

  public tableInUse: Table;
  public form: FormGroup;
  public exercise: Exercise;
  public videoUrl: string;
  public exercises: Exercise[] = [];
  public workout: Workout;
  public workoutIndex: number;
  public user: User;
  public notes: string;
  public details: SearchFilterGroupExercises = new SearchFilterGroupExercises();

  public noteToCreate: boolean;
  public setList: Set[] = [];
  public setsToCreate: Set[] = [];
  public setsToUpdate: Set[] = [];
  public setsToDelete: string[] = [];
  public idCounter: number = 0;

  public customExercise: CustomExercise;
  public currentSplit: Split;
  public splitIndex: number;

  public setForm: FormGroup;

  public currentSet: Set;

  public originSetsOrdered: Set[] = [];

  public exerciseArchived: boolean;
  public isArchiving: boolean;

  public isExerciseFavorited: boolean = false;
  public isFavoritingExercise: boolean = false;

  public backButton$: Subscription;

  public load = true;
  // Track exercise change to allow revert on "NO GUARDAR"
  public originalExercise?: Exercise;
  public exerciseChanged: boolean = false;
  public videoEmbedSrcSafe: any;

  public isCreateMode: boolean;

  public showFilters: boolean = true;
  public isOwnExercise: boolean = false;

  public filterCategories = [
    'Cardio',
    'Empujes',
    'Tirón horizontal',
    'Tirón vertical',
    'Cadena posterior',
    'Cadena anterior',
    'Tren inferior',
    'Torso/Tren superior',
  ];

  public filterMuscleGroup1: string[] = [
    'Brazos',
    'Bíceps',
    'Tríceps',
    'Antebrazo',
    'Hombro',
    'Deltoides anterior',
    'Deltoides lateral',
    'Deltoides posterior',
    'Pectoral',
    'Pectoral superior',
    'Pectoral inferior',
    'Abdomen',
    'Cuello',
    'Espalda',
    'Espalda alta',
    'Espalda baja',
    'Piernas',
    'Cuádriceps',
    'Aductor',
    'Femoral',
    'Glúteo',
    'Gemelo',
    'Sóleo',
  ];

  public filterEquipment: string[] = [
    'Barra',
    'Mancuernas',
    'Polea',
    'Peso corporal',
    'Kettlebell',
    'Maquina',
    'Maquina smith/multipower',
    'Disco',
    'Banda elástica',
  ];

  private _idExerciseToAdd: string;

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private customExerciseService: CustomExerciseService,
    private workoutService: WorkoutService,
    private setService: SetService,
    private tableService: TableService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private exerciseService: ExerciseService,
    private userService: UserService,
    private platform: Platform,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    if (!this.user) {
      this.user = this.userService.getLocalUser;
    }
    this.isCreateMode = !this.customExercise && !this.exercise;
    this.initForm();
    this.isExerciseArchived();
    this.checkIfExerciseIsFavorited();

    const currentExerciseObj = this.exercise || this.customExercise?.exercise;
    if (currentExerciseObj?.userId === this.user?._id) {
      this.isOwnExercise = true;
    }

    // Establish video URL safely based on available inputs
    if (this.exercise) {
      this.videoUrl = this.exercise.videoUrl;
    } else if (this.customExercise && this.customExercise.exercise) {
      this.videoUrl = this.customExercise.exercise.videoUrl;
    } else {
      this.videoUrl = '';
    }
    this.updateVideoEmbedSrc();

    // Initialize details from current exercise
    const baseExercise = this.exercise || this.customExercise?.exercise;
    if (baseExercise) {
      this.details.category = baseExercise.category
        ? [baseExercise.category]
        : [];
      this.details.muscleGroups1 = baseExercise.muscleGroups1 || [];
      this.details.muscleGroups2 = baseExercise.muscleGroups2 || [];
      this.details.equipment = baseExercise.equipment || [];
    }
  }

  public ionViewDidEnter(): void {
    console.log(this._idExerciseToAdd);
  }

  private parseYouTubeIdFromUrl(url: string): string {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1]?.split('?')[0] || '';
    }
    return '';
  }

  private updateVideoEmbedSrc(): void {
    const id = this.parseYouTubeIdFromUrl(this.videoUrl);
    if (!id) {
      this.videoEmbedSrcSafe = null;
      return;
    }
    const proxyUrl = `https://trainfit.net/youtube-embed.html?v=${id}`;
    this.videoEmbedSrcSafe =
      this.sanitizer.bypassSecurityTrustResourceUrl(proxyUrl);
  }

  public ionViewWillEnter(): void {
    this.initializeBackButtonCustomHandler();
    this.utilService.initFakeModalState();
  }

  public ionViewWillLeave(): void {
    this.backButton$?.unsubscribe();
    this.utilService.endFakeModalState();
  }

  public initForm(): void {
    let exerciseConfig = new CustomExercise();
    // Viene de buscar ejercicios
    if (this.exercise) {
      exerciseConfig.sets = [];
      exerciseConfig.exercise = this.exercise;
      this.originSetsOrdered = [];
    }
    // Viene para editar
    else if (this.customExercise) {
      exerciseConfig = this.customExercise;
      this.notes = this.customExercise.notes;
      this.originSetsOrdered = [...this.customExercise.sets];
      this.setList = [...this.customExercise.sets];
      // Guardar ejercicio original para posibles reversiones
      this.originalExercise = this.customExercise.exercise;
    }
    // Modo creación: sin ejercicio ni customExercise
    else {
      exerciseConfig.sets = [];
      exerciseConfig.exercise = {
        _id: undefined,
        name: '',
        description: '',
        videoUrl: '',
        muscleGroups1: [],
        muscleGroups2: [],
        category: null,
        equipment: [],
        gifUrl: '',
        isCardio: false,
        userId: this.user?._id,
      } as Exercise;
      this.exercise = exerciseConfig.exercise;
      this.originSetsOrdered = [];
    }

    this.form = new FormGroup({
      name: new FormControl(exerciseConfig.exercise.name, Validators.required),
    });
  }

  private isExerciseArchived(): void {
    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise.exercise._id;

    this.exerciseArchived = this.user.archivedExercises.includes(idExercise);
    this.isArchiving = false;
  }

  private checkIfExerciseIsFavorited(): void {
    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise?.exercise?._id;

    if (idExercise && this.user) {
      this.isExerciseFavorited =
        this.user.archivedExercises.includes(idExercise);
    }
    this.isFavoritingExercise = false;
  }

  public changeExercise(): void {
    const modalOptions: ModalOptions = {
      component: SearchExercisesPage,
      componentProps: {
        isChangeMode: true,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) {
        if (
          this.originalExercise &&
          this.originalExercise.isCardio !== res.data.isCardio
        ) {
          const alertOptions: AlertOptions = {
            header: 'Advertencia',
            message:
              'No se puede intercambiar un ejercicio cardiovascular con uno de fuerza',
            buttons: [
              {
                text: 'OK',
                role: 'destructive',
              },
            ],
          };
          this.ionicUtilService.showAlert(alertOptions);
          return;
        }

        this._idExerciseToAdd = res.data._id;

        const exercise: Exercise = res.data;
        this.videoUrl = exercise.videoUrl;
        this.updateVideoEmbedSrc();
        this.form?.controls?.name?.setValue(exercise.name);

        this.exerciseChanged = true;
      }
    });
  }

  public configSets(set?: Set): void {
    const modalOptions: ModalOptions = {
      component: ManageSetComponent,
      componentProps: {
        set: set,
        isCardio: this.customExercise
          ? this.customExercise.exercise.isCardio
          : this.exercise.isCardio,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      // Se ha configurado serie
      if (res.data) {
        const setConfig: Set = res.data;
        // Añadir nueva serie
        const indexSet = this.setList.findIndex(
          (setTemp) => setTemp._id === setConfig._id
        );

        if (indexSet < 0) {
          setConfig._id = --this.idCounter + '';
          setConfig.order = this.setList ? this.setList.length : 0;
          this.setList.push(setConfig);
          this.setsToCreate.push(setConfig);
        }
        // Actualizar serie
        else {
          this.setList[indexSet] = { ...setConfig };

          const indexCreateSet = this.setsToCreate.findIndex(
            (setTemp) => setTemp._id === setConfig._id
          );
          if (indexCreateSet !== -1)
            this.setsToCreate[indexCreateSet] = { ...setConfig };

          const indexUpdateSet = this.setsToUpdate.findIndex(
            (setTemp) => setTemp._id === setConfig._id
          );
          // REVISAR ELSE IF
          if (indexUpdateSet !== -1)
            this.setsToUpdate[indexUpdateSet] = { ...setConfig };
          else if (isNaN(Number(set._id))) this.setsToUpdate.push(setConfig);
        }
      }
    });
  }

  public copySet(set: Set): void {
    const index = this.setList.findIndex((setTemp) => setTemp._id === set._id);
    if (index !== -1) {
      const setCopy = { ...set };
      setCopy._id = --this.idCounter + '';
      this.setList.splice(index + 1, 0, setCopy);
      this.setsToCreate.push(setCopy);
    }
  }

  public async addCustomExercise(): Promise<void> {
    // Prevent saving without a valid name
    if (this.form?.invalid || !this.form?.get('name')?.value?.trim()) {
      return Promise.resolve();
    }
    this.load = false;

    // In create mode, use addDataExerciseToWorkout which handles exercise creation
    if (this.isCreateMode && this.exercise && !this.exercise._id) {
      try {
        // Prepare sets
        this.setList.forEach((setTemp) => delete setTemp._id);
        const newSets = await this.setService
          .createSets(this.setList)
          .toPromise();

        // Prepare exercise data (backend will create it)
        const exerciseData = {
          name: this.form.get('name')?.value?.trim(),
          description: this.exercise.description || '',
          videoUrl: this.videoUrl || '',
          muscleGroups1: this.details.muscleGroups1?.length
            ? this.details.muscleGroups1
            : this.exercise.muscleGroups1 || [],
          muscleGroups2: this.details.muscleGroups2?.length
            ? this.details.muscleGroups2
            : this.exercise.muscleGroups2 || [],
          category: this.details.category?.length
            ? this.details.category[0]
            : this.exercise.category || null,
          equipment: this.details.equipment?.length
            ? this.details.equipment
            : this.exercise.equipment || [],
          keywords: [],
          isCardio: this.exercise.isCardio || false,
          userId: this.user._id,
        };

        // Prepare dataExercise with embedded exercise
        const dataExerciseData = {
          notes: this.notes || null,
          sets: newSets.map((s) => s._id),
          exercise: exerciseData, // Backend will create this and replace with ID
        };

        // Add to workout - backend creates exercise first, then dataExercise
        const updatedWorkout = await this.workoutService
          .addDataExerciseToWorkout(this.workout._id, dataExerciseData)
          .toPromise();

        // Return updated workout so parent can merge changes
        this.load = true;
        this.modalController.dismiss([updatedWorkout]);
        return Promise.resolve();
      } catch (error) {
        console.error('Error creating exercise:', error);
        this.load = true;
        return Promise.reject(error);
      }
    }

    if (this.customExercise) {
      const newCustomExercise = { ...this.customExercise };
      newCustomExercise.sets = this.setList;
      newCustomExercise.notes = this.notes;

      // Guardar información sobre los cambios antes de enviar
      const setsCreatedCount = this.setsToCreate.length;
      const setsUpdatedCount = this.setsToUpdate.length;
      const setsDeletedCount = this.setsToDelete.length;

      return new Promise((resolve) => {
        this.customExerciseService
          .updateCustomExercise(
            newCustomExercise,
            this.setsToCreate,
            this.setsToUpdate,
            this.setsToDelete
          )
          .subscribe((resCustomExercise) => {
            this.customExercise = resCustomExercise;

            const indexCustomExercise = this.workout.exercises.findIndex(
              (exerciseTemp) => exerciseTemp._id === this.customExercise._id
            );
            // this.workout.exercises[indexCustomExercise] = this.customExercise;

            const tableInUse = this.tableService.tableInUse;
            tableInUse.splits[this.splitIndex].workouts[
              this.workoutIndex
            ].exercises[indexCustomExercise] = this.customExercise;

            // Pasar información sobre el tipo de cambio
            const changeInfo = {
              exerciseIndex: indexCustomExercise,
              setsCreated: setsCreatedCount,
              setsUpdated: setsUpdatedCount,
              setsDeleted: setsDeletedCount,
              totalSets: resCustomExercise.sets?.length || 0,
              workoutIndex: this.workoutIndex,
              tableInUse: tableInUse, // Pasar la tabla actualizada
              exerciseChanged: this.exerciseChanged,
            };

            if (!this._idExerciseToAdd) {
              // Cerrar el modal con toda la información necesaria
              this.modalController.dismiss({ setChangeInfo: changeInfo });
              this.load = true;
              resolve();
            } else {
              // Ejecutar la actualización remota y solo resolver cuando termine
              this.updateChangeExercise()
                .then(() => {
                  // Actualizar la tabla en changeInfo con la tabla final del servicio
                  changeInfo.tableInUse = this.tableService.tableInUse;
                  this.modalController.dismiss({ setChangeInfo: changeInfo });
                  this.load = true;
                  resolve();
                })
                .catch(() => {
                  // En caso de error fallback: cerrar modal y resolver
                  changeInfo.tableInUse = this.tableService.tableInUse;
                  this.modalController.dismiss({ setChangeInfo: changeInfo });
                  this.load = true;
                  resolve();
                });
            }
          });
      });
    } else {
      this.setList.forEach((setTemp) => delete setTemp._id);
      let newSets = await this.setService.createSets(this.setList).toPromise();

      let promises = [];
      this.tableInUse.splits.forEach((splitTemp) => {
        splitTemp.workouts.forEach((workoutTemp, index) => {
          if (this.workoutIndex === index) {
            let customExercise = new CustomExercise();
            customExercise.notes = this.notes;
            customExercise.exercise = this.exercise;

            if (workoutTemp._id === this.workout._id) {
              customExercise.sets = newSets;
            }

            promises.push(
              this.workoutService
                .updateWorkout(workoutTemp, customExercise)
                .toPromise()
            );
          }
        });
      });

      if (promises.length > 0) {
        return Promise.all(promises).then((resWorkoutsUpdates: Workout[]) => {
          return this.tableService
            .getTableById(this.user.tableInUse)
            .toPromise()
            .then((resTable) => {
              this.load = true;
              this.tableInUse = resTable;
              this.modalController.dismiss(resWorkoutsUpdates);
            });
        });
      } else {
        this.load = true;
        this.modalController.dismiss();
        return Promise.resolve();
      }
    }
  }

  public selectCategory(category: string): void {
    if (this.details.category.includes(category)) {
      const i = this.details.category.indexOf(category);
      this.details.category.splice(i, 1);
    } else {
      this.details.category.push(category);
    }
  }

  public selectMuscleGroup1(muscle: string): void {
    if (this.details.muscleGroups1.includes(muscle)) {
      const i = this.details.muscleGroups1.indexOf(muscle);
      this.details.muscleGroups1.splice(i, 1);
    } else {
      this.details.muscleGroups1.push(muscle);
    }
  }

  public selectMuscleGroup2(muscle: string): void {
    if (this.details.muscleGroups2.includes(muscle)) {
      const i = this.details.muscleGroups2.indexOf(muscle);
      this.details.muscleGroups2.splice(i, 1);
    } else {
      this.details.muscleGroups2.push(muscle);
    }
  }

  public selectEquipment(equipment: string): void {
    if (this.details.equipment.includes(equipment)) {
      const i = this.details.equipment.indexOf(equipment);
      this.details.equipment.splice(i, 1);
    } else {
      this.details.equipment.push(equipment);
    }
  }

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public openDetailsModal(): void {
    const modalOptions: ModalOptions = {
      component: FilterInputPage,
      cssClass: 'mini-modal',
      componentProps: {
        searchFilterGroupExercises: this.details,
        isCreateMode: this.isCreateMode,
      },
      animated: true,
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      const data = res?.data;
      if (data?.searchFilterGroupExercises) {
        this.details = data.searchFilterGroupExercises;
      }
    });
  }

  public removeDetailCategory(category: string): void {
    const i = this.details.category.indexOf(category);
    if (i >= 0) this.details.category.splice(i, 1);
  }

  public removeDetailMuscle1(m: string): void {
    const i = this.details.muscleGroups1.indexOf(m);
    if (i >= 0) this.details.muscleGroups1.splice(i, 1);
  }

  public removeDetailMuscle2(m: string): void {
    const i = this.details.muscleGroups2.indexOf(m);
    if (i >= 0) this.details.muscleGroups2.splice(i, 1);
  }

  private updateChangeExercise(): Promise<void> {
    if (!this._idExerciseToAdd) return Promise.resolve();
    this.load = false;
    return lastValueFrom(
      this.workoutService.updateCustomExercises(
        this.tableService.tableInUse._id,
        this.workout._id,
        this.customExercise._id,
        this._idExerciseToAdd
      )
    ).then((resTable) => {
      this.tableService.setCurrentTable = resTable;
      const toastOptions: ToastOptions = {
        message: 'Ejercicio sustituido con éxito',
        duration: 2000,
      };
      this.ionicUtilService.showToast(toastOptions);
      this.load = true;
    });
  }

  public async addExerciseToLibrary(): Promise<void> {
    this.isArchiving = true;
    // TODO: En el futuro habrá que tener en cuenta ownExercises cuando
    // se puedan crear ejercicios propios
    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise.exercise._id;

    this.exerciseService
      .archiveExercise(idExercise, this.user._id)
      .subscribe(() => {
        if (this.exerciseArchived)
          this.user.archivedExercises.splice(
            this.user.archivedExercises.findIndex(
              (archivedExercisesTemp) => archivedExercisesTemp === idExercise
            ),
            1
          );
        else this.user.archivedExercises.push(idExercise);

        this.userService.updateUser(this.user).subscribe((resUser) => {
          this.user = resUser;
          setTimeout(() => this.isExerciseArchived(), 1000);
        });
      });
    const toastOptions: ToastOptions = {
      message: this.exerciseArchived
        ? 'Ejercicio eliminado de favoritos'
        : 'Ejercicio añadido a favoritos',
      duration: 2000,
    };
    this.ionicUtilService.showToast(toastOptions);
  }

  public deleteSet(set: Set, setIndex: number) {
    this.setList.splice(setIndex, 1);

    if (isNaN(Number(set._id))) this.setsToDelete.push(set._id);
    else {
      // Comprobar si existen en toCreate y toUpdate
      const indexSetToCreate = this.setsToCreate.findIndex(
        (setTemp) => setTemp._id === set._id
      );
      if (this.setsToCreate.length > 0 && indexSetToCreate >= 0)
        this.setsToCreate.splice(indexSetToCreate);

      const indexSetToUpdate = this.setsToUpdate.findIndex(
        (setTemp) => setTemp._id === set._id
      );
      if (this.setsToUpdate.length > 0 && indexSetToUpdate >= 0)
        this.setsToUpdate.splice(indexSetToUpdate);
    }
  }

  public getExerciseMuscleGroups(): string[] {
    let groups: string[] = [];
    if (this.exercise) {
      groups = this.exercise.muscleGroups1;
    } else if (this.customExercise) {
      groups = this.customExercise.exercise.muscleGroups1;
    }
    return (groups || []).filter((g) => g && g.trim().length > 0);
  }

  public manageNote(): void {
    const alertButtons: AlertButton[] = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: (res) => {
          this.noteToCreate = !!res.notes;
          this.notes = res.notes;
        },
      },
    ];
    const alertInputs: AlertInput[] = [
      {
        name: 'notes',
        type: 'textarea',
        value: this.notes,
        placeholder: 'Tus notas...',
      },
    ];

    const alertOptions: AlertOptions = {
      header: 'Notas',
      inputs: alertInputs,
      buttons: alertButtons,
    };

    this.ionicUtilService.showAlert(alertOptions).then((res) => {
      if (res.data) this.notes = res.data.values.notes;
    });
  }

  public deleteNotes(): void {
    this.notes = undefined;
  }

  public handleReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    const element = this.setList[ev.detail.from];
    this.setList.splice(ev.detail.from, 1);
    this.setList.splice(ev.detail.to, 0, element);
    this.setList.forEach((cesTemp, index) => {
      const setCopy = { ...cesTemp };
      setCopy.order = index;

      // Si tiene ObjectId (UPDATE LIST)
      if (isNaN(Number(setCopy._id))) {
        const indexSetToUpdate = this.setsToUpdate.findIndex(
          (stuTemp) => stuTemp._id === setCopy._id
        );
        if (indexSetToUpdate !== -1)
          this.setsToUpdate[indexSetToUpdate] = setCopy;
        else this.setsToUpdate.push(setCopy);
      }
      // Si tiene id fake
      else {
        const indexSetToCreate = this.setsToCreate.findIndex(
          (stuTemp) => stuTemp._id === setCopy._id
        );
        if (indexSetToCreate > 0) this.setsToCreate[indexSetToCreate] = setCopy;
      }
    });

    ev.detail.complete();
  }

  private checkChanges(): void {
    if (
      this.noteToCreate ||
      this.setsToCreate.length > 0 ||
      this.setsToUpdate.length > 0 ||
      this.setsToDelete.length > 0 ||
      this.exerciseChanged
    ) {
      const alertOptions = {
        header: 'Cambios pendientes',
        message: 'Tienes cambios pendientes',
        cssClass: 'alert-grid-buttons',
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
          },

          {
            text: 'GUARDAR',
            cssClass: 'alert-button-confirm',
            handler: async () => {
              await this.addCustomExercise();
              this.backButton$.unsubscribe();
            },
          },
          {
            text: 'NO GUARDAR',
            role: 'destructive',
            handler: () => {
              // Revertir sets/notas si existen
              if (this.customExercise) {
                this.customExercise.sets = [...this.originSetsOrdered];
                delete this.customExercise.notes;
              }

              this.backButton$.unsubscribe();
              this.modalController.dismiss();
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    } else {
      this.modalController.dismiss();
      this.backButton$.unsubscribe();
    }
  }

  private initializeBackButtonCustomHandler(): void {
    this.backButton$ = this.platform.backButton.subscribeWithPriority(
      9999,
      () => this.checkChanges()
    );
  }

  public close(): void {
    this.checkChanges();
  }

  public addExerciseToFavorites(): void {
    if (!this.user || (!this.exercise && !this.customExercise)) {
      return;
    }

    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise.exercise._id;

    if (!this.user.archivedExercises) {
      this.user.archivedExercises = [];
    }

    this.isFavoritingExercise = true;

    // Call API to persist changes
    this.exerciseService
      .addExerciseToFavorites(idExercise, this.user._id)
      .subscribe({
        next: (response: { isFavorite: boolean; message?: string }) => {
          const isFavorite = !!response?.isFavorite;
          const favoriteSet = new globalThis.Set<string>(
            this.user.archivedExercises
          );

          if (isFavorite) {
            favoriteSet.add(idExercise);
          } else {
            favoriteSet.delete(idExercise);
          }

          this.user.archivedExercises = Array.from(favoriteSet);
          this.isExerciseFavorited = isFavorite;
          this.isFavoritingExercise = false;
        },
        error: (err) => {
          console.error('Error adding exercise to favorites:', err);
          this.isFavoritingExercise = false;
        },
      });
  }

  public async deleteOwnExercise() {
    const currentExerciseObj = this.exercise || this.customExercise?.exercise;

    if (!currentExerciseObj?._id) return;

    const impact = this.getExerciseDeleteImpact(currentExerciseObj._id);
    const impactLines: string[] = [
      'Se eliminará permanentemente este ejercicio creado por ti.',
      'También se borrarán todas sus series y todas las instancias (customExercises) donde se use.',
      'Se quitará automáticamente de favoritos y de cualquier entrenamiento/microciclo donde aparezca.',
    ];

    if (impact.occurrences > 0) {
      impactLines.push(
        `En tu rutina actual afecta a ${impact.occurrences} instancia${
          impact.occurrences === 1 ? '' : 's'
        }, ${impact.workouts} entrenamiento${
          impact.workouts === 1 ? '' : 's'
        } y ${impact.splits} micro-ciclo${impact.splits === 1 ? '' : 's'}.`
      );
    }

    const alertOptions: any = {
      header: 'Eliminar ejercicio',
      message: impactLines.join(' '),
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            this.exerciseService
              .deleteExercise(currentExerciseObj._id)
              .subscribe({
                next: () => {
                  if (this.user?.archivedExercises) {
                    this.user.archivedExercises =
                      this.user.archivedExercises.filter(
                        (id) => id !== currentExerciseObj._id
                      );
                  }

                  const tableInUseRef =
                    this.tableInUse || this.tableService.tableInUse;

                  if (tableInUseRef?.splits) {
                    let shouldUpdateTable = false;
                    tableInUseRef.splits.forEach((s) => {
                      s.workouts.forEach((w: any) => {
                        if (w.exercises) {
                          const originalLength = w.exercises.length;
                          w.exercises = w.exercises.filter((ce: any) => {
                            const exerciseId =
                              typeof ce?.exercise === 'string'
                                ? ce.exercise
                                : ce?.exercise?._id;

                            return exerciseId !== currentExerciseObj._id;
                          });
                          if (w.exercises.length !== originalLength) {
                            shouldUpdateTable = true;
                          }
                        }
                      });
                    });

                    if (shouldUpdateTable) {
                      this.tableInUse = tableInUseRef;
                      this.tableService.setCurrentTable = tableInUseRef;
                    }
                  }

                  this.ionicUtilService.showToast({
                    message: 'Ejercicio eliminado',
                    duration: 2000,
                  });

                  this.modalController.dismiss({
                    setChangeInfo: {
                      exerciseDeleted: true,
                      exerciseIndex:
                        this.workoutIndex !== undefined
                          ? this.workoutIndex
                          : null,
                      tableInUse: tableInUseRef,
                    },
                  });
                },
                error: () => {
                  this.ionicUtilService.showToast({
                    message: 'No se pudo eliminar el ejercicio',
                    duration: 2500,
                  });
                },
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private getExerciseDeleteImpact(exerciseId: string): {
    occurrences: number;
    workouts: number;
    splits: number;
  } {
    const splitIds = new globalThis.Set<string>();
    const workoutIds = new globalThis.Set<string>();
    let occurrences = 0;

    if (!this.tableInUse?.splits?.length) {
      return { occurrences: 0, workouts: 0, splits: 0 };
    }

    this.tableInUse.splits.forEach((split) => {
      let splitHasMatch = false;

      split.workouts?.forEach((workout) => {
        let workoutHasMatch = false;

        workout.exercises?.forEach((customExercise) => {
          if (customExercise?.exercise?._id === exerciseId) {
            occurrences += 1;
            workoutHasMatch = true;
            splitHasMatch = true;
          }
        });

        if (workoutHasMatch) {
          workoutIds.add(workout._id);
        }
      });

      if (splitHasMatch) {
        splitIds.add(split._id);
      }
    });

    return {
      occurrences,
      workouts: workoutIds.size,
      splits: splitIds.size,
    };
  }
}
