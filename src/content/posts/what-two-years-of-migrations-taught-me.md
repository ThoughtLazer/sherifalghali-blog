---
title: "What Two Years and 70+ Migrations Taught Me That the First Year Didn't"
date: "2026-05-05"
excerpt: "After two years and 70+ cross-tenant migrations on a single integration project, the biggest lessons weren't technical. They were about project management, systematization, the teams you depend on, and knowing when to stop emailing and start talking."
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/TwoYears.png"
category: "Tech"
tags: ["M365", "migration", "project-management", "process"]
---

If you're starting a migration project tomorrow, here are three things I wish someone had told me before I started mine: First, systematize and automate from day one. If surgeons need checklists and systems, then IT implementation engineers and consultants have no excuse. Second, if something can't be resolved in two volleys of emails, stop typing and schedule a call. Ownership, deadlines, and next steps get lost in threads. They don't get lost in meetings. Third, invest in the relationships with other teams. It's easy to be heads down focused on your work, but building a rapport with your internal teams and the client team pays dividends throughout the life of the project. Those three principles would have saved me weeks of accumulated friction over the course of this project. Everything else in this article is the context for how I learned them.

## Two Years, Two PMs, One Project

In April 2024, I started working on an integration project to migrate my client's recent acquisitions into their Microsoft 365 tenant. In April 2026, that project came to a close. Over those two years, my team completed over 70 cross-tenant migrations, almost exclusively focused on collaboration products: email, personal file storage, departmental file shares, and a limited number of chat archives and voice services. I wrote about the [first year of that project](https://www.sherifalghali.com/blog/posts/things-i-learned-from-one-year-of-m365-migrations/) when we were about 50 migrations in. That article was a tactical playbook: MigrationWiz advanced options, pre-stage configurations, cutover checklists. This article isn't a revision of that one, it's an update. The technical lessons from year one still hold. What changed in year two was how I think about the work surrounding the technical work.

Two different project managers led this engagement over its two-year run, each for about a year. They had very different styles, and watching both of them operate changed how I think about project management on large migration projects.

## What Good Project Management Actually Looks Like

For most of my career in consulting, professional services, and even long ago as a SysAdmin seeing it from the other side, I saw project managers (PMs) as schedulers and communicators responsible for keeping the project on-time and in scope. But it wasn't until this project, with multiple business units, stakeholders, and [personalities](https://www.sherifalghali.com/blog/posts/migration-archetypes/), that I really saw what project management could be at scale, and how much they have to be a jack-of-all-trades: communicating with the client, sales, the project team, support, the client's technical team, the business unit (BU) points of contact (POCs). They not only keep the schedule, but manage expectations, escalate to the proper people, manage constraints, and quite often remind the client of constraints they put in place that the client may have forgotten.

There was no single moment where this clicked for me. It was a slow realization across both PMs, each bringing a different approach to the same role.

The first PM had the advantage of a pre-existing relationship with the client's project champion and primary decision maker. That gave them the ability to push back more forcefully than someone without that relationship. That PM also worked as a manager of other PMs, and therefore had other obligations outside of the project. That led them to lean more heavily on engineers to speak about the state of the project to stakeholders, which was actually beneficial in my development as a more client-facing engineer and consultant.

The second PM did not have the luxury of that relationship and faced some serious headwinds at the start of their tenure. Because they did not have the relationship, that PM used [documentation](https://www.sherifalghali.com/blog/posts/m365-migration-documentation-as-architecture/) as their shield. They were also fully dedicated to the project, and therefore took control of the majority of communication with the customer from the engineers. That PM used copious note-taking and communication in place of an existing relationship, to great success.

Two different styles, both effective. The first PM's approach pushed me into client-facing growth I wouldn't have sought on my own. The second PM showed me how documentation and disciplined communication can substitute for relationship capital. It's why I dedicated a large portion of my presentation at the Microsoft Certified Trainer (MCT) Summit in Japan to how valuable a good project manager is on large migration projects. Engineers undervalue this role. I know because I did for most of my career.

## Systematize Like Your Migration Depends on It

The difference between year one and year two of this project can be summed up in two words: process and automation. I created a migration checklist so that things would not be forgotten the night of the cutover. I began to build scripts that could be used not only for this project but for any migration project moving forward. Through reading and many support tickets, I got better at BitTitan. And through collaboration with our client, we standardized and continued to improve our discovery documents.

That last point deserves emphasis. The discovery document evolved from a data collection form into an important collaboration tool between the BU POCs, the client IT team, and us implementation engineers. It stopped being something we sent out and hoped people filled in. It became something we worked through together.

My advice is don't wait until migration twenty to start building systems. Start on migration one. The checklist you create for your first cutover will be rough, but it will be better than relying on memory at 2 AM. The script you write to pull mailbox sizes and OneDrive consumption for one tenant will work for the next one. The discovery template you build for your first client will become the foundation for every client after that. If surgeons need checklists and systems to do their jobs safely and consistently, then IT implementation engineers and consultants have no excuse.

## When the Thread Fails, Call the Meeting

Early in the project, we would send documents to clients and they didn't know how to respond. That became a discovery meeting. We also had things like enterprise applications that could turn into unwieldy threads. That became a meeting too. It wasn't just the unwieldy thread; it was that who should take ownership and by when got lost. A meeting made sure that it didn't.

This was another innovation from our second PM, and it became a principle I now carry into every engagement: when ownership isn't clear, the stakeholders need to get on a call and map that out. There should always be clarity on what is needed and by when. If that can't get done in two volleys of emails, there should be a short call or meeting.

This sounds simple, and it is. But migration projects are full of moments where async communication creates the illusion of progress. A thread is active, people are responding, but nobody has committed to a deliverable or a deadline. Working meetings eliminate that ambiguity. You leave the meeting with names next to tasks and dates next to names. That's it. That's the whole framework.

## No One Migrates Alone

I am great at planning and executing migration projects. I am terrible at desktop support. It's something I haven't done since Windows 7 was the dominant OS. After a cutover, I can track down why email isn't getting to an account, but when Outlook crashes after the mailbox moves to the new tenant, I can troubleshoot the issue. I'm just nowhere near as fast at coming up with a solution. That's why we depended heavily on tier 1 and 2 support. They were faster and better at the thing users needed most in the first 48 hours after a migration.

A two-year project like this only works because many people contribute. The moves, adds, changes, and disconnects (MACD) team owning IT asset management (ITAM) was critical. Many of our migrations depended on clients getting new laptops before the migration, and those laptops had to be delivered to the homes of team members throughout the US and Canada. There were customs delays, porch pirates, and inaccurate information given by the clients that had laptops sent to the wrong address. We worked closely with the client's endpoint team to find solutions for BU employees and contractors with hardware needs in places like Thailand, Brazil, Australia, and Germany.

Our account executive worked to move blockers to internal collaboration between teams, and most importantly, kept our accomplishments top of mind for the client. Even our internal procurement team made a difference. Although I did my best to manage licensing proactively, there were times when we needed BitTitan licenses quickly. A good working relationship with procurement meant I could get those licenses quickly and without friction.

I recognize that I had a valuable role in this project, but I was often humbled by the intelligence and dedication of those I worked with. The client's M365 architect and endpoint engineering manager were not only highly intelligent practitioners but taught me something in nearly every interaction. That kind of collaboration made the work better, and it made me better. We owned initial discovery, the technical migration planning, and cutover, but we could not have managed that process all the way through without the teams that carried it forward.

## Conclusion: The Work After the Work

Closing out a two-year project is a strange feeling. The rhythm of discovery calls, cutover nights, and stabilization weeks became routine in a way that only repetition at scale can produce. Over 70 migrations is a lot of reps, and reps build intuition. But the biggest lessons from this project weren't about MigrationWiz advanced options or PowerShell scripts. They were about the people and processes that make large projects work.

Good project management isn't scheduling. It's the connective tissue between every stakeholder, every constraint, and every decision on the project. Systematization isn't overhead; it's professional discipline. When communication breaks down, the answer is almost always fewer emails and more conversations. And no matter how good you are at your piece of the work, you depend on people who are better than you at theirs.

The first article I wrote about this project was a technical guide. This one is the reflection I couldn't have written until the project was done. If you're in the middle of a large-scale migration engagement right now, my advice is simple: appreciate your PM, build your systems early, know what you're good at and who covers what you're not, and when things get complicated, pick up the phone.
