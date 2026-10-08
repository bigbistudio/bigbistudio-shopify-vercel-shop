import type { Metadata } from "next";

import { BlogGrid } from "@/bigbistudio/components/blog/blog-grid";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { getPosts } from "@/sanity/lib/server";

export function generateMetadata(): Metadata {
  const title = "Journal";
  const description = "Stories, ideas, and inspiration from the Bigbi Studio journal.";

  return {
    alternates: buildAlternates({ pathname: "/blog" }),
    description,
    openGraph: buildOpenGraph({
      description,
      title,
      type: "website",
      url: "/blog",
    }),
    title,
  };
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Page className="pt-2.5 md:pt-10">
      <Container>
        <Sections>
          <header className="grid gap-4 text-center">
            <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
              Bigbi Studio
            </p>
            <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl">The Journal</h1>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-7">
              Stories, ideas, and inspiration for considered everyday dressing.
            </p>
          </header>
          <BlogGrid posts={posts} />
        </Sections>
      </Container>
    </Page>
  );
}
