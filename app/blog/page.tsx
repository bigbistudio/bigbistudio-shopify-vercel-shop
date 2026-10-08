import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/lib/client";
import { postQuery } from "@/sanity/lib/queries";

async function getPosts() {
  "use cache";

  return client.fetch<SanityDocument[]>(postQuery);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Blog</h1>

      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          {post.excerpt && <p>{post.excerpt}</p>}
        </article>
      ))}
    </main>
  );
}
