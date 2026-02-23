import Link from "next/link";
import { BotStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { formatCurrency } from "@/lib/utils";

interface HeaderProps {
  botStatus?: BotStatus;
}

export function Header({ botStatus }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="text-base font-semibold text-foreground">AI Trading Bot</span>
        {botStatus && (
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-600 dark:text-emerald-300">
              {botStatus.botEnabled ? "Running" : "Stopped"}
            </span>
            <span>Today: {formatCurrency(botStatus.todayPnl)}</span>
            <span>Open: {botStatus.openPositions.length}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Link href="/settings" className="flex items-center gap-1">
            Settings
          </Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
