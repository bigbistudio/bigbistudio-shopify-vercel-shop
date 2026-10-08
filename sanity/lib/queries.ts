import { defineQuery } from "next-sanity";

export const postQuery = defineQuery(`
    *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt
    }    
`)