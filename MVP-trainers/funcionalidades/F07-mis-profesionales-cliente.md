# F07 — "Mis profesionales" (vista del cliente sobre sus vínculos activos)

**Prioridad**: P0. **Fase**: 2.

## 1. Objetivo

Dar al cliente una vista clara y permanente (no solo en el momento de aceptar una invitación) de qué profesionales tiene vinculados, con qué ámbito cada uno, accesible en cualquier momento desde su perfil — no solo como notificación puntual.

**Relación con F04**: `F04-aceptar-rechazar-invitacion.md` cubre el flujo de RESPONDER a una invitación nueva (aceptar/rechazar). Este archivo (F07) cubre la vista PERSISTENTE de "estos son mis profesionales activos ahora mismo", que técnicamente vive en la misma pantalla que F04 pero es conceptualmente una funcionalidad distinta (F04 es un evento puntual; F07 es un estado consultable en cualquier momento). Se documentan por separado para que cada una tenga sus propios criterios de aceptación verificables sin mezclar "aceptar" con "consultar".

## 2. Alcance exacto para el MVP

- Sección "Mis profesionales" en el perfil del cliente (TrainFit normal), mostrando 0, 1 o 2 tarjetas: una para el vínculo `training` (si existe) y otra para el `nutrition` (si existe) — agregadas en una sola tarjeta con 2 chips si es la misma persona cubriendo ambos (2 documentos `TrainerClient`, mismo `trainerId`).
- Cada tarjeta muestra: nombre del profesional, scope, y acceso a "Desvincular" (`F08`).

## 3. Qué NO se incluye en el MVP

- No hay perfil extendido del profesional visible aquí (bio, foto grande, valoraciones) — eso, si se construye, es parte de `F25-foto-perfil-profesional.md`, P1.
- No hay historial de profesionales pasados en esta misma vista — eso es `F22-historial-relaciones.md`, P1, probablemente una sección/pantalla distinta ("Historial") en vez de mezclarse con "profesionales activos ahora".

## 4. Flujos de usuario paso a paso

1. El cliente entra a su perfil en TrainFit, sección "Mis profesionales".
2. Ve 0, 1 o 2 tarjetas según sus relaciones `active` actuales.
3. Puede tocar una tarjeta para ver más detalle (nombre completo, desde cuándo) o ir directo a "Desvincular".

## 5. Pantallas necesarias

- Sección/pantalla "Mis profesionales" (puede ser la misma pantalla física que `F04`, con dos secciones: "Invitaciones pendientes" arriba, "Profesionales activos" abajo).

## 6. Componentes UI requeridos

- Card de profesional activo (nombre, scope, botón desvincular) — mismo componente ya descrito en `F04`, sección 6.

## 7. Lógica de negocio

Ninguna propia más allá de una consulta de lectura — `GET /trainer/info` devuelve las relaciones `active` del cliente autenticado, agregadas de la misma forma que `F05` agrega por profesional (si un mismo profesional cubre `training` y `nutrition` con dos documentos separados, se muestra como una tarjeta con ambos chips, no duplicada).

## 8. Dependencias con otros módulos

- Depende de: `F04-aceptar-rechazar-invitacion.md` (para que existan relaciones activas que mostrar).
- Relacionado con: `F08-revocar-relacion.md` (el botón de desvincular vive aquí, la lógica de revocar está en F08).

## 9-10. Validaciones y casos límite

- Mismo caso límite que `F05`: agregar por profesional, no mostrar duplicados si hay dos documentos (`training` + `nutrition`) para la misma persona.
- **El cliente tiene un entrenador y un nutricionista DISTINTOS**: deben verse como dos tarjetas separadas, cada una con su propio botón de desvincular independiente (desvincular uno no afecta al otro).

## 11. Estructura de datos necesaria

Ninguna nueva.

## 12. Endpoints/API necesarios

- `GET /trainer/info` (ya definido en `F04`, reutilizado aquí sin cambios).

## 13. Criterios de aceptación verificables

- [ ] Un cliente sin profesionales ve la sección vacía (sin CTA — el cliente no tiene ninguna acción equivalente a "invita a tu primer cliente" del profesional; solo puede esperar una invitación).
- [ ] Un cliente con un entrenador y un nutricionista distintos ve dos tarjetas independientes.
- [ ] Un cliente con la misma persona cubriendo ambos scopes ve una sola tarjeta con ambos chips.

## 14. Checklist de implementación

- [ ] Confirmar que `GET /trainer/info` agrega correctamente por profesional (mismo criterio que `F05`).
- [ ] Sección "Mis profesionales" en el perfil de `train-fit-front`.
- [ ] Verificar los 3 criterios de aceptación.
