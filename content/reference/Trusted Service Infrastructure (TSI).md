---
tags:
  - author/Jordan_Anderson
  - type/definition
title: Trusted Service Infrastructure (TSI)
description: An overview of the risks inherent to powerful administrative applications, including examples of technologies.
aliases:
created: 2026-03-07
---
Mandiant/Google started using this term in 2024 to refer to "management interfaces for platforms and technologies that provide core services for an organization". This definition was added in passing to the blog post [Defending Against UNC3944: Cybercrime Hardening Guidance from the Frontlines | Google Cloud Blog](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-proactive-hardening-recommendations), because UNC3944 and its ilk focused on conducting malicious operations with minimal malware use. Through stealing credentials via access brokers or social engineering, threat actors would search information repositories for secrets and eventually gain access to powerful tools (in [this case](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications), the threat actor even gained access to an EDR and used it to run commands on target systems via real-time response!).

Our increasingly complex technology environments require powerful tools to monitor and manage them, but those tools come with risks. Detecting and securing TSI products is necessary to defend our organizations.

## Examples of TSI

An incomplete list is provided below.
### Asset and Patch Management Tools

Dangerous capabilities: 
- Deploying software and configurations
- Adding attacker-controlled systems into victim organizations

Example software:
- SCCM
- Intune
- JAMF
### Network Management Tools and Devices

Dangerous capabilities: 
- Deploying software and configurations
- Adding attacker-controlled systems into victim organizations

Example software:
- Solarwinds
- Nagios
### Virtualization Platforms

Dangerous capabilities: 
- Facilitating network or logon access to sensitive systems
- Adding attacker-controlled systems into victim organizations

Example software:
- VMWare Vsphere and ESXi
### Backup Technologies

Dangerous capabilities: 
- Deleting or corrupting pre-existing backups (useful before encrypting or deleting sensitive files and issuing a ransom demand)

Example software:
- Veeam
- Cohesity
- Acronis
### Security Tooling

Dangerous capabilities: 
- Executing software and deploying configurations
- Using containment features for impact, like locking out systems or user accounts

Example software:
- EDR (Crowdstrike, Carbon Black, Palo Alto XDR, etc)
### Privileged Access Management Systems

Dangerous capabilities: 
- Granting access to powerful or sensitive credentials
- Facilitating network or logon access to sensitive systems

Example software:
- CyberArk
- Teleport
