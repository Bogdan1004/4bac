import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const cls = await prisma.class.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, name: true, username: true } },
        members: {
          include: {
            user: {
              select: { id: true, name: true, username: true, xp: true, level: true, streak: true },
            },
          },
          orderBy: { joinedAt: "asc" },
        },
      },
    });

    if (!cls) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(cls);
  } catch (e) {
    console.error("[GET /api/classes/[id]]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { id } = await params;

  try {
    const cls = await prisma.class.findUnique({ where: { id }, select: { createdById: true } });
    if (!cls) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (cls.createdById !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.classMember.deleteMany({ where: { classId: id } });
    await prisma.class.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[DELETE /api/classes/[id]]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
