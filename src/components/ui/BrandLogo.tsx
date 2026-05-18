import {Link} from "@/i18n/navigation";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="NordShop home"
      className={[
        "group inline-flex shrink-0 items-center gap-3 rounded-2xl px-1.5 py-1 transition-colors duration-200 hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <svg viewBox="0 0 40 40" className="h-6 w-6 text-[var(--foreground)]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="8" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <rect x="23" y="8" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" opacity="0.72" />
          <rect x="7" y="22" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" opacity="0.72" />
          <rect x="23" y="22" width="10" height="10" rx="3" fill="currentColor" />
        </svg>
      </span>

      {!compact ? (
        <span className="leading-none">
          <span className="block text-[17px] font-semibold tracking-tight text-[var(--foreground)]">NordShop</span>
          <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)] sm:block">
            Workspace Store
          </span>
        </span>
      ) : null}
    </Link>
  );
}
