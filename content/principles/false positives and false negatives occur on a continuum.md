---
tags: type/stub
title: false positives and false negatives occur on a continuum
description: Exploring the inherent tradeoff between false positives and false negatives when tuning detection rules.
aliases:
created: 2026-03-07, 10:26
author: "[[people/Jordan Anderson|Jordan Anderson]]"
---
# false positives and false negatives occur on a continuum

First, a definition of terms:

|       | Positive                                                 | Negative                                                             |
| ----- | :------------------------------------------------------- | :------------------------------------------------------------------- |
| True  | Signal fires and the target condition exists             | Signal ==does not== fire and the target condition ==does not== exist |
| False | Signal fires and the target condition ==does not== exist | Signal ==does not== fire and the target condition exists             |
The framings most often used in cybersecurity are True Positive, False Positive, and False Negative. For both Positive conditions, an alert fires; alert noise is attributed (sometimes unfairly) to False Positives, and False Negatives occur when an alert/signal should have fired but did not - malicious activity occurred that was missed.

> Generally, reducing False Positives means tuning the rule to be more specific, which runs the risk of overfitting and permitting False Negatives.

[[people/Jared Atkinson|Jared Atkinson]] shared [a tool](https://dprime-calculator.vercel.app/) that makes this more obvious - try it out! Changing the criterion value within this tool changes the evidence range within which a signal will be reported, changing all of the rates from the above table.