---
name: om-humanize
description: Voice-calibrated editing for making AI-drafted or overly polished text sound like the author. Use when asked to humanize, de-AI, voice-match, rewrite a social post, or make writing sound more natural while preserving meaning, links, frontmatter, and Markdown structure.
---

# OM Humanize

## Overview

Edit text to match the author's actual voice. This is voice calibration, not a generic "remove AI words" pass: learn how the author writes, then revise only enough to make the target text feel native to that voice.

## Workflow

### 1. Load Voice Samples

Read 2-3 recent notes the author actually wrote or heavily edited. For Thriving Defense, prefer posts in `methodology/` and `principles/` with the same purpose and audience as the target text. Extract the voice fingerprint:

- Sentence length and rhythm
- Punctuation habits
- How sections or arguments open
- How the author qualifies claims
- Ratio of direct to hedged language
- Natural use of fragments, parentheses, emphasis, and asides

### 2. Read The Target

Read the draft, excerpt, or requested output. Detect context from folder, frontmatter, and user request:

- Blog posts: professional, direct, idea-led, grounded in detection engineering.
- LinkedIn previews: conversational and specific, with a recognizable point of view; no content-marketing polish.
- Reviews or summaries: concise, useful, and human; preserve factual precision.

### 3. Rewrite

Use the author's voice while preserving the core meaning. Prefer:

- Direct statements over hedge stacking.
- Sharp observations over softened abstractions.
- Concrete stakes over generic value propositions.
- Natural rhythm over symmetrical, polished paragraph shapes.
- Shorter text when the long version only adds padding.

Avoid:

- "Notably", "significantly", "demonstrates", "leveraged", "facilitated".
- "It's worth noting that..." and other empty throat-clearing.
- "This showcases..." and similar commentary on the writing itself.
- Rhetorical questions immediately answered by the next sentence.
- Bullet walls or repeated sentence patterns unless the author naturally uses them.
- Passive voice where active voice is more natural.

Preserve untouched unless explicitly asked otherwise:

- YAML frontmatter
- `[[wikilinks]]` and `[[link|aliases]]`
- `![[embeds]]`
- Callout blocks
- Block IDs
- Code blocks
- Tables and checkbox structure

### 4. Summarize

When editing a file, summarize the tone shift and 2-3 key rewrites. When producing a short standalone output such as a LinkedIn preview, provide the revised text and briefly say what voice choices changed.

## Source

Adapted from `om-humanize.md` in the Obsidian Mind project by Brian Ferrari.
