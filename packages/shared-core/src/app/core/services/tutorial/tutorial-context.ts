import { User } from '../../models/user';
import { TutorialUserContext } from '../../models/tutorial';

// TODO(tutorials): hoy no existe ninguna señal real en el backend que
// distinga "rutina asignada por un entrenador" de "rutina propia" (el modelo
// Table no tiene ese campo). Cuando exista, sustituir este valor fijo por la
// lógica real. Mientras tanto, todos los usuarios ven el mismo contenido.
export function getUserTutorialContext(user: User | null): TutorialUserContext {
  return 'independent';
}
