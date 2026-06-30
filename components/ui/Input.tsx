import { clsx } from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "px-3 py-2 rounded-lg text-sm text-slate-100 placeholder-slate-500 outline-none transition-all",
          "border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30",
          error ? "border-red-500" : "border-white/10",
          className
        )}
        style={{ background: "var(--bg-hover)" }}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
