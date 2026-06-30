import { clsx } from "clsx";

const variants = {
  easy: "bg-green-500/10 text-green-400 border border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  hard: "bg-red-500/10 text-red-400 border border-red-500/20",
  accepted: "bg-green-500/10 text-green-400 border border-green-500/20",
  wrong_answer: "bg-red-500/10 text-red-400 border border-red-500/20",
  compile_error: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  runtime_error: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  pending: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  default: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
};

const labels: Record<string, string> = {
  easy: "Usor",
  medium: "Mediu",
  hard: "Greu",
  accepted: "Acceptat",
  wrong_answer: "Raspuns gresit",
  compile_error: "Eroare compilare",
  runtime_error: "Eroare runtime",
  pending: "In asteptare",
  math: "Matematica",
  arrays: "Siruri",
  strings: "Stringuri",
  sorting: "Sortare",
  dp: "Programare dinamica",
  graphs: "Grafuri",
};

export function Badge({ value, className }: { value: string; className?: string }) {
  const variant = (variants as Record<string, string>)[value] ?? variants.default;
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", variant, className)}>
      {labels[value] ?? value}
    </span>
  );
}
