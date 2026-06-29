"use client";

import { useState } from "react";
import { DateTime } from "luxon";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateFieldProps {
  value: string; // yyyy-MM-dd
  onChange: (value: string) => void;
  label: string;
}

export function DateField({ value, onChange, label }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const selected = DateTime.fromFormat(value, "yyyy-MM-dd");
  const [cursor, setCursor] = useState(() => selected.startOf("month"));

  const startOfMonth = cursor.startOf("month");
  const startWeekday = startOfMonth.weekday % 7; // 0 = Sunday
  const daysInMonth = cursor.daysInMonth ?? 30;
  const today = DateTime.now().toFormat("yyyy-MM-dd");

  const cells: (DateTime | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => startOfMonth.plus({ days: i })),
  ];

  return (
    <div className="flex-1">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) setCursor(selected.startOf("month")); }}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="h-14 w-full justify-between rounded-xl px-4 text-left font-normal"
            />
          }
        >
          <span className="text-base">{selected.toFormat("ccc, LLL d, yyyy")}</span>
          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent className="w-[300px] rounded-xl p-3" align="start">
          <div className="mb-2 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-full"
              aria-label="Previous month"
              onClick={() => setCursor(cursor.minus({ months: 1 }))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <p className="text-sm font-semibold">{cursor.toFormat("LLLL yyyy")}</p>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-full"
              aria-label="Next month"
              onClick={() => setCursor(cursor.plus({ months: 1 }))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const iso = day.toFormat("yyyy-MM-dd");
              const isSelected = iso === value;
              const isToday = iso === today;
              return (
                <button
                  key={i}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors hover:bg-muted",
                    isSelected && "bg-blue-600 text-white hover:bg-blue-600",
                    !isSelected && isToday && "font-semibold text-blue-600"
                  )}
                >
                  {day.day}
                </button>
              );
            })}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full rounded-lg"
            onClick={() => {
              onChange(today);
              setOpen(false);
            }}
          >
            Today
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
