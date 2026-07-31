# MVP TrainFit: Entrenadores — Documentación de desarrollo

> Este directorio desglosa `PLAN_TRAINFIT_ENTRENADORES.md` (el análisis técnico previo, en la raíz del repo) en unidades de trabajo independientes, cada una lista para implementarse sin volver a leer el documento original. Si tienes que elegir entre leer el plan original o esta carpeta, **lee esta carpeta** — es la versión corregida y final tras varias rondas de revisión (Excel real de un entrenador, competidor real en producción, decisiones del usuario).

## Cómo está organizada esta carpeta

```
MVP-trainers/
├── README.md                          ← estás aquí
├── 00-decisiones-pendientes.md        ← LEE ESTO ANTES DE EMPEZAR. Decisiones ambiguas sin resolver.
├── 00-orden-implementacion.md         ← Orden óptimo de construcción + dependencias técnicas
├── 00-riesgos.md                      ← Riesgos técnicos y de producto transversales
├── arquitectura/                      ← Cómo se monta el proyecto (antes de cualquier feature)
│   ├── 01-scaffold-nueva-app.md
│   ├── 02-modulo-backend-trainerclients.md
│   └── 03-autenticacion-y-roles.md
├── modelos-de-datos/                  ← Schemas Mongoose completos, con justificación
│   ├── 01-trainerclient.md
│   ├── 02-trainernote.md
│   ├── 03-trainercheckintemplate.md
│   ├── 04-catalogo-campos-checkin.md
│   └── 05-cambios-modelos-existentes.md
├── funcionalidades/                   ← Una funcionalidad = un archivo. Numeradas F01-F30.
│   ├── F01 a F16 → P0 (obligatorias para lanzar)
│   └── F17 a F30 → P1 (importantes, no bloqueantes)
├── apis/
│   └── especificacion-endpoints.md    ← Tabla completa de endpoints con request/response/auth
└── fuera-de-alcance/
    ├── p2-futuro.md                   ← Qué queda fuera del MVP y por qué
    └── apendice-superserie-nucleo-trainfit.md  ← Mejora al núcleo de TrainFit detectada, no de esta app
```

## Orden de lectura recomendado

1. **`00-decisiones-pendientes.md`** — antes de escribir una sola línea de código, alguien con autoridad de producto debe resolver estas ambigüedades. Varias funcionalidades dependen de la respuesta.
2. **`00-orden-implementacion.md`** — qué construir primero y por qué; qué bloquea a qué.
3. **`arquitectura/`** en orden (01 → 02 → 03) — monta el terreno antes de cualquier feature.
4. **`modelos-de-datos/`** — los schemas que todo lo demás referencia.
5. **`funcionalidades/`** — F01 a F16 primero (P0), luego F17-F30 (P1) si hay margen. Cada archivo es autocontenido: puedes implementarlo leyendo solo ese archivo + los de `modelos-de-datos/` y `apis/` que referencia.
6. **`apis/especificacion-endpoints.md`** — referencia cruzada mientras implementas cualquier funcionalidad que toque el backend.
7. **`00-riesgos.md`** — revisar antes de dar por cerrado el MVP, especialmente el riesgo de seguridad (acceso a datos de terceros).
8. **`fuera-de-alcance/`** — para no reintroducir por accidente algo que se descartó deliberadamente (p. ej. pagos in-app, plantillas por referencia compartida).

## Qué es este producto, en una frase

Una tercera app del monorepo (`train-fit-trainers`, marca `TrainFit: Entrenadores`), para entrenadores personales y nutricionistas, que reutiliza el 100% del backend/BBDD/auth de TrainFit y añade: un rol profesional, una relación profesional↔cliente con ámbito (`training`/`nutrition`, nunca ambos en un mismo documento), lectura de los datos ya modelados del cliente, y escritura acotada (asignar rutinas y comidas) — sin pagos in-app, sin chat en tiempo real, sin form builder libre, sin push remoto, en el MVP.

## Principios que atraviesan todos los archivos (no los repitas, pero no los rompas)

1. **Copia profunda, nunca referencia compartida.** Cuando el profesional asigna algo a un cliente, se copia (reutilizando `copyTable`/`pasteMeal`, ya existentes). Nunca se edita un "máster" que afecte silenciosamente a varios clientes a la vez — esa arquitectura se evaluó (existe en un competidor real, Traineeks) y se rechazó explícitamente por el riesgo de propiedad ambigua (ver `fuera-de-alcance/` y el propio `PLAN_TRAINFIT_ENTRENADORES.md` §11.2a).
2. **`trainerId` se deriva siempre de la sesión (`req.auth.userId`), nunca del body/query de la petición.** Este es el riesgo de seguridad nº1 de todo el proyecto — ver `00-riesgos.md`.
3. **Sin campos espejo/caché en `User`.** La relación profesional-cliente vive solo en `TrainerClient`, consultada por índice. No se cachea "quién es mi entrenador" en `User` — un campo espejo puede desincronizarse si la escritura del original falla o se omite, y entonces no queda ninguna fuente de verdad fiable a la que volver (ver `modelos-de-datos/01-trainerclient.md`).
4. **Todo lo que ya existe en TrainFit se reutiliza, no se duplica.** Si una funcionalidad necesita leer/escribir rutinas, dietas, peso o entrenamientos, la implementación es una capa de autorización fina sobre DAOs/servicios que ya existen — nunca lógica de negocio de dominio nueva y paralela.
5. **No form builder libre. Catálogo de campos togglables, sí.** Cuando una funcionalidad necesita "personalización", la respuesta por defecto es una lista cerrada de opciones activables, no un motor de formularios dinámico — ver `modelos-de-datos/04-catalogo-campos-checkin.md`.
