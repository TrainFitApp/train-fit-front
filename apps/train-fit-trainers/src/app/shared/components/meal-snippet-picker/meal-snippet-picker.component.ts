import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { MealSnippet } from '../../models/meal-snippet.model';
import { MealSnippetApiService } from '../../services/meal-snippet-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

// TAREA5 (auditoría UX, Fase C) — picker puro: lista, deja elegir uno
// (dismiss con role 'confirm' y el snippet completo) y permite borrar. La
// acción de CREAR uno nuevo vive en quien compone la comida (el propio
// tablero/composer), no aquí — este modal solo consume la biblioteca.
@Component({
  selector: 'app-meal-snippet-picker',
  templateUrl: 'meal-snippet-picker.component.html',
  styleUrls: ['meal-snippet-picker.component.scss'],
})
export class MealSnippetPickerComponent implements OnInit {
  public state: ViewState = 'loading';
  public snippets: MealSnippet[] = [];
  // TASK-047 (MASTER_BACKLOG.md) — filtro en memoria: mismo criterio que
  // RoutinesPage/TemplatePickerModalComponent, no hace falta paginación de
  // backend para una biblioteca personal de este tamaño esperado.
  public search = '';
  public filteredSnippets: MealSnippet[] = [];

  constructor(
    private mealSnippetApi: MealSnippetApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.mealSnippetApi.list().subscribe({
      next: (snippets) => {
        this.snippets = snippets || [];
        this.applySearch();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public onSearchChange(): void {
    this.applySearch();
  }

  private applySearch(): void {
    const term = this.search.trim().toLowerCase();
    this.filteredSnippets = term
      ? this.snippets.filter((s) => s.name.toLowerCase().includes(term))
      : this.snippets;
  }

  public itemCount(snippet: MealSnippet): number {
    return (snippet.customProducts?.length || 0) + (snippet.customRecipes?.length || 0);
  }

  public pick(snippet: MealSnippet): void {
    void this.modalController.dismiss(snippet, 'confirm');
  }

  public async confirmDelete(event: Event, snippet: MealSnippet): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: `¿Borrar "${snippet.name}"?`,
      message: 'No afecta a las comidas donde ya se haya insertado antes.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.mealSnippetApi.delete(snippet._id).subscribe(() => {
              this.snippets = this.snippets.filter((s) => s._id !== snippet._id);
              this.applySearch();
            });
          },
        },
      ],
    });
  }

  // TASK-047 (MASTER_BACKLOG.md) — solo renombrar (ver nota en
  // meal-snippet-api.service.ts sobre por qué no re-componer contenido aquí).
  public async renameSnippet(event: Event, snippet: MealSnippet): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: 'Renombrar snippet',
      inputs: [{ name: 'name', type: 'text', value: snippet.name, attributes: { maxlength: 80 } }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            this.mealSnippetApi.rename(snippet._id, name).subscribe({
              next: (updated) => {
                snippet.name = updated.name;
                this.applySearch();
              },
              error: () => {
                this.ionicUtilService.showToast({ message: 'No se pudo renombrar el snippet', duration: 2500 });
              },
            });
            return true;
          },
        },
      ],
    });
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public trackBySnippetId(_index: number, snippet: MealSnippet): string {
    return snippet._id;
  }
}
