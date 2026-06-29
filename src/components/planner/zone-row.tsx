"use client";

import { DateTime } from "luxon";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getHourCategory, HOUR_CATEGORY_COLORS, WorkingHours } from "@/lib/timezone";

interface ZoneRowProps {
  label: string;
  title?: string;
  hourDts: DateTime[]; // 24 entries, this zone's local hours 0-23
  workingHours: WorkingHours;
  hour12: boolean;
  onRemove?: () => void;
}

export function ZoneRow({ label, title, hourDts, workingHours, hour12, onRemove }: ZoneRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex w-20 shrink-0 items-center justify-between gap-1" title={title}>
        <span className="truncate text-sm font-semibold">{label}</span>
        {onRemove && (
          <Button
            size="icon"
            variant="ghost"
            className="size-6 shrink-0 rounded-full"
            aria-label={`Remove ${label}`}
            onClick={onRemove}
          >
            <X className="size-3" />
          </Button>
        )}
      </div>
      <div className="grid flex-1 grid-cols-[repeat(24,minmax(0,1fr))] gap-[3px]">
        {hourDts.map((dt, i) => {
          const category = getHourCategory(dt.hour, workingHours);
          return (
            <div
              key={i}
              role="img"
              aria-label={`${label} ${dt.toFormat(hour12 ? "h a" : "HH:00")}`}
              title={dt.toFormat(hour12 ? "h a" : "HH:00")}
              className={cn("h-7 rounded-[5px]", HOUR_CATEGORY_COLORS[category])}
            />
          );
        })}
      </div>
    </div>
  );
}
