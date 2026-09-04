import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  GlossaryPopoverComponent,
  GlossaryTermKey,
} from '../glossary-popover/glossary-popover.component';

@Component({
  selector: 'app-glossary-info',
  templateUrl: './glossary-info.component.html',
  styleUrls: ['./glossary-info.component.scss'],
})
export class GlossaryInfoComponent {
  @Input() public term: GlossaryTermKey;
  @Input() public size: 'sm' | 'md' = 'md';

  // 2026-09 — el glosario explica términos básicos (RIR, 1RM, microciclo,
  // volumen efectivo...) a un usuario que está aprendiendo. En el panel del
  // ENTRENADOR sobra: es su profesión, y el botón compite por espacio en
  // sitios muy apretados (la cabecera RIR de la tabla de series estrechaba
  // la columna hasta cortar el texto).
  //
  // El gate vive aquí dentro, no en cada plantilla: hay 21 usos de
  // <app-glossary-info> repartidos entre shared-features, shared-ui y una
  // copia local de StatisticsPage en train-fit-trainers — replicar un *ngIf
  // en todas sería imposible de mantener, y varias plantillas son
  // compartidas literalmente con la app de cliente, donde el glosario SÍ
  // debe seguir viéndose.
  //
  // environment.auth.clientFamily es lo único que distingue en qué build se
  // está compilando desde código compartido (mismo criterio que
  // sign-in.page.ts#isTrainerApp y jwt.interceptor.ts).
  public readonly hidden = environment.auth?.clientFamily === 'trainfit-trainers';

  constructor(private ionicUtilService: IonicUtilService) {}

  public showInfo(event: Event): void {
    event.stopPropagation();
    this.ionicUtilService.showPopover({
      component: GlossaryPopoverComponent,
      componentProps: { term: this.term },
      event,
    });
  }
}
