import { DateTime } from "luxon";
import { getHourCategory, HourCategory, WorkingHours } from "@/lib/timezone";

/** Soft, semi-transparent fill per category — texture, not solid color blocks. */
export const CATEGORY_FILL: Record<HourCategory, string> = {
  business: "rgba(16, 185, 129, 0.22)",
  morning: "rgba(245, 158, 11, 0.18)",
  night: "rgba(59, 130, 246, 0.16)",
  sleeping: "rgba(100, 116, 139, 0.12)",
};

/**
 * Builds a single continuous CSS gradient for a zone's timeline track from
 * its local-hour samples at each base-timeline position. Using one color
 * stop per hour and letting linear-gradient interpolate between them gives
 * a smooth, flowing transition between day/night/business-hours bands
 * instead of a row of discrete blocks.
 */
export function buildZoneGradient(hourDts: DateTime[], workingHours: WorkingHours): string {
  const stops = hourDts.map((dt, i) => {
    const category = getHourCategory(dt.hour, workingHours);
    const pct = (i / hourDts.length) * 100;
    return `${CATEGORY_FILL[category]} ${pct}%`;
  });
  const wrapCategory = getHourCategory(hourDts[0]?.hour ?? 0, workingHours);
  stops.push(`${CATEGORY_FILL[wrapCategory]} 100%`);
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

export const MAJOR_TICK_HOURS = [0, 3, 6, 9, 12, 15, 18, 21];

export function formatTickLabel(hour: number, hour12: boolean): string {
  if (!hour12) return `${String(hour).padStart(2, "0")}:00`;
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}
