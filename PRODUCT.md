# Product

> App del **cliente** (`apps/train-fit-front` + `packages/shared-*`). Es el contexto por defecto de impeccable en todo el monorepo.
> `apps/train-fit-trainers` tiene su propio `PRODUCT.md`, que manda sobre este.
> Borrador del 2026-09-25, sacado del código. Plataforma, posicionamiento y pruebas confirmados el 2026-09-28.

<!-- impeccable:product-schema 1 -->

## Platform

web

## Register

product

## Users

Personas que entrenan en el gimnasio y controlan su dieta, desde el móvil. Hay dos perfiles:
- **Independientes**: se montan sus rutinas y su dieta. Usan la versión gratis con anuncios o la premium.
- **Clientes de un entrenador**: reciben rutinas, dietas, tareas y check-ins que les pauta su profesional (pestaña Coach), y le reportan peso, medidas, dolor y bienestar.

Se usa en dos momentos: durante el entreno (serie a serie, con una mano y entre descansos) y al comer (buscar alimentos y apuntar lo consumido). Son sesiones cortas, repetidas cada día.

## Product Purpose

Que registrar el entreno y la dieta de cada día sea rápido, y que el cliente vea si va cumpliendo. Si tiene entrenador, que tenga claro qué le toca hoy y le pueda reportar sin salir de la app. El éxito es que lo use a diario sin fricción.

## Positioning

TrainFit conecta al profesional y a su cliente en la misma plataforma: lo que pauta el entrenador o el nutricionista (rutinas, dietas por menús, hábitos, check-ins) llega a esta app, el cliente registra su día a día y el profesional lo revisa desde la suya. Entrenamiento y dieta van juntos en una sola app, no en dos. Para el profesional, sustituye el seguimiento por WhatsApp y Excel.

## Operating Context

- En el gimnasio, serie a serie y entre descansos: apuntar peso, repeticiones y RIR con una mano; consultar la nota o el vídeo de técnica del entrenador; grabar una serie y mandársela para que la revise.
- Al comer: elegir el menú del día, buscar alimentos y marcar lo consumido.
- Cada semana o cuando lo pide el profesional: responder check-ins (peso, perímetros, bienestar, fotos de progreso).
- Medidas: peso diario, perímetros, fotos de progreso con comparador y vídeos de progreso.

## Capabilities and Constraints

- Planes: versión gratis con anuncios y premium (RevenueCat). Un cliente con relación activa con un profesional no ve anuncios y queda exento de varios límites mientras dure la relación.
- Fotos y vídeos: los suben los clientes premium o con profesional activo; el resto ve una card de Premium. Consentimiento explícito antes de la primera subida. Detalle en `docs/plan-medidas-multimedia.md`.
- Lo pautado por el profesional es de solo lectura para el cliente.
- Se empaqueta con Capacitor para iOS y Android con un diseño propio común; no sigue las convenciones visuales nativas de cada sistema.

## Evidence on Hand

No hay todavía testimonios, métricas de uso, número de clientes ni menciones en prensa. No se deben inventar en la interfaz ni en textos de marketing.

## Product Principles

- **El profesional y el cliente ven lo mismo desde su lado**: cada cosa que se pauta tiene su sitio para registrarla y su sitio para revisarla.
- **Entreno y dieta son un solo seguimiento**: el cliente no debería tener que saltar entre apps ni modelos mentales distintos para contar cómo va.
- **Registrar es más rápido que escribir un WhatsApp**: si apuntar algo cuesta más que mandar un mensaje al entrenador, se vuelve al mensaje.

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
- **Todo texto va en i18n**, en `es.json` y `en.json` (capa común en
  `packages/shared-core/src/assets/i18n`, capa propia en cada app).

## Accessibility & Inclusion

WCAG AA:
- Contraste ≥ 4.5:1, o ≥ 3:1 en texto grande.
- Áreas táctiles de 44×44px.
- `aria-label` en los botones que solo llevan icono.
- Foco visible.
- Respetar `prefers-reduced-motion`.
