import { getOrders, getOrderStats, getOrderWithAuditLogs } from "@/features/orders/queries";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { StatusTabs } from "@/components/dashboard/status-tabs";
import { OrderList } from "@/components/dashboard/order-list";
import { OrderDetailPanel } from "@/components/dashboard/order-detail-panel";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const status = (params.status as string) || "ALL";
  const search = (params.search as string) || "";
  const page = Number(params.page) || 1;
  const selectedId = params.selectedId as string | undefined;

  const [ordersData, stats, selectedOrder] = await Promise.all([
    getOrders({ status, search, page, pageSize: 10 }),
    getOrderStats(),
    selectedId ? getOrderWithAuditLogs(selectedId) : null,
  ]);

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <StatusTabs activeStatus={status} />
      <DashboardContent
        ordersData={ordersData}
        selectedOrder={selectedOrder}
        selectedOrderId={selectedId}
      />
    </div>
  );
}
