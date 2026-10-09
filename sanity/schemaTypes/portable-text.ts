import { defineArrayMember, defineField } from "sanity";

import { getSafeEditorialUrl } from "../lib/editorial-url";

export function createPortableTextField(
  name: string,
  title: string,
  options: { group?: string; includeCode?: boolean; required?: boolean } = {},
) {
  return defineField({
    group: options.group,
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading 2", value: "h2" },
          { title: "Heading 3", value: "h3" },
          { title: "Block quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
            ...(options.includeCode ? [{ title: "Code", value: "code" }] : []),
          ],
          annotations: [
            {
              name: "link",
              title: "Link",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "URL",
                  type: "string",
                  validation: (rule) =>
                    rule.custom((value) =>
                      !value || getSafeEditorialUrl(value)
                        ? true
                        : "Enter a relative path or a valid http, https, mailto, or tel URL.",
                    ),
                }),
              ],
            },
          ],
        },
      }),
    ],
    validation: options.required ? (rule) => rule.required().min(1) : undefined,
  });
}
