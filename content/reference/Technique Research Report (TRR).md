---
tags:
  - author/Jordan_Anderson
  - type/definition
title: Technique Research Report (TRR)
description: Maps all procedures within an ATT&CK technique to enable comprehensive, testable detections.
aliases:
  - TRR
created: 2026-03-07, 09:21
---
> A TRR documents the distinct procedures that implement a technique, including the background and technical information necessary to understand how those procedures work. **TRRs provide the context, information, and potential telemetry needed to create a robust detection strategy tailored to your specific environment.**

TRRs were created by [[people/Andrew VanVleet|Andrew VanVleet]] to define a structured format for comprehensive (instead of opportunistic) detection research. Building on the principles of [Capability Abstraction](https://specterops.io/blog/2020/02/06/capability-abstraction/) defined by [[people/Jared Atkinson|Jared Atkinson]], and the subsequent schematization of [[Defining procedure#Procedure vs Instance|procedures]], TRRs seek to define all procedures within a given technique. This comprehensive knowledge gives defenders the ability to write detection validation tests and/or detection rules using the research.

Another reason for creating the TRRs is to ensure the detection *context* is recorded, not just the rule. The appropriate context helps detection engineers manage and tune the rule as environmental circumstances change.

TRRs are designed to be collaborative, since they establish data that can be used by any organization for their specific detection strategy. There is a [contribution guide](https://github.com/tired-labs/techniques/blob/main/docs/CONTRIBUTING.md), [detailed guide on TRR format](https://github.com/tired-labs/techniques/blob/main/docs/TECHNIQUE-RESEARCH-REPORT.md), and a [public library](http://library.tired-labs.org/) of completed TRRs that can be used today. 

See also [this blog post](https://medium.com/@vanvleet/technique-research-reports-capturing-and-sharing-threat-research-003c80ac9a4d) where Andrew describes the TRRs in more depth.

## Overall TRR process

The TRR process starts with theorizing about the methods/procedures that could be used to execute this technique on a given product[^3]. This should be inspired by TRRs for similar techniques as well as research about what has already been written on the internet. The next phase is to test it to see if the procedures that were described are actually possible - do they work in the real world? Once determining what procedures work, build a graph (the Detection Data Model, or DDM ) which shows the OS and application path that is taken when a given procedure is exercised[^1]. This discovery could collapse multiple theorized procedures to a single procedure, perhaps because a different theoretical procedure actually uses the same fundamental up Windows API. The DDM also shows path and potential telemetry that aids the detection engineer with building detections. 

Once the TRR exists and the procedures are formalized, we next find or write a formal emulation test for each procedure, afterwards executing it in each distinct environment where that procedure would be relevant. This will reveal existing defensive coverage (whether it be a detection or prevention). Any gaps that are not covered after the testing should be remediated with preventative or detective controls. Starting with validation is in the spirit of [[Turning the TIDE with Test-Initiated Detection Engineering|TIDE]], offering current and repeated future validation of the coverage. 

In other words, that process is:
1. Theorize about how to execute a technique on a product. Not just the easiest way, but all of the ways.
2. Test if those methods (aka procedures) are actually possible
3. Draw out each procedure that worked in testing into a DDM and deduplicate (removing the ones that take the same underlying path but have slight execution variances)
4. Find or build a test for each remaining procedure
5. Execute the test in every relevant area[^2]
6. Record the outcome of the test - *prevented*, *detected*, *logged*, or *none of the above*
7. If possible, strengthen the controls (upgrade detections to preventions, etc.)
8. Record the current coverage quality[^4]
9. Regularly repeat validation to confirm that controls remain effective. Ideally [[detection libraries must be repeatedly validated|automate this]].

## Why TRRs are the best job application material known to man

Getting a job in $currentyear is hard. The market is filled with thousands of per-job AI-generated resumes, HR teams are reportedly using AI to sift through the volume of applications, and interviews are like speed-dating your future employer/employee. In my mind, the ideal method to evaluate someone would be to hire them temporarily, work with them, and see the product they produce as well as their process and interaction with others. Short of restructuring a company's entire interview process, though, can anything be done?

Here's the advantages of applying for a job on the merits of your TRRs:

1. Your work is done in the open, much like a software engineer would have in their CV on GitHub[^5]
2. It can be validated
	- I'd advocate that TRRs should come with emulation tests and detection ideas with Sigma, but even if they don't, it's not much work to create those artifacts based on a TRR. Executing them and validating internal consistency is trivial.
3. It shows the depth of thought you exercised - did you act entirely as a meat proxy, just accepting whatever AI recommended you do? Or did you [[Writing ideas down refines them into truth|write down ideas yourself, refining them into truth]]?
4. If you did well and had the TRR accepted to the official repo, you can say to employers (even those not TRR-aware) that your existing detection research has been used to secure dozens of other organizations - pretty cool
5. There's no sensitive, company-specific data included in a TRR. Someone could imply that you must have access to a product in order to research it, but many of the products we seek to defend are common across orgs - so what if we write about an Active Directory technique?

[^1]: Here's an example: https://github.com/vanvleeta/technique-reports/blob/main/reports/trr0016/win/README.md#detection-data-model

[^2]: If you have 20 AD domains, you need to execute the DC sync test 20 times. Prioritize the most important AD domains, or use the process in [[Detection coverage is a shared responsibility]] to prioritize

[^3]: See [[MITRE ATT&CK® is not flat]] to learn why we're looking for technique x product pair coverage

[^4]: We don't have a standard way to do this yet, but [[Andrew VanVleet]] is working on something!

[^5]: I sense an objection coming - "how useful is this when AI slop generates all the code and possibly even TRRs?" See the next point.
