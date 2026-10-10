# Antes de subir a PRO (front)

> Estado a **2026-10-10**. La checklist completa y ordenada, con bloqueantes de
> back, Stripe, entorno y día D, está en el repo del back:
> `train-fit-back/docs/antes-de-pro.md`. Aquí solo lo que toca a las apps.

- `develop` (`ef68dfd5`) lleva el refactor del modelo de datos, el QA
  entrenador↔cliente y la revisión de pagos. Es un cambio de contrato sin
  compatibilidad, así que las tres apps salen a la vez que la API y con
  actualización forzada (`remoteConfig.forceUpdate`). Ejemplo: la carga
  pautada viaja en `Set.expectedWeight`.
- **Un push a `main` publica la web de trainers de PRO** en Cloudflare
  (`train-fit-trainers`). No fusionar `develop` en `main` hasta el día D, ni
  antes de desplegar la API.
- Versiones de tienda de cliente, trainers y management: publicarlas y
  **retenerlas** hasta el despliegue del back (`mobile-release.yml`).
- Comprobaciones a mano que la automatización no cerró:
  - Enter en la contraseña del login de trainers con teclado real.
  - Recarga completa de trainers: unos 5 s de pantalla negra en dev; medir en
    el build de PRE.
  - Recorrido del cliente en móvil nativo: registro, cuestionario, entrenar
    con carga pautada, diario con comidas pautadas, check-in y «Tus
    profesionales».
  - En PRE, la suscripción de trainers de punta a punta con tarjeta de prueba
    (contratar, subir, bajar, cancelar, reactivar, portal). Antes hay que
    arreglar los permisos de la clave de Stripe; ver el doc del back.
- Decisión abierta: Gestión › Facturación de trainers sigue con textos en
  español a propósito (`trainer-billing-view.util.ts`). Decidir si pasa a
  i18n.
