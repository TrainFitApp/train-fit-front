"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-packages_shared-core_src_app_core_constants_checkin-fields_ts"],{

/***/ 73946:
/*!***************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/constants/checkin-fields.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHECKIN_FIELDS: () => (/* binding */ CHECKIN_FIELDS),
/* harmony export */   CHECKIN_FIELDS_BY_KEY: () => (/* binding */ CHECKIN_FIELDS_BY_KEY),
/* harmony export */   CHECKIN_FIELD_KEYS: () => (/* binding */ CHECKIN_FIELD_KEYS),
/* harmony export */   DEFAULT_SCALE_LEVELS: () => (/* binding */ DEFAULT_SCALE_LEVELS),
/* harmony export */   checkinAnchorFor: () => (/* binding */ checkinAnchorFor),
/* harmony export */   checkinScaleSuffix: () => (/* binding */ checkinScaleSuffix),
/* harmony export */   isPlausibleValue: () => (/* binding */ isPlausibleValue),
/* harmony export */   scaleLevelsFor: () => (/* binding */ scaleLevelsFor)
/* harmony export */ });
// MVP-trainers F17 — catálogo cerrado de campos de check-in.
// Espejo EXACTO de train-fit-back/components/trainerCheckins/checkin-field-catalog.js
// (backend) — mantenidos sincronizados a mano, ver modelos-de-datos/04-catalogo-campos-checkin.md, sección 10.
// Niveles por defecto de una escala sin anclas — las preguntas propias del
// coach siguen siendo siempre 1-5. Espejo de DEFAULT_SCALE_LEVELS en
// components/trainerCheckins/checkin-field-catalog.js.
const DEFAULT_SCALE_LEVELS = 5;
function isPlausibleValue(field, value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return false;
  if (field?.min !== undefined && value < field.min) return false;
  if (field?.max !== undefined && value > field.max) return false;
  return true;
}
function scaleLevelsFor(field) {
  return field?.anchors?.length || DEFAULT_SCALE_LEVELS;
}
const CHECKIN_FIELDS = [
// --- Composición corporal (storage: anthropometry) ---
{
  key: "weight",
  label: "Peso",
  type: "number",
  unit: "kg",
  group: "composicion_corporal",
  storage: "anthropometry",
  anthropometryField: "weight",
  hint: "Al levantarte, después de ir al baño y antes de desayunar. Siempre el mismo día de la semana.",
  min: 25,
  max: 350
}, {
  key: "muscle_mass",
  label: "Masa muscular",
  type: "number",
  unit: "kg",
  group: "composicion_corporal",
  storage: "anthropometry",
  anthropometryField: "muscleMass",
  hint: "De la báscula de bioimpedancia, en las mismas condiciones que el peso.",
  min: 1,
  max: 200
}, {
  key: "fat_mass",
  label: "Masa grasa",
  type: "number",
  unit: "kg",
  group: "composicion_corporal",
  storage: "anthropometry",
  anthropometryField: "fatMass",
  hint: "De la báscula de bioimpedancia, en las mismas condiciones que el peso.",
  min: 1,
  max: 200
}, {
  key: "bone_mass",
  label: "Masa ósea",
  type: "number",
  unit: "kg",
  group: "composicion_corporal",
  storage: "anthropometry",
  anthropometryField: "boneMass",
  hint: "De la báscula de bioimpedancia, en las mismas condiciones que el peso.",
  min: 0.5,
  max: 20
}, {
  key: "residual_mass",
  label: "Masa residual",
  type: "number",
  unit: "kg",
  group: "composicion_corporal",
  storage: "anthropometry",
  anthropometryField: "residualMass",
  hint: "De la báscula de bioimpedancia, en las mismas condiciones que el peso.",
  min: 1,
  max: 100
},
// --- Perímetros (storage: anthropometry) ---
// Cada instrucción dice el PUNTO exacto y la POSTURA. Son las dos cosas
// que, si cambian entre semanas, inventan una variación que no existe.
{
  key: "perimeter_neck",
  label: "Cuello",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "neck",
  hint: "Justo por debajo de la nuez, con la cinta horizontal y el cuello relajado.",
  min: 20,
  max: 80
}, {
  key: "perimeter_shoulders",
  label: "Hombros",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "shoulders",
  hint: "Por la parte más ancha de los hombros, de pie y con los brazos colgando.",
  min: 70,
  max: 220
}, {
  key: "perimeter_chest",
  label: "Pecho",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "chest",
  hint: "A la altura de los pezones, al terminar de soltar el aire con normalidad.",
  min: 50,
  max: 220
}, {
  key: "perimeter_waist",
  label: "Cintura",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "waist",
  hint: "Por la parte más estrecha, entre la última costilla y la cadera. Sin meter tripa.",
  min: 45,
  max: 220
}, {
  key: "perimeter_navel",
  label: "Ombligo",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "abdomen",
  hint: "A la altura exacta del ombligo. Sin meter tripa ni sacar el aire.",
  min: 45,
  max: 220
}, {
  key: "perimeter_hip",
  label: "Cadera",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "hip",
  hint: "Por la parte más ancha de los glúteos, de pie y con los pies juntos.",
  min: 45,
  max: 220
}, {
  key: "perimeter_bicep_relaxed_l",
  label: "Bíceps relajado izq.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "bicepsRelaxedL",
  hint: "Brazo colgando relajado, por la parte más ancha.",
  min: 12,
  max: 90
}, {
  key: "perimeter_bicep_relaxed_r",
  label: "Bíceps relajado der.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "bicepsRelaxedR",
  hint: "Brazo colgando relajado, por la parte más ancha.",
  min: 12,
  max: 90
}, {
  key: "perimeter_bicep_flexed_l",
  label: "Bíceps contraído izq.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "bicepsContractedL",
  hint: "Codo a 90° y bíceps apretado, por la parte más ancha.",
  min: 12,
  max: 90
}, {
  key: "perimeter_bicep_flexed_r",
  label: "Bíceps contraído der.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "bicepsContractedR",
  hint: "Codo a 90° y bíceps apretado, por la parte más ancha.",
  min: 12,
  max: 90
}, {
  key: "perimeter_quad_l",
  label: "Cuádriceps izq.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "quadL",
  hint: "A un palmo por encima de la rodilla, de pie y con el peso repartido en los dos pies.",
  min: 25,
  max: 120
}, {
  key: "perimeter_quad_r",
  label: "Cuádriceps der.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "quadR",
  hint: "A un palmo por encima de la rodilla, de pie y con el peso repartido en los dos pies.",
  min: 25,
  max: 120
}, {
  key: "perimeter_thigh_relaxed",
  label: "Muslo relajado",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "thighRelaxed",
  hint: "Justo debajo del glúteo, de pie y con la pierna relajada.",
  min: 25,
  max: 120
}, {
  key: "perimeter_thigh_flexed",
  label: "Muslo contraído",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "thighContracted",
  hint: "En el mismo punto que el muslo relajado, apretando la pierna.",
  min: 25,
  max: 120
}, {
  key: "perimeter_calf_l",
  label: "Gemelo izq.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "calfL",
  hint: "Por la parte más ancha, de pie y con el peso repartido en los dos pies.",
  min: 15,
  max: 80
}, {
  key: "perimeter_calf_r",
  label: "Gemelo der.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "calfR",
  hint: "Por la parte más ancha, de pie y con el peso repartido en los dos pies.",
  min: 15,
  max: 80
}, {
  key: "perimeter_ankle_l",
  label: "Tobillo izq.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "ankleL",
  hint: "Por la parte más estrecha, justo por encima del hueso.",
  min: 10,
  max: 50
}, {
  key: "perimeter_ankle_r",
  label: "Tobillo der.",
  type: "number",
  unit: "cm",
  group: "perimetros",
  storage: "anthropometry",
  anthropometryField: "ankleR",
  hint: "Por la parte más estrecha, justo por encima del hueso.",
  min: 10,
  max: 50
},
// --- Bienestar semanal (storage: wellbeing) ---
// El orden de las anclas SIEMPRE va de menos a más de lo que nombra la
// etiqueta: 5 en "Cansancio general" es más cansancio, 5 en "Calidad del
// sueño" es mejor sueño. Mezclar direcciones dentro del mismo formulario
// es la vía rápida a que el cliente conteste al revés sin darse cuenta.
{
  key: "recovery_between_sessions",
  label: "Recuperación entre sesiones",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["Llego a la siguiente sesión igual de cansado que al terminar la anterior", "Me recupero a medias: arrastro cansancio a la sesión siguiente", "Llego recuperado, pero justo", "Llego recuperado con margen", "Llego entero, podría haber entrenado antes"]
}, {
  key: "training_adherence",
  label: "Seguimiento del entrenamiento",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["No he hecho ninguna sesión", "He hecho menos de la mitad de las sesiones", "He hecho más o menos la mitad", "He hecho casi todas, con algún cambio", "He hecho todas las sesiones tal y como estaban"]
}, {
  key: "hunger_satiety",
  label: "Nivel de hambre-saciedad",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  // Escala de hambre a saciedad: 1 es hambre constante, 5 es saciedad
  // excesiva. El punto bueno es el 3, no el 5 — se dice en el propio
  // texto del nivel para que no se lea como "más es mejor".
  anchors: ["Hambre constante, pienso en comer todo el día", "Me quedo con hambre después de comer", "Termino satisfecho y aguanto bien hasta la comida siguiente", "Me cuesta terminar alguna comida", "Me sobra comida, como sin ganas"]
}, {
  key: "hydration_level",
  label: "Grado de hidratación",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["Casi no bebo agua, suelo tener sed", "Bebo poco, me acuerdo solo a ratos", "Bebo lo normal, sin llevar la cuenta", "Bebo de forma constante durante el día", "Bebo lo pautado todos los días"]
}, {
  key: "stress_level",
  label: "Nivel de estrés",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["Tranquilo, sin nada que me agobie", "Algo de tensión puntual, se me pasa", "Estrés de fondo constante, pero manejable", "Bastante estrés, me cuesta desconectar", "Desbordado: me afecta al sueño y al apetito"]
}, {
  key: "motivation_level",
  label: "Grado de motivación",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["Me cuesta hasta abrir la app", "Entreno por obligación", "Voy cumpliendo, sin más", "Con ganas la mayoría de los días", "Con muchas ganas, me sobra motivación"]
}, {
  key: "sleep_hours",
  label: "Horas de sueño semanales",
  type: "number",
  unit: "h",
  group: "bienestar",
  storage: "wellbeing",
  hint: "Suma las horas que has dormido esta semana y divídelas entre 7.",
  min: 0,
  max: 24
}, {
  key: "sleep_quality",
  label: "Calidad del sueño",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["Me despierto varias veces y amanezco roto", "Duermo mal: me cuesta dormirme o me desvelo", "Duermo regular, ni bien ni mal", "Duermo bien casi todas las noches", "Duermo del tirón y amanezco descansado"]
}, {
  key: "general_fatigue",
  label: "Cansancio general",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["Con energía todo el día", "Algo de cansancio a última hora", "Cansado por la tarde, dentro de lo normal", "Cansado casi todo el día", "Agotado: me cuesta hacer vida normal"]
}, {
  key: "daily_steps",
  label: "Pasos diarios (media semanal)",
  type: "number",
  unit: "pasos",
  group: "bienestar",
  storage: "wellbeing",
  hint: "La media diaria que te dé el móvil o el reloj para esta semana.",
  min: 0,
  max: 100000
}, {
  key: "nutrition_plan_adherence",
  label: "Seguimiento del plan nutricional",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  anchors: ["No he seguido el plan", "Lo he seguido menos de la mitad de los días", "Lo he seguido más o menos la mitad de los días", "Lo he seguido casi todos los días", "Lo he seguido todos los días"]
},
// Movimiento 2 Coach Pro — escala de color de orina (§ hidratación).
//
// Campo NUEVO y no una redefinición de hydration_level: cambiar aquella de
// 5 a 8 niveles reinterpretaría en silencio todo el histórico ya guardado
// (un 4 de "bebo de forma constante" pasaría a leerse como un color), y
// las series y las reglas compararían números que ya no significan lo
// mismo. Con una clave nueva, lo viejo sigue queriendo decir lo que decía.
//
// Es la única escala del catálogo que no tiene 5 niveles: el rango lo
// define anchors.length, no el nombre del tipo.
{
  key: "urine_color",
  label: "Color de la orina",
  type: "scale_1_5",
  group: "bienestar",
  storage: "wellbeing",
  hint: "Míralo a media mañana, no en la primera orina del día. Del 1 al 3 estás bien hidratado; del 4 al 5, bebe más; del 6 en adelante, estás deshidratado.",
  anchors: ["Transparente, casi como agua", "Amarillo muy claro", "Amarillo claro", "Amarillo pajizo", "Amarillo oscuro", "Ámbar", "Ámbar oscuro", "Marrón claro"]
},
// coach-tab FASE2 — campo de texto libre, reutilizable tanto en
// "formularios" (comentario semanal) como en "revisiones" (comentario
// junto a las medidas de composición corporal/perímetros de esa misma
// respuesta). Un único campo genérico, no un mecanismo aparte.
{
  key: "comment",
  label: "Comentario",
  type: "text",
  group: "bienestar",
  storage: "wellbeing"
}];
const CHECKIN_FIELD_KEYS = CHECKIN_FIELDS.map(f => f.key);
const CHECKIN_FIELDS_BY_KEY = new Map(CHECKIN_FIELDS.map(f => [f.key, f]));
/**
 * Movimiento 2 Coach Pro — la frase que el CLIENTE eligió al marcar ese
 * número, para que el entrenador lea lo mismo que respondió su cliente en
 * vez de un "4" que tiene que traducir de memoria.
 *
 * Vive aquí, junto al catálogo, porque lo necesitan tres pantallas
 * distintas del lado del entrenador (historial de check-ins, pestaña de
 * check-ins de la ficha y resumen). Tres copias de este `if` serían tres
 * sitios donde olvidarse de añadir una escala nueva.
 *
 * Devuelve null cuando no aplica: el campo no es una escala, no tiene
 * anclas (pregunta propia del coach) o el valor está fuera de rango — un
 * dato viejo guardado antes de que existieran las anclas, que se muestra
 * como el número pelado que siempre fue.
 */
function checkinAnchorFor(key, value) {
  const field = CHECKIN_FIELDS_BY_KEY.get(key);
  if (!field?.anchors?.length) return null;
  if (typeof value !== 'number' || !Number.isInteger(value)) return null;
  return field.anchors[value - 1] || null;
}
// Rango escrito de una escala ("4/5"), para acompañar al número sin que el
// lector tenga que saberse de memoria cuántos niveles tenía cada campo —
// que dejó de ser siempre 5 al entrar el color de orina.
function checkinScaleSuffix(key) {
  const field = CHECKIN_FIELDS_BY_KEY.get(key);
  if (!field?.anchors?.length) return '';
  return `/${field.anchors.length}`;
}

/***/ })

}]);
//# sourceMappingURL=default-packages_shared-core_src_app_core_constants_checkin-fields_ts.js.map