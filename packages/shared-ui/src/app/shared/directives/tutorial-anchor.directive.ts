import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { TutorialService } from 'src/app/core/services/tutorial/tutorial.service';

/**
 * Marca el elemento real al que debe anclarse un tutorial. El valor es
 * "<tutorialKey>.<stepKey>" (coincide con el `key` de la colección
 * `tutorials` del backend y con la primera entrada de TUTORIAL_TRIGGERS
 * para ese tutorial). Se registra en AfterViewInit y se desregistra en
 * OnDestroy, así que funciona igual de bien con elementos siempre presentes
 * (un botón de cabecera) que con elementos que aparecen/desaparecen
 * dinámicamente (contenido de un accordion, una fila *ngFor).
 */
@Directive({ selector: '[appTutorialAnchor]' })
export class TutorialAnchorDirective implements AfterViewInit, OnDestroy {
  @Input('appTutorialAnchor') public anchorId!: string;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly tutorialService: TutorialService
  ) {}

  public ngAfterViewInit(): void {
    if (!this.anchorId) return;
    this.tutorialService.registerAnchor(this.anchorId, this.el);
  }

  public ngOnDestroy(): void {
    if (!this.anchorId) return;
    this.tutorialService.unregisterAnchor(this.anchorId, this.el);
  }
}
