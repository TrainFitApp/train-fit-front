# Resumen del cliente: decisiones de diseño

Este componente ayuda al profesional a recuperar el contexto del cliente,
interpretar su evolución y decidir el siguiente paso dentro de su etapa de seguimiento.
Es una extensión de la ficha de TrainFit Trainers y del lenguaje Operate existente.

## Continuidad visual y jerarquía

- Reutiliza los tokens `--tf-*` de texto, superficies, bordes, espacios, tipografía,
  radios, tamaño táctil y movimiento. No introduce un sistema visual propio.
- Organiza contexto, evolución y seguimiento en tres tarjetas con fondo elevado,
  borde visible y radio de 12 px, por petición expresa del usuario. Las tarjetas se
  apilan y conservan el orden de lectura; dentro se agrupa con columnas y separadores.
- Los encabezados usan 24 px/700 (20 px en móvil), títulos internos 18 px/700,
  etiquetas 13 px/500 y valores de contexto 16 px/600. Las cifras de peso usan
  32 px/700, 28 px en móvil; las unidades y fechas se leen como información secundaria.
  La familia tipográfica del producto se conserva y los tamaños permiten escalar texto.
- Cada etiqueta se agrupa encima de su valor, con 4–8 px internos y 20–24 px entre
  datos. Las tablas separan cifras, unidades y fechas. Los textos narrativos mantienen
  peso normal y medida de lectura de hasta 70–75 caracteres.
- Los iconos de título no llevan relleno ni contorno de botón. Las tarjetas y bloques
  informativos permanecen estáticos; las entradas de atención tienen contorno, flecha
  y estados de foco/hover propios. No se añaden animaciones decorativas.
- Los botones comparten roles dentro de tarjetas y modales: acento sólido para
  registrar/guardar, relleno gris para alternativas y contorno para consultas auxiliares.
  El naranja suave identifica avisos, no una categoría adicional de botón. Los textos
  secundarios usan el token de contraste legible sobre las superficies del componente.
- La identidad, la atención pendiente y el objetivo forman el primer recorrido de
  lectura. Notas y contexto alimentario comparten fila cuando hay anchura suficiente.
  El panel de peso reúne tres referencias comparables; sus variaciones siguen neutras.
  En móvil, inicio y último pesaje comparten fila y la variación ocupa la siguiente,
  para mantener cifras legibles sin comprimirlas en tres columnas.
- Sitúa la franja de atención inmediatamente bajo la identidad: check-ins por revisar,
  respuestas fuera de plazo, referencias pendientes, siguiente tarea y última revisión.
  Cada entrada es un botón con contorno y flecha al apartado donde se puede actuar.
  Sólo los pendientes de revisión y las tareas vencidas reciben énfasis de atención;
  no se añade una valoración automática de salud o de progreso corporal.
- Objetivo, limitaciones y notas fijadas conservan los saltos de línea.
  Los textos de más de 320 caracteres tienen una vista inicial ampliable.

## Datos que se pueden interpretar

- Distingue referencia inicial de la etapa, último pesaje individual y cambio entre ambos.
  Presenta las fechas reales y expresa las ausencias como falta de información.
- Las medias son de lunes a domingo, con número de pesajes y señal de semana parcial.
  El texto explica que los días ausentes no cuentan como cero y que pocos registros
  no describen necesariamente toda la semana. No asigna un juicio automático al cambio.
- La gráfica muestra hasta ocho semanas y necesita dos medias válidas.
  Las semanas sin registros interrumpen la línea; no hay interpolación ni ceros añadidos.
  La tabla conserva los valores, fechas y cobertura que permiten comprobar la gráfica.
- Hasta tres perímetros destacados muestran inicio, último registro y variación,
  con fechas y aviso cuando debe revisarse la medición que originó una referencia.
- Las etapas anteriores se presentan como historial con sus referencias y revisiones.
  El contenido de seguimiento actual y las acciones de edición se restringen según etapa.

## Lectura y edición

- El modal de intake conserva lo declarado al empezar y distingue los complementos
  añadidos después. Si sólo existe una versión anterior recuperable, lo indica.
- Editar contexto actual, perfil compartido y preferencias alimentarias son acciones
  diferenciadas. Los formularios explican dónde se guardará cada cambio.
- Registrar una medición y confirmar una referencia inicial piden una fecha real.
  Reutilizar un valor existente es explícito; sustituirlo requiere confirmar la corrección.
- Los modales mantienen el borrador al cerrar durante la sesión del componente.
  Los fallos de guardado y conflictos conservan la entrada y ofrecen una acción concreta.
  Durante el envío se bloquean el cierre y el guardado repetido.

## Trabajo privado del profesional

- Notas, tareas y revisiones se identifican como privadas. Las notas fijadas aportan
  contexto al Resumen; el resto se consulta en su historial.
- Las tareas incluyen vencimiento opcional y una acción propia para completarlas.
- La revisión global registra conclusión, siguiente paso opcional y tarea relacionada.
  Guardarla no revisa check-ins, completa tareas ni envía mensajes al cliente.
  Rectificar crea otra revisión y conserva la conclusión anterior.

## Adaptación y alcance

- A 680 px o menos, contexto y seguimiento pasan a una columna y los modales ocupan
  la pantalla. Los perímetros usan filas adaptadas que conservan valores, fechas y acciones;
  no se elimina información para hacer caber la tabla. Las tres columnas semanales permanecen.
- La pestaña Resumen elimina el padding horizontal duplicado de su envoltorio.
  Las tarjetas usan 12 px laterales en móvil; los encabezados y acciones admiten varias
  líneas. En móvil los pares de contexto pasan a una columna, con etiqueta encima
  del valor; los perímetros mantienen tres comparaciones con unidades diferenciadas.
- Las transiciones se limitan a hover, foco y presión de controles. No se animan
  las tarjetas al recorrer una pantalla de uso repetido.
- Se usan etiquetas de formulario, encabezados de tabla, foco visible, estados anunciados,
  tamaños táctiles del producto y reducción de movimiento según la preferencia del sistema.
  Estas medidas describen la implementación; no constituyen una auditoría completa de accesibilidad.

Fuentes: `client-overview.component.html`, `client-overview.component.scss`,
`client-overview.component.ts` y `weekly-weight-chart.ts` del mismo directorio.
