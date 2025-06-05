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
---

In my earlier post, I demonstrated how to [back up my Windows 11 PC's files using Azure Backup.](https://sherifalghali.com/2022/11/15/how-to-backup-a-windows-11-pc-with-azure-backup) Now, I am going to review how to create an Azure Key Vault to store that passphrase more safely and securely.

### Prerequisites

- An existing Azure subscription

- A passphrase to save

### Step 1: Create the Azure Key Vault

[![](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault1-1024x515.png)](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault1.png)

To create a key vault, you must log in to the Azure portal and search for "key vault". Once done, you will see the above screen. Click "Create Key Vault" to continue.

[![](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault2-1024x509.png)](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault2.png)

In the above screen, you are asked to choose a resource group or create one. Again, in this case, I chose to create a new resource group. Then you are asked to create a unique key vault name and choose a region, and pricing tier. I chose the East US region and the standard pricing tier. [There is no need to use the premium tier in this case](https://learn.microsoft.com/en-us/azure/key-vault/general/overview). Once your choices are made, click "Review + Create" to create the key vault.

### Step 2: Add Secret to Vault

[![](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVaultAlt-1024x490.png)](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVaultAlt.png)

Once the key vault has been deployed, click "Secrets" from the menu on the left side of the screen.

[![](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault4-1024x514.png)](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault4.png)

Now you can add the recovery services vault secret (or any secret for that matter) to the Key Vault. Be sure to label it something that makes sense and click "Create"

[![](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault5-1024x489.png)](https://sherifalghali.com/wp-content/uploads/2022/11/KeyVault5.png)

Finally, you should be able to see your secret in the recovery services vault.

### Conclusion

This is a really simple way to start working with Azure Key Vault. Now you have your secret saved in a location that is not easily compromised or exposed to failure as your home PC.
