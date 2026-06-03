# codex-dia

Dia browser automation skill for the Codex app.

This lets Codex work with the Dia browser through the Codex Chrome Extension, similar to how the bundled Chrome plugin works with Chrome. It is a skill, not a replacement browser plugin.

## Install

Install the Chrome plugin in Codex first, then ensure the Codex Chrome Extension is installed and enabled in Dia.

Install this skill with:

```bash
npx skills add neilsanghrajka/codex-dia@dia
```

Then restart Codex or reload skills and use `@dia` in a prompt.

## Validate

Run the skill guard before publishing changes:

```bash
node scripts/validate-skill.mjs
```

The guard prevents version-pinned bundled plugin cache paths from being reintroduced.

## Manual Install

Copy `dia/SKILL.md` to:

```text
~/.codex/skills/dia/SKILL.md
```
