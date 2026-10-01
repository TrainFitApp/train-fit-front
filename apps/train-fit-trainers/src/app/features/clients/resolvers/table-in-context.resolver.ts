import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  private readonly translate = inject(TranslateService);

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
    // Rutinas -> Plantillas (rediseño 2026-08): este resolver también siembra
    // el Planificador en modo plantilla (sin cliente, ver
    // shell-routing.module.ts data.templateMode) — el fallback de error debe
    // volver a la biblioteca de plantillas en ese caso, no a la lista de
    // clientes.
    const fallbackRoute = route.data?.['templateMode']
      ? ['/tabs/routine-templates']
      : ['/tabs/clients'];
    return this.tableService.getTableById(tableId).pipe(
      tap((table) => (this.tableService.setCurrentTable = table)),
      catchError((error) => {
        void this.ionicUtilService.showErrorToast(
          error,
          this.translate.instant('CLIENTS.NO_SE_PUDO_ABRIR_ESTE')
        );
        void this.router.navigate(fallbackRoute);
        return EMPTY;
      })
    );
  }
}
