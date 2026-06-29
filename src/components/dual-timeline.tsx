"use client";

import { DateTime } from "luxon";
import { cn } from "@/lib/utils";

interface DualTimelineProps {
  fromLabel: string;
  toLabel: string;
  fromHourDts: DateTime[]; // 24 entries, fromTz local hours 0-23
  toHourDts: DateTime[]; // corresponding toTz local times
  selectedHour: number;
  hour12: boolean;
}

export function DualTimeline({
  fromLabel,
  toLabel,
  fromHourDts,
  toHourDts,
  selectedHour,
  hour12,
}: DualTimelineProps) {
  return (
    <div
      role="group"
      aria-label={`24-hour comparison between ${fromLabel} and ${toLabel}`}
      className="overflow-x-auto"
    >
      <div className="min-w-[720px]">
        <TimelineRow label={fromLabel} dts={fromHourDts} selectedHour={selectedHour} hour12={hour12} />
        <div className="my-2 h-px bg-border" />
        <TimelineRow label={toLabel} dts={toHourDts} selectedHour={selectedHour} hour12={hour12} />
      </div>
    </div>
  );
}

function TimelineRow({
  label,
  dts,
  selectedHour,
  hour12,
}: {
  label: string;
  dts: DateTime[];
  selectedHour: number;
  hour12: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-sm font-semibold">{label}</span>
      <div className="grid flex-1 grid-cols-[repeat(24,minmax(0,1fr))] gap-1">
        {dts.map((dt, i) => {
          const isSelected = i === selectedHour;
          return (
            <div
              key={i}
              role="img"
              aria-label={`${label} ${dt.toFormat(hour12 ? "h a" : "HH:mm")}${isSelected ? " — selected hour" : ""}`}
              title={dt.toFormat(hour12 ? "h:mm a" : "HH:mm")}
              className={cn(
                "flex h-9 items-center justify-center rounded-md text-[10px] font-medium text-muted-foreground transition-colors",
                isSelected ? "bg-blue-600 text-white" : "bg-muted"
              )}
            >
              {dt.toFormat(hour12 ? "h a" : "HH")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
