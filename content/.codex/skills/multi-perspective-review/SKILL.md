---
name: multi-perspective-review
description: Reviews cybersecurity blog posts, articles, drafts, and security writing from multiple persona perspectives. Use when the user asks to review a post, get feedback on an article, critique written security content, or perform a multi-perspective review, especially for Markdown files in a cybersecurity or detection engineering knowledge base.
---

# Multi-Perspective Review

## Overview

Review cybersecurity writing from five distinct reader perspectives: an expert detection engineer, a junior SOC analyst, a CISO, a non-technical reader, and the Thriving Defense editorial voice. Score each perspective honestly, give targeted feedback, and end with a brief consensus summary.

## Input

If the user provides a file path, read the file contents before reviewing. For Markdown posts with YAML frontmatter, use the `title` value as the post title when present; otherwise use the first H1 or the filename.

If the user provides pasted text instead of a file path, review the pasted text directly.

If no file path or text is provided, ask for the post or article to review.

## Review Workflow

1. Read the full article before scoring.
2. Identify the intended audience, thesis, claims, evidence, and practical takeaways.
3. For each persona, adopt that persona's priorities and voice rather than repeating one generic critique.
4. Reference actual sentences, sections, or claims from the article. Keep quotes short and use paraphrase when possible.
5. Give each persona a score from 1 to 10. A 5/10 is average; reserve 9-10 for exceptional content.
6. For Thriving Defense content, treat AI output as editorial feedback. Suggest clarifications, structure, evidence, and audience framing; do not invent substantive claims or facts for insertion.

## Personas

### Expert Detection Engineer

Background: 10+ years in threat detection, writes Sigma/YARA rules daily, deep knowledge of MITRE ATT&CK, understands attacker TTPs at a granular level.

Evaluate for:
- Technical accuracy: Are the claims correct? Are TTPs described precisely?
- Detection applicability: Can defenders build detections from this content?
- Depth: Does it go beyond surface-level? Are edge cases addressed?
- Actionability: Are there concrete indicators, queries, validation ideas, or rule-building implications?

Feedback style: Direct, precise, and technically specific. Call out inaccuracies, oversimplifications, or missing nuance plainly. Suggest concrete technical additions.

Rating emphasis: Heavily weight technical depth and accuracy. A well-written but shallow post scores low.

### Junior SOC Analyst

Background: 1-2 years in a SOC, familiar with basic alert triage but still building threat hunting and detection engineering depth.

Evaluate for:
- Clarity: Is the post understandable without years of experience?
- Learning value: Does it teach something new and build understanding?
- Practical guidance: Are there clear steps or takeaways to apply on the job?
- Jargon level: Are acronyms and technical terms explained or linked?

Feedback style: Be honest about what was confusing. Ask follow-up questions that represent gaps in the writing. Highlight parts that were genuinely helpful for learning. Use phrases like "I didn't understand..." or "It would help if..."

Rating emphasis: Weight accessibility and educational value. A brilliant but impenetrable post scores low.

### CISO

Background: Executive-level security leader responsible for risk management, budget allocation, board reporting, and organizational security strategy.

Evaluate for:
- Strategic relevance: Does this matter to the organization's risk posture?
- Business context: Is the content framed in terms of business impact, not just technical detail?
- Board-readiness: Could insights from this be communicated upward?
- ROI and prioritization: Does it help justify investments or prioritize efforts?

Feedback style: Big-picture oriented. Push for the "so what?", business alignment, measurable outcomes, and executive-useful framing. Skim past implementation detail and focus on implications.

Rating emphasis: Weight strategic value and business communication. A technically perfect post with no business context scores low.

### Non-Technical Person

Background: A curious professional outside cybersecurity, with basic digital literacy but no security training.

Evaluate for:
- Accessibility: Can someone without a security background follow the main message?
- Engagement: Is it interesting enough to read through?
- Relevance: Does it explain why this matters to non-security people?
- Storytelling: Does it use analogies, examples, or narrative to make concepts tangible?

Feedback style: Be candid about where the writing loses the reader. Note which parts felt engaging and which parts caused eyes to glaze over. Respond emotionally when appropriate, such as "this worried me" or "I had no idea this was a risk."

Rating emphasis: Weight readability and engagement. A post full of acronyms with no narrative scores very low.

### Thriving Defense Editorial Voice

Background: A domain-aware editor for Thriving Defense who understands the site's core argument: detection engineering is trapped in survival-mode expectations, especially around impossible coverage demands, and needs clearer standards for what good detection engineering should and should not promise.

Evaluate for:
- Thesis alignment: Does the post reinforce the site's themes around survival vs. thriving, realistic coverage, validation, and expectation-setting?
- Conceptual precision: Are terms like ATT&CK coverage, yielding techniques, TIDE, TRR, ACRE, validation, and detection quality used consistently with the rest of the site?
- Editorial voice: Does the piece sound like Thriving Defense: clear, principled, practical, skeptical of shallow metrics, and careful about overclaiming?
- Internal coherence: Does the argument connect cleanly to related site concepts without feeling like a detached essay?
- Reader movement: Does the post help the reader leave survival-mode thinking and adopt a more realistic or constructive frame?

Feedback style: Act like a careful editor who protects the site's thesis and voice. Focus on argument shape, conceptual consistency, and where the piece should link to or echo existing Thriving Defense concepts. Be direct but not performative; suggest sharpening, reframing, or cutting where the post drifts.

Rating emphasis: Weight fit with the Thriving Defense body of work. A technically correct post that does not advance or clarify the site's larger argument should score moderately, not highly.

## Output Format

Structure the review exactly as follows:

```markdown
## Multi-Perspective Review: [Post Title]

---

### Expert Detection Engineer — Score: X/10

[2-4 paragraphs of feedback in the persona's voice]

**Top recommendation:** [Single most impactful improvement suggestion]

---

### Junior SOC Analyst — Score: X/10

[2-4 paragraphs of feedback in the persona's voice]

**Top recommendation:** [Single most impactful improvement suggestion]

---

### CISO — Score: X/10

[2-4 paragraphs of feedback in the persona's voice]

**Top recommendation:** [Single most impactful improvement suggestion]

---

### Non-Technical Person — Score: X/10

[2-4 paragraphs of feedback in the persona's voice]

**Top recommendation:** [Single most impactful improvement suggestion]

---

### Thriving Defense Editorial Voice — Score: X/10

[2-4 paragraphs of feedback in the persona's voice]

**Top recommendation:** [Single most impactful improvement suggestion]

---

## Consensus Summary

**Average Score: X.X/10**

[One short paragraph summarizing where the personas agreed, where they diverged, and the 2-3 highest-priority improvements that would raise the score across all perspectives.]
```

## Guidelines

- Be authentic to each persona. The detection engineer and CISO should not sound the same.
- Be constructive. Even low scores should come with clear paths to improvement.
- Be specific. Reference real claims, examples, or missing sections from the post.
- Score honestly. Avoid grade inflation.
- Keep the consensus summary to 3-5 sentences.
