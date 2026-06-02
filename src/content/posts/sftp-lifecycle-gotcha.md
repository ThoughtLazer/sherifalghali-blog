---
title: "A Lifecycle Management Gotcha With Azure SFTP Containers"
date: "2026-06-02"
excerpt: "Setting up SFTP on an Azure storage account with a 14-day retention rule is straightforward, until lifecycle management deletes your home landing directory instead of its contents. Here is the one filter setting that scopes the rule correctly."
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/sftp-gotcha.png"
category: "Tech"
tags: ["Azure", "SFTP"]
---

If you run a delete-based lifecycle management rule against an Azure storage account container that backs an SFTP home directory, scope it with a blob prefix filter. Click "Limit blobs with filters," then add the blob prefix, for example `container/folder/`. Without that, the rule can delete the folder itself, not just the folder's contents, and that folder is your home landing directory.

Here is something interesting I ran into. I hope it helps you.

## The Setup

I was working with a financial services firm that had a simple request. They had a client that wanted access to files through SFTP. I created the storage account, created the container, enabled soft delete, and set up an SFTP server through Azure. Simple. I then created a folder within the container, created admin credentials for the client, and read-only credentials for their client, and set the home landing directory for both sets of credentials as the folder in the container. Again, straightforward and simple.

The wrinkle was the request that all data is only available for 14 days. Again, simple. I go to lifecycle management, set up a rule that deletes anything that hasn't been modified in 14 days. Done.

## What the Lifecycle Rule Actually Did

Well, the project is delayed, nothing happens on the client's end for two weeks. Lo and behold, the folder is deleted. But now I have a problem. I didn't want the folder to be deleted. I wanted the folder's contents to be deleted. If the folder is deleted, that means that home landing directory is no longer there.

### The Fix

That's when I searched for a solution and found that I could modify the lifecycle management rule by clicking the "Limit blobs with filters" radial button and then add the blob prefix. For example, `container/folder/`.

## Why Nothing Broke

Nothing broke for the client. I was lucky that I was checking on the status of the project and caught the issue. I was able to quickly undelete the directory. Also, since the project was stalled, there was no data in the folder. Soft delete was enabled. That was done in my initial configuration.

The home directory configuration in the SFTP configuration does not change. But I am sure had the client tried there would have been an error.

## Conclusion: The Safety Nets You Set Up Before You Need Them

As an IT professional, these mistakes happen. This is why having soft delete as part of my initial configuration was so important. Additionally, it was valuable that I normally double back and check on projects to ensure that solutions work as intended. Had I not done that, I would not have caught this error nor had the tools to quickly resolve it.
