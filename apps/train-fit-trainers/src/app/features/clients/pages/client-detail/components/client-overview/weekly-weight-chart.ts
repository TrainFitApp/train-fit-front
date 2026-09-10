import type { OverviewWeek } from './client-overview.model';

export interface WeeklyWeightChartPoint {
  x: number;
  y: number;
  week: OverviewWeek;
}
export interface WeeklyWeightChart {
  paths: string[];
  points: WeeklyWeightChartPoint[];
  min: number;
  max: number;
  firstDate: string;
  middleDate: string;
  lastDate: string;
}

/** Conserva los huecos entre semanas: una ausencia nunca se convierte en cero ni en una recta interpolada. */
export function buildWeeklyWeightChart(input: readonly OverviewWeek[]): WeeklyWeightChart | null {
  const weeks = [...input].sort((a, b) => a.start.localeCompare(b.start)).slice(-8);
  const valid = (week: OverviewWeek): boolean => typeof week.average === 'number'
    && Number.isFinite(week.average) && week.average > 0 && week.count > 0;
  const values = weeks.filter(valid).map(week => week.average as number);
  if (values.length < 2) return null;

  const low = Math.min(...values);
  const high = Math.max(...values);
  // Un intervalo mínimo evita que unas centésimas ocupen toda la altura del gráfico.
  const center = (low + high) / 2;
  const span = Math.max(high - low, 1);
  const min = Math.floor((center - span * .6) * 10) / 10;
  const max = Math.ceil((center + span * .6) * 10) / 10;
  const points: WeeklyWeightChartPoint[] = [];
  const paths: string[] = [];
  let path = '';
  for (const [index, week] of weeks.entries()) {
    if (!valid(week)) {
      if (path) paths.push(path);
      path = '';
      continue;
    }
    const x = 8 + index / (weeks.length - 1) * 624;
    const y = 10 + (max - (week.average as number)) / (max - min) * 108;
    points.push({ x, y, week });
    path += `${path ? ' L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`;
  }
  if (path) paths.push(path);
  return {
    paths, points, min, max,
    firstDate: weeks[0].start,
    middleDate: weeks[Math.floor((weeks.length - 1) / 2)].start,
    lastDate: weeks[weeks.length - 1].start,
  };
}
