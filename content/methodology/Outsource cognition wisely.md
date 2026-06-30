---
tags:
  - author/Jordan_Anderson
  - type/stub
title: Outsource cognition wisely
aliases:
created: 2026-06-23,
description: How cognitive surrender lets vendors or AI quietly replace defender judgment
draft: false
promoted: true
---
A new paper ([Thinking—Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender by Steven D. Shaw, Gideon Nave :: SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646)) was released a few months ago, building on Daniel Kahneman's models of thought, called System One and System Two -- this paper described a new model of "System Three" thinking. 
 
If you're not familiar with System One and System Two, System One refers to intuitive/background thought that is constantly running and making snap decisions. Most biases live here (and *Thinking, Fast and Slow* has a massive list of them!), but System One is also frequently right. System Two is intense thought, the part of the brain that activates when you're asked to add two three-digit numbers in your mind (try: 492 + 941). Most of the time, our brain takes shortcuts to avoid activating System Two (which takes a prodigious amount of energy to run). 
 
System Three describes cases where cognition (thought processes) is delegated to an external non-human entity. This goes beyond using AI as a tool for a specific task, and is closer to asking AI to choose where you should get lunch today (or any number of more serious decisions). There's evidence from the paper that our brains will take those external System Three conclusions and treat them as our own, just as if System One or System Two had delivered them! One reason is that our brains are hardwired to seek clarity, and a convincingly presented statement from an AI agent triggers the same [[Clarity is not enough|seductive feeling of clarity]] that our intuitive System One would deliver. This bypasses System Two, permitting subtle errors to persist that may have otherwise been caught.

Even in cases where we question the AI output, we are subject to another System One flaw: anchoring bias, or as Kahneman breaks it down further, "Halo effect" (where System One is primed by earlier impressions to have a positive or negative view of a topic or person)[^1], or "What You See Is All There Is" (WYSIATI) (where it's far easier to reach a conclusion by ignoring key evidence)[^2]. 

## Cognitive Surrender to Security Vendors

While reading this paper, I was struck by how cybersecurity teams can have a similar relationship to AI as they do with their vendors, a phenomenon that predates AI. In other words, Company A can depend **absolutely** on Vendor 1 for their host-based security, not just for tooling but also for strategy. There's subtlety here; to go back to the AI metaphor, using computers (even AI) for discrete tasks is not necessarily cognitive surrender. You can delegate a specific task to AI or use a calculator to add numbers without getting into this territory, but here are some detection-engineering specific examples:

- Measuring detection coverage against alignment to a [[BAS]] vendor's test library (this presumes that the BAS vendor's tests are the coverage target - see [[Validating vendor detection effectiveness]])
- Limiting detection research/assessments to existing telemetry sources, and never provoking vendors to provide the new telemetry needed
- Following your Managed Security Service Provider (MSSP)'s recommendations to determine which data sources are required
- Delegating detection coverage and responsibility in a particular scope to a vendor, such as only using an EDR for host-based detections

In general, security teams should be doing more to tell their vendors what is needed. The expertise required to define objectives MUST exist outside of the vendor alone, due to the vendor's inherent motivation to focus on solved/solvable problems (after all, no one will buy a partial product). If the vendor defines the objective, it becomes difficult to evaluate the real value of the product. 

To close the loop on this particular topic, what can be done to reduce the risk of "assisted thought" producing incorrect conclusions?

## Avoiding False Clarity 

The solution is not to stop using AI (or security vendors). In some cases, System Three thought might be the only practical way to solve a given problem (due to its scalable cognition), such as a complex data analysis task or for [[Acquire rules and tests for yielded techniques at scale|detecting yielded techniques]]. In other cases, where the thinking must absolutely be correct, there are specific prompting, design, and usage approaches that can bypass these pitfalls (similar to the way we must sometimes trick our brain into activating System Two instead of relying on System One's quick but biased thinking).

For starters, the sequence of thought (relevant to the AI's involvement) is key. For important tasks, try brainstorming ==before== asking the AI. This will ensure that you have independent thought on the topic before anchoring yourself to the AI's framing, so you're better positioned to critique the AI's conclusions without anchoring bias (Ethan Mollick covers this in [Against Brain Damage](https://www.oneusefulthing.org/p/against-brain-damage)).

As another approach, have AI agents "compete" with one another on the same task, with the human or another agent reviewing the results and identifying possible gaps. Examples include:

- Generating a plan with one model/agent and having another model/agent review it before implementing
- Running multiple lower-cost models on the same task, and fusing the results together, which delivers higher benchmark scores than single frontier models on Deep Research tasks, per [this OpenRouter blog post](https://openrouter.ai/blog/announcements/fusion-beats-frontier/)
	- As the blog post mentions, some amount of the benefit can be realized even with a single model: "Running the same prompt twice produces different reasoning paths, different tool calls, different source selections."
- Prompting AI with different "personas" can generate different results; I use a similar approach to review blog posts

Honestly, these approaches to mitigate *cognitive surrender* via AI work for surrender-via-vendor as well, with a few modifications:

- Knowing what you want before (and during) a vendor engagement can help you avoid entrapment in the vendor's solution (losing sight of whether it addresses problems you already knew you had **before** engaging the vendor).
- Have different vendors in the same space pitch against each other, focusing not just on technical implementation but on vision. The gap between products often provokes interesting questions (and may broaden your understanding of what is actually desirable).

Outsourcing cognition to vendors isn't new, but maintaining awareness of the risk of unwanted results from vendors or AI is key to ensuring the conclusions are absolutely accurate when they must be.

[^1]: Thinking Fast and Slow, Kahneman, p. 82

[^2]: *Ibid*, p. 85
