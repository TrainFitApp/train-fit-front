# Modelo de datos 04 — Catálogo cerrado de campos de check-in

## 1. Objetivo

Definir la lista COMPLETA y CERRADA de campos que un profesional puede activar para el check-in periódico de un cliente (`modelos-de-datos/03-trainercheckintemplate.md`). Es una constante de aplicación, no una colección de base de datos — vive en código (backend, para validar; frontend, para renderizar los toggles), no en Mongo.

**Origen de esta lista**: no es inventada — sale de dos fuentes reales analizadas a fondo en `PLAN_TRAINFIT_ENTRENADORES.md`: una plantilla Excel de un entrenador real en activo (§10.1, §10.2) y un competidor real en producción con miles de usuarios (Traineeks, §11.1, §11.2b). Cada campo listado abajo tiene un origen documentado.

## 2. Alcance exacto para el MVP

Todos los campos de las secciones 7.1 a 7.3 de abajo. Es una lista cerrada — el profesional NO puede añadir campos propios (eso sería un form builder, explícitamente descartado, ver `fuera-de-alcance/p2-futuro.md`).

**Cambio de almacenamiento (confirmado en `00-decisiones-pendientes.md` D8, 2026-07-31)**: los grupos "Composición corporal" y "Perímetros" (23 campos) son **anthropometry-backed** — al responder, sus valores se escriben en la colección `Anthropometry` ya existente (extendida, ver `modelos-de-datos/05-cambios-modelos-existentes.md`), NO en una colección de respuestas de check-in separada. El grupo "Bienestar" (11 campos) sigue siendo **wellbeing-backed** — se guarda en `CheckinResponse`, una colección propia y pequeña (ver `funcionalidades/F17-checkin-catalogo-campos.md`). Esta distinción (`storage: "anthropometry" | "wellbeing"`) se añade a cada entrada del catálogo, sección 7.

## 3. Qué NO se incluye en el MVP

- El Índice de Estímulo Muscular/Estrés Articular/Fatiga (del Excel, `PLAN_TRAINFIT_ENTRENADORES.md` §10.9) — requiere una base de datos de contenido de ~980 ejercicios, fuera de alcance total, ni siquiera P2.
- Campos de dolor/rehabilitación (EVA 0-10, §10.10) — clasificado P2, no en el catálogo del MVP.
- Fotos de progreso — es un tipo de dato distinto (imagen, no numérico/escala), con su propia infraestructura de subida (fuera de alcance, ver `fuera-de-alcance/p2-futuro.md`); no se modela como un "campo" de este catálogo.

## 7. Estructura de datos — el catálogo completo

```js
// Ubicación sugerida: packages/shared-core/src/app/core/constants/checkin-fields.ts (frontend)
//                     train-fit-back/components/trainerCheckins/checkin-field-catalog.js (backend)
// AMBOS deben mantenerse sincronizados a mano — no hay generación automática en el MVP.

const CHECKIN_FIELDS = [
  // --- Grupo: Composición corporal (origen: Excel §10.1, Traineeks §11.1) ---
  // storage: "anthropometry" → el valor se escribe en Anthropometry[anthropometryField], NO en CheckinResponse.
  { key: "weight",         label: "Peso",              type: "number", unit: "kg", group: "composicion_corporal", storage: "anthropometry", anthropometryField: "weight" },
  { key: "muscle_mass",    label: "Masa muscular",     type: "number", unit: "kg", group: "composicion_corporal", storage: "anthropometry", anthropometryField: "muscleMass" },
  { key: "fat_mass",       label: "Masa grasa",        type: "number", unit: "kg", group: "composicion_corporal", storage: "anthropometry", anthropometryField: "fatMass" },
  { key: "bone_mass",      label: "Masa ósea",         type: "number", unit: "kg", group: "composicion_corporal", storage: "anthropometry", anthropometryField: "boneMass" },
  { key: "residual_mass",  label: "Masa residual",     type: "number", unit: "kg", group: "composicion_corporal", storage: "anthropometry", anthropometryField: "residualMass" },

  // --- Grupo: Perímetros (origen: Excel §10.1, Traineeks §11.1 — bilaterales en extremidades) ---
  { key: "perimeter_neck",             label: "Cuello",                    type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "neck" },
  { key: "perimeter_shoulders",        label: "Hombros",                   type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "shoulders" },
  { key: "perimeter_chest",            label: "Pecho",                     type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "chest" },
  { key: "perimeter_waist",            label: "Cintura",                   type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "waist" },
  { key: "perimeter_navel",            label: "Ombligo",                   type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "abdomen" },
  { key: "perimeter_hip",              label: "Cadera",                    type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "hip" },
  { key: "perimeter_bicep_relaxed_l",  label: "Bíceps relajado izq.",       type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "bicepsRelaxedL" },
  { key: "perimeter_bicep_relaxed_r",  label: "Bíceps relajado der.",       type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "bicepsRelaxedR" },
  { key: "perimeter_bicep_flexed_l",   label: "Bíceps contraído izq.",      type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "bicepsContractedL" },
  { key: "perimeter_bicep_flexed_r",   label: "Bíceps contraído der.",      type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "bicepsContractedR" },
  { key: "perimeter_quad_l",           label: "Cuádriceps izq.",            type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "quadL" },
  { key: "perimeter_quad_r",           label: "Cuádriceps der.",            type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "quadR" },
  { key: "perimeter_thigh_relaxed",    label: "Muslo relajado",             type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "thighRelaxed" },
  { key: "perimeter_thigh_flexed",     label: "Muslo contraído",            type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "thighContracted" },
  { key: "perimeter_calf_l",           label: "Gemelo izq.",                type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "calfL" },
  { key: "perimeter_calf_r",           label: "Gemelo der.",                type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "calfR" },
  { key: "perimeter_ankle_l",          label: "Tobillo izq.",               type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "ankleL" },
  { key: "perimeter_ankle_r",          label: "Tobillo der.",               type: "number", unit: "cm", group: "perimetros", storage: "anthropometry", anthropometryField: "ankleR" },

  // --- Grupo: Bienestar semanal (origen: Excel §10.2, escala 1-5 con anclas descriptivas) ---
  // storage: "wellbeing" → el valor se escribe en CheckinResponse.values[key], como en el diseño original.
  { key: "recovery_between_sessions",  label: "Recuperación entre sesiones",     type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "training_adherence",         label: "Seguimiento del entrenamiento",   type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "hunger_satiety",             label: "Nivel de hambre-saciedad",        type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "hydration_level",            label: "Grado de hidratación",            type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "stress_level",               label: "Nivel de estrés",                 type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "motivation_level",           label: "Grado de motivación",             type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "sleep_hours",                label: "Horas de sueño semanales",        type: "number", unit: "h", group: "bienestar", storage: "wellbeing" },
  { key: "sleep_quality",              label: "Calidad del sueño",                type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "general_fatigue",            label: "Cansancio general",               type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
  { key: "daily_steps",                label: "Pasos diarios (media semanal)",   type: "number", unit: "pasos", group: "bienestar", storage: "wellbeing" },
  { key: "nutrition_plan_adherence",   label: "Seguimiento del plan nutricional", type: "scale_1_5", group: "bienestar", storage: "wellbeing" },
];

module.exports = { CHECKIN_FIELDS, CHECKIN_FIELD_KEYS: CHECKIN_FIELDS.map(f => f.key) };
```

**Tipos de campo soportados** (`type`): `"number"` (con `unit` para mostrar en la UI), `"scale_1_5"` (selector de 1 a 5, sin anclas descriptivas de texto en el MVP — el Excel original SÍ tenía frases descriptivas por nivel para cada escala; se descarta ese texto en el MVP por simplicidad, ver punto 3, y queda como mejora futura en `fuera-de-alcance/p2-futuro.md`).

## 8. Dependencias con otros módulos

- Consumido por: `modelos-de-datos/03-trainercheckintemplate.md` (valida `enabledFields` contra `CHECKIN_FIELD_KEYS`).
- Consumido por: `funcionalidades/F17-checkin-catalogo-campos.md` (renderiza los toggles agrupados por `group`, y el formulario de respuesta del cliente según los campos activos).
- Depende de: `modelos-de-datos/05-cambios-modelos-existentes.md` — TODOS los campos `storage: "anthropometry"` de este catálogo requieren la extensión de `Anthropometry` descrita ahí (D8). Sin esa extensión, esos 23 campos no tienen dónde escribirse.

## 9. Validaciones

- Las claves (`key`) deben ser únicas dentro del catálogo — es una constante de código, la unicidad se garantiza por revisión, no hay validación en tiempo de ejecución de esto.
- El frontend y el backend deben tener listas IDÉNTICAS — si se añade un campo en el frontend sin añadirlo en el backend, la validación de `modelos-de-datos/03-trainercheckintemplate.md` rechazará esa clave como "no reconocida" aunque la UI la muestre, un bug de sincronización manual real y previsible.
- Cada campo con `storage: "anthropometry"` debe tener un `anthropometryField` válido que exista en `anthropometry-schema.js` — si se añade un campo nuevo al catálogo con `storage: "anthropometry"` sin haber añadido antes el campo correspondiente al schema real (`modelos-de-datos/05-cambios-modelos-existentes.md`), el backend fallaría al intentar escribirlo. Verificar este acoplamiento antes de añadir cualquier campo nuevo a este catálogo.

## 10. Casos límite y posibles errores

- **Divergencia entre catálogo de frontend y backend**: es el caso límite más probable de este archivo, precisamente por ser una lista mantenida a mano en dos sitios. Mitigación mínima para el MVP: un comentario en ambos archivos que se referencien mutuamente por ruta exacta, para que quien edite uno recuerde editar el otro. Mejora futura (no MVP): mover el catálogo a un único paquete compartido (`packages/shared-core`) consumible por ambos lados si el backend pudiera importar TypeScript compilado, o servir el catálogo desde un endpoint (`GET /trainer/checkin-fields-catalog`) que el frontend consuma en vez de tener su propia copia — esto eliminaría la duplicación pero es más trabajo del necesario para el MVP.

## 11. Estructura de datos

Ya completa en la sección 7.

## 12. Endpoints/API necesarios

Ninguno estrictamente necesario para el MVP (el catálogo puede vivir como constante en ambos lados, ver caso límite arriba). Si se decide servir desde un endpoint para evitar duplicación, sería `GET /trainer/checkin-fields-catalog` (público para cualquier profesional autenticado, sin relación con cliente necesaria).

## 13. Criterios de aceptación verificables

- [ ] El catálogo de frontend y backend tienen exactamente las mismas claves (comparación manual o test automatizado que las compare).
- [ ] Cada campo tiene `label` en español definido (traducción a inglés vía `es.json`/`en.json`, ver `00-decisiones-pendientes.md` D7).
- [ ] Los perímetros bilaterales existen en pares completos (izq. + der.) — no falta ninguno de los 8 pares listados.
- [ ] Cada `anthropometryField` de los campos `storage: "anthropometry"` corresponde a un campo real y existente en `anthropometry-schema.js` (los 23 campos de composición corporal + perímetros, tras la extensión de D8).

## 14. Checklist de implementación

- [ ] Crear la constante en el backend (`checkin-field-catalog.js`).
- [ ] Crear la constante espejo en el frontend (`checkin-fields.ts`).
- [ ] Añadir las claves i18n correspondientes a `es.json`/`en.json`.
- [ ] Verificar los 3 criterios de aceptación.
