# Plan de entrenamiento y sesión — septiembre de 2026

## Cambios

- Fases actuales y programadas encima del calendario y de la comparación. Mantiene programar, quitar, cambiar fecha, abrir Planner e historial.
- Comparar por y ejercicio se eligen directamente. A y B seleccionables; el par se conserva al cambiar de métrica. Peticiones anteriores se cancelan al cambiar rango o ejercicio.
- Volumen y series por sesión, junto a sesiones registradas y series totales. El eje y el delta usan la misma unidad. Un registro parcial no se presenta como entrenamiento completado.
- Ejercicio con carga: carga máxima y repeticiones/RIR de esa misma serie realizada, series, repeticiones totales y volumen. Empate de carga: más repeticiones. RIR ausente es «—», cero sigue siendo cero, -1 se muestra como «Fallo»; rangos y fallo no generan deltas numéricos.
- Grupos musculares: series por sesión con barras A/B. Cada serie cuenta en sus grupos primarios, o secundarios cuando faltan primarios. Sin porcentajes de reparto inventados; una serie puede aparecer en varios grupos.
- Dolor en Planner: último registro de cada zona dentro de 7 días, fecha, nota y umbral configurado. Un cero posterior sustituye un registro previo positivo. Distingue explícitamente 0/10 registrado de ausencia de registros. Se actualiza al entrar en la vista; error de consulta tiene reintento.

## Sesión

La caducidad de acceso sigue siendo 15 minutos; el refresh firmado conserva su vencimiento de 30 días. Se corrigieron dos fallos reproducibles:

1. Una cookie de refresh compartida entre las tres apps podía sobrescribir la de Trainers. Ahora se separa por `x-client-family`. La cookie antigua se acepta solo si corresponde a la audiencia solicitada; una renovación válida la migra. Se mantienen firma, audiencia, hash, sesión, versión de contraseña, HttpOnly y controles existentes. La duración de la cookie usa el tiempo restante del JWT.
2. El guard enviaba al login ante fallos temporales de renovación. Con usuario en memoria cancela la navegación y permite reintentar. Errores terminales, incluidos los anidados en `HttpErrorResponse.error`, siguen cerrando sesión. 408/429 se clasifican como temporales.

El backend mantiene su política existente de **una sesión activa por cuenta**: iniciar otra sesión con esa misma cuenta reemplaza la anterior. Aislar cookies permite conservar sesiones de cuentas diferentes entre apps; no modifica esa política.

No se ha reproducido el cierre de la sesión concreta del usuario en producción. La verificación local simula un acceso expirado con refresh firmado y comprueba aislamiento, migración y fallos transitorios. Para confirmar el síntoma real tras desplegar, comprobar que `/api/auth/refresh` recibe la cookie y devuelve 200 después del vencimiento del acceso. Un navegador que bloquee cookies entre sitios puede seguir impidiendo esa petición; HTTPS entre sitios requiere la configuración de cookie Secure/SameSite apropiada.

## Validación y compatibilidad

- `npm run build:pre:t`: compilación Angular/Ionic correcta; avisos existentes de archivos incluidos sin usar.
- `node --test tests/training-dashboard.test.cjs`: 8 pruebas de cálculo, RIR, dolor, renovación concurrente y guard.
- Backend: `node --test components/clientProgress/training-service.test.js services/token.service.test.js components/auth/refresh-flow.test.js`: 66 pruebas.
- Fixture local con plantillas/componentes reales y datos ficticios: escritorio de 1248 px, móvil de 390 px, selectores A/B, métricas, error/reintento y vacío. Consola sin errores. No sustituye una sesión autenticada contra producción.
- Nuevos campos de progreso aditivos y opcionales en frontend: versiones antiguas muestran datos ausentes sin inventar ceros. Sin cambios de esquema ni migración de MongoDB. Frontend y backend requieren publicación para aplicar el conjunto en producción.

Limitaciones del dato: el calendario puede recortar microciclos; volumen mezcla ejercicios y no demuestra por sí solo ganancia de fuerza. La selección de ejercicio conserva el contrato actual por nombre y carga mínima de 0,5 kg; no cubre progresión de cardio/isométricos/peso corporal sin carga. Para analizar progresión, leer carga, reps y RIR juntos.
