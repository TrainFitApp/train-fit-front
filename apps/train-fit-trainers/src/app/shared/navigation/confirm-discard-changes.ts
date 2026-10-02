import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { uiText } from 'src/app/core/i18n/localized-catalog';

// Confirmación única para todas las pantallas de edición sin autoguardado
// (constructores de plantilla de entrenamiento, de dieta, de automatización y
// composición de comida). Se engancha con pendingChangesGuard, así que cubre
// las tres salidas: botón de volver, menú lateral y atrás del navegador.
export async function confirmDiscardChanges(
  ionicUtilService: IonicUtilService
): Promise<boolean> {
  const result = await ionicUtilService.showAlert({
    header: uiText('COMMON.UNSAVED_CHANGES'),
    message: uiText('SHARED_COMPONENTS.SI_SALES_AHORA_SE_PERDERA'),
    buttons: [
      { text: uiText('SHARED_COMPONENTS.SEGUIR_EDITANDO'), role: 'cancel' },
      { text: uiText('SHARED_COMPONENTS.SALIR_SIN_GUARDAR'), role: 'confirm', cssClass: 'alert-button-danger' },
    ],
  });
  return result.role === 'confirm';
}
