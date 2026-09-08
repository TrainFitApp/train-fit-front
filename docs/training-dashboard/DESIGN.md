---
name: TrainFit Trainers · Training dashboard
description: Contrato local de comparación, fases y dolor en Planner.
colors: { primary: "#fe9000", reference-a: "#8db6dd", surface: "#1a1a1a", text: "#ffffff" }
typography: { label: { fontSize: "12px", fontWeight: 600 }, table: { fontSize: "13px" } }
rounded: { sm: "8px" }
spacing: { "2": "8px", "3": "12px", "6": "24px" }
components: { comparison-select: { backgroundColor: "{colors.surface}", textColor: "{colors.text}", rounded: "{rounded.sm}", padding: "8px" } }
---
# Design System: Training dashboard

## Overview
**Creative North Star: "Revisión directa del entrenamiento"**
Modo **Operate**, limitado a comparación, fases y dolor en Planner. Hereda el mundo oscuro/naranja de [PRODUCT](../../apps/train-fit-trainers/PRODUCT.md) y [tokens.scss](../../apps/train-fit-trainers/src/theme/tokens.scss); la implementación actual es la autoridad. No redefine DESIGN global.
**Key Characteristics:**
- Tabla A/B explícita; fases primero; estados de dolor distinguibles.
Cierre recibido: **`disposition: ship` solo para distinción del dolor y legibilidad móvil de fases**; no certifica toda la UI. Sin comp; fixture sintética, no sesión de producción. [Implementación y validación](../training-dashboard.md) contiene los resultados. Detector con fallback regex, sin garantías de cobertura.
Evidencia en [capturas del proyecto padre](../../../.impeccable/review/training-dashboard/): `desktop-top.png`, `desktop.png`, `mobile-top.png`, `mobile.png`, `mobile-detail.png`, `mobile-pain-empty.png`, `mobile-pain-zero.png`. Los controles de simulación pertenecen a la fixture.

## Colors
Naranja heredado para B, aumentos y controles; azul local para A y descensos. Superficies, texto secundario y bordes translúcidos usan tokens existentes. El azul de comparación no establece una paleta global.
**The Direction Rule.** Flechas, signos y texto indican B menos A, nunca mejora garantizada.

## Typography
Familia heredada de Ionic; etiquetas compactas, números tabulares alineados a la derecha y B en negrita. Tabla de 13 px, 12 px hasta 480 px; unidades visibles. No se introduce una fuente ni una escala global.

## Layout
**The Phases First Rule.** Fase vigente, programadas e historial preceden al calendario y a la comparación.
Hasta 700 px, el acceso al Planificador baja bajo la fase vigente; nombres programados envuelven y la fecha ocupa otra fila. Hasta 640 px, calendario y comparación se apilan a ancho completo. A/B conserva dos columnas.

## Elevation & Depth
Tonos oscuros y bordes heredados; acento suave para fase vigente y umbral alcanzado. Comparación y dolor no añaden sombras.

## Shapes
Selectores y registros de dolor usan esquinas de 8 px; fase activa de 12 px y tarjeta de comparación de 14 px, valores locales existentes. Selectores/reintentos: mínimo 44 px y foco de acento visible.

## Components
“Comparar por”, ejercicio con carga y A/B son selectores directos. La tabla precede al gráfico sin animación. Conserva el par disponible al cambiar métrica; ofrece carga, error/reintento, vacío y falta de segundo microciclo.
Tabla: volumen/sesión, series/sesión, sesiones registradas y series totales. Ejercicio: carga máxima, reps y RIR de esa misma serie realizada, series, reps totales y volumen. Cero permanece cero; ausencia “—”; RIR −1 “Fallo”. Rangos/fallo no producen delta numérico; RIR no lleva porcentaje.
Grupos musculares: series/sesión y barras A/B; una serie puede implicar varios grupos, sin porcentajes de reparto. El calendario puede recortar microciclos y contener sesiones parcialmente registradas.
Fases conservan programar, cambiar fecha, quitar, abrir Planner e historial. Dolor usa `recent7d`, último registro válido por zona y actualización al entrar en Planner.
**The Recorded Zero Rule.** Un cero posterior sustituye el positivo de esa zona; ausencia, carga y error nunca equivalen a cero.
Positivos: zona, nivel, fecha, nota y umbral si configurado; “Umbral alcanzado” exige nivel positivo ≥ umbral de esa zona. Todos a cero: “Últimos registros: 0/10” y fecha; sin entradas: “Sin registros en los últimos 7 días.” Carga: “Actualizando registros…”; error con reintento. No hay umbral universal.

## Do's and Don'ts
- **Do** leer carga, reps y RIR juntos y mantener nombres/fechas de fases legibles.
- **Don't** inventar ceros, umbrales o mejoras; extender este ship a toda la UI.
No canonizado: auxiliares pequeños, subtítulo de historial con `--tf-text-faint` (token excluido para texto) y controles de fixture; son deuda heredada o material de prueba, fuera de las dos correcciones.
