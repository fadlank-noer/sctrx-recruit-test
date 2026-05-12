"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { OrderTable } from "./order-table";
import type { OrderRow } from "./order-table";

type OrdersData = {
  orders: OrderRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function OrderList({
  data,
  selectedOrderId,
  onOrderClick,
}: {
  data: OrdersData;
  selectedOrderId?: string;
  onOrderClick: (id: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {data.orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-background py-16 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 font-medium text-muted-foreground">No orders found</p>
          <p className="text-sm text-muted-foreground/70">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <>
          <OrderTable
            orders={data.orders}
            onOrderClick={onOrderClick}
            selectedOrderId={selectedOrderId}
          />
          {data.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {(data.page - 1) * data.pageSize + 1}–{Math.min(data.page * data.pageSize, data.total)} of {data.total}
              </p>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.page <= 1}
                  onClick={() => goToPage(data.page - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.page >= data.totalPages}
                  onClick={() => goToPage(data.page + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
