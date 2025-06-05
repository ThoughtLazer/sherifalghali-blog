import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  featuredImage?: string
  tags?: string[]
  category?: string
  year: string
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Extract year from date
    const postDate = new Date(data.date)
    const year = postDate.getFullYear().toString()

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
      featuredImage: data.featuredImage || data.featured_image,
      tags: data.tags || [],
      category: data.category || 'Tech',
      year,
    }
  } catch (error) {
    return null
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  
  return posts
}

export function getPostsByYear(year: number): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => parseInt(post.year) === year)
}

export function getNewestPosts(count: number = 3): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.slice(0, count)
}

export function getYearsWithPosts(): string[] {
  const allPosts = getAllPosts()
  const years = [...new Set(allPosts.map((post) => post.year))]
  return years.sort((a, b) => parseInt(b) - parseInt(a))
}

export function getAvailableYears(): number[] {
  const allPosts = getAllPosts()
  const years = [...new Set(allPosts.map((post) => parseInt(post.year)))]
  return years.sort((a, b) => b - a)
}
