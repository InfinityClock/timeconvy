"use client";

import { useMemo, useState } from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3 } from "lucide-react";
import { useTimeBridgeStore } from "@/lib/store";
import { TIMEZONE_BY_ID } from "@/constants/timezones";
import { findBestOverlaps, HOUR_CATEGORY_COLORS, HOUR_CATEGORY_LABELS, zoneAbbreviation } from "@/lib/timezone";
import { HourCategory } from "@/lib/timezone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoneRow } from "@/components/planner/zone-row";
import { AddZoneButton } from "@/components/planner/add-zone-button";
import { cn } from "@/lib/utils";

const PRESETS = [
  { label: "9 – 5", start: 9, end: 17 },
  { label: "8 – 4", start: 8, end: 16 },
  { label: "10 – 6", start: 10, end: 18 },
  { label: "Flexible 7 – 9", start: 7, end: 21 },
];

export function MeetingPlanner() {
  const {
    plannerZoneIds,
    plannerWorkingHours,
    addPlannerZone,
    removePlannerZone,
    setPlannerWorkingHours,
    hour12,
  } = useTimeBridgeStore();
  const [custom, setCustom] = useState(false);

  const zones = plannerZoneIds.map((id) => TIMEZONE_BY_ID[id]).filter(Boolean);
  const baseZone = zones[0];
  const today = useMemo(() => DateTime.now(), []);

  const hourRows = useMemo(() => {
    if (!baseZone) return [];
    return Array.from({ length: 24 }, (_, h) =>
      today.setZone(baseZone.timezone).set({ hour: h, minute: 0, second: 0, millisecond: 0 })
    );
  }, [today, baseZone]);

  const overlaps = useMemo(() => {
    if (!baseZone) return { thirtyMin: null, oneHour: null, twoHour: null };
    return findBestOverlaps(
      zones.map((z) => z.timezone),
      plannerWorkingHours,
      baseZone.timezone
    );
  }, [zones, plannerWorkingHours, baseZone]);

  function formatWindow(startHour: number, durationMinutes: number) {
    if (!baseZone) return "";
    const start = DateTime.now().setZone(baseZone.timezone).set({
      hour: Math.floor(startHour),
      minute: (startHour % 1) * 60,
      second: 0,
      millisecond: 0,
    });
    const end = start.plus({ minutes: durationMinutes });
    const fmt = hour12 ? "h:mm a" : "HH:mm";
    const abbr = zoneAbbreviation(baseZone.timezone, start, baseZone.abbreviation);
    return `${start.toFormat(fmt)} – ${end.toFormat(fmt)} (${abbr})`;
  }

  const windows = [
    { label: "Best 30-Min Overlap", data: overlaps.thirtyMin },
    { label: "Best 1-Hour Overlap", data: overlaps.oneHour },
    { label: "Best 2-Hour Overlap", data: overlaps.twoHour },
  ];

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 pb-20 pt-6 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to converter
      </Link>

      <div className="mt-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Meeting Planner</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Find the best time to meet across every time zone on your team.
        </p>
      </div>

      <div className="surface-card mt-8 p-5 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {PRESETS.map((preset) => {
            const active = !custom && plannerWorkingHours.start === preset.start && plannerWorkingHours.end === preset.end;
            return (
              <Button
                key={preset.label}
                size="sm"
                variant={active ? "default" : "outline"}
                className="rounded-full"
                onClick={() => {
                  setCustom(false);
                  setPlannerWorkingHours({ start: preset.start, end: preset.end });
                }}
              >
                {preset.label}
              </Button>
            );
          })}
          <Button
            size="sm"
            variant={custom ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCustom(true)}
          >
            Custom
          </Button>
        </div>

        {custom && (
          <div className="mx-auto mb-8 flex max-w-sm items-center justify-center gap-3 text-sm">
            <label className="flex items-center gap-2">
              Start
              <input
                type="number"
                min={0}
                max={23}
                value={plannerWorkingHours.start}
                onChange={(e) => setPlannerWorkingHours({ ...plannerWorkingHours, start: Number(e.target.value) })}
                className="w-16 rounded-lg border border-border bg-background px-2 py-1"
              />
            </label>
            <label className="flex items-center gap-2">
              End
              <input
                type="number"
                min={1}
                max={24}
                value={plannerWorkingHours.end}
                onChange={(e) => setPlannerWorkingHours({ ...plannerWorkingHours, end: Number(e.target.value) })}
                className="w-16 rounded-lg border border-border bg-background px-2 py-1"
              />
            </label>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {windows.map((w) => (
            <Card key={w.label} className="rounded-xl border-0 bg-muted p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock3 className="size-4" />
                {w.label}
              </div>
              {w.data ? (
                <>
                  <div className="mb-2 flex items-center gap-1.5 text-[var(--success)]">
                    <CheckCircle2 className="size-4" />
                    <span className="text-xs font-medium">Recommended</span>
                  </div>
                  <p className="text-lg font-semibold">{formatWindow(w.data.startHour, w.data.durationMinutes)}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No overlap found for these working hours.</p>
              )}
            </Card>
          ))}
        </div>

        <div className="my-6 flex flex-wrap items-center justify-center gap-2">
          {(Object.keys(HOUR_CATEGORY_LABELS) as HourCategory[]).map((cat) => (
            <Badge key={cat} variant="secondary" className="gap-1.5 rounded-full">
              <span className={cn("size-2 rounded-full", HOUR_CATEGORY_COLORS[cat])} />
              {HOUR_CATEGORY_LABELS[cat]}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col gap-3 overflow-x-auto">
          <div className="min-w-[720px] space-y-3">
            {zones.map((zone) => (
              <ZoneRow
                key={zone.id}
                label={zoneAbbreviation(zone.timezone, undefined, zone.abbreviation)}
                title={zone.label.split(" (")[0]}
                hourDts={hourRows.map((dt) => dt.setZone(zone.timezone))}
                workingHours={plannerWorkingHours}
                hour12={hour12}
                onRemove={zones.length > 1 ? () => removePlannerZone(zone.id) : undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <AddZoneButton excludeIds={plannerZoneIds} onAdd={addPlannerZone} />
        </div>
      </div>
    </div>
  );
}
