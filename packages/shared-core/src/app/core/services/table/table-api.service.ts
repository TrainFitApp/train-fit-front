import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Table } from '../../models/table';
import { HttpService } from '../http/http.service';

@Injectable()
export class TableAPIService {
  private _currentTable$: BehaviorSubject<Table> = new BehaviorSubject<Table>(
    null
  );

  public get getCurrentTable() {
    return this._currentTable$.asObservable();
  }

  public set setCurrentTable(table: Table) {
    this._currentTable$.next(table);
  }

  constructor(private http: HttpService) {}

  public getTableById(id: string): Observable<Table> {
    return this.http.get<Table>(`tables/${id}`);
  }

  public copyTable(idUser: string, idTable: string): Observable<Table> {
    return this.http.get<Table>(`tables/user/copy/${idUser}/${idTable}`);
  }

  public duplicateTable(idUser: string, idTable: string): Observable<Table> {
    return this.http.get<Table>(`tables/user/copy/own/${idUser}/${idTable}`);
  }

  public copySharedTable(idUser: string, idTable: string): Observable<Table> {
    return this.http.get<Table>(`/share/${idUser}/${idTable}`);
  }

  public getSearchTables(
    search: string,
    page: number,
    idUser: string,
    isOwn: boolean
  ): Observable<Table[]> {
    return this.http.post<Table[]>(`tables/search?page=${page}&limit=5`, {
      search,
      idUser,
      isOwn,
    });
  }

  public createTableToUser(idUser: string, name: string): Observable<Table> {
    return this.http.post<Table>(`tables/user/${idUser}`, { name });
  }

  public updateTableName(table: Table): Observable<string> {
    return this.http.put<Table>(`tables`, { _id: table._id, name: table.name });
  }

  public deleteTableById(idUser: string, idTable: string): Observable<Table> {
    return this.http.delete<Table>(`tables/user/${idUser}/${idTable}`);
  }
}
