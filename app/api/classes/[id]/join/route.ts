import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const userId = (session.user as { id: string }).id;

  try {
    const cls = await prisma.class.findUnique({ where: { id } });
    if (!cls) return NextResponse.json({ error: "Clasa nu exista." }, { status: 404 });

    await prisma.classMember.upsert({
      where: { classId_userId: { classId: id, userId } },
      create: { classId: id, userId },
      update: {},
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[POST /api/classes/[id]/join]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const userId = (session.user as { id: string }).id;

  try {
    await prisma.classMember.deleteMany({ where: { classId: id, userId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[DELETE /api/classes/[id]/join]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
