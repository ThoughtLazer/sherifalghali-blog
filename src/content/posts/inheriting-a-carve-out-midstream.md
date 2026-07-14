---
title: "Inheriting a Carve-Out Midstream: The Two-Week Handoff"
date: "2026-07-14"
excerpt: "Inheriting an M365 carve-out migration midstream means two weeks of knowledge transfer with a departing engineer and discovery gaps that surface as helpdesk tickets. Here is what a handoff can transfer, what it can't, and what I would push harder on next time."
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/inherit-carveout.png"
category: "Tech"
tags: ["M365", "migration", "carve-out", "knowledge-transfer"]
---

A couple of months ago, I was asked if I would be interested in a migration project because one of my colleagues had just put in her two weeks notice. I worked with my colleague for those two weeks drinking from the firehose: learning the client's environment, the key players, how to use Quest, and most importantly, what would be expected of me. This time I would not be in charge of using BitTitan. Along with our project manager, I was expected to fully understand and be able to communicate the migration timeline and what would be needed for a successful migration.

The most important exercise of those two weeks was a working session going through each step of the migration. She took me through each thing she was responsible for and told me all the steps she had completed so far. That made it clear what would be expected from me, so I could focus on getting those things ready for migration weekend. This was the most valuable working session of the entire two weeks.

I have [written about carve-outs before](https://www.sherifalghali.com/blog/posts/mastering-m365-carve-outs-how-to-lead-when-visibility-is-limited/), but this was a different project with a different set of lessons. This article is the first in a series on it.

## Two Weeks to Learn Someone Else's Migration

I joined all of her meetings and began troubleshooting issues with testing the device migration. Testing was going slowly, because any time we had a failed test, we needed the user, in this case one of the points of contact (POCs), to completely reset the machine. I downloaded VMware Workstation on the test machine, created a snapshot of the machine when it was ready to migrate, and then reverted to snapshot after a failure. That reduced testing time by quite a bit.

My colleague wrote down her notes, and I took notes as well. She did a tremendous job with the migration up to that point and was incredibly generous with her time.

## What Two Weeks Can't Teach You

The working sessions and handoffs couldn't prepare us for the unknown unknowns. Quest was a new product for me and for my former colleague. I may have done over eighty migrations in the past few years, but that was with BitTitan, and mostly in cloud-only environments. This was also a bigger project in scope and breadth, with a smaller team than I was accustomed to. The scope covered BitTitan, the Quest device migration, a Secure Copy on-premises file server migration, a VPN change, printers, networking, and a move from Barracuda to Proofpoint. There were a lot of moving pieces, and of those I didn't have a direct hand in, I still needed to be able to speak intelligently to the client about their status.

On my [previous project](https://www.sherifalghali.com/blog/posts/what-two-years-of-migrations-taught-me/), I had three other fellow engineers to bounce ideas off of and work with. In this migration I had two others: one dedicated to networking, and another dedicated to BitTitan.

While another colleague on the team took care of the BitTitan mailbox, OneDrive, and SharePoint migrations, we found a few user mailboxes, shared mailboxes, and distribution lists that were not shared with us either during discovery or post discovery. They surfaced the same way they always surface: users submitting helpdesk tickets saying that Outlook is empty. That meant the engineer handling BitTitan had to migrate mailboxes on the first day of post-migration support.

This is exactly the failure mode the [modular discovery framework](https://www.sherifalghali.com/blog/posts/modular-discovery-framework-m365-migrations/) exists to prevent: shared mailboxes and distribution lists are modules that have to be enumerated from the environment and confirmed with the client, not taken on faith from what the POCs volunteer. Always do the work yourself and enumerate the environment rather than relying on what was handed to you. But when you come in midstream with a compressed timeline, that can be difficult to do, and the fallback is knowing that day one of post-migration support will include migrating whatever discovery missed.

## What I Would Do Differently

Now that we have successfully completed the migration, looking back:

- I would have pressed earlier for updated information from the client on the users being migrated.
- I would have treated a final device count as a requirement, giving the client what I could pull from N-able and Quest On Demand Migration for Active Directory (ODMAD) and having them compare that to their inventory.
- I would have asked more clearly about networking and the devices we could not reach.
- I would have made sure the client tested that all machines could reach and talk to the destination domain controllers before the migration window. More on that in a later article in this series.

## Conclusion: What Transfers and What Doesn't

When you inherit a migration midstream, most decisions are already made. The tools were chosen and the timeline was set before I arrived. What the handoff could transfer, it did: the client's environment, the key players, and what would be expected of me.

The handoff itself comes down to one exercise: a working session where the departing engineer walks through each thing they are responsible for, step by step. The notes and the meetings help, but they couldn't prepare us for the unknown unknowns. The working session at least made sure the known ones had an owner.

Things that aren't learned in the handoff are learned during the migration or in post-migration support. The only counter I found is persistence: updated user lists, a final device count checked against the client's inventory, and proof that every machine can reach the destination domain controllers before the migration window opens.
