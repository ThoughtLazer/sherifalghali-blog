---
title: "The Zero-Trust Blind Spot in M365: Out-of-Office Notifications and the Intelligence You're Giving Away"
date: "2026-03-10"
excerpt: "Organizations invest heavily in zero-trust architecture, phishing simulations, and conditional access policies, then let employees broadcast their exact absence windows to anyone with an email address. Here's why out-of-office notifications deserve a place in your security awareness program and what M365 admins can do about it."
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/ooo-m365.png"
category: "Tech"
tags: ["M365", "security", "zero-trust", "Exchange Online", "SC-300"]
---

Here's a question to ask yourself tomorrow morning: do you know what your organization's out-of-office replies are telling the outside world right now? Not what they're telling your colleagues or your clients, but what they're telling the person who just sent a scouting email to five of your executives to see who's away this week. If you don't know the answer, you're not alone. I have yet to encounter an organization that includes out-of-office notification hygiene in their security awareness training. We run phishing simulations, enforce MFA, build conditional access policies, deploy endpoint protection, and train users to spot suspicious links. Then we let those same users broadcast exactly when they'll be away, how long they'll be gone, who to contact instead, and that they'll have limited access to email. If you're building a zero-trust environment, that's worth thinking about.

## This Isn't Just an M365 Problem

Before I go further, I want to be clear: while this article focuses on Microsoft 365 because that's the ecosystem I work in and where the admin controls I'll reference live, the underlying risk applies to any platform with out-of-office functionality and email signatures. Google Workspace, on-premises Exchange, Zimbra, or any other email and messaging client with an auto-reply feature presents the same exposure. The zero-trust thinking here is platform-agnostic even if the solutions are platform-specific.

## We Invest in Zero Trust, Then Give Away the Keys

Think about what a typical zero-trust posture looks like in a mature M365 environment. You've deployed conditional access policies. You've configured Defender for Office 365. You've set up anti-phishing policies, safe links, safe attachments. You're running KnowBe4 or a similar platform for phishing simulations and security awareness training. You've enforced MFA across the organization. You might even be studying for (or have already passed) the SC-300 to deepen your identity and access management skills.

All of that is designed around a single principle: assume breach. Don't trust anything or anyone by default. Verify every request, every identity, every device.

Now consider what happens when your VP of Finance sets an out-of-office reply that reads: "I will be out of the office from March 10-17 with limited access to email. For urgent matters, please contact Sally Ames, Director of Finance, at sally.ames@contoso.com."

In one auto-reply, you've just handed a potential attacker a validated email address (they now know the mailbox is active and monitored), an exact window of absence, the name and email of a direct report or colleague in the finance department (along with the org chart relationship), and a signal that MFA challenges and security alerts may go unnoticed during that window. That's not a security policy failure. That's an intelligence gift.

## What an Attacker Sees

Let's walk through this from the other side. A threat actor conducting reconnaissance doesn't need anything sophisticated to harvest this information. They send a generic email to a list of addresses at your domain. Most go unanswered or get a normal response. But a few come back with auto-replies, and suddenly the attacker has operational intelligence.

Security researchers at Egress [documented a real-world campaign](https://www.egress.com/blog/phishing/how-adversaries-are-weaponizing-your-out-of-office) where attackers used scouting emails as the first phase of a two-step phishing attack. The scouting emails were intentionally simple; their purpose was to trigger out-of-office replies and confirm which employees were away. The attackers then impersonated those absent employees in targeted Business Email Compromise (BEC) attacks against their colleagues. The scouting emails bypassed both Microsoft 365's built-in protection and the organization's secure email gateway because they didn't contain any overtly malicious content. They didn't need to. The goal was information gathering, not payload delivery.

The "limited access to email" phrase is especially useful to an attacker. It signals that the absent employee may not be actively monitoring their inbox, which means they're less likely to notice a suspicious sign-in alert, an MFA push they didn't initiate, or an email sent from their account that they didn't write. It also tells the attacker that a brute force or credential stuffing attempt has a better chance of going unnoticed during that window.

## The Signature Problem No One Talks About

Here's the piece that I think gets overlooked entirely: the email signature.

Out-of-office auto-replies are reactive. Someone has to email you first to receive the response. But I've seen plenty of professionals add upcoming vacation dates directly to their email signature weeks before they leave. Something like: "Please note: I will be out of the office April 10-15." That signature goes out on every email they send, to every recipient, for days or weeks before the absence even begins.

That's not reactive intelligence gathering; that's a proactive broadcast. Every vendor, every external contact, every thread they're CC'd on now contains a timestamped announcement of exactly when that person will be unavailable. And unlike OOF replies, there's no admin control in Exchange Online that lets you govern the content of what users put in their email signatures without disabling signatures entirely. You can turn off the signature feature through OWA mailbox policies or GPO, but you can't selectively prevent users from adding vacation dates while still letting them have a signature. This is a training and policy gap, not a technical one.

From a zero-trust perspective, this is worth examining. We spend time educating users not to share passwords, not to click suspicious links, not to plug in unknown USB drives. But we don't tell them that broadcasting their vacation schedule in their email signature is handing out the same kind of information that an attacker would normally have to work to obtain.

## What M365 Admins Can Do Right Now

The good news is that Microsoft 365 does provide admin-level controls for out-of-office replies, even if most organizations never touch them. These controls won't solve the email signature problem (that requires policy and training), but they can significantly reduce the information leaking through auto-replies to external recipients.

### Remote Domain Settings

Exchange Online uses remote domain configurations to control what types of automatic replies are sent to external recipients. The default remote domain (which applies to all external domains not specifically configured) controls whether OOF replies go out at all, and what type of OOF message is sent.

You can review your current configuration in the Exchange Admin Center under Mail flow > Remote domains, or with PowerShell:

```powershell
Get-RemoteDomain | ft -AutoSize Name, DomainName, AllowedOOFType, AutoReplyEnabled
```

The `AllowedOOFType` parameter accepts four values: `External` (only the external OOF message is sent), `InternalLegacy` (sends the internal OOF message to the remote domain), `ExternalLegacy` (sends the external message including to legacy systems), and `None` (no OOF replies are sent to that domain at all).

To disable external OOF replies entirely on your default remote domain:

```powershell
Set-RemoteDomain -Identity Default -AllowedOOFType None
```

To also disable automatic replies and automatic forwarding:

```powershell
Set-RemoteDomain -Identity Default -AutoReplyEnabled $false -AutoForwardEnabled $false -AllowedOOFType None
```

This is a blunt instrument. It blocks all external OOF replies across the organization. For some organizations (particularly those in regulated industries, government, or those handling sensitive data), that may be exactly the right posture. For others, you may want a more targeted approach.

For more detail on remote domain configuration, Microsoft's documentation is the definitive resource: [Remote domains in Exchange Online](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/remote-domains/remote-domains) and [Manage remote domains in Exchange Online](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/remote-domains/manage-remote-domains).

### Mailbox-Level Controls

If blocking all external OOF replies is too aggressive for your organization, you can control the external audience at the individual mailbox level using the `ExternalAudience` parameter. This determines who outside the organization receives the external OOF message:

```powershell
# Check a user's current setting
Get-MailboxAutoReplyConfiguration <UserPrincipalName> | fl ExternalAudience

# Options: None, Known, All
# None = no external OOF replies
# Known = only contacts in the user's address book
# All = everyone (this is the default for most configurations)
Set-MailboxAutoReplyConfiguration -Identity <UserPrincipalName> -ExternalAudience Known
```

Setting `ExternalAudience` to `Known` is a practical middle ground for many organizations. Users can still send OOF replies to vendors, clients, and partners they actually work with (provided those contacts are in their address book), but random scouting emails from unknown senders won't trigger a response.

For the full reference on these settings, see Microsoft's documentation: [Understand and troubleshoot Out of Office (OOF) replies](https://learn.microsoft.com/en-us/troubleshoot/exchange/email-delivery/understand-troubleshoot-oof-replies).

### Teams Presence Privacy

Out-of-office status isn't limited to email. When a user sets an OOF reply in Outlook, their Teams presence updates to reflect it, and by default, that presence status is visible to federated (external) users. An attacker who has a Teams account (even a free one) can look up your users and see who's marked as "Out of Office" without sending a single email.

Microsoft provides a tenant-level privacy mode that hides presence information from external users:

```powershell
Set-CsPrivacyConfiguration -Identity Global -EnablePrivacyMode $True
```

When privacy mode is enabled, presence is never shared outside your organization, regardless of your external access settings. Be aware that this change can take several hours to propagate and it applies tenant-wide.

For a thorough walkthrough of how this works in practice, I'd recommend reading the [User presence in Teams documentation](https://learn.microsoft.com/en-us/microsoftteams/presence-admins) on Microsoft Learn.

### OOF Security Audit Checklist

Whether you decide to change anything or not, you should at least know what your current settings are. Here's a starting point:

- What is your `AllowedOOFType` set to on your default remote domain? Do you have any custom remote domains with different OOF settings?
- Is `AutoReplyEnabled` set to `$true` or `$false` on your default remote domain?
- What is the `ExternalAudience` setting on your executive and finance team mailboxes? Are they set to `All`, `Known`, or `None`?
- Is Teams privacy mode (`EnablePrivacyMode`) enabled or disabled for your tenant?
- Do you have a transport rule that modifies, redirects, or blocks OOF messages to external recipients?
- Does your organization have a written policy on what information employees should and should not include in OOF replies?
- Does your organization have a policy on including absence dates in email signatures?
- Is any of this covered in your current security awareness training?

If you can't answer most of those questions right now, that's the point. Most admins can't. These settings exist, they're documented, and they're configurable, but they rarely come up in security reviews because nobody thinks of OOF replies as an attack surface. If you're building a tenant documentation practice (something I wrote about in [M365 Migration Documentation as Architecture](https://www.sherifalghali.com/blog/posts/m365-migration-documentation-as-architecture/)), OOF and remote domain settings belong in your baseline configuration documentation alongside your conditional access policies and mail flow rules.

## This Belongs in Your Security Awareness Training

I've been thinking about this topic more as I study for the SC-300, which focuses heavily on identity and access management, conditional access, and the zero-trust model. The core idea behind zero trust is that you verify explicitly, use least-privilege access, and assume breach. Out-of-office notifications don't fit neatly into any of those categories, but they violate the spirit of all three.

You're not verifying who receives the information (the auto-reply goes to anyone who emails the user). You're not applying least privilege to the information shared (most OOF messages include far more detail than the recipient needs). And you're certainly not assuming breach when you broadcast the exact window during which an account is least likely to be monitored.

I have yet to encounter an organization that includes out-of-office notification hygiene as part of their security awareness training. Not one. We train users to recognize phishing emails, to use strong passwords, to report suspicious activity. But we don't train them on what they should and shouldn't put in an OOF reply, or why adding "vacation: April 10-15" to their email signature is handing out reconnaissance data.

This should be a module in your security awareness program, right alongside password hygiene and phishing recognition. It doesn't need to be a long module. Fifteen minutes covering what information OOF replies expose, what a safer OOF message looks like (vague on dates, no chain of command, no personal contact information), and why email signatures should never include absence schedules. That's it. Fifteen minutes that closes a gap most organizations don't even know they have.

## Conclusion: Zero Trust Means Questioning Everything, Even the Polite Things

The reason this topic interests me isn't because out-of-office notifications are the biggest security risk facing M365 environments. They're not. But they represent something that I think is important to recognize: the gap between the security architecture we build and the everyday behaviors we overlook. We can deploy every tool Microsoft offers, pass every certification exam, and run phishing simulations every quarter, but if we're not examining the small, routine, polite things that employees do every day, we're leaving doors open that we don't even know about.

Zero trust isn't just a set of technical controls. It's a way of thinking about information flow. Every piece of data that leaves your organization, whether it's through an API call, a shared document, or an auto-reply to an unknown sender, is worth examining. The question isn't whether your OOF configuration is the thing that will get you breached. The question is whether you've even looked at it. And for most organizations, the honest answer is no.

If you're building or refining your M365 security posture, I'd encourage you to add OOF reply settings to your next security review. Check the remote domain configuration. Look at the `ExternalAudience` settings on your high-value mailboxes. Enable Teams privacy mode if it makes sense for your organization. And most importantly, talk to your users about what they're putting in those auto-replies and email signatures. It's a small thing. But zero trust is built on small things.

---

**LinkedIn Post:**

I've been studying for the SC-300 and thinking a lot about zero trust in M365 environments lately.

We invest serious time and money into conditional access, MFA, anti-phishing policies, endpoint protection, security awareness training. All built around one principle: assume breach, verify everything.

Then we let employees set out-of-office replies that tell the entire internet exactly when they'll be gone, who to contact instead, and that they'll have limited access to email.

🔍 That's not just a courtesy to your colleagues. That's a reconnaissance gift to anyone running a BEC campaign.

Even worse: some people put their upcoming vacation dates directly in their email signature, broadcasting their absence window on every email they send for weeks before they leave.

I have yet to encounter an organization that covers out-of-office notification hygiene in their security awareness training. Not one.

M365 has admin controls for this (remote domain settings, ExternalAudience parameters, Teams privacy mode). Most orgs have never touched them.

📝 I wrote about what admins should be checking and why this deserves a spot in your security program.

#ZeroTrust #Microsoft365

[ARTICLE URL]

---

**Suggested Featured Image Prompt:**

A clean, modern illustration of a glowing office building at night with one window lit up, casting a beam of light outward into darkness where a shadowy figure stands observing. The building should have a subtle digital shield or lock icon overlaid on it (suggesting security), but the beam of light from the single window breaks through the shield. Color palette: deep blues and teals for the building and darkness, warm amber/gold for the light beam, with subtle circuit board or network node patterns in the background. Professional and understated, not cartoonish. Widescreen 16:9 aspect ratio.
