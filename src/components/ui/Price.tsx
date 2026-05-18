import { useLocale } from "next-intl";
import { formatCurrency } from "@/lib/currency";
import type { AppLocale } from "@/lib/i18n";

export function Price({ value }: { value: number }) {
  const locale = useLocale() as AppLocale;
  const formatted = formatCurrency(value, locale);

  return <span className="text-lg font-semibold text-[var(--foreground)]">{formatted}</span>;
}
