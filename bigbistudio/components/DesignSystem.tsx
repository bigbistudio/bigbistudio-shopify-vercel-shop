"use client";

import {
  ArrowRight,
  ChevronDown,
  Delete,
  Grid3X3,
  Menu,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import {
  createContext,
  type MouseEvent,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const previewGrid =
  "bg-[linear-gradient(to_right,rgb(from_var(--color-border)_r_g_b/10%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(from_var(--color-border)_r_g_b/10%)_1px,transparent_1px)] bg-size-[12px_12px]";

const colors = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "border", className: "bg-border" },
  { name: "input", className: "bg-input" },
  { name: "positive", className: "bg-positive" },
  { name: "destructive", className: "bg-destructive" },
  { name: "shop", className: "bg-shop" },
];

const textColors = [
  { name: "foreground", className: "text-foreground" },
  { name: "muted-foreground", className: "text-muted-foreground" },
  { name: "primary-foreground", className: "text-primary-foreground" },
  { name: "secondary-foreground", className: "text-secondary-foreground" },
  { name: "accent-foreground", className: "text-accent-foreground" },
  { name: "positive-foreground", className: "text-positive-foreground" },
  { name: "destructive-foreground", className: "text-destructive-foreground" },
];

const radii = [
  { name: "none", className: "rounded-none", value: "0px" },
  { name: "sm", className: "rounded-sm", value: "6px" },
  { name: "md", className: "rounded-md", value: "8px" },
  { name: "lg", className: "rounded-lg", value: "10px" },
  { name: "xl", className: "rounded-xl", value: "14px" },
  { name: "2xl", className: "rounded-2xl", value: "16px" },
  { name: "full", className: "rounded-full", value: "9999px" },
];

const typeScale = [
  { name: "xxs", className: "text-xxs", sample: "Extra extra small" },
  { name: "sm", className: "text-sm", sample: "Small text" },
  { name: "base", className: "text-base", sample: "Body text" },
  { name: "lg", className: "text-lg", sample: "Large text" },
  { name: "xl", className: "text-xl", sample: "Extra large" },
  { name: "2xl", className: "text-2xl", sample: "Heading 2XL" },
  { name: "3xl", className: "text-3xl", sample: "Heading 3XL" },
  { name: "4xl", className: "text-4xl", sample: "Heading 4XL" },
  { name: "5xl", className: "text-5xl", sample: "Heading 5XL" },
  { name: "6xl", className: "text-6xl", sample: "Heading 6XL" },
  { name: "7xl", className: "text-7xl", sample: "Heading 7XL" },
];

const tocItems = [
  { id: "colors", label: "Colors" },
  { id: "text-colors", label: "Text colors" },
  { id: "typography", label: "Typography" },
  { id: "headings", label: "Headings" },
  { id: "radius", label: "Radius" },
  { id: "components", label: "Components" },
  { id: "layout-tokens", label: "Layout tokens" },
  { id: "breakpoints", label: "Breakpoints" },
  { id: "utilities", label: "Utilities" },
];

interface StyleGuideContextValue {
  gridVisible: boolean;
}

const StyleGuideContext = createContext<StyleGuideContextValue>({ gridVisible: true });

export function StudyGuide() {
  const [gridVisible, setGridVisible] = useState(true);

  return (
    <StyleGuideContext.Provider value={{ gridVisible }}>
      <StudyGuideContent onToggleGrid={() => setGridVisible((visible) => !visible)} />
    </StyleGuideContext.Provider>
  );
}

function StudyGuideContent({ onToggleGrid }: { onToggleGrid: () => void }) {
  const gridClass = useGridClass();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-20 py-16">
        <FloatingToc onToggleGrid={onToggleGrid} />

        {/* Header */}
        <header className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">BIGBI STUDIO</p>

          <h1 className="text-4xl font-normal tracking-tight">Design Token Study Guide</h1>

          <p className="max-w-2xl text-base text-muted-foreground">
            A visual reference for the design tokens defined in{" "}
            <code className="rounded-sm bg-muted px-1.5 py-0.5 text-sm">global.css</code>.
          </p>
        </header>

        {/* Colors */}
        <section id="colors" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Colors"
            description="Semantic color tokens exposed through Tailwind utilities."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((color) => (
              <PreviewCard key={color.name} title={color.name} token={color.className}>
                <div className={`h-24 w-full ${color.className}`} />
              </PreviewCard>
            ))}
          </div>
        </section>

        {/* Text colors */}
        <section id="text-colors" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Text colors"
            description="Foreground tokens for semantic text usage."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {textColors.map((color) => (
              <PreviewCard key={color.name} title={color.name} token={color.className}>
                <span className={`text-2xl ${color.className}`}>Aa — Sample text</span>
              </PreviewCard>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section id="typography" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Typography"
            description="Geist typography scale with tighter tracking on larger sizes."
          />

          <div className="overflow-hidden rounded-lg border border-dashed bg-card">
            {typeScale.map((type, index) => (
              <div
                key={type.name}
                className={`grid gap-4 md:grid-cols-[110px_1fr] ${
                  index !== typeScale.length - 1 ? "border-b border-dashed" : ""
                }`}
              >
                <div className="flex items-center px-5 py-4">
                  <code className="text-xs text-muted-foreground">{type.className}</code>
                </div>

                <div className={`${gridClass} flex min-h-20 items-center px-6`}>
                  <span className={type.className}>{type.sample}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Headings */}
        <section id="headings" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Headings"
            description="Heading scale inherits the tracking values defined in @theme."
          />

          <PreviewCard title="Heading scale" token="text-2xl → text-5xl">
            <div className="w-full space-y-5">
              <h1 className="text-5xl font-normal">Heading 1</h1>
              <h2 className="text-4xl font-normal">Heading 2</h2>
              <h3 className="text-3xl font-normal">Heading 3</h3>
              <h4 className="text-2xl font-normal">Heading 4</h4>
            </div>
          </PreviewCard>
        </section>

        {/* Radius */}
        <section id="radius" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Radius"
            description="Radius utilities are derived from the base --radius token."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {radii.map((radius) => (
              <PreviewCard key={radius.name} title={radius.name} token={radius.className}>
                <div
                  className={`flex aspect-square w-full items-center justify-center border-2 bg-muted/60 ${radius.className}`}
                >
                  <span className="text-sm font-medium text-muted-foreground">{radius.value}</span>
                </div>
              </PreviewCard>
            ))}
          </div>
        </section>

        {/* Components */}
        <section id="components" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Component patterns"
            description="Basic combinations using the semantic tokens."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <PreviewCard title="Button variants" token="variant">
              <div className="flex flex-wrap items-center xl:grid xl:grid-cols-4 gap-4">
                <Button>Default</Button>

                <Button variant="destructive">Destructive</Button>

                <Button variant="outline">Outline</Button>

                <Button variant="secondary">Secondary</Button>

                <Button variant="ghost">Ghost</Button>

                <Button variant="link" size="inline-link">Link</Button>

                <Button className="bg-shop text-white hover:bg-shop/90">Shop</Button>
              </div>
            </PreviewCard>

            <PreviewCard title="Button sizes" token="size">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>

                <Button>Default</Button>

                <Button size="lg">Large</Button>

                <Button size="icon-sm" aria-label="Add item">
                  <Plus />
                </Button>

                <Button size="icon" aria-label="Open settings">
                  <Settings />
                </Button>

                <Button size="icon-lg" aria-label="Delete item" variant="destructive">
                  <Trash2 />
                </Button>
              </div>
            </PreviewCard>

            <PreviewCard title="Button composition" token="icon + label">
              <div className="flex flex-wrap items-center xl:grid xl:grid-cols-4 gap-4">
                <Button>
                  Continue
                  <ArrowRight />
                </Button>

                <Button variant="destructive">
                  <Trash2 />
                  Delete
                </Button>

                <Button variant="outline">
                  <Plus />
                  Add item
                </Button>

                <Button variant="secondary">
                  <Settings />
                  Settings
                </Button>

                <Button variant="ghost">
                  Products
                  <ChevronDown />
                </Button>

                <Button variant="link" size="inline-link">
                  View more
                  <ArrowRight />
                </Button>
              </div>
            </PreviewCard>

            <PreviewCard title="Input types" token="Input type">
              <div className="grid w-full gap-3 sm:grid-cols-2">
                <Input type="text" placeholder="Text" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input type="number" placeholder="Number" />
                <Input type="search" placeholder="Search" />
                <Input type="tel" placeholder="Telephone" />
                <Input type="url" placeholder="Website URL" />
                <Input type="date" aria-label="Date" />
                <Input type="time" aria-label="Time" />
                <Input type="color" aria-label="Color" className="p-1" />
                <Input type="file" aria-label="Upload file" className="h-auto p-1.5" />
              </div>
            </PreviewCard>

            <PreviewCard title="Accordion" token="Accordion">
              <Accordion defaultValue={["shipping"]} className="max-w-lg">
                <AccordionItem value="shipping">
                  <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free
                    shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original packaging.
                    Refunds processed within 5-7 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within 24 hours during
                    business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </PreviewCard>

            <PreviewCard title="Textarea" token="Textarea">
              <Textarea placeholder="Write a message..." />
            </PreviewCard>

            <PreviewCard title="Select" token="Select">
              <Select defaultValue="studio">
                <SelectTrigger className="w-full">Choose a studio</SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Bigbi Studio</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="design">Design systems</SelectItem>
                </SelectContent>
              </Select>
            </PreviewCard>

            <PreviewCard title="Switch" token="Switch">
              <div className="flex w-full items-center justify-between gap-4">
                <Label htmlFor="styleguide-notifications">Email notifications</Label>
                <Switch id="styleguide-notifications" defaultChecked />
              </div>
            </PreviewCard>

            <PreviewCard title="Card" token="bg-card">
              <div className="w-full rounded-lg border bg-card p-6">
                <div className="space-y-3">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Card
                  </span>

                  <h3 className="text-xl font-normal">Card surface</h3>

                  <p className="text-sm text-muted-foreground">
                    Cards use the semantic card and card-foreground tokens.
                  </p>
                </div>
              </div>
            </PreviewCard>

            <PreviewCard title="Status" token="positive / destructive">
              <div className="flex flex-wrap gap-3">
                <Badge className="rounded-sm bg-positive text-positive-foreground hover:bg-positive/90">
                  Positive
                </Badge>

                <Badge variant="destructive" className="rounded-sm">
                  Destructive
                </Badge>
              </div>
            </PreviewCard>
          </div>
        </section>

        {/* Layout tokens */}
        <section id="layout-tokens" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Layout tokens"
            description="Important CSS variables that are not directly color tokens."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TokenCard
              name="--header-height"
              value="calc(4rem + var(--safe-area-top))"
              description="64px navigation row plus mobile safe-area inset."
            />

            <TokenCard
              name="--radius"
              value="0.625rem"
              description="Base radius used to derive sm, md, lg and xl."
            />

            <TokenCard
              name="--safe-area-top"
              value="env(safe-area-inset-top, 0px)"
              description="Accounts for device safe-area insets."
            />

            <TokenCard
              name="--shadow-line"
              value="0 1px 0 0 #0000001a"
              description="Subtle single-pixel line shadow."
            />
          </div>
        </section>

        {/* Breakpoints */}
        <section id="breakpoints" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Breakpoints"
            description="Additional responsive breakpoints defined by Vercel Shop."
          />

          <div className="overflow-hidden rounded-lg border border-dashed bg-card">
            <div className="grid grid-cols-[1fr_1fr] border-b border-dashed bg-muted px-5 py-3 text-sm font-medium">
              <span>Name</span>
              <span>Value</span>
            </div>

            <div className="grid grid-cols-[1fr_1fr] border-b border-dashed px-5 py-4">
              <code className="text-sm">3xl</code>
              <span className="text-sm text-muted-foreground">112rem / 1792px</span>
            </div>

            <div className="grid grid-cols-[1fr_1fr] px-5 py-4">
              <code className="text-sm">4xl</code>
              <span className="text-sm text-muted-foreground">140rem / 2240px</span>
            </div>
          </div>
        </section>

        {/* Utilities */}
        <section id="utilities" className="scroll-mt-8 space-y-8">
          <SectionHeading
            title="Utilities"
            description="Custom utilities provided by global.css."
          />

          <div className="space-y-6">
            <PreviewCard title="Shimmer" token=".shimmer">
              <p className="shimmer text-3xl font-medium">Live agent status</p>
            </PreviewCard>

            <PreviewCard title="Featured badge" token=".clip-featured-badge">
              <div className="relative h-32 w-full rounded-lg bg-muted">
                <div className="clip-featured-badge absolute left-0 top-0 bg-primary px-5 py-3 text-sm text-primary-foreground">
                  Featured
                </div>
              </div>
            </PreviewCard>
          </div>
        </section>
      </div>
    </main>
  );
}

function useGridClass() {
  const { gridVisible } = useContext(StyleGuideContext);
  return gridVisible ? previewGrid : "";
}

function FloatingToc({ onToggleGrid }: { onToggleGrid: () => void }) {
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState("colors");
  const { gridVisible } = useContext(StyleGuideContext);

  useEffect(() => {
    const sections = tocItems
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

        if (visibleEntries[0]) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - 100;
    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (!open) {
    return (
      <Button
        aria-label="Open table of contents"
        aria-haspopup
        className="fixed right-4 top-1/2 z-40 -translate-y-1/2 shadow-line p-4 border-border/40 rounded-full hover:scale-110 hover:bg-muted/40"
        onClick={() => setOpen(true)}
        size="icon-lg"
        variant="outline"
      >
        <Menu />
      </Button>
    );
  }

  return (
    <aside className="hidden lg:inline-block fixed right-4 top-1/2 z-40 w-40 -translate-y-1/2 rounded-xl border border-border/60 bg-card shadow-line max-sm:right-3 max-sm:w-[calc(100vw-1.5rem)]">
      <div className="flex items-center justify-between gap-3 border-b border-border/40 p-4 py-2">
        <p className="text-sm font-medium">Navigation</p>

        <Button
          aria-label="Close table of contents"
          onClick={() => setOpen(false)}
          size="icon-sm"
          variant="ghost"
        >
          <X />
        </Button>
      </div>

      <nav aria-label="Style guide sections" className="grid gap-0.5 px-2 py-2">
        {tocItems.map((item) => (
          <a
            key={item.id}
            aria-current={activeId === item.id ? "location" : undefined}
            className={`rounded-md px-2.5 py-1.5 text-[13px] transition-colors hover:bg-muted/30 hover:text-foreground border border-transparent ${
              activeId === item.id
                ? "bg-muted/60 font-medium text-foreground"
                : "text-muted-foreground hover:border-border hover:border-dashed"
            }`}
            href={`#${item.id}`}
            onClick={(event) => handleNavigate(event, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-between gap-3 border-t border-border/40 p-4 py-2">
        <Label className="text-sm" htmlFor="styleguide-grid-toggle">
          <Grid3X3 className="size-4 text-muted-foreground" />
          Grid
        </Label>

        <Switch checked={gridVisible} id="styleguide-grid-toggle" onCheckedChange={onToggleGrid} />
      </div>
    </aside>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-normal tracking-tight">{title}</h2>

      <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PreviewCard({
  title,
  token,
  children,
}: {
  title: string;
  token: string;
  children: ReactNode;
}) {
  return (
    <div className={`${useGridClass()} overflow-hidden rounded-lg border border-dashed bg-card`}>
      <div className="flex items-center justify-between gap-4 border-b border-dashed px-5 py-3 bg-card">
        <h3 className="font-medium">{title}</h3>

        <code className="text-right text-xs text-muted-foreground">{token}</code>
      </div>

      <div className="flex min-h-40 items-center justify-center p-6">{children}</div>
    </div>
  );
}

function TokenCard({
  name,
  value,
  description,
}: {
  name: string;
  value: string;
  description: string;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-dashed bg-card p-5">
      <code className="text-sm">{name}</code>

      <p className="rounded-sm bg-muted px-3 py-2 text-sm">{value}</p>

      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
