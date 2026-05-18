import { useLocale, useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/currency";
import type { AppLocale } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale() as AppLocale;
  const freeShippingThreshold = 180;

  return (
    <footer
      id="footer"
      className="mt-16 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--background-elevated)_88%,transparent)]"
    >
      <div className="mx-auto grid max-w-6xl gap-7 px-4 py-9 text-sm text-[var(--muted-foreground)] sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-base font-semibold text-[var(--foreground)]">NordShop</p>
          <p className="mt-3 max-w-xs text-sm leading-6">{t("about")}</p>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">
            {t("supportTitle")}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            <li>help@nordshop.com</li>
            <li>{t("tracking")}</li>
            <li>{t("chat")}</li>
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">
            {t("deliveryTitle")}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            <li>{t("freeDelivery", { value: formatCurrency(freeShippingThreshold, locale) })}</li>
            <li>{t("returns")}</li>
            <li>{t("warranty")}</li>
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">
            {t("companyTitle")}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            <li>
              <Link
                className="rounded transition-colors duration-200 hover:text-[color:#9a7b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                href="/"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link
                className="rounded transition-colors duration-200 hover:text-[color:#9a7b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                href="/"
              >
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link
                className="rounded transition-colors duration-200 hover:text-[color:#9a7b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                href="/"
              >
                {t("policy")}
              </Link>
            </li>
            <li>
              <a
                className="rounded transition-colors duration-200 hover:text-[color:#9a7b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                href="https://github.com/pskudarnov/nordshop-store"
                target="_blank"
                rel="noreferrer"
              >
                {t("source")}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 py-3.5 text-center text-xs text-[var(--muted-foreground)]">
        {t("copyright")}
      </div>
    </footer>
  );
}
