---
title: "Common Issues when migrating VMs from VMware vSphere On-Prem to Azure"
date: 2022-12-09
categories: 
  - "azure"
  - "cloud-technologies"
  - "digital-transformation"
  - "tech"
  - "vmware"
tags: 
  - "azure"
  - "migration"
---

I have been running a VMware home lab with an old Dell PowerEdge R720 with ESXi 7.0.2 installed. I have been running [Azure for backups](/blog/posts/how-to-backup-a-windows-11-pc-with-azure-backup) and [Key Vault](/blog/posts/how-to-create-an-azure-key-vault-to-store-secrets) to protect secrets, but now I want to migrate one of my vSphere on-prem VMs. Through this process, I ran into a few issues and "gotchas" that may affect other users. Below is my list of potential issues you may face and how to resolve them.

### A Note About Whether or Not to Use the Migration Appliance

I started out choosing to use the migration appliance. I downloaded the OVA and installed it in my lab environment. This initially turned out to be a huge hog of resources without any real benefit for my small lab environment. For that reason, when my project would not allow me to add the migration tool and I had to create a new project, I decided to go with the PowerShell script install on an existing server. If you decide to do the same, remember that you must use a Windows Server OS.

### Issue 1: Azure Migration Project Tool Will Not Add to Your Dashboard

This was a random issue. Your Azure Migrate project has access to the free assessment tool and the free migration tool. A functioning project should look like the image below.

![A functioning project with the migration tool added](https://sherifalghalistaticsite.blob.core.windows.net/images/VMwareMigrate23.png)

But the first interaction of my project would not allow me to add that tool. I searched the message boards and could not find a solution to my problem. So, I did the next best thing and started a new project.

### Issue 2: The x86 version of VC++ Redist 2019 may cause the gateway service to fail

This issue is specific to using the PowerShell version instead of the virtual appliance. This was a problem for me because I had both the x86 and x64 versions of VC++ Redist 2019 installed on my Server VM as shown below.

![VC++ Redist 2019 installed on Server VM](https://sherifalghalistaticsite.blob.core.windows.net/images/VMwareMigrate17.png)

I searched for the problem on the internet and found [this](https://learn.microsoft.com/en-us/answers/questions/458629/error-with-azure-migrate-appliance.html) post in Microsoft's forum. The advice given was to uninstall both versions, but in my case, that just caused another issue. The solution that worked best for me was to only uninstall the x86 version. Once done, the installation was completed successfully.

### Issue 3: Insufficient Cores Available in the Subscription (During the migration prechecks)

I worked my way through all the other issues and then ran into this one.

![Insufficient cores available error](https://sherifalghalistaticsite.blob.core.windows.net/images/VMwareMigrate20.png)

I had enough cores available in the normal compute SKUs, so this one confused me a bit. The issue, in this case, is that I did an assessment, and used the assessment settings to determine the compute SKU I was going to use but did not properly modify the settings in my assessment. Once I removed reserved instances from my assessment and recalculated the assessment, I got a normal compute SKU and was able to complete my migration successfully.

### Conclusion

While the Azure Migrate tool may not be as easy to use as some of the paid tools, it can be very useful if you are cost-constrained.
