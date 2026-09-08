# Comparar microciclos · TrainFit Trainers

## Diagnóstico

El modal anterior situaba tarjetas, explicaciones y agregados delante de los ejercicios. Las prescripciones se comparaban como frases, obligando a buscar carga, repeticiones y RIR. El filtro de cambios estaba activado inicialmente. El cálculo podía perder cambios intermedios si coincidían máximo de carga y envolvente de repeticiones; el cero se trataba como ausencia de peso.

## Diseño aplicado

Modo Operate: A → B, valor B destacado, números tabulares, superficies y colores existentes de Trainers. Extensión local sin cambio de identidad. Se conserva el modal de solo lectura, el emparejamiento por posición/identidad y la selección del tablero. No cambia el backend.

- Selectores A/B con propósito, números legibles en móvil e intercambio inmediato.
- Pauta: repeticiones y RIR esperados junto al peso guardado.
- Registrado: solo series con `doned === true`, usando `reps` y `rir`, sin sustituir ausencias por pauta.
- Resumen: series, RIR medio, fallo y sesiones con series; cobertura de completadas con numerador, denominador y porcentaje.
- Tabla: carga, repeticiones, series y RIR; todos los ejercicios inicialmente visibles, filtro Solo cambios y detalle por serie.
- Flechas, signos y colores indican dirección, sin veredictos de mejora. Una descarga puede reducir trabajo deliberadamente.
- Volumen muscular desplegable, barras A/B en escala común y frecuencia por sesiones.
- Móvil: resumen en dos columnas y tabla desplazable con nombres fijados.

## Semántica y límites

Los deltas son B − A. Porcentajes con A como denominador; se omiten ante cero o ausencia. Carga usa el máximo de las series disponibles, conservando el rango visible. Repeticiones tienen delta numérico cuando cada lado es uniforme; para rangos se conserva el detalle.

RIR muestra cambios absolutos de repeticiones en reserva, sin porcentaje: 2 → 1 expresa una repetición menos en reserva. Se mantiene esta convención ante cero, rangos y FALLO. La media excluye FALLO y ausencias; normaliza valores heredados. Cardio/isométricos no entran en carga ni RIR agregado; tiempo y distancia aparecen en el detalle.

El modelo comparte `weight` entre pauta y ejecución: no conserva la carga originalmente prescrita después de editarla. Las copias conservan valores; marcarlos completados puede confirmarlos sin reintroducirlos. La UI explica este límite y los registros parciales. Más carga aislada no acredita mejora física.

Los ejercicios duplicados se emparejan consumiendo ocurrencias por posición/identidad dentro de la sesión. Mover un ejercicio entre días aparece como solo A/solo B.

La lectura en menos de diez segundos es un objetivo de diseño pendiente de validación con entrenadores; no se afirma como resultado medido.

## Verificación

Desde `train-fit-front`:

```powershell
node --test apps/train-fit-trainers/src/app/features/planner/utils/planner-compare.test.cjs
```

11 pruebas correctas: cambios intermedios, distribución de reps, cero, cardio/isométricos, tiempo, copias, ausencias, RIR/fallo, sesiones vacías, duplicados, inversión de deltas y estados vacíos. Build Angular `pre` correcto; TypeScript estricto de los archivos modificados sin diagnósticos. Persisten avisos del build sobre archivos compartidos no utilizados.

Revisión del componente real en una prueba aislada Angular/Ionic con datos ficticios: escritorio 1280×900 y móvil 390×844. Verificados filtro, intercambio, modo registrado, detalle de series y scroll horizontal con nombres fijos. No se ejecutó la integración autenticada: la app local mostraba inicio de sesión.

Capturas: `.impeccable/review/compare-microcycles/` en la raíz del proyecto. Detector de diseño en modo regex sin hallazgos, sin evaluación de contraste computado; contraste revisado visualmente.
