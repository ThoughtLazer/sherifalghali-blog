---
title: "How to Resolve Horizon View vCenter Connection Errors"
date: 2021-01-26
categories: 
  - "tech"
  - "vmware"
tags: 
  - "euc"
  - "horizon-view"
  - "vmware"
---

I was recently working with a client that needed me to migrate Horizon View VMs to new storage. I thought it would be as easy as changing the storage settings for the pool and performing a rebalance across the cluster. Unfortunately, no rebalance operation was successful and I saw the following errors:

_Provisioning error occurred for Machine XXX: Refit operation rebalance failed_

_vCenter at address <vCenter Address> has been temporarily disabled (this error would typically followed by another notification that the same vCenter had been enabled)_

[![](https://sherifalghalistaticsite.blob.core.windows.net/images/ViewError.png)](https://sherifalghalistaticsite.blob.core.windows.net/images/ViewError.png)

I was able to resolve the issue by following VMware [KB 1030996](https://kb.vmware.com/s/article/1030996). I the case of this customer there was only one working production pool. To test that there was an issue with the pool in use, I created a new temporary pool. I then tried recompose actions and looked for errors in the event log. There were none.

Creating a new temporary pool proved critical to resolving this issue. The crux of the problem as laid out in the KB is that there are two vCenter entries in the composer database. In my case the IP address and the FQDN (The FQDN being the correct entry). The correct Deployment Group ID was displayed in the View Composer Database entry for the new temporary pool I created. I was able to take that ID and replace it in the entries for the current production pool. After that was done, I was able to easily rebalance the production pool.
