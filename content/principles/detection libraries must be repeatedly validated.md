---
tags:
  - author/Jordan_Anderson
  - type/article
  - theme/validation
title: detection libraries must be repeatedly validated
description: Detection rules can silently fail for months. Repeatable validation tests are the only way to catch the gaps.
aliases:
created: 2026-03-18,
draft: false
promoted: true
---
I've made this mistake more times than I care to admit — forgetting to revert a modified rule back to its original state, and only catching the problem months later. Maybe I left in a hostname I was using for testing, or I forgot to restore the ==entire== search clause after only testing ==part== of it. Either way, the rule had been running in prod, silently missing security events the whole time. Or, worse: an analyst discovers in a post-mortem that the LSASS dumping rule never fired because the logs have been broken for a year.

> Security detection is a delicate thing. 

There's a lot that can go wrong: log collection, log delivery, event ingestion, search/retrieval infrastructure, and finally the rule logic itself. A failure at any point in that chain creates False Negatives — alerts that should have fired on real security activity but never did. And there's no straightforward way to find what you're missing.

## Defining repeatable detection validation
This is why ==repeatable detection validation== is so important. We already have part of the foundation — many detection engineers do *validation at rule creation time*. It makes sense: you want to prove the rule can generate True Positives at least once before it goes live. But environment and network drift, tuning mistakes, logging format changes, infrastructure changes, and a host of other issues can break a once-validated rule. The only way to stay ahead of this is to:
1. Repeatedly execute detection validation tests
2. Link tests to our detections
3. Inform someone when a detection rule is in a False Negative state (a test executed but the detection did not create an alert).

### Why use a system test

What I'm proposing is more like a *system test* than a *unit test*. A unit test might take a sample log entry that the rule should always match and verify that the rule logic consistently matches it. That's useful, but it only addresses a narrow slice of what could go wrong — we need something more representative.

## How to do repeated validation

### Open source
There are several open-source test libraries (such as [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team)), which are often paired with an execution tool that allows you to run `1-n` tests in your environment. This provides feature 1 from our list above. However, you have to find a way to provide features 2-3 yourself - non-trivial!

The open-source libraries also focus on host-based detections (which are admittedly far easier to execute!), but network- or application-based emulations are harder to execute through ART's host-based framework, which also means they are less likely to have pre-built tests.

### Vendor (BAS)
There are products in the Breach & Attack Simulation (BAS) space that seem like they would be good fits for this problem. Like ART, they also contain test suites and also provide scheduling, and they do offer a greater degree of test types. However, they seem designed for a different problem - determining if your organization can **block** or detect known attack patterns. This means the linking of tests to detections, or alerting on false negatives, often still needs to be built. I haven't found a vendor already offering this as a service, but we have found vendors who are willing to work with us - [[Jordan Anderson#Contact info|reach out]] if you'd like a recommendation.

## Challenges

If done incorrectly, repeatable detection validation can make the situation much worse, or at least, much more complicated:

- The difficulty of managing a detection library is compounded with the difficulty of managing a validation library. 
	- The question of validation coverage ("how do you know if you have enough validation tests?") echoes [[ACRE (ATT&CK Coverage Ratio Evaluation)#How do you know if you have enough detections?|the timeless detection coverage question]]. 
	- On a related note, how do you avoid building duplicative validation tests? Searching through the validation library for an overlap is non-trivial (the same problem exists within the detection library).
- Validation systems now have to be maintained and themselves monitored. 
- BAS providers often offer "coverage metrics" that could drive detection development more towards covering a BAS test suite than addressing appropriate defensive gaps.

But it's still a necessary approach, at least for the techniques [[some techniques should only be detected opportunistically|that must be detected comprehensively]]. I'll have more to say about how to do this well in future posts.

## Additional reading

- [[Validating vendor detection effectiveness]]
- [[Turning the TIDE with Test-Initiated Detection Engineering]]