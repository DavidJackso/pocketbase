// ui/scripts/check-i18n.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname;
const STRING_RE = /"[A-Z][a-zA-Z0-9 ,.!?':/-]{3,60}"/g;

// same exclusions as Task 3 rule 2, encoded as substrings to skip
const ALLOWED_SUBSTRINGS = ["TEXT", "JSON", "JavaScript", "Rust", "TypeScript", "PHP", "Go", "Dart", "Python"];

function walk(dir, out = []) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
            walk(full, out);
        } else if (entry.endsWith(".js") && !entry.startsWith("locales")) {
            out.push(full);
        }
    }
    return out;
}

let failures = 0;
for (const file of walk(ROOT)) {
    const content = readFileSync(file, "utf8");
    const matches = content.match(STRING_RE) || [];
    for (const m of matches) {
        if (ALLOWED_SUBSTRINGS.some((allowed) => m.includes(allowed))) continue;
        console.error(`${file}: possible untranslated string: ${m}`);
        failures++;
    }
}

if (failures > 0) {
    console.error(`\n${failures} possible untranslated string(s) found.`);
    process.exit(1);
}
console.log("i18n check passed.");
