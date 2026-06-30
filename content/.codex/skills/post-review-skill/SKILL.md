---
name: post-review-skill
description: Review a Thriving Defense Markdown post before publication to maximize engagement and minimize errors. Use when the user provides a post file path or filename and asks for a pre-publication review, post review, SEO description check, grammar pass, missing Obsidian link suggestions, or LinkedIn promotion draft. If no file is specified, ask which post to review.
---

# Post Review

## Overview

Review a Thriving Defense post before publication without modifying it. Gather context, list every proposed grammar and phrasing correction, check the SEO description, suggest missing Obsidian links, optionally draft a LinkedIn promotion post, and end by asking which changes the user wants applied.

## Input

The user provides a file path or filename for a Markdown post. Posts live under the current Thriving Defense content workspace and use `.md` files.

If the user gives:
- An absolute or relative file path: read that file.
- A bare filename without `.md`: resolve it to the matching `.md` file in the content workspace.
- No file: ask which post to review.

If multiple files match a bare filename, ask the user to choose.

## Workflow

### 1. Gather Context

First, run these in parallel when possible:

- Read the post at the provided path.
- List all vault pages by globbing Markdown files in the content workspace to get every page title. Page titles are filenames without `.md`.

Use the page-title list in step 4 to find missing links. Do not read other files unless needed to confirm ambiguous relevance.

### 2. Grammar and Phrasing Review

Review the post body, meaning everything after the frontmatter, for grammar, spelling, punctuation, awkward phrasing, and clarity issues.

Explicitly list every correction. Do not silently fix anything. Present corrections as:

```markdown
### Grammar & phrasing corrections
1. "original text" -> "corrected text" - reason
2. "original text" -> "corrected text" - reason
```

If no issues are found, say so explicitly. Do not apply changes during the review.

### 3. SEO Description

Check the frontmatter `description` field. If it is missing, empty, or outside the 70-110 character range, draft a new one.

Description rules:
- Must be 70-110 characters long. Count carefully, then recount before presenting.
- Must not repeat or closely paraphrase the page `title`.
- Should summarize the post's core insight or value proposition.
- Should be compelling for search engine snippets.
- Use sentence case and no trailing period.

Present the proposed description with its character count. If the existing description is good, say so.

### 4. Missing Obsidian Links

Using the vault page list from step 1, identify concepts in the post that could link to other pages but currently do not.

Use this token-efficient approach:
- Compare vault page titles against concepts, terms, and themes mentioned in the post body.
- Only suggest links where the post clearly discusses a concept that matches another page's topic.
- Do not suggest links that already exist in the post.
- Do not suggest links to the post itself.
- Do not suggest links to `people/` pages unless the person is mentioned by name without a link.
- Do not suggest links to `index.md`.

Present suggestions as:

```markdown
### Suggested Obsidian links
1. "phrase in post" -> `[[Page Title]]` or `[[Page Title|display text]]` - why this link is relevant
```

If no links are missing, say so.

### 5. LinkedIn Preview

Only generate this section if frontmatter has `promoted: false`.

If `promoted` is `true`, missing, or not present, skip this section and note that the post has already been promoted or has no `promoted` field.

Draft a LinkedIn post to promote the article using this style:
- Hook with a concrete scenario or pain point the audience recognizes.
- Bridge to the article's core argument in 1-2 short paragraphs. Share enough substance to be valuable on its own while leaving depth for the post.
- Close with engagement by asking a direct question about the reader's experience or inviting perspective, with `[LINK]` to the full post.
- Keep total length to 400-800 characters.
- Use no hashtags, no emojis, and no bullet-point walls.
- Use first person, conversational but professional.
- Sound like the author's natural voice, not content marketing.
- Start a conversation and draw readers in rather than exhaustively summarizing.

Present the LinkedIn post in a code block for easy copying.

### 6. Summary

End with a brief summary of all proposed changes and ask the user which, if any, they want applied.

## Output Structure

Use these headings, omitting only the LinkedIn preview when step 5 says to skip it:

```markdown
## Post Review: [Post Title]

### Grammar & phrasing corrections

### SEO description

### Suggested Obsidian links

### LinkedIn preview

### Summary
```

## Guardrails

- Do not modify the post during the review.
- Do not invent claims, citations, or substantive technical content for insertion.
- Keep feedback specific to the provided post and this content vault.
- Treat stub pages and intentionally broken links as normal for this site.
