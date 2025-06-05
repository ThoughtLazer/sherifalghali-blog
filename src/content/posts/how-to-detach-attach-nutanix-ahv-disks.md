---
title: "How to Detach/Attach Nutanix AHV Disks"
date: 2021-01-26
categories: 
  - "nutanix"
  - "tech"
tags: 
  - "nutanix"
  - "storage"
  - "virtual-disks"
---

This is the workflow on how to migrate a Nutanix AHV disk from one VM to another. A reason you may do this is because you have an old Server 2008 file server that you want to migrate to Server 2019. Nutanix handles this differently than VMware in that AHV does not allow you detach and reattach disks as you would in [vSphere](https://www.altaro.com/vmware/how-to-clone-vms-vcenter/).

The process to do this is outlined in both Nutanix [KB 3577](https://portal.nutanix.com/page/documents/kbs/details?targetId=kA032000000PMcKCAW) and [KB 8062](https://portal.nutanix.com/page/documents/kbs/details?targetId=kA00e000000Cr6CCAS). Unfortunately, the way it is worded can be confusing to some without a lot of Nutanix experience. This process requires you to open an SSH (using Putty, Tera Term, etc.) session to one of the CVMs in the cluster.  

**Step 1. Find the VM Disk File**

To find the VM Disk file you will use the command below:

```
 acli vm.get <VM name> include_vmdisk_paths=1 | grep -E 'disk_list|vmdisk_nfs_path|vmdisk_size|vmdisk_uuid'
```

The output should look like the picture below.

[![](https://sherifalghali.com/wp-content/uploads/2021/01/DiskList-1-1024x186.png)](https://sherifalghali.com/wp-content/uploads/2021/01/DiskList-1.png)

Make note of the disk size and disk path. The disk size should correspond with the data disk you would like to migrate to your new VM.

**Step 2. Create an Image from the VM Disk**

To create a disk image you must run the following command:

```
acli image.create <image name> source_url=<url of source VM disk> container=<target container name> image_type=kDiskImage
```

Note: To get the source URL you will have to append nfs://127.0.0.1 to the nfs path output from step 1.

```
For example - nfs://127.0.0.1/BronzeTier_StorageContainer01/.acropolis/vmdisk/be06372a-b8c5-4544-b451-12b608615248  
```

The output of the command should appear as shown below.

[![](https://sherifalghali.com/wp-content/uploads/2021/01/ImageCreate-1-1024x79.png)](https://sherifalghali.com/wp-content/uploads/2021/01/ImageCreate-1.png)

**Step 3. Attach the disk to the new VM.**

Attaching the disk to the new VM can be done from Prism Element on the same cluster.

1. Locate the VM from the VM menu in Prism and click update.

2\. From the Update screen select +Add New Disk

[![](https://sherifalghali.com/wp-content/uploads/2021/01/Update-AddDisk-1.jpg)](https://sherifalghali.com/wp-content/uploads/2021/01/Update-AddDisk-1.jpg)

3\. In the Add Disk menu, select ‘Clone from Image Service’ from the Operation drop down menu.

4\. In the Image menu, select the image you created in Step 2 and click Add.

[![](https://sherifalghali.com/wp-content/uploads/2021/01/AddDisk-ImageClone-1.jpg)](https://sherifalghali.com/wp-content/uploads/2021/01/AddDisk-ImageClone-1.jpg)

Once this is completed you can log into your VM and initialize the disk in the operating system.
