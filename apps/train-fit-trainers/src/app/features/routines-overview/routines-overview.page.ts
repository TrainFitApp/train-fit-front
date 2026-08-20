import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineOverviewRow, RoutinesOverviewService } from './routines-overview.service';

type ViewState = 'loading' | 'error' | 'loaded';

@Component({
  selector: 'app-routines-overview',
  templateUrl: 'routines-overview.page.html',
  styleUrls: ['routines-overview.page.scss'],
})
export class RoutinesOverviewPage implements OnInit {
  public state: ViewState = 'loading';
  public rows: RoutineOverviewRow[] = [];
  public searchQuery = '';
  public filteredRows: RoutineOverviewRow[] = [];

  constructor(
    private routinesOverviewService: RoutinesOverviewService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  // Mismo bug de caché de ion-router-outlet ya corregido en el resto de
  // listados esta sesión — al volver del planner de un cliente, refresca.
  public ionViewWillEnter(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.routinesOverviewService.getAssignedRoutines().subscribe({
      next: (rows) => {
        this.rows = rows;
        this.applySearch();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public onSearchInput(value: string): void {
    this.searchQuery = value;
    this.applySearch();
  }

  private applySearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredRows = !query
      ? this.rows
      : this.rows.filter(
          (row) =>
            row.clientName.toLowerCase().includes(query) ||
            row.table.name?.toLowerCase().includes(query)
        );
  }

  public async openPlanner(row: RoutineOverviewRow): Promise<void> {
    await this.router.navigate(['/tabs', 'clients', row.clientId, 'tables', row.table._id, 'planner']);
  }

  public trackByRow(_index: number, row: RoutineOverviewRow): string {
    return row.table._id;
  }
}
