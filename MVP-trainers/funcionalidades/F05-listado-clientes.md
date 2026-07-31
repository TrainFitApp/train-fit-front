# F05 — Listado de clientes del profesional

**Prioridad**: P0. **Fase**: 2.

## 1. Objetivo

Pantalla principal de `train-fit-trainers`: el profesional ve todos sus clientes con relación activa, con indicación de qué `scope` tiene con cada uno.

## 2. Alcance exacto para el MVP

- Lista simple de clientes activos (nombre, avatar/placeholder, scope, quizá un dato rápido como "última actividad" si es barato de calcular).
- Sin búsqueda ni filtros avanzados en el MVP — eso es `F23-busqueda-filtro-clientes.md`, P1 (con pocos clientes al principio, una lista simple basta).
- Botón para invitar un cliente nuevo, accesible desde aquí (enlaza a `F03`).

## 3. Qué NO se incluye en el MVP

- No hay ordenación configurable (alfabético, por actividad, etc.) — orden por defecto (p. ej. por fecha de activación descendente) es suficiente.
- No hay paginación explícita en el MVP si se asume que un profesional en fase de lanzamiento tiene pocos clientes — si el volumen esperado desde el día 1 es alto, esto debe reconsiderarse (señalar como riesgo, no asumir silenciosamente que "poca gente" sin confirmarlo con el negocio).
- No se muestran datos de rutina/dieta en la propia tarjeta de la lista — eso exigiría cargar datos de `F09`/`F10` para CADA cliente de la lista (coste de rendimiento innecesario para una vista de listado); esos datos se ven al entrar al detalle (`F06`).

## 4. Flujos de usuario paso a paso

1. El profesional abre el tab "Clientes" (pantalla de entrada de la app tras el login).
2. Ve la lista de clientes activos, cada uno con su nombre y el/los scope(s) que tiene con él.
3. Toca un cliente → navega al detalle (`F06-detalle-cliente-navegacion.md`).
4. Si no tiene clientes todavía, ve un estado vacío con llamada a la acción ("Invita a tu primer cliente").

## 5. Pantallas necesarias

- Pantalla de listado de clientes (tab principal).

## 6. Componentes UI requeridos

- Card de cliente en lista: avatar/placeholder, nombre, chip(s) de scope (Entrenamiento/Nutrición/Ambos).
- Estado vacío con CTA.
- Botón flotante o de cabecera para invitar (enlaza a `F03`).

## 7. Lógica de negocio

- El backend agrupa por `clientId` cuando un mismo cliente tiene dos documentos `TrainerClient` activos con el mismo profesional (uno `training`, otro `nutrition` — la única forma de representar "ambos" en el modelo actual, ver `modelos-de-datos/01-trainerclient.md`) — la lista debe mostrar UN cliente con AMBOS scopes indicados, no dos entradas duplicadas para la misma persona. Esto es lógica de agregación en el DAO/service (`findAllByTrainer`), no algo que se resuelva en el frontend con datos crudos duplicados.

## 8. Dependencias con otros módulos

- Depende de: `F04-aceptar-rechazar-invitacion.md` (necesita relaciones `active` reales para mostrar algo).
- Depende de: `arquitectura/02-modulo-backend-trainerclients.md`.
- Bloquea: `F06-detalle-cliente-navegacion.md` (es el punto de entrada a esa pantalla).

## 9. Validaciones

- Solo se listan relaciones `status: "active"` — nunca `pending`/`declined`/`revoked` en esta vista (eso es `F22-historial-relaciones.md`, P1).

## 10. Casos límite y posibles errores

- **Un cliente tiene dos relaciones activas con el mismo profesional** (una `training`, otra `nutrition`, creadas por separado): debe aparecer como UNA sola tarjeta con ambos chips de scope, no duplicado — ver punto 7.
- **El profesional tiene 0 clientes**: estado vacío, no una lista vacía sin contexto.
- **Un cliente revoca la relación justo mientras el profesional tiene la lista abierta**: no requiere tiempo real en el MVP (no hay WebSockets/push) — el profesional lo verá reflejado la próxima vez que recargue la pantalla, comportamiento pull consistente con el resto de la arquitectura (ver `00-riesgos.md` R5).

## 11. Estructura de datos necesaria

Ninguna nueva — usa `TrainerClient` (agregado) + datos básicos de `User` (nombre, avatar) vía `userDto.single`.

## 12. Endpoints/API necesarios

- `GET /trainer/clients` — lista clientes activos del profesional autenticado, agregados por cliente (no por relación individual), con el/los scope(s) de cada uno.

## 13. Criterios de aceptación verificables

- [ ] Un profesional con 0 clientes ve el estado vacío con CTA a invitar.
- [ ] Un profesional con clientes activos los ve listados con su scope correcto.
- [ ] Un cliente con dos relaciones activas (`training` + `nutrition` por separado) aparece como una sola tarjeta con ambos chips.
- [ ] Un cliente revocado o con invitación pendiente NO aparece en esta lista.

## 14. Checklist de implementación

- [ ] Endpoint `GET /trainer/clients` con la agregación por cliente descrita en el punto 7.
- [ ] Pantalla de listado con card de cliente y estado vacío.
- [ ] Verificar los 4 criterios de aceptación.
