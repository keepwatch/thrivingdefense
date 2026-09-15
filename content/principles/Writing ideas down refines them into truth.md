---
tags:
  - author/Jordan_Anderson
  - type/article
title: Writing ideas down refines them into truth
aliases:
created: 2026-09-12,
draft: true
promoted: false
---
Have you ever had that experience where an idea slides into your system of thought effortlessly, and you wonder how you missed it this whole time? The euphoric "a-ha" moment where something uncertain resolves into clarity? Thanks to Fernando Borretti's post [Human Routers of Machine Words](https://borretti.me/article/human-routers-of-machine-words), I realized today that a huge part of [[index#Why thriving?|thriving]] is *thinking*, and that *writing* is an incredibly valuable tool for *thinking*[^1] a huge part of *thinking* is *writing* (at least for me!).

To be clear, I don't agree with everything in Fernando's post - he has too-critical words for those who use AI to write, whereas I mostly feel fear for what they are sacrificing if they [[Outsource cognition wisely|outsource cognition]].[^4] But he describes a few key ideas that put words to so much of my thought the past few years.
## Writing ideas down refines them into truth

I've encountered the phenomenon described in the heading in two clear areas, using quotes from Fernando's post.

### Distinguishing assumptions from fact

> Our ideas are not logical sentences but dreams. How do we refine these dreams into a useful form? Through writing. The process of communicating your ideas to another mind forces you to concretize them, make them precise, clarify your assumptions, more generally, it turns ideas from vague ghosts to solid, physical objects that can be manipulated ...

 During the process of responding to a cybersecurity incident, an initial concern is identified and the team jumps into response mode - imagine the firefighters scrambling to arrive at the scene of a reported emergency. As a responder myself, I've realized many times that my intuitive actions at the beginning (and middle, and end) of an investigation are based on unclear assumptions and poor reasoning, slowing the response and impugning the accuracy of the conclusion. The solution I developed with my team is [[Scoping incident response with questions]], which at its core is "take time at the beginning of the incident and write down what you know right now" (as well as "define the unknown things you need to know next", and "figure out how to make those things known"). It's not complicated, but it's so helpful to refine those ideas. Writing those truths and questions down *forces* the incident responder to think and turn off fight-or-flight mode (which taints intuition with fear).
### Deconstructing solutions into problems

The other area builds on the first quote with a second:

> Anyone can imagine a programing language that is as fast as C and as dynamic as Lisp, but when you sit down and think through what those goals entail, you realize the design becomes contradictory. The goals pull in different directions. You have to make trade-offs. You have to make decisions which close off large volumes of design space, forever.

Software is an incredible tool for solving problems, but it's not magic. AI is the same (though it feels more advanced and [therefore](https://en.wikipedia.org/wiki/Clarke%27s_three_laws) more magical). I find in my own and other's work that the design process starts, not with a problem, but with an (often intuitive) solution, like: "We should refactor our code in this part of our software". To borrow Fernando's term, this is an *idea*. It points to a *dream*. It is unrefined and untested. So what must we do?

We ask "[why](https://dovetail.com/design-thinking/five-whys/)" until we get a clear answer about what problem this is solving. We use the solution to identify the problem, then we evaluate whether the solution is a good fit for the problem as described. 

I've found that just asking "why" can be a high-friction experience for those not used to questioning their intuition, so there are a different series of questions that should be asked before complex implementation[^2] occurs:

1. Describe the problem you are trying to solve
2. Describe the solution and how it solves the problem
3. Estimate how long it will take you to implement the solution[^3] (in hours and calendar time)
4. Describe how you will validate that the solution solves the problem

Ideally, the written answers to these questions should be reviewed by another person resulting in a discussion to further refine the idea and prepare it for implementation. This step can be skipped once you realize that you can't trust your own ideas and need to hold yourself accountable with a process like this.

## Other points of disagreement

While I so appreciate this post for naming the necessity of human writing, I don't agree with every take - there are some subtleties to consider.
### Is AI writing ever acceptable?

One of the problems with AI writing that we didn't yet identify is *anchoring bias*. In human conversations we experience this as well - the first person to speak/communicate frames the nature of the entire discussion to follow. There are conversational possibilities that will never arise due to the original framing. When we take an unrefined idea and hand it to the AI to flesh out, we lose the ability to substantially challenge the conclusions - it's a clear case of [[Outsource cognition wisely|cognitive surrender]]. 

With that being said, there are cases where we can and should use AI to write content - where it doesn't replace thinking. One example is when a project has already been clearly scoped and thought through and is mid-implementation, but a new participant needs to execute one part of the plan. Before AI, I would need to consider that person's role, combine all relevant context mentally, and write a succinct message asking them precisely what to do (and why it's being done/must be done that way). Now, I can use AI to generate that content - effectively translating a settled thought into a more personalized form. This is part of the problem that I tackle in #theme/knowledge_management posts on this site.

I've experimented with using AI to summarize my posts for social media slugs - in that case I've already done the thinking, so I can evaluate whether AI does a good job capturing the essence of what I'm saying - but I find the AI-tics quite annoying in content longer than a few paragraphs. I reserve the right to change my mind on that topic in the future :)

## Are there other still-human ways to think without writing prose?

Building off the previous sentiment, the main thing to avoid is unintentional cognitive surrender, where humans only delegate cognition to AI in cases where it is explicitly deemed acceptable. So for cases where human thought is essential, is writing required? I'd argue "no".

Writing is incredibly useful for clarifying ideas without other humans involved and for communicating those ideas broadly. Interestingly, this raises a point about non-native speakers of a language; the language they best use to write/think may be different than the language they use to communicate, so an acceptable use for AI writing could be as a translation aid. Additionally, small groups of humans (in my experience, 2-3) with good working memory or a whiteboard can significantly refine an idea without translating it into prose. There's even an element where some ideas are better represented or clarified as a drawing or a graph than prose. In those cases, the 2-3 humans in that conversation have already done some of the thinking and would likely be able to use AI to generate prose communications for a broader audience; they have exercised the thought path *before* the AI generated the content, so they should be able to correct the AI output. Again, this becomes a communication problem, not a thinking problem. 

It's also possible that the experience of using-writing-to-think is not universally human, especially for people with reading or writing impairments, like dyslexia. I imagine that some people have had to find alternative methods to think things through (and those could represent other methods of human-generated thought). 

## Conclusion

In sum, I would encourage the same sentiment as Fernando:

> We must not abandon cognition to generative AI lest we lose what makes us human. Furthermore, writing (as a powerful tool for cognitive processes) is often unsafe to delegate.





[^1]: At least for me; I'm open to the idea that it's not required and there are other means to think without writing. Fernando is less convinced of that :)

[^2]: I don't think this should occur for *every* implementation because it does slow the process down, but any higher-stakes or more-complex project will greatly benefit from these questions.

[^3]: Pro tip: humans are bad at estimating. Record this estimate and check in at the end of that time frame, then reevaluate if you made enough progress to continue with implementation. If you decide to proceed, set a new time frame and repeat the process. Beware *sunk cost fallacy*!

[^4]: Along with distaste for being used as a [meat proxy](https://gruhn.me/blog/2026-08-03/), forced to refine someone else's incomplete ideas spun into prose by GenAI
