---
tags:
  - author/Jordan_Anderson
  - type/article
title: detection libraries must be repeatedly validated
aliases:
created: 2026-03-18,
draft: true
---
I've made this mistake more times than I care to admit - forgetting to revert the rule I modified to its original state, and only catching the issue months later. Perhaps I didn't remove the hostname I was using for testing, or I forgot to add back the ==entire== search clause after only testing ==part== of it. Either way, it seems I'd only catch that issue months later, after the rule was running in prod and potentially missing security events that entire time. Or, sometimes in the security incident post-mortem, an analyst would realize the LSASS dumping rule didn't fire because the logs have been broken for a year. 

> Security detection is a delicate thing. 

There's a lot that can go wrong, from log collection, log delivery, event ingestion, event search/retrieval infrastructure, and finally rule logic errors. A failure at any point in that process can create False Negatives, alerts that should've fired on real security activity but never did - and there's no good way to find the missing alerts!

## Defining repeatable detection validation
This is why ==repeatable detection validation== is so important. We have the foundation of this already - many detection engineers are doing *validation at rule creation time*. Folks understandably want to prove that the rule can generate True Positives at least once before it's operationalized - otherwise, that rule is worse than useless! However, environment/network drift, tuning mistakes, logging format or infrastructure changes, and a host of other problems can disrupt that once-validated rule. The only way to address this is to:
1. Repeatedly execute detection validation tests
2. Link tests to our detections
3. Inform someone when a detection rule is in a False Negative state (a test executed but the detection did not create an alert).

### Why use a system test

What I'm proposing is more like a *system test* than a *unit test*. A unit test could be taking a sample log entry that the rule should always match, and ensuring the rule logic will consistently match that sample. That's a good thing, but it only addresses a few of the problems that could prevent the rule from firing - we need a more representative sample.

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

But it's still a necessary approach, at least for the techniques [[some techniques should only be detected opportunistically|which must be detected comprehensively]]. I'll have more to say about how to do this well in future posts.

## Additional reading

- [[Validating vendor detection effectiveness]]