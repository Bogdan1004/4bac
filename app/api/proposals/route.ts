import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const role = (session.user as { role?: string }).role;

  try {
    const proposals = await prisma.problemProposal.findMany({
      where: role === "admin" ? undefined : { userId },
      include: { user: { select: { name: true, username: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(proposals);
  } catch (e) {
    console.error("[GET /api/proposals]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;

  let body: { title?: string; description?: string; difficulty?: string; grade?: number; chapter?: string; sourceUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { title, description, difficulty, grade, chapter, sourceUrl } = body;

  if (!title?.trim()) return NextResponse.json({ error: "Titlul este obligatoriu." }, { status: 400 });

  try {
    const proposal = await prisma.problemProposal.create({
      data: {
        userId,
        title: title.trim(),
        description: description ?? "",
        difficulty: difficulty ?? "easy",
        grade: grade ?? 9,
        chapter: chapter ?? "",
        sourceUrl: sourceUrl ?? "",
      },
    });
    return NextResponse.json(proposal);
  } catch (e) {
    console.error("[POST /api/proposals]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
