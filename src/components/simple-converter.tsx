"use client";

import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { ArrowRightLeft, Moon, Star, Sun } from "lucide-react";
import { TimezoneSelect } from "@/components/timezone-select";
import { DualTimeline } from "@/components/dual-timeline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIMEZONE_BY_ID, QUICK_PRESETS } from "@/constants/timezones";
import { useTimeBridgeStore, TimezonePair } from "@/lib/store";
import {
  formatDiff,
  formatTime,
  formatUtcOffset,
  isDayTime,
  isDST,
  isWorkingHour,
} from "@/lib/timezone";
import { cn } from "@/lib/utils";

function todayStr() {
  return DateTime.now().toFormat("yyyy-MM-dd");
}

function nowTimeStr() {
  return DateTime.now().toFormat("HH:mm");
}

export function SimpleConverter() {
  const { fromId, toId, hour12, setFrom, setTo, setPair, swap, recentPairs, favoritePairs, addRecent, toggleFavorite, isFavorite } =
    useTimeBridgeStore();

  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState(nowTimeStr);

  const fromTz = TIMEZONE_BY_ID[fromId];
  const toTz = TIMEZONE_BY_ID[toId];

  const fromDt = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    const [h, min] = time.split(":").map(Number);
    return DateTime.fromObject(
      { year: y, month: m, day: d, hour: h, minute: min },
      { zone: fromTz?.timezone ?? "UTC" }
    );
  }, [date, time, fromTz]);

  const toDt = fromDt.setZone(toTz?.timezone ?? "UTC");

  useEffect(() => {
    const id = setTimeout(() => addRecent({ from: fromId, to: toId }), 800);
    return () => clearTimeout(id);
  }, [fromId, toId, addRecent]);

  const fromHourDts = useMemo(
    () =>
      Array.from({ length: 24 }, (_, h) =>
        fromDt.set({ hour: h, minute: 0, second: 0, millisecond: 0 })
      ),
    [fromDt]
  );
  const toHourDts = fromHourDts.map((dt) => dt.setZone(toTz?.timezone ?? "UTC"));

  const offsetDiffMinutes = toDt.offset - fromDt.offset;

  const pair: TimezonePair = { from: fromId, to: toId };
  const favorite = isFavorite(pair);

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 pb-20 pt-10 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">TimeBridge</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Convert time between any time zones instantly.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-8">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end">
          <TimezoneSelect label="From Time Zone" value={fromId} onChange={setFrom} />
          <div className="flex justify-center sm:pb-1">
            <Button
              variant="outline"
              size="icon"
              className="size-10 shrink-0 rounded-full"
              aria-label="Swap timezones"
              onClick={swap}
            >
              <ArrowRightLeft className="size-4" />
            </Button>
          </div>
          <TimezoneSelect label="To Time Zone" value={toId} onChange={setTo} />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-14 w-full rounded-xl border border-border bg-background px-4 text-base outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-14 w-full rounded-xl border border-border bg-background px-4 text-base outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={() => toggleFavorite(pair)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <Star className={cn("size-3.5", favorite && "fill-amber-400 text-amber-400")} />
          {favorite ? "Saved to favorites" : "Save this pair as favorite"}
        </button>

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-2xl font-semibold sm:text-3xl">{formatTime(fromDt, hour12)} {fromTz?.abbreviation}</p>
          <p className="text-lg text-muted-foreground">=</p>
          <p className="text-3xl font-bold text-blue-600 sm:text-4xl">{formatTime(toDt, hour12)} {toTz?.abbreviation}</p>
          <p className="text-sm text-muted-foreground">
            {fromDt.toFormat("ccc, LLL d")} → {toDt.toFormat("ccc, LLL d")}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <InfoTile label="Difference" value={formatDiff(offsetDiffMinutes)} />
          <InfoTile label={`${fromTz?.abbreviation} Offset`} value={formatUtcOffset(fromDt)} />
          <InfoTile label={`${toTz?.abbreviation} Offset`} value={formatUtcOffset(toDt)} />
          <InfoTile label={`${fromTz?.abbreviation} DST`} value={isDST(fromTz?.timezone ?? "UTC") ? "Active" : "Standard"} />
          <InfoTile label={`${toTz?.abbreviation} DST`} value={isDST(toTz?.timezone ?? "UTC") ? "Active" : "Standard"} />
          <InfoTile
            label="Day / Night"
            value={
              <span className="flex items-center justify-center gap-1.5">
                {isDayTime(fromDt) ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                /
                {isDayTime(toDt) ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              </span>
            }
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" className="rounded-full">
            {fromTz?.abbreviation} {isWorkingHour(fromDt) ? "within working hours" : "outside working hours"}
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            {toTz?.abbreviation} {isWorkingHour(toDt) ? "within working hours" : "outside working hours"}
          </Badge>
        </div>

        <div className="mt-8">
          <DualTimeline
            fromLabel={fromTz?.abbreviation ?? ""}
            toLabel={toTz?.abbreviation ?? ""}
            fromHourDts={fromHourDts}
            toHourDts={toHourDts}
            selectedHour={fromDt.hour}
            hour12={hour12}
          />
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-center text-sm font-semibold text-muted-foreground">Quick Presets</p>
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_PRESETS.map((preset) => (
            <Button
              key={`${preset.from}-${preset.to}`}
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setPair(preset)}
            >
              {TIMEZONE_BY_ID[preset.from]?.abbreviation} ⇄ {TIMEZONE_BY_ID[preset.to]?.abbreviation}
            </Button>
          ))}
        </div>
      </div>

      {favoritePairs.length > 0 && (
        <PairList title="Favorites" pairs={favoritePairs} onSelect={setPair} />
      )}

      {recentPairs.length > 0 && (
        <PairList title="Recent Conversions" pairs={recentPairs} onSelect={setPair} />
      )}
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-muted px-3 py-3 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function PairList({
  title,
  pairs,
  onSelect,
}: {
  title: string;
  pairs: TimezonePair[];
  onSelect: (pair: TimezonePair) => void;
}) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-center text-sm font-semibold text-muted-foreground">{title}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {pairs.map((p, i) => (
          <Button
            key={`${title}-${p.from}-${p.to}-${i}`}
            variant="ghost"
            size="sm"
            className="rounded-full bg-muted"
            onClick={() => onSelect(p)}
          >
            {TIMEZONE_BY_ID[p.from]?.abbreviation} → {TIMEZONE_BY_ID[p.to]?.abbreviation}
          </Button>
        ))}
      </div>
    </div>
  );
}
