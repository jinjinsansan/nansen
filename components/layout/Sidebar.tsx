"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bot, Clock3, Settings, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/trades", label: "Trades", icon: Bot },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-border bg-card/40 p-4 text-sm md:flex">
      <div className="flex items-center gap-2 px-2 py-3 text-lg font-semibold">
        <Wallet className="h-5 w-5" />
        バイトレ
      </div>
      <nav className="mt-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          <span>Cron: /api/cron/monitor</span>
        </div>
        <p className="mt-2 leading-relaxed">
          Clawdbotと連携し、スマートマネーの動きを監視・実行します。
        </p>
      </div>
    </aside>
  );
}
