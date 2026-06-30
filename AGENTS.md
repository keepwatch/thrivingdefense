# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## What this is

**Thriving Defense** is a detection engineering knowledge base authored by Jordan Anderson, published at `thrivingdefense.com`. Content lives in `/content/` as Markdown files managed in Obsidian. The site is built with Quartz v4 (a static site generator); the framework lives in `/quartz/` and is largely upstream — most work happens in `/content/`.

## Site commands

```bash
npx quartz build --serve   # build and preview locally with hot reload (port 8080)
npx quartz build           # production build to /public/
npm run check              # type check + prettier check
npm run format             # auto-format
```

## Content structure

```
content/
  index.md              # site landing page; describes content clusters and guiding principles
  principles/           # foundational beliefs about detection engineering
  methodology/          # actionable how-to content derived from principles
  reference/            # external concepts referenced across the site (MITRE, frameworks, etc.)
  people/               # author and collaborator bios
  templates/            # Obsidian templates (not published)
```

## Frontmatter schema

Every content file uses this frontmatter:

```yaml
---
tags:
  - author/Jordan_Anderson   # authorship tag
  - type/article             # type/article | type/stub | type/person
  - theme/validation         # thematic cluster (validation, coverage, etc.)
title: Page Title
aliases:
created: YYYY-MM-DD
draft: false                 # true = excluded from build
promoted: false              # true = featured content
---
```

- `draft: true` keeps a page out of the published site
- Pages tagged `type/stub` are placeholders with minimal content — intentional, not errors
- Content is human-authored; AI may assist with editing but should not generate substantive claims

## Content principles

The site argues that detection engineering is stuck in "survival mode" due to impossible standards around ATT&CK coverage. Core ideas that run through the content:

- **MITRE ATT&CK is not designed for detection** — it documents attacker behavior, not what defenders can reliably detect
- **MITRE ATT&CK is not flat** — coverage must be assessed per technique × platform (or product), not just by technique
- **Yielding techniques** — some ATT&CK techniques should be deliberately skipped (yielded) in favor of opportunistic detection only, because intent cannot be reliably identified or the technique scope is too broad (e.g. T1059 Command and Scripting Interpreter)
- **TIDE** (Test-Initiated Detection Engineering) — write validation tests before writing detection rules, borrowed from TDD
- **TRR** (Technique Research Report) — structured procedure-level research that grounds detection in specific, detectable behaviors rather than broad technique labels
- **ACRE** (ATT&CK Coverage Ratio Evaluation) — a platform-aware alternative to heatmaps for measuring detection coverage

## Wikilinks and cross-references

Content uses Obsidian-style wikilinks (`[[Page Title]]` or `[[Page Title|display text]]`). Link resolution is set to `shortest` path. When adding links, match the exact filename (without `.md`) or use an alias defined in the target page's frontmatter. Broken links are expected for stub pages.

## Tags

Tags follow two namespacing conventions:
- `type/` — content type: `article`, `stub`, `person`
- `theme/` — thematic cluster: `validation`, `coverage`, etc.
- `author/` — author identity

## What not to change

- Do not modify files under `quartz/` unless the task is specifically about the site framework
- Do not alter the `templates/` files without understanding they are Obsidian template syntax (`{{Title}}`, `{{date}}`)
- Do not set `draft: false` on stub pages without adding substantive content
