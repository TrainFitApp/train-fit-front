# F25 — Foto de perfil del profesional

**Prioridad**: P1. **Fase**: 6. No bloqueante.

## 1. Objetivo

Permitir que un profesional suba una foto de perfil, visible en las tarjetas de "mis profesionales" del cliente (`F04`/`F07`).

## 2. Alcance exacto para el MVP

- Subida de UNA imagen (avatar), sin recorte/edición avanzada en la app (recorte cuadrado básico si el componente de selección de imagen nativo ya lo ofrece, sin construir un editor propio).
- Almacenamiento en un proveedor externo (S3/Cloudinary o equivalente) vía URL prefirmada — **infraestructura 100% nueva, no existe hoy ningún mecanismo de subida de imágenes en todo el proyecto** (confirmado por auditoría de código, ver `PLAN_TRAINFIT_ENTRENADORES.md` §9.7/§11.1).

## 3. Qué NO se incluye en el MVP

- No incluye fotos de progreso del cliente (concepto totalmente distinto, dato sensible, ver `fuera-de-alcance/p2-futuro.md`).
- No incluye galería de varias fotos — una sola foto de perfil.
- No incluye moderación de contenido (revisión de que la imagen subida sea apropiada) — fuera de alcance de este MVP, riesgo a asumir o mitigar con políticas de uso, no con código.

## 4. Flujos de usuario paso a paso

1. El profesional, desde su perfil en `train-fit-trainers`, pulsa "Cambiar foto".
2. Selecciona una imagen (cámara o galería, vía plugin de Capacitor ya usado en otras partes de la app si existe alguno reutilizable, o el input de archivo estándar en el build web — ver `F16`, caso límite de plugins nativos sin fallback web).
3. La app sube la imagen (flujo de dos pasos: pide una URL prefirmada al backend, sube directamente al proveedor de almacenamiento, confirma al backend que la subida terminó).
4. El backend guarda la URL resultante en `User.professionalPhotoUrl` (campo nuevo).
5. La foto aparece en el directorio y en las tarjetas donde se muestre a este profesional.

## 5. Pantallas necesarias

- Sección de edición de perfil del profesional (nueva o extensión de una ya prevista) con el control de subida de foto.

## 6. Componentes UI requeridos

- Selector de imagen (cámara/galería) — si TrainFit consumidor ya tiene algún flujo de captura de imagen reutilizable (p. ej. para el escáner de código de barras, aunque ese es un caso de uso distinto de solo lectura de códigos, no de captura de foto de usuario), evaluar si algo de esa infraestructura de permisos de cámara es reutilizable; si no, es una integración nueva del plugin `@capacitor/camera`.

## 7. Lógica de negocio

- Backend necesita, por primera vez en todo el proyecto, un mecanismo de subida de imágenes:
  1. Endpoint `POST /trainer/profile/photo/upload-url` que devuelve una URL prefirmada de subida directa al bucket (S3-style), sin que la imagen pase por el propio servidor de TrainFit (más barato y más simple que subir vía el backend como intermediario).
  2. El frontend sube directamente a esa URL.
  3. `POST /trainer/profile/photo/confirm` (o el propio backend verifica la subida antes de aceptar) actualiza `User.professionalPhotoUrl`.
- **Esto requiere dar de alta una cuenta/bucket en un proveedor de almacenamiento (S3, Cloudinary, o equivalente) — coste operativo real (factura mensual), no solo tiempo de desarrollo.** Señalar esto como una decisión de infraestructura a aprobar antes de implementar, no asumir que "ya existe algo" en el proyecto (se confirmó por auditoría de código que no existe).

## 8. Dependencias con otros módulos

- Depende de: dar de alta el proveedor de almacenamiento (decisión operativa, fuera del código).
- Relacionado con: `F04`/`F07` (consumen la foto en las tarjetas de profesional activo).

## 9. Validaciones

- Tamaño máximo de archivo (definir un límite razonable, p. ej. 5MB, para no disparar costes de almacenamiento innecesarios).
- Formato de imagen permitido (jpg/png/webp).

## 10. Casos límite y posibles errores

- **El profesional sube una imagen y cierra la app antes de que se confirme la subida**: el backend no debe dar por buena la foto hasta recibir la confirmación explícita (paso 7.3) — evita quedarse con una URL "colgada" que apunta a una subida incompleta.
- **El proveedor de almacenamiento tiene un fallo/timeout durante la subida**: mostrar un error claro y permitir reintentar, sin dejar el perfil en un estado a medias.

## 11. Estructura de datos necesaria

```js
// components/users/schema.js — añadir, si se implementa
professionalPhotoUrl: { type: String, default: null },
```
**Actualizar `modelos-de-datos/05-cambios-modelos-existentes.md` si se implementa** — ese archivo hoy solo lista 2 cambios, ninguno en `User`; este sería el primero.

## 12. Endpoints/API necesarios

- `POST /trainer/profile/photo/upload-url`.
- `POST /trainer/profile/photo/confirm` (o equivalente de verificación server-side).

## 13. Criterios de aceptación verificables

- [ ] Subir una foto actualiza `User.professionalPhotoUrl` con una URL válida y accesible.
- [ ] La foto aparece correctamente en las tarjetas de profesional activo (`F04`/`F07`).
- [ ] Un archivo por encima del tamaño máximo es rechazado antes de subir (o al confirmar).
- [ ] Cerrar la app durante la subida no deja `professionalPhotoUrl` apuntando a una imagen a medias.

## 14. Checklist de implementación

- [ ] Decidir y dar de alta el proveedor de almacenamiento (aprobación de coste operativo).
- [ ] Añadir `professionalPhotoUrl` a `User` y actualizar `modelos-de-datos/05-cambios-modelos-existentes.md`.
- [ ] Endpoints de URL prefirmada + confirmación.
- [ ] UI de selección/subida de imagen.
- [ ] Verificar los 4 criterios de aceptación.
