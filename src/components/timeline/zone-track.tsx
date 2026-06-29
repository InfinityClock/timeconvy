"use client";

import { DateTime } from "luxon";
import { WorkingHours } from "@/lib/timezone";
import { buildZoneGradient } from "@/components/timeline/gradient";
import { cn } from "@/lib/utils";

interface ZoneTrackProps {
  label: string;
  abbreviation: string;
  hourDts: DateTime[];
  workingHours: WorkingHours;
  compact: boolean;
}

export function ZoneTrack({ label, abbreviation, hourDts, workingHours, compact }: ZoneTrackProps) {
  const gradient = buildZoneGradient(hourDts, workingHours);

  return (
    <div className="flex items-center gap-3">
      <div className="sticky left-0 z-10 w-20 shrink-0 bg-card pr-2" title={label}>
        <p className="text-sm font-semibold leading-tight">{abbreviation}</p>
        <p className="truncate text-[11px] text-muted-foreground">{label}</p>
      </div>
      <div
        role="img"
        aria-label={`${label} day and business-hours timeline`}
        className={cn(
          "relative flex-1 overflow-hidden rounded-[10px] border border-border/60 bg-[length:100%_100%]",
          "transition-[height] duration-200",
          compact ? "h-7" : "h-11"
        )}
        style={{ backgroundImage: gradient }}
      >
        {/* minor ticks: every hour */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0, transparent calc(100%/24 - 1px), var(--border) calc(100%/24 - 1px), var(--border) calc(100%/24))",
          }}
          aria-hidden
        />
        {/* major ticks: every 3 hours */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--border) 0, var(--border) 1px, transparent 1px, transparent calc(100%/8))",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
