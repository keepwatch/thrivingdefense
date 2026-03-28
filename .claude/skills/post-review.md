# Post Review Skill

Review a thrivingdefense post before publication. The user will provide a file path or filename. If no file is specified, ask which post to review.

## Steps

### 1. Gather context

First, run these in parallel:

- **Read the post** at the provided path (posts live under `content/` with `.md` extension).
- **List all vault pages** by globbing `content/**/*.md` to get every page title. Page titles are the filenames without `.md`. This list is used in step 4 to find missing links — do NOT read the other files unless you need to confirm ambiguous relevance.

### 2. Grammar and phrasing review

Review the post body (everything after the frontmatter) for grammar, spelling, punctuation, awkward phrasing, and clarity issues.

**You MUST explicitly list every correction.** Do not silently fix things. Present corrections as a numbered list in this format:

```
### Grammar & phrasing corrections

1. "original text" → "corrected text" — reason
2. "original text" → "corrected text" — reason
...
```

If no issues are found, say so explicitly. Do NOT apply these changes yet — just present them for review.

### 3. SEO description

Check the frontmatter `description` field. If it is missing, empty, or outside the 70–110 character range, draft a new one.

Rules for the description:
- Must be 70–110 characters long (count carefully, re-count before presenting)
- Must NOT repeat or closely paraphrase the page `title`
- Should summarize the post's core insight or value proposition
- Should be compelling for search engine snippets
- Write in sentence case, no trailing period

Present the proposed description with its character count. If the existing description is good, say so.

### 4. Missing Obsidian links

Using the vault page list from step 1, identify concepts in the post that could link to other pages but currently don't.

**Token-efficient approach:**
- Compare the vault page titles against concepts, terms, and themes mentioned in the post body
- Only suggest links where the post discusses a concept that clearly matches another page's topic
- Do NOT suggest links that already exist in the post
- Do NOT suggest links to the post itself
- Do NOT suggest links to `content/people/` pages unless the person is mentioned by name without a link
- Do NOT suggest links to `content/index.md`

Present suggestions as:

```
### Suggested Obsidian links

1. "phrase in post" → `[[Page Title]]` or `[[Page Title|display text]]` — why this link is relevant
...
```

If no links are missing, say so.

### 5. LinkedIn preview

Draft a LinkedIn post to promote this article. The post should:

- **Open with a hook** — a bold claim, surprising insight, or relatable pain point from the article (1-2 sentences). This must grab attention in the feed preview (first ~210 characters are visible before "...see more").
- **Expand with value** — share 2-3 key insights or takeaways, using short paragraphs or line breaks for scannability. Use plain language, not jargon-heavy prose.
- **End with a call to action** — invite readers to read the full post, share their experience, or comment. Include a placeholder `[LINK]` for the article URL.
- Keep total length between 700–1300 characters (LinkedIn's sweet spot for engagement).
- Do NOT use hashtags, emojis, or bullet-point walls.
- Write in first person, matching the author's conversational-but-professional tone.
- The goal is to draw readers into the blog, not to summarize everything — leave them wanting more.

Present the LinkedIn post in a code block for easy copying.

### 6. Summary

End with a brief summary of all proposed changes, asking the user which (if any) they'd like applied.
