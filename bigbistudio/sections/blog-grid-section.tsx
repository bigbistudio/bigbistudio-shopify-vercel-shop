import Link from "next/link";

import { BlogGrid } from "@/bigbistudio/components/blog/blog-grid";
import { Container } from "@/components/ui/container";
import { Sections } from "@/components/ui/sections";
import type { BlogPostSummary } from "@/sanity/lib/queries";

export interface BlogGridSectionProps {
  description?: string;
  eyebrow?: string;
  posts: BlogPostSummary[];
  title: string;
  viewAll?: boolean;
}

export function BlogGridSection({
  description,
  eyebrow,
  posts,
  title,
  viewAll = false,
}: BlogGridSectionProps) {
  return (
    <section>
      <Container>
        <Sections>
          <header className="grid gap-4">
            {eyebrow && (
              <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
            )}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="grid gap-2.5">
                <h2 className="text-2xl tracking-tight sm:text-3xl">{title}</h2>
                {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
              </div>
              {viewAll && (
                <Link
                  className="text-sm underline underline-offset-4 hover:text-muted-foreground"
                  href="/blog"
                >
                  View all
                </Link>
              )}
            </div>
          </header>
          <BlogGrid headingLevel={3} posts={posts} />
        </Sections>
      </Container>
    </section>
  );
}
