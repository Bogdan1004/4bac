import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  const session = await getServerSession(authOptions);

  const { identifier } = await params;
  const viewerId = (session?.user as { id?: string })?.id ?? null;

  const user = await prisma.user.findFirst({
    where: { OR: [{ username: identifier }, { id: identifier }] },
    select: {
      id: true,
      name: true,
      username: true,
      xp: true,
      level: true,
      streak: true,
      createdAt: true,
      badges: { include: { badge: true } },
      submissions: {
        where: { status: "accepted" },
        distinct: ["problemId"],
        include: { problem: { select: { id: true, title: true, slug: true, difficulty: true, grade: true, chapter: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { followers: true, following: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isFollowing = viewerId && viewerId !== user.id
    ? !!(await prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: viewerId, followingId: user.id } },
      }))
    : false;

  return NextResponse.json({
    id: user.id,
    name: user.name,
    username: user.username,
    xp: user.xp,
    level: user.level,
    streak: user.streak,
    joinedAt: user.createdAt,
    badges: user.badges.map((ub) => ub.badge),
    solvedProblems: user.submissions.map((s) => s.problem),
    followersCount: user._count.followers,
    followingCount: user._count.following,
    isFollowing,
    isSelf: viewerId === user.id,
  });
}
