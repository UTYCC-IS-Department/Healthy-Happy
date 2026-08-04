import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const messagesRoot = join(process.cwd(), "messages");
const [englishFiles, burmeseFiles] = await Promise.all([
  readdir(join(messagesRoot, "en")),
  readdir(join(messagesRoot, "my")),
]);

const expected = englishFiles.filter((file) => file.endsWith(".json")).sort();
const actual = burmeseFiles.filter((file) => file.endsWith(".json")).sort();

if (expected.join("|") !== actual.join("|")) {
  throw new Error(`Locale namespace mismatch. English: ${expected.join(", ")}; Burmese: ${actual.join(", ")}`);
}

for (const file of expected) {
  const [english, burmese] = await Promise.all([
    readJson(join(messagesRoot, "en", file)),
    readJson(join(messagesRoot, "my", file)),
  ]);
  assertShape(english, burmese, file);
}

console.log(`Validated ${expected.length} English/Burmese message namespaces.`);

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function assertShape(expectedValue, actualValue, path) {
  if (Array.isArray(expectedValue) || Array.isArray(actualValue)) {
    if (!Array.isArray(expectedValue) || !Array.isArray(actualValue) || expectedValue.length !== actualValue.length) {
      throw new Error(`${path}: array shape does not match English`);
    }
    expectedValue.forEach((value, index) => assertShape(value, actualValue[index], `${path}[${index}]`));
    return;
  }
  if (isRecord(expectedValue) || isRecord(actualValue)) {
    if (!isRecord(expectedValue) || !isRecord(actualValue)) throw new Error(`${path}: value type does not match English`);
    const expectedKeys = Object.keys(expectedValue).sort();
    const actualKeys = Object.keys(actualValue).sort();
    if (expectedKeys.length !== actualKeys.length || expectedKeys.some((key, index) => key !== actualKeys[index])) {
      throw new Error(`${path}: keys do not match English`);
    }
    expectedKeys.forEach((key) => assertShape(expectedValue[key], actualValue[key], `${path}.${key}`));
    return;
  }
  if (typeof expectedValue !== typeof actualValue) throw new Error(`${path}: value type does not match English`);
}

function isRecord(value) {
  return typeof value === "object" && value !== null;
}
