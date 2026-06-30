import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { progressToNextLevel } from "@/lib/xp";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      badges: { include: { badge: true } },
      submissions: {
        where: { status: "accepted" },
        distinct: ["problemId"],
        select: { problemId: true },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const levelProgress = progressToNextLevel(user.xp);

  return NextResponse.json({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    xp: user.xp,
    level: user.level,
    streak: user.streak,
    role: user.role,
    levelProgress,
    solvedCount: user.submissions.length,
    badges: user.badges.map((ub) => ub.badge),
  });
}
