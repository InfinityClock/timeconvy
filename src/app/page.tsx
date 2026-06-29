import { Suspense } from "react";
import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { SimpleConverter } from "@/components/simple-converter";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
        <Link
          href="/meeting-planner"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <CalendarClock className="size-3.5" />
          Meeting Planner
        </Link>
        <ThemeToggle />
      </div>
      <main className="flex-1">
        <Suspense fallback={null}>
          <SimpleConverter />
        </Suspense>
      </main>
    </div>
  );
}
