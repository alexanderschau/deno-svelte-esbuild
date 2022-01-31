import { esbuild, type SveltePreprocessorGroup } from "../deps.ts";

export const typescriptPreprocessor: SveltePreprocessorGroup = {
  script: async ({ content, attributes }) => {
    if (!attributes.lang || attributes.lang != "ts") return;
    const res = await esbuild.transform(content, { loader: "ts" });
    return {
      code: res.code,
    };
  },
};
