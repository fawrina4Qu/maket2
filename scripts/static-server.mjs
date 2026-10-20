import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rootArgument = process.argv.find((argument) => argument.startsWith("--root="))?.slice(7)
  ?? (process.argv.includes("--root") ? process.argv[process.argv.indexOf("--root") + 1] : null);
const root = path.resolve(projectRoot, rootArgument ?? ".");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://static.local").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const requestedPath = path.resolve(root, `.${pathname}`);
  if (requestedPath !== root && !requestedPath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  let filePath = requestedPath;
  try {
    if ((await stat(filePath)).isDirectory()) filePath = path.join(filePath, "index.html");
    await access(filePath);
  } catch {
    const publicPath = path.resolve(root, "public", `.${pathname}`);
    try {
      if (!publicPath.startsWith(`${path.join(root, "public")}${path.sep}`)) throw new Error("Invalid asset path");
      filePath = publicPath;
      await access(filePath);
    } catch {
      filePath = path.join(root, "404.html");
      response.statusCode = 404;
    }
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    response.setHeader("Content-Type", contentTypes[path.extname(filePath)] ?? "application/octet-stream");
    response.setHeader("Content-Length", fileStat.size);
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(Number(process.env.PORT ?? 8080), "0.0.0.0");
