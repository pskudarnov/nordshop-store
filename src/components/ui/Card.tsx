import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-[var(--shadow-soft)]">{children}</div>
  );
}
