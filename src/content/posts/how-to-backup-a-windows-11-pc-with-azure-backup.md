---
title: "How to Backup a Windows 11 PC with  Azure Backup"
date: 2022-11-15
categories: 
  - "cloud-technologies"
  - "tech"
tags: 
  - "azure"
  - "backups"
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault.png"
excerpt: "Learn how to set up Azure Backup to protect your Windows 11 PC files and integrate your home lab with Azure cloud services."
---

Over the past few months, I have built a new PC, a home lab, and an Azure environment. Over the next few weeks, I will work to better integrate all three. One of the first steps in this process is setting up Azure Backup for my Windows 11 PC.

### Prerequisites

- An existing Azure subscription

- A Windows PC

### Step 1: Create a Recovery Services Vault in the Azure Portal

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault.png)

Login to your azure portal and search for the "Recovery Services Vault". If you do not have a recovery services vault, you will create one here.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault2.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault2.png)

From there you are taken through a wizard to create the Recovery Services Vault. Here you will need to either choose an existing resource group or create a new one. I decided to create a new one because all my resource groups contain related items that can be deleted together. Additionally, you are asked to choose a unique name for the Recovery Services Vault. Once these two things are done, you can click "Review + Create", and in a few moments, the Recovery Services Vault will be created.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/Image-11-15-22-at-12.30-PM-scaled-1.jpeg)](https://sherifalghalistaticsite.blob.core.windows.net/images/Image-11-15-22-at-12.30-PM-scaled-1.jpeg)

Once your Recovery Services Vault has been created, you can click on the resource and see a menu on the left side. From that menu, you will click Backup. Then you have two choices to make: "Where is the workload running?" and "What do you want to backup?" In my setup, I chose "On-Premises" and "Files and Folders". Note that it is currently not possible to [back up the system state for Windows 11 machines](https://learn.microsoft.com/en-us/azure/backup/backup-support-matrix-mars-agent).

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault6A.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault6A.png)

Once you click the "Prepare Infrastructure" button, you'll be brought to the above screen. At this point, is important that you both download the Azure Recovery Services Agent and **MOST IMPORTANTLY**, the vault credentials. In this example, I am saving the vault credentials to my desktop, but they can and should be [saved to Azure Key Vault](/blog/posts/how-to-create-an-azure-key-vault-to-store-secrets).

### Step 2: Install the Azure Recovery Services Agent

You'll first need to download the Azure recovery services agent from the previous screen.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault7A.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault7A.png)

The install screen for the Azure recovery services agent should look like the one above.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault8A.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault8A.png)

The Installation will need .Net Framework 4.5 and Windows Powershell. You will need to install these items to proceed with the installation.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault9-1.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault9-1.png)

As shown in the above screen, this is where you will use the saved vault credentials from the earlier step.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault10.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault10.png)

Next, you will be asked to enter a passphrase and a location to save it. You can use your own passphrase generator, but I found it easier to use the passphrase generator provided here. You may also save the passphrase on your local machine as I did here. Once done, click Finish to complete the installation.

### Step 3: Configure Your Backup Settings

Now that the installation has finished, you will be able to schedule your first backup.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault11.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault11.png)

Open the Azure Backup client on your PC and click "Schedule Backup" on the right side of the screen.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault13.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault13.png)

From the screen, as shown above, you will choose which drives you will backup.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault14.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault14.png)

You also have the option to exclude some folders and files.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault15.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault15.png)

You can specify the times of the backup up to three times a day.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault16.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault16.png)

Here you can choose the retention schedule. Initially, I was given what I believed was too many restore points, I adjusted mine accordingly as you can see above.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault17.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault17.png)

This is one of the final screens. You are given the choice to send the data online or offline by sending the disks directly to Azure. I chose to send my data online. After this screen, you will click next a few more times and then you are ready to start your first backup at the scheduled time.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault18.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault18.png)

Once my download has started, I can verify it is working from the Azure Backup App.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault19.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/CreateVault19.png)

I can also go to my Recovery Services Vault, click the Backup Dashboard, and verify that the job is running.

### Conclusion

While there are other ways to backup a PC, this is one of the better ways to get started working with Azure backups and Site Recovery.
