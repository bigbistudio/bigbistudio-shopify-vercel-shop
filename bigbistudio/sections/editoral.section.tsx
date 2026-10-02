import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function EditoralSection() {
  return (
    <Container className="w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="relative aspect-4/6 w-full overflow-hidden rounded-lg border border-border/10 lg:aspect-[2.4/1]">
        <Image
          src="/images/mediterranean-everyday-editorial.jpg"
          alt="Woman wearing a white crochet-trim pointelle cardigan in a Mediterranean interior"
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b lg:bg-linear-to-r from-transparent via-black/20 to-black/45" />

        <div className="absolute inset-y-0 right-0 flex w-full items-end lg:items-center lg:justify-end p-6 lg:px-10 lg:w-1/2">
          <div className="text-white md:p-10 max-w-sm lg:max-w-md space-y-4 md:space-y-6">
            <p className="mb-2 text-xxs font-medium uppercase tracking-[0.16em] text-white/70">
              Editorial
            </p>

            <h2 className="text-3xl font-medium tracking-tighter lg:text-4xl">
              The Art of
              <br />
              Everyday Dressing
            </h2>

            <p className="text-sm leading-5">
              Thoughtful pieces designed for everyday movement, quiet moments, and everything in
              between.
            </p>

            <Button variant="outline" className="hidden text-white lg:inline-flex">
              <Link href="/collections/cardigans">
                Discover the Edit
                <span aria-hidden="true" className="ml-1.5">
                  →
                </span>
              </Link>
            </Button>

            <Link
              href="/collections/cardigans"
              className="text-xs font-normal text-white underline decoration-[0.5px] underline-offset-4 lg:hidden"
            >
              Discover the Edit
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
