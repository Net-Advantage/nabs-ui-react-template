/** @vitest-environment node */

import path from "path";
import { readdir, readFile, stat } from "fs/promises";
import { describe, expect, test } from "vitest";

const repositoryRoot = process.cwd();
const srcRoot = path.join(repositoryRoot, "src");
const viewModelsRoot = path.join(srcRoot, "ShellComponents");

async function walkFiles(directoryPath: string): Promise<string[]> {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(entryPath);
      }
      return [entryPath];
    })
  );

  return nested.flat();
}

describe("MVVM project structure", () => {
  test("has a src/ShellComponents folder", async () => {
    const folderInfo = await stat(viewModelsRoot);
    expect(folderInfo.isDirectory()).toBe(true);
  });

  test("uses .view-model.ts naming for all view model files", async () => {
    const files = await walkFiles(viewModelsRoot);

    expect(files.length).toBeGreaterThan(0);
    expect(files.every((filePath) => filePath.endsWith(".view-model.ts"))).toBe(true);
  });

  test("keeps React imports out of view models", async () => {
    const files = await walkFiles(viewModelsRoot);
    const fileContents = await Promise.all(
      files.map(async (filePath) => ({
        filePath,
        content: await readFile(filePath, "utf8"),
      }))
    );

    const filesImportingReact = fileContents.filter(
      ({ content }) =>
        content.includes("from \"react\"") ||
        content.includes("from 'react'") ||
        content.includes("react/")
    );

    expect(filesImportingReact).toEqual([]);
  });

  test("exports classes with ViewModel suffix", async () => {
    const files = await walkFiles(viewModelsRoot);
    const fileContents = await Promise.all(files.map((filePath) => readFile(filePath, "utf8")));

    const allMatchNamingPattern = fileContents.every((content) =>
      /export\s+class\s+[A-Za-z0-9]+ViewModel\b/.test(content)
    );

    expect(allMatchNamingPattern).toBe(true);
  });
});
