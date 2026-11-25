// The One-Line Exit — entry for make.fun bounty
// u-kreutzx-the-one-line-exit-1dc652d1
//
// The entry is a one-line resignation letter from an IT support worker:
// it opens with the classic "turn it off and on again" and lands the
// punch on the one thing that actually needed restarting — the career.
// Total entry: 1-140 characters (counted by code points), ASCII only,
// single line, no leading/trailing whitespace, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ENTRY: string =
  "I hereby resign from IT support: I have turned it off and on again, and it turns out the thing that needed restarting was my career.";

/**
 * Validate an entry against the bounty gates:
 * - 1-140 characters, counted by code points
 * - not only whitespace
 * - no leading or trailing whitespace
 * - exactly one line (no "\n", no "\r")
 * - printable ASCII only (no control characters, no non-ASCII)
 *
 * Each gate lives in its own helper so a failure names the exact rule
 * that was broken, and validateEntry reads as the checklist itself.
 */
function fail(message: string): never {
  throw new Error(message);
}

function assertLength(text: string): void {
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 140) {
    fail(`entry must be 1-140 characters, got ${codePoints} code points`);
  }
}

function assertNotBlank(text: string): void {
  if (text.trim() === "") {
    fail("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    fail("entry must not have leading or trailing whitespace");
  }
}

function assertSingleLine(text: string): void {
  if (text.includes("\r")) {
    fail("entry must not contain carriage returns");
  }
  if (text.includes("\n")) {
    fail("entry must be a single line");
  }
}

function assertPrintableAscii(text: string): void {
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code > 127) {
      fail("entry must be ASCII only");
    }
    if (code < 32 || code === 127) {
      fail("entry must not contain control characters");
    }
  }
}

export function validateEntry(text: string): void {
  assertLength(text);
  assertNotBlank(text);
  assertSingleLine(text);
  assertPrintableAscii(text);
}

function main(): void {
  validateEntry(ENTRY);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
}

main();
