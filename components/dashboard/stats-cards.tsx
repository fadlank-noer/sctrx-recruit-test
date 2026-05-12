import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Clock, DollarSign, CheckCircle } from "lucide-react";

type Stats = {
  total: number;
  pending: number;
  paid: number;
  cancelled: number;
  revenue: number;
};

export function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    {
      title: "Total Orders",
      value: stats.total,
      icon: ShoppingCart,
      format: (v: number) => v.toString(),
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      format: (v: number) => v.toString(),
    },
    {
      title: "Revenue",
      value: stats.revenue,
      icon: DollarSign,
      format: (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    },
    {
      title: "Completed",
      value: stats.paid,
      icon: CheckCircle,
      format: (v: number) => v.toString(),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{card.format(card.value)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
