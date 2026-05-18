import { Button } from "@/components/ui/Button";

export function QuantityStepper({
  value,
  onMinus,
  onPlus,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <Button aria-label="Decrease quantity" variant="ghost" onClick={onMinus}>
        -
      </Button>
      <span aria-live="polite" className="min-w-6 text-center text-sm">
        {value}
      </span>
      <Button aria-label="Increase quantity" variant="ghost" onClick={onPlus}>
        +
      </Button>
    </div>
  );
}
