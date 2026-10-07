import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { SearchFilterGroup } from 'src/app/shared/models/filterGroup';
import { Table } from '../../models/table';
import { TableAPIService } from './table-api.service';

@Injectable()
export class TableService {
  // Signal para la tabla actual
  private readonly _currentTable: WritableSignal<Table | null> =
    signal<Table | null>(null);

  // Signal de solo lectura (computed)
  public readonly currentTable = computed(() => this._currentTable());

  // El mismo estado como Observable, para quien se suscribe con RxJS.
  public readonly getCurrentTable = toObservable(this._currentTable);

  // Getter sincrónico para acceso directo al valor
  public get tableInUse(): Table | null {
    return this._currentTable();
  }

  // Setter para actualizar la tabla
  public set setCurrentTable(table: Table | null) {
    if (!table) {
      this._currentTable.set(null);
      return;
    }
    // Deep copy to ensure nested changes trigger updates
    this._currentTable.set(JSON.parse(JSON.stringify(table)));
  }

  constructor(private tableAPIService: TableAPIService) {}

  // `User.tableInUse` llega unas veces como string (id) y otras como el Table
  // ya populado, según la ruta que lo devuelva — se normaliza aquí una vez
  // para que ningún consumidor tenga que reimplementar esta comparación.
  public getTableInUseId(tableInUse: any): string | null {
    if (!tableInUse) return null;
    if (typeof tableInUse === 'string') return tableInUse;
    return tableInUse?._id?.toString?.() || tableInUse?.toString?.() || null;
  }

  public getTableById(id: string): Observable<Table> {
    return this.tableAPIService.getTableById(id).pipe(take(1));
  }

  public copyTable(idUser: string, idTable: string): Observable<Table> {
    return this.tableAPIService.copyTable(idUser, idTable).pipe(take(1));
  }

  public duplicateTable(idUser: string, idTable: string): Observable<Table> {
    return this.tableAPIService.duplicateTable(idUser, idTable).pipe(take(1));
  }

  public getSearchTables(
    searchFilterGroup: SearchFilterGroup,
    idUser?: string
  ): Observable<Table[]> {
    return this.tableAPIService
      .getSearchTables(
        searchFilterGroup.search,
        searchFilterGroup.page,
        idUser,
        searchFilterGroup.ownFilter,
        searchFilterGroup.defaultOnly
      )
      .pipe(distinctUntilChanged());
  }

  public createTableToUser(idUser: string, name: string): Observable<Table> {
    return this.tableAPIService.createTableToUser(idUser, name).pipe(take(1));
  }

  public createDefaultTable(name: string): Observable<Table> {
    return this.tableAPIService.createDefaultTable(name).pipe(take(1));
  }

  public updateTableName(table: Table): Observable<string> {
    return this.tableAPIService.updateTableName(table).pipe(take(1));
  }

  public deleteTableById(idTable: string): Observable<Table> {
    return this.tableAPIService.deleteTableById(idTable).pipe(take(1));
  }
}
