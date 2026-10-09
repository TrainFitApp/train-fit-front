import { ColorMode } from '../services/util/theme.service';

export class User {
  _id: string;
  // Solo en la respuesta del alta: false = la cuenta está creada pero el
  // correo con el código no salió (core/utils/verification-mail.util.ts).
  verificationMailSent?: boolean;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
  status: string;
  height: number;
  // Último peso de sus medidas (el usuario no lo guarda). Enviarlo al
  // actualizar el perfil apunta el peso de hoy.
  weight: number;
  // Día de calendario "YYYY-MM-DD", sin hora ni huso.
  birth: string;
  sex: number;
  activity: number;
  objetive: number;
  steps: number;
  training: number;
  // Nota fijada de la pantalla de dieta.
  dietPinnedNote?: string;
  tableInUse: any;
  workoutInUse: any;
  access_token?: string;
  // Solo en la lista del panel admin: cuenta pendiente de verificar.
  pendingActivation?: boolean;
  theme?: ColorMode;
  lang?: 'es' | 'en';
  provider?: 'google' | 'apple';
  personalAds?: boolean;
  premium?: {
    entitled?: boolean;
    plan?: 'monthly' | 'annual' | 'manual' | 'unknown' | string | null;
    expiresAt?: string | Date;
    source?: string;
    lastSyncAt?: string | Date;
  };

  goalInUse?: string;

  favorites?: UserFavorites;
  lastLogin?: string | Date;
}

export type FavoriteKind = 'products' | 'recipes' | 'exercises';

// Lo que el usuario ha marcado como favorito (ids).
export type UserFavorites = Record<FavoriteKind, string[]>;
