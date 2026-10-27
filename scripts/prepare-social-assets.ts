import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const assets = [
  ...["seenzo", "connect", "tryon", "clinicping", "paramparai", "kliviq", "services"].map((name) => ({
    pointer: `src/assets/og/${name}.jpg.asset.json`,
    target: `public/og/${name}.jpg`,
  })),
  { pointer: "src/assets/paramparai-logo.svg.asset.json", target: "public/og/paramparai-logo.svg" },
];

// Materialise project-owned CDN artwork for static hosts such as Vercel.
await Promise.all(assets.map(async ({ pointer, target }) => {
  const asset = JSON.parse(readFileSync(resolve(pointer), "utf8")) as { project_id: string; url: string };
  const response = await fetch(`https://id-preview--${asset.project_id}.lovable.app${asset.url}`);
  if (!response.ok) throw new Error(`Could not prepare ${target}: ${response.status}`);
  mkdirSync(resolve(target, ".."), { recursive: true });
  writeFileSync(resolve(target), Buffer.from(await response.arrayBuffer()));
}));
console.log(`Prepared ${assets.length} social and brand assets for static hosting`);