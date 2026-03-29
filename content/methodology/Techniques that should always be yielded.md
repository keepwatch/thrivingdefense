---
tags:
  - author/Jordan_Anderson
  - type/stub
title: Techniques that should always be yielded
aliases:
created: 2026-03-27,
draft: false
promoted: false
---
Building on the idea that [[some techniques should only be detected opportunistically]], the next problem is - which ones? Using open-source detection library parsing originally done for the [[ACRE (ATT&CK Coverage Ratio Evaluation)|ACRE]] metric, I am analyzing rule counts, platforms, technique descriptions, and other factors to identify techniques that should always be yielded.

This will be a living document that I'll update as I learn more.

## Standards for analysis

- Many detections principle: techniques with a large number of detections for a single platform suggest instance-based detection and may need to be yielded
- No detections principle: techniques with NO detections for a platform may represent a TRR research opportunity or no detection viability


## Conclusions

## Methodology

