import { notFound } from 'next/navigation'
import { MdCalendarToday } from 'react-icons/md'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { format } from 'date-fns'
import { Layout } from '@/components/layout/layout'
import { ArticleTracker } from '@/components/analytics/ArticleTracker'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'
import 'highlight.js/styles/vs.css'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/posts/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Sherif Alghali'],
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.featuredImage || undefined,
          datePublished: new Date(post.date).toISOString(),
          dateModified: new Date(post.date).toISOString(),
          author: {
            "@type": "Person",
            name: "Sherif Alghali",
            url: `${siteConfig.url}/about/`,
            image: siteConfig.author.image,
          },
          publisher: {
            "@type": "Person",
            name: "Sherif Alghali",
            url: siteConfig.url,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/blog/posts/${slug}/`,
          },
          keywords: post.tags?.join(', '),
          articleSection: post.category,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${siteConfig.url}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${siteConfig.url}/blog/`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: `${siteConfig.url}/blog/posts/${slug}/`,
            },
          ],
        }}
      />
      <ArticleTracker title={post.title} category={post.category} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MdCalendarToday />
                <span className="text-sm">
                  {(() => {
                    const postDate = new Date(post.date)
                    return isNaN(postDate.getTime()) 
                      ? "Invalid Date" 
                      : format(postDate, 'MMMM d, yyyy')
                  })()}
                </span>
              </div>
              
              {post.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {post.category}
                </span>
              )}
            </div>

            {post.excerpt && (
              <p className="text-lg text-gray-600 italic">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Post Content */}          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-blue-600 prose-h2:pb-2 prose-h3:text-xl prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-600 prose-ul:pl-6 prose-ul:mb-4 prose-ol:pl-6 prose-ol:mb-4 prose-li:mb-2 prose-li:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:ml-0 prose-blockquote:italic prose-blockquote:text-gray-500 prose-blockquote:bg-gray-50 prose-blockquote:p-2 prose-blockquote:my-4 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-blue-600 prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded prose-pre:overflow-auto prose-pre:my-4 prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-white prose-img:rounded prose-img:my-4 prose-img:mx-auto prose-img:max-w-full prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-table:w-full prose-table:border-collapse prose-table:my-4 prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-th:text-left prose-th:bg-gray-100 prose-th:font-bold prose-td:border prose-td:border-gray-300 prose-td:p-2">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="space-y-2">
              <p className="font-semibold text-gray-700">
                Tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border border-gray-300 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
