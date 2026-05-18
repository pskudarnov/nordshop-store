export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 max-w-3xl text-sm text-[var(--muted-foreground)] md:text-[15px]">{subtitle}</p> : null}
    </div>
  );
}
