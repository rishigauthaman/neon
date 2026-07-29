import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const distDir = join(root, "dist");

if (!existsSync(outDir)) {
  throw new Error("Expected Next static export in ./out");
}

rmSync(distDir, { recursive: true, force: true });
cpSync(outDir, distDir, { recursive: true });
