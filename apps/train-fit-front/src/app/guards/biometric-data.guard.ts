import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { EditorPage } from 'src/app/features/profile/components/configuration/components/editor/editor.page';

// MVP-trainers F27 — un profesional (F01, sin biométricos) que se añade el
// rol "user" para llevar su propio seguimiento puede entrar a una pantalla
// de nutrición sin haber rellenado weight/height/sex/activity/objetive/birth.
// En vez de dejar que calculateKcal produzca NaN, este guard abre el editor
// de perfil (EditorPage, el mismo que "Editar perfil" en Configuración) como
// modal y solo deja pasar la navegación si, al cerrarse, los datos ya están
// completos.
//
// Este guard vive en la app (no en shared-core) porque EditorPage está en
// shared-features — shared-core no debe importar de shared-features.
function hasCompleteBiometrics(user: User | null | undefined): boolean {
  if (!user) return false;
  return (
    user.weight != null &&
    user.height != null &&
    user.sex != null &&
    user.activity != null &&
    user.objetive != null &&
    !!user.birth
  );
}

export const biometricDataGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const ionicUtilService = inject(IonicUtilService);

  if (hasCompleteBiometrics(userService.getLocalUser)) {
    return true;
  }

  await ionicUtilService.showModal({ component: EditorPage });

  return hasCompleteBiometrics(userService.getLocalUser);
};
