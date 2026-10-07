import { CHECKIN_FIELDS, CheckinField } from '../constants/checkin-fields';

// Lo que el profesional PIDE en el cuestionario de alta además de preguntas:
// medidas, fotos de inicio y vídeos con lo que tiene que grabar el cliente,
// cada cosa obligatoria u opcional. Espejo de
// train-fit-back/components/trainerIntakeConfig/intake-requests.js. La
// configuración es del profesional; al invitar se copia al par
// (TrainerClient.intakeForm) y eso es lo que rellena el cliente.

export type IntakePhotoPose = 'front' | 'side' | 'back';

/** Poses de las fotos de inicio (la foto libre `extra` no se pide). */
export const INTAKE_PHOTO_POSES: IntakePhotoPose[] = ['front', 'side', 'back'];

/** Vídeos que se pueden pedir a la vez (cada uno, una grabación de hasta 3 min). */
export const MAX_INTAKE_VIDEOS = 5;
export const INTAKE_VIDEO_LABEL_MAX = 200;

/**
 * Medidas que se pueden pedir: las del catálogo de check-in que van a sus
 * medidas (mismas etiquetas, instrucciones y cotas), menos el peso, que el
 * cuestionario pide siempre en el perfil.
 */
export const INTAKE_MEASUREMENT_FIELDS: CheckinField[] = CHECKIN_FIELDS.filter(
  (field) => field.storage === 'anthropometry' && field.key !== 'weight'
);

export interface IntakeMeasurementRequest {
  key: string;
  required: boolean;
}

export interface IntakePhotoRequest {
  poses: IntakePhotoPose[];
  required: boolean;
}

/** `label`: lo que tiene que grabar («Sentadilla sin peso, de perfil»). */
export interface IntakeVideoRequest {
  _id?: string;
  label: string;
  required: boolean;
  // Solo en la configuración del profesional: desactivar deja de pedirlo
  // sin perder el texto (como las preguntas propias).
  enabled?: boolean;
}

export interface IntakeMeasurementAnswer {
  key: string;
  value: number;
}

/** Un vídeo de progreso del cliente por petición. */
export interface IntakeVideoAnswer {
  requestId: string;
  assetId: string;
}

/** Lo que se le pidió a un cliente concreto (la copia de su invitación). */
export interface IntakeRequested {
  measurements: IntakeMeasurementRequest[];
  photos: IntakePhotoRequest | null;
  videos: IntakeVideoRequest[];
}
