import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const difficulty = searchParams.get("difficulty");
  const category = searchParams.get("category");
  const grade = searchParams.get("grade");
  const chapter = searchParams.get("chapter");

  const problems = await prisma.problem.findMany({
    where: {
      isPublished: true,
      ...(difficulty ? { difficulty } : {}),
      ...(category ? { category } : {}),
      ...(grade ? { grade: parseInt(grade) } : {}),
      ...(chapter ? { chapter } : {}),
    },
    include: { _count: { select: { testCases: true, submissions: true } } },
    orderBy: [{ number: "asc" }],
  });

  return NextResponse.json(problems);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const maxRow = await prisma.problem.findFirst({ orderBy: { number: "desc" }, select: { number: true } });
  const nextNumber = (maxRow?.number ?? 0) + 1;

  const problem = await prisma.problem.create({
    data: {
      number: nextNumber,
      title: data.title,
      slug: data.slug,
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

  if (data.testCases?.length) {
    await prisma.testCase.createMany({
      data: data.testCases.map((tc: { input: string; output: string; points: number; isPublic: boolean }) => ({
        problemId: problem.id,
        input: tc.input,
        output: tc.output,
        points: tc.points ?? 10,
        isPublic: tc.isPublic ?? false,
      })),
    });
  }

  return NextResponse.json(problem);
}
