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

/**
 * The real abbreviation a clock in this IANA zone shows right now (or at `dt`),
 * e.g. "EST" in January and "EDT" in July for America/New_York. Never hardcode
 * an abbreviation for a DST-observing zone — always derive it from the date.
 *
 * ICU (which Luxon's offsetNameShort relies on) doesn't have a short named
 * abbreviation for every zone — e.g. Asia/Kolkata resolves to "GMT+5:30"
 * rather than "IST". When that happens, `fallback` (a curated static
 * abbreviation, safe for zones that never observe DST) is used instead.
 */
export function zoneAbbreviation(
  timezone: string,
  dt: DateTime = DateTime.now(),
  fallback?: string
): string {
  const computed = dt.setZone(timezone).offsetNameShort;
  const looksLikeRealAbbreviation = computed && /^[A-Za-z]{2,6}$/.test(computed);
  if (looksLikeRealAbbreviation) return computed;
  return fallback ?? computed ?? formatUtcOffset(dt.setZone(timezone));
}

/** Human-friendly label for an arbitrary IANA zone id, e.g. "Asia/Kolkata" -> "Kolkata". */
export function cityNameFromIana(timezone: string): string {
  const parts = timezone.split("/");
  return (parts[parts.length - 1] ?? timezone).replace(/_/g, " ");
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

export interface WorkingHours {
  start: number; // 0-23
  end: number; // 0-23
}

export type HourCategory = "business" | "morning" | "night" | "sleeping";

export function getHourCategory(hour: number, working: WorkingHours): HourCategory {
  if (hour >= working.start && hour < working.end) return "business";
  if (hour >= 6 && hour < working.start) return "morning";
  if (hour >= 22 || hour < 6) return "sleeping";
  return "night";
}

export const HOUR_CATEGORY_COLORS: Record<HourCategory, string> = {
  business: "bg-[var(--success)]/80",
  morning: "bg-[var(--warning)]/80",
  night: "bg-blue-500/60",
  sleeping: "bg-muted",
};

export const HOUR_CATEGORY_LABELS: Record<HourCategory, string> = {
  business: "Business hours",
  morning: "Morning",
  night: "Night",
  sleeping: "Sleeping hours",
};

export interface OverlapWindow {
  startHour: number; // hour in baseTimezone, 0-23 (may be fractional for 30-min granularity)
  durationMinutes: number;
}

/**
 * Finds the best overlap windows across all given IANA timezones' working hours,
 * expressed as hours (0-23) in the `baseTimezone` reference frame, at 30-minute granularity.
 */
export function findBestOverlaps(
  timezones: string[],
  workingHours: WorkingHours,
  baseTimezone: string,
  baseDate: DateTime = DateTime.now()
): { thirtyMin: OverlapWindow | null; oneHour: OverlapWindow | null; twoHour: OverlapWindow | null } {
  const slots: boolean[] = new Array(48).fill(true);

  for (let slot = 0; slot < 48; slot++) {
    const minutesFromMidnight = slot * 30;
    const hour = Math.floor(minutesFromMidnight / 60);
    const minute = minutesFromMidnight % 60;
    const baseDt = baseDate.setZone(baseTimezone).set({ hour, minute, second: 0, millisecond: 0 });

    for (const tz of timezones) {
      const local = baseDt.setZone(tz);
      const localMinutes = local.hour * 60 + local.minute;
      const startMinutes = workingHours.start * 60;
      const endMinutes = workingHours.end * 60;
      if (localMinutes < startMinutes || localMinutes >= endMinutes) {
        slots[slot] = false;
        break;
      }
    }
  }

  function longestRunFrom(requiredSlots: number): OverlapWindow | null {
    let bestStart = -1;
    let bestLen = 0;
    let runStart = -1;
    let runLen = 0;
    for (let i = 0; i < 48; i++) {
      if (slots[i]) {
        if (runLen === 0) runStart = i;
        runLen++;
        if (runLen >= requiredSlots && runLen > bestLen) {
          bestLen = runLen;
          bestStart = runStart;
        }
      } else {
        runLen = 0;
      }
    }
    if (bestStart === -1) return null;
    return { startHour: (bestStart * 30) / 60, durationMinutes: bestLen * 30 };
  }

  return {
    thirtyMin: longestRunFrom(1),
    oneHour: longestRunFrom(2),
    twoHour: longestRunFrom(4),
  };
}
