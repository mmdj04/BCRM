import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma-client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        plan: true,
        compute: true,
        pitr: true,
        planInterval: true,
        subscriptionStatus: true,
        setupCompleted: true,
        currentPeriodEnd: true,
        cancelAtPeriodEnd: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, ...data } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { id: userId },
      create: {
        id: userId,
        email: data.email || "",
        ...data,
      },
      update: data,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
