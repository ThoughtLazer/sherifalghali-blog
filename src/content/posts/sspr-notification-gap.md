---
title: "The SSPR Notification That Doesn't Cover the Reset You Care About"
date: "2026-05-19"
excerpt: "Microsoft Entra's password reset notifications fire on self-service events only. The admin-initiated reset, the one with actual security weight, generates no email. Here is the exact scope and how to close the gap."
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/sspr-notification-gap.png"
category: "Tech"
tags: ["M365", "Entra", "SSPR", "security", "identity"]
---

I was given a security posture engagement for a client. The end goal was to document what existed and then make recommendations. I started by reviewing conditional access policies, auditing the standing global admin accounts, and rolling out Privileged Identity Management (PIM). One of the unique items in the Statement of Work (SOW) was to ensure alerting for all password changes and elevations, which led me down a rabbit hole.

Microsoft Entra's password reset notifications fire on self-service events only. The admin-initiated reset, the one with actual security weight, generates no email. Here is the exact scope and how to close the gap.

The toggle labeled "Notify all admins when other admins reset their password" does not notify you when an admin resets another admin's password. It fires only when an admin resets *their own* password through the Self-Service Password Reset (SSPR) portal. If you enabled it expecting coverage on admin-initiated resets, you don't have it, and the label is the reason you think you do.

## What the two toggles actually cover

Under Entra, Protection, Password reset, Notifications, there are two settings:

* "Notify users on password resets." Fires when a user resets their own password via the SSPR portal at `aka.ms/sspr`. It does not fire when an admin resets that user's password from the portal.
* "Notify all admins when other admins reset their password." Fires only when an admin self-services their own reset through SSPR. It does not fire when one admin resets another admin's, or any other user's, password.

Both toggles cover the SSPR-initiated surface and nothing else. This is documented behavior, not a bug. Microsoft's [How it works: self-service password reset](https://learn.microsoft.com/entra/identity/authentication/concept-sspr-howitworks#notifications) is the authoritative reference.

## The event that stays silent

The reset that matters from a security standpoint is an administrator resetting *someone else's* password. That is the help-desk social engineering path and the post-compromise pivot path. Neither toggle touches it. It is written to the Entra audit log as the `Reset password (by admin)` activity, but no notification email is ever generated, because no SSPR flow occurred.

So the native control alerts on the low-risk self-service events and is completely silent on the higher-risk admin-initiated one. A control you have overclaimed is worse than no control, because the checked box stops you from building the coverage you actually need.

The same pattern shows up elsewhere in M365. I wrote about it in [The Zero-Trust Blind Spot in M365](https://www.sherifalghali.com/blog/posts/zero-trust-blind-spot-m365-ooo/): a default whose real scope is narrower than its label implies, leaving the surface you assumed was covered unmonitored.

## Closing the gap

Keep both toggles on. They are free, native, and they do cover the self-service surface correctly. They are just not the whole control.

The admin-initiated reset lands in the audit log, so that is where you alert. Stream Entra AuditLogs to a Log Analytics workspace and alert on it with a Kusto Query Language (KQL) rule:

```kql
AuditLogs
| where OperationName == "Reset password (by admin)"
| extend Actor  = tolower(tostring(InitiatedBy.user.userPrincipalName))
| extend Target = tolower(tostring(TargetResources[0].userPrincipalName))
| where isnotempty(Actor) and Actor != Target
| project TimeGenerated, OperationName, Actor, Target, Result
```

The `Actor != Target` filter is what makes this useful. It drops the case where an admin reset their own password and surfaces only an admin resetting someone else's, which is precisely the event the native notifications miss. Run it as a scheduled alert rule on a short evaluation window (five minutes works well) and fire when it returns any rows. It is real-time, stays inside the Microsoft stack with no connectors to maintain, and costs very little at normal tenant volume.

Paired correctly:

* Native SSPR notifications cover the self-service surface (user or admin resets their own password through SSPR).
* The KQL alert above covers the admin-initiated surface (an admin resets another account's password from the portal).

Neither is complete alone. Together they are.

Oh, and double-check that your admins have allow-listed `msonlineservicesteam@microsoft.com` and `msonlineservicesteam@microsoftonline.com`. That is what keeps the native SSPR notifications actually hitting their inboxes.

## Audit checklist

1. In Entra, Protection, Password reset, Notifications, confirm "Notify users on password resets" and "Notify all admins when other admins reset their password" are both set to Yes, and record that this covers SSPR self-service resets only.
2. Confirm `msonlineservicesteam@microsoft.com` and `msonlineservicesteam@microsoftonline.com` are allow-listed in mail filtering, and that the recipients know what the email looks like.
3. Confirm Entra AuditLogs are streaming to a Log Analytics workspace and that the `Reset password (by admin)` operation is queryable there.
4. Confirm a scheduled query rule is deployed on that workspace filtering `OperationName == "Reset password (by admin)"` with actor not equal to target, on a short evaluation window, alerting on any returned rows.
5. Confirm the rule's alert reaches a person who will act on it, not a workspace nobody watches.

## Conclusion: The Finding Is the Scope, Not the Setting

If a help-desk technician reset an executive's password right now, how would you find out, and how fast? For most tenants the honest answer is: you wouldn't.

You close that gap for about five dollars a month. A KQL alert on the audit log, paired with the native SSPR notifications, covers the surface the toggles were never built to reach. The native controls handle the self-service resets; the alert handles the admin-initiated ones. Neither is the whole answer on its own. Together they are one more layer of defense in depth.
