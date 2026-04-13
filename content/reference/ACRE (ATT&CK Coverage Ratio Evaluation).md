---
tags:
  - author/Jordan_Anderson
  - type/stub
title: ACRE (ATT&CK Coverage Ratio Evaluation)
description: Introducing a new metric designed to answer if you have enough detections in a meaningful and time-bound way.
aliases:
created: 2026-03-07
---
## How do you know if you have enough detections?

Security leaders frequently ask a deceptively simple question: **do we have enough detections?** After years of working in detection engineering, I’ve never found a satisfying answer using standard metrics and approaches. Once complete, this post will introduce **ACRE (ATT&CK Coverage Ratio Evaluation)**, a metric designed to answer that question in a way that is intuitive, time‑bound, and meaningful across organizations.


## The Heatmap Problem: “Enough” Is Undefined

Most organizations attempt to answer detection sufficiency by mapping their rules to **MITRE ATT&CK®** and visualizing coverage using heatmaps. The intent is good—but the results are often misleading. A typical ATT&CK heatmap could look like the one below:

![[acre_mitre-example-1.png]]
*Heatmap A, [src](https://www.mbsecure.nl/blog/2019/5/dettact-mapping-your-blue-team-to-mitre-attack)*

Heatmaps like this raise more questions then they answer, **especially** when they are being shown to senior management:
- What does “good” coverage look like?
	- Should every technique be green? Is that even possible?
- What should we do next to improve? Should we turn the colorless parts to red? Should we make the red cells yellow? What are the thresholds for the colors anyways?

Because a heatmap (especially one derived from ATT&CK Navigator, a wonderfully flexible tool) can represent anything we want, and the colors/gradients can also represent anything we want, we must have a reason or a standard for consistent representation. In other words, **the heatmap alone does not answer the question "Is this enough?"**.

Another major challenge is heatmaps are too complex to show progress. Look at Heatmap A and newly introduced Heatmap B. Let's assume they represent two snapshots from the same organization. Which one do you think came first? If you were presenting this to an executive, what story would you tell about the changes? 

![[acre_mitre-example-2.png]]
*Heatmap B, from this [helpful reference on how to use ATT&CK Navigator](https://blog.agood.cloud/posts/2022/12/17/doing-more-with-attack-navigator/)*

One more substantial problem is that [[MITRE ATT&CK® is not flat]] - but a heatmap is. That's normal for models ("all models are wrong, some are useful"), but means using a flat heatmap to show detection coverage specifically will oversimplify things to a non-useful degree.

Heatmaps fail to define a clear goal, allow measured progress, or guide prioritization decisions. They don’t tell us whether we should add detections where we have none, or improve detections where we already have some. In short,

> Detection coverage cannot be tracked using a heatmap!

## What a Useful Metric Looks Like

Before introducing a solution, it’s worth defining what standards we should use to evaluate it. A useful detection coverage metric must be:

- **Intuitive** – an executive should understand it without explanation 
- **Time‑bound** – it should show improvement or regression over time 
- **Aligned** – it should improve as teams do meaningful detection work 
- **Translatable** – it should be meaningful across organizations 

Traditional metrics like “number of alerts” or “attacks blocked” fail these tests. Detection coverage, however, *can* meet them—if measured correctly. 

## ACRE methodology

**ACRE** stands for **ATT&CK Coverage Ratio Evaluation**. At its core, ACRE is a ratio: 

> **(Techniques we detect) / (Techniques that are detectable)**

Over two years of generating this metric, it has helped uncover real detection gaps, accurately represent detection engineering work to leadership, and justify investment in collaborative detection research. However, turning this simple ratio into something meaningful requires solving three hard problems:

1. What is the denominator? 
2. What ATT&CK techniques are actually detectable? 
3. What counts toward the numerator?

### Problem 1: Defining the Denominator

Many teams default to using **all ATT&CK techniques** as the denominator (this is inherent to the heatmap visualization as well). This is flawed. ATT&CK includes techniques that cannot be detected today or perhaps ever (insufficient telemetry) and some that can never be completely detected (due to breadth of the technique) - in other words, [[some techniques should only be detected opportunistically]].
  
Including techniques like these in coverage assessments makes “100% coverage” impossible and meaningless. The denominator must be limited to **techniques that are realistically detectable**.

Of course, there's the other side of the problem as well, where ATT&CK does not include the entire denominator. The project was originally designed (in 2013) to focus on "Windows enterprise networks" and "endpoint telemetry" (per the [FAQ](https://attack.mitre.org/resources/faq/), and while ATT&CK has grown to include other platforms since then (see [[MITRE ATT&CK® is not flat#What platforms are in ATT&CK?|ATT&CK platform overview]]), most techniques are linked to Windows endpoints. But given MITRE ATT&CK is the best-defined technique inventory we have, we should adopt a **satisficing** approach (a term coined by Herbert A. Simon) and use realistically detectable ATT&CK techniques as our denominator for now (while we build out what other techniques might be missing, especially for other platforms like [[Trusted Service Infrastructure (TSI)]]).

### Problem 2: Determining What Is Detectable

Manually evaluating hundreds of ATT&CK techniques is impractical and could lead to inconsistent results. Instead, ACRE leverages [**MITRE CAR Coverage**](https://car.mitre.org/coverage/​), which compares multiple open‑source detection libraries and shows what techniques are commonly detected. This provides a defensible, evidence‑based answer to the question:

> *If multiple independent detection libraries detect this technique, it is probably detectable.*

That said, CAR-based coverage has limitations:

- It does not cleanly separate coverage by operating system (if a cross-OS technique like Powershell shows up in any detection library for any OS, it's counted as covered)
- It can overcount detections via naive string matching
- The calculation list is outdated (some techniques listed (like T1108) have been [deprecated](https://www.cisa.gov/eviction-strategies-tool/info-attack/T1108))

To address this, ACRE:
- Splits coverage by OS
- Parses library detection formats rather than string-searching for technique IDs
- Defines a minimum rule count for detectability (avoiding cases where a rule author incorrectly applies a technique ID)

Furthermore, since we should [[comprehensively detect the middle of the attack]], ACRE applies a higher weight for covering techniques in later-stage tactics.

### Problem 3: Defining the Numerator

The hardest question is deceptively simple: **How many detections are "enough" for a technique?**

My thinking on this topic is evolving - I now think [[some techniques should only be detected opportunistically|the answer depends on the type of technique]] - but some standard principles remain. Most importantly, we cannot determine how many [[MITRE ATT&CK Procedures and Instances#Procedure vs Instance|instance-based]] detections

[[Summiting the Pyramid Levels]] show that many existing detections look at ephemeral or tool-based properties, detecting [[MITRE ATT&CK Procedures and Instances|"instances" rather than "procedures"]]. We cannot know how many level 1-3 detections are necessary to cover a technique, because new tools can be created at any point, obviating the detections.

However, approaches like the [[Technique Research Report (TRR)]] show us that we can identify all possible procedures for many techniques. With a complete list of procedures for all techniques we need to monitor, we could measure our detections against that procedure list. Unfortunately, there are many more techniques to research and document in this way, and building out the full procedure list will take time (and collaborative research). Until then, ACRE adopts a *satisficing* approach (a term coined by Herbert A. Simon):

> If we have *at least one* valid detection for a technique x Host OS pair, we count it as covered.

This allows us to measure **breadth of coverage**, even if depth remains unmeasured. Differentiating between “none” and “some” coverage is still powerful data and shows real gaps that can be addressed. 

## Using ACRE

For all that background, it's quite easy to use ACRE. 

1. Use the provided [platform-coverage skill](raw/platform-coverage.md) and the Security-Detections-MCP to calculate which techniques are detectable (solving [[ACRE (ATT&CK Coverage Ratio Evaluation)#Problem 2 Determining What Is Detectable|problem 2]])
	- Note: the skill is written to work with Claude Code, but any GenAI product should be able to adapt it. Just ask!
	- Also, your GenAI product should be able to install the MCP for you - note that if you're using Windows, it's much easier to use Windows Subsystem for Linux (WSL) than the native Windows installation.
2. Export your custom detections and run the [acre-coverage skill](raw/acre-coverage.md) to calculate your ACRE score. Your export must include the following fields for each rule:
	- Creation Date
	- MITRE ATT&CK techniques that the rule covers
	- OS the rule covers — if your export doesn't include this, ask a GenAI tool to infer it from your data source or log source field
	- Rule name and/or ID (for subsequent human analysis)

## What's next to improve ACRE?

- Decomposing techniques into [[Technique Research Report (TRR)|TRRs]] will allow more precise detection measurements, including: 	- [[Validating vendor detection effectiveness]]
- ATT&CK is strong for host operating systems, but needs to expand to [[Trusted Service Infrastructure (TSI)]] and other types of applications to be complete

claude --resume 9549060b-04c4-4830-8619-9763527d3571