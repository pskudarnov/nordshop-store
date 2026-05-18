"use client";

import * as Popover from "@radix-ui/react-popover";
import {ChevronRight, Menu, ShoppingCart, X} from "lucide-react";
import {MouseEvent as ReactMouseEvent, useId, useState} from "react";
import {CartDrawerContent} from "@/components/cart/CartDrawer";
import {BrandLogo} from "@/components/ui/BrandLogo";
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";
import {ThemeToggle} from "@/components/ui/ThemeToggle";
import {Link} from "@/i18n/navigation";
import {useCartStore} from "@/store/cart-store";
import {useLocale, useTranslations} from "next-intl";

function CartButton({count}: {count: number}) {
  return (
    <span className="relative inline-flex rounded-xl border border-[var(--border)] bg-[var(--card)] p-2.5 text-[var(--foreground)] transition hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
      <ShoppingCart className="h-5 w-5" />
      {count > 0 ? <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-semibold leading-none text-[var(--primary-foreground)] ring-2 ring-[var(--background-elevated)]">{count}</span> : null}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [desktopCartOpen, setDesktopCartOpen] = useState(false);
  const count = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0));
  const t = useTranslations('header');
  const locale = useLocale();
  const mobileNavId = useId();

  const links = [
    {href: '/#products', label: t('nav.products')},
    {href: '/#setups', label: t('nav.setups')},
    {href: '/#testimonials', label: t('nav.testimonials')},
    {href: '/#faq', label: 'FAQ'}
  ] as const;

  const handleAnchorClick = (event: ReactMouseEvent<HTMLAnchorElement>, href: string, closeMobile = false) => {
    const localizedRoot = locale === 'en' ? '/en' : '/';
    const localizedHash = href === '/#products' ? `${localizedRoot}#products` : href.replace('/#', `${localizedRoot}#`);
    if (!localizedHash.includes('#')) {
      if (closeMobile) setOpen(false);
      return;
    }
    const id = localizedHash.split('#')[1];
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({behavior: reduceMotion ? "auto" : "smooth", block: "start"});
    window.history.replaceState(null, "", localizedHash);
    if (closeMobile) setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--glass)_92%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-6">
        <BrandLogo className="min-w-0" />

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 text-sm md:flex lg:gap-7" aria-label={t('a11y.mainNav')}>
          {links.map((link) => (
            <Link key={link.href} className="whitespace-nowrap text-[var(--muted-foreground)] transition hover:text-[color:#9a7b3a]" href={link.href} onClick={(event) => handleAnchorClick(event, link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Popover.Root open={desktopCartOpen} onOpenChange={setDesktopCartOpen}>
            <Popover.Trigger asChild>
              <button type="button" aria-label={t('actions.openCart')} aria-controls="mini-cart-panel" className="inline-flex">
                <CartButton count={count} />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content id="mini-cart-panel" side="bottom" align="end" sideOffset={12} collisionPadding={16} className="z-[100] w-[392px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft-lg)]">
                <CartDrawerContent onClose={() => setDesktopCartOpen(false)} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex rounded-lg p-2 transition-colors duration-200 hover:bg-[var(--muted)] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] md:hidden"
          aria-label={open ? t('actions.closeMenu') : t('actions.toggleMenu')}
          aria-expanded={open}
          aria-controls={mobileNavId}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id={mobileNavId}
        className={`overflow-hidden border-t border-[var(--border)] bg-[var(--background-elevated)] transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav className="px-4 py-3.5 text-[var(--foreground)]" aria-label={t('a11y.mobileNav')}>
          <div className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={(event) => handleAnchorClick(event, link.href, true)}>
                {link.label}
              </Link>
            ))}
            <Link href="/checkout" onClick={() => setOpen(false)}>{t('actions.checkout')}</Link>
          </div>

          <div className="mt-3 space-y-2.5 border-t border-[var(--border)] pt-3">
            <LanguageSwitcher compact className="w-fit" />

            <div className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_92%,var(--muted))] p-1 shadow-[var(--shadow-soft)]">
              <ThemeToggle className="h-8 w-8 shrink-0 rounded-lg border-transparent bg-transparent hover:bg-[var(--muted)] active:scale-[0.98]" />
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="group inline-flex h-8 min-h-8 flex-1 items-center justify-between rounded-lg px-2.5 text-[13px] font-medium text-[var(--foreground)] transition-all duration-200 ease-out hover:bg-[var(--muted)] active:scale-[0.99]"
                aria-label={t('actions.openCart')}
              >
                <span>{t('actions.openCart')}</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,var(--muted))] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--foreground)]">{count}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)] transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
