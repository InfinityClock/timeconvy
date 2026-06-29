"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkingHours } from "@/lib/timezone";

export interface TimezonePair {
  from: string;
  to: string;
}

interface TimeBridgeState {
  fromId: string;
  toId: string;
  hour12: boolean;
  recentPairs: TimezonePair[];
  favoritePairs: TimezonePair[];
  setFrom: (id: string) => void;
  setTo: (id: string) => void;
  setPair: (pair: TimezonePair) => void;
  swap: () => void;
  toggleHourFormat: () => void;
  addRecent: (pair: TimezonePair) => void;
  toggleFavorite: (pair: TimezonePair) => void;
  isFavorite: (pair: TimezonePair) => boolean;

  // Meeting planner state
  plannerZoneIds: string[];
  plannerWorkingHours: WorkingHours;
  addPlannerZone: (id: string) => void;
  removePlannerZone: (id: string) => void;
  setPlannerWorkingHours: (wh: WorkingHours) => void;
}

function samePair(a: TimezonePair, b: TimezonePair) {
  return a.from === b.from && a.to === b.to;
}

export const useTimeBridgeStore = create<TimeBridgeState>()(
  persist(
    (set, get) => ({
      fromId: "cst",
      toId: "ist",
      hour12: true,
      recentPairs: [],
      favoritePairs: [],
      setFrom: (id) => set({ fromId: id }),
      setTo: (id) => set({ toId: id }),
      setPair: (pair) => set({ fromId: pair.from, toId: pair.to }),
      swap: () => set({ fromId: get().toId, toId: get().fromId }),
      toggleHourFormat: () => set({ hour12: !get().hour12 }),
      addRecent: (pair) => {
        const filtered = get().recentPairs.filter((p) => !samePair(p, pair));
        set({ recentPairs: [pair, ...filtered].slice(0, 6) });
      },
      toggleFavorite: (pair) => {
        const favs = get().favoritePairs;
        const exists = favs.some((p) => samePair(p, pair));
        set({
          favoritePairs: exists
            ? favs.filter((p) => !samePair(p, pair))
            : [...favs, pair],
        });
      },
      isFavorite: (pair) => get().favoritePairs.some((p) => samePair(p, pair)),

      plannerZoneIds: ["ist", "est", "gmt", "sgt"],
      plannerWorkingHours: { start: 9, end: 17 },
      addPlannerZone: (id) => {
        const current = get().plannerZoneIds;
        if (current.includes(id)) return;
        set({ plannerZoneIds: [...current, id] });
      },
      removePlannerZone: (id) =>
        set({ plannerZoneIds: get().plannerZoneIds.filter((z) => z !== id) }),
      setPlannerWorkingHours: (wh) => set({ plannerWorkingHours: wh }),
    }),
    { name: "timebridge-store" }
  )
);
