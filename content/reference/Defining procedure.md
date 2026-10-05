---
tags:
  - author/Jordan_Anderson
  - type/article
title: Defining procedure
description: Why ATT&CK 'instances' and On Detection 'procedures' are different — and why that distinction matters.
aliases:
  - ATT&CK Procedures and Instances
  - ATTACK Procedures Defined
created: 2026-03-07
---
If you've been around cybersecurity for a while, you've probably heard of the *procedure*, perhaps in the context of Tactics, Techniques, and Procedures (TTPs), or as part of the term *Standard Operating Procedure* (SOP), a consistent method for executing a workflow. In 2013, the term featured prominently in David J. Bianco's [[Pyramid of Pain]] (urging defenders to detect behavior (TTPs) rather than just indicators). That same year, MITRE classified attacker behavior into Tactics and Techniques in version 1 of their ATT&CK® framework. Many techniques were accompanied by a few example procedures. 

The problem with the term *procedure* is that the term is *overloaded* - it means different things depending on the context (and it lacks a consistent definition). Is it a standard, consistent checklist? Is it an example of an attack that has occurred in real life? Or is it something completely different? This page walks through the different definitions relevant to detection engineering and proposes a path forward.

## SOP definition

Like many other elements in cybersecurity, the terms *procedure* and *TTPs* originated from the military. Robby Winchester from SpecterOps has [a great article](https://specterops.io/blog/2017/09/27/whats-in-a-name-ttps-in-info-sec/#) detailing the US military's original definitions, which include this for procedure:

> Procedures are specific detailed instructions and/or directions for accomplishing a task. Procedures include all of the necessary steps involved for performing a specified task, but without any of the high-level consideration or background for why the task is being performed. The priority for procedures is ensuring complete detailed instructions so a task can be correctly completed by anyone qualified to follow the directions.

Interestingly, this won't sound like most of the other procedure definitions we discuss in this article, but it does sound very similar to the Standard Operating Procedures that many cybersecurity teams use to consistently execute specific tasks, like investigating a given alert or type of alert. Otherwise, the only shared element that later definitions preserve is that a procedure is a more specific form or class of the parent element, the technique.
## MITRE ATT&CK definition

MITRE has an early definition of procedure in the cybersecurity context:

> Procedures are the specific implementation the adversary uses for techniques or sub-techniques. For example, a procedure could be an adversary using PowerShell to inject into lsass.exe to dump credentials by scraping LSASS memory on a victim. Procedures are categorized in ATT&CK as the observed in the wild use of techniques in the "Procedure Examples" section of technique pages.

This definition from the [ATT&CK FAQ](https://attack.mitre.org/resources/faq/) doesn't provide the same rigorous structure that an ATT&CK tactic or technique requires. In practice, procedures in ATT&CK are written in prose and commonly structured as `<Verb><Object> via/using <Tool/Method> [to/for <Outcome>]`[^1]. These descriptions add detail about particular attacks, but the examples listed on each technique page are far from comprehensive. Here's an example of the first entry from [OS Credential Dumping: LSASS Memory, Sub-technique T1003.001](https://attack.mitre.org/techniques/T1003/001/):

| ID                                                | Name                                                                           | Description                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [C0025](https://attack.mitre.org/campaigns/C0025) | [2016 Ukraine Electric Power Attack](https://attack.mitre.org/campaigns/C0025) | During the [2016 Ukraine Electric Power Attack](https://attack.mitre.org/campaigns/C0025), [Sandworm Team](https://attack.mitre.org/groups/G0034) used [Mimikatz](https://attack.mitre.org/software/S0002) to capture and use legitimate credentials. (source: https://www.dragos.com/wp-content/uploads/CRASHOVERRIDE2018.pdf) |

You can see the basic structure described above, but you can also see some potential issues. The lack of consistent structuring requires some kind of standardization, and some have gone so far as to create a STIX object[^4] for *procedure*, but even that definition gets fuzzy[^5]. 

### Tidal Cyber definition

Tidal Cyber is a company founded by several former MITRE folks[^3] so they start with and attempt to clarify the MITRE ATT&CK definition. In a presentation to Black Hat in 2025 (preserved in blog form [here](https://www.tidalcyber.com/blog/procedures-make-it-possible)), Tidal also observed this problem of varied definitions for procedures and proposed their own:
> A Procedure is a clearly defined, repeatable set of technical actions that an adversary - or simulated adversary - executes to achieve a specific objective.

They then extract procedures from threat intelligence writeups and group them together into likely related "procedure clusters", which are evaluated against each organization's defensive capabilities. It's a type of coverage that allows you to answer the question "did this actor who attacked organization A also successfully attack us?" after reading a threat intelligence writeup, but doesn't allow you to say how prepared you are for future attacks (which may or may not follow that extracted pattern). The next definition, however, might help with that ...

## On Detection definition

[[people/Jared Atkinson|Jared Atkinson]] wrote a [series of articles](https://specterops.io/blog/2023/11/14/part-11-functional-composition/) describing a comprehensive taxonomy for understanding attacker activity (beyond what MITRE defined with Tactics and Techniques). I highly recommend the entire series, but this is the key quote from [part 6](https://specterops.io/blog/2022/09/08/part-6-what-is-a-procedure/):

> ... one of the significant issues in the sub-discipline of Detection and Response is that our map is too low resolution to use to make sound and accurate predictions ... we apprehend the cyber world as something composed of three layers \[but there are\] at least six layers (*functions*, *operations*, *procedures*, *sub-techniques*, *techniques*, and *tactics*)

Jared's definition of a procedure (also from [part 6](https://specterops.io/blog/2022/09/08/part-6-what-is-a-procedure/)) is as follows:
> a sequence of *operations* that, when combined, implement a technique or sub-technique

This is necessary because, as Jared points out in [part 1](https://specterops.io/blog/2022/07/19/part-1-discovering-api-function-usage-through-source-code-review/):
> a three-tiered taxonomy (such as TTP) is far too limiting ... which leads to grouping different things ... at the bottom of the taxonomy. For this reason, it seems to me that the term “Procedures” is used too broadly ...

Jared goes on to further define operations and functions and I HIGHLY recommend working through the entire series[^6]. It's dense stuff, but unlike these brief snippets I've shared so far, it does far more to create a more robust model for detection than the other procedure definitions.  
## Procedure vs Instance

When I first read Jared's On Detection series, I couldn't figure out how to make it practical. Thankfully, the world has [[people/Andrew VanVleet|Andrew VanVleet]], who attended the aforementioned training and designed the [[Technique Research Report (TRR)]] format to generically apply On Detection to any technique. Furthermore, he wrote a blog post ([TTPI’s: Extending the Classic Model](https://medium.com/@vanvleet/ttpis-extending-the-classic-model-058c572b76f3)) that suggests we rename what MITRE and Tidal call *procedures* as *instances* (or perhaps *observables*). As Andrew notes, the term *instance* makes it more obvious that they are theoretically infinite, which should change the way we seek to detect them. 
## So what?

You may be asking why this even matters. Shouldn't we be focused on detecting the attacker anywhere we can? Who cares whether we call it a procedure, an instance, an indicator, or an observable, as long as we detect it?

The answer is *detection coverage*. As I learned while building [[ACRE]], it is nearly impossible to write a detection rule that completely catches all cases of a single technique - the latter is too broad. MITRE's [[Summiting the Pyramid Levels|Summiting the Pyramid]] approach points to this as well, with levels 1–4 of its five levels reserved for detections that partially detect a given technique. That means defining the level *below* technique is important, and everyone using and defining procedures agrees that detections operate against procedures (and that procedures roll up into techniques). 

Therefore, agreeing on the definition of procedure is essential to define what "good" means for detection programs. A detection program's success comes from building the right detections (accuracy) in the right place (coverage) at the right time (priority/time-to-implement/time-to-tune/etc.). The only way to measure coverage is against procedures, and if we don't agree on that definition, how will non-detection folks (like management, auditors, and regulators) know how to consistently evaluate us?

There's a great danger of using the *procedure-instance* approach to measure coverage. Because it's infinitely varied, lacks consistent schematized expression, and is dependent on cataloging attacker activity, [[detections based on threat intelligence are always opportunistic]] and reactive. Using procedure-instances, we can only measure ourselves against previously observed and documented threats. 

On the other hand, the Jared/Andrew definition (which I'll call *procedure-layer*) is provably finite. As Andrew says in his [TTPI post](https://medium.com/@vanvleet/ttpis-extending-the-classic-model-058c572b76f3), "there are only so many ways to get the operating system to do something specific." Each [[Technique Research Report (TRR)|TRR]] should aim to completely map one [[MITRE ATT&CK® is not flat#Product vs Platform|technique × product pair]], gradually expanding the known defensive space to benefit all corporate defensive teams and vendors. This area is where cybersecurity programs should invest resources and measure coverage, rather than constantly chasing an unlimited number of procedure-instances with the goal of gaining comprehensive coverage[^2]!

As Andrew says, both types of procedure (procedure-instance and procedure-layer) are useful for detection engineering. But please remember they serve different purposes and that [[some techniques should only be detected opportunistically|procedure-instances are opportunistic and don't measurably improve coverage]]. 


[^1]: This definition, as good as any that I've seen, is from [If I have 100% ATT&CK coverage why didn’t I detect that? | by Steve Cooper | Oct, 2026 | Medium](https://medium.com/@BlueTeamSteve/if-i-have-100-att-ck-coverage-why-didnt-i-detect-that-a6fda2101bb5)

[^2]: See #theme/coverage for more thoughts on this, and especially [[Detection coverage is a shared responsibility]]

[^3]: The three co-founders are all MITRE alums: [Company](https://www.tidalcyber.com/about-us)

[^4]: "Structured Threat Information Expression (STIX) is a language and serialization format used to exchange cyber threat intelligence (CTI). STIX enables organizations to share CTI with one another in a consistent and machine readable manner, allowing security communities to better understand what computer-based attacks they are most likely to see and to anticipate and/or respond to those attacks faster and more effectively." (From [the official documentation](https://oasis-open.github.io/cti-documentation/))

[^5]: An example procedure from the [STIX object blog post](https://www.dogesec.com/blog/ttps_are_missing_the_p/) is `Shadow copy deletion via vssadmin before ransomware deployment on backup infrastructure`, which removes the actor (probably good) but is still too vaguely defined, remains prose-structured, and can't be made [[Mutually Exclusive and Collectively Exhaustive (MECE)]] (MECE requires a tighter-scoped definition). 

[^6]: If you'd like a gentler introduction that spending a week reading the 15-post series, you could start with Part 6, 7, and 8 (Parts 1-5 are the background work for those posts). Alternatively, [SpecterOps offers a training on this content](https://specterops.io/training/tradecraft-analysis/), though I haven't taken it so can't personally vouch for it.
