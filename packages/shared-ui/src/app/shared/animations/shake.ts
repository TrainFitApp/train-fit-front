import { animate, style, transition, trigger } from '@angular/animations';

export const shake = trigger('shake', [
  transition('* => *', [
    style({ transform: 'translateX(0)' }), // Estado inicial
    animate('0.1s ease-in-out', style({ transform: 'translateX(-10px)' })),
    animate('0.1s ease-in-out', style({ transform: 'translateX(0)' })),
    animate('0.1s ease-in-out', style({ transform: 'translateX(-10px)' })),
    animate('0.1s ease-in-out', style({ transform: 'translateX(0)' })),
    animate('0.1s ease-in-out', style({ transform: 'translateX(-10px)' })),
    animate('0.1s ease-in-out', style({ transform: 'translateX(0)' })),
  ]),
]);
