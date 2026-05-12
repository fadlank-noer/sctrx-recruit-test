import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  orderId: z.string().min(1),
  newStatus: z.enum(["PAID", "CANCELLED"]),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
