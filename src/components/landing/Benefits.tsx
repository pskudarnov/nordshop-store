import { useTranslations } from "next-intl";
import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Benefits() {
  const t = useTranslations("landing.benefits");
  const benefits = [
    { title: t("items.0.title"), text: t("items.0.text"), icon: Sparkles },
    { title: t("items.1.title"), text: t("items.1.text"), icon: Truck },
    { title: t("items.2.title"), text: t("items.2.text"), icon: ShieldCheck },
    { title: t("items.3.title"), text: t("items.3.text"), icon: CheckCircle2 },
  ];

  return (
    <Section id="why" className="pt-10">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="grid gap-4 md:grid-cols-2">
        {benefits.map((item) => (
          <Card key={item.title}>
            <item.icon className="h-5 w-5 text-[var(--accent)]" />
            <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
