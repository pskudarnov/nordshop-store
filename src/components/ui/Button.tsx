import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "soft" };

export function Button({ className, variant = "primary", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none",
        variant === "primary" && "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-soft)] hover:brightness-102 hover:shadow-[var(--shadow-soft-lg)] active:brightness-95",
        variant === "ghost" && "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] active:brightness-95",
        variant === "soft" && "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:brightness-102 active:brightness-95",
        className,
      )}
      {...props}
    />
  );
}
