export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sherifalghali.com',
  title: 'Sherif Alghali - Tech Blog',
  description:
    'IT Infrastructure, Azure Cloud, and Microsoft 365 expertise from Sherif Alghali, a Microsoft Certified Trainer and Azure Solutions Architect.',
  author: {
    name: 'Sherif Alghali',
    email: 'sherif@sherifalghali.com',
    url: 'https://www.sherifalghali.com/about/',
    linkedin: 'https://www.linkedin.com/in/salghali/',
    github: 'https://github.com/ThoughtLazer',
    bluesky: 'https://bsky.app/profile/thoughtlazer.bsky.social',
    image:
      'https://sherifalghalistaticsite.blob.core.windows.net/images/20220210_170751740_iOS 1.jpg',
    jobTitle: 'IT Infrastructure & Azure Cloud Professional',
    certifications: [
      'Microsoft Certified Trainer (MCT)',
      'Azure Solutions Architect Expert',
      'Microsoft 365 Certified: Administrator Expert',
      'Cybersecurity Architect Expert',
      'Azure Network Engineer Associate',
      'Azure Security Engineer Associate',
      'Azure Administrator Associate',
      'VMware Certified Professional - Network Virtualization (VCP-NV)',
    ],
  },
  favicon:
    'https://sherifalghalistaticsite.blob.core.windows.net/images/Sherif-Favicon.jpg',
  analytics: {
    appInsightsConnectionString:
      'InstrumentationKey=21b09191-b522-48fb-bb1b-7398fb2dee37;IngestionEndpoint=https://southcentralus-3.in.applicationinsights.azure.com/;LiveEndpoint=https://southcentralus.livediagnostics.monitor.azure.com/;ApplicationId=315f555b-1398-43cd-9fe8-75e1f83c15a4',
    gaTrackingId: 'G-XR44Z61SPL',
  },
} as const;
