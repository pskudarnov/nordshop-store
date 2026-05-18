"use client";

import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/i18n";

const options: { value: AppLocale; label: string }[] = [
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" },
];

function localeFromPathname(pathname: string): AppLocale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/en") return "/";
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

type LanguageSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({ className, compact = false }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const activeLocale = localeFromPathname(pathname);

  const switchLocale = (targetLocale: AppLocale) => {
    if (targetLocale === activeLocale) return;
    const normalizedPath = normalizePathname(pathname);
    const targetPath =
      targetLocale === "en"
        ? normalizedPath === "/"
          ? "/en"
          : `/en${normalizedPath}`
        : normalizedPath;
    window.location.assign(targetPath);
  };

  return (
    <div
      className={[
        compact
          ? "inline-flex h-9 items-center gap-1 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_88%,var(--muted))] p-0.5 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_6%,transparent)]"
          : "inline-flex h-10 items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {options.map((option) => {
        const active = activeLocale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => switchLocale(option.value)}
            aria-pressed={active}
            className={`inline-flex ${compact ? "h-7 min-w-10 px-2.5 text-[11px]" : "h-8 min-w-11 px-2 text-xs"} items-center justify-center rounded-[10px] font-semibold transition-all duration-200 ease-out active:scale-[0.98] ${
              active
                ? compact
                  ? "bg-[color-mix(in_srgb,var(--primary)_24%,var(--card))] text-[var(--foreground)] shadow-[inset_0_1px_0_color-mix(in_srgb,#fff_45%,transparent),0_6px_14px_color-mix(in_srgb,var(--accent)_16%,transparent)]"
                  : "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-soft)]"
                : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
