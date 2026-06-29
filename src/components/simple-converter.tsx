"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateTime } from "luxon";
import { ArrowRightLeft, Check, Link2, Moon, Star, Sun } from "lucide-react";
import { TimezoneSelect } from "@/components/timezone-select";
import { DateField } from "@/components/date-field";
import { TimeField } from "@/components/time-field";
import { DualTimeline } from "@/components/dual-timeline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIMEZONE_BY_ID, TIMEZONE_OPTIONS, QUICK_PRESETS } from "@/constants/timezones";
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

function detectLocalTimezoneId(): string | null {
  try {
    const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = TIMEZONE_OPTIONS.find((tz) => tz.timezone === localZone);
    return match?.id ?? null;
  } catch {
    return null;
  }
}

export function SimpleConverter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    fromId,
    toId,
    hour12,
    setFrom,
    setTo,
    setPair,
    swap,
    recentPairs,
    favoritePairs,
    addRecent,
    toggleFavorite,
    isFavorite,
  } = useTimeBridgeStore();

  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState(nowTimeStr);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // First-ever visit: auto-detect the visitor's local timezone as the "From" zone.
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("timebridge-store");
    if (hasVisitedBefore) return;
    const detected = detectLocalTimezoneId();
    if (detected) setFrom(detected);
  }, [setFrom]);

  // Hydrate from a shared URL (?from=ist&to=est&date=...&time=...) on first render.
  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const d = searchParams.get("date");
    const t = searchParams.get("time");
    if (from && TIMEZONE_BY_ID[from]) setFrom(from);
    if (to && TIMEZONE_BY_ID[to]) setTo(to);
    if (d) setDate(d);
    if (t) setTime(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcut: "s" swaps the two time zones (ignored while typing in a field).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping = ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
      if (!isTyping && e.key.toLowerCase() === "s") {
        swap();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [swap]);

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
  const directionLabel =
    offsetDiffMinutes === 0
      ? `${toTz?.abbreviation} is the same time as ${fromTz?.abbreviation}`
      : `${toTz?.abbreviation} is ${formatDiff(Math.abs(offsetDiffMinutes)).replace("+", "")} ${
          offsetDiffMinutes > 0 ? "ahead of" : "behind"
        } ${fromTz?.abbreviation}`;

  const pair: TimezonePair = { from: fromId, to: toId };
  const favorite = isFavorite(pair);

  function shareUrl() {
    const params = new URLSearchParams({ from: fromId, to: toId, date, time });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }

  async function handleCopy() {
    const text = `${formatTime(fromDt, hour12)} ${fromTz?.abbreviation} = ${formatTime(toDt, hour12)} ${toTz?.abbreviation}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard access denied (permissions/insecure context) — silently no-op
    }
  }

  async function handleShare() {
    const url = shareUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: "TimeConvy", url });
        return;
      } catch {
        // user cancelled the native share sheet — fall through to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
      router.replace(`?${url.split("?")[1]}`, { scroll: false });
    } catch {
      // clipboard access denied (permissions/insecure context) — silently no-op
    }
  }

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 pb-20 pt-10 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">TimeConvy</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Convert time between any time zones instantly.
        </p>
      </div>

      <div className="surface-card mt-8 p-5 sm:p-8">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end">
          <TimezoneSelect label="From Time Zone" value={fromId} onChange={setFrom} />
          <div className="flex justify-center sm:pb-1">
            <Button
              variant="outline"
              size="icon"
              className="size-11 shrink-0 rounded-full"
              aria-label="Swap timezones (shortcut: S)"
              title="Swap timezones (S)"
              onClick={swap}
            >
              <ArrowRightLeft className="size-4" />
            </Button>
          </div>
          <TimezoneSelect label="To Time Zone" value={toId} onChange={setTo} />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <DateField label="Date" value={date} onChange={setDate} />
          <TimeField label="Time" value={time} onChange={setTime} hour12={hour12} />
        </div>

        <button
          onClick={() => toggleFavorite(pair)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Star className={cn("size-3.5", favorite && "fill-amber-400 text-amber-400")} />
          {favorite ? "Pinned to favorites" : "Pin this pair to favorites"}
        </button>

        <div
          aria-live="polite"
          className="mt-8 flex flex-col items-center gap-2 text-center"
        >
          <p className="tabular-time text-2xl font-semibold sm:text-3xl">
            {formatTime(fromDt, hour12)} {fromTz?.abbreviation}
          </p>
          <p className="text-lg text-muted-foreground">=</p>
          <p className="tabular-time text-4xl font-bold text-blue-600 sm:text-5xl">
            {formatTime(toDt, hour12)} {toTz?.abbreviation}
          </p>
          <p className="text-sm text-muted-foreground">
            {fromDt.toFormat("ccc, LLL d")} → {toDt.toFormat("ccc, LLL d")}
          </p>
          <p className="text-sm font-medium text-foreground">{directionLabel}</p>

          <div className="mt-3 flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={handleCopy}>
              {copied ? <Check className="size-3.5" /> : null}
              {copied ? "Copied" : "Copy result"}
            </Button>
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={handleShare}>
              {shared ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
              {shared ? "Link copied" : "Share link"}
            </Button>
          </div>
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
          <Badge
            variant="secondary"
            className={cn(
              "rounded-full",
              isWorkingHour(fromDt) && "bg-[var(--success)]/15 text-[var(--success)]"
            )}
          >
            {fromTz?.abbreviation} {isWorkingHour(fromDt) ? "within working hours" : "outside working hours"}
          </Badge>
          <Badge
            variant="secondary"
            className={cn(
              "rounded-full",
              isWorkingHour(toDt) && "bg-[var(--success)]/15 text-[var(--success)]"
            )}
          >
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
