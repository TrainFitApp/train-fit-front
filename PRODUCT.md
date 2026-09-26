# Product

> App del **cliente** (`apps/train-fit-front` + `packages/shared-*`). Es el contexto por defecto de impeccable en todo el monorepo.
> `apps/train-fit-trainers` tiene su propio `PRODUCT.md`, que manda sobre este.
> Borrador del 2026-09-25, sacado del código. Revisar.

## Register

product

## Users

Personas que entrenan en el gimnasio y controlan su dieta, desde el móvil. Hay dos perfiles:
- **Independientes**: se montan sus rutinas y su dieta. Usan la versión gratis con anuncios o la premium.
- **Clientes de un entrenador**: reciben rutinas, dietas, tareas y check-ins que les pauta su profesional (pestaña Coach), y le reportan peso, medidas, dolor y bienestar.

Se usa en dos momentos: durante el entreno (serie a serie, con una mano y entre descansos) y al comer (buscar alimentos y apuntar lo consumido). Son sesiones cortas, repetidas cada día.

## Product Purpose

Que registrar el entreno y la dieta de cada día sea rápido, y que el cliente vea si va cumpliendo. Si tiene entrenador, que tenga claro qué le toca hoy y le pueda reportar sin salir de la app. El éxito es que lo use a diario sin fricción.

## Brand Personality

La misma línea que la app del entrenador: naranja `#fe9000` sobre fondo oscuro (el tema por defecto; también hay tema claro), deportiva y directa. Motiva sin infantilizar.

## Anti-references

- No usar emoji en lugar de iconos.
- No poner animaciones decorativas en acciones que se repiten muchas veces (marcar una serie, apuntar una comida).
- No meter cards dentro de cards.
- No mezclar lo que pautó el entrenador con lo que apunta el cliente: lo pautado es de solo lectura y debe distinguirse a simple vista.

## Design Principles

- **Variables del tema antes que hex sueltos**: `packages/shared-theme` (`variables.scss`, `global.scss`). Ese `global.scss` lo comparten las 3 apps, así que las clases internas de Ionic se acotan siempre.
- **Colores de macros fijos**, los mismos que en la app del entrenador: kcal `#fe9000`, proteína `#3880ff`, carbohidratos `#2dd36f`, grasa `#ffc409`.
- **Velocidad sobre ceremonia**: la respuesta al tocar es inmediata y sin adornos.
- **Táctil primero**: áreas pulsables de 44px como mínimo, y la app se usa con una mano.
- **Todo texto va en i18n**, en `es.json` y `en.json`.

## Accessibility & Inclusion

WCAG AA:
- Contraste ≥ 4.5:1, o ≥ 3:1 en texto grande.
- Áreas táctiles de 44×44px.
- `aria-label` en los botones que solo llevan icono.
- Foco visible.
- Respetar `prefers-reduced-motion`.
