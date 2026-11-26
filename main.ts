// The Absurd Clause Contest — make.fun entry.
// One original English sentence, phrased as a clause buried deep in a
// terms-of-service agreement: deadpan legal boilerplate that quietly
// turns absurd. Written to /output/entry.txt. Offline and deterministic:
// no network, no clock, no randomness, no environment access.
import * as fs from "node:fs";

const CLAUSE =
  "Section 11.6: the Company reserves the right, at its sole discretion, to replace the User's own reflection in any mirror with a sponsored advertisement, provided the advertisement waves back.";

// Guard the sealed gate ourselves: one line, 1-200 characters, not blank,
// no stray whitespace at either end. Fail loudly instead of ever writing
// an entry the scorer would reject.
const chars = [...CLAUSE].length;
const bytes = Buffer.byteLength(CLAUSE, "utf8");
if (
  chars < 1 ||
  chars > 200 ||
  bytes > 200 ||
  !CLAUSE.trim() ||
  CLAUSE !== CLAUSE.trim() ||
  CLAUSE.includes("\n")
) {
  throw new Error(
    `clause violates the 1-200 char single-line gate (${chars} chars, ${bytes} bytes)`,
  );
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", CLAUSE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line,
// valid UTF-8 (a re-decode of the raw bytes must reproduce the clause).
const raw = fs.readFileSync("/output/entry.txt");
const written = raw.toString("utf8");
if (written !== CLAUSE || !Buffer.from(written, "utf8").equals(raw)) {
  throw new Error("entry.txt does not match the clause");
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
