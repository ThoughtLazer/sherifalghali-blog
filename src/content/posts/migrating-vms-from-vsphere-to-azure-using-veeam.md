---
title: "Migrating VMs from vSphere to Azure using Veeam"
date: 2023-01-10
categories: 
  - "azure"
  - "cloud-technologies"
  - "tech"
tags: 
  - "azure"
  - "migration"
  - "veeam"
  - "vsphere"
---

Early last year I ran into an issue where we needed to move virtual machines from ESXi 5.5 to Azure. Although the [support matrix](https://learn.microsoft.com/en-us/azure/migrate/migrate-support-matrix-vmware-migration) said that both vSphere 5.5 and Windows 2003 were supported by the migration tool, we could not successfully migrate the VM using the migration tool as I demonstrated in an [earlier post](/blog/posts/common-issues-when-migrating-vms-from-vmware-vsphere-on-prem-to-azure).

What we ended up doing instead was using Veeam to migrate the VM to Azure. I had heard of this from a Veeam rep at a conference a few years prior, but until that point, I never had a use case for that information. Below I will demonstrate how to migrate a VM from vSphere 7 to Microsoft Azure using the Veeam restore feature. In this example, I'm using a Server 2022 VM, but it will work similarly for any Windows VM.

## Prerequisites

- An existing Azure subscription

- Azure Storage Account

- A backup of the VM you would like to migrate (with RDP enabled)

- An existing network security group with an inbound rule allowing RDP

## Step 1: Ready the Veeam Environment

The first thing we will need to do is ready the Veeam environment. The way we do this is a little counterintuitive. We will start by clicking Restore in the home ribbon in Veeam.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure1.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure1.png)

Then we will choose "Restore from Backup".

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure2.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure2.png)

Next, we will choose "Entire VM Restore".

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure3.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure3.png)

Then select "Restore to Public Cloud"

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure4.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure4.png)

Finally, click on "Restore to Microsoft Azure"

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure5.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure5.png)

Now that you have navigated through the menus above, you will be presented with a menu asking you to perform the initial configuration. Click "Yes".

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure6.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure6.png)

The initial configuration screen is of no consequence. Just click "Next"

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure7.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure7.png)

The next screen is where you will choose the deployment type. The choices are between the Gov, China, and Global Azure accounts. The default is fine. Click "Next".

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure8.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure8.png)

The next screen will allow you to add new Azure credentials or use an existing one. If you choose to add new credentials, which I have chosen to do here, you will likely see the error message displayed below. Veeam uses Azure PowerShell to connect to Azure and the wizard will prompt you to install Azure PowerShell. This is an easy process because the link given will help you install Azure PowerShell in a few clicks.

### Note

The language in the screen below is a bit imprecise. "Create a new account" does not actually create a new account. It simply configures existing Azure credentials and saves them to Veeam.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure9.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure9.png)

With the installation finished you are now prompted to enter your Azure credentials.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure12.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure12.png)

## Step 2: Perform the Restore

The wizard will ask you to add a VM to be restored. I have chosen to restore from a backup as you see below.

### Note

Your VM should have RDP and DHCP enabled. If not, you will not be able to connect to the machine once it is restored.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure13.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure13.png)

Next, you will choose the region where the VM will be restored to. Remember that this region must be the same as your storage account.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure14.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure14.png)

Now, you must choose the VM size and the storage account. This is a good opportunity to resize the VM if it was previously too large.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure15.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure15.png)

Next, you're given the opportunity to place the VM in an existing resource group or to create a new resource group.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure16.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure16.png)

Now, you're able to choose the network and network security group.

### Note

I chose to assign a public IP for testing purposes. But normally, you would have either an express route or a VPN from on-prem.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure17a.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure17a.png)

The last item to configure is whether or not to scan the restored VM for malware prior to recovery. I chose not to do this because my VM is a fresh install of Server 2022.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure18.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure18.png)

Finally, the restoration will start and you will be able to watch the progress similar to the screen below.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure20.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure20.png)

## Step 3: Verifying the VM Restoration

Once your VM has completed its restoration process, you'll want to make sure that you can connect to it. First, you will need to navigate to the resource in Azure, click "Connect" and download the RDP file.

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure21.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/VeeamRestoreAzure21.png)

You should be able to open the RDP file and connect directly to the VM.

## Conclusion

Using Veeam restore to migrate VMs to the cloud can be a great alternative to using the Azure Migration tool.
