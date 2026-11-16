import "server-only";
import { hasLocale, type Locale } from "./config";

const namespacePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Loads one page's messages from messages/<locale>/<namespace>.json.
 * Keep this in Server Components so browser bundles only receive rendered copy.
 */
export async function getMessages<T extends object>(locale: Locale, namespace: string): Promise<T> {
  if (!hasLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  if (!namespacePattern.test(namespace)) {
    throw new Error(`Invalid message namespace: ${namespace}`);
  }

  try {
    const [english, selected] = await Promise.all([
      import(`../../messages/en/${namespace}.json`).then((module) => module.default),
      import(`../../messages/${locale}/${namespace}.json`).then((module) => module.default),
    ]);
    assertMatchingMessageShape(english, selected, `messages/${locale}/${namespace}.json`);
    return selected as T;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Invalid translation structure")) {
      throw error;
    }
    throw new Error(`Missing messages/${locale}/${namespace}.json`, { cause: error });
  }
}

function assertMatchingMessageShape(expected: unknown, actual: unknown, path: string): void {
  if (Array.isArray(expected) || Array.isArray(actual)) {
    if (!Array.isArray(expected) || !Array.isArray(actual) || expected.length !== actual.length) {
      throw new Error(`Invalid translation structure at ${path}: array shape does not match English`);
    }
    expected.forEach((value, index) => assertMatchingMessageShape(value, actual[index], `${path}[${index}]`));
    return;
  }

  if (isRecord(expected) || isRecord(actual)) {
    if (!isRecord(expected) || !isRecord(actual)) {
      throw new Error(`Invalid translation structure at ${path}: expected ${describe(expected)}`);
    }
    const expectedKeys = Object.keys(expected).sort();
    const actualKeys = Object.keys(actual).sort();
    if (expectedKeys.length !== actualKeys.length || expectedKeys.some((key, index) => key !== actualKeys[index])) {
      throw new Error(`Invalid translation structure at ${path}: keys do not match English`);
    }
    expectedKeys.forEach((key) => assertMatchingMessageShape(expected[key], actual[key], `${path}.${key}`));
    return;
  }

  if (typeof expected !== typeof actual) {
    throw new Error(`Invalid translation structure at ${path}: expected ${describe(expected)}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function describe(value: unknown) {
  return Array.isArray(value) ? "array" : typeof value;
}
