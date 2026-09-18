import { Factory, Lock, RotateCcw, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/container";

const trustItems = [
  {
    title: "Small Runs",
    description: "Made in limited quantities",
    icon: Factory,
  },
  {
    title: "Built Better",
    description: "Quality made for everyday",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    description: "Simple returns within 30 days",
    icon: RotateCcw,
  },
  {
    title: "Secure Checkout",
    description: "Safe and secure payment",
    icon: Lock,
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Shopping assurances" className="w-full border-y border-border/60">
      <Container className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ description, icon: Icon, title }) => (
          <div key={title} className="flex flex-col items-center gap-4 border border-border/60 p-4">
            <Icon aria-hidden="true" className="size-10 text-foreground" strokeWidth={1.5} />
            <div className="space-y-2 text-center">
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
