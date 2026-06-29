"use client";

import { Clock } from "lucide-react";

interface TimeFieldProps {
  value: string; // HH:mm (24h)
  onChange: (value: string) => void;
  label: string;
  hour12: boolean;
}

const HOURS_24 = Array.from({ length: 24 }, (_, i) => i);
const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export function TimeField({ value, onChange, label, hour12 }: TimeFieldProps) {
  const [hStr, mStr] = value.split(":");
  const h24 = Number(hStr);
  const minute = Number(mStr);
  const isPM = h24 >= 12;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

  function commit(nextH24: number, nextMinute: number) {
    onChange(`${String(nextH24).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`);
  }

  return (
    <div className="flex-1">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <div className="flex h-14 items-center gap-1 rounded-xl border border-border bg-background px-3 focus-within:border-blue-500">
        <Clock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        {hour12 ? (
          <select
            aria-label={`${label} hour`}
            value={h12}
            onChange={(e) => {
              const newH12 = Number(e.target.value);
              const newH24 = isPM ? (newH12 % 12) + 12 : newH12 % 12;
              commit(newH24, minute);
            }}
            className="h-full flex-1 bg-transparent text-base outline-none"
          >
            {HOURS_12.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        ) : (
          <select
            aria-label={`${label} hour`}
            value={h24}
            onChange={(e) => commit(Number(e.target.value), minute)}
            className="h-full flex-1 bg-transparent text-base outline-none"
          >
            {HOURS_24.map((h) => (
              <option key={h} value={h}>{String(h).padStart(2, "0")}</option>
            ))}
          </select>
        )}
        <span className="text-muted-foreground">:</span>
        <select
          aria-label={`${label} minute`}
          value={minute}
          onChange={(e) => commit(h24, Number(e.target.value))}
          className="h-full flex-1 bg-transparent text-base outline-none"
        >
          {MINUTES.map((m) => (
            <option key={m} value={m}>{String(m).padStart(2, "0")}</option>
          ))}
        </select>
        {hour12 && (
          <select
            aria-label={`${label} AM or PM`}
            value={isPM ? "PM" : "AM"}
            onChange={(e) => {
              const nextIsPM = e.target.value === "PM";
              const newH24 = nextIsPM ? (h12 % 12) + 12 : h12 % 12;
              commit(newH24, minute);
            }}
            className="h-full shrink-0 bg-transparent text-base outline-none"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        )}
      </div>
    </div>
  );
}
