// Al recargar, la app cliente pierde de memoria al usuario, su rutina y su
// entreno en uso, el tab Coach y el badge de notificaciones: todo eso lo carga
// solo el user-loader. Que se pasara o no por él dependía de quién acababa
// antes, el guard de la ruta o el arranque de AppComponent, y a veces se
// enseñaba la pestaña sin datos. Esta decisión no depende de ningún
// temporizador: sin usuario cargado, ninguna ruta privada se abre sin pasar
// antes por el cargador.
//
// A propósito no se vuelve a la pantalla en la que se estaba: al recargar se
// pierde su estado y la pila de navegación, así que «atrás» no llevaba a
// ningún sitio coherente. Tras el cargador se entra por la pestaña de inicio.

const USER_LOADER_PATH = 'user-loader';

/**
 * Si hay que mandar al usuario por el cargador antes de abrir la ruta: cuando
 * aún no hay usuario cargado y la ruta no es el propio cargador.
 */
export function mustPassThroughUserLoader(
  userLoaded: boolean,
  routePath: string | null | undefined,
): boolean {
  return !userLoaded && routePath !== USER_LOADER_PATH;
}
