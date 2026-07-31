# Fuera de alcance del MVP — P2 y descartes estratégicos

Este archivo recoge TODO lo que se identificó durante el análisis (`PLAN_TRAINFIT_ENTRENADORES.md`, propio código, Excel real de un entrenador, y el competidor real Traineeks) y se decidió **no incluir** en el MVP (ni P0 ni P1). Se documenta aquí, en vez de omitirse sin más, para que quede constancia de que fue considerado y por qué se descartó — evita que alguien lo "redescubra" más adelante sin saber que ya se evaluó.

Se distinguen dos categorías, porque no son lo mismo:
- **P2 — futuro real**: se espera construir esto más adelante, cuando haya entrenadores reales usando el MVP y se confirme la demanda. No bloquea nada del MVP actual.
- **Descartado / fuera de alcance total**: se evaluó y se decidió NO construirlo, por razones estructurales (coste de contenido inasumible, contradice decisiones de producto ya tomadas, o es un producto distinto al que se pidió). No es "más adelante", es "no, salvo cambio de estrategia".

## Parte 1 — P2, futuro real

### 1.1 Notificaciones push

**Qué es**: notificaciones remotas (no locales) para invitaciones nuevas, recordatorios de check-in, mensajes, etc.

**Por qué no está en el MVP**: requiere infraestructura 100% nueva (FCM/APNs, registro y gestión de tokens de dispositivo, un servicio de envío) que no existe hoy en ningún punto de TrainFit — el proyecto usa `LocalNotifications` (recordatorios en el propio dispositivo, ya integrado, ver `funcionalidades/F26-recordatorio-cobro.md`) pero nunca push remoto. Ver también `00-riesgos.md` R5.

**Coste técnico si se aborda**: alto — cuenta de desarrollador FCM/APNs, backend que gestione tokens por dispositivo y los invalide correctamente, cola de envío, manejo de fallos de entrega. No es una extensión del código actual, es una pieza de infraestructura nueva de principio a fin.

**Prioridad estimada**: P2. Candidato fuerte cuando el volumen de usuarios haga que el modelo "pull" (el usuario ve las cosas la próxima vez que abre la app) deje de ser suficiente.

### 1.2 Chat en tiempo real entrenador-cliente

**Qué es**: mensajería bidireccional entre profesional y cliente, dentro de la app — confirmado como más valorado de lo esperado tras analizar Traineeks (`PLAN_TRAINFIT_ENTRENADORES.md` §11.3, donde la mensajería es la segunda sección más visible del producto competidor).

**Por qué no está en el MVP**: las "notas internas" del profesional (`funcionalidades/F19-notas-internas.md`) son asíncronas, privadas y unidireccionales (el cliente ni siquiera las ve) — no sustituyen un chat real. Construir chat de cero exige persistencia de conversaciones, estado de lectura/no leído, y (para que se sienta como un chat de verdad, no un formulario) idealmente tiempo real (WebSockets o polling agresivo) — cero de esto existe hoy en el proyecto.

**Coste técnico si se aborda**: alto — nueva colección de mensajes, gestión de conversaciones por par `(trainerId, clientId)`, estado de lectura, y la decisión de si se justifica añadir WebSockets (infraestructura nueva) o si un polling periódico basta para una primera versión.

**Prioridad estimada**: P2, con prioridad relativamente alta dentro de P2 dado el hallazgo de Traineeks — pero no se fuerza al MVP porque el coste de infraestructura es real, no cosmético.

### 1.3 Formularios/cuestionarios personalizados configurables (form builder libre)

**Qué es**: que el profesional pueda inventar sus propias preguntas de texto libre para pedir al cliente, sin estar limitado a un catálogo cerrado.

**Por qué no está en el MVP**: el MVP resuelve la necesidad real (personalización percibida por el profesional) con un **catálogo cerrado de campos togglables** (`funcionalidades/F17-checkin-catalogo-campos.md`, `modelos-de-datos/04-catalogo-campos-checkin.md`) — mismo patrón confirmado como suficiente por Traineeks, que tampoco deja escribir preguntas libres (`PLAN_TRAINFIT_ENTRENADORES.md` §11.2b). Un motor de formularios dinámico de verdad (tipos de campo arbitrarios, validaciones configurables, orden configurable) es un producto en sí mismo, no una extensión del catálogo.

**Coste técnico si se aborda**: alto — motor de definición de formularios (esquema de campos dinámico), renderizado genérico en frontend, validación genérica, versionado de qué formulario exacto respondió el cliente en cada momento (si el profesional edita el formulario después de que el cliente ya respondiera, ¿qué pasa con las respuestas antiguas?). Complejidad de un orden de magnitud mayor que el catálogo cerrado actual.

**Prioridad estimada**: P2. Reevaluar solo si entrenadores reales piden explícitamente preguntas que el catálogo cerrado no cubre y no tiene sentido añadir como campo fijo más.

### 1.4 Pagos de cliente → profesional dentro de la app (marketplace de pagos)

**Qué es**: que el cliente pague al profesional a través de la propia app (equivalente a "Traineeks Pay").

**Por qué no está en el MVP**: **decisión de producto ya confirmada explícitamente** por el usuario durante este análisis — "el cliente paga al entrenador fuera de la app" (Bizum, transferencia, efectivo). El único mecanismo de pago de este proyecto es el profesional pagando SU PROPIA suscripción a TrainFit (`funcionalidades/F02-suscripcion-profesional.md`), vía RevenueCat. `funcionalidades/F26-recordatorio-cobro.md` cubre la necesidad real (que el profesional no se olvide de cobrar) sin mover dinero real dentro de la app.

**Coste técnico si se aborda**: muy alto — pasarela de pagos entre particulares, gestión de comisiones de la plataforma, cumplimiento normativo de intermediación de pagos (KYC, fiscalidad), disputas/reembolsos. Un proyecto en sí mismo, con implicaciones legales serias, no solo técnicas.

**Prioridad estimada**: P2, y condicionado a una decisión de negocio explícita futura (no una decisión técnica) — el propio Traineeks lo trata como upsell opcional posterior tras el alta básica, no como parte del núcleo del producto (`PLAN_TRAINFIT_ENTRENADORES.md` §11.1), lo cual refuerza que no hace falta para un MVP viable.

### 1.5 Fotos de progreso del cliente

**Qué es**: fotos de "antes/después" o seguimiento visual periódico del cliente, visibles para su profesional — confirmadas como sección esperada por Traineeks (`PLAN_TRAINFIT_ENTRENADORES.md` §11.1).

**Por qué no está en el MVP**: dato personal especialmente sensible (imágenes del propio cuerpo del cliente), que exige control de privacidad explícito (quién puede verlas exactamente, cuándo se borran, consentimiento expreso más allá del scope genérico de la relación) — un nivel de cuidado mayor que cualquier otro dato de este proyecto. Además, requiere la misma infraestructura de subida de imágenes que hoy no existe (ver `funcionalidades/F25-foto-perfil-profesional.md`, que sí la construye pero solo para UNA foto de perfil no sensible del profesional, no para fotos del cuerpo de un cliente).

**Coste técnico si se aborda**: medio-alto en infraestructura (comparte la subida de imágenes de `F25`, ampliable), pero alto en superficie de responsabilidad: cifrado en reposo, control de acceso estricto (solo mientras la relación esté activa — decidir explícitamente qué pasa al revocar, a diferencia de rutinas/dietas que se documentó que se conservan), y probablemente un consentimiento explícito separado del scope genérico de `TrainerClient`.

**Prioridad estimada**: P2. Cuando se aborde, tratar el dato con el mismo nivel de cuidado que un dato de salud, no como una imagen más.

### 1.6 Métricas agregadas de negocio para el profesional (CRM)

**Qué es**: ingresos totales, retención de clientes propios, cuántos clientes ha tenido en el tiempo, facturación agregada de su propio negocio — confirmado en Traineeks como una sección real ("Gestión de negocio agregada", `PLAN_TRAINFIT_ENTRENADORES.md` §11.1).

**Por qué no está en el MVP**: es CRM del negocio del PROFESIONAL, no una funcionalidad de fitness/nutrición — un dominio completamente distinto al núcleo de este proyecto. Construirlo bien (dashboards, agregaciones históricas, exportables) es trabajo sustancial que no aporta nada al objetivo central del MVP (que el profesional pueda gestionar el entrenamiento/nutrición de sus clientes).

**Coste técnico si se aborda**: medio — en gran parte agregaciones sobre datos que ya existirían (`TrainerClient` con fechas, `TrainerPayment` de `F26` si se implementó como colección hermana) más un dashboard de presentación; no requiere modelos de datos nuevos complejos, pero sí un esfuerzo de diseño de UI de reporting que hoy no existe en ningún punto del proyecto.

**Prioridad estimada**: P2, baja dentro de P2 — valor real pero secundario frente a las demás piezas de esta lista.

### 1.7 Plantillas de rutina/dieta reutilizables por el profesional entre varios clientes (biblioteca propia)

**Qué es**: que el profesional guarde una rutina/dieta como "plantilla" reutilizable, distinta de sus propias tablas (`userId` = él mismo) que hoy ya cumplen parcialmente esa función en el MVP (`funcionalidades/F11-asignar-rutina.md`, punto 2).

**Por qué no está en el MVP**: el MVP ya cubre el caso de uso básico ("duplicar algo que ya tengo hacia un cliente nuevo") reutilizando las propias tablas del profesional como origen de duplicado — no hace falta un concepto de "biblioteca de plantillas" separado de "mis rutinas" para que la función sea usable desde el día 1. Una biblioteca de plantillas de verdad (con nombre, categorías, quizá compartible entre profesionales) es una mejora de comodidad, no un requisito funcional.

**Coste técnico si se aborda**: bajo-medio — es principalmente una capa de organización/UI sobre datos que ya existen (tablas propias del profesional), más quizá un flag `isTemplate` o una colección de metadatos de plantilla; no es un cambio de arquitectura.

**Prioridad estimada**: P2, de las más baratas de esta lista si se decide abordar — candidata a subir de prioridad rápido si los profesionales que prueben el MVP piden explícitamente organizar sus "rutinas base" de otra forma que simplemente sus propias tablas sueltas.

## Parte 2 — Descartado / fuera de alcance total (no es "más adelante")

### 2.1 Índice de Estímulo Muscular/Articular/Fatiga

**Qué es**: un indicador calculado, por grupo muscular/articulación, de cuánto estímulo/fatiga acumula el cliente según los ejercicios que realiza — una idea de valor real para un entrenador, pero que exigiría mapear cada ejercicio del catálogo de TrainFit contra qué músculos/articulaciones implica y en qué medida.

**Por qué se descarta (no solo se pospone)**: el coste no es de desarrollo de funcionalidad, es de **contenido**: mapear correctamente cada ejercicio del catálogo (potencialmente cientos) contra grupos musculares/articulaciones y su grado de implicación es un trabajo de curación de contenido comparable en tamaño al resto de la app junta. No es una feature de coste medio que se pueda planificar como P2 normal — requeriría decidir invertir en un producto de contenido aparte, una decisión de negocio de fondo distinta a construir esta app.

**Prioridad estimada**: fuera de alcance, nota estratégica únicamente. Reevaluar solo si el negocio decide invertir explícitamente en un catálogo de contenido de ese tamaño, con presupuesto y tiempo dedicados a ello, no como una tarea más de este roadmap.

### 2.2 "Mi Store" — perfil público del profesional con tienda (suscripciones, packs, productos digitales, link compartible)

**Qué es**: en Traineeks, un perfil público del entrenador tipo landing page/tienda, para que capte clientes nuevos desde fuera de la plataforma (link compartible, productos digitales, suscripciones a contenido).

**Por qué se descarta**: es la capa de **captación de clientes nuevos** de un producto competidor, no la de **gestión de los clientes que un profesional ya tiene** — que es exactamente el encargo original de este proyecto ("los entrenadores usan TrainFit:Entrenadores para llevar a SUS clientes desde TrainFit"). Además, un storefront público sin cobro integrado no tiene sentido de negocio, y con cobro integrado es exactamente el marketplace de pagos ya descartado en la Parte 1, punto 1.4 — construirlo contradice esa decisión ya tomada, no la complementa.

**Prioridad estimada**: fuera de alcance del roadmap de gestión. Si en el futuro el negocio decide entrar en "captación de entrenadores nuevos hacia la plataforma" como estrategia de crecimiento (un producto distinto, "v2 de captación"), este hallazgo queda como referencia de que Traineeks ya lo resuelve así — pero es una decisión de estrategia de negocio, no una tarea técnica pendiente de este MVP.

### 2.3 Cuestionario de alta del cliente — capacidad de edición por parte del profesional

**Qué es**: que el profesional pueda añadir/editar/quitar preguntas del cuestionario de alta de un cliente nuevo (más allá de las preferencias nutricionales fijas de `funcionalidades/F29-preferencias-nutricionales-cliente.md`).

**Por qué se descarta para el MVP (no para siempre)**: Traineeks confirma el patrón "núcleo fijo + capa editable pequeña" (`PLAN_TRAINFIT_ENTRENADORES.md` §11.2c) — pero incluso así, es capacidad de configuración añadida sobre un cuestionario que, en el MVP, se lanza 100% fijo. No tiene sentido construir la capa de edición antes de saber, con profesionales reales usando el cuestionario fijo, qué preguntas adicionales piden de verdad.

**Prioridad estimada**: P2 condicionado — se revisará una vez el MVP esté en uso real y se sepa qué falta, no antes. Distinto de los descartes de 2.1/2.2 en que aquí sí se espera construirlo eventualmente, solo que su alcance concreto depende de datos que no existen todavía.

### 2.4 Calculadora energética multi-ecuación (nutrición)

**Qué es**: cálculo de necesidades calóricas del cliente usando varias fórmulas reconocidas (Harris-Benedict, Mifflin-St Jeor, etc.), en vez de que el nutricionista introduzca los números ya calculados externamente.

**Por qué no está en el MVP**: `funcionalidades/F13-asignar-objetivos-macros.md` ya cubre la necesidad mínima viable (el nutricionista introduce los objetivos finales directamente, calculados por su cuenta si hace falta) — la calculadora es un diferenciador de calidad de vida para el profesional, no un bloqueante funcional.

**Prioridad estimada**: P1/P2 — el documento origen ya lo marca como diferenciador de valor para el rol de nutricionista; candidato razonable a subir de prioridad pronto después del lanzamiento del MVP, pero no forma parte de él.

### 2.5 Seguimiento de dolor/rehabilitación (EVA)

**Qué es**: un campo de escala de dolor (0-10, escala EVA) fechado, para seguimiento de procesos de rehabilitación.

**Por qué no está en el MVP**: no estaba en el encargo original, añade alcance a un caso de uso (rehabilitación) distinto del núcleo entrenamiento/nutrición de este MVP.

**Coste técnico si se aborda**: bajo — encaja como una extensión pequeña de `funcionalidades/F19-notas-internas.md` (un campo numérico opcional en una nota fechada), no como un modelo nuevo.

**Prioridad estimada**: P2, se dejaría para cuando exista demanda real de un caso de uso de rehabilitación entre los profesionales que usen la app.
