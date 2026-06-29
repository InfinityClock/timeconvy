"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TIMEZONE_OPTIONS, TIMEZONE_BY_ID } from "@/constants/timezones";

interface TimezoneSelectProps {
  value: string;
  onChange: (id: string) => void;
  label: string;
}

export function TimezoneSelect({ value, onChange, label }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = TIMEZONE_BY_ID[value];
  const abbreviations = TIMEZONE_OPTIONS.filter((tz) => tz.group === "abbreviation");
  const cities = TIMEZONE_OPTIONS.filter((tz) => tz.group === "city");

  return (
    <div className="flex-1">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="h-14 w-full justify-between rounded-xl px-4 text-left font-normal"
            />
          }
        >
          <span className="truncate text-base">
            {selected ? selected.label : "Select a timezone"}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0 rounded-xl" align="start">
          <Command>
            <CommandInput placeholder="Search city, country, or abbreviation…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Time Zone Abbreviations">
                {abbreviations.map((tz) => (
                  <CommandItem
                    key={tz.id}
                    value={`${tz.label} ${tz.abbreviation} ${tz.keywords}`}
                    onSelect={() => {
                      onChange(tz.id);
                      setOpen(false);
                    }}
                  >
                    <span className="font-medium">{tz.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Cities">
                {cities.map((tz) => (
                  <CommandItem
                    key={tz.id}
                    value={`${tz.label} ${tz.abbreviation} ${tz.keywords}`}
                    onSelect={() => {
                      onChange(tz.id);
                      setOpen(false);
                    }}
                  >
                    <span className="font-medium">{tz.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{tz.abbreviation}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
