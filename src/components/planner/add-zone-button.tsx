"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { TIMEZONE_OPTIONS } from "@/constants/timezones";

interface AddZoneButtonProps {
  excludeIds: string[];
  onAdd: (id: string) => void;
}

export function AddZoneButton({ excludeIds, onAdd }: AddZoneButtonProps) {
  const [open, setOpen] = useState(false);
  const available = TIMEZONE_OPTIONS.filter((tz) => !excludeIds.includes(tz.id));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="gap-1.5 rounded-full" />}
      >
        <Plus className="size-3.5" />
        Add time zone
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 rounded-xl" align="start">
        <Command>
          <CommandInput placeholder="Search city or abbreviation…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {available.map((tz) => (
                <CommandItem
                  key={tz.id}
                  value={`${tz.label} ${tz.abbreviation} ${tz.keywords}`}
                  onSelect={() => {
                    onAdd(tz.id);
                    setOpen(false);
                  }}
                >
                  <span className="font-medium">{tz.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
