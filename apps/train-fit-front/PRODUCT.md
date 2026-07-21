# Product

## Register

product

## Users

Personas entrenando por su cuenta (gimnasio o casa), de nivel principiante a avanzado, que quieren un sistema para entrenar, comer y medir progreso sin fricción. Uso mayoritariamente móvil, sesiones cortas y frecuentes (antes/durante/después de entrenar), a menudo con una mano libre o poca atención disponible — la UI tiene que ser legible y accionable de un vistazo.

## Product Purpose

TrainFit es una app de fitness y nutrición: rutinas personalizadas, control de calorías/macros, cálculo de IMC/1RM, recetas fitness, seguimiento de progreso y plan PRO. Éxito = el usuario vuelve a entrenar y registrar datos de forma constante, sin fricción de UI en el camino.

## Brand Personality

Directa, motivacional, científica, moderna. Referencia de posicionamiento (de `branding.md`/`design-system/brand-guidelines.md` del repo): "fuerte como Gymshark, clara como MyFitnessPal, pulida como Apple Fitness+". Premium fitness global, no un dashboard genérico de SaaS.

## Anti-references

- Dashboards SaaS genéricos claros/beige ("AI slop" de 2026: cream/sand bg, eyebrows en mayúsculas, tarjetas idénticas).
- Cualquier variante en modo claro: la app es **dark-only** (`body[color-theme="dark"]` es el único tema activo, confirmado en variables.scss y en sesiones previas).
- Ruido visual o dashboards con métricas que no llevan a una acción.

## Design Principles

- Claridad antes que ruido.
- Constancia antes que motivación puntual (diseñar para el hábito, no solo el momento).
- Datos útiles, no dashboards innecesarios.
- Energía visual (naranja de marca, alto contraste) sin perder confianza/pulido.
- Reutilizar el sistema Ionic ya establecido (variables.scss, componentes shared-ui) antes de inventar patrones nuevos.

## Accessibility & Inclusion

Contraste AA mínimo, foco visible en elementos interactivos, texto de placeholder/labels siempre legible (no gris apagado). App usada en gimnasios con luz variable e interacción a una mano — objetivos táctiles generosos (Ionic default ~44-48px).
