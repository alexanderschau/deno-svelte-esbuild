import { compileSass, type SveltePreprocessorGroup } from "../deps.ts";

export const sassPreprocessor: SveltePreprocessorGroup = {
  style: ({ content, attributes }) => {
    if (!attributes.lang || attributes.lang != "scss") return;
    return {
      code: compileSass(content),
    };
  },
};
