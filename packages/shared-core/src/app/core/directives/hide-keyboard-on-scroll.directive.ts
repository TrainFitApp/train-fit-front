import { Directive, HostListener, OnInit } from '@angular/core';
import { UtilService } from '../services/util/util.service';

@Directive({
    selector: 'ion-content[appHideKeyboardOnScroll]'
})
export class HideKeyboardOnScrollDirective implements OnInit {

    constructor(
        private utilService: UtilService    ) { }

    ngOnInit() {}

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        this.utilService.hideKeyboardOnClick(event);
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent): void {
        this.utilService.hideKeyboardOnClick(event as unknown as MouseEvent);
    }

    // ⚠️ No ocultar teclado en ionScroll de forma global:
    // interfiere con el scroll-assist nativo de Ionic al enfocar inputs
    // (especialmente en iOS), y puede provocar que el teclado se cierre
    // justo al intentar abrirse o que no desplace bien el contenido.
}
