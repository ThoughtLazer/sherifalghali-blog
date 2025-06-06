---
title: "Data Protection: The Fancy New Name for Backups?"
date: 2019-09-06
categories: 
  - "modern-datacenter"
  - "tech"
tags: 
  - "backups"
  - "data-protection"
  - "modern-datacenter"
---

_This is a article that I originally wrote for my job. I am reposting it here with a few changes._

When I ![Image result for data protection](https://sherifalghalistaticsite.blob.core.windows.net/images/In-2018-Data-Protection-Has-Never-Been-More-Important-for-a-Business.jpg)first saw the words Data Protection, I thought, "ugh, here is another new way to do backups that I have to keep up with." The more I read about it, the more I understood that data protection and backups are like squares and rectangles. All data protection includes backups, but not all backups are data protection.

**The Problem with Backups**

Ransomware, data corruption, and data loss all strike fear into the hearts of the modern IT professional. All three of these things have come to be known colloquially as RGEs or Resume Generating Events and have kept many an IT professional from sleeping well at night. As the modern datacenter has evolved from rows of tower servers running bare metal workloads to racks full of blades running hyperconverged platforms, how an administrator backs up and recovers data has struggled to keep up. The traditional solution has always been to use the 3-2-1 rule of backups coined by [Peter Krogh](https://en.wikipedia.org/wiki/Peter_Krogh_\(photographer\)). The rule states:

- Keep three copies of your data
- Use two different types of storage medium
- Keep one copy of the data offsite

These were great rules in the past, but with the added complexity and amounts of data to be protected in the modern datacenter, these rules do not effectively mitigate RGEs.

**What is Data Protection?**

Traditional backup and restore consists of grouping workloads together in a backup schedule, backing them up, occasionally checking backup integrity, and restoring when necessary. This was fine when the datacenter was nothing more than a server room and the business could afford downtime, but in the modern datacenter this is woefully insufficient. The pain points of this strategy are all challenges that modern data protection have sought to mitigate using the following five strategies:

Centralized management – this allows the administrator to manage data protection across on-premises and public clouds.

Cross Cloud and Hypervisor Support – giving the administrator the ability to archive and/or setup disaster recovery in the public cloud or across hypervisors.

Data Lifecycle Management – automates moving backups and snapshots between hot, cold, and archival tiers.

Application Aware – uses VSS or CBT to capture database tables and logs.

Mitigates Malware and Other Threats – immutable data to resist ransomware and use of artificial intelligence to detect anomalies.

**Avoiding Resume Generating Events**

The solution seems simple: use a modern data protection solution. The reality is that many organizations have different reporting requirements, software and hardware stacks, budgetary constraints and level of operational intelligence to consider when making a purchasing decision. Considering these challenges, there are two main architectures to consider when looking at a modern data protection solution:

**Hardware Appliance**

These solutions are characteristically the easiest to install and maintain, and typically at a higher cost. The advantage is an integrated hardware and software stack, and the ability to almost instantly live mount restores. Examples of solutions in this category are Rubrik, Cohesity, and Commvault.

**Software Solution**

Traditionally these solutions are lower in cost and will have all the features of modern data protection, but the administrator will typically lose the ease of use and elegance of the hardware appliance. The leader in this category is Veeam, with HYCU and Nakivo being great alternatives.

The modern datacenter continues to present numerous challenges to organizations, and data protection is no different. As always, any organization should look to its trusted advisor (VAR or MSP) to guide them in making an informed decision.
