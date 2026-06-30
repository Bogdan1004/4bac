import { clsx } from "clsx";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx("rounded-xl border p-4", className)}
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {children}
    </div>
  );
}
