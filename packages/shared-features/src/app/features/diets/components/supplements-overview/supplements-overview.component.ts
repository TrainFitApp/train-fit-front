import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MySupplement, MySupplementsApiService } from '../../../supplements/services/my-supplements-api.service';
import { supplementWeekdaysLabel } from '../../../supplements/supplement-weekdays';

/** Lo que devuelve al tocar uno: Dietas abre su hoja. */
export interface SupplementsOverviewResult {
  open: MySupplement;
}

type ViewState = 'loading' | 'error' | 'loaded';

/**
 * Toda la suplementación del cliente, al tocar "Suplementación" en Dietas:
 * lo pautado por sus profesionales y lo suyo, vigente hoy, con todos sus
 * días (la sección del día solo enseña lo que toca ese día). Tocar uno cierra
 * esta hoja y abre la suya (SupplementSheetComponent).
 */
@Component({
  selector: 'app-supplements-overview',
  templateUrl: './supplements-overview.component.html',
  styleUrls: ['./supplements-overview.component.scss'],
})
export class SupplementsOverviewComponent implements OnInit {
  /** Cuándo tomarlo, ya en texto (DietsPage#supplementTiming). */
  @Input() public timingText: (supplement: MySupplement) => string = (supplement) => supplement.timing;

  public state: ViewState = 'loading';
  public supplements: MySupplement[] = [];

  constructor(
    private mySupplementsApi: MySupplementsApiService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.mySupplementsApi.getMine().subscribe({
      next: (supplements) => {
        this.supplements = supplements || [];
        this.state = 'loaded';
      },
      error: () => (this.state = 'error'),
    });
  }

  public weekdaysLabel(supplement: MySupplement): string {
    return supplementWeekdaysLabel(supplement.weekdays);
  }

  public open(supplement: MySupplement): void {
    const result: SupplementsOverviewResult = { open: supplement };
    void this.modalController.dismiss(result);
  }

  public close(): void {
    void this.modalController.dismiss();
  }

  public trackById(_index: number, supplement: MySupplement): string {
    return supplement._id;
  }
}
