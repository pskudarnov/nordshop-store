import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-[color-mix(in_srgb,var(--muted)_78%,transparent)]", className)} aria-hidden />;
}
