export function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-900">
      {label}
    </span>
  );
}
