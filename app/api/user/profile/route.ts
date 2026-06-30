import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as { id: string }).id;
    const body = await req.json();
    const { name, username, email, currentPassword, newPassword } = body as {
      name?: string;
      username?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
    };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const data: {
      name?: string;
      username?: string | null;
      email?: string;
      passwordHash?: string;
    } = {};

    if (name && name.trim() !== user.name) {
      data.name = name.trim();
    }

    if (username !== undefined) {
      const trimmed = username.trim();
      if (trimmed !== (user.username ?? "")) {
        if (trimmed) {
          const taken = await prisma.user.findUnique({ where: { username: trimmed } });
          if (taken) return NextResponse.json({ error: "Username deja folosit." }, { status: 409 });
          data.username = trimmed;
        } else if (user.username) {
          data.username = null;
        }
      }
    }

    if (email && email.trim() !== user.email) {
      const taken = await prisma.user.findUnique({ where: { email: email.trim() } });
      if (taken) return NextResponse.json({ error: "Email deja inregistrat." }, { status: 409 });
      data.email = email.trim();
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Introdu parola curenta pentru a o schimba." }, { status: 400 });
      }
      const valid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!valid) return NextResponse.json({ error: "Parola curenta este gresita." }, { status: 400 });
      if (newPassword.length < 6) {
        return NextResponse.json({ error: "Parola noua trebuie sa aiba minim 6 caractere." }, { status: 400 });
      }
      data.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ message: "Nicio modificare detectata." });
    }

    const updated = await prisma.user.update({ where: { id: userId }, data });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      username: updated.username,
      email: updated.email,
    });
  } catch (err) {
    console.error("[PATCH /api/user/profile]", err);
    return NextResponse.json({ error: "Eroare de server." }, { status: 500 });
  }
}
