import { SimpleConverter } from "@/components/simple-converter";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex justify-end px-4 pt-4 sm:px-6">
        <ThemeToggle />
      </div>
      <main className="flex-1">
        <SimpleConverter />
      </main>
    </div>
  );
}
