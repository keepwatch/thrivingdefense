---
tags:
  - author/Jordan_Anderson
  - type/article
title: Writing ideas down refines them into truth
aliases:
description: Writing can clarify human thought. How can we use GenAI without surrendering cognition?
created: 2026-09-12
draft: false
promoted: false
---
Have you ever had that experience where an idea slides into your system of thought effortlessly, so smoothly that you wonder how you never placed it before? The euphoric "aha" moment when something uncertain resolves into clarity? Thanks to Fernando Borretti's post [Human Routers of Machine Words](https://borretti.me/article/human-routers-of-machine-words), I realized that a huge part of [[index#Why thriving?|thriving]] is *thinking* and that *writing* is an incredibly valuable tool for *thinking*[^1].

To be clear, I don't agree with everything in Fernando's post—he is too harsh toward those who use AI to write, whereas I mostly worry about what happens if they [[Outsource cognition wisely|outsource cognition unwisely]] along the way.[^4] But he describes a few key ideas that put words to things I only grasped intuitively.

## Writing ideas down refines them into truth

I've encountered the phenomenon described by this heading in two clear contexts. I'll use quotations from Fernando's post to illustrate them.

### Distinguishing assumptions from facts

> Our ideas are not logical sentences but dreams. How do we refine these dreams into a useful form? Through writing. The process of communicating your ideas to another mind forces you to concretize them, make them precise, clarify your assumptions, more generally, it turns ideas from vague ghosts to solid, physical objects that can be manipulated ...

When responding to a cybersecurity incident, a team identifies an initial concern and jumps into response mode—imagine firefighters rushing to the scene of a reported emergency. As a responder, I've realized that many of my intuitive actions at the beginning (and middle, and end) of an investigation rest on unclear assumptions and poor reasoning. That slows the response and undermines the accuracy of the conclusion. The IR team developed [[Scoping incident response with questions]], whose core instruction is "take time at the beginning of the incident and write down what you know right now" (followed by "define the unknown things you need to know next" and "figure out how to make those things known"). The practice isn't complicated, but it's so helpful to refine those ideas. Writing those truths and questions down *forces* the incident responder to think and turn off [[Take a step back to cut through the fearful fog of war|fight-or-flight mode]] (which taints intuition with fear).

### Deconstructing solutions into problems

The other area builds on the first quote with a second:

> Anyone can imagine a programing language that is as fast as C and as dynamic as Lisp, but when you sit down and think through what those goals entail, you realize the design becomes contradictory. The goals pull in different directions. You have to make trade-offs. You have to make decisions which close off large volumes of design space, forever.

Software is an incredible tool for solving problems, but it's not magic. AI is the same (though it feels more advanced and [therefore](https://en.wikipedia.org/wiki/Clarke%27s_three_laws) more magical). I find in my own work and others' work that the design process starts not with a problem, but with an often-intuitive solution: "We should refactor this function in this part of our code". To borrow Fernando's term, this is an *idea*. It points to a *dream*. It is unrefined and untested.

So what must we do? We ask "[why](https://dovetail.com/design-thinking/five-whys/)" until we clearly understand what problem the proposed solution addresses. We use the solution to identify the problem, and then we evaluate whether the solution is a good fit for the problem as described.

I've found that just asking "why" can be a high-friction experience for those not used to questioning their intuition, so try these more detailed questions before building a complex product[^2] :

1. Describe the problem you are trying to solve
2. Describe the solution and how it solves the problem
3. Estimate how long it will take you to implement the solution[^3] (in hours and calendar time)
4. Describe how you will validate that the solution solves the problem

Ideally, the written answers to these questions should be reviewed by another person so that the ensuing discussion can further refine the idea and prepare it for implementation.

## Other points of disagreement

While I deeply appreciate this post for naming the necessity of human writing, I don't agree with every take—there are some subtleties to consider.

### Is AI writing ever acceptable?

One problem with AI writing that we haven't yet identified is *anchoring bias*. We experience this in human conversations as well: the first person to speak frames the rest of the discussion. There are conversational possibilities that will never arise due to the original framing. When we take an unrefined idea and hand it to AI to flesh out, we lose the ability to substantially challenge its conclusions—it's a clear case of [[Outsource cognition wisely|cognitive surrender]].

That said, we can and should use AI to write in cases where doing so doesn't replace thinking. One example is when a project has already been clearly scoped and thought through and is mid-implementation, but a new participant needs to execute one part of the plan. Before AI, I would need to consider that person's role, combine all relevant context mentally, and write a succinct message asking them precisely what to do (and why it's being done that way). Now, I can use AI to generate that content—effectively translating a settled thought into a more personalized form. This is one of the problems I tackle in #theme/knowledge_management posts on this site.

I've experimented with using AI to create social media summaries of my posts (I've already done the thinking, so I can evaluate AI output against my target message) but I find the AI-tics quite annoying in content longer than a few paragraphs. I reserve the right to change my mind on that topic in the future :)

### Are there other still-human ways to think without writing prose?

Building on the previous point, the main thing to avoid is unintentional cognitive surrender. Humans should delegate cognition to AI only when they have explicitly decided that doing so is acceptable. So for cases where human thought is essential, is writing required? I'd argue "no".

Writing is incredibly useful for clarifying ideas without other humans involved and for communicating those ideas broadly. Interestingly, this raises a point about non-native speakers of a language; the language in which they think and write best may be different than the language they use to communicate, so an acceptable use for AI writing could be as a translation aid. Additionally, small groups of humans (in my experience, two or three) with good working memory or a whiteboard can significantly refine an idea without translating it into prose. In fact, some ideas are better communicated and comprehended as a drawing or a graph than with the written word[^6]. In those cases, the two or three humans in that conversation have already done some of the thinking and would likely be able to use AI to generate prose for a broader audience; they have already worked through the reasoning *before* asking AI to generate the content, so they should be able to correct the AI output. Again, this becomes a communication problem, not a thinking problem.

It's also possible that the experience of using writing to think is not universally human, especially for people with conditions that affect reading or writing, such as dyslexia. I imagine that some people have had to find alternative methods to think things through (and those could represent other methods of human-generated thought).

### What standards should we establish for humans creating AI content?

This pattern isn't going away, so how should we constrain our use of AI-generated written content? The best set of principles I've seen comes from the folks at Clay:

> 1. You must stand behind every idea and sentence
> 2. Writing is thinking
> 3. More time should be spent writing a document than consuming it
> 4. Longer is not better

Here are my reflections:

- Point 1 combats cognitive surrender, the human temptation to treat the content as "good enough" even when we don't completely comprehend it. It's hard work to think, and in my experience, it's **harder** still to mentally engage with the product of someone else's thought—especially if it's clunky. Consider this the "I'm reading your college paper as a favor but the first paragraph is a mess" effect. I think this applies for human- and AI-generated content.
- Point 2 is expanded in the rest of this post.
- Point 3 is **critical**, especially because writing is asymmetrical—usually, a few people write a document and many more read/consume it. When readers collectively spend more time consuming a document than the writer spent producing it, the writer has created a "negative externality"—an economic term that means they achieved their purpose but with the side effect of harming those around them[^5].
- Point 4 is a sub-element of point 3, but it's important to call it out separately. For years, longer documents were indicative of thorough thinking. In general, if someone took the time to write about it at length, it suggested that they had thought it through. [Ethan Mollick describes](https://www.oneusefulthing.org/p/setting-time-on-fire-and-the-temptation) this well: "The fact that [the writing] is time consuming is somewhat the point ... we are setting our time on fire to signal to others that [this content] is worth reading." Now, however, AI models trained on past writing have learned the wrong lesson from this, creating long-form content with just a sentence of input data and minimal human time. Length of writing is no longer a meaningful proxy for quality of writing, so PLEASE make your AI outputs concise!

[The full tweet](https://x.com/vxanand/status/2104576879415988453?s=20) is well worth a five-minute read.

## Conclusion

In sum, my takeaway is this: we must not abandon cognition to generative AI lest we lose what makes us human. Writing, as a powerful cognitive tool, is often unsafe to delegate.

[^1]: At least for me; I'm open to the idea that it's not required and there are other means to think without writing. Fernando is less convinced of that :)

[^2]: I don't think this should occur for *every* implementation because it does slow the process down, but any higher-stakes or more complex project will greatly benefit from these questions.

[^3]: Pro tip: humans are bad at estimating. Record this estimate and check in at the end of that time frame, then reevaluate whether you have made enough progress to continue with implementation. If you decide to proceed, set a new time frame and repeat the process. Beware the *sunk-cost fallacy*!

[^4]: I also dislike being used as a [meat proxy](https://gruhn.me/blog/2026-08-03/), forced to refine someone else's incomplete ideas after GenAI has spun them into prose.

[^5]: Other examples: Farms with runoff into the water table, factories emitting pollutants into the air and causing acid rain

[^6]: As an ancillary note, it reminds me of the new AI model [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), which is similar to LLMs except that it does not output *words* but rather *evaluations* (in numerical form)
