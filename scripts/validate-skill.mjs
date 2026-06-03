import { readFile } from "node:fs/promises";

const skillPath = new URL("../dia/SKILL.md", import.meta.url);
const skill = await readFile(skillPath, "utf8");

const requiredSnippets = [
  "/Users/neilsanghrajka/.codex/plugins/cache/openai-bundled/chrome/latest",
  "/Users/neilsanghrajka/.codex/plugins/cache/openai-bundled/chrome/latest/scripts/browser-client.mjs",
  "This script checks every usable profile in the configured browser user-data root",
];

const forbiddenPatterns = [
  {
    pattern: /\.codex\/plugins\/cache\/openai-bundled\/(?:browser|chrome)\/\d+\.\d+\.\d+/,
    reason: "Do not pin bundled plugin cache versions; use chrome/latest so plugin upgrades do not break Dia.",
  },
  {
    pattern: /openai-bundled\/browser\//,
    reason: "Do not import browser-client from the Browser plugin cache; mirror Chrome's current plugin-root import.",
  },
  {
    pattern: /trusted Browser plugin client/i,
    reason: "Dia should refer to the trusted Chrome plugin client, not a version-pinned Browser plugin client.",
  },
];

const failures = [];

for (const snippet of requiredSnippets) {
  if (!skill.includes(snippet)) {
    failures.push(`Missing required snippet: ${snippet}`);
  }
}

for (const { pattern, reason } of forbiddenPatterns) {
  if (pattern.test(skill)) {
    failures.push(`${reason} Matched: ${pattern}`);
  }
}

if (failures.length > 0) {
  console.error("Dia skill validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Dia skill validation passed.");
