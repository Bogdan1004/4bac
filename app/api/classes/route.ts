import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  try {
    const classes = await prisma.class.findMany({
      where: q ? { name: { contains: q } } : undefined,
      include: {
        createdBy: { select: { name: true, username: true } },
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    return NextResponse.json(classes);
  } catch (e) {
    console.error("[GET /api/classes]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;

  let name: string, description: string;
  try {
    const body = await req.json();
    name = body.name;
    description = body.description ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!name?.trim()) return NextResponse.json({ error: "Numele clasei este obligatoriu." }, { status: 400 });

  try {
    const existing = await prisma.class.findUnique({ where: { name: name.trim() } });
    if (existing) return NextResponse.json({ error: "Exista deja o clasa cu acest nume." }, { status: 409 });

    const cls = await prisma.class.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        createdById: userId,
      },
    });

    await prisma.classMember.create({ data: { classId: cls.id, userId } });

    return NextResponse.json(cls);
  } catch (e) {
    console.error("[POST /api/classes]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
