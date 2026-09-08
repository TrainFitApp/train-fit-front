import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

// Confirmación única para todas las pantallas de edición sin autoguardado
// (constructores de plantilla de entrenamiento, de dieta, de automatización y
// composición de comida). Se engancha con pendingChangesGuard, así que cubre
// las tres salidas: botón de volver, menú lateral y atrás del navegador.
export async function confirmDiscardChanges(
  ionicUtilService: IonicUtilService
): Promise<boolean> {
  const result = await ionicUtilService.showAlert({
    header: 'Cambios sin guardar',
    message: 'Si sales ahora se perderá lo que has editado.',
    buttons: [
      { text: 'Seguir editando', role: 'cancel' },
      { text: 'Salir sin guardar', role: 'confirm', cssClass: 'alert-button-danger' },
    ],
  });
  return result.role === 'confirm';
}
