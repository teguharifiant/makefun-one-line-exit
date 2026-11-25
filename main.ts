import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a one-sentence resignation letter from an IT support desk.
export const ENTRY =
  "I hereby resign from IT support: I have turned it off and on again, and it turns out the thing that needed restarting was my career.";

const MAX_CHARS = 140;
const PRINTABLE_LOW = 0x20; // space
const PRINTABLE_HIGH = 0x7e; // tilde

/** Length in Unicode code points, so astral characters count as one. */
function codePointLength(value: string): number {
  let total = 0;
  for (const _ch of value) total += 1;
  return total;
}

function fail(why: string): never {
  throw new Error(`One-Line Exit: entry failed validation — ${why}`);
}

/** The first character outside printable ASCII, or undefined when all pass. */
function firstNonPrintable(value: string): string | undefined {
  for (const ch of value) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp < PRINTABLE_LOW || cp > PRINTABLE_HIGH) return ch;
  }
  return undefined;
}

/** One gate in the checklist. `test` returns true when the entry passes. */
interface Gate {
  label: string;
  test: (text: string) => boolean;
  detail: (text: string) => string;
}

/** Every rule the bounty asks for, as data instead of nested ifs. */
const GATES: Gate[] = [
  {
    label: "length",
    test: (text) => codePointLength(text) >= 1 && codePointLength(text) <= MAX_CHARS,
    detail: (text) =>
      `entry is ${codePointLength(text)} code points; it must be between 1 and ${MAX_CHARS}`,
  },
  {
    label: "printable-ascii",
    test: (text) => firstNonPrintable(text) === undefined,
    detail: (text) => {
      const bad = firstNonPrintable(text) as string;
      return `character ${JSON.stringify(bad)} (U+${(bad.codePointAt(0) as number).toString(16).toUpperCase().padStart(4, "0")}) is outside printable ASCII`;
    },
  },
  {
    label: "single-line",
    test: (text) => !text.includes("\n") && !text.includes("\r"),
    detail: () => "entry spans more than one line",
  },
  {
    label: "no-edge-whitespace",
    test: (text) => text === text.trim(),
    detail: () => "entry begins or ends with whitespace",
  },
  {
    label: "not-blank",
    test: (text) => text.trim().length > 0,
    detail: () => "entry is only whitespace",
  },
];

/** Run every gate in order; the first failure stops the run. */
function auditEntry(text: string): void {
  for (const gate of GATES) {
    if (!gate.test(text)) {
      fail(`${gate.label}: ${gate.detail(text)}`);
    }
  }
}

function outputFolder(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  return dir && dir.length > 0 ? dir : "/output";
}

function run(): void {
  auditEntry(ENTRY);
  const folder = outputFolder();
  mkdirSync(folder, { recursive: true });
  const destination = join(folder, "entry.txt");
  writeFileSync(destination, ENTRY, "utf8");
  console.log(
    `One-Line Exit: wrote ${codePointLength(ENTRY)}-character entry (${GATES.length} gates passed) to ${destination}`,
  );
}

run();
