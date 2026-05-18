import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="py-20 text-center">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-3 text-stone-600">{t("text")}</p>
      <Link href="/" className="mt-5 inline-block text-amber-800 hover:underline">
        {t("home")}
      </Link>
    </section>
  );
}
