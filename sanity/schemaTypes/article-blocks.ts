import { Columns2, FileText, Image as ImageIcon, Link2 } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getSafeEditorialUrl } from "../lib/editorial-url";
import { createPortableTextField } from "./portable-text";

function createEditorialImageFields() {
  return [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload an editorial image. Its original proportions will be preserved.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe what is visible in the image for readers using screen readers.",
      validation: (rule) => rule.required(),
    }),
  ];
}

export const richTextSectionType = defineType({
  name: "richTextSection",
  title: "Text section",
  type: "object",
  icon: FileText,
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      description: "Optional heading shown above this section.",
    }),
    createPortableTextField("body", "Text", { required: true }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return {
        title: heading || "Text section",
        subtitle: "Rich text",
      };
    },
  },
});

export const editorialImageType = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "object",
  icon: ImageIcon,
  fields: [
    ...createEditorialImageFields(),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "credit",
      title: "Image credit",
      type: "string",
    }),
  ],
  preview: {
    select: { alt: "alt", caption: "caption", media: "image" },
    prepare({ alt, caption, media }) {
      return {
        title: caption || "Editorial image",
        subtitle: alt || "Full-width image",
        media,
      };
    },
  },
});

export const imageTextSplitType = defineType({
  name: "imageTextSplit",
  title: "Image and text",
  type: "object",
  icon: Columns2,
  fields: [
    ...createEditorialImageFields(),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    createPortableTextField("body", "Text", { required: true }),
    defineField({
      name: "imagePosition",
      title: "Image position",
      type: "string",
      description: "Choose which side the image appears on on larger screens.",
      options: {
        layout: "radio",
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "left",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { heading: "heading", imagePosition: "imagePosition", media: "image" },
    prepare({ heading, imagePosition, media }) {
      return {
        title: heading || "Image and text",
        subtitle: imagePosition === "right" ? "Image on the right" : "Image on the left",
        media,
      };
    },
  },
});

export const collectionCtaType = defineType({
  name: "collectionCta",
  title: "Collection call to action",
  type: "object",
  icon: Link2,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination URL",
      type: "string",
      description: "Use a storefront path such as /collections/cardigans or an http(s) URL.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            getSafeEditorialUrl(value)
              ? true
              : "Enter a relative path or a valid http, https, mailto, or tel URL.",
          ),
    }),
  ],
  preview: {
    select: { buttonLabel: "buttonLabel", destination: "destination", heading: "heading" },
    prepare({ buttonLabel, destination, heading }) {
      return {
        title: heading || "Collection call to action",
        subtitle: [buttonLabel, destination].filter(Boolean).join(" · "),
      };
    },
  },
});
