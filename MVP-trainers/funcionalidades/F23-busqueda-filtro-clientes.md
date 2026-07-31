# F23 — Búsqueda y filtro en el listado de clientes

**Prioridad**: P1. **Fase**: 6. Depende de `F05`.

## 1. Objetivo

Que un profesional con muchos clientes pueda encontrar uno concreto rápidamente, y filtrar por scope — mejora directa sobre `F05-listado-clientes.md` cuando el volumen de clientes crece.

## 2. Alcance exacto para el MVP

- Campo de búsqueda por nombre/email sobre la lista ya cargada de `F05`.
- Filtro por scope (Entrenamiento / Nutrición / Ambos / Todos).

## 3. Qué NO se incluye en el MVP

- No hay búsqueda server-side con paginación (si el volumen de clientes por profesional es bajo en esta fase del producto, un filtro client-side sobre la lista ya cargada es suficiente) — si en producción se confirma que hay profesionales con cientos de clientes, esto debería revisarse hacia búsqueda server-side, pero no se asume esa escala en el MVP.

## 4. Flujos de usuario paso a paso

1. En `F05`, el profesional escribe en el campo de búsqueda.
2. La lista se filtra en tiempo real por coincidencia de nombre/email.
3. Puede combinar con el filtro de scope (chips o selector).

## 5. Pantallas necesarias

Ninguna nueva — añade UI a la pantalla ya existente de `F05`.

## 6. Componentes UI requeridos

- Input de búsqueda (reutilizar `FilterInputPage`/patrón ya existente en `SharedModule` si aplica, mismo componente que ya usa `search-tables.page`/`search-foods.page`).
- Chips/selector de filtro por scope.

## 7. Lógica de negocio

Filtrado 100% client-side sobre los datos ya devueltos por `GET /trainer/clients` (`F05`) — no requiere cambios de backend si el volumen es bajo (ver punto 3).

## 8. Dependencias con otros módulos

- Depende de: `F05-listado-clientes.md`.

## 9-10. Validaciones y casos límite

- Búsqueda insensible a mayúsculas/acentos (mismo criterio ya aplicado en otras búsquedas de la app, si existe una utilidad de normalización de texto ya compartida, reutilizarla en vez de crear una nueva).

## 11-12. Estructura de datos y endpoints

Ninguno nuevo — reutiliza `GET /trainer/clients` de `F05`.

## 13. Criterios de aceptación verificables

- [ ] Buscar por nombre parcial encuentra al cliente correcto.
- [ ] Filtrar por scope muestra solo los clientes con ese scope (incluidos los que tienen ambos, `training` y `nutrition`, como 2 relaciones separadas).
- [ ] Combinar búsqueda + filtro de scope funciona correctamente a la vez.

## 14. Checklist de implementación

- [ ] Input de búsqueda + filtro de scope en la UI de `F05`.
- [ ] Lógica de filtrado client-side.
- [ ] Verificar los 3 criterios de aceptación.
