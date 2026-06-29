"use client";

import { useRef, useState } from "react";
import { DateTime } from "luxon";
import { motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { ZoneTrack } from "@/components/timeline/zone-track";
import { MAJOR_TICK_HOURS, formatTickLabel } from "@/components/timeline/gradient";
import { Button } from "@/components/ui/button";
import { formatTime, formatUtcOffset, OverlapQuality, WorkingHours } from "@/lib/timezone";
import { cn } from "@/lib/utils";

export interface TimelineZone {
  id: string;
  label: string;
  abbreviation: string;
  hourDts: DateTime[]; // 24 entries: this zone's local time at each base-hour position
}

interface TimelineGroupProps {
  zones: TimelineZone[];
  workingHours: WorkingHours;
  hour12: boolean;
  /** Current scrub position, in fractional base-timeline hours (0-24). */
  selectedHour: number;
  /** If provided, the indicator becomes draggable/keyboard-adjustable and calls back with the new hour. */
  onScrub?: (hour: number) => void;
  /** Optional 48-slot (30-min) overlap-quality strip, rendered as an extra row. */
  overlapStrip?: OverlapQuality[];
}

export const OVERLAP_COLOR: Record<OverlapQuality, string> = {
  excellent: "rgba(16, 185, 129, 0.45)",
  acceptable: "rgba(245, 158, 11, 0.4)",
  poor: "rgba(239, 68, 68, 0.3)",
};

export const OVERLAP_LABEL: Record<OverlapQuality, string> = {
  excellent: "Excellent overlap",
  acceptable: "Acceptable overlap",
  poor: "Poor overlap",
};

export function TimelineGroup({
  zones,
  workingHours,
  hour12,
  selectedHour,
  onScrub,
  overlapStrip,
}: TimelineGroupProps) {
  const [compact, setCompact] = useState(false);
  const [hoverHour, setHoverHour] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  function hourFromPointer(clientX: number): number {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return selectedHour;
    const fraction = (clientX - rect.left) / rect.width;
    return Math.min(23.99, Math.max(0, fraction * 24));
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragging && onScrub) {
      onScrub(hourFromPointer(e.clientX));
    }
    setHoverHour(hourFromPointer(e.clientX));
  }

  function startDrag(e: React.PointerEvent) {
    if (!onScrub) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    onScrub(hourFromPointer(e.clientX));
  }

  function handlePointerUp() {
    setDragging(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!onScrub) return;
    const step = e.shiftKey ? 1 : 0.25;
    if (e.key === "ArrowRight") onScrub(Math.min(23.99, selectedHour + step));
    if (e.key === "ArrowLeft") onScrub(Math.max(0, selectedHour - step));
  }

  const displayHour = hoverHour ?? selectedHour;
  const indicatorPct = (selectedHour / 24) * 100;
  const hoverPct = hoverHour !== null ? (hoverHour / 24) * 100 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="select-none"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <LegendDot color="rgba(16, 185, 129, 0.7)" label="Business hours" />
          <LegendDot color="rgba(245, 158, 11, 0.7)" label="Morning" />
          <LegendDot color="rgba(59, 130, 246, 0.6)" label="Night" />
          <LegendDot color="rgba(100, 116, 139, 0.5)" label="Sleeping" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 rounded-full text-xs"
          onClick={() => setCompact((c) => !c)}
          aria-label={compact ? "Switch to comfortable spacing" : "Switch to compact spacing"}
        >
          {compact ? <Maximize2 className="size-3.5" /> : <Minimize2 className="size-3.5" />}
          {compact ? "Comfortable" : "Compact"}
        </Button>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[640px]">
          {/* Hour ruler + drag handle */}
          <div className="flex items-center gap-3 pb-3">
            <div className="w-20 shrink-0" />
            <div className="relative flex-1 text-[11px] text-muted-foreground" ref={trackRef}>
              <div className="flex justify-between">
                {MAJOR_TICK_HOURS.map((h) => (
                  <span key={h}>{formatTickLabel(h, hour12)}</span>
                ))}
              </div>
              {onScrub && (
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Scrub time across the timeline"
                  aria-orientation="horizontal"
                  aria-valuemin={0}
                  aria-valuemax={24}
                  aria-valuenow={Math.round(selectedHour * 100) / 100}
                  aria-valuetext={formatTickLabel(Math.floor(selectedHour), hour12)}
                  onPointerDown={startDrag}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onKeyDown={handleKeyDown}
                  className="absolute -bottom-2 size-3.5 -translate-x-1/2 cursor-grab rounded-full border-2 border-background bg-blue-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:cursor-grabbing"
                  style={{ left: `${indicatorPct}%` }}
                />
              )}
            </div>
          </div>

          <div
            className={cn("flex flex-col", compact ? "gap-2" : "gap-3")}
            onPointerMove={handlePointerMove}
            onPointerDown={startDrag}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => !dragging && setHoverHour(null)}
          >
            {zones.map((zone) => (
              <div key={zone.id} className="relative">
                <ZoneTrack
                  label={zone.label}
                  abbreviation={zone.abbreviation}
                  hourDts={zone.hourDts}
                  workingHours={workingHours}
                  compact={compact}
                />
                {/* Shared selected-time indicator, redrawn per row at the same % so it reads as one line. */}
                <div className="pointer-events-none absolute top-0 bottom-0 left-20 ml-3" style={{ right: 0 }}>
                  <div
                    className="absolute top-0 bottom-0 w-px bg-blue-600"
                    style={{ left: `${indicatorPct}%` }}
                    aria-hidden
                  />
                  {hoverPct !== null && (
                    <div
                      className="absolute top-0 bottom-0 w-px bg-foreground/30"
                      style={{ left: `${hoverPct}%` }}
                      aria-hidden
                    />
                  )}
                </div>
              </div>
            ))}

            {overlapStrip && (
              <div className="flex items-center gap-3 pt-1">
                <div className="w-20 shrink-0">
                  <p className="text-[11px] font-semibold text-muted-foreground">Overlap</p>
                </div>
                <div
                  className="relative h-3 flex-1 overflow-hidden rounded-full"
                  role="img"
                  aria-label="Meeting overlap quality across the day"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${overlapStrip
                      .map((q, i) => `${OVERLAP_COLOR[q]} ${(i / overlapStrip.length) * 100}%`)
                      .join(", ")})`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {hoverHour !== null && (
        <TooltipPanel hour={displayHour} zones={zones} hour12={hour12} workingHours={workingHours} />
      )}
    </motion.div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function TooltipPanel({
  hour,
  zones,
  hour12,
  workingHours,
}: {
  hour: number;
  zones: TimelineZone[];
  hour12: boolean;
  workingHours: WorkingHours;
}) {
  const wholeHour = Math.floor(hour);
  const minute = Math.round((hour - wholeHour) * 60);

  return (
    <div className="mt-3 flex flex-wrap gap-3 rounded-xl border border-border bg-popover p-3 text-xs shadow-sm">
      {zones.map((zone) => {
        const base = zone.hourDts[wholeHour] ?? zone.hourDts[0];
        const dt = base.set({ minute });
        const withinWorking = dt.hour >= workingHours.start && dt.hour < workingHours.end;
        return (
          <div key={zone.id} className="min-w-[140px]">
            <p className="font-semibold">{zone.label}</p>
            <p className="tabular-time text-sm">{formatTime(dt, hour12)}</p>
            <p className="text-muted-foreground">
              {dt.toFormat("ccc, LLL d")} · {formatUtcOffset(dt)}
            </p>
            <p className="text-muted-foreground">
              {dt.isInDST ? "DST active" : "Standard time"} · {withinWorking ? "Working hours" : "Off hours"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
