---
tags:
  - author/Jordan_Anderson
  - type/article
title: Analysis of MITRE ATT&CK® coverage
aliases:
created: 2026-04-03,
draft: true
promoted: false
---
As part of the quest to identify [[Techniques that should always be yielded|yielded techniques]] (those that should only be detected [[some techniques should only be detected opportunistically|opportunistically]]), I decided to dive into MITRE ATT&CK and four detection engineering data sources linked to it: Atomic Red Team (ART) tests along with Sigma, Elasticsearch, and Splunk opensource rule libraries. These four resources have tried to cover the breadth of ATT&CK, so analyzing the linked data could prove useful in our quest to identify the detectable.

## Technique x platform observations

Starting from work we did for [[ACRE|ACRE]], I knew that we needed to tackle ATT&CK platforms. From a coverage perspective, we can't say "I detect technique XYZ" without recognizing and accounting for each platform (for example, Powershell detection on Windows and MacOS is completely different, and the rules do not overlap). You can read more about that in [[MITRE ATT&CK® is not flat]].

Based on analysis done in April 2026:
- There are 1837 total ==techniques x platform pairs (TxPs)==. 
	- For example, `T1001.002` (Steganography) is linked to 4 platforms (Windows, Mac, Linux, and ESXi), so that technique and its platforms makes up 4 of the 1837.
- 988 of the TxPs are linked to at least one Atomic Red Team (ART) test (or Elastic/Sigma/Splunk rule), and 849 are not.
	- `T1001.002` x `Windows` has 2 ART tests, and `Linux` has an additional ART test. None of them have any rules, and `MacOS` / `ESXi` platforms have no rules or tests.

But this information is still too high level to be useful. What happens when we go one level deeper?

## Mapping open-source tests & rules to TxPs

## Rule/test overlap analysis

## Rule/test counts
