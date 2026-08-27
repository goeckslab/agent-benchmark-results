import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
assert.match(html, /BixBench Verified-50/);
assert.match(html, /CompBioBench/);
assert.match(html, /Anycode/);
assert.match(html, /Galaxy/);
assert.doesNotMatch(html, /Full results/);
