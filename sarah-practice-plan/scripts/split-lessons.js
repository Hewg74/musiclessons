#!/usr/bin/env node
/**
 * split-lessons.js
 *
 * Splits monolithic lesson data files into one-file-per-level.
 * Each level gets its own file with proper imports.
 * Creates an index.js that re-exports the full array.
 *
 * Usage: node scripts/split-lessons.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, "..", "src", "data");

// Slugify a title for filename
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Check if a level object string uses getPitchRange
function usesPitchRange(code) {
  return code.includes("getPitchRange");
}

/**
 * Parse a monolithic lesson file and split it into per-level files.
 *
 * Strategy: We parse the JS file as text, finding each level object
 * by matching the array structure. We use brace-counting to extract
 * each top-level object from the exported array.
 */
function splitFile(config) {
  const { filename, exportName, levelField } = config;
  const srcPath = join(DATA_DIR, filename);

  if (!existsSync(srcPath)) {
    console.log(`  Skipping ${filename} — file not found`);
    return;
  }

  const src = readFileSync(srcPath, "utf-8");
  console.log(`\nProcessing ${filename} (${src.split("\n").length} lines)...`);

  // Find the export statement and extract the array contents
  const exportPattern = new RegExp(
    `export\\s+const\\s+${exportName}\\s*=\\s*\\[`
  );
  const match = exportPattern.exec(src);
  if (!match) {
    console.error(`  ERROR: Could not find 'export const ${exportName} = ['`);
    return;
  }

  // Extract everything before the export (imports, comments)
  const preamble = src.substring(0, match.index).trim();

  // Find matching closing bracket using brace counting
  const arrayStart = match.index + match[0].length;
  let depth = 1; // we're inside the opening [
  let pos = arrayStart;

  // Extract each top-level object from the array
  const levels = [];
  let objectStart = -1;
  let objectDepth = 0;
  let inString = false;
  let stringChar = "";
  let escaped = false;

  while (pos < src.length && depth > 0) {
    const ch = src[pos];

    if (escaped) {
      escaped = false;
      pos++;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      pos++;
      continue;
    }

    if (inString) {
      if (ch === stringChar) {
        inString = false;
      }
      pos++;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      stringChar = ch;
      pos++;
      continue;
    }

    // Skip line comments
    if (ch === "/" && pos + 1 < src.length && src[pos + 1] === "/") {
      while (pos < src.length && src[pos] !== "\n") pos++;
      continue;
    }

    if (ch === "{") {
      if (objectDepth === 0 && depth === 1) {
        objectStart = pos;
      }
      objectDepth++;
      depth++;
    } else if (ch === "}") {
      objectDepth--;
      depth--;
      if (objectDepth === 0 && depth === 1 && objectStart >= 0) {
        // Found a complete top-level object
        const objectCode = src.substring(objectStart, pos + 1);
        levels.push(objectCode);
        objectStart = -1;
      }
    } else if (ch === "[") {
      depth++;
    } else if (ch === "]") {
      depth--;
    }

    pos++;
  }

  console.log(`  Found ${levels.length} levels`);

  // Create directory
  const dirName = filename.replace(".js", "");
  const dirPath = join(DATA_DIR, dirName);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  // Extract level metadata from each object
  const levelMeta = levels.map((code, i) => {
    // Extract level number
    const levelMatch = code.match(new RegExp(`${levelField}:\\s*(\\d+)`));
    const levelNum = levelMatch ? parseInt(levelMatch[1]) : i + 1;

    // Extract title
    const titleMatch = code.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : `Level ${levelNum}`;

    const slug = slugify(title);
    const paddedNum = String(levelNum).padStart(2, "0");
    const levelFileName = `level-${paddedNum}-${slug}.js`;
    const varName = `level${levelNum}`;
    const needsPitchRange = usesPitchRange(code);

    return { levelNum, title, slug, levelFileName, varName, code, needsPitchRange };
  });

  // Write each level file
  for (const meta of levelMeta) {
    const importLine = meta.needsPitchRange
      ? 'import { getPitchRange } from "../appData.js";\n\n'
      : "";

    // Clean up indentation — the object was inside an array, so remove 2 spaces of indent
    let cleanCode = meta.code;
    // Remove leading 2-space indent from each line (the array indent)
    cleanCode = cleanCode.replace(/^  /gm, "");

    const fileContent = `${importLine}export const ${meta.varName} = ${cleanCode};\n`;
    const filePath = join(dirPath, meta.levelFileName);
    writeFileSync(filePath, fileContent, "utf-8");
    console.log(`  Wrote ${meta.levelFileName} (${meta.varName}, ${meta.needsPitchRange ? "uses getPitchRange" : "no getPitchRange"})`);
  }

  // Write index.js
  const imports = levelMeta
    .map((m) => `import { ${m.varName} } from "./${m.levelFileName}";`)
    .join("\n");
  const arrayItems = levelMeta.map((m) => `  ${m.varName}`).join(",\n");
  const indexContent = `${imports}\n\nexport const ${exportName} = [\n${arrayItems}\n];\n`;

  writeFileSync(join(dirPath, "index.js"), indexContent, "utf-8");
  console.log(`  Wrote index.js`);

  // Delete the old monolithic file
  unlinkSync(srcPath);
  console.log(`  Deleted ${filename}`);

  return { dirName, exportName };
}

// Update App.jsx imports
function updateAppImports(splits) {
  const appPath = join(__dirname, "..", "src", "App.jsx");
  let app = readFileSync(appPath, "utf-8");

  for (const { dirName, exportName } of splits) {
    const oldImport = `'./data/${dirName}.js'`;
    const newImport = `'./data/${dirName}/index.js'`;
    app = app.replace(oldImport, newImport);
  }

  writeFileSync(appPath, app, "utf-8");
  console.log(`\nUpdated App.jsx imports`);
}

// Main
console.log("=== Lesson File Splitter ===\n");

const configs = [
  {
    filename: "singerSongwriter.js",
    exportName: "SINGER_SONGWRITER_LEVELS",
    levelField: "level",
  },
  {
    filename: "guitarStudy.js",
    exportName: "GUITAR_STUDY",
    levelField: "level",
  },
  {
    filename: "vocalLevels.js",
    exportName: "VOCAL_LEVELS",
    levelField: "num",
  },
];

const results = [];
for (const config of configs) {
  const result = splitFile(config);
  if (result) results.push(result);
}

if (results.length > 0) {
  updateAppImports(results);
}

console.log("\n=== Done! Run 'npx vite build' to verify. ===");
