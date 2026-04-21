---
title: "Why VIP Identification Is the Discovery Step You're Probably Skipping"
date: "2026-04-21"
excerpt: "A missed VIP during M365 migration discovery led to misallocated post-migration support resources and an avoidable escalation. Here's the step to add to your discovery framework so it doesn't happen to you."
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/vip-id.png"
category: "Tech"
tags: ["M365", "migration", "discovery", "Intune", "MAM"]
---

This is something no one tells you when you start doing tenant migrations, but something you understand if you started your IT career on the help desk or in deskside support: titles and roles matter. Not all users are equal when it comes to post-migration support, and if your discovery process doesn't account for that, you will misallocate support resources during the most high-pressure phase of the migration.

We learned this the hard way when we missed a VIP during discovery and it cost us an avoidable escalation.

## When Titles and Roles Matter More Than Ticket Order

Our cutover window runs from 8 PM ET to 8 AM ET. During our [pre-migration town hall](https://www.sherifalghali.com/blog/posts/town-hall-insurance/), we let users know that during the outage window we'll give them updates on our progress, but that support won't start until 8 AM ET and that users should not configure their devices until the beginning of post-migration support at 8 AM.

This user didn't wait. He's the head of sales for the business unit (BU) and the single biggest source of new business. He started configuring his mobile device before the support window opened and began requesting help in the post-migration support chat before 8 AM ET. The first issue was that his mobile email didn't work on his phone. We were able to solve that problem with normal troubleshooting. But the friction was that we triaged his issue behind contractors and other employees who could have waited.

If our discovery process had identified this person as a VIP, we would have started working with him before our 8 AM window. We didn't, which caused him to escalate the issue up the chain to BU leadership, which was then relayed to our project manager (PM).

We had built good will as a project team, so it wasn't the end of the world. But it also wasn't something we want to repeat.

## The Second Problem We Didn't See Coming

The mobile email issue was solvable. The bigger problem was the destination tenant's Intune App Protection Policies (APP), which are a form of Mobile Application Management (MAM). The acquiring company had a strong security posture, and we didn't configure those policies; they were part of the client's existing environment. But those policies collided with this user's mobile-first workflow in ways we hadn't anticipated.

Specifically, three APP settings created friction:

- **"Sync policy managed app data with native apps or add-ins" set to Block:** This prevented Outlook contacts from syncing to his phone's native contacts app. For a head of sales who lives on his phone, not being able to see who's calling is a real problem.
- **"Cut and copy character limit for any app":** The destination tenant had a character limit on copy and paste operations between managed and unmanaged apps. When you need to paste a client proposal into an email, a character limit makes that workflow impossible.
- **"Send org data to other apps" restricted to policy-managed apps:** This blocked sharing documents between his phone's native apps and the Outlook app. For someone whose workflow depends on moving information between apps quickly, this is a wall.

The policies weren't wrong. It was a good security posture. The gap was in our discovery, not their configuration. We didn't know these policies would collide with this user's workflow until it was too late.

## What I Would Do Differently

Add VIP identification as a specific step in your [modular discovery framework](https://www.sherifalghali.com/blog/posts/modular-discovery-framework-m365-migrations/). During the validation meeting with your Points of Contact (POC), ask this question: "Who in this organization, if they can't work from their phone for two hours, causes a business problem?"

That question surfaces the people whose workflows have an outsized impact. From there:

- Review the destination tenant's APP/MAM policies against VIP workflows before cutover. Look specifically at contact sync, copy/paste limits, and data transfer restrictions.
- Build a VIP contact plan into your post-migration support. VIPs get contacted proactively at the start of the support window, not reactively through the queue.
- If a VIP starts requesting support before the window opens, your team should know to prioritize them immediately.

Whether or not companies should let people have an outsized impact and have different workflows is an operational conversation that is above my pay grade. But when these situations exist, the migration team needs to know about them. We do our best to treat everyone the same, but organizational culture gets in the way. Sometimes the only way to do our job is to follow the cultural norms of the organizations we support. I've written before about how [organizational archetypes can stall a migration](https://www.sherifalghali.com/blog/posts/migration-archetypes/); a missed VIP is the same category of problem. It's not technical. It's cultural.

## Conclusion: Discovery Is About People, Not Just Data

Discovery isn't just mailbox sizes and shared drives. It's understanding who matters most to the organization and why, so your support plan reflects the client's actual priorities. A head of sales who can't access his phone email for four hours has a different business impact than a contractor whose desktop Outlook works fine and can wait.

That's why I'm writing about this: so that other project teams can be aware and adjust their discovery accordingly. Add the VIP question to your discovery checklist. It takes thirty seconds to ask and saves you an escalation you didn't need.
