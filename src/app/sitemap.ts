import type { MetadataRoute } from 'next';
import { getAllPosts, getAvailableYears } from '@/lib/posts';
import { siteConfig } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const posts = getAllPosts();
  const years = getAvailableYears();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/posts/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const yearPages: MetadataRoute.Sitemap = years.map((year) => ({
    url: `${baseUrl}/blog/${year}/`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }));

  return [...staticPages, ...postPages, ...yearPages];
}
