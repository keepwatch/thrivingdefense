---
tags: [author/Jordan_Anderson, type/stub]
title: Writing TRRs for TSI
aliases:

created: 2026-08-30,

draft: true

promoted: false
---
I believe the deep research of [[Technique Research Report (TRR)]]s is the path forward for detection, and also worry how unprepared we are to detect  compromise of [[Trusted Service Infrastructure (TSI)]]. As our enterprises grow increasingly complex and interconnected, more and more management work is executed through TSI products like application deployers, CI/CD, password vaults, and workflow automation tools. These products (when SaaS-hosted) can provide initial-access vectors through compromise or exploitation, but are also trivially accessible through stolen user cookies. With that concern in mind, what would be required to write TRRs on TSI products?

I had to consider this problem while reading [MDSec's excellent report on attacking ServiceNow](https://www.mdsec.co.uk/2026/08/when-it-snows-it-pours-anatomy-of-a-servicenow-red-team/). ServiceNow started as an IT Service Management (ITSM) product that was deeply integrated into operational and incident management workflows, and it has expanded to cover many more use cases (there are [dozens of products listed here](https://www.servicenow.com/products-by-category.html)). Now, with AI driving more business use cases, [ServiceNow's website says](https://www.servicenow.com/what-is-servicenow.html) they are striving to build "a single platform that brings together any AI, any data, and any workflow".  This sounds like a TSI that we need to secure! But how would we convert this report into a TRR detection artifact?
## TRR procedure documentation

Both the MDSec report and the TRR look for a deep understanding of the risks posed by a given system, but the TRR requires a different level of coverage and thoroughness. The report points to possibilities; the TRR prompts the cataloging and discovery of those possibilities. This maps to the (oversimplified) difference between attacker and defender discovery objectives; the attacker needs to find a path to the objective, and the defender needs to know all the terrain the attacker may need to traverse to that objective.

A TRR starts with a *technique* (itself a sub-class of *tactic*) and breaks that technique down into all known *procedures* that could be used to execute this technique. For example, the MDSec report mentioned multiple methods to execute (a tactic) Javascript-derived Glide scripts. This maps to a specific MITRE ATT&CK® technique ([Command and Scripting Interpreter: JavaScript - T1059.007](https://attack.mitre.org/techniques/T1059/007/)) but also fragments into those procedures identified by MDSec, including:

- Create or modify a transform (which can contain a Glide script) and arbitrarily trigger it
- Create or modify a business rule (which can contain a Glide script)
- Create a scheduled job (which can, you guessed it, contain a Glide script)
- Create a custom action within a Script Step in the Workflow Studio (yeah, it runs a script too)
- Create a script condition in `sysauto_ms_report_builder.do` and manually execute a report
- RCE exploitation ([example 1](https://www.slcyber.io/research/smashing-the-servicenow-sandbox-pre-authentication-rce), [example 2](https://appomni.com/ao-labs/bodysnatcher-agentic-ai-security-vulnerability-in-servicenow/)) to run Glide scripts

A TRR starts with identifying a platform (ServiceNow) as well as a technique (T1059.007 here), and then seeks to identify the full set of procedures that can be used to perform the technique (executing Javascript/Glide script) on that platform. We would document each of the bullet points as individual procedures in one TRR document, including a mindmap-style Detection Data Model (DDM) that helps identify common telemetry or control paths. With the DDM in hand, we can write the fewest detections to gain coverage of the entire technique. For example, a detection that only monitors business rules will prove insufficient, but if all Glide script executions trigger a common audit log[^2], that could provide a robust monitoring source.

At this point, several issues come to the surface:

- This list of procedures for Glide script execution is almost certainly incomplete (and we do not know if the other methods will generate similar logs or artifacts)[^1]
- The audit logs may not contain enough information to determine the provenance of the script. For example, scheduled task logs usually only include metadata like task name, schedule, executed action, and command-line arguments. If the scheduled task calls a script, that script's content is hidden to the defender through audit logs alone. 

The solution to this problem is that [[some techniques should only be detected opportunistically]], and Execution-associated-techniques (like this one) are usually included. Instead of looking for all the ways attackers can achieve execution, we need to look for the *changes* the attacker is able to achieve by executing arbitrary code. This is where the other tactics - like persistence, privilege escalation, discovery, and lateral movement - come in.

To be clear, if we **can** build detections for execution, those are great to have, but they are opportunistic and never intended to be complete/comprehensive. Defenders should deploy execution detections where they can since the techniques are constantly evolving in a cat-and-mouse game with vendors like ServiceNow; in order to get ahead, defenders must prioritize their efforts on "chokepoint" techniques.

## What techniques should we focus on?

So we've set aside the execution-related techniques, but what techniques are worth further attention? Here, we encounter a new roadblock; ATT&CK does not currently have good technique coverage for TSI ([[MITRE ATT&CK® is not flat]]), let alone the specific sub-class of enterprise automation / Digital Process Management (DPM) that ServiceNow fits within[^3]. Not only do we have to identify procedures, but we have to identify the techniques!

The (marginally) good news is that many of these techniques should be common across the ATT&CK Product class of DPM[^4], so once we do this work for one DPM tool, we should be able to use this as a base for other products that include DPM capabilities.

In the spirit of "good enough" analysis, these are the techniques I saw when reading through MDSec's report. I've flagged the ones that are likely to be common to DPMs.

Stealth
Defense Impairment

| Tactic                      | Technique                                                   | Maps to ATT&CK?      | Common to DPMs?                                                 | Notes                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------- | -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Persistence                 | Business rule                                               | ?                    | Yes                                                             |                                                                                                                                                                                       |
| Persistence                 | Scheduled job                                               | Yes - scheduled task | Yes                                                             |                                                                                                                                                                                       |
| Persistence                 | Valid account                                               | Yes                  | Yes                                                             | Attackers can compromise an existing account                                                                                                                                          |
| Persistence                 | Create account?                                             | Yes?                 | Yes                                                             |                                                                                                                                                                                       |
| Privilege Escalation        | Change/grant role to account                                | ?                    | Yes                                                             |                                                                                                                                                                                       |
| Privilege Escalation        | Change account role inheritance (effective role)            | ?                    | Yes                                                             |                                                                                                                                                                                       |
| Stealth, Defense Impairment | Manipulating account creation metadata                      | ?                    | ?                                                               | This allows creating accounts with false metadata (including creation date), confusing incident response efforts                                                                      |
| Stealth                     | Removing privileges from an account while session is active | ?                    | ?                                                               | Removing privileges does not reset access until logout occurs                                                                                                                         |
| Defense Impairment          | Remove login history                                        | ?                    |                                                                 |                                                                                                                                                                                       |
| Defense Impairment          | Remove privilege change history                             | ?                    |                                                                 | In the MDSec report, this includes role assignment history                                                                                                                            |
| Defense Impairment          | Remove script execution history                             | ?                    |                                                                 |                                                                                                                                                                                       |
| Defense Impairment          | Remove UI action history                                    | ?                    |                                                                 |                                                                                                                                                                                       |
| Discovery                   | Find all integration servers                                | ?                    | Yes                                                             | In the MDSec report, this includes MID servers                                                                                                                                        |
| Discovery                   | Find all roles and memberships                              | ?                    | Yes                                                             |                                                                                                                                                                                       |
| Discovery                   | Find frequent users                                         | ?                    | Yes                                                             |                                                                                                                                                                                       |
| Discovery                   | Find sensitive integrations                                 | ?                    | Yes                                                             | In the MDSec report, this includes security incident management, PAM, or SCCM-like integration                                                                                        |
| Collection                  | Find sensitive documents                                    | ?                    | This is likely a document management feature, not a DPM feature | In the MDSec report, this includes red team findings                                                                                                                                  |
| Collection                  | Find credentials                                            | ?                    | Yes                                                             | This would include SaaS and other credentials stored in the platform to permit ServiceNow to manage them                                                                              |
| Collection                  | Find integration service account                            | ?                    |                                                                 | This may be ServiceNow-specific, but a specific file (config.xml) can be decrypted to gain this account, see [research](https://www.mdsec.co.uk/2025/03/red-teaming-with-servicenow/) |
| Collection                  | Decrypt encrypted credentials                               | ?                    |                                                                 |                                                                                                                                                                                       |
| Command and Control         | Execute remotely hosted code                                | ?                    |                                                                 | Seems like ServiceNow should be configured with an egress allowlist to mitigate the impact                                                                                            |


In some ways, the report format difference is similar to the attacker vs defender perspective in aggregate; the attacker needs to find a path to the objective. There's little reason to waste resources 

[^1]: To make things more fun, technically ServiceNow can be exploited to run commands on premise, though that likely would fall under a different technique. This works through a MID server concept to support on-prem integrations: [mid-server-basics.pdf](https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/success/quick-answer/mid-server-basics.pdf)
[^2]: We should not *assume* they do, testing is required!

[^3]: This is an oversimplification, unfortunately. ServiceNow seems to fit within multiple categories (ITSM, DPM) and several derivative categories ([Customer service management](https://www.servicenow.com/products/customer-service-management), [HR service delivery](https://plat4mation.com/servicenow/servicenow-hrsd)). Many of the attacks described in the MDSec article focus on DPM abuses, but in reality it should be grouped into multiple ATT&CK product classes with the resulting technique set derived from each product.

[^4]: I'm being a bit wistful here; technically this is not a product class today. However, I propose including it (and many other TSIs) in [[MITRE ATT&CK® is not flat]]

