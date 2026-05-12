"use server";

import { db } from "@/lib/db";
import { updateOrderStatusSchema } from "./validations";
import { ORDER_STATUSES } from "./types";
import { revalidatePath } from "next/cache";

export type ActionResponse = { success: true } | { success: false; error: string };

export async function updateOrderStatus(
  _prev: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const orderId = formData.get("orderId") as string;
  const newStatus = formData.get("newStatus") as string;

  const parsed = updateOrderStatusSchema.safeParse({ orderId, newStatus });
  if (!parsed.success) {
    return { success: false, error: "Invalid input." };
  }

  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return { success: false, error: "Order not found." };
  }

  if (order.status !== ORDER_STATUSES.PENDING) {
    return {
      success: false,
      error: `Cannot change status: order is already ${order.status.toLowerCase()}.`,
    };
  }

  await db.$transaction([
    db.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    }),
    db.auditLog.create({
      data: {
        orderId,
        action: "STATUS_CHANGE",
        fromValue: order.status,
        toValue: newStatus,
      },
    }),
  ]);

  revalidatePath("/");
  return { success: true };
}
