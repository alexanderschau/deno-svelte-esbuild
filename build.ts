import { denoPlugin, esbuild } from "./deps.ts";
import { sveltePlugin } from "./svelte/esbuild_plugin.ts";

export const buildApp = async (entryFile: string, outFile?: string) => {
  await esbuild.build({
    entryPoints: [entryFile],
    outfile: outFile || "./dist/out.js",
    format: "esm",
    bundle: true,
    minify: true,
    plugins: [sveltePlugin, denoPlugin()],
  });
};
