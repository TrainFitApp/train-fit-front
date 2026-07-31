# Riesgos técnicos y de producto (transversales)

Estos riesgos no pertenecen a una sola funcionalidad — atraviesan varias o todo el proyecto. Cada uno indica qué funcionalidades lo activan y cómo mitigarlo en código, no solo en teoría.

## R1 — Seguridad de acceso a datos de terceros (EL riesgo real de este proyecto)

**Qué puede salir mal**: cualquier endpoint bajo `/trainer/clients/:clientId/*` que derive `trainerId` de un lugar que el cliente HTTP controla (body, query, un header no verificado) en vez de `req.auth.userId` (la sesión autenticada) permite que un profesional lea o escriba datos de un cliente con el que NO tiene relación activa, simplemente adivinando o iterando `clientId`.

**Por qué es más grave aquí que en el resto de TrainFit**: una auditoría del código actual de `table-dao.js` confirma que `duplicateTable`/`copyTable` derivan el `userId` del `idUser` que manda el cliente HTTP en el body, en vez de la sesión autenticada — el mismo patrón de fallo que describe este riesgo ya existe hoy en código real, no es una hipótesis teórica. En el contexto de rutinas propias, ese fallo "solo" permite operar con un `userId` incorrecto. **En el contexto de esta app, el mismo patrón de fallo expondría peso, dietas, entrenamientos y notas privadas de una persona a un tercero no autorizado** — es un fallo de privacidad de datos de salud, no un bug cosmético.

**Mitigación obligatoria, no opcional**:
1. El middleware `requireActiveClient(req.auth.userId, req.params.clientId, requiredScope)` (definido en `arquitectura/02-modulo-backend-trainerclients.md`) es la ÚNICA fuente de verdad de autorización. Ningún endpoint bajo `/trainer/clients/:clientId/*` debe implementar su propia comprobación ad-hoc.
2. `trainerId` se deriva SIEMPRE de `req.auth.userId` (inyectado por `validateAuth.js` tras verificar el JWT). Nunca de `req.body.trainerId`, `req.query.trainerId` ni ningún campo equivalente.
3. Cada endpoint nuevo debe tener un test (manual como mínimo, automatizado si hay tiempo) que confirme: petición con un `clientId` válido pero sin relación `active` → 403, no 200 con datos.
4. Antes de dar el MVP por cerrado, auditar CADA endpoint de `apis/especificacion-endpoints.md` una última vez contra este checklist.

**Afecta a**: todas las funcionalidades F09-F13, F19, F20, F26.

## R2 — Publicación en App Store y Play Store (riesgo de calendario, no de código)

**Qué puede pasar**: los tiempos de revisión de Apple/Google no los controla el equipo. Además, una app que da acceso a un profesional a datos de salud/peso/nutrición de OTRAS personas (sus clientes) puede recibir preguntas de revisión sobre tratamiento de datos de terceros — más escrutinio que una app de un solo usuario sobre sus propios datos.

**Mitigación**: no es de código, es de planificación — reservar margen de calendario para revisión y posibles idas y vueltas con Apple, y preparar de antemano una explicación clara del modelo de consentimiento (el cliente acepta explícitamente la relación antes de que el profesional vea nada, ver `F04-aceptar-rechazar-invitacion.md`) por si la revisión lo pide.

**Afecta a**: `arquitectura/01-scaffold-nueva-app.md`, el roadmap general.

## R3 — El dominio de nutrición tiene menos reutilización directa de la que parece a primera vista

**Qué puede pasar**: `pasteMeal` (reutilizado en `F12-pautar-comida.md`) resuelve bien "copiar una comida concreta a un hueco del cliente", pero no existe hoy ningún concepto de "plantilla de dieta completa reutilizable" (sí existe para rutinas: `copyTable`/`duplicateTable`/plantillas públicas). Si durante la implementación de F12 se descubre que el flujo real que quiere el nutricionista es más parecido a "aplicar un día entero de una vez" que a "una comida cada vez", el esfuerzo sube de Media a Media-Alta.

**Mitigación**: `F12-pautar-comida.md` ya especifica el flujo a nivel de comida individual como el alcance del MVP explícitamente — si durante el desarrollo alguien propone "vamos a hacer que se pueda pautar el día completo de una vez" sin pasar por este documento, es una ampliación de alcance que debe reconocerse como tal (y probablemente moverse a P1/P2), no una pequeña extensión.

**Afecta a**: `F12-pautar-comida.md`, `F28-menus-alternativos-nombrados.md`.

## R4 — Repetir el patrón de "plantilla compartida por referencia" por comodidad de desarrollo

**Qué puede pasar**: durante la implementación de `F11-asignar-rutina.md`/`F30-actualizar-en-bloque.md`, puede parecer más simple (menos escritura de datos, menos espacio en BD) hacer que varias `TrainerClient` apunten a la MISMA `Table`/`Diet` en vez de copiar. Esta app YA evaluó ese modelo (lo usa un competidor real, Traineeks) y lo **rechazó explícitamente** por el riesgo de propiedad ambigua/compartida mal gestionada — el propio Traineeks reconoce el peligro con un modal de advertencia al editar una plantilla compartida (`PLAN_TRAINFIT_ENTRENADORES.md` §11.2a), señal de que incluso el competidor que sí lo implementa lo trata como una operación arriesgada, no como algo trivial.

**Mitigación**: cualquier implementación de asignación de rutina/dieta debe seguir creando una copia con `userId` = cliente (vía `copyTable`/`pasteMeal`), nunca una referencia compartida. Si alguien propone lo contrario durante el desarrollo, señalar este riesgo explícitamente antes de aceptarlo.

**Afecta a**: `F11-asignar-rutina.md`, `F12-pautar-comida.md`, `F30-actualizar-en-bloque.md`.

## R5 — Sin infraestructura de notificaciones remotas

**Qué puede pasar**: cualquier expectativa de "el cliente se entera al instante de que le han asignado algo" no se cumple con la arquitectura actual (pull, no push) — confirmado por auditoría de código, no existe FCM/APNs, solo `LocalNotifications` (recordatorios locales al dispositivo). Si durante el desarrollo del MVP alguien asume notificaciones push como algo "que ya debería funcionar", es una expectativa equivocada que hay que corregir pronto, no descubrir tarde.

**Mitigación**: dejar explícito en cualquier demo/prueba de aceptación que el cliente ve lo asignado "la próxima vez que abre la pantalla correspondiente", no al instante. Push queda fuera del MVP (`fuera-de-alcance/p2-futuro.md`).

**Afecta a**: F11, F12, F13, F19, F26.

## R6 — Ambigüedad de producto sin resolver que se cuela en el código como una suposición silenciosa

**Qué puede pasar**: `00-decisiones-pendientes.md` registra las decisiones de producto tomadas hasta ahora. El riesgo no es que falten — es que un desarrollador (humano o IA) las resuelva implícitamente con la primera opción que se le ocurra mientras escribe código, sin que quede registrado en ningún sitio que se tomó esa decisión.

**Mitigación**: cada archivo de funcionalidad que depende de una decisión pendiente lo señala explícitamente con su "supuesto de trabajo". Si al implementar se toma una decisión distinta al supuesto documentado, debe actualizarse `00-decisiones-pendientes.md` en el mismo cambio, no dejarlo desincronizado.

**Afecta a**: ver la tabla de "Bloquea" en `00-decisiones-pendientes.md`.

## R7 — Migración de `Anthropometry`, una colección ya en producción (D8)

**Qué puede salir mal**: a diferencia de `assignedByTrainerId` en `Table` (campo opcional, aditivo, cero riesgo), la extensión de `Anthropometry` para el check-in (`modelos-de-datos/05-cambios-modelos-existentes.md`, D8) parte 3 campos existentes (`bicepsRelaxed`, `bicepsContracted`, `calf`) en izquierda/derecha. Los documentos históricos de usuarios reales quedan con el campo antiguo, no con los nuevos — cualquier lectura que asuma que todos los documentos tienen ya el formato nuevo mostrará huecos o `undefined` para datos anteriores a la migración.

**Mitigación obligatoria**:
1. No eliminar los campos antiguos del schema al desplegar — coexisten con los nuevos hasta decidir explícitamente qué hacer con el histórico (ver `05`, sección 2.2).
2. El DAO de `anthropometry` debe hacer upsert por fusión de campos (`$set` parcial), nunca reemplazar el documento — el mismo día puede recibir escritura del cliente auto-registrándose Y del check-in del profesional.
3. Decidir explícitamente (no asumir) si se ejecuta un script de migración que copie valores históricos únicos a ambos lados, antes de dar el cambio por cerrado.

**Afecta a**: `funcionalidades/F17-checkin-catalogo-campos.md`, `modelos-de-datos/04-catalogo-campos-checkin.md`, `modelos-de-datos/05-cambios-modelos-existentes.md`.
