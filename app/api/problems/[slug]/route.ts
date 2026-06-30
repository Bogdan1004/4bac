import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: {
      testCases: {
        where: { isPublic: true },
        select: { id: true, input: true, output: true, points: true, isPublic: true },
      },
      _count: { select: { submissions: true } },
    },
  });

  if (!problem) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(problem);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const data = await req.json();
  const problem = await prisma.problem.update({
    where: { slug },
    data: {
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      category: data.category,
      grade: data.grade ?? 9,
      chapter: data.chapter ?? "",
      sourceUrl: data.sourceUrl ?? "",
      timeLimit: data.timeLimit ?? 1000,
      memoryLimit: data.memoryLimit ?? 256,
    },
  });
  return NextResponse.json(problem);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  await prisma.problem.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
