import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status, adminNote } = await req.json() as { status: string; adminNote?: string };

  const proposal = await prisma.problemProposal.update({
    where: { id },
    data: { status, adminNote: adminNote ?? "" },
  });

  return NextResponse.json(proposal);
}
