---
tags:
  - author/Jordan_Anderson
  - type/reference
title: MITRE ATT&CK SaaS Techniques
description: A complete list of all MITRE ATT&CK techniques and sub-techniques applicable to the SaaS platform (ATT&CK v16.1).
aliases:
  - SaaS Techniques
  - ATT&CK SaaS
created: 2026-03-27
---
MITRE ATT&CK v16.1 includes **63 unique techniques and sub-techniques** (22 parent techniques, 41 sub-techniques) where the platform includes **SaaS**. Many techniques span multiple tactics, so per-tactic counts exceed 63.

## Initial Access (6)

| ID | Name |
|---|---|
| T1078 | Valid Accounts |
| T1078.001 | Valid Accounts: Default Accounts |
| T1078.004 | Valid Accounts: Cloud Accounts |
| T1199 | Trusted Relationship |
| T1566 | Phishing |
| T1566.002 | Phishing: Spearphishing Link |

## Execution (3)

| ID | Name |
|---|---|
| T1059.009 | Command and Scripting Interpreter: Cloud API |
| T1072 | Software Deployment Tools |
| T1648 | Serverless Execution |

## Persistence (12)

| ID | Name |
|---|---|
| T1078 | Valid Accounts |
| T1078.001 | Valid Accounts: Default Accounts |
| T1078.004 | Valid Accounts: Cloud Accounts |
| T1098 | Account Manipulation |
| T1098.001 | Account Manipulation: Additional Cloud Credentials |
| T1098.003 | Account Manipulation: Additional Cloud Roles |
| T1136 | Create Account |
| T1136.003 | Create Account: Cloud Account |
| T1546 | Event Triggered Execution |
| T1556 | Modify Authentication Process |
| T1556.006 | Modify Authentication Process: Multi-Factor Authentication |
| T1556.007 | Modify Authentication Process: Hybrid Identity |

## Privilege Escalation (7)

| ID | Name |
|---|---|
| T1078 | Valid Accounts |
| T1078.001 | Valid Accounts: Default Accounts |
| T1078.004 | Valid Accounts: Cloud Accounts |
| T1098 | Account Manipulation |
| T1098.001 | Account Manipulation: Additional Cloud Credentials |
| T1098.003 | Account Manipulation: Additional Cloud Roles |
| T1546 | Event Triggered Execution |

## Defense Evasion (13)

| ID | Name |
|---|---|
| T1036.010 | Masquerading: Masquerade Account Name |
| T1078 | Valid Accounts |
| T1078.001 | Valid Accounts: Default Accounts |
| T1078.004 | Valid Accounts: Cloud Accounts |
| T1211 | Exploitation for Defense Evasion |
| T1550 | Use Alternate Authentication Material |
| T1550.001 | Use Alternate Authentication Material: Application Access Token |
| T1550.004 | Use Alternate Authentication Material: Web Session Cookie |
| T1556 | Modify Authentication Process |
| T1556.006 | Modify Authentication Process: Multi-Factor Authentication |
| T1556.007 | Modify Authentication Process: Hybrid Identity |
| T1562.008 | Impair Defenses: Disable or Modify Cloud Logs |
| T1656 | Impersonation |

## Credential Access (15)

| ID | Name |
|---|---|
| T1110 | Brute Force |
| T1110.001 | Brute Force: Password Guessing |
| T1110.003 | Brute Force: Password Spraying |
| T1110.004 | Brute Force: Credential Stuffing |
| T1528 | Steal Application Access Token |
| T1539 | Steal Web Session Cookie |
| T1552 | Unsecured Credentials |
| T1552.008 | Unsecured Credentials: Chat Messages |
| T1556 | Modify Authentication Process |
| T1556.006 | Modify Authentication Process: Multi-Factor Authentication |
| T1556.007 | Modify Authentication Process: Hybrid Identity |
| T1606 | Forge Web Credentials |
| T1606.001 | Forge Web Credentials: Web Cookies |
| T1606.002 | Forge Web Credentials: SAML Tokens |
| T1621 | Multi-Factor Authentication Request Generation |

## Discovery (7)

| ID | Name |
|---|---|
| T1069 | Permission Groups Discovery |
| T1069.003 | Permission Groups Discovery: Cloud Groups |
| T1087 | Account Discovery |
| T1087.004 | Account Discovery: Cloud Account |
| T1201 | Password Policy Discovery |
| T1526 | Cloud Service Discovery |
| T1538 | Cloud Service Dashboard |

## Lateral Movement (7)

| ID | Name |
|---|---|
| T1021.007 | Remote Services: Cloud Services |
| T1072 | Software Deployment Tools |
| T1080 | Taint Shared Content |
| T1534 | Internal Spearphishing |
| T1550 | Use Alternate Authentication Material |
| T1550.001 | Use Alternate Authentication Material: Application Access Token |
| T1550.004 | Use Alternate Authentication Material: Web Session Cookie |

## Collection (7)

| ID | Name |
|---|---|
| T1119 | Automated Collection |
| T1213 | Data from Information Repositories |
| T1213.001 | Data from Information Repositories: Confluence |
| T1213.003 | Data from Information Repositories: Code Repositories |
| T1213.004 | Data from Information Repositories: Customer Relationship Management Software |
| T1213.005 | Data from Information Repositories: Messaging Applications |
| T1530 | Data from Cloud Storage |

## Exfiltration (4)

| ID | Name |
|---|---|
| T1048 | Exfiltration Over Alternative Protocol |
| T1537 | Transfer Data to Cloud Account |
| T1567 | Exfiltration Over Web Service |
| T1567.004 | Exfiltration Over Web Service: Exfiltration Over Webhook |

## Impact (5)

| ID | Name |
|---|---|
| T1496 | Resource Hijacking |
| T1496.003 | Resource Hijacking: SMS Pumping |
| T1496.004 | Resource Hijacking: Cloud Service Hijacking |
| T1531 | Account Access Removal |
| T1657 | Financial Theft |
