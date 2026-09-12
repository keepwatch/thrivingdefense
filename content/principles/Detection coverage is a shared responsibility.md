---
tags:
  - author/Jordan_Anderson
  - type/article
title: Detection coverage is a shared responsibility
description: Focus detection work on necessary attacker paths by combining intelligence, modeling, and research
aliases:
created: 2026-09-11
draft: false
promoted: true
---
I recently saw this [post by Scott Ponte on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7504183560598261760/):

>Detection coverage isn't a detection engineering problem. Its a Threat Intelligence problem.

This claim is difficult to evaluate for a few reasons (one being that it uses three terms that are used inconsistently across the industry). However, the core disagreement I have is that **detection coverage is a detection engineering AND a threat intelligence AND a threat modeling/adversary emulation problem** - it cannot be made wholly the responsibility of any of those three functions.

After all, the definition of "detection coverage" links to an objective at the heart of the entire detection & investigation function (often referred to as the Security Operations Center or SOC). I used to think it was impossible to evaluate this coverage objective with a metric[^1], since the number of possible attacks was unknowable (and how can we compare `number of things we detect` to `number of possible attacks`?). However, this is evidence of [[index|survival mode thinking]]. If we are to measure our effectiveness as security operators, we must have a conception of the ultimate goal we are striving towards. This is how the [[ACRE]] metric came into being, seeking to gradually define what "good" is and whether we are approaching it. The concept of [[Technique Research Report (TRR)|TRRs]] (along with the implications of [[MITRE ATT&CK® is not flat]]) took it even further, showing that `technique` x `product` pairs can actually be decomposed into nested procedures through careful research, and that they can be documented so we can build detections and validation tests from proven technique boundaries. All that to say, I've been thinking about detection coverage and how to measure it a LOT over the last few years.

So much of the coverage conversation has come from our attempts to define reasonable expectations for detection, but the sad reality is that most threat intelligence reporting focuses on the [[some techniques should only be detected opportunistically|opportunistic techniques]] least useful to detect comprehensively - execution artifacts or indicators feature far more prominently than deep research on attacker lateral movement tradecraft or intent. Detection programs should not be expected to detect every example of an attacker running commands - that's far too variable and easy to obfuscate. Instead, SOCs should be comprehensively identifying behavior linked to actions the attacker must take to succeed.

Another challenge with threat-intel-driven prioritization is the perceived flatness of the MITRE ATT&CK graph, when in reality a particular cross-platform technique looks completely different (and must be detected differently) on platform A vs platform B. Sharing the ATT&CK techniques alone does not add enough detail to execute coverage assessments, nor is the approach of detecting "procedure clusters" (combinations of similar instances of a given technique observed in the wild) sufficient to predict future attacker behavior (see [[MITRE ATT&CK Procedures and Instances|ATT&CK Procedures and Instances]]).

## Collective burden of detection coverage

What if we could instead:

- Use threat intelligence to assess why attackers intend to target our organization
- Use threat modeling to determine which systems attackers must compromise to ultimately achieve their goal
- Identify the core systems, products, and [[Selecting Advantageous Terrain|chokepoint techniques]] that would allow actors to achieve their objectives
- Draw from comprehensive technique x product documentation to close off attack paths and implement detections that target necessary chokepoints, hardening our environments against known threats

In this world, threat intelligence is very important as it focuses the threat modeling efforts. However, the threat modeling, chokepoint "terrain" identification, hardening, and detection work rarely sits with the threat intelligence team alone. All the teams that do this work contribute to coverage, not just threat intelligence or detection engineering.

Does this vision seem like a pipe dream? I don't think it's as far off as you think:

- Threat intelligence can (and often already does) determine likely actor objectives from publicized attacks and internal incident response[^3]
- Threat modeling (theoretical or via a red team engagement) can explore actor paths to objectives
- Products like SpecterOps' BloodHound (open source or Enterprise versions) identify the paths attackers can take to compromise organization-defined "Tier Zero" assets[^2], including the specific technique x platform pairs in a given environment
- [[Technique Research Report (TRR)|Technique Research Reports (TRRs)]] authoritatively define how certain techniques can be implemented on specific products

Two major gaps remain:
- Programmatic translation of the org-specific findings of BloodHound-like products into detection coverage targets
- One heck of a lot more deep TRR-style research to comprehensively detect attacker paths

The first problem is one of implementation - the data exists; it needs to be labeled correctly (with techniques) and shared with detection programs. And the second problem is becoming much easier to solve with AI - research that used to take weeks is being compressed into days. 

## Do we really have time for this with AI threats looming?

How could I write a blog post in `$currentyear` without talking about AI?

There's a general sentiment of impending doom that as attackers adopt AI, defenders must move even faster to "stay inside the OODA loop" and be able to contain/prevent attacks before attackers can achieve their catastrophic objectives. While I am concerned that attackers will be able to use AI (and any new technology) more easily than defenders, we must also resist the instinctive flailing and pursuit of speed at all costs that comes with [[Take a step back to cut through the fearful fog of war|a fear-driven mindset]]. 

> If we do not know where we are going, it doesn't matter how fast we move to get there.

As [@HackingLZ said on Twitter](https://x.com/HackingLZ/status/2098029345054785813), "LLMs don’t magically make the underlying techniques new." We **must** know attacker objectives, the battlespace we must defend, and the means our opponents must use to achieve those objectives. Whether they can achieve those objectives quickly or not is a secondary concern. 

So get out there and start mapping how your systems connect (the BloodHound work) and conducting deep research to contribute TRRs to our world-readable database (read the [[Technique Research Report (TRR)|TRR]] page for more details on how). We all benefit when we do this work in common!

[^1]: Note: MITRE ATT&CK® heatmaps != metric!

[^2]: For example, the GitHub extension defines Tier Zero assets with organization-wide control or write access: [Privilege Zone Rules - SpecterOps](https://bloodhound.specterops.io/opengraph/extensions/github/privilege-zone-rules)

[^3]: Ironically, an attack caught or evicted at an early stage provides very little evidence of an attacker's objective, so successful defense can impair knowledge of attacker motives
