import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const followerId = (session.user as { id: string }).id;
  const { userId: followingId } = await params;

  if (followerId === followingId) {
    return NextResponse.json({ error: "Nu te poti urmari pe tine insuti." }, { status: 400 });
  }

  try {
    await prisma.follow.upsert({
      where: { followerId_followingId: { followerId, followingId } },
      create: { followerId, followingId },
      update: {},
    });
    return NextResponse.json({ following: true });
  } catch (e) {
    console.error("[POST /api/follow]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const followerId = (session.user as { id: string }).id;
  const { userId: followingId } = await params;

  try {
    await prisma.follow.deleteMany({ where: { followerId, followingId } });
    return NextResponse.json({ following: false });
  } catch (e) {
    console.error("[DELETE /api/follow]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
