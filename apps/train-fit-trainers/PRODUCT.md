# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Register

product

## Users

Entrenadores personales y nutricionistas profesionales que gestionan una cartera de varios
clientes reales (rutinas, dietas, check-ins, cobros, tareas diarias). Trabajan en el gimnasio o
entre sesiones, a menudo desde el móvil con una mano libre, cambiando rápido entre clientes.
El trabajo es operativo y repetitivo (pautar, revisar progreso, asignar), no exploratorio.

## Product Purpose

Sustituir el trabajo manual de un entrenador (WhatsApp, Excel, papel) por una herramienta que le
permita construir rutinas y dietas reales para cada cliente, hacer seguimiento de adherencia, y
gestionar la relación profesional (cobros, check-ins, tareas) desde un solo sitio. El éxito es que
un entrenador con 20-30 clientes reales pueda operar el día a día sin fricción ni tener que salir
a otra herramienta.

## Positioning

TrainFit conecta al profesional con sus clientes en la misma plataforma: lo que pauta aquí (rutinas, dietas por menús, hábitos, check-ins, vídeos de técnica) llega a la app del cliente, y lo que el cliente registra (series, comidas, medidas, fotos, vídeos de técnica, dolor) vuelve aquí para revisarlo. Entrenamiento y nutrición en la misma herramienta. Sustituye el seguimiento por WhatsApp y Excel.

## Operating Context

- Día a día con una cartera de 20-30 clientes: pautar y ajustar rutinas y dietas, revisar check-ins y revisiones de técnica, gestionar cobros y tareas.
- Sobre todo en escritorio (`ion-split-pane`, paneles laterales); también desde el móvil entre sesiones.
- Relaciones por ámbito: entrenamiento y/o nutrición. Un nutricionista ve las fotos de progreso de su cliente pero no sus revisiones de técnica.

## Capabilities and Constraints

- Planes del profesional por plazas de clientes contratadas (Free 3, Inicio 20, Profesional 50, Escala 150, con plazas adicionales hasta 12, 40 y 125) con Stripe; ver `train-fit-back/components/trainerBilling/README.md`.
- Fotos y vídeos: el profesional ve las fotos del cliente desde que empezó la relación, salvo los días que el cliente oculte; lo anterior solo si el cliente lo comparte. Las revisiones de técnica duran 90 días salvo «Conservar». Detalle en `docs/plan-medidas-multimedia.md`.
- Se empaqueta con Capacitor para iOS y Android con un diseño propio común; no sigue las convenciones visuales nativas de cada sistema.

## Evidence on Hand

No hay todavía testimonios, métricas de uso, número de clientes ni menciones en prensa. No se deben inventar en la interfaz ni en textos de marketing.

## Product Principles

- **Lo que se pauta aquí se ve y se registra allí**: cada pauta tiene su sitio en la app del cliente y su vuelta para revisarla.
- **Entrenamiento y nutrición en un solo sitio**: la ficha de un cliente cuenta su progreso completo sin salir a otra herramienta.
- **Más rápido que WhatsApp y Excel**: si una tarea diaria cuesta más aquí que en un mensaje o una hoja, el profesional vuelve a ellos.

## Brand Personality

Enérgico y deportivo — línea naranja/negro ya establecida (fuerza, motivación, gimnasio), pulida
hasta sentirse premium en vez de genérica. Directo, sin adornos, orientado a la acción rápida
(el entrenador no tiene tiempo para UI decorativa). Confianza profesional: esto es la herramienta
de trabajo de alguien que cobra por sus servicios, no un juguete.

## Anti-references

- No convertirlo en un dashboard SaaS genérico gris/azul corporativo — perdería la identidad
  deportiva ya establecida.
- No usar iconos emoji como sustituto de iconografía real.
- No animaciones decorativas que ralenticen tareas repetitivas (pautar una comida, marcar una
  serie) — el entrenador hace estas acciones docenas de veces al día.
- No cards anidadas ni jerarquías visuales confusas — la app ya sufre de eso hoy (todo es `.card`
  sobre `.card`).

## Design Principles

- **Tokens antes que hex sueltos**: ningún componente nuevo hardcodea color/espaciado — todo pasa
  por el sistema de tokens (ver `src/theme/tokens.scss`).
- **La navegación no esconde funcionalidad real**: cualquier ruta que exista debe ser alcanzable
  desde el menú, nunca "huérfana" (como lo eran hoy `diet-templates`/`checkin-templates`/`subscription`).
- **Velocidad sobre ceremonia**: acciones repetidas muchas veces al día (pautar, marcar serie) no
  llevan animación de entrada/salida vistosa — feedback inmediato sí, decoración no.
- **Un solo patrón por tipo de componente**: un botón primario, un patrón de card, un patrón de
  fila de lista — reutilizados literalmente, no reinventados por pantalla.
- **Táctil primero**: targets ≥44px, la app se usa con una mano en el gimnasio.

## Accessibility & Inclusion

Objetivo WCAG AA: contraste texto normal ≥4.5:1, texto grande/negrita ≥3:1, targets táctiles
mínimo 44×44px, `aria-label` en todo botón solo-icono, foco visible y navegable por teclado en
todos los controles interactivos, `prefers-reduced-motion` respetado en cualquier animación nueva.
