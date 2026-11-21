import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
copyFileSync(src, dst);
// Post-copy verification: the written output must be byte-identical to the
// source poster. A truncated or partial copy would otherwise pass silently.
const srcSize = statSync(src).size;
const dstSize = statSync(dst).size;
if (dstSize !== srcSize) {
  throw new Error(`entry.png copy mismatch: wrote ${dstSize} bytes, expected ${srcSize}`);
}
console.log(`wrote ${dst} (${dstSize} bytes)`);
