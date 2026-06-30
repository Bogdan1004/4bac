import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { runCode } from "@/lib/judge";
import { xpForProblem, levelFromXp } from "@/lib/xp";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { problemId, code } = await req.json();

  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
    include: { testCases: true },
  });
  if (!problem) return NextResponse.json({ error: "Problem not found" }, { status: 404 });

  const userId = (session.user as { id: string }).id;

  // Create pending submission
  const submission = await prisma.submission.create({
    data: {
      userId,
      problemId,
      code,
      status: "pending",
      totalTests: problem.testCases.length,
      maxScore: problem.testCases.reduce((s, tc) => s + tc.points, 0),
    },
  });

  // Run all test cases
  let passed = 0;
  let totalScore = 0;
  let maxExecTime = 0;
  let finalStatus = "accepted";
  const results: { passed: boolean; input: string; output: string; expected: string; error: string | null }[] = [];

  for (const tc of problem.testCases) {
    try {
      const result = await runCode(code, tc.input, tc.output);
      results.push({ passed: result.passed, input: tc.input, output: result.output, expected: tc.output.trim(), error: result.error });
      if (result.passed) {
        passed++;
        totalScore += tc.points;
      } else if (finalStatus === "accepted") {
        finalStatus = result.error ? "compile_error" : "wrong_answer";
      }
      maxExecTime = Math.max(maxExecTime, result.time);
    } catch {
      finalStatus = "runtime_error";
      results.push({ passed: false, input: tc.input, output: "", expected: tc.output.trim(), error: "Runtime error" });
    }
  }

  if (passed === problem.testCases.length) finalStatus = "accepted";
  const percentScore = Math.round((totalScore / submission.maxScore) * 100);

  await prisma.submission.update({
    where: { id: submission.id },
    data: {
      status: finalStatus,
      score: percentScore,
      passedTests: passed,
      execTime: maxExecTime,
    },
  });

  // Award XP — only the delta over the user's previous best score for this problem
  const previousBest = await prisma.submission.findFirst({
    where: { userId, problemId, id: { not: submission.id } },
    orderBy: { score: "desc" },
    select: { score: true, maxScore: true },
  });
  const prevRaw = previousBest
    ? Math.round((previousBest.score / 100) * (previousBest.maxScore || submission.maxScore))
    : 0;
  const prevXp = xpForProblem(problem.difficulty, prevRaw, submission.maxScore);
  const newXp = xpForProblem(problem.difficulty, totalScore, submission.maxScore);
  const earnedXp = Math.max(0, newXp - prevXp);

  if (earnedXp > 0) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: earnedXp }, lastActiveAt: new Date() },
    });
    const newLevel = levelFromXp(user.xp);
    if (newLevel !== user.level) {
      await prisma.user.update({ where: { id: userId }, data: { level: newLevel } });
    }
  }

  // Update streak
  await updateStreak(userId);

  // Award badges
  await checkAndAwardBadges(userId, percentScore, problem.difficulty);

  return NextResponse.json({
    id: submission.id,
    status: finalStatus,
    score: percentScore,
    passedTests: passed,
    totalTests: problem.testCases.length,
    execTime: maxExecTime,
    earnedXp,
    results,
  });
}

async function checkAndAwardBadges(userId: string, score: number, difficulty: string) {
  const [unearnedBadges, solvedProblems, user] = await Promise.all([
    prisma.badge.findMany({ where: { users: { none: { userId } } } }),
    prisma.submission.findMany({
      where: { userId, status: "accepted" },
      distinct: ["problemId"],
      include: { problem: { select: { category: true } } },
    }),
    prisma.user.findUnique({ where: { id: userId }, select: { streak: true } }),
  ]);

  if (unearnedBadges.length === 0) return;

  const totalSolved = solvedProblems.length;
  const streak = user?.streak ?? 0;
  const catCount: Record<string, number> = {};
  for (const s of solvedProblems) {
    const cat = s.problem.category;
    catCount[cat] = (catCount[cat] ?? 0) + 1;
  }

  const toAward: string[] = [];
  for (const badge of unearnedBadges) {
    try {
      const cond = JSON.parse(badge.condition) as Record<string, unknown>;
      let earned = false;

      if ("solved" in cond) {
        earned = totalSolved >= (cond.solved as number);
      } else if ("streak" in cond) {
        earned = streak >= (cond.streak as number);
      } else if ("category" in cond) {
        earned = (catCount[cond.category as string] ?? 0) >= ((cond.count as number) ?? 1);
      } else if (cond.perfect && "difficulty" in cond) {
        earned = score === 100 && difficulty === (cond.difficulty as string);
      }

      if (earned) toAward.push(badge.id);
    } catch {
      // ignore malformed condition
    }
  }

  if (toAward.length > 0) {
    await prisma.userBadge.createMany({
      data: toAward.map((badgeId) => ({ userId, badgeId })),
    });
  }
}

async function updateStreak(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const now = new Date();
  const lastActive = user.lastActiveAt;

  if (!lastActive) {
    await prisma.user.update({ where: { id: userId }, data: { streak: 1, lastActiveAt: now } });
    return;
  }

  const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / 86400000);
  if (daysDiff === 1) {
    await prisma.user.update({ where: { id: userId }, data: { streak: { increment: 1 }, lastActiveAt: now } });
  } else if (daysDiff > 1) {
    await prisma.user.update({ where: { id: userId }, data: { streak: 1, lastActiveAt: now } });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const problemId = searchParams.get("problemId");
  const userId = (session.user as { id: string }).id;

  const submissions = await prisma.submission.findMany({
    where: { userId, ...(problemId ? { problemId } : {}) },
    include: { problem: { select: { title: true, slug: true, difficulty: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(submissions);
}
