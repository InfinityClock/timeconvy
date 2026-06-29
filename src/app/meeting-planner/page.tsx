import type { Metadata } from "next";
import { MeetingPlanner } from "@/components/planner/meeting-planner";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Meeting Planner",
  description:
    "Find the best meeting time across multiple time zones. See overlapping working hours instantly, with DST and weekend awareness.",
  alternates: { canonical: "/meeting-planner" },
};

export default function MeetingPlannerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex justify-end px-4 pt-4 sm:px-6">
        <ThemeToggle />
      </div>
      <main className="flex-1">
        <MeetingPlanner />
      </main>
    </div>
  );
}
