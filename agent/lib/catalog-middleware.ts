import type { wrapLanguageModel } from "ai";

export const catalogMiddleware = {
  async transformParams({ params }) {
    return {
      ...params,
      prompt: params.prompt.map((message) => {
        if (message.role !== "tool") return message;

        return {
          ...message,
          content: message.content.map((part) => {
            if (
              part.type !== "tool-result" ||
              part.toolName !== "shopify__search_catalog" ||
              part.output.type !== "json"
            ) {
              return part;
            }

            const output = part.output.value;

            if (
              !output ||
              typeof output !== "object" ||
              Array.isArray(output) ||
              !("isError" in output) ||
              !("structuredContent" in output) ||
              output.isError
            ) {
              return part;
            }

            const catalog = output.structuredContent;

            if (
              !catalog ||
              typeof catalog !== "object" ||
              Array.isArray(catalog) ||
              !("products" in catalog) ||
              !Array.isArray(catalog.products)
            ) {
              return part;
            }

            return {
              ...part,
              output: {
                ...part.output,
                value: {
                  messages:
                    "messages" in catalog && Array.isArray(catalog.messages)
                      ? catalog.messages
                      : [],
                  pagination:
                    "pagination" in catalog ? catalog.pagination : null,
                  products: catalog.products.map((product) => {
                    if (
                      !product ||
                      typeof product !== "object" ||
                      Array.isArray(product)
                    ) {
                      return product;
                    }

                    return {
                      categories:
                        "categories" in product ? product.categories : [],
                      handle:
                        "handle" in product ? product.handle : null,
                      id: "id" in product ? product.id : null,
                      options:
                        "options" in product ? product.options : [],
                      price_range:
                        "price_range" in product
                          ? product.price_range
                          : null,
                      title:
                        "title" in product ? product.title : null,
                    };
                  }),
                },
              },
            };
          }),
        };
      }),
    };
  },
} satisfies Parameters<typeof wrapLanguageModel>[0]["middleware"];