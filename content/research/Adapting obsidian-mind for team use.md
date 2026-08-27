---
tags: [author/Jordan_Anderson, type/stub]
title: Adapting obsidian-mind for team use
aliases:

created: 2026-06-29,

draft: true

promoted: false
---
In [[Managing human context windows]], I mentioned I've been exploring using obsidian-mind (a single-user, coder-focused framework) as a shared LLM [[knowledge management]] product. This page will serve as an index to the general problems we had to address (which will hopefully be useful context for any attempt to roll your own shared knowledge management system). 

- Alignment
	- Obsidian-mind natively uses a `brain` folder, including a `North Star.md` file, to provide key context. This data is injected at the start of every session. This is (by default) individually focused. 
	- It seems like this approach - loading key information into memory - could be extended to team- and group-wide priorities. This could allow leadership to regularly and directly update these high-level goals while granting the "edges" of the network to map efforts to current priorities. If this works, it's the core innovation that could flatten organizations!
- Ingesting content to the vault
	- Start by describing high-level projects and initiatives and asking the AI agent to add them to your North Star (see alignment)
- Onboarding new users
	- Build an onboarding guide that expands as vault features do
- Keeping user data in sync
	- Since we're using Markdown, git is a viable storage option
	- Avoiding git merge conflicts is key - regular automatic push/pull achieves that
	- Some folders should remain except from the git sync, permitting content development
- Limiting data access based on user/group
	- Technical implementation - git submodules
	- What is the right boundary?
	- Related: controlling 