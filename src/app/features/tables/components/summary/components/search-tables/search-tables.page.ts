import { Component, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { SearchFilterGroup } from 'src/app/shared/models/filterGroup';
import { TableService } from '../../../../../../core/services/table/table.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';

@Component({
  selector: 'app-search-tables',
  templateUrl: './search-tables.page.html',
  styleUrls: ['./search-tables.page.scss'],
})
export class SearchTablesPage implements OnInit {
  public tableList: Table[];
  public user: User;

  public searchFilterGroup: SearchFilterGroup;
  public load: boolean;

  // Inyección de servicios con Signals
  private readonly userService = inject(UserService);
  private readonly tableService = inject(TableService);
  private readonly workoutService = inject(WorkoutService);
  private readonly adMobService = inject(AdMobService);

  constructor(
    private utilService: UtilService,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute
  ) {
    // Effect para el usuario
    effect(() => {
      this.user = this.userService.localUser();
    });

    this.searchFilterGroup = new SearchFilterGroup();

    this.searchFilterGroup.ownFilter =
      this.activatedRoute.snapshot.paramMap.get('own') === 'true';
  }

  public ngOnInit(): void {
    this.searchFilterGroup.userId = this.user._id;
    this.tableList = [];
    this.searchTables();
  }

  public loadData(event): void {
    this.searchFilterGroup.page++;

    setTimeout(() => {
      event.target.complete();

      this.tableService
        .getSearchTables(this.searchFilterGroup, this.user._id)
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe((resTables) => {
          this.tableList = this.prioritizeActiveTable([
            ...(this.tableList || []),
            ...(resTables || []),
          ]);
          this.load = true;
        });
    }, 500);
  }

  public searchTables(event?: Event): void {
    if (event)
      this.searchFilterGroup.search =
        this.utilService.getTextWithoutSpecialCharacters(
          this.utilService.getEventString(event)
        );

    this.load = false;
    this.tableService
      .getSearchTables(this.searchFilterGroup, this.user._id)
      .subscribe((resTables) => {
        this.tableList = this.prioritizeActiveTable(resTables || []);
        this.load = true;
      });
  }

  public copyOwnTable(copiedTable: Table): void {
    if (!copiedTable?._id) {
      return;
    }

    if (!this.user.ownTables) {
      this.user.ownTables = [];
    }

    if (!this.user.ownTables.includes(copiedTable._id)) {
      this.user.ownTables.push(copiedTable._id);
    }

    this.userService.setLocalUser = this.user;

    const existsInList = this.tableList?.some(
      (table) => table._id === copiedTable._id
    );

    if (!existsInList && this.searchFilterGroup.ownFilter) {
      this.tableList = this.prioritizeActiveTable([
        copiedTable,
        ...(this.tableList || []),
      ]);
    }

    this.adMobService.interstitialCapgo(); // Migrado a Capgo AdMob
  }

  public deleteTable(idTable: string): void {
    const indexToDelete = this.tableList.findIndex(
      (table) => table._id === idTable
    );

    if (indexToDelete !== -1) this.tableList.splice(indexToDelete, 1);

    // Si la tabla eliminada es la que está siendo usada actualmente
    if (idTable === this.user.tableInUse) {
      // Limpiar los subjects primero
      this.workoutService.setCurrentWorkout = undefined;
      this.tableService.setCurrentTable = undefined;

      // Limpiar todos los datos del usuario relacionados con esta tabla
      this.user.tableInUse = undefined;
      this.user.workoutInUse = undefined;

      // Actualizar en la base de datos (setLocalUser se hace automáticamente en el tap del updateUser)
      this.userService.updateUser(this.user).subscribe(() => {
        // Esperar a que la BD se actualice antes de navegar
        this.navigationService.goBack();
      });
    }
  }

  public close(): void {
    this.navigationService.goBack();
  }

  private prioritizeActiveTable(tables: Table[]): Table[] {
    if (!tables?.length) {
      return [];
    }

    const activeId = this.user?.tableInUse;
    if (!activeId) {
      return tables;
    }

    const activeTable = tables.find((table) => table?._id === activeId);
    if (!activeTable) {
      return tables;
    }

    const rest = tables.filter((table) => table?._id !== activeId);
    return [activeTable, ...rest];
  }
}
