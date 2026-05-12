"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Ban, Clock, ArrowRight, PackageOpen } from "lucide-react";
import { STATUS_LABELS, STATUS_VARIANTS, type OrderStatus } from "@/features/orders/types";
import { updateOrderStatus } from "@/features/orders/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export function OrderDetailPanel({
  order,
}: {
  order: OrderDetail | null;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleStatusChange(orderId: string, newStatus: string) {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("orderId", orderId);
      formData.set("newStatus", newStatus);
      try {
        const result = await updateOrderStatus(formData);
        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Order status updated.");
          router.refresh();
        }
      } catch {
        toast.error("Failed to update order status.");
      }
    });
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-background py-16 text-center">
        <PackageOpen className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 font-medium text-muted-foreground">Select an order</p>
        <p className="text-sm text-muted-foreground/70">Click an order from the list to view details.</p>
      </div>
    );
  }

  const status = order.status as OrderStatus;

  return (
    <ScrollArea className="h-[calc(100dvh-12rem)]">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{order.orderNumber}</CardTitle>
              <Badge variant={STATUS_VARIANTS[status]}>{STATUS_LABELS[status]}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-medium">{order.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{order.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">${order.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span>{new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </CardContent>
        </Card>

        {status === "PENDING" && (
          <div className="flex gap-2">
            <Button className="flex-1 gap-1" size="sm" disabled={isPending} onClick={() => handleStatusChange(order.id, "PAID")}>
              <Check className="h-3.5 w-3.5" />
              Mark as Paid
            </Button>
            <Button variant="destructive" className="flex-1 gap-1" size="sm" disabled={isPending} onClick={() => handleStatusChange(order.id, "CANCELLED")}>
              <Ban className="h-3.5 w-3.5" />
              Cancel Order
            </Button>
          </div>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.auditLogs.map((log, i) => (
                <div key={log.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full border border-border bg-background p-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                    </div>
                    {i < order.auditLogs.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <p className="text-sm">
                      {log.action === "CREATED" ? (
                        "Order created"
                      ) : (
                        <span className="flex items-center gap-1">
                          <span className="text-muted-foreground">{log.fromValue ? STATUS_LABELS[log.fromValue as OrderStatus] : "—"}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{STATUS_LABELS[log.toValue as OrderStatus]}</span>
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
