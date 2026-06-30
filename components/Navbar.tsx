"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Code2, Trophy, LayoutDashboard, LogOut, BookOpen, ShieldCheck, GraduationCap, Sun, Moon, UserCircle, Users } from "lucide-react";
import { clsx } from "clsx";
import { useTheme } from "@/lib/theme";

const navLinks = [
  { href: "/problems", label: "Probleme", icon: BookOpen },
  { href: "/learn", label: "Invatare", icon: GraduationCap },
  { href: "/dashboard", label: "Progres", icon: LayoutDashboard },
  { href: "/leaderboard", label: "Clasament", icon: Trophy },
  { href: "/classes", label: "Clase", icon: Users },
  { href: "/users", label: "Prieteni", icon: UserCircle },
];

const guestLinks = [
  { href: "/problems", label: "Probleme", icon: BookOpen },
  { href: "/learn", label: "Invatare", icon: GraduationCap },
  { href: "/leaderboard", label: "Clasament", icon: Trophy },
  { href: "/classes", label: "Clase", icon: Users },
  { href: "/users", label: "Prieteni", icon: UserCircle },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  const navBg = theme === "light"
    ? "rgba(240,242,247,0.85)"
    : "rgba(13,15,20,0.85)";

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 border-b"
      style={{ background: navBg, backdropFilter: "blur(12px)", borderColor: "var(--border)" }}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: "var(--text)" }}>
        <Code2 className="w-5 h-5 text-indigo-400" />
        <span>4bac</span>
        <span className="text-indigo-400 text-xs font-normal ml-1 opacity-70">beta</span>
      </Link>

      <nav className="flex items-center gap-1">
        {(session ? navLinks : guestLinks).map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all",
              pathname.startsWith(href)
                ? "bg-indigo-500/15 text-indigo-400"
                : "hover:bg-black/5"
            )}
            style={{ color: pathname.startsWith(href) ? undefined : "var(--text-muted)" }}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={theme === "dark" ? "Treci la tema clara" : "Treci la tema intunecata"}
          className="p-1.5 rounded-lg transition-all hover:bg-black/10"
          style={{ color: "var(--text-muted)" }}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {session ? (
          <>
            {(session.user as { role?: string })?.role === "admin" && (
              <Link
                href="/admin/problems"
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
            <Link
              href="/profile"
              className={clsx(
                "flex items-center gap-1.5 text-sm px-2 py-1.5 rounded-lg transition-all",
                pathname.startsWith("/profile")
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "hover:bg-black/5"
              )}
              style={{ color: pathname.startsWith("/profile") ? undefined : "var(--text-muted)" }}
            >
              <UserCircle className="w-4 h-4" />
              <span className="hidden sm:inline">
                {(session.user as { username?: string | null })?.username || session.user?.name}
              </span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-1.5 rounded-lg transition-all hover:bg-black/10"
              style={{ color: "var(--text-muted)" }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Conecteaza-te
          </Link>
        )}
      </div>
    </header>
  );
}
