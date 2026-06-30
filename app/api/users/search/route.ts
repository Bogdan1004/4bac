import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {

  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) return NextResponse.json([]);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: q } },
        { name: { contains: q } },
      ],
    },
    select: { id: true, name: true, username: true, xp: true, level: true },
    take: 20,
    orderBy: { xp: "desc" },
  });

  return NextResponse.json(users);
}
