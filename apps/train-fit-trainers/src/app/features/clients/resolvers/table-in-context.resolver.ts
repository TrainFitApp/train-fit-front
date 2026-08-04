import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Table } from 'src/app/core/models/table';
import { TableService } from 'src/app/core/services/table/table.service';

// Replanteamiento MVP (rutinas) — el constructor de mesociclos
// (mesocycle.page.ts, reutilizado tal cual desde shared-features) lee la
// tabla a editar desde TableService.currentTable(), una señal global que en
// train-fit-front se siembra en el login con la tabla propia del usuario.
// train-fit-trainers no tiene ese sembrado (ni falta que le hace: ningún
// otro punto de esta app lee esa señal), así que este resolver la siembra
// explícitamente desde el :tableId de la ruta ANTES de que el componente se
// active, para que el primer efecto que lea la señal ya tenga la tabla del
// CLIENTE, no una tabla ajena o vacía.
@Injectable({ providedIn: 'root' })
export class TableInContextResolver implements Resolve<Table> {
  constructor(private tableService: TableService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Table> {
    const tableId = route.paramMap.get('tableId') || '';
    return this.tableService.getTableById(tableId).pipe(
      tap((table) => (this.tableService.setCurrentTable = table))
    );
  }
}
