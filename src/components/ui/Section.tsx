import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: Props) {
  return <section id={id} className={cn("py-12 md:py-16", className)}>{children}</section>;
}
