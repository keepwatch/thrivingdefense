---
tags:
  - author/Jordan_Anderson
  - type/stub
title: identify impossible travel
aliases:
created: 2026-03-25
description: Why impossible travel sounds like a great detection — but rarely works as an operational alert
draft: false
---
Impossible travel is a simple idea - if you can see that a person authenticates within a short time period from two locations so far apart that there's no way they could be in the same place, bingo — impossible travel, which means at least one malicious authentication!

There are a few problems with this in practice.

1. Complex rules (or a bit simpler code) will need to have the Haversine formula embedded[^1]. [[Efficiency-Thoroughness Tradeoff (ETTO) principle|Complexity increases maintenance cost]].
2. IP addresses don't always correspond to a user's physical location — often for benign reasons. Mobile network traffic often has IPs linked to the mobile provider offices, not the actual location of the cell towers. Users can even remotely log into their computer in London while in Sydney, for example.
3. Geolocation data (associating an IP address to a location on Earth) is [99% accurate for country-level data, but far less so for state- or city-level data](https://www.maxmind.com/en/geoip/ip-geolocation-accuracy). This can drastically skew location results for large countries, which creates a lot of [[false positives and false negatives occur on a continuum|false positives]] for this alert.

In fact, a few years ago, [Microsoft decided](https://techcommunity.microsoft.com/blog/microsoftthreatprotectionblog/transform-the-way-you-investigate-by-using-behaviors--new-detections-in-xdr-star/3825154) that their impossible travel rule was actually better as a "behavior", a type of security event or signal - not an operational alert. If Microsoft is [[some techniques should only be detected opportunistically|yielding this technique]], perhaps we should all follow suit.




[^1]: https://community.splunk.com/t5/Reporting/Find-the-Distance-Between-Two-or-More-Geolocation-Coordinates/td-p/57653
