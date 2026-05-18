"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const domTheme = document.documentElement.dataset.theme;
  if (domTheme === "light" || domTheme === "dark") return domTheme;
  try {
    const saved = window.localStorage.getItem("nordshop-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const t = useTranslations("theme");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("nordshop-theme", theme);
    } catch {}
  }, [theme]);

  const isDark = theme === "dark";
  const label = isDark ? t("toLight") : t("toDark");

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
