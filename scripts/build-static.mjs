import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(projectRoot, "dist");
const sitePaths = [
  "index.html", "404.html", "css", "js", "about", "eras", "history", "journey",
  "lectures", "login", "map", "new", "welcome",
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const item of sitePaths) {
  await cp(path.join(projectRoot, item), path.join(output, item), { recursive: true });
}
for (const item of await readdir(path.join(projectRoot, "public"))) {
  await cp(path.join(projectRoot, "public", item), path.join(output, item), { recursive: true });
}
console.log(`Static site written to ${path.relative(projectRoot, output)}`);
