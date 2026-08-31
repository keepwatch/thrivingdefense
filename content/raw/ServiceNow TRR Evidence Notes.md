---
tags:
  - author/Jordan_Anderson
  - type/stub
title: ServiceNow TRR Evidence Notes
aliases:
created: 2026-08-30
draft: true
promoted: false
---

This AI-generated, human-edited-and-reviewed research note supports [[Writing TRRs for TSI]]. It records why each ServiceNow/DPM behavior in that post belongs in the inventory to facilitate future TRR writing from the report.

The source for every entry is [MDSec's “When it Snows it Pours – Anatomy of a ServiceNow Red Team”](https://www.mdsec.co.uk/2026/08/when-it-snows-it-pours-anatomy-of-a-servicenow-red-team/). Excerpts below are intentionally short. The report is evidence, not procedural instruction.

## Initial access

### Steal a ServiceNow session cookie

**Report evidence:** _Initial Access_ — “quick cookie dumping process.”

**ServiceNow action:** Obtain the authenticated browser cookie from the compromised employee's endpoint.

**ATT&CK:** [T1539 — Steal Web Session Cookie](https://attack.mitre.org/techniques/T1539/). This is distinct from replaying the cookie.

### Use a stolen ServiceNow session cookie

**Report evidence:** _Initial Access_ — “piggy-backed off their session.”

**ServiceNow action:** Replay the stolen authenticated cookie to act as the user in ServiceNow.

**ATT&CK:** [T1550.004 — Use Alternate Authentication Material: Web Session Cookie](https://attack.mitre.org/techniques/T1550/004/). The report's cookie dumping and subsequent tenant access are two discrete techniques, so they remain separate rows.

### Exploit a public ServiceNow application

**Report evidence:** _Initial Access_ — ServiceNow vulnerabilities allow execution “from an unauthenticated perspective.”

**ServiceNow action:** Exploit a ServiceNow vulnerability that makes the Internet-facing service execute attacker-controlled Glide code.

**ATT&CK:** [T1190 — Exploit Public-Facing Application](https://attack.mitre.org/techniques/T1190/). The report refers to external vulnerability research rather than reproducing an exploit, which is sufficient evidence for the technique but not a procedure inventory.

### Use a valid ServiceNow cloud account

**Report evidence:** _Initial Access_ — “credentials for the MID service account” were compromised; the report also uses an employee's authenticated ServiceNow session.

**ServiceNow action:** Authenticate to the tenant with an existing user or MID service account.

**ATT&CK:** [T1078.004 — Valid Accounts: Cloud Accounts](https://attack.mitre.org/techniques/T1078/004/). This applies to SaaS user and service accounts, and can support initial access, persistence, privilege escalation, or stealth depending on use.

## Execution and lateral movement

### Execute Glide script

**Report evidence:** _Privilege Escalation_ — “execute some form of Glide Script.”

**ServiceNow action:** Execute JavaScript through a ServiceNow feature such as a transform, User Criteria, workflow script step, report builder, business rule, or scheduled job.

**ATT&CK:** [T1059.007 — Command and Scripting Interpreter: JavaScript](https://attack.mitre.org/techniques/T1059/007/). The ServiceNow entry points are procedures, not separate techniques.

### Execute commands on a MID server

**Report evidence:** _Post-Exploitation_ — “send Operating System commands to a specific MID server.”

**ServiceNow action:** Use the ECC queue or a MID extension to cause a connected on-premise server to execute code or commands.

**ATT&CK:** [T1059 — Command and Scripting Interpreter](https://attack.mitre.org/techniques/T1059/). The relevant subtechnique depends on the MID server operating system and command language; this report demonstrates the dispatch mechanism, not one universal interpreter. The cloud-to-on-premise pivot is an important outcome and procedure boundary, but not a separate technique in this inventory.

## Persistence and privilege escalation

### Create or modify an event-triggered business rule

**Report evidence:** _Persistence_ — business rules are “logic to fire based on some condition.”

**ServiceNow action:** Add to or alter a business rule so Glide code runs when a selected table event occurs.

**ATT&CK:** [T1546 — Event Triggered Execution](https://attack.mitre.org/techniques/T1546/). The rule's trigger and its create-versus-modify path should remain separate procedures in a TRR.

### Create or modify a scheduled job

**Report evidence:** _Persistence_ — scheduled jobs “run at certain intervals to execute some script.”

**ServiceNow action:** Create or alter a ServiceNow scheduled job that repeatedly executes Glide code.

**ATT&CK:** [T1053 — Scheduled Task/Job](https://attack.mitre.org/techniques/T1053/). The specific schedule, job type, and UI/API creation path are procedure details to test.

### Create a ServiceNow cloud account

**Report evidence:** _ServiceNow UI Access Part 1 – User Creation_ — “create the user.”

**ServiceNow action:** Create a user account that can later authenticate to the tenant.

**ATT&CK:** [T1136.003 — Create Account: Cloud Account](https://attack.mitre.org/techniques/T1136/003/).

### Grant a role to an account

**Report evidence:** _Privilege Escalation_ — “assigns our compromised HR employee the `action_designer` role.” or "create a role that “inherits `admin`."

**ServiceNow action:** Add a role, such as `action_designer` or `admin`, to an adversary-controlled account.

**ATT&CK:** [T1098.003 — Account Manipulation: Additional Cloud Roles](https://attack.mitre.org/techniques/T1098/003/). Direct role grants are a distinct procedure family from role inheritance.

### Create role inheritance to confer an effective role

**Report evidence:** _Privilege Escalation_ — create a role that “inherits `admin`.”

**ServiceNow action:** Create or alter a role-to-role inheritance relationship so an adversary-controlled account receives the effective privileges of the inherited role.

**ATT&CK:** [T1098.003 — Account Manipulation: Additional Cloud Roles](https://attack.mitre.org/techniques/T1098/003/). This is distinct from directly assigning a role to an account: the relationship itself is the configuration change to research.

### Remove a privileged role while its session remains active

**Report evidence:** _Defence Evasion_ — “session maintains administrative privileges.”

**ServiceNow action:** Remove the privileged role after acquiring an administrative session, leaving the session elevated while reducing the account's visible privilege.

**ATT&CK:** [T1098 — Account Manipulation](https://attack.mitre.org/techniques/T1098/). This is not an additional role, so the parent technique is a better fit than T1098.003.

## Defense impairment and stealth

### Manipulate account creation metadata

**Report evidence:** _Defence Evasion_ — make a record appear to be “created in the past.”

**ServiceNow action:** Override `created_by`, `updated_by`, creation time, or update time on a user record to make it look legitimate or older.

**ATT&CK:** [T1036 — Masquerading](https://attack.mitre.org/techniques/T1036/). Making an account record appear older or more legitimate is manipulation of an artifact's features to appear benign. [T1070.006 — Indicator Removal: Timestomp](https://attack.mitre.org/techniques/T1070/006/) is rejected: it is scoped to file timestamp modification, not SaaS account-record fields. ATT&CK has no DPM-specific child for this behavior, but the existing parent is a better semantic home than a new top-level technique.

### Modify adaptive authentication policy

**Report evidence:** _ServiceNow UI Access Part 2 – Bypassing Adaptive Authentication_ — “install our own adaptive authentication policy.”

**ServiceNow action:** Change policy, group, criteria, or decision-table records so an adversary-controlled account satisfies an allow rule.

**ATT&CK:** [T1556.009 — Modify Authentication Process: Conditional Access Policies](https://attack.mitre.org/techniques/T1556/009/). The alignment is direct: both alter authorization conditions such as group, IP, or MFA requirements to enable otherwise blocked access.

### Clear ServiceNow activity history

**Report evidence:** _Defence Evasion_ — “delete any evidence of our presence”; the report identifies login, role-assignment, script-execution, and UI transaction history records for cleanup.

**ServiceNow action:** Clear ServiceNow records that evidence malicious tenant activity.

**ATT&CK and decision:** **Proposed ServiceNow/DPM subtechnique of [T1685 — Disable or Modify Tools](https://attack.mitre.org/techniques/T1685/).** ATT&CK already has child techniques for clearing Windows event logs ([T1685.005](https://attack.mitre.org/techniques/T1685/005/)) and Linux or Mac system logs ([T1685.006](https://attack.mitre.org/techniques/T1685/006/)); application/SaaS activity history needs its own child to preserve the different evidence sources and procedure paths.

**Related but not report-demonstrated:** [T1685.002 — Disable or Modify Cloud Log](https://attack.mitre.org/techniques/T1685/002/) may be relevant if a future procedure disables or changes ServiceNow audit or event logging. MDSec demonstrates deleting records, not disabling or modifying logging.

### Clear login history

**Report evidence:** _Defence Evasion_ — “delete any evidence of our presence” from `sys_user_login_history`.

**ServiceNow action:** Delete login-history entries that record source IP, user agent, and privileged status.

**ATT&CK and decision:** **Proposed ServiceNow/DPM subtechnique of [T1685 — Disable or Modify Tools](https://attack.mitre.org/techniques/T1685/).** A TRR should separately test UI, REST API, Glide-script, and any direct-record-deletion paths; the report demonstrates direct record deletion.

### Clear role-assignment history

**Report evidence:** _Defence Evasion_ identifies `sys_user_role_history`, which records role assignment and the granting user.

**ServiceNow action:** Remove records showing that a role was granted to an account.

**ATT&CK and decision:** **Proposed ServiceNow/DPM subtechnique of [T1685 — Disable or Modify Tools](https://attack.mitre.org/techniques/T1685/).** Keep this distinct from login-history clearing because the source table, protected action, and detection logic differ. The report identifies the table but does not demonstrate every deletion path.

### Clear script-execution history

**Report evidence:** _Defence Evasion_ identifies `sys_script_execution_history` as the record of background-script execution.

**ServiceNow action:** Remove evidence that a Glide script ran through the Background Scripts feature.

**ATT&CK and decision:** **Proposed ServiceNow/DPM subtechnique of [T1685 — Disable or Modify Tools](https://attack.mitre.org/techniques/T1685/).** This is a separate subtechnique because it is scoped to one script-execution surface and one telemetry source. The report identifies the table but does not demonstrate every deletion path.

### Clear UI transaction history

**Report evidence:** _Defence Evasion_ identifies `syslog_transaction`, where “interactions users perform within the UI” are logged.

**ServiceNow action:** Remove UI transaction records that could associate the actor with malicious configuration changes.

**ATT&CK and decision:** **Proposed ServiceNow/DPM subtechnique of [T1685 — Disable or Modify Tools](https://attack.mitre.org/techniques/T1685/).** This has different source data and procedures from the three other history-clearing subtechniques. The report identifies the table but does not demonstrate every deletion path.

## Discovery

### Find integration servers including MID servers

**Report evidence:** _SnowFall – Enumeration_ — “What MID servers exist and where.”

**ServiceNow action:** Enumerate connected MID servers and their configuration details.

**ATT&CK:** [T1018 — Remote System Discovery](https://attack.mitre.org/techniques/T1018/). MID servers are discoverable connected systems that can become lateral-movement targets.

### Find roles and memberships

**Report evidence:** _SnowFall – Enumeration_ — `get_users_with_role` identifies users holding specified roles.

**ServiceNow action:** Enumerate roles, accounts in those roles, and their membership relationships.

**ATT&CK:** Primary [T1069.003 — Permission Groups Discovery: Cloud Groups](https://attack.mitre.org/techniques/T1069/003/); secondary [T1087.004 — Account Discovery: Cloud Account](https://attack.mitre.org/techniques/T1087/004/). The first is the permission discovery objective; the second describes listing the accounts attached to it.

### Find frequently active users

**Report evidence:** _Post-Exploitation_ — “Who logs into the tenant regularly.”

**ServiceNow action:** Query login history to identify frequently active or high-value ServiceNow users.

**ATT&CK:** [T1087.004 — Account Discovery: Cloud Account](https://attack.mitre.org/techniques/T1087/004/). Login frequency is an account-selection attribute, not a separate technique.

### Find sensitive integrations

**Report evidence:** _Post-Exploitation_ — “integration with security products” can populate an incident table.

**ServiceNow action:** Identify security, PAM, SCCM-like, or other high-value services integrated with the tenant.

**ATT&CK:** [T1526 — Cloud Service Discovery](https://attack.mitre.org/techniques/T1526/). The integration inventory reveals services and trust relationships available to the compromised identity.

## Collection and credential access

### Find sensitive documents

**Report evidence:** _Post-Exploitation_ — “every Red Team report” was stored in `sys_attachment`.

**ServiceNow action:** Search attachments or incident records for reports and other sensitive business documents.

**ATT&CK:** [T1213 — Data from Information Repositories](https://attack.mitre.org/techniques/T1213/). This belongs to a document-management capability, which may exist alongside DPM rather than inside every DPM product.

### Find credential records

**Report evidence:** _SnowFall – Enumeration_ — “list credentials.”

**ServiceNow action:** Enumerate credentials installed in ServiceNow, then identify the valuable records.

**ATT&CK:** [T1555 — Credentials from Password Stores](https://attack.mitre.org/techniques/T1555/). Listing the store is discovery that supports later credential retrieval; it should not be confused with the retrieval procedure below.

### Obtain MID service-account credentials from config.xml

**Report evidence:** _SnowFall – Enumeration_ — execute a MID command to “output the `config.xml` file.”

**ServiceNow action:** Retrieve the MID server configuration file containing the service account's tenant credentials.

**ATT&CK:** [T1552.001 — Unsecured Credentials: Credentials in Files](https://attack.mitre.org/techniques/T1552/001/). The configuration file is the credential source; subsequent tenant authentication belongs to Valid Accounts.

### Retrieve encrypted credentials through a MID server

**Report evidence:** _Credential Exfiltration_ — use `getCredentialByID` on the MID server.

**ServiceNow action:** Request a MID server to use its credential-retrieval functionality and return a stored credential.

**ATT&CK:** [T1555 — Credentials from Password Stores](https://attack.mitre.org/techniques/T1555/). The report demonstrates credential retrieval through a component that is permitted to decrypt and use the records, rather than direct UI decryption.

## Command and control

### Retrieve and execute remotely hosted code

**Report evidence:** _Persistence_ and _SnowFall – Your SaaS is my C2_ — “classic GET/POST C2.”

**ServiceNow action:** A scheduled Glide script retrieves code from an attacker-controlled web server, evaluates it, and posts its output back.

**ATT&CK:** Primary [T1105 — Ingress Tool Transfer](https://attack.mitre.org/techniques/T1105/); secondary [T1071.001 — Application Layer Protocol: Web Protocols](https://attack.mitre.org/techniques/T1071/001/). Downloading the remote code and communicating over web protocols are both present, but the transfer is the primary behavior represented by the original row.
