---
tags:
  - author/Jordan_Anderson
  - type/article
  - theme/knowledge_management
title: Managing human context windows
aliases:
description: AI knowledge management systems can help teams exchange context without forcing managers to carry it all
created: 2026-06-23
draft: false
promoted: true
---
Those of us who were in white-collar work vividly remember the COVID-19 pandemic and related lockdowns. Before COVID-19, spending 40+ hours in the office (and another ~10 commuting) was a normal and expected part of life for many employees. After we were stuck at home under various sorts of lockdowns, though, we collectively realized that the old way wasn't the ==only== way. 

In the last few months, I've had a similar realization that the way organizations manage and transfer knowledge is crazy and unsustainable. Humans are bombarded by context (emails, Slack, side chats, meetings, reports, blog posts, etc.) and expected to dynamically identify truth amid constantly shifting variables. The problem becomes worse the higher up the management chain one goes, prompting a dependence on metrics to make truth simple and comprehensible (while losing essential context and degrading knowledge down to information). As COVID-19 was to working at home, the AI revolution offers a similar tipping point for [[knowledge management]].
## Streamlining Management with a Company Brain

Jack Dorsey has made bold moves based on a similar premise. Just after laying off thousands of people at Block, a move he justified by a wave of incoming AI-facilitated redundancy and cost optimization, he published [a blog post](https://block.xyz/inside/from-hierarchy-to-intelligence) critiquing the excessively hierarchical business management culture that originated in the Roman Army, eventually spreading to Prussia's systematized General Staff, and entering the business world as American railroad and oil companies grew to span a nation. Humans haven't found a way to efficiently manage large groups of people, but adding more layers of management/command creates slower information flow. Dorsey's solution is to use AI as the coordination layer, demolishing hierarchy and putting the people on the edge "where the action is". 

I'm not yet convinced this will allow running an entire business (see [[Outsource cognition wisely]]), but it points to an interesting opportunity at a smaller scale. Can we accelerate information flow and relieve middle management of their primary role as information conduit[^1], thereby creating more opportunities for strategic and tactical planning? Can we achieve every executive's dream and make high-level strategic/overview information relevant and accessible for decision-making on the "edge" of the group? 

We must first be able to synthesize (import), query (access), and curate (validate) business knowledge -- including the implicit versions -- on-demand, without needing to hold the full-context version in human minds at all times. If this is possible, it could transform communication and coordination efforts at large organizations. 
## LLM-wiki and Obsidian-Mind

A few months ago, Andrej Karpathy proposed a concept called [llm-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), which is effectively "a pattern for building personal knowledge bases using LLMs" or a way of giving an AI tool "memory". Since then, a huge number of derivatives have spun up, with folks seemingly seeking to solve the ==AI context window problem== with LLM-managed external knowledge stores. More importantly, I think we can solve the ==knowledge work context problem== with these tools.

There are three major camps of "AI memory" implementations:
1. those that entirely encode the knowledge/information in databases or other "black box" implementations
2. those that only use plain-text/Markdown (with search techniques on top)
3. those that combine raw Markdown files with a database/search approach

I don't think anyone knows what approach will win in the end, but as a regular user of Obsidian[^2], I'm most sympathetic to the second and third implementations. After all, this approach provides the best data portability and opportunity for human validation[^3]! A few months ago, I noticed [obsidian-mind](https://github.com/breferrari/obsidian-mind), a collection of skills and hooks to "give AI coding agents persistent memory". Initial experimentation proved promising, as skills (structured, repeated instructions) and hooks (skills that run every time an action is taken, like "write a file") provide a harness of sorts around the AI activity, helping provide consistent outputs.[^4]  There are a few essential skill categories that obsidian-mind offers:

- Processing, summarizing, and routing external content with `/om-dump` or `/om-intake`
- Accessing content with [qmd](https://github.com/tobi/qmd) semantic search, providing completely local and efficient meaning-based queries (not just keyword match)
- Curating vault content with `/om-wrap-up`, `/om-weekly`, and `/om-vault-audit`

There's nothing magical about these skills, but I decided to experiment with this as my base: would I be able to turn this personal knowledge management system into something suitable for an entire team or group? Would we be able to facilitate information transfer between leaders and "the edge" of the company without middle management? Time (and future posts tagged with `#theme/knowledge-management`) will tell. 

### Early Observations

- Models and harnesses tuned for coding tasks are shockingly good at organizing and searching content with these tools[^5]. 
- Centralizing knowledge in the vault accelerates forms of targeted communication.
	- In the "old world", I'd discuss a topic in a meeting, scribble down some notes, synthesize it into an email to the larger team, and painfully translate that into a series of work tickets (with sufficient context) later. Now, I ingest the notes into Obsidian-Mind and use the LLMs to translate the existing content into whatever form is required (work ticket, report, background email). 
	- If done poorly, this can be an anti-pattern; more context for other humans to load at the time they read the email/report, NOT the time they need to know. That's why concision is so important with AI-generated text. But this is a temporary stepping stone; the goal would be to never send these emails/reports at all (but make the information available to the right people at the right time). 
- Garbage in, garbage out: if incorrect data finds its way in, eradicating it is hard. With a small number of vault users, it is easy to find the incorrect data because it will show up in work outputs that are reviewed before sharing with others. Once others can query the vault directly, that safety net disappears, and the problem worsens when more people can add content. 
- One recent trend is a diaspora of LLM-wiki-as-==personal==-knowledge-base, which I intuit is an anti-pattern for solving the human context window problem (validated context will be fragmented, making curation unscaled and expensive). It does avoid one sticky situation: trying to classify which knowledge and information should be made available to which people.

## Why This Topic?

I was hesitant to write a post about this because it's a bit removed from my normal detection-engineering-focused writing. But it does intersect with a few other interests I have -- systematizing knowledge work, using AI well (especially incorporating its use into new cognitive processes), moving from surviving to thriving by simplifying organizational structure. And detection engineering has huge overlap with the [[Knowledge Management]] space; it's an extremely high-context field. I think this adjacent work will have benefits for detection as well.


[^1]: Dorsey describes middle management as "Professionals whose purpose \[is\] to route information, pre-compute decisions, and maintain alignment across a complex organization." 

[^2]: After all, this site is built on Quartz, which is just Obsidian transformed into a static site!

[^3]: If you suspect the AI is wrong, just open the Markdown file in a text editor :) 

[^4]: Though the AI occasionally "forgets" to read one line or another of key instructions. That's non-determinism for you!

[^5]: My favorite model/harness so far has actually been Gemini Flash 3 in Gemini CLI (RIP), but I'm experimenting with other models as well. For example, Haiku in Claude Code was a disaster; it couldn't follow skill instructions effectively.
