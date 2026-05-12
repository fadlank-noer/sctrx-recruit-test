"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";

type TabStatus = "ALL" | "PENDING" | "PAID" | "CANCELLED";

type StatusTab = {
  value: TabStatus;
  label: string;
  count: number;
};

type StatusCounts = {
  total: number;
  pending: number;
  paid: number;
  cancelled: number;
};

function buildTabs(counts: StatusCounts): StatusTab[] {
  return [
    { value: "ALL", label: "All", count: counts.total },
    { value: "PENDING", label: "Pending", count: counts.pending },
    { value: "PAID", label: "Paid", count: counts.paid },
    { value: "CANCELLED", label: "Cancelled", count: counts.cancelled },
  ];
}

export function OrderToolbar({
  activeStatus,
  counts,
}: {
  activeStatus: string;
  counts: StatusCounts;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const [, startTransition] = useTransition();
  const tabs = buildTabs(counts);

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearch(value: string) {
    setSearchValue(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <div className="flex items-center justify-between" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Tabs value={activeStatus || "ALL"} onValueChange={handleTabChange}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              <Badge className="ml-2 bg-[#54595F] text-white dark:bg-white dark:text-[#54595F]">
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="relative flex-1 ml-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search Customer Name"
          className="pl-9 w-full"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
