---
title: "Mastering M365 Carve-Outs: How to Lead When Visibility is Limited"
date: "2026-01-15"
excerpt: "Lessons learned from leading a high-pressure M365 carve-out migration with zero visibility into the source tenant. Learn strategies for navigating divestiture-driven migrations and managing migrations when you don't control the data."
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/M365CarveOut.png"
category: "Tech"
tags: ["M365", "migration", "office365", "carve-out", "divestiture"]
---

In most M365 migrations, visibility is a given. You run your discovery tools, check your storage metrics, and map out the data landscape before the first byte moves. In [my previous article about lessons from 50+ migrations](https://www.sherifalghali.com/blog/posts/things-i-learned-from-one-year-of-m365-migrations/), I emphasized that discovery is the most critical phase of any project.

A carve-out makes discovery even more critical, but strips away your ability to do it effectively.

I recently led a migration project driven by a divestiture. We were working against a Transition Service Agreement (TSA) deadline, meaning the clock was ticking from day one with serious financial penalties for delay. The challenge was not just the timeline. It was the lack of access. We had zero visibility into the source tenant. We were completely dependent on two groups: the Source IT team who had technical access to gather data, and the Business Unit POCs who knew what needed to be migrated.

The migration was successful, but we had to fight for it. Looking back, the technology, while always central, was not the hard part. Often our migration tools have been chosen long ago. The bits and bytes move the same way they always do. The challenge was the strategy and the human element.

Here are the lessons learned from a high-pressure carve-out and how you can navigate the lack of visibility in your next project.

## You Don't Know What You Don't Know (And Neither Do They)

In a carve-out, you work through a chain of communication. The Business Unit POCs tell you what data needs to be migrated. You relay those requirements to the Source IT team. The Source IT team gathers the technical details and sends them back to you.

This creates a dangerous game of telephone.

In our case, both teams were extremely helpful and wanted to assist us. However, we fell into a trap of semantic confusion. When we asked the Business Unit POCs for the "SharePoint data," they gave us the names of the sites they used. We passed those site names to the Source IT team, who provided us with data on the "Main Document Libraries" for each site. We migrated exactly what was on that list.

It was not until after the cutover that users began to report missing data. Upon digging deeper, we found out that they were missing data from document libraries we were not asked to migrate. It turned out in the source tenant, they were using multiple additional document libraries within those same sites. Libraries the Business Unit POCs did not mention because they did not know to look for them. And because we did not ask the right questions, the Source IT team only reported on what seemed obvious.

### What I Would Do Differently

I would create a two-part discovery process that addresses both the business side and the technical side.

#### Working with Business Unit POCs

During the discovery call with Business Unit POCs, I would slow down and ask probing questions about how they actually work:

- "Walk me through how your team collaborates on files. Do you have any team sites or shared drives we have not discussed?"
- "Are there any document libraries that were created for specific projects or departments?"
- "Do users access files from any terminated employees' accounts?"
- "Are there any shared mailboxes or distribution lists your team depends on?"

These questions force the Business Unit POCs to think beyond the obvious "main" resources and consider edge cases.

#### Working with Source IT Team

Once I understand what the Business Unit needs, I would send the Source IT team a detailed data request template for every site and account we are authorized to migrate. Here is what I now request:

For SharePoint sites:
- Site URL and name
- A list of ALL document libraries within each site (not just the main one)
- Storage size for each library
- Number of items in each library
- List of subsites (if any)

For OneDrive accounts:
- User principal name
- Total storage consumed
- Number of files
- Largest single file size

For shared mailboxes and distribution lists:
- Full list of members
- Mailbox size
- Any forwarding rules or delegates

The key is to ask for structured data, not just names. When the Source IT team sees "list ALL document libraries," they know to look deeper instead of making assumptions about what matters.

Then, I would take the Source IT team's technical report back to the Business Unit POCs and validate it. "We found these five document libraries in the Engineering site. Do you use all of these?" This closes the loop and catches anything that was missed.

## When Good Intentions Break Your Migration Window

We tried to do everything right. We held a Town Hall meeting with the Business Unit users prior to the cutover and gave them clear instructions: "Move any data on your local desktops into OneDrive so it gets migrated."

The users listened. In fact, they listened too well.

In the five days between the Town Hall and the migration, users dumped massive amounts of local data into their source OneDrive accounts. This completely negated our pre-staging strategy.

Normally, we see OneDrive accounts with about 50GB of total data. We pre-stage that 50GB, leaving a small delta of 5 to 10GB for the cutover night. It is usually a quick, clean sync.

Because users rushed to move local data to the source rather than the destination, we walked into migration night with accounts that had ballooned. We saw users with 300GB of new data pending transfer. That is not a delta sync. That is a full migration.

### What I Would Do Differently

I would be far more forceful during the Town Hall about what NOT to do and give users clear direction on where large files should go. Here is the exact language I would use:

"If you have large files on your local computer or external drives, DO NOT upload them to your current OneDrive before the migration. This will cause significant delays. You have two options for handling large local files:

Option 1 (Preferred): Upload large files directly to your NEW OneDrive in the destination tenant. You already have access to this account. Moving files there now keeps them out of the migration pipeline entirely.

Option 2: Wait until after the migration is complete, then upload large files to your new OneDrive.

If you are unsure whether your files are too large or need help accessing your new OneDrive, contact the migration team."

I would also repeat this message in the follow-up email and make it bold or highlighted. Users need to hear "do not upload to source" multiple times for it to stick.

The key is giving users access to their destination OneDrive accounts before the migration. This gives them a safe place to put large archives without disrupting the pre-staging strategy. When users know they can already use their new account, they are less likely to panic and dump everything into the source at the last minute.

## The Hidden Throttling Traps

Because we could not run our own storage metrics on the source tenant, we were flying blind on file types. This client was a software firm, which meant their "Documents" were not just 50KB Word docs. They were hoarding 10GB+ Virtual Machine (VM) images and massive ZIP archives.

Microsoft 365 throttling is aggressive with file counts, but it also struggles with massive single files during high-volume moves. Between the sheer size of these files and the throttling, our "one night" migration bled into a two-day slog. With only a few weeks left on the TSA, losing 48 hours to a slow sync was a margin of error we did not have.

### What I Would Do Differently

I would address file size discovery from both angles.

#### Working with Source IT Team

During the discovery phase, I would ask the Source IT team to run a report showing the top 20 largest files for each user and each SharePoint site we are migrating. This does not require full tenant access. It only requires visibility into the data we are authorized to move.

This report tells me if I am dealing with standard office documents or if I need to plan for massive files that will slow down the migration.

#### Working with Business Unit POCs

If the Source IT team cannot provide file size reports due to security or resource constraints, I would ask the Business Unit POCs during discovery:

- "Do you regularly work with virtual machine images, ISO files, or compressed archives?"
- "What is the largest single file you work with on a regular basis?"
- "Do you store video files, design assets, or large datasets in your OneDrive or team sites?"

If the answer is yes, I would either exclude those files from the migration tool and move them manually, or I would budget an extra 24 to 48 hours in the migration window specifically for those accounts.

## Conclusion: Tech is Easy, Strategy is Hard

We often get fixated on the technical hurdles of a migration (bandwidth, API limits, and error logs). But in this carve-out, the technology worked exactly as designed. The APIs moved the data. The permissions transferred.

The friction came from the human side: the miscommunication about SharePoint libraries between Business Unit POCs and Source IT team, the well-intentioned users flooding the network with data at the wrong time, and the lack of visibility into work habits.

If you are facing a TSA deadline with limited visibility, the tech is likely the least of your worries. The tech will do its job. Worry about the questions you are not asking. Be specific, be forceful, and remember that your biggest challenge is not the migration tool. It's the strategy.