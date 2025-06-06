---
title: "How to Create an Azure Key Vault to Store Secrets"
date: 2022-11-21
categories: 
  - "cloud-technologies"
  - "tech"
tags: 
  - "azure"
  - "key-vault"
  - "security"
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault1.png"
excerpt: "Learn how to create an Azure Key Vault to securely store secrets and passphrases for your Azure infrastructure."
---

In my earlier post, I demonstrated how to [back up my Windows 11 PC's files using Azure Backup.](https://sherifalghali.com/2022/11/15/how-to-backup-a-windows-11-pc-with-azure-backup) Now, I am going to review how to create an Azure Key Vault to store that passphrase more safely and securely.

### Prerequisites

- An existing Azure subscription

- A passphrase to save

### Step 1: Create the Azure Key Vault

[![Azure Key Vault Creation Screen](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault1.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault1.png)

To create a key vault, you must log in to the Azure portal and search for "key vault". Once done, you will see the above screen. Click "Create Key Vault" to continue.

[![Azure Key Vault Configuration](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault2.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault2.png)

In the above screen, you are asked to choose a resource group or create one. Again, in this case, I chose to create a new resource group. Then you are asked to create a unique key vault name and choose a region, and pricing tier. I chose the East US region and the standard pricing tier. [There is no need to use the premium tier in this case](https://learn.microsoft.com/en-us/azure/key-vault/general/overview). Once your choices are made, click "Review + Create" to create the key vault.

### Step 2: Add Secret to Vault

[![Azure Key Vault Secrets Menu](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVaultAlt.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVaultAlt.png)

Once the key vault has been deployed, click "Secrets" from the menu on the left side of the screen.

[![Adding Secret to Key Vault](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault4.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault4.png)

Now you can add the recovery services vault secret (or any secret for that matter) to the Key Vault. Be sure to label it something that makes sense and click "Create"

[![Key Vault Secret Created](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault5.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/KeyVault5.png)

Finally, you should be able to see your secret in the recovery services vault.

### Conclusion

This is a really simple way to start working with Azure Key Vault. Now you have your secret saved in a location that is not easily compromised or exposed to failure as your home PC.
