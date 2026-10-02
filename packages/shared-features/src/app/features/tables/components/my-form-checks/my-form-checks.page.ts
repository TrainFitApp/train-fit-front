import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Todas las revisiones de técnica del cliente, de cualquier ejercicio. Es
// adonde lleva la notificación «Tu entrenador ha revisado tu vídeo»
// (?id=<revisión> la abre directamente).
@Component({
  selector: 'app-my-form-checks',
  templateUrl: './my-form-checks.page.html',
  styleUrls: ['./my-form-checks.page.scss'],
})
export class MyFormChecksPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public focusId: string | null = null;
  public ready = false;

  public ionViewWillEnter(): void {
    this.focusId = this.route.snapshot.queryParamMap.get('id');
    // Se vuelve a montar la lista en cada entrada: puede haber respuesta nueva.
    this.ready = false;
    setTimeout(() => (this.ready = true));
  }

  public close(): void {
    void this.router.navigate(['/tabs/coach']);
  }
}
