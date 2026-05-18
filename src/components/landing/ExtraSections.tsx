"use client";

import { useLocale, useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "@/i18n/navigation";
import { ProductImage } from "@/components/products/ProductImage";
import { Section } from "@/components/ui/Section";

const logos = ["nFlow", "Arcive", "MiroHub", "Koyo Studio", "Reframe"];

export function ExtraSections() {
  const t = useTranslations("landing.extra");
  const locale = useLocale();
  const setups =
    locale === "ru"
      ? [
          {
            slug: "creator-desk",
            title: "Сетап креатора",
            text: "Теплый свет, чистая поверхность и удобная структура для монтажа и созвонов.",
            image: "/images/products/aura-desk-lamp-setup.webp",
          },
          {
            slug: "developer-station",
            title: "Станция разработчика",
            text: "Эргономика, тихая тактильность и дисциплина кабелей для глубокого кодинга.",
            image: "/images/products/fjord-mech-keyboard-setup.webp",
          },
          {
            slug: "minimal-focus",
            title: "Минималистичный фокус",
            text: "Сдержанная композиция с низким визуальным шумом для длинных сессий планирования.",
            image: "/images/products/graphite-desk-mat-setup.webp",
          },
          {
            slug: "audio-corner",
            title: "Аудио-уголок",
            text: "Спокойная акустика и комфортная среда для звонков, монтажа и заметок.",
            image: "/images/products/nova-headphones-setup.webp",
          },
        ]
      : [
          {
            slug: "creator-desk",
            title: "Creator Desk",
            text: "Warm lighting, clean surfaces and practical rhythm for editing and calls.",
            image: "/images/products/aura-desk-lamp-setup.webp",
          },
          {
            slug: "developer-station",
            title: "Developer Station",
            text: "Ergonomics, quiet tactility and cable discipline for deep coding blocks.",
            image: "/images/products/fjord-mech-keyboard-setup.webp",
          },
          {
            slug: "minimal-focus",
            title: "Minimal Focus",
            text: "A restrained composition with low visual noise for long planning sessions.",
            image: "/images/products/graphite-desk-mat-setup.webp",
          },
          {
            slug: "audio-corner",
            title: "Audio Corner",
            text: "Calm acoustics and practical comfort for calls, edits and voice-heavy days.",
            image: "/images/products/nova-headphones-setup.webp",
          },
        ];
  const editorials = [
    { title: t("editorials.0.title"), text: t("editorials.0.text") },
    { title: t("editorials.1.title"), text: t("editorials.1.text") },
  ];
  const faqs = [
    { q: t("faq.0.q"), a: t("faq.0.a") },
    { q: t("faq.1.q"), a: t("faq.1.a") },
    { q: t("faq.2.q"), a: t("faq.2.a") },
  ];

  return (
    <>
      <Section className="py-10">
        <p className="text-center text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          {t("usedBy")}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {logos.map((logo) => (
            <div
              key={logo}
              className="surface-card px-4 py-3 text-center text-sm text-[var(--foreground)]"
            >
              {logo}
            </div>
          ))}
        </div>
      </Section>

      <Section id="setups" className="pt-4">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          {t("setupsTitle")}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {setups.map((item) => (
            <Link
              key={item.slug}
              href={`/setups/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              <article>
                <div className="relative aspect-[4/3] border-b border-[var(--border)] bg-[var(--muted)]">
                  <ProductImage
                    src={item.image}
                    alt={`${item.title} ${t("setupAlt")}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.text}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="testimonials" className="pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {editorials.map((item) => (
            <article key={item.title} className="surface-card rounded-3xl p-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                {t("testimonials")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-2 text-[var(--muted-foreground)]">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq" className="pt-4">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          {t("faqTitle")}
        </h2>
        <Accordion.Root type="single" collapsible className="mt-6 space-y-3">
          {faqs.map((item, idx) => (
            <Accordion.Item
              key={item.q}
              value={`item-${idx}`}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)]"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] text-base leading-none text-[var(--muted-foreground)] transition-transform duration-300 ease-out group-data-[state=open]:rotate-45"
                  >
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-sm text-[var(--muted-foreground)] data-[state=closed]:animate-[accordion-up_220ms_cubic-bezier(0.32,0,0.67,0)] data-[state=open]:animate-[accordion-down_280ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none">
                <div className="px-4 pb-4 pt-1">{item.a}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Section>
    </>
  );
}
