---
title: "Hybrid Cloud Considerations"
date: 2019-08-19
categories: 
  - "cloud-technologies"
  - "tech"
tags: 
  - "cloud"
  - "hybrid"
  - "technology"
---

### The Problem

The cloud continues to be a hot topic in 2019. Public cloud initiatives have been at the forefront of enterprise digital transformation for the past few years. As we discussed last month, the cloud is not a complete solution for most modern enterprises. Although the public cloud is great for its agility, scalable workloads, and reliability, many enterprise customers are hampered by the “Three C’s” of cost, connectivity, and complexity. In addition, they face pressure by other business units to be more agile, which often take matters into their own hands and create the problem of shadow IT. This becomes even more of an issue when using a multi-cloud strategy. So, what is the solution? The solution is to combine the current on-premises private cloud with the public cloud to create a hybrid cloud infrastructure.

### What is hybrid cloud?

Hybrid cloud refers to using both on-premises infrastructure in combination with public cloud infrastructure. This allows enterprises to combine the best of both worlds: scalability and reliability for web-tier and disaster recovery workloads found in the public cloud, with the fixed cost and connectivity for ERP workloads found in the private cloud.

## Hybrid Cloud Solutions

### The DIY Approach

This approach is not for the faint of heart. It is typically the most complicated way to create a hybrid cloud. It requires deep knowledge and understanding of not only on-premises enterprise and cloud architecture, but also how to integrate them properly. This requires a new set of tools and skills, such as learning cloud storage; networking; instance types; and, most importantly, how to manage costs. Businesses with sufficient technical resources can overcome these barriers and create a robust hybrid cloud solution. Unfortunately, this is the first approach for many businesses. Oftentimes they end up becoming overwhelmed and ultimately end up drastically reducing their presence in the public cloud, which discourages them from beginning any new public cloud projects.

### The Single Hypervisor Approach

The single hypervisor approach is one that is exemplified by Azure Stack and VMware Cloud on AWS. These solutions remove a lot of the complexity found in the DIY approach. Due to the tight integration between the hypervisor and management stack, very few new skills are needed. An administrator that can manage vSphere in the private cloud has little to learn to be able to manage VMware Cloud on AWS. The same is true for Azure Stack and Windows Admin Center. The issues that remain are the costs and lock-in. Both of these solutions have financial costs that are often far above the DIY approach, putting them out of reach of many smaller enterprises. Additionally, each of these solutions effectively locks the enterprise into a particular vendor’s ecosystem or creates knowledge silos within the organization. This ends up negating a lot of the agility that brought enterprises to the public cloud in the first place.

### The Enterprise Multi-Cloud Strategy

The enterprise multi-cloud approach is the natural evolution of hybrid cloud. It allows enterprises to take advantage of the benefits in each of the three major cloud providers’ (AWS, Azure, and GCP) offerings, while also being able to easily move workloads between cloud providers and the private cloud and while also managing costs. This is exemplified by Nutanix and its products [_Xi Beam_](https://www.nutanix.com/products/beam) and [_Calm_](https://www.nutanix.com/products/calm). These solutions give enterprises the insight and tools they’ve needed to optimize and automate their public cloud workloads. Centralized financial governance is one of the most important components of the multi-cloud strategy. _Xi Beam_ not only centralizes financial governance but also allows for remediation of under and over-utilized public cloud resources. Additionally, _Xi Beam_ offers compliance governance with automated audit checks, which removes another layer of complexity to the multi-cloud strategy. Another important component of the multi-cloud strategy is automation. _Calm_ gives enterprises the ability to quickly provision applications and allow for self-service resource consumption for other business units, enabling the agility of the cloud for which the public cloud is well known, as well as mitigating shadow IT.

### Where Do We Go from Here?

Hybrid cloud is the enterprise infrastructure model of the foreseeable future. The control, flexibility, and ease have made the pure public cloud model unattractive and the pure private cloud model obsolete. It is important for each enterprise to evaluate their needs and technical resources to decide on which of the hybrid cloud models best suits them.
