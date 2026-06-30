"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Search, UserCircle, Zap, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface UserResult {
  id: string;
  name: string;
  username: string | null;
  xp: number;
  level: number;
}

function profileHref(u: UserResult) {
  return `/users/${u.username ?? u.id}`;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [following, setFollowing] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isGuest = status !== "loading" && !session;

  useEffect(() => {
    fetch("/api/users/following").then(r => r.json()).then(d => { if (Array.isArray(d)) setFollowing(d); });
  }, []);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (!query.trim()) { setResults([]); return; }
    debounce.current = setTimeout(() => {
      setLoading(true);
      fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((d) => { setResults(Array.isArray(d) ? d : []); setLoading(false); });
    }, 300);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-2xl mx-auto w-full px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Prieteni</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Cauta si urmareste elevi</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cauta username sau nume..."
            autoFocus
            className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-indigo-500"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {query ? (
          <>
            {loading && <p className="text-sm text-center py-4" style={{ color: "var(--text-muted)" }}>Se cauta...</p>}
            {!loading && results.length === 0 && (
              <p className="text-sm text-center py-8" style={{ color: "var(--text-muted)" }}>
                Niciun utilizator gasit pentru &ldquo;{query}&rdquo;
              </p>
            )}
            {results.length > 0 && (
              <div className="flex flex-col gap-2">
                {results.map((u) => <UserCard key={u.id} u={u} />)}
              </div>
            )}
          </>
        ) : (
          <>
            {!isGuest && following.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  Urmărești ({following.length})
                </p>
                <div className="flex flex-col gap-2">
                  {following.map((u) => <UserCard key={u.id} u={u} />)}
                </div>
              </div>
            ) : (
              <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
                <UserCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  {isGuest ? "Conecteaza-te pentru a urmari elevi." : "Nu urmărești pe nimeni inca. Cauta un elev!"}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function UserCard({ u }: { u: UserResult }) {
  return (
    <Link
      href={`/users/${u.username ?? u.id}`}
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl border hover:border-indigo-500/30 transition-all"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
      >
        {(u.username || u.name).charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate" style={{ color: "var(--text)" }}>
          {u.username ? `@${u.username}` : u.name}
        </p>
        {u.username && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{u.name}</p>}
      </div>
      <div className="flex items-center gap-1.5 text-sm text-indigo-300 shrink-0">
        <Zap className="w-3.5 h-3.5" />
        {u.xp}
      </div>
    </Link>
  );
}
