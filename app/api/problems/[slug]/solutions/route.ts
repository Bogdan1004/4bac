import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const userId = (session.user as { id: string }).id;

  const problem = await prisma.problem.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!problem) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Only unlock if this user has a 100-point submission
  const perfect = await prisma.submission.findFirst({
    where: { userId, problemId: problem.id, score: 100 },
  });
  if (!perfect) return NextResponse.json({ error: "Locked" }, { status: 403 });

  const solutions = await prisma.submission.findMany({
    where: {
      problemId: problem.id,
      score: 100,
      userId: { not: userId },
    },
    select: {
      id: true,
      code: true,
      createdAt: true,
      user: { select: { name: true, username: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(solutions);
}
