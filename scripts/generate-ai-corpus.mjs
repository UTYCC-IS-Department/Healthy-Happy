import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const messagesRoot = join(root, "messages");
const generatedRoot = join(root, "src", "generated");
const corpusRoot = join(root, "content", "ai-corpus");
const jsonOutput = join(generatedRoot, "ai-corpus.json");
const markdownOutput = join(corpusRoot, "project-knowledge.md");

const chunks = [];

for (const locale of ["en", "my"]) {
  const localeDir = join(messagesRoot, locale);
  const files = (await readdir(localeDir)).filter((file) => file.endsWith(".json")).sort();
  for (const file of files) {
    const namespace = file.replace(/\.json$/, "");
    const sourcePath = `messages/${locale}/${file}`;
    const data = JSON.parse(await readFile(join(localeDir, file), "utf8"));
    if (namespace === "product") {
      await addProductChunks(locale, data);
      continue;
    }
    if (namespace === "product-detail") {
      continue;
    }
    flattenJson(data).forEach(({ path, value }) => {
      addChunk({
        locale,
        sourcePath,
        contentType: "message",
        title: `${namespace}: ${path}`,
        sectionId: `${namespace}.${path}`,
        text: value,
      });
    });
  }
}

await addSelectedSiteData();

chunks.sort((a, b) =>
  [a.locale, a.contentType, a.sourcePath, a.sectionId].join("|").localeCompare(
    [b.locale, b.contentType, b.sourcePath, b.sectionId].join("|"),
  ),
);

await mkdir(generatedRoot, { recursive: true });
await mkdir(corpusRoot, { recursive: true });
await writeFile(jsonOutput, `${JSON.stringify({ generatedAt: new Date().toISOString(), chunks }, null, 2)}\n`);
await writeFile(markdownOutput, renderMarkdown(chunks));

console.log(`Generated ${chunks.length} AI corpus chunks.`);
console.log(`- ${relative(root, jsonOutput)}`);
console.log(`- ${relative(root, markdownOutput)}`);

async function addProductChunks(locale, productMessages) {
  const detailPath = join(messagesRoot, locale, "product-detail.json");
  const detailMessages = JSON.parse(await readFile(detailPath, "utf8"));
  for (const [productId, listing] of Object.entries(productMessages.products ?? {})) {
    const detail = detailMessages.products?.[productId] ?? {};
    const text = [
      `Name: ${listing.name}`,
      `Series: ${listing.series}`,
      `Description: ${listing.description}`,
      `Ingredients: ${detail.ingredients ?? ""}`,
      `Tags: ${(listing.tags ?? []).join(", ")}`,
      `Price: ${listing.price}`,
    ]
      .filter((line) => !line.endsWith(": "))
      .join("\n");

    addChunk({
      locale,
      sourcePath: `messages/${locale}/product.json`,
      contentType: "product",
      title: listing.name,
      sectionId: `product.${productId}`,
      text,
    });
  }
}

async function addSelectedSiteData() {
  const sourcePath = "src/lib/site-data.ts";
  const source = await readFile(join(root, sourcePath), "utf8");
  const awardsMatch = source.match(/export const awards = \[([\s\S]*?)\];/);
  if (!awardsMatch) return;
  const awards = Array.from(awardsMatch[1].matchAll(/"([^"]+)"/g), (match) => match[1]);
  if (awards.length === 0) return;
  addChunk({
    locale: "en",
    sourcePath,
    contentType: "site-data",
    title: "Awards summary",
    sectionId: "site-data.awards",
    text: awards.join("\n"),
  });
}

function flattenJson(value, path = "") {
  if (typeof value === "string") {
    const clean = value.trim();
    return clean ? [{ path: path || "value", value: clean }] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenJson(item, `${path}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => flattenJson(child, path ? `${path}.${key}` : key));
  }
  return [];
}

function addChunk({ locale, sourcePath, contentType, title, sectionId, text }) {
  const cleanText = text.trim();
  if (!cleanText) return;
  chunks.push({
    id: `${locale}:${sectionId}`,
    locale,
    sourcePath,
    contentType,
    title,
    sectionId,
    text: cleanText,
  });
}

function renderMarkdown(items) {
  const lines = [
    "# Healthy & Happy AI Project Knowledge",
    "",
    "Generated from approved public project content. Do not edit by hand; run `npm run ai:corpus`.",
    "",
  ];
  for (const chunk of items) {
    lines.push(
      `## ${chunk.title}`,
      "",
      `- id: ${chunk.id}`,
      `- locale: ${chunk.locale}`,
      `- contentType: ${chunk.contentType}`,
      `- sourcePath: ${chunk.sourcePath}`,
      `- sectionId: ${chunk.sectionId}`,
      "",
      chunk.text,
      "",
    );
  }
  return `${lines.join("\n")}\n`;
}
