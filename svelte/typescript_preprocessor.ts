import { esbuild, type SveltePreprocessorGroup } from "../deps.ts";

export const typescriptPreprocessor: SveltePreprocessorGroup = {
  script: async ({ content }) => {
    const res = await esbuild.transform(content, { loader: "ts" });
    return {
      code: res.code,
    };
  },
};
