import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const compiledEntrypoint = path.resolve(currentDir, "../dist/index.js");

if (!existsSync(compiledEntrypoint)) {
  throw new Error(
    "Compiled backend entrypoint not found. Run `npm run build` before `node src/index.js`, or update the start command to `npm start`.",
  );
}

await import(pathToFileURL(compiledEntrypoint).href);
