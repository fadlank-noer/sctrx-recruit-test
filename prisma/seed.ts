import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CUSTOMERS = [
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Smith", email: "bob@example.com" },
  { name: "Carol Williams", email: "carol@example.com" },
  { name: "David Brown", email: "david@example.com" },
  { name: "Eva Martinez", email: "eva@example.com" },
  { name: "Frank Davis", email: "frank@example.com" },
  { name: "Grace Wilson", email: "grace@example.com" },
  { name: "Henry Taylor", email: "henry@example.com" },
  { name: "Iris Anderson", email: "iris@example.com" },
  { name: "Jack Thomas", email: "jack@example.com" },
  { name: "Karen Jackson", email: "karen@example.com" },
  { name: "Leo White", email: "leo@example.com" },
  { name: "Mia Harris", email: "mia@example.com" },
  { name: "Noah Clark", email: "noah@example.com" },
  { name: "Olivia Lewis", email: "olivia@example.com" },
];

const STATUSES = ["PENDING", "PENDING", "PENDING", "PAID", "PAID", "CANCELLED"] as const;

function randomAmount(): number {
  return Math.round((Math.random() * 485 + 15) * 100) / 100;
}

function randomDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  date.setHours(Math.floor(Math.random() * 12) + 8, Math.floor(Math.random() * 60));
  return date;
}

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.order.deleteMany();

  const orders = [];
  for (let i = 1; i <= 30; i++) {
    const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const createdAt = randomDate(60);

    orders.push({
      orderNumber: `ORD-${String(i).padStart(3, "0")}`,
      customer: customer.name,
      email: customer.email,
      amount: randomAmount(),
      status,
      createdAt,
      updatedAt: new Date(createdAt.getTime() + Math.random() * 86400000),
    });
  }

  for (const order of orders) {
    const created = await prisma.order.create({ data: order });

    await prisma.auditLog.create({
      data: {
        orderId: created.id,
        action: "CREATED",
        fromValue: null,
        toValue: created.status,
        createdAt: created.createdAt,
      },
    });

    if (created.status !== "PENDING") {
      const updatedAt = new Date(
        created.createdAt.getTime() + Math.random() * 172800000
      );
      await prisma.auditLog.create({
        data: {
          orderId: created.id,
          action: "STATUS_CHANGE",
          fromValue: "PENDING",
          toValue: created.status,
          createdAt: updatedAt,
        },
      });
    }
  }

  console.log(`Seeded ${orders.length} orders with audit logs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
