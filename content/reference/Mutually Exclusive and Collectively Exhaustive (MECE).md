---
tags:
  - author/Jordan_Anderson
  - type/stub
title: Mutually Exclusive and Collectively Exhaustive (MECE)
aliases:
created: 2026-04-03,
draft: false
---
It's very human to categorize, especially with small sets of data, but creating categories that meet the titular standard is very difficult. It requires complete knowledge of the thing being categorized and careful thought to find unexpected edges.

The MECE phrase came from business strategy consultant at McKinsey & Company per [Wikipedia](https://en.wikipedia.org/wiki/MECE_principle), but it makes an intuitive concept explicit:
> Some set of items can be broken into subsets that are mutually exclusive (do not overlap with each other) and collectively exhaustive (every item in the set could be added to a subset)

If you're not sure how to apply this, imagine you want to classify the originating cause of a cybersecurity incident, and you have the following choices:

- Malware executed
- Compromised credentials
- Phishing
- Exploitation

These choices do not follow the MECE principle:
- Sometimes exploitation and compromised credentials are combined for an attack - not all RCEs are pre-authentication, for example - so this is not mutually exclusive (ME)
- The list doesn't include supply chain attacks (and other valid origins) so it's not collectively exhaustive (CE)