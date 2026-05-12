import { db } from "@/lib/db";
import type { OrderStatus } from "./types";

export async function getOrders(options: {
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { status, search, page = 1, pageSize = 10 } = options;

  const where = {
    ...(status && status !== "ALL" ? { status } : {}),
    ...(search
      ? {
          OR: [
            { customer: { contains: search } },
            { orderNumber: { contains: search } },
            { orderName: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {}),
  };

  const [orders, total] = await Promise.all([
    db.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.order.count({ where }),
  ]);

  return { orders, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function getOrderStats() {
  const [total, pending, paid, cancelled, revenueResult] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { status: "PENDING" } }),
    db.order.count({ where: { status: "PAID" } }),
    db.order.count({ where: { status: "CANCELLED" } }),
    db.order.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
  ]);

  return {
    total,
    pending,
    paid,
    cancelled,
    revenue: revenueResult._sum.amount ?? 0,
  };
}

export async function getOrderWithAuditLogs(id: string) {
  return db.order.findUnique({
    where: { id },
    include: { auditLogs: { orderBy: { createdAt: "desc" } } },
  });
}
