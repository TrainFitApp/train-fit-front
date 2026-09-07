// Color por fase — un solo origen para el algoritmo de asignación y para la
// paleta en sí (nutrition-calendar.component.ts y client-detail.page.ts
// import de aquí en vez de declarar cada uno su propia copia; antes eran 3
// arrays hardcodeados que había que mantener sincronizados a mano, y así fue
// exactamente como uno de ellos —el swatch de la leyenda— se quedó
// desactualizado dos repasos de paleta seguidos).
//
// Antes: color = PHASE_COLORS[índice % 6]. Con 6 fases o menos "funciona"
// solo porque la paleta entera está bien separada (ver histórico de
// PHASE_COLORS más abajo) — el índice en sí no razona nada sobre cercanía.
// En cuanto hay una 7ª fase, esa fase reutiliza el color de la 1ª EXACTO,
// da igual lo lejos o cerca que estén en el calendario.
//
// Esta versión sí razona sobre cercanía: cada fase se colorea mirando las
// pocas fases inmediatamente anteriores (las únicas con las que puede
// coincidir en pantalla a la vez, ya que el calendario muestra un mes —
// como mucho ~6 filas de 7 días— y una fase corta puede caer al lado de
// otras 2-3 dentro de esa misma vista), y elige, de la paleta fija, el
// color que MÁS se distingue de esas vecinas — más peso cuanto más cerca,
// igual que pide la regla de negocio ("cuanto más lejos, menos importa").
//
// La distancia entre dos colores es CIEDE2000 (space Lab), no diferencia de
// RGB ni de ángulo de tono: dos colores pueden tener el mismo tono y verse
// clarísimamente distintos (luminosidad/saturación), o tonos separados y
// verse casi iguales — RGB/HSL no lo captura, CIEDE2000 sí (es el estándar
// para "¿esto se confunde a simple vista?").
// Verde, azul-violeta, turquesa, rosa, dorado, azul cielo.
//
// Historial de la paleta EN SÍ (2026-09) — cuatro intentos fallidos, todos
// por el mismo error de método: repartir TONOS en HSL. El ángulo de tono no
// mide lo que ve el ojo, así que "40º de separación" puede leerse idéntico
// (verde 100º y verde 140º) o clarísimo (amarillo 50º y verde 90º). Los tres
// primeros intentos ajustaban saturación/luminosidad; el cuarto reordenaba
// para maximizar la distancia entre fases CONSECUTIVAS — insuficiente, ver
// más abajo por qué el ORDEN de asignación es un problema aparte de la
// paleta. Con ese criterio, la paleta anterior tenía fase 1 (#bae03e) y
// fase 3 (#3ee041) a ΔE 14: dos verdes prácticamente iguales.
//
// Esta paleta se eligió optimizando sobre distancia perceptual real
// (CIEDE2000), maximizando el MÍNIMO ΔE entre TODOS los pares posibles, no
// solo los consecutivos. Resultado: ΔE ≥ 28.9 entre cualquier par (>10 ya
// se considera "claramente distintos"). Restricciones de la búsqueda:
//   · contraste ≥ 4.8:1 sobre el fondo #141414 (legibles en oscuro)
//   · ΔE ≥ 22 respecto a --tf-danger (#eb445a, punto de excepción) y a
//     --tf-accent (#fe9000, hoy/seleccionado) — antes se excluía la banda
//     roja/naranja ENTERA, y eso dejaba solo 285º de rueda para 6 colores,
//     que es justo lo que forzaba los pares indistinguibles. Con distancia
//     medida en vez de un veto por sector caben rosa y dorado sin
//     confundirse con esos dos (quedan a 22.2 y 22.5).
// El script de búsqueda de la paleta no se versiona: es de un solo uso, y
// estos 6 valores son el resultado.
export const PHASE_COLORS: readonly string[] = [
  '#5db530',
  '#7b72ee',
  '#4cf6df',
  '#e49ab8',
  '#f4cd2f',
  '#12b7f3',
];

// Cuántas fases anteriores entran en el cálculo — una vista de un mes no
// suele encajar más de esto entre fases cortas consecutivas; mirar más
// atrás solo gastaría ciclos en fases que nunca van a compartir pantalla.
const PROXIMITY_WINDOW = 5;

function hexToRgb(hex: string): [number, number, number] {
  const n = hex.replace('#', '');
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

function rgbToLab([r, g, b]: [number, number, number]): [number, number, number] {
  const toLinear = (c: number) => {
    c /= 255;
    return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
  };
  const [rl, gl, bl] = [toLinear(r), toLinear(g), toLinear(b)].map((c) => c * 100);
  const x = rl * 0.4124 + gl * 0.3576 + bl * 0.1805;
  const y = rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
  const z = rl * 0.0193 + gl * 0.1192 + bl * 0.9505;
  const [xn, yn, zn] = [x / 95.047, y / 100, z / 108.883];
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(xn), f(yn), f(zn)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

// CIEDE2000 — implementación de referencia estándar (Sharma et al. 2005).
function deltaE2000(lab1: [number, number, number], lab2: [number, number, number]): number {
  const [L1, a1, b1] = lab1;
  const [L2, a2, b2] = lab2;
  const C1 = Math.hypot(a1, b1);
  const C2 = Math.hypot(a2, b2);
  const Cbar = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cbar, 7) / (Math.pow(Cbar, 7) + Math.pow(25, 7))));
  const [a1p, a2p] = [a1 * (1 + G), a2 * (1 + G)];
  const C1p = Math.hypot(a1p, b1);
  const C2p = Math.hypot(a2p, b2);
  const h1p = (Math.atan2(b1, a1p) * 180 / Math.PI + 360) % 360;
  const h2p = (Math.atan2(b2, a2p) * 180 / Math.PI + 360) % 360;
  const dLp = L2 - L1;
  const dCp = C2p - C1p;
  let dhp: number;
  if (C1p * C2p === 0) dhp = 0;
  else if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p;
  else dhp = h2p - h1p > 180 ? h2p - h1p - 360 : h2p - h1p + 360;
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI) / 360);
  const Lbarp = (L1 + L2) / 2;
  const Cbarp = (C1p + C2p) / 2;
  let hbarp: number;
  if (C1p * C2p === 0) hbarp = h1p + h2p;
  else if (Math.abs(h1p - h2p) <= 180) hbarp = (h1p + h2p) / 2;
  else hbarp = h1p + h2p < 360 ? (h1p + h2p + 360) / 2 : (h1p + h2p - 360) / 2;
  const T =
    1 -
    0.17 * Math.cos(((hbarp - 30) * Math.PI) / 180) +
    0.24 * Math.cos((2 * hbarp * Math.PI) / 180) +
    0.32 * Math.cos(((3 * hbarp + 6) * Math.PI) / 180) -
    0.2 * Math.cos(((4 * hbarp - 63) * Math.PI) / 180);
  const dTheta = 30 * Math.exp(-Math.pow((hbarp - 275) / 25, 2));
  const Rc = 2 * Math.sqrt(Math.pow(Cbarp, 7) / (Math.pow(Cbarp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * Math.pow(Lbarp - 50, 2)) / Math.sqrt(20 + Math.pow(Lbarp - 50, 2));
  const Sc = 1 + 0.045 * Cbarp;
  const Sh = 1 + 0.015 * Cbarp * T;
  const Rt = -Math.sin((2 * dTheta * Math.PI) / 180) * Rc;
  return Math.sqrt(
    Math.pow(dLp / Sl, 2) + Math.pow(dCp / Sc, 2) + Math.pow(dHp / Sh, 2) + Rt * (dCp / Sc) * (dHp / Sh)
  );
}

// Matriz de distancias perceptuales entre los colores de la paleta —
// calculada una vez a partir de PHASE_COLORS (nunca hardcodeada aparte: si
// la paleta cambia, esto cambia solo con ella, no hay un segundo sitio que
// se pueda quedar desactualizado).
let cachedPalette: readonly string[] | null = null;
let cachedMatrix: number[][] | null = null;

function getDeltaEMatrix(palette: readonly string[]): number[][] {
  if (cachedMatrix && cachedPalette === palette) return cachedMatrix;
  const labs = palette.map((hex) => rgbToLab(hexToRgb(hex)));
  const matrix = labs.map((labA, i) => labs.map((labB, j) => (i === j ? 0 : deltaE2000(labA, labB))));
  cachedPalette = palette;
  cachedMatrix = matrix;
  return matrix;
}

// Algoritmo: recorre la secuencia en orden y, para cada fase, elige de la
// paleta el color que hace menos mala su PEOR relación con las
// PROXIMITY_WINDOW fases anteriores (maximin), no el que suma mejor de
// media — con una suma, un color casi idéntico a la vecina inmediata puede
// ganar igualmente si le va muy bien con las vecinas más lejanas, y eso es
// justo el choque que más se nota. "Peor relación" se pesa por distancia
// (ΔE del vecino × su distancia): a un vecino a distancia 1 se le exige
// mucha más separación que a uno a distancia 5 para contar igual de
// "seguro" — así una similitud pequeña pesa muchísimo si está pegada al
// lado, y casi nada si está lejos, tal como pide "cuanto más lejos, menos
// importa".
//
// Es voraz (cada color se fija mirando solo hacia atrás) y por construcción
// determinista y ESTABLE: el color de una fase nunca cambia cuando se
// añaden fases nuevas después — igual que garantizaba el índice%6 de antes,
// propiedad que el resto del código ya asume (ver comentarios de
// allPhasesHistory). Con 6 colores fijos, en la práctica alcanza el suelo
// perceptual de la propia paleta (el ΔE mínimo entre cualquier par de
// PHASE_COLORS) incluso con secuencias largas — verificado con hasta 30
// fases seguidas, cero coincidencias exactas dentro de la ventana.
export function assignPhaseColors(count: number, palette: readonly string[] = PHASE_COLORS): string[] {
  if (count <= 0) return [];
  const deMatrix = getDeltaEMatrix(palette);
  const colorIndices: number[] = [0];

  for (let i = 1; i < count; i++) {
    let bestColor = 0;
    let bestWorstCase = -Infinity;
    for (let candidate = 0; candidate < palette.length; candidate++) {
      let worstCase = Infinity;
      for (let back = 1; back <= Math.min(PROXIMITY_WINDOW, i); back++) {
        const neighborColor = colorIndices[i - back];
        const weighted = deMatrix[candidate][neighborColor] * back;
        if (weighted < worstCase) worstCase = weighted;
      }
      if (worstCase > bestWorstCase) {
        bestWorstCase = worstCase;
        bestColor = candidate;
      }
    }
    colorIndices.push(bestColor);
  }

  return colorIndices.map((idx) => palette[idx]);
}

// Azúcar para el caso de uso real de los dos consumidores: una secuencia de
// ids YA ordenada por fecha de inicio -> qué color le toca a cada id.
export function buildPhaseColorMap(
  orderedPhaseIds: readonly string[],
  palette: readonly string[] = PHASE_COLORS
): Map<string, string> {
  const colors = assignPhaseColors(orderedPhaseIds.length, palette);
  const map = new Map<string, string>();
  orderedPhaseIds.forEach((id, i) => map.set(id, colors[i]));
  return map;
}
