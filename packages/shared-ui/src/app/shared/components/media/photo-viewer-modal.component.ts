import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ProgressDayView, ProgressPose } from 'src/app/core/models/media';

/** Una foto a pantalla completa, con las otras poses del mismo día a un toque. */
@Component({
  selector: 'app-photo-viewer-modal',
  templateUrl: './photo-viewer-modal.component.html',
  styleUrls: ['./photo-viewer-modal.component.scss'],
})
export class PhotoViewerModalComponent implements OnInit {
  @Input() public day: ProgressDayView | null = null;
  @Input() public pose: ProgressPose = 'front';

  constructor(private modalController: ModalController, private translate: TranslateService) {}

  public ngOnInit(): void {
    if (!this.current && this.day?.photos?.length) this.pose = this.day.photos[0].pose;
  }

  public get current() {
    return this.day?.photos?.find((photo) => photo.pose === this.pose) || null;
  }

  public get dateLabel(): string {
    if (!this.day?.date) return '';
    const [year, month, day] = this.day.date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(this.translate.currentLang || 'es', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  public select(pose: ProgressPose): void {
    this.pose = pose;
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
