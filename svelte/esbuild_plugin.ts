import {
  dirname,
  esbuild,
  fromFileUrl,
  resolve,
  svelteCompiler,
  toFileUrl,
} from "../deps.ts";
import { typescriptPreprocessor } from "./typescript_preprocessor.ts";
import { sassPreprocessor } from "./sass_preprocessor.ts";

const compile = async (source: string): Promise<string> => {
  const res = await svelteCompiler.preprocess(source, [
    typescriptPreprocessor,
    sassPreprocessor,
  ]);
  const resp = svelteCompiler.compile(res.code, {
    sveltePath: "svelte-pkg",
    format: "esm",
  });

  if (!resp.js) {
    return "";
  }

  const code = resp.js?.code.replaceAll(
    /import ((?:.|\n)+) from ["']svelte-pkg\/((?:[^"']+\/)?[^."']*)(?:\/)?["']/g,
    'import $1 from "https://cdn.jsdelivr.net/npm/svelte@3.46.3/$2/index.js"',
  );

  return code;
};

export const sveltePlugin: esbuild.Plugin = {
  name: "svelte",
  setup: (build) => {
    build.onResolve({ filter: /\.svelte$/ }, (args) => {
      const path = toFileUrl(
        resolve(dirname(fromFileUrl(args.importer)), args.path),
      ).toString();
      return {
        path: path,
        namespace: "svelte-ns",
      };
    });

    build.onLoad(
      { filter: /\.svelte$/, namespace: "svelte-ns" },
      async (args) => {
        const source = Deno.readFileSync(fromFileUrl(args.path));
        const code = await compile(new TextDecoder().decode(source));

        return {
          contents: code,
          loader: "js",
        };
      },
    );
  },
};
