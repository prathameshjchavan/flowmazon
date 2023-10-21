import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { success: false },
      {
        status: 401,
      },
    );
  }

  await prisma.product.deleteMany({
    where: {
      createdAt: { lt: new Date(new Date().setDate(new Date().getDate() - 7)) },
    },
  });

  return NextResponse.json({ success: true });
}
