export * as esbuild from "https://denopkg.dev/gh/esbuild/deno-esbuild@v0.14.14/mod.js";
export * as svelteCompiler from "https://cdn.jsdelivr.net/npm/svelte@3.46.3/compiler.mjs";
export type { PreprocessorGroup as SveltePreprocessorGroup } from "https://cdn.jsdelivr.net/npm/svelte@3.46.3/types/compiler/preprocess/types.d.ts";
export { denoPlugin } from "https://denopkg.dev/gh/alexanderschau/esbuild_deno_loader@fix/update-dependencies/mod.ts";
export {
  dirname,
  fromFileUrl,
  resolve,
  toFileUrl,
} from "https://deno.land/std@0.123.0/path/mod.ts";

export { compile as compileSass } from "https://denopkg.dev/gh/littledivy/deno_sass2@1.0.0/mod.ts";
