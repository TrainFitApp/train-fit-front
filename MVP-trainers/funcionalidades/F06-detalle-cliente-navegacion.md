# F06 — Detalle de cliente (pantalla compuesta)

**Prioridad**: P0. **Fase**: 5 (compone funcionalidades de fases anteriores).

## 1. Objetivo

Pantalla única donde el profesional ve y actúa sobre TODO lo relativo a un cliente concreto: datos de entrenamiento, datos de nutrición, y las acciones de asignar. No introduce lógica de negocio propia — es la composición visual de `F09`, `F10`, `F11`, `F12`, `F13` en una sola pantalla con pestañas o secciones.

## 2. Alcance exacto para el MVP

- Navegación desde `F05-listado-clientes.md` al tocar un cliente.
- Secciones/pestañas visibles según CUÁNTAS relaciones (documentos `TrainerClient`) tiene el profesional con ese cliente: si solo tiene `training`, solo esa sección; si solo `nutrition`, solo esa; si tiene las dos (2 documentos), ambas secciones.
- Cada sección embebe lo ya definido en `F09` (lectura entrenamiento), `F10` (lectura nutrición), con los botones de acción de `F11`/`F12`/`F13` visibles según corresponda.

## 3. Qué NO se incluye en el MVP

- No incluye notas internas en esta misma pantalla obligatoriamente — puede ser una pestaña más si el diseño de UI lo decide, pero `F19-notas-internas.md` (P1) puede implementarse y probarse de forma independiente sin bloquear esta pantalla.
- No incluye adherencia (`F20`, P1) en el primer corte.

## 4. Flujos de usuario paso a paso

1. Desde `F05`, el profesional toca una tarjeta de cliente.
2. Llega a esta pantalla, viendo cabecera con nombre/avatar del cliente y las secciones/pestañas según scope.
3. Si scope incluye `training`: ve rutina activa, peso reciente, historial de entrenamientos (`F09`), con botón "Asignar rutina" (`F11`).
4. Si scope incluye `nutrition`: ve dieta activa, objetivos de macros (`F10`), con botones "Pautar comida" (`F12`) y "Asignar objetivos" (`F13`).

## 5. Pantallas necesarias

- Pantalla de detalle de cliente, con navegación por pestañas o secciones scrolleables (decisión de UI, no de arquitectura).

## 6. Componentes UI requeridos

- Cabecera de cliente (avatar/nombre).
- Selector de pestañas/secciones (Entrenamiento / Nutrición), oculto si el scope solo permite una.
- El resto de componentes son los ya definidos en `F09`-`F13` — esta pantalla los COMPONE, no define componentes propios nuevos.

## 7. Lógica de negocio

Ninguna nueva — esta pantalla no llama a ningún endpoint que no esté ya definido en `F09`-`F13`. Su única lógica propia es: leer el `scope` de la relación (`GET /trainer/clients` ya lo devuelve, o una llamada específica) y decidir qué secciones renderizar.

## 8. Dependencias con otros módulos

- Depende de: `F05`, `F09`, `F10`, `F11`, `F12`, `F13` — todos deben existir antes de que esta pantalla tenga contenido real que componer.
- Es un prerequisito de: nada estructuralmente — es la pantalla "final" que un usuario ve, no bloquea ninguna otra funcionalidad backend.

## 9-10. Validaciones y casos límite

- Ninguno propio — hereda las validaciones y casos límite de cada sección que compone. El único caso límite propio de esta pantalla es: **mostrar las secciones correctas según las relaciones exactas con ESE cliente concreto** — si el profesional tiene solo `training` con el Cliente A y `training`+`nutrition` con el Cliente B, la pantalla debe adaptarse por cliente, no aplicar un scope fijo por profesional.

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

Ninguno nuevo — consume los ya definidos en `F09`-`F13`.

## 13. Criterios de aceptación verificables

- [ ] Con un cliente de scope `training`, solo se ve la sección de entrenamiento.
- [ ] Con un cliente de scope `nutrition`, solo se ve la sección de nutrición.
- [ ] Con un cliente con relaciones `training` y `nutrition` (2 documentos), se ven ambas secciones.
- [ ] Todas las acciones (asignar rutina, pautar comida, asignar objetivos) son accesibles y funcionan igual que si se probaran de forma aislada en sus propios archivos de funcionalidad.

## 14. Checklist de implementación

- [ ] Confirmar que `F09`, `F10`, `F11`, `F12`, `F13` están implementados y probados de forma independiente.
- [x] Construir la pantalla compuesta con navegación condicional por scope para F09/F10. Las acciones F11/F12/F13 siguen pendientes.
- [ ] Verificar los 4 criterios de aceptación.
