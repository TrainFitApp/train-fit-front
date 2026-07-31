# F29 — Preferencias nutricionales del cliente (alergias, favoritos, no le gusta, cocina en casa)

**Prioridad**: P1. **Fase**: 6. Depende de `F10`, informa a `F12`.

## 1. Objetivo

Que el nutricionista tenga, sin tener que preguntárselo por fuera de la app, la información básica que necesita para pautar comidas realistas: alergias/intolerancias, alimentos favoritos, alimentos que no le gustan, y si el cliente cocina en casa o no — dato identificado como imprescindible en el Excel real analizado (`PLAN_TRAINFIT_ENTRENADORES.md` §10.6).

## 2. Alcance exacto para el MVP

- Un formulario FIJO (no un catálogo togglable como `F17`, no un form-builder libre) que el cliente rellena una vez y puede editar después, con estos campos:
  - Alergias/intolerancias (texto libre, campo crítico de seguridad — ver validaciones).
  - Alimentos favoritos (texto libre o selección de una lista básica de alimentos comunes).
  - Alimentos que no le gustan (texto libre o selección).
  - ¿Cocina en casa habitualmente? (booleano/select: sí / no / a veces).
- El nutricionista lo ve en el detalle de cliente (`F06`), en modo solo lectura (el nutricionista NO edita las preferencias del cliente, solo las lee).
- **Envío manual, no automático** (confirmado en `00-decisiones-pendientes.md` D5): el cliente no rellena esto por iniciativa propia sin más — el nutricionista lo SOLICITA explícitamente desde el detalle de cliente, y el cliente ve un aviso de "cuestionario solicitado" hasta que lo rellena.

## 3. Qué NO se incluye en el MVP

- No es un cuestionario extenso de hábitos alimentarios (eso sería una encuesta completa de anamnesis nutricional, fuera de alcance).
- No hay una base de datos estructurada de "alimento no gustado" enlazada al catálogo de productos de TrainFit (sería ideal para validar automáticamente que una comida pautada no contiene un alimento no deseado, pero es una mejora futura — MVP usa texto libre que el nutricionista simplemente lee).
- No bloquea ni valida automáticamente que las comidas pautadas por el nutricionista (`F12`) respeten estas preferencias — es información de referencia para que el profesional decida, no una validación automática del sistema.

## 4. Flujos de usuario paso a paso

### Nutricionista solicita el cuestionario
1. El nutricionista entra al detalle de cliente (`F06`), sección "Preferencias nutricionales" (vacía si nunca se ha solicitado).
2. Pulsa "Solicitar cuestionario". Se marca la solicitud (`requestedAt`) y, opcionalmente, se dispara una notificación local al cliente la próxima vez que abra la app (mismo criterio de "sin push remoto" que el resto del proyecto, ver `00-riesgos.md` R5).

### Cliente rellena sus preferencias
1. El cliente ve un aviso/badge de "cuestionario solicitado por [nombre]" en su perfil.
2. Abre "Mis preferencias nutricionales", rellena o edita los 4 campos.
3. Guarda — la solicitud pendiente se marca como resuelta.

### Nutricionista consulta preferencias
1. Vuelve a la sección "Preferencias nutricionales" en `F06`.
2. Si el cliente ya respondió, ve los 4 campos de solo lectura. Si no, ve el estado "solicitado, pendiente de respuesta" (con opción de volver a solicitar).
3. Las usa como referencia mental al pautar comidas (`F12`) — sin automatización, es información de apoyo humano.

## 5. Pantallas necesarias

- "Mis preferencias nutricionales" (cliente) — formulario de edición.
- Sección de solo lectura dentro del detalle de cliente (`F06`, profesional).

## 6. Componentes UI requeridos

- Formulario simple de 4 campos (2 áreas de texto libre + 2 selects/inputs de texto + 1 select de 3 opciones).
- Bloque de visualización de solo lectura en `F06`, con botón "Solicitar cuestionario" cuando no hay respuesta, y estado "pendiente de respuesta" cuando ya se solicitó.
- Badge/aviso de "cuestionario solicitado" en el perfil del cliente (TrainFit normal).

## 7. Lógica de negocio

- CRUD simple sobre un documento `ClientNutritionPreferences` por cliente (no por relación trainer-cliente — es un dato del cliente en sí, visible a CUALQUIER profesional de nutrición con relación activa, no específico de un profesional concreto).
- Visibilidad: cualquier profesional con relación `nutrition` activa con ese cliente puede leerlo (vía `requireActiveClient("nutrition")`).
- Solicitud: `requestedAt`/`requestedBy` se guardan en el mismo documento (o se crean vacíos al solicitar, si el cliente aún no tiene ninguno) — cualquier profesional con relación `nutrition` puede solicitar, no solo el primero que lo hizo.

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (`requireActiveClient` para la lectura del profesional).
- Informa a: `F12-pautar-comida.md` (el profesional lo consulta mentalmente antes de pautar, sin integración automática en el MVP).
- Relacionado con: `F10-lectura-nutricion.md` (mismo contexto de pantalla de nutrición del cliente).

## 9. Validaciones

- **Alergias/intolerancias es el campo más sensible de todo el módulo de nutrición** — aunque es texto libre y no se valida automáticamente contra las comidas pautadas, debe presentarse visualmente destacado (no como un campo más) en la vista del profesional, precisamente porque no hay ninguna otra red de seguridad automática. Un profesional que no lo lea con atención podría pautar un alimento peligroso para el cliente.
- Longitud máxima razonable en los campos de texto libre (evitar abusos, no un límite de negocio real).

## 10. Casos límite y posibles errores

- **El cliente no rellena nunca sus preferencias, ni siquiera tras la solicitud**: el nutricionista ve el estado "solicitado, pendiente de respuesta" indefinidamente — no es un bloqueante para pautar comidas, puede volver a solicitar cuando quiera.
- **Dos profesionales distintos (uno `training`, otro `nutrition`) — solo el de `nutrition` puede solicitar**: el botón "Solicitar cuestionario" no aparece para un profesional con relación `training` únicamente (protegido igual que la lectura, `requireActiveClient("nutrition")`).
- **El cliente cambia sus alergias DESPUÉS de que el nutricionista ya pautó comidas basándose en las antiguas**: el sistema no re-valida ni avisa retroactivamente — el profesional debe volver a consultar la sección si sospecha que algo cambió (limitación conocida del MVP, candidata a alerta automática en el futuro si se decide enlazar alergias con el catálogo de productos).

## 11. Estructura de datos necesaria

```js
// components/nutrition-preferences/nutrition-preferences-schema.js
const ClientNutritionPreferencesSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
  allergies: { type: String, default: "" },
  favoriteFoods: { type: String, default: "" },
  dislikedFoods: { type: String, default: "" },
  cooksAtHome: { type: String, enum: ["yes", "no", "sometimes"], default: null },
  requestedAt: { type: Date, default: null },
  requestedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  respondedAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now },
}, { collection: "clientnutritionpreferences" });
```

## 12. Endpoints/API necesarios

- `GET /nutrition-preferences` (cliente, ve/edita las suyas propias).
- `PUT /nutrition-preferences` (cliente, actualiza, marca `respondedAt`).
- `GET /trainer/clients/:clientId/nutrition-preferences` (profesional, solo lectura, protegido por `requireActiveClient("nutrition")`).
- `POST /trainer/clients/:clientId/nutrition-preferences/request` (profesional, marca `requestedAt`/`requestedBy`, protegido igual).

## 13. Criterios de aceptación verificables

- [ ] Un nutricionista solicita el cuestionario y el cliente ve el aviso correspondiente.
- [ ] El cliente puede rellenar y editar sus 4 campos de preferencias tras la solicitud.
- [ ] Un nutricionista con relación `nutrition` activa ve las preferencias del cliente en modo solo lectura una vez respondidas.
- [ ] Un profesional con `scope: "training"` únicamente NO puede solicitar ni leer (bloqueado por `requireActiveClient("nutrition")`).
- [ ] El campo de alergias se muestra visualmente destacado en la vista del profesional.

## 14. Checklist de implementación

- [ ] `ClientNutritionPreferencesSchema` con los campos de solicitud (`requestedAt`/`requestedBy`/`respondedAt`).
- [ ] Endpoint de solicitud (profesional).
- [ ] Endpoints de cliente (GET/PUT propio) y de profesional (GET solo lectura, con scope).
- [ ] UI del formulario del cliente + badge de "solicitado".
- [ ] UI de la sección de solo lectura en `F06`, con botón de solicitar y el campo de alergias destacado.
- [ ] Verificar los 5 criterios de aceptación.
