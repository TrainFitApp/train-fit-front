# F19 — Notas internas del profesional sobre el cliente

**Prioridad**: P1. **Fase**: 6. Sin dependencias nuevas más allá de lo ya construido en Fase 1.

## 1. Objetivo

Que el profesional pueda apuntar observaciones privadas sobre un cliente — visibles solo para él, nunca para el cliente ni otro profesional. Ver el modelo completo en `modelos-de-datos/02-trainernote.md`; este archivo cubre el flujo de UI/uso.

## 2. Alcance exacto para el MVP (de esta funcionalidad P1)

- Campo de texto libre por cliente, con histórico de notas (no una única nota editable, sino una lista de notas fechadas — reutilizando `pinned` para destacar una).
- Sin categorías, sin edición de notas antiguas (solo añadir nuevas).

## 3. Qué NO se incluye en el MVP

- No hay campo de dolor/EVA (descartado, ver `PLAN_TRAINFIT_ENTRENADORES.md` §10.10, P2).
- No hay compartición de notas entre profesionales (si el mismo cliente tiene dos profesionales, cada uno ve solo SUS propias notas, nunca las del otro).

## 4. Flujos de usuario paso a paso

1. Desde el detalle de cliente (`F06`), el profesional entra a la sección "Notas".
2. Ve el histórico de notas ya escritas (más recientes primero, la fijada si existe destacada arriba).
3. Escribe una nota nueva en un campo de texto, pulsa "Guardar".
4. La nota aparece en el histórico con su fecha.
5. Opcionalmente, marca una nota como fijada (destacada arriba de las demás).

## 5. Pantallas necesarias

- Sección "Notas" dentro de `F06` (detalle de cliente).

## 6. Componentes UI requeridos

- Textarea de nueva nota + botón guardar.
- Lista de notas históricas (fecha + texto), con opción de fijar/desfijar.

## 7. Lógica de negocio

- `POST /trainer/clients/:clientId/notes` crea una nota nueva (`requireActiveClient`, cualquier scope).
- `GET /trainer/clients/:clientId/notes` lista, ordenadas por `pinned` primero, luego `createdAt` descendente.
- Fijar/desfijar es una actualización simple del campo `pinned` de una nota concreta (endpoint adicional o parte del mismo POST si se decide simplificar a "actualizar" en vez de "crear + marcar aparte" — decisión de implementación).

## 8. Dependencias con otros módulos

- Depende de: `modelos-de-datos/02-trainernote.md`, `arquitectura/02-modulo-backend-trainerclients.md`.

## 9-10. Validaciones y casos límite

Ver `modelos-de-datos/02-trainernote.md`, secciones 9-10 — no se repiten aquí.

## 11. Estructura de datos necesaria

Ver `modelos-de-datos/02-trainernote.md`.

## 12. Endpoints/API necesarios

- `GET /trainer/clients/:clientId/notes`.
- `POST /trainer/clients/:clientId/notes`.
- `PATCH /trainer/clients/:clientId/notes/:noteId` (fijar/desfijar) — endpoint adicional no listado en la tabla original de `PLAN_TRAINFIT_ENTRENADORES.md` §4, añadido aquí porque el modelo incluye `pinned` y necesita una vía para cambiarlo.

## 13. Criterios de aceptación verificables

- [ ] Crear una nota nueva la añade al histórico con fecha correcta.
- [ ] Fijar una nota la muestra destacada arriba del resto.
- [ ] Un profesional distinto (con relación activa con el mismo cliente por otro scope) NO ve las notas de este profesional.
- [ ] El cliente no tiene ninguna vía de acceso a estas notas desde su propia app.

## 14. Checklist de implementación

- [ ] Endpoints de crear/listar/fijar.
- [ ] Sección de UI en `F06`.
- [ ] Verificar los 4 criterios de aceptación.
