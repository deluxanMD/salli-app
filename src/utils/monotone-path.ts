export type Point = { x: number; y: number };

function sign(value: number): number {
  return value < 0 ? -1 : 1;
}

/** Slope at an interior point, limited so the curve never overshoots (Fritsch-Carlson). */
function interiorTangent(a: Point, b: Point, c: Point): number {
  const h0 = b.x - a.x;
  const h1 = c.x - b.x;
  const s0 = (b.y - a.y) / (h0 || 0);
  const s1 = (c.y - b.y) / (h1 || 0);
  const p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

function endTangent(a: Point, b: Point, neighbour: number): number {
  const h = b.x - a.x;
  return h ? (3 * ((b.y - a.y) / h) - neighbour) / 2 : neighbour;
}

const fixed = (value: number) => Number(value.toFixed(1)).toString();

/**
 * SVG path through `points` using a monotone cubic curve (same family as d3's curveMonotoneX).
 * Outer control handles are one sixth of the segment width, matching the canvas geometry.
 */
export function monotonePath(points: readonly Point[]): string {
  if (points.length === 0) return '';
  const first = points[0];
  if (points.length === 1) return `M${fixed(first.x)},${fixed(first.y)}`;
  if (points.length === 2) {
    const last = points[1];
    return `M${fixed(first.x)},${fixed(first.y)} L${fixed(last.x)},${fixed(last.y)}`;
  }

  const n = points.length;
  const tangents = new Array<number>(n);
  for (let i = 1; i < n - 1; i++) {
    tangents[i] = interiorTangent(points[i - 1], points[i], points[i + 1]);
  }
  tangents[0] = endTangent(points[0], points[1], tangents[1]);
  tangents[n - 1] = endTangent(points[n - 2], points[n - 1], tangents[n - 2]);

  let d = `M${fixed(first.x)},${fixed(first.y)}`;
  for (let i = 0; i < n - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const third = (b.x - a.x) / 3;
    const startHandle = i === 0 ? third / 2 : third;
    const endHandle = i === n - 2 ? third / 2 : third;
    d +=
      ` C${fixed(a.x + startHandle)},${fixed(a.y + startHandle * tangents[i])}` +
      ` ${fixed(b.x - endHandle)},${fixed(b.y - endHandle * tangents[i + 1])}` +
      ` ${fixed(b.x)},${fixed(b.y)}`;
  }
  return d;
}
