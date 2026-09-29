---
tags:
  - author/Jordan_Anderson
  - type/article
title: Scoping incident response with questions
aliases:
created: 2026-08-17
description: Turn uncertain incident signals into focused work that tests assumptions and keeps investigations on track
draft: false
promoted: false
---
Incident response is a often-frantic activity. It happens after security event triage where something potentially suspicious has already been identified. It's the incident responder's job to answer the unanswered questions: is this a real threat? If it is a real threat, how serious is it? How do we contain it? How do we evict the attacker? 

I once had a case presented to me where someone noticed that there were large volumes of ICMP traffic heading outbound from one of our firewalls and concluded that this was a case of attacker command and control traffic being sent over ICMP. As I quickly dug in, and the afternoon wore into evening, my instinctive investigations struggled to identify the nature and source of the compromise. Eventually, I realized that several of the fundamental framing assumptions were wrong: because this firewall was logging sessions rather than packets, we could not easily prove traffic directionality and per-packet IMCP data size. The case we were investigating was actually an inbound ping against a single internal device over a long period. By the time I wrapped up at 8 PM, I realized that if I had stepped back to understand the case and to identify which assumptions needed to be tested, I could have resolved it much faster. The next day, my coworkers and I started developing a principle of asking scoping questions at the start of an incident.

The principle is not complex. Effectively, at the start of an investigation of unknown type[^1], take 20 to 30 minutes to write a summary of what is known and put together questions to prove the assumptions and the likely threat scenario. Those questions will have specific tasks linked to them to help us answer this question. After the team answers all the outstanding questions, the investigation is done and the incident is over. It helps focus investigations (instead of instinctively jumping into the data to prove unstated and barely-formed hypotheses). 

As an example, see below is what a question and task list for a potential malware investigation could look like.

## Scoping example

---
**Summary**
At 11:30, an end user reported to the SOC that they could no longer log into it because of a malware attack. They also noticed that their background changed to something suspicious, and that they remember opening a strange file a few days earlier. SOC is investigating to determine if this is a real attack and will provide an update by end of day.

**Scoping questions**

- Q0: When did the reported events occur?
	- Task 0-1: Talk to the user to get more precise information about when they first noticed the inability to log in, background change, and strange file (this will be essential for hunting)
- Q1: Do we have any other evidence of suspicious activity on the user's computer and account?
	- Task 1-1: Review existing alerts (even those closed as false positives) for the computer and account within the timeframe
- Q2: Why can't the user log into their PC anymore? Is it an account issue or a computer issue?
	- Task 2-1: Investigate the user's login history to determine if the account is locked out (or other login-preventing issues), and if so, why
- Q3: Is the desktop background image an indicator of malice? If so, is it used anywhere else at the company?
	- Task 3-1: Talk to the user to get more details about the image
	- Task 3-2: If the image is suspicious, determine how it was set
	- Task 3-3: If the image is suspicious, determine what makes it unique and hunt on those attributes throughout the company
- Q4: Is the strange file an indicator of malice? If so, has it been seen anywhere else at the company?
	- Task 4-1: Talk to the user to get more details about the file
	- Task 4-2: Investigate the file through the email system
	- Task 4-3: If the file is suspicious, determine what makes it unique and hunt on those attributes throughout the company

**Remedial tasks**
- Task R-1: Network contain the user's workstation while investigation continues
- Task R-2: Reset the password on the user's account while investigation continues

---

## Further benefits

You may wonder why we go through all this work instead of just creating a task list, but a task list alone is a minor upgrade to instinctively jumping into the data. The tasks we identify may not be the most efficient ones to remove the fog of war and identify the true issue. Instead, asking questions like this provides the *reason* behind the tasks (so it becomes obvious when we can stop doing an irrelevant task). For example, if we answer question Q3 as "no" through any means, we do not need to hunt for it throughout the company, and all of the open tasks for that effort can be instantly closed. The most important element is the *question*, not the task. 

Writing summaries and asking questions also seems effective to reset the brain out of fight-or-flight mode and into problem-solving mode. It's key that the writing is done by 1-2 humans[^2] in this case (as writing shapes the thought and helps identify unquestioned assumptions), and it can be extremely helpful for another unanchored (uninvolved) human to read the results and discuss it before finalizing. 

Another problem this approach solves is it divorces the scenario from the existing telemetry. When we do instinctive IR, we use the data sources we already know to find malice, but from the example above, perhaps we don't have known telemetry about background images and how they are set. Simply reviewing the existing alerts for the system and user, or pivoting in known data sources, would never meaningfully prove (or disprove) the user's claim. Asking about unknowns forces us to think through non-traditional routes to answer the question.

This approach does require the scoping person to be a little paranoid. There is a temptation in IR to quickly resolve items that can lead us to take shortcuts, so using the scoping period to consider possible scenarios and seek to disprove them is much better than completing an investigation only to realize there's a glaring assumption that was never addressed (this is an extreme example: "it's not possible to send malicious emails through our protection system without us catching it, therefore email is not a component of this attack").

## Does the scope have to be written?

In short, no, but [[Writing ideas down refines them into truth]] (and you need to work harder if you use an alternative approach).

## Conclusion

The necessary work is to discern when to deploy our instinctive actions and when to activate critical thinking systems, and scoping questions is just one solution to that. Our common objective is to prevent fear from misshaping our work (see [[Take a step back to cut through the fearful fog of war|Take a step back]]) - I'd love to hear more about what works for you!

[^1]: If you're working on an incident type you've seen before, you can derive questions from the previous investigation (and formalizing this in a playbook can be really useful to operationalize response)

[^2]: Effectiveness of collaboration drops off with more than two people in my experience (there are too many competing conversational threads)
