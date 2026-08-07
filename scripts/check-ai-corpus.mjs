import { readFile } from "node:fs/promises";
import { join } from "node:path";

const corpus = JSON.parse(await readFile(join(process.cwd(), "src", "generated", "ai-corpus.json"), "utf8"));

if (!Array.isArray(corpus.chunks) || corpus.chunks.length === 0) {
  throw new Error("AI corpus has no chunks. Run npm run ai:corpus.");
}

const required = ["id", "locale", "sourcePath", "contentType", "title", "sectionId", "text"];
for (const chunk of corpus.chunks) {
  for (const key of required) {
    if (typeof chunk[key] !== "string" || chunk[key].trim() === "") {
      throw new Error(`AI corpus chunk ${chunk.id ?? "<unknown>"} is missing ${key}.`);
    }
  }
  if (chunk.text.includes("\uFFFD")) {
    throw new Error(`AI corpus chunk ${chunk.id} contains replacement characters.`);
  }
}

const burmeseChunks = corpus.chunks.filter((chunk) => chunk.locale === "my");
if (burmeseChunks.length === 0 || !burmeseChunks.some((chunk) => /[\u1000-\u109F]/.test(chunk.text))) {
  throw new Error("AI corpus does not contain Unicode Burmese text.");
}

console.log(`Validated ${corpus.chunks.length} AI corpus chunks, including ${burmeseChunks.length} Burmese chunks.`);
