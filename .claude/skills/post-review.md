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

**Only generate this section if the frontmatter field `promoted` is set to `false`.** If `promoted` is `true`, missing, or not present, skip this section entirely and note that the post has already been promoted (or has no `promoted` field).

Draft a LinkedIn post to promote this article. Follow the tone and structure of these real examples:

**Example A** (site launch / philosophy post):
```
My CISO once asked a simple question that spawned years of introspection - "how do we know if we have enough detections?" Answering this question requires defining what should or should not be detected and why, and my team and cross-industry peers have been working on the philosophy and science to get this answer right.

With today's release of Thriving Defense, we're moving this conversation to the public realm. The site is more "digital garden" than blog, so expect these pages to be updated as we debate and improve definitions together. Your voice is essential too!

To get started, check out [LINK] and let me know here or in the site comments what you think.
```

**Example B** (single-topic deep dive):
```
Security detection is a delicate thing. There's a lot that can go wrong, and a failure at any point in the process creates false negatives (alerts that should've fired but didn't).

This is why detection libraries must be repeatedly validated. It's the only way to know that a rarely-firing rule is still working as designed, or to avoid accidentally tuning out essential detection logic. Does your organization repeatedly validate detections today? I'd love to hear about your experience - or you can check out the post to see why this is so important and how to get started.

[LINK]
```

Key patterns from these examples:
- **Hook with a concrete scenario or pain point** the audience recognizes (not generic thought-leadership phrasing)
- **Bridge to the article's core argument** in 1-2 short paragraphs — share enough substance to be valuable on its own, but leave the depth for the post
- **Close with engagement** — ask a direct question about the reader's experience, or invite them to share their perspective, with a `[LINK]` to the full post
- Total length 400–800 characters (these are concise, not padded)
- No hashtags, no emojis, no bullet-point walls
- First person, conversational but professional — the author's natural voice, not "content marketing" voice
- The goal is to start a conversation and draw readers in, not to exhaustively summarize

Present the LinkedIn post in a code block for easy copying.

### 6. Summary

End with a brief summary of all proposed changes, asking the user which (if any) they'd like applied.
