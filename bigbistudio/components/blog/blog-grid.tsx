import { BlogCard } from "@/bigbistudio/components/blog/blog-card";
import type { BlogPostSummary } from "@/sanity/lib/queries";

export interface BlogGridProps {
  headingLevel?: 2 | 3;
  posts: BlogPostSummary[];
}

export function BlogGrid({ headingLevel = 2, posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <p className="border-y py-10 text-center text-muted-foreground">
        New stories are on the way. Please check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard headingLevel={headingLevel} key={post.slug} post={post} />
      ))}
    </div>
  );
}
