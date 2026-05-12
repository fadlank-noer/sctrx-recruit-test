"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STATUS_LABELS, STATUS_VARIANTS, type OrderStatus } from "@/features/orders/types";
import { useTransition } from "react";
import { updateOrderStatus } from "@/features/orders/actions";
import { toast } from "sonner";
import { Ban, Check } from "lucide-react";

export type OrderRow = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  amount: number;
  status: string;
  createdAt: Date;
};

const columns: ColumnDef<OrderRow>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `$${(row.getValue("amount") as number).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatus;
      return (
        <Badge variant={STATUS_VARIANTS[status]}>
          {STATUS_LABELS[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  },
];

export function OrderTable({
  orders,
  onOrderClick,
  selectedOrderId,
}: {
  orders: OrderRow[];
  onOrderClick: (id: string) => void;
  selectedOrderId?: string;
}) {
  const [, startTransition] = useTransition();

  const table = useReactTable({
    data: orders,
    columns: [
      ...columns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const order = row.original;
          if (order.status !== "PENDING") return null;
          return <ActionButtons orderId={order.id} />;
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-xl border border-border bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={`cursor-pointer ${row.original.id === selectedOrderId ? "bg-accent" : ""}`}
              onClick={() => onOrderClick(row.original.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} onClick={(e) => {
                  if (cell.column.id === "actions") e.stopPropagation();
                }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ActionButtons({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(newStatus: string) {
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
        }
      } catch {
        toast.error("Failed to update order status.");
      }
    });
  }

  return (
    <div className="flex gap-1">
      <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" disabled={isPending} onClick={() => handleStatusChange("PAID")}>
        <Check className="h-3 w-3" />
        Pay
      </Button>
      <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-destructive hover:text-destructive" disabled={isPending} onClick={() => handleStatusChange("CANCELLED")}>
        <Ban className="h-3 w-3" />
        Cancel
      </Button>
    </div>
  );
}
