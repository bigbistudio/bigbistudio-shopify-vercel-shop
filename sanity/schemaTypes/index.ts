import { type SchemaTypeDefinition } from "sanity";

import {
  collectionCtaType,
  editorialImageType,
  imageTextSplitType,
  richTextSectionType,
} from "./article-blocks";
import { postType } from "./postType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionCtaType, editorialImageType, imageTextSplitType, postType, richTextSectionType],
};
