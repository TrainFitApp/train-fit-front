import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

/**
 * Confirmación antes de borrar una foto o un vídeo: se borra también del
 * almacenamiento y no hay papelera, así que un toque sin querer no puede
 * bastar. Devuelve true si confirma.
 */
export async function confirmMediaDelete(
  ionicUtilService: IonicUtilService,
  translate: TranslateService,
  kind: 'photo' | 'video',
  params: Record<string, string> = {}
): Promise<boolean> {
  const result = await ionicUtilService.showAlert({
    header: translate.instant(kind === 'photo' ? 'MEDIA.DELETE_PHOTO_TITLE' : 'MEDIA.DELETE_VIDEO_TITLE'),
    message: translate.instant(kind === 'photo' ? 'MEDIA.DELETE_PHOTO_MESSAGE' : 'MEDIA.DELETE_VIDEO_MESSAGE', params),
    buttons: [
      { text: translate.instant('COMMON.CANCEL'), role: 'cancel' },
      { text: translate.instant('MEDIA.DELETE_CONFIRM'), role: 'destructive' },
    ],
  });
  return result?.role === 'destructive';
}
