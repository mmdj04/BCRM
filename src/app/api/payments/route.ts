import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma-client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const payments = invoices.map((inv: { id: string; createdAt: Date; invoiceNumber: string; total: number; status: string }) => ({
      id: inv.id,
      createdAt: inv.createdAt,
      description: `Fatura ${inv.invoiceNumber}`,
      amount: Math.round(inv.total * 100),
      status: inv.status === "paid" ? "succeeded" : inv.status === "overdue" ? "failed" : "pending",
    }));

    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
