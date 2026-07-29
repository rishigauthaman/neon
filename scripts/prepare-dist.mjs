import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const distDir = join(root, "dist");

if (!existsSync(outDir)) {
  throw new Error("Expected Next static export in ./out");
}

rmSync(distDir, { recursive: true, force: true });
cpSync(outDir, distDir, { recursive: true });
mkdirSync(join(distDir, "server"), { recursive: true });
mkdirSync(join(distDir, ".openai"), { recursive: true });
cpSync(join(root, ".openai", "hosting.json"), join(distDir, ".openai", "hosting.json"));
writeFileSync(
  join(distDir, "server", "index.js"),
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    if (!url.pathname.includes(".")) {
      return env.ASSETS.fetch(new Request(new URL("/index.html", url), request));
    }

    return assetResponse;
  }
};
`
);
