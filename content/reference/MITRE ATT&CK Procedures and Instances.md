---
tags:
  - author/Jordan_Anderson
  - type/definition
title: ATT&CK Procedures and Instances
description: Why ATT&CK 'instances' and On Detection 'procedures' are different — and why that distinction matters.
aliases:
  - ATT&CK Procedures and Instances
created: 2026-03-07
---
The term *procedure* originates from the military, but enters common cybersecurity use in 2013, when it shows up in the [[Pyramid of Pain|Pyramid of Pain]]. Using this model, David J Bianco urges defenders to detect behavior (Tactics, Techniques, and Procedures (TTPs)) rather than indicators alone. Also in 2013, MITRE ATT&CK® classified attacker behavior into Tactics and Techniques while defining some procedures opportunistically.

There are two different (and incompatible) approaches to defining a procedure.

## MITRE ATT&CK definition

> Procedures are the specific implementation the adversary uses for techniques or sub-techniques. For example, a procedure could be an adversary using PowerShell to inject into lsass.exe to dump credentials by scraping LSASS memory on a victim. Procedures are categorized in ATT&CK as the observed in the wild use of techniques in the "Procedure Examples" section of technique pages.

The definition above sources from the [ATT&CK FAQ](https://attack.mitre.org/resources/faq/). In practice, procedures in ATT&CK have no set format and are dependent on threat intelligence, taking the form of a table within each Technique page. Here's an example from 

## On Detection definition

[[people/Jared Atkinson|Jared Atkinson]] wrote a [series of articles](https://specterops.io/blog/2023/11/14/part-11-functional-composition/) describing a comprehensive taxonomy for understanding attacker activity (beyond what MITRE defined with Tactics and Techniques). I highly recommend the entire series, but this is the key quote from [part 6](https://specterops.io/blog/2022/09/08/part-6-what-is-a-procedure/):

> ... one of the significant issues in the sub-discipline of Detection and Response is that our map is too low resolution to use to make sound and accurate predictions ... we apprehend the cyber world as something composed of three layers \[but there are\] at least six layers (functions, operations, procedures, sub-techniques, techniques, and tactics)

Jared's definition of a procedure (also from [part 6](https://specterops.io/blog/2022/09/08/part-6-what-is-a-procedure/)) is as follows:
> a sequence of operations that, when combined, implement a technique or sub-technique

This is necessary because, as Jared points out in [part 1](https://specterops.io/blog/2022/07/19/part-1-discovering-api-function-usage-through-source-code-review/):
> a three-tiered taxonomy (such as TTP) is far too limiting ... which leads to grouping different things ... at the bottom of the taxonomy. For this reason, it seems to me that the term “Procedures” is used too broadly ...

Jared goes on to further define operations and functions, but for our purpose, it's important to note that these two definitions of procedure are incompatible. In this latter definition, creating a logical relationship of technique to procedures allows researchers to define the boundaries of an attack via the [[Technique Research Report (TRR)]] and similar tools.
## Procedure vs Instance

[[people/Andrew VanVleet|Andrew VanVleet]] recently wrote a blog post ([TTPI’s: Extending the Classic Model](https://medium.com/@vanvleet/ttpis-extending-the-classic-model-058c572b76f3)) that explains MITRE ATT&CK is not recording *procedures*, but more precisely is documenting *instances* (or perhaps *observables*). Using the more precise term benefits detection engineers who are working to define coverage.

Remember:
- Procedures can be comprehensively enumerated, tested, and detected
- Instances are subject to threat intelligence reporting and recording, and  [[detections based on threat intelligence are always opportunistic]], not comprehensive.


