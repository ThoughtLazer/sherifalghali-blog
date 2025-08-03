---
title: Things I learned from One Year of M365 Migrations
date: 2025-08-04
excerpt: Tips and Considerations When Using BitTitan Migration Wiz to Perform Google Workspace and M365 to M365 Migrations
featuredImage: https://sherifalghalistaticsite.blob.core.windows.net/images/MigrationGuide.png
category: Tech
tags:
  - M365
  - migration
  - office365
  - google-workspace
---

[![M365 Migration Guide](https://sherifalghalistaticsite.blob.core.windows.net/images/MigrationGuide.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/MigrationGuide.png)

Over the past year, I have been working exclusively on an integration project to migrate my client's recent acquisitions into their Microsoft 365 (M365) tenant. My team's part in the project has focused almost exclusively on collaboration products, meaning migrating email, personal file storage, departmental file shares, and a limited number of chat archives and voice services. While 95% of our migrations have been for Google Workspace and M365, we have also worked with Postfix, IMAP, Dropbox, and on-premises file shares. Additionally, our migration tool of choice has been BitTitan MigrationWiz; however, many of the non-technical tips, tricks, and lessons learned apply to all migrations, regardless of the tool used.

In the 50+ migrations over the past 16 months, I have learned a lot, and I want to share some of the biggest takeaways and things I wish I had known before I got started. This blog post is structured in the same way as our migration projects: Preparation, Cutover, and Stabilize.

## Preparation

This is the most critical phase of the project, and where I have learned the most.

### Discovery

#### Kick-Off

In this phase of discovery, it is crucial to accomplish three things:

1. The client should leave the meeting with an understanding of the project milestones and what is expected of them.
    
2. The project team should leave the meeting with a clear idea of possible blockers that should be addressed quickly.
    
3. The client should leave the meeting feeling confident about the migration and the project team's ability to carry out the migration.
    

#### Discovery Scripting

Not all clients allow full programmatic access to their environment, but if you are lucky enough to get access, here are some tools that I have found helpful.

- **Google App Manager (GAM)** - The spreadsheets that can be downloaded from Google Workspace do not provide all the information I need in discovery, especially information about aliases and group membership. Therefore, I use GAM to gather all that information for me using PowerShell scripts. The GitHub page is [here](https://github.com/GAM-team/GAM/wiki/).

- **Microsoft Graph PowerShell** - For M365 environments, we have begun to use Microsoft Graph to augment some of the reports that we pull from the admin center. I've developed scripts that can correlate data across different services—for example, matching users' mailbox sizes with their OneDrive storage consumption. Microsoft Learn has an excellent [getting started guide for Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/get-started) that covers authentication and basic cmdlets.
    

### Pre-stage migration

We run a pre-stage migration to move the bulk of the data, typically anything older than 30 days, to the new M365 environment. This minimizes the amount of data that needs to be moved during the final cutover. For this, we use a specific set of advanced options in MigrationWiz depending on the source and destination. Here are the configurations we use and why:

#### Google Drive to OneDrive Advanced Options

```
Tags=IpLockDown!
InvalidCharacterReplacementString=_
InitializationTimeout=10
IgnoreListViewThreshold=1
```

- **Rationale:** `IpLockDown!` enhances security by ensuring that the migration traffic can only originate from a trusted environment. Since Google Drive allows characters in file names that are not permitted in OneDrive, `InvalidCharacterReplacementString=_` automatically replaces them to prevent errors. `InitializationTimeout=10` increases the time MigrationWiz will wait for the initial connection. This is helpful when there are accounts with hundreds of thousands of files, which lead to long initialization times.  `IgnoreListViewThreshold=1` is crucial for preventing throttling when dealing with large document libraries.
    

#### Gmail to Exchange Advanced Options

```
Tags=IpLockDown!
MigrateGmailAllCalendar=1
SuppressReminderDays=30
```

- **Rationale:** Along with the `IpLockDown!` security tag, we use `MigrateGmailAllCalendar=1` to ensure we migrate all user-created calendars. A key lesson for user experience is to add `SuppressReminderDays=30`. This prevents users from being bombarded with reminders for past calendar events.
    

#### Exchange to Exchange Advanced Options

```
Tags=IpLockDown!
ExtendedEwsTimeout=1
```

- **Rationale:** For M365 to M365 migrations, we set `ExtendedEwsTimeout=1`. This option helps prevent timeout errors by extending the time MigrationWiz will wait for a response from Exchange Web Services (EWS), which is useful when dealing with large mailboxes or busy servers.
    

#### Teams to Teams

```
Tags=IpLockDown!
InitializationTimeout=10
UseApplicationPermissionAtSource=0
UseApplicationPermissionAtDestination=1
```

- **Rationale:** When migrating Teams, we specify how MigrationWiz should authenticate. `UseApplicationPermissionAtSource=0` tells the tool to use delegated permissions for the source tenant, often required when admin access is restricted. `UseApplicationPermissionAtDestination=1` uses more robust application-level permissions to write data into the new tenant.
    

#### SharePoint to SharePoint

```
UseApplicationPermission=1
Tags=IpLockDown!
InitializationTimeout=10
LargeFileMigrations=1
LargeFileMigrationsTimeout=7200000
```

- **Rationale:** We use `UseApplicationPermission=1` for modern authentication to grant the service necessary access without using a specific user account. `LargeFileMigrations=1` enables a feature set to handle files larger than standard limits, and `LargeFileMigrationsTimeout=7200000` (2 hours) sets a generous timeout for these large files to transfer.
    

#### OneDrive to OneDrive

```
UseApplicationPermission=1
Tags=IpLockDown!
InitializationTimeout=10
IgnoreConflictingFiles=1
IgnoreListViewThreshold=1
RenameConflictingFiles=1
```

- **Rationale:** Here, `IgnoreConflictingFiles=1` and `RenameConflictingFiles=1` work together. If a file with the same name already exists, MigrationWiz will rename the migrated file rather than skipping it, ensuring no data is lost. `IgnoreListViewThreshold=1` is used to avoid issues with large numbers of files.
    

#### Google Shared Drive to SharePoint

```
Tags=IpLockDown!
RenameConflictingFiles=1
InitializationTimeout=10
TestSharePointWithProjectConfigUrl=1
InvalidCharacterReplacementString=_
LargeFileMigrations=1
LargeFileMigrationsTimeout=7200000
```

- **Rationale:** This combines several options. We replace invalid characters, handle large files, and rename conflicting files. The option `TestSharePointWithProjectConfigUrl=1` is a specific diagnostic tool used with BitTitan support to troubleshoot potential configuration or connectivity issues with SharePoint before running the full migration. 
    
### The Go/No-Go Meeting

Before any technical changes are made, we hold a final go/no-go meeting with all project stakeholders. This is our last chance to review all discovery data and get a formal sign-off. Any major stakeholder has the power to postpone the migration at this stage if they feel outstanding issues are too significant.

### The User Town Hall

We hold a town hall meeting with all users to set clear expectations. We cover the timeline, user responsibilities (like setting up their new Outlook profile), and a straightforward guide on how to get help. This proactive communication demystifies the process and significantly reduces Day 1 support tickets.

## Cutover

The cutover phase is the moment of truth and the culmination of all of our preparation. While the pre-stage migration handles the bulk of the data, the cutover is when the switch is officially flipped. I find that the more work we do in the discovery phase, the easier the cutover. However, that doesn't eliminate all issues. Below are some of the lessons I've learned and steps I take to ensure a smooth cutover. 
### Pre-Cutover Checklist

The days leading up to cutover are when problems are prevented, not the night of the migration. Beyond the obvious checks—verifying pre-stage completion, confirming user communications, and ensuring stakeholder availability—two critical validations have saved us from major failures.

Domain ownership verification is non-negotiable. We've been burned multiple times by clients who forgot about old M365 tenants created through GoDaddy years earlier. These forgotten tenants can completely derail a migration, so we check domain availability well in advance. Similarly, DNS credential verification might seem trivial, but actually logging into the DNS provider days before cutover has prevented countless last-minute issues. A simple test login confirms we have the right access to execute DNS changes when it matters most.

For distribution lists, we've learned that preparation during discovery pays dividends during cutover. I work with clients to identify which groups need migration, then capture complete membership data with scripts. This groundwork ensures we can recreate the entire distribution structure accurately in the new environment without scrambling to figure out who belongs where.

### The Main Event

This is the technical heart of the cutover. Our team executes a precise sequence of events to route mail flow and sync the final set of data. The core tasks involve updating the client's DNS records—specifically changing the MX records to point to M365 and updating SPF, DKIM, and DMARC records. Simultaneously, we run the final "delta" pass of the migration tool to bring everything completely up to date.

The type of migration significantly affects our approach. Google Workspace migrations are relatively straightforward—we can update MX records and run delta passes simultaneously. M365 to M365 migrations, however, require careful choreography to avoid a nasty issue we've encountered multiple times. When automatically removing a domain from the source tenant, Microsoft sometimes renames all account UPNs to random alphanumeric strings, causing migrations to fail. Our solution is simple: we first run a script to change all user domains to their onmicrosoft.com equivalent before domain removal. Then we use a BitTitan feature to change the domain for all the source tenant accounts. This prevents the random character issue entirely.

Once the domain cutover is complete, we immediately run scripts to update primary SMTP addresses for migrated users and recreate distribution lists with proper membership. This systematic approach ensures email groups work immediately after cutover, eliminating what would otherwise be a major Day-1 headache.

### Communication During Cutover

Clear communication during cutover is the difference between a smooth migration and a stressful experience. We establish a dedicated Teams chat with key stakeholders and update them on the progress of the migration. This proactive approach eliminates the inevitable stream of "how's it going?" emails that can derail the technical team's focus when precision matters most.

## Stabilize

The cutover is complete, mail is flowing, and users are logging in. This is the stabilization phase, where the project team transitions from migration execution to post-migration support.

### The First 48 Hours

The first two days post-migration reveal the quality of our discovery work. We establish a dedicated support queue and monitor it closely, but the issues that surface are predictable. The top three problems we encounter consistently trace back to gaps in the discovery phase.

First, Outlook profile issues affect nearly every migration. Users struggle with setting up new profiles, and despite our preparation, this remains the most common support request. Second, SSO authentication failures emerge as users try to access SaaS applications we weren't made aware of during discovery. These forgotten integrations can cause significant disruption until resolved. Third, mail flow breaks to support ticketing systems, marketing platforms, and other automated services that rely on specific email routing—again, usually because these dependencies weren't surfaced during discovery.

Having pre-written knowledge base articles for these scenarios saves valuable time and provides consistent messaging, but the real lesson is that thorough discovery prevents most of these issues from becoming problems in the first place.

### Plan for Surprises

No matter how meticulously a project is planned, issues will arise. After dozens of migrations, the most common "Day 1" issue is always something that was missed during discovery—a legacy application or a unique workflow we were never told about. This is why diligence in the preparation phase is so important, but you must still plan for the unexpected.

The single most important lesson is to recognize that something _will_ go wrong and to budget time and resources for post-migration support accordingly. Whether you are a solo practitioner or part of a large firm, stabilization isn't an afterthought. The measure of a successful migration isn't a flawless cutover, but how quickly and calmly you can stabilize the environment when the inevitable surprises occur. True success is marked by a quiet help desk and a client who feels supported from start to finish.

## Conclusion

Over 50+ migrations in 16 months, I've learned that successful migrations depend on thorough preparation, systematic execution, and proper post-migration support. While every organization has unique requirements, these experiences can help fellow IT professionals avoid common pitfalls.

The key takeaway: invest heavily in the discovery phase. Most post-migration issues trace back to something we didn't know about beforehand. With proper preparation and a commitment to supporting users through the transition, these projects can be both successful and manageable.
