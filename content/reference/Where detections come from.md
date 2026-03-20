---
tags:
  - author/Jordan_Anderson
  - type/article
title: Where detections come from
aliases:
created: 2026-03-19,
draft: false
---
Have you ever wondered where detections come from? There are three main sources:

- Internal rules
- Shared rules
- Vendor rules

## Internal rules

Presumably my readers have at least a passing interest in [[detection engineering]], and a huge part of DE is writing and tweaking rules, so this method should not surprise you.

But if you zoom out a bit, isn't this a crazy way to do things? Each org is working hard to process the same threat intel content, the same reports, detecting the same red teams and red team tools. There are differences in blue team environments, to be sure, but the collective spend on detection engineering (and the lack of significant coordination in the field) baffles me.

To be clear, every company is unique and will have unique detection needs. But it will also need detections that many other orgs need. Which leads to the next category ...

## Shared rules

Indicator sharing is a relatively mature concept (though a bit dated post-[[Pyramid of Pain]]), but detection sharing has struggled to take off. [[Sigma]] is an incredible technology to facilitate detection sharing across different technology stacks, and it includes thousands of open-source rules, but many organizations are not using this data operationally. In fact, I've seen it integrated by vendors into their products far more than I've seen organizations independently deploy it. 

I've heard several reasons why organizations don't use Sigma rules:
- The Sigma converter isn't efficient for my chosen rule language (this is a real problem and a challenging one!)
- The Sigma converter isn't advanced enough to create all the detections I need (the common denominator problem, if an operation only exists on one platform, implementing it in Sigma is silly)
- Sigma rules are written with a different detection philosophy (sometimes said "Sigma rules are too loud")

All of these problems are solvable or can be mitigated, but there's enough inertia that it's far easier to keep writing and maintaining our own rules than investing time in using shared rules effectively.
## Vendor rules

There are a LOT of ways to acquire these rules from vendors, such as:
- An antivirus or Endpoint Detection & Response vendor, with host-based agents
- ITDR products will apply identity-based rules across SaaS applications
- Browser Detection & Response (BDR) will look for suspicious behavior in the browser
- Next-Gen Firewall (NGFW) can detect and mitigate suspicious networking traffic
- Email security systems can block or mitigate phishing emails
- SIEM (or XDR, or NG-SIEM) offerings will come configured with default rules (some even open-source them and [put them on the Internet](https://github.com/elastic/detection-rules))
- Sometimes, a company even explicitly sells access to a library of detection rules

The rules are often bundled with products that provide telemetry for you to write you own rules, so you may find that buying a product for internal detections also gives you a free set of vendor detections.

One massive problem with vendor rules, though, is [[Validating vendor detection effectiveness|validating vendor detection effectiveness]]. 


