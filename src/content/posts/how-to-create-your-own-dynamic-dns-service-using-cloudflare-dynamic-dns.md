---
title: "How to Create Your Own Dynamic DNS Service using Cloudflare Dynamic DNS"
date: 2024-02-28
categories: 
  - "cloud-technologies"
  - "tech"
tags: 
  - "cloudflare"
featuredImage: "https://sherifalghalistaticsite.blob.core.windows.net/images/DALL·E-2024-02-28-05.47.47-Design-a-simple-and-clean-featured-image-for-a-post-about-creating-a-Dynamic-DNS-service-using-Cloudflare.-The-image-should-be-based-on-simple-geometr.webp"
excerpt: "Learn how to set up a Dynamic DNS service with Cloudflare for free to automatically update your DNS records when your IP address changes."
---

Learn how to set up a Dynamic DNS service with Cloudflare for free. Dynamic DNS allows you to update your DNS records automatically whenever your IP address changes, and Cloudflare makes it easy with its API. To start, create an API token with permission to edit DNS records and use a simple Bash script to update your DNS record with Cloudflare. The script is designed to run on your source machine and can be used to provide DDNS service from anywhere. With Cloudflare Dynamic DNS, you can use their CDN and security features to improve website performance and security.

![Dynamic DNS with Cloudflare](https://sherifalghalistaticsite.blob.core.windows.net/images/DALL·E-2024-02-28-05.47.47-Design-a-simple-and-clean-featured-image-for-a-post-about-creating-a-Dynamic-DNS-service-using-Cloudflare.-The-image-should-be-based-on-simple-geometr.webp)

[](https://www.sherifalghali.com/2023/02/22/how-to-create-your-own-dynamic-dns-service-using-cloudflare-dynamic-dns/)

## Some Background

Dynamic DNS is used by many whose IP provider has given a dynamic IP address. While there are free services out there, it is typically a service that costs $25 a year. In this article, I will show you how to create your own script to manage dynamic DNS service using Cloudflare.

## How it All Started

This all started with a Network Chuck video. For some background, I’ve been running NoIP as my dynamic DNS provider for several years. This, combined with port forwarding on my firewall, allowed me to VPN to my home network and RDP into my desktop PC while away from home.

This setup has worked for years, but the Network Chuck video highlighted the security issues surrounding punching holes in my network firewall. So, I followed his advice and the steps in his video to install a free Kemp load balancer and SSL offloader on my network. The Kemp load balancer acts as a reverse proxy, forwarding external requests to my internal resources, and SSL offloading ensures that my connections are secure.

While this was a great step forward regarding network security, it also meant that my dynamic DNS provider was no longer working. NoIP relies on a client-side application to periodically update your IP address with their DNS servers. Still, with the Kemp load balancer in place, I needed a more flexible solution.

## Cloudflare Dynamic DNS

Enter Cloudflare Dynamic DNS. Cloudflare is a CDN and security company that offers a suite of services to improve website performance and security. One of their services is Dynamic DNS, which allows you to update your DNS records automatically when your IP address changes.

The best part? Cloudflare Dynamic DNS is completely free!

To get started, you must sign up for a Cloudflare account and create a new API token with permission to edit DNS records. Once you have your API token, you can update your DNS records using Cloudflare’s API.

## Creating Your Dynamic DNS Script

To simplify things, I modified a [simple Bash script](https://gist.github.com/Tras2/cba88201b17d765ec065ccbedfb16d9a) that I found on GitHub that updates my DNS records with Cloudflare. Here’s the script:

```
#!/bin/bash

# A bash script to update Cloudflare DNS A records with the external IP of the source machine

# Proxy - uncomment and provide details if using a proxy
# export https_proxy=http://<proxyuser>:<proxypassword>@<proxyip>:<proxyport>

# Cloudflare zone is the zone which holds the records
zone="example.com"

# DNS records to be updated
dnsrecords=(vpn.example.com vcenter.example.com desktop.example.com www.example.com example.com)

# Flag for Cloudflare proxy status (true or false, lower case in script logic, correctly formatted in JSON payload)
use_proxy=true

# Cloudflare authentication details file path
cloudflare_auth_file="./cloudflare_auth_key.txt"

# Get the Cloudflare authentication key from the file
cloudflare_auth_key=$(cat "$cloudflare_auth_file")

# Get the current external IP address
current_ip=$(curl -s -X GET https://checkip.amazonaws.com)

echo "Current IP is $current_ip"

# Loop through the DNS records and update if necessary
for dnsrecord in "${dnsrecords[@]}"; do
    cloudflare_zone_id=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$zone&status=active" \
      -H "Authorization: Bearer $cloudflare_auth_key" \
      -H "Content-Type: application/json" | jq -r '.result[0].id')

    cloudflare_dnsrecord=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$cloudflare_zone_id/dns_records?type=A&name=$dnsrecord" \
      -H "Authorization: Bearer $cloudflare_auth_key" \
      -H "Content-Type: application/json")

    cloudflare_dnsrecord_ip=$(echo $cloudflare_dnsrecord | jq -r '.result[0].content')
    cloudflare_dnsrecord_proxied=$(echo $cloudflare_dnsrecord | jq -r '.result[0].proxied')

    if [[ "$current_ip" == "$cloudflare_dnsrecord_ip" ]] && { [[ "$use_proxy" == true ]] && [[ "$cloudflare_dnsrecord_proxied" == true ]] || [[ "$use_proxy" == false ]] && [[ "$cloudflare_dnsrecord_proxied" == false ]]; }; then
        echo "$dnsrecord DNS record is up to date"
    else
        cloudflare_dnsrecord_id=$(echo $cloudflare_dnsrecord | jq -r '.result[0].id')
        # Update the record
        update_response=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$cloudflare_zone_id/dns_records/$cloudflare_dnsrecord_id" \
          -H "Authorization: Bearer $cloudflare_auth_key" \
          -H "Content-Type: application/json" \
          --data "{\"type\":\"A\",\"name\":\"$dnsrecord\",\"content\":\"$current_ip\",\"ttl\":1,\"proxied\":$use_proxy}")
        echo "$dnsrecord DNS record has been updated with the current IP: $current_ip"
    fi
done
```

To use this script, replace the example.com variable with your own values.

Save the script to a file (e.g. cloudflare-ddns.sh) and make it executable with

```
chmod +x cloudflare-ddns.sh.
```

Also, the script reads the Cloudflare API key from a file named cloudflare\_auth\_key.txt . This is easy enough to create using nano. nano cloudflare\_auth\_key.txt will create the file. Then, copy and paste the key into the file and save it.

Finally, set up a cron job to run the script periodically (e.g., every 10 minutes) to ensure that your DNS records are always up to date. Here’s an example cron job:

```
*/10 * * * * /path/to/cloudflare-ddns.sh > /dev/null 2>&1
```

## Conclusion

And that’s it! You can create your own dynamic DNS service using Cloudflare for free with a few simple steps. This will ensure that your DNS records are always up to date, even when your IP address changes.

By using Cloudflare Dynamic DNS, you can also take advantage of Cloudflare’s CDN and security features to improve website performance and security. And best of all, you don’t have to worry about the security risks of opening up your network firewall.

So go ahead and give it a try!
