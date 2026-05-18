import {useTranslations} from 'next-intl';
import {Link} from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function CTA() {
  const t = useTranslations('landing.cta');
  return (
    <Section className="pb-14 text-center">
      <div className="premium-panel rounded-3xl px-6 py-10 md:py-12">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">{t('label')}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">{t('title')}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--muted-foreground)]">{t('text')}</p>
        <div className="mt-7">
          <Link href="/products"><Button>{t('button')}</Button></Link>
        </div>
      </div>
    </Section>
  );
}
