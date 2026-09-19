import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, "..", "dist");
await mkdir(outDir, { recursive: true });
await writeFile(
  join(outDir, "build-info.json"),
  JSON.stringify({
    package: "@bunny-rabbit/edge",
    note: "Dry-run wrangler bundle skipped; run wrangler deploy in CI with Cloudflare credentials.",
    builtAt: new Date().toISOString(),
  }),
  "utf8",
);
console.log("edge stub build ok → workers/edge/dist/build-info.json");
