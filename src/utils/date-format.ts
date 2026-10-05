import { en } from '@/i18n/en';

const pad = (n: number) => String(n).padStart(2, '0');

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** 12-hour time: 6:42 PM */
export function formatTime(date: Date): string {
  const hours = date.getHours();
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${h12}:${pad(date.getMinutes())} ${hours < 12 ? 'AM' : 'PM'}`;
}

/** Date group header: WED, 30 SEP */
export function formatDayHeader(date: Date): string {
  return `${en.dates.weekdaysShort[date.getDay()]}, ${date.getDate()} ${en.dates.monthsShort[date.getMonth()]}`.toUpperCase();
}

/** 30 Sep 2026, 6:42 PM */
export function formatFullDate(date: Date): string {
  return `${date.getDate()} ${en.dates.monthsShort[date.getMonth()]} ${date.getFullYear()}, ${formatTime(date)}`;
}

/** Month selector: Sep 2026 */
export function formatMonthYear(date: Date): string {
  return `${en.dates.monthsShort[date.getMonth()]} ${date.getFullYear()}`;
}

/** Time for today's rows, "Yesterday" for the day before, otherwise a short date (27 Sep). */
export function formatRowTime(date: Date, now: Date): string {
  if (sameDay(date, now)) return formatTime(date);
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  if (sameDay(date, yesterday)) return en.dates.yesterday;
  return `${date.getDate()} ${en.dates.monthsShort[date.getMonth()]}`;
}

export type DayGroup<T> = { key: string; date: Date; items: T[] };

/** Groups items into days, newest day first and newest item first within a day. */
export function groupByDay<T>(items: readonly T[], getDate: (item: T) => Date): DayGroup<T>[] {
  const sorted = [...items].sort((a, b) => getDate(b).getTime() - getDate(a).getTime());
  const groups: DayGroup<T>[] = [];
  for (const item of sorted) {
    const day = startOfDay(getDate(item));
    const key = `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`;
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.items.push(item);
    else groups.push({ key, date: day, items: [item] });
  }
  return groups;
}
