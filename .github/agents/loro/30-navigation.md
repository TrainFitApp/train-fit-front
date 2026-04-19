# Navigation & Routing (Ionic)

## Reglas

- **Botones de la app y back nativo deben comportarse igual**: misma ruta y misma restauración de estado.
- Toda acción de retroceso debe llamar a la misma función `goBack()`.

## Estado

- Guardar estado con `NavigationService.setTempData()` antes de navegar.
- Restaurar estado en `ionViewWillEnter()`.
- Limpiar TempData tras uso.
