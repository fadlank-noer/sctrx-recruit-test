"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { OrderList } from "@/components/dashboard/order-list";
import { OrderDetailPanel } from "@/components/dashboard/order-detail-panel";
import type { OrderRow } from "@/components/dashboard/order-table";

type AuditLog = {
  id: string;
  action: string;
  fromValue: string | null;
  toValue: string;
  createdAt: Date;
};

type OrderDetail = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  amount: number;
  status: string;
  createdAt: Date;
  auditLogs: AuditLog[];
};

type OrdersData = {
  orders: OrderRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function DashboardContent({
  ordersData,
  selectedOrder,
  selectedOrderId,
}: {
  ordersData: OrdersData;
  selectedOrder: OrderDetail | null;
  selectedOrderId?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleOrderClick(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === selectedOrderId) {
      params.delete("selectedId");
    } else {
      params.set("selectedId", id);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[7fr_3fr]">
      <OrderList
        data={ordersData}
        selectedOrderId={selectedOrderId}
        onOrderClick={handleOrderClick}
      />
      <OrderDetailPanel order={selectedOrder} />
    </div>
  );
}
