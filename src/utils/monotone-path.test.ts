import { monotonePath } from '@/utils/monotone-path';

// On-curve points and control points taken from the hero sparkline in the design canvas.
const CANVAS_POINTS = [
  [0, 57.0],
  [28.9, 52.7],
  [57.8, 50.2],
  [86.7, 42.8],
  [115.6, 38.4],
  [144.5, 33.4],
  [173.5, 29.7],
  [202.4, 24.8],
  [231.3, 19.8],
  [260.2, 16.1],
  [289.1, 11.7],
  [318.0, 8.0],
].map(([x, y]) => ({ x, y }));

function numbers(path: string): number[] {
  return (path.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
}

describe('monotonePath', () => {
  it('returns an empty path for no points and a move for one', () => {
    expect(monotonePath([])).toBe('');
    expect(monotonePath([{ x: 1, y: 2 }])).toBe('M1,2');
  });

  it('draws a straight line for two points', () => {
    expect(
      monotonePath([
        { x: 0, y: 0 },
        { x: 10, y: 5 },
      ]),
    ).toBe('M0,0 L10,5');
  });

  it('passes through every point', () => {
    const values = numbers(monotonePath(CANVAS_POINTS));
    for (const { x, y } of CANVAS_POINTS) {
      const found = values.some((v, i) => i % 2 === 0 && v === x && values[i + 1] === y);
      expect(found).toBe(true);
    }
  });

  it('keeps the first and last control handles at one sixth of the segment width', () => {
    const [c1x, , c2x] = numbers(monotonePath(CANVAS_POINTS)).slice(2);
    expect(c1x).toBeCloseTo(4.8, 1);
    expect(c2x).toBeCloseTo(19.3, 1);
  });

  it('never overshoots a flat run (monotone)', () => {
    const flat = [
      { x: 0, y: 10 },
      { x: 10, y: 10 },
      { x: 20, y: 30 },
    ];
    const ys = numbers(monotonePath(flat)).filter((_, i) => i % 2 === 1);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(10);
    expect(Math.max(...ys)).toBeLessThanOrEqual(30);
  });
});
