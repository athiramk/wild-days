// Usage: npm run add-outing
// Asks a few questions and creates src/content/outings/<date>-<place>.md
import { existsSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = createInterface({ input: stdin, terminal: false });
const lines = rl[Symbol.asyncIterator]();
// Read one line per question. (Pulling from an iterator keeps this working for typed AND pasted/piped answers.)
async function ask(question) {
  stdout.write(question);
  const { value, done } = await lines.next();
  if (done) {
    console.error("\nInput ended before all questions were answered - nothing was created.");
    process.exit(1);
  }
  return value;
}
const today = new Date().toISOString().slice(0, 10);
const TYPES = { h: "hike", hike: "hike", s: "swim", swim: "swim", c: "camp", camp: "camp" };

const validDate = (s) => {
  const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(s);
  if (!m) return false;
  const month = m[2] ? Number(m[2]) : 1;
  const day = m[3] ? Number(m[3]) : 1;
  return month >= 1 && month <= 12 && day >= 1 && day <= 31;
};

let type;
while (!type) {
  type = TYPES[(await ask("Type - (h)ike, (s)wim or (c)amp: ")).trim().toLowerCase()];
  if (!type) console.log("  Please answer h, s or c.");
}

let place = "";
while (!place) place = (await ask("Place: ")).trim();

let date = "";
while (!date) {
  const answer = (await ask(`Date [${today}] (also accepts 2021-03 or 2019): `)).trim() || today;
  if (validDate(answer)) date = answer;
  else console.log("  Use YYYY-MM-DD, YYYY-MM or YYYY.");
}

const note = (await ask("Note (one line; you can edit the file later): ")).trim();
rl.close();

const slug = `${date}-${place.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
let file = `src/content/outings/${slug}.md`;
for (let i = 2; existsSync(file); i++) file = `src/content/outings/${slug}-${i}.md`;

// JSON.stringify gives valid YAML strings (and keeps the date as text, not a date object)
writeFileSync(
  file,
  `---
type: ${type}
place: ${JSON.stringify(place)}
date: ${JSON.stringify(date)}
---
${note}
`,
);
console.log(`\nCreated ${file}\nPreview with: npm run dev   |   Publish: commit and push to main`);
