import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
  const session = await getServerSession(authOptions);
  const currentUserId = (session?.user as { id?: string })?.id;

  // Top 10
  const top10 = await prisma.user.findMany({
    orderBy: { xp: "desc" },
    take: 10,
    select: {
      id: true, name: true, username: true, xp: true, level: true, streak: true,
      _count: { select: { submissions: true } },
    },
  });

  // Check if current user is in top 10
  const currentInTop = top10.some((u: { id: string }) => u.id === currentUserId);

  let currentUserRank = null;
  if (currentUserId && !currentInTop) {
    // Count users with more XP to determine rank
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: {
        id: true, name: true, username: true, xp: true, level: true, streak: true,
        _count: { select: { submissions: true } },
      },
    });
    if (currentUser) {
      const usersAbove = await prisma.user.count({ where: { xp: { gt: currentUser.xp } } });
      currentUserRank = { ...currentUser, rank: usersAbove + 1 };
    }
  }

  return NextResponse.json({ top10, currentUserRank });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[GET /api/leaderboard]", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
