---
tags:
  - author/Jordan_Anderson
  - type/definition
title: Technique Research Report (TRR)
description: An introduction to TRRs, a structured documentation format created by Andrew VanVleet for comprehensive detection research.
aliases:
created: 2026-03-07, 09:21
---
> A TRR documents the distinct procedures that implement a technique, including the background and technical information necessary to understand how those procedures work. **TRRs provide the context, information, and potential telemetry needed to create a robust detection strategy tailored to your specific environment.**

TRRs were created by [[people/Andrew VanVleet|Andrew VanVleet]] to define a structured format for comprehensive (instead of opportunistic) detection research. Building on the principles of [Capability Abstraction](https://specterops.io/blog/2020/02/06/capability-abstraction/) defined by [[people/Jared Atkinson|Jared Atkinson]], and the subsequent schematization of [[MITRE ATT&CK Procedures and Instances|procedures]], TRRs seek to define all procedures within a given technique. This comprehensive knowledge gives defenders the ability to write detection validation tests and/or detection rules using the research.

Another reason for creating the TRRs is to ensure the detection *context* is recorded, not just the rule. The appropriate context helps detection engineers manage and tune the rule as environmental circumstances change.

TRRs are designed to be collaborative, since they establish data that can be used by any organization for their specific detection strategy. There is a [contribution guide](https://github.com/tired-labs/techniques/blob/main/docs/CONTRIBUTING.md), [detailed guide on TRR format](https://github.com/tired-labs/techniques/blob/main/docs/TECHNIQUE-RESEARCH-REPORT.md), and a [public library](http://library.tired-labs.org/) of completed TRRs that can be used today. 

See also [this blog post](https://medium.com/@vanvleet/technique-research-reports-capturing-and-sharing-threat-research-003c80ac9a4d) where Andrew describes the TRRs in more depth.
