// Make the AI Judge Laugh: the Office Joke Open
// One line of office comedy, at most 200 characters.
// Entry: "Our 9 a.m. sync on 'reducing unnecessary meetings' ran 45 minutes
// over, so we scheduled a recurring weekly follow-up."
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Our 9 a.m. sync on 'reducing unnecessary meetings' ran 45 minutes over, so we scheduled a recurring weekly follow-up.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("entry must be a single clean line");
}
if (/[\t\r]/.test(LINE) || LINE.includes("  ")) {
  throw new Error("entry must not contain tabs, carriage returns or double spaces");
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what we wrote is exactly the line, no trailing newline.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
console.log(`wrote entry.txt (${chars} chars, 1 line)`);
