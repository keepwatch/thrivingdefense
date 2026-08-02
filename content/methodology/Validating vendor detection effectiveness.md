---
tags:
  - author/Jordan_Anderson
  - type/article
  - theme/validation
title: Validating vendor detection effectiveness
description: Why "trust us" isn't enough — and how TRR-based tests can hold your vendor accountable for detection gaps.
aliases:
created: 2026-03-19,
draft: false
---
We've discussed [[Where detections come from#Vendor rules|elsewhere]] that one key method of acquiring detection rules is by buying them. But it's incredibly difficult to assess how much coverage or effectiveness a vendor product actually offers. Usually, vendors don't release the full list of rules they run against your environment[^1] — citing trade secrets and the risk of tipping off attackers. Instead, they produce too-good-to-be-true **100% MITRE ATT&CK® COVERAGE** claims, humblebrag about their vast visibility into cross-customer data, and write blog posts about the hot new threats their threat intel team found last week.

But how do we **know**? How can we decide whether we can trust the vendor to detect that specific attack? 
## Approaches

- ==Always trust the vendor==. Believe they have full coverage until an incident (or red team assessment) identifies the gaps. At that point, you can either work with the vendor to add new rules (or add them yourself). **Problem**: an assessment or attack will show one attack path, not all possible attack paths, so there must be a more comprehensive approach.
- ==Never trust the vendor==. Build all detections that your team needs to have and treat the vendor detections as "nice-to-have". **Problem**: this produces duplicative effort and increases long-term technology and detection maintenance costs.
- ==Build detections where the vendor has gaps==. This could be organization-specific rules, cases where you know the vendor doesn't have coverage for one reason or another, etc. **Problem**: vendors are often wary to give up their "secret sauce" detections - they may provide detection name, but not logic; and even if they provide logic, deduplicating coverage from one rule to another is very hard to do (correctly). 

## Covering vendor gaps

Assuming we want to fill the vendor's gaps with our own detections, what can we do to describe those gaps **before** an attack occurs? Well, we could use one of many [[BAS|Breach & Attack Simulation (BAS)]] products, or potentially an open-source alternative like Atomic Red Team. These products provide a native test suite that would allow validation of detection & prevention coverage *against the tests provided within the BAS/ART product*. Of course, going back to the "do you trust the vendor/product" question, you cannot know that the BAS/ART tests overlap well with your detection objectives (in my experience, vendor test suites map to a small fraction of a custom rule library). 

Alternatively, we can [[prove coverage with validation tests]]. The key word here is **prove**, because in this case, with complete understanding of a given technique and platform pair, a complete set of tests can be written for each procedure. And this gets to the key principle:

> [[Technique Research Report (TRR)|TRR]]-based validation tests can be used to **prove** vendor detection coverage!

Validation tests based off deep technique research are the best way to know what coverage we can expect from our vendors, and what must be built ourselves. In the end, this is the only method to truly hold our vendors (and ourselves) accountable! 

### Repeated vendor validation

If custom [[detection libraries must be repeatedly validated]], vendor libraries deserve even more scrutiny. After all, a vendor could remove or break a detection that was a lynchpin of your coverage strategy at any point — and never tell you. Only repeated testing of vendor coverage will catch that gap before a breach does.

## Conclusion

- Consider your strategy for using vendor detections. Are you over- or under-relying on them?
- Run the tests identified in the [[Technique Research Report (TRR)|TRR]] library ([example](https://github.com/tired-labs/techniques/blob/main/reports/trr0011/ad/README.md#available-emulation-tests)) to test your custom and vendor detections. Did these tests match your expectations?
- If you find a TRR procedure without a test, consider writing one, [contributing it to Atomic Red Team](https://github.com/redcanaryco/atomic-red-team/wiki/Contributing), and updating the TRR for everyone's benefit!
	- P.S. - [first time ART contributors get a free T-shirt!](https://github.com/redcanaryco/atomic-red-team/wiki/Contributing#claim-your-free-t-shirt)
- Plan and execute [[detection libraries must be repeatedly validated|recurring validation]] of your initial findings

[^1]: Splunk, Elastic, and Palo Alto are notable exceptions.