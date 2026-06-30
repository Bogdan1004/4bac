import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;

  const [solvedSubmissions, allBadges, userBadges] = await Promise.all([
    prisma.submission.findMany({
      where: { userId, status: "accepted" },
      distinct: ["problemId"],
      include: {
        problem: {
          select: { id: true, title: true, slug: true, difficulty: true, grade: true, chapter: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.badge.findMany({ orderBy: { name: "asc" } }),
    prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true, earnedAt: true } }),
  ]);

  const earnedIds = new Set(userBadges.map((ub) => ub.badgeId));

  return NextResponse.json({
    solvedProblems: solvedSubmissions.map((s) => s.problem),
    allBadges: allBadges.map((b) => ({
      ...b,
      earned: earnedIds.has(b.id),
      earnedAt: userBadges.find((ub) => ub.badgeId === b.id)?.earnedAt ?? null,
    })),
  });
}
