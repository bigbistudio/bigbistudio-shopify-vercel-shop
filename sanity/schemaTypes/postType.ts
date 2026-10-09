import { defineArrayMember, defineField, defineType } from "sanity";

import { createPortableTextField } from "@/sanity/schemaTypes/portable-text";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "story", title: "Story", default: true },
    { name: "editorial", title: "Editorial content" },
    { name: "seo", title: "SEO" },
    { name: "previous", title: "Previous content" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "story",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      group: "story",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short introduction used on the journal listing and in search results.",
      rows: 3,
      group: "story",
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      description: "The lead image shown at the top of the article and on the journal listing.",
      options: {
        hotspot: true,
      },
      group: "story",
      fields: [
        defineField({
          name: "alt",
          title: "Cover image alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "story",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "articleContent",
      title: "Article content",
      type: "array",
      description: "Add and reorder the sections that make up this editorial article.",
      group: "editorial",
      of: [
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "editorialImage" }),
        defineArrayMember({ type: "imageTextSplit" }),
        defineArrayMember({ type: "collectionCta" }),
      ],
    }),
    createPortableTextField("body", "Previously authored body", {
      group: "previous",
      includeCode: true,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Optional search and social title. Defaults to the article title.",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Optional search and social description. Defaults to the excerpt.",
      group: "seo",
    }),
  ],
});
