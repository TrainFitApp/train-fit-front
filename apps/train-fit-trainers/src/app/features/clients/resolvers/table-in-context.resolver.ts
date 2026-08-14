import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Table } from 'src/app/core/models/table';
import { TableService } from 'src/app/core/services/table/table.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

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
  constructor(
    private tableService: TableService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  // TASK-011 (MASTER_BACKLOG.md) — sin catchError, un 403/404 (tabla
  // borrada o acceso revocado entre que el entrenador abrió la lista y
  // hizo clic) cancelaba la navegación en silencio: NavigationError sin
  // escuchar en ningún sitio, pantalla congelada/en blanco. Ahora se avisa
  // con un toast y se redirige a la lista de clientes en vez de dejar al
  // usuario varado. `EMPTY` aborta limpiamente la navegación pendiente sin
  // que Angular Router propague un NavigationError sin manejar.
  public resolve(route: ActivatedRouteSnapshot): Observable<Table> {
    const tableId = route.paramMap.get('tableId') || '';
    return this.tableService.getTableById(tableId).pipe(
      tap((table) => (this.tableService.setCurrentTable = table)),
      catchError((error) => {
        void this.ionicUtilService.showErrorToast(
          error,
          'No se pudo abrir esta rutina. Puede que ya no exista o que no tengas acceso.'
        );
        void this.router.navigate(['/tabs/clients']);
        return EMPTY;
      })
    );
  }
}
