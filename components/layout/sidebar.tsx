"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useThemeStore } from "@/stores/theme-store";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
];

export function Sidebar() {
  const pathname = usePathname();
  const theme = useThemeStore((s) => s.theme);

  return (
    <aside
      className="hidden lg:flex w-60 flex-col border-r border-border bg-sidebar"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="flex h-14 items-center gap-2 px-4 border-b border-border">
        <Image
          src={theme === "dark" ? "/dark-mode-remove-bg.png" : "/light-mode-remove-bg.png"}
          alt="OrderFlow"
          width={120}
          height={32}
          className="mx-auto object-contain"
        />
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all",
                    !isActive && "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    isActive && [
                      "bg-red-50 dark:bg-red-950/30",
                      "text-red-700 dark:text-red-400 font-semibold",
                      "rounded-l-lg rounded-r-none",
                      "border-r-2 border-red-600 dark:border-red-500",
                    ]
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
