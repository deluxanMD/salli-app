import {
  formatDayHeader,
  formatFullDate,
  formatMonthYear,
  formatRowTime,
  formatTime,
  groupByDay,
} from '@/utils/date-format';

const wed = new Date(2026, 8, 30, 18, 42);

describe('date formatting', () => {
  it('formats 12-hour times', () => {
    expect(formatTime(wed)).toBe('6:42 PM');
    expect(formatTime(new Date(2026, 8, 30, 9, 2))).toBe('9:02 AM');
    expect(formatTime(new Date(2026, 8, 30, 0, 5))).toBe('12:05 AM');
    expect(formatTime(new Date(2026, 8, 30, 12, 0))).toBe('12:00 PM');
  });

  it('formats uppercase day headers', () => {
    expect(formatDayHeader(wed)).toBe('WED, 30 SEP');
    expect(formatDayHeader(new Date(2026, 8, 27))).toBe('SUN, 27 SEP');
  });

  it('formats the full date and month selector', () => {
    expect(formatFullDate(wed)).toBe('30 Sep 2026, 6:42 PM');
    expect(formatMonthYear(wed)).toBe('Sep 2026');
  });

  it('shows the time today, Yesterday the day before, a date otherwise', () => {
    const now = new Date(2026, 8, 30, 20, 0);
    expect(formatRowTime(wed, now)).toBe('6:42 PM');
    expect(formatRowTime(new Date(2026, 8, 29, 20, 15), now)).toBe('Yesterday');
    expect(formatRowTime(new Date(2026, 8, 27, 16, 5), now)).toBe('27 Sep');
  });
});

describe('groupByDay', () => {
  it('groups newest day first, newest item first', () => {
    const items = [
      { id: 'a', at: new Date(2026, 8, 29, 11, 30) },
      { id: 'b', at: new Date(2026, 8, 30, 9, 2) },
      { id: 'c', at: new Date(2026, 8, 30, 18, 42) },
    ];
    const groups = groupByDay(items, (i) => i.at);
    expect(groups.map((g) => g.key)).toEqual(['2026-09-30', '2026-09-29']);
    expect(groups[0].items.map((i) => i.id)).toEqual(['c', 'b']);
  });
});
