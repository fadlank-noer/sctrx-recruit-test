"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useThemeStore } from "@/stores/theme-store";

export function Sidebar() {
  const pathname = usePathname();
  const theme = useThemeStore((s) => s.theme);

  return (
    <aside className="hidden lg:flex w-60 flex-col border-r border-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 px-4 border-b border-border">
        <Image
          src={theme === "dark" ? "/dark-mode-remove-bg.png" : "/light-mode-remove-bg.png"}
          alt="OrderFlow"
          width={120}
          height={32}
          className="mx-auto object-contain"
        />
      </div>
      <nav className="flex-1 p-3 space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
