# F26 — Recordatorio de cobro (sin mover dinero real)

**Prioridad**: P1. **Fase**: 6. Sin dependencias nuevas.

## 1. Objetivo

Ayudar al profesional a recordar cuándo y cuánto debe cobrarle a cada cliente — sin que la app mueva dinero real. El cliente paga al profesional FUERA de la app (Bizum, transferencia, efectivo — decisión confirmada, `PLAN_TRAINFIT_ENTRENADORES.md` §9.5); esto es solo una agenda/ledger manual.

## 2. Alcance exacto para el MVP

- El profesional anota, por cliente, un importe y una fecha de vencimiento.
- Marca manualmente como "pagado" cuando cobra.
- Recordatorio LOCAL en el dispositivo del profesional (reutiliza `LocalNotifications`, ya integrado en `train-fit-front`/y por tanto disponible también en `train-fit-trainers` al compartir la misma base de Capacitor) — sin push remoto.

## 3. Qué NO se incluye en el MVP

- No mueve dinero real — cero integración de pagos.
- No hay facturación/generación de recibos.
- No hay recordatorio al CLIENTE de que debe pagar — es una herramienta solo para el profesional, el cliente no ve nada de esto.

## 4. Flujos de usuario paso a paso

1. Desde el detalle de cliente (`F06`), el profesional entra a "Cobros" (o similar).
2. Añade un cobro: importe, fecha de vencimiento, nota opcional.
3. La app programa un recordatorio local en esa fecha (vía `LocalNotifications`).
4. Cuando cobra, el profesional marca el cobro como "pagado" (`paidAt`).
5. Ve el histórico de cobros de ese cliente (pendientes y pagados).

## 5. Pantallas necesarias

- Sección "Cobros" dentro del detalle de cliente (`F06`).

## 6. Componentes UI requeridos

- Formulario simple: importe, fecha, nota.
- Lista de cobros (pendiente/pagado) con acción de marcar como pagado.

## 7. Lógica de negocio

- Backend: extiende `TrainerClient` con un array `payments` (ver sección 11) o crea una colección hermana `trainerpayments` — decisión de implementación, ambas opciones descritas en `PLAN_TRAINFIT_ENTRENADORES.md` §9.8.
- Frontend: al crear un cobro con `dueDate`, programa una notificación local (`@capacitor/local-notifications`, ya integrado) para esa fecha, con el texto "Recuerda cobrar a [cliente]: [importe]€".

## 8. Dependencias con otros módulos

- Depende de: `arquitectura/02-modulo-backend-trainerclients.md` (protegido por `requireActiveClient`, cualquier scope).
- Reutiliza: `LocalNotifications`, ya configurado en `capacitor.config.ts` de `train-fit-front` (confirmar que la configuración se replica en `train-fit-trainers`, ver `arquitectura/01-scaffold-nueva-app.md`).

## 9. Validaciones

- Importe positivo.
- Fecha de vencimiento no puede ser en el pasado al crearla (aunque sí puede quedar en el pasado si no se marca como pagada a tiempo — eso es un estado válido, "vencido y sin pagar", no un error).

## 10. Casos límite y posibles errores

- **El profesional desinstala y reinstala la app**: las notificaciones locales programadas se pierden (comportamiento estándar de `LocalNotifications`, no es un bug de esta funcionalidad) — los cobros pendientes siguen existiendo en el backend, pero el recordatorio local no se reprograma automáticamente a menos que se implemente una re-sincronización al abrir la app (mejora, no incluida en el primer corte).
- **Se revoca la relación con un cliente que tiene cobros pendientes**: los cobros se conservan como historial (mismo criterio que las notas internas, `modelos-de-datos/02-trainernote.md`) — no se borran al revocar.

## 11. Estructura de datos necesaria

```js
// Opción A: array embebido en TrainerClient
payments: [{
  amount: Number,
  currency: { type: String, default: "EUR" },
  dueDate: Date,
  paidAt: { type: Date, default: null },
  note: String,
}]

// Opción B: colección hermana
const TrainerPaymentSchema = new Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "EUR" },
  dueDate: { type: Date, required: true },
  paidAt: { type: Date, default: null },
  note: String,
}, { collection: "trainerpayments" });
```
**Recomendación**: Opción B (colección hermana) — más consistente con el resto del proyecto, que evita arrays embebidos de crecimiento no acotado dentro de documentos que ya se consultan por otros motivos (`TrainerClient` se lee constantemente por `requireActiveClient`; embeber un array de cobros que crece indefinidamente en ese mismo documento penaliza esa lectura frecuente sin necesidad).

## 12. Endpoints/API necesarios

- `GET /trainer/clients/:clientId/payments`.
- `POST /trainer/clients/:clientId/payments`.
- `PATCH /trainer/clients/:clientId/payments/:paymentId` (marcar como pagado).

## 13. Criterios de aceptación verificables

- [ ] Crear un cobro programa una notificación local en la fecha de vencimiento.
- [ ] Marcar un cobro como pagado actualiza su estado y deja de mostrarse como pendiente.
- [ ] El histórico de cobros de un cliente se conserva tras revocar la relación.
- [ ] Ningún dinero real se mueve en ningún punto de este flujo (confirmar que no hay ninguna llamada a RevenueCat/pasarela de pago desde este código).

## 14. Checklist de implementación

- [ ] Elegir Opción B (colección hermana) e implementar el schema.
- [ ] Endpoints de crear/listar/marcar pagado.
- [ ] Integración con `LocalNotifications` al crear un cobro.
- [ ] UI de la sección "Cobros" en `F06`.
- [ ] Verificar los 4 criterios de aceptación.
