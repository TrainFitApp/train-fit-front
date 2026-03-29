import { Directive, HostListener, OnInit, Self } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { UtilService } from '../services/util/util.service';

/**
 * Directiva que cierra automáticamente el teclado al hacer scroll hacia abajo.
 * Se aplica automáticamente a todos los ion-content.
 * Habilita scrollEvents automáticamente.
 */
@Directive({
    selector: 'ion-content'
})
export class HideKeyboardOnScrollDirective implements OnInit {

    constructor(
        private utilService: UtilService,
        @Self() private ionContent: IonContent
    ) { }

    ngOnInit() {
        // Necesario para que ion-content emita (ionScroll) en todas las pantallas.
        this.ionContent.scrollEvents = true;
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        this.utilService.hideKeyboardOnClick(event);
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent): void {
        this.utilService.hideKeyboardOnClick(event as unknown as MouseEvent);
    }

    @HostListener('ionScroll', ['$event'])
    onScroll(event: any): void {
        this.utilService.hideKeyboardOnScroll(event);
    }
}
