import { DateTime } from "luxon";

export function formatTime(dt: DateTime, hour12 = true): string {
  return dt.toFormat(hour12 ? "h:mm a" : "HH:mm");
}

export function formatUtcOffset(dt: DateTime): string {
  return `UTC${dt.toFormat("ZZ")}`;
}

export function isDST(timezone: string): boolean {
  return DateTime.now().setZone(timezone).isInDST;
}

export function isDayTime(dt: DateTime): boolean {
  return dt.hour >= 6 && dt.hour < 18;
}

export function isWorkingHour(dt: DateTime, start = 9, end = 17): boolean {
  return dt.hour >= start && dt.hour < end;
}

export function isWeekend(dt: DateTime): boolean {
  return dt.weekday === 6 || dt.weekday === 7;
}

/** Difference between toDt and fromDt, signed, in whole minutes. */
export function diffMinutes(fromDt: DateTime, toDt: DateTime): number {
  return Math.round(toDt.diff(fromDt, "minutes").minutes);
}

export function formatDiff(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h === 0) return `${sign}${m} min`;
  if (m === 0) return `${sign}${h} hr`;
  return `${sign}${h} hr ${m} min`;
}
