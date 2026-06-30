import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;

  try {
    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: { id: true, name: true, username: true, xp: true, level: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(follows.map((f) => f.following));
  } catch (e) {
    console.error("[GET /api/users/following]", e);
    return NextResponse.json([], { status: 200 });
  }
}
