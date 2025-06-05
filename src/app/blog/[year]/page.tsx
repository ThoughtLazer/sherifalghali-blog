import { notFound } from 'next/navigation'
import { getAllPosts, getPostsByYear, getAvailableYears } from '@/lib/posts'
import { Layout } from '@/components/layout/layout'
import { PostPreview } from '@/components/blog/post-preview'
import { SidebarArchive } from '@/components/blog/sidebar-archive'

interface YearArchivePageProps {
  params: Promise<{ year: string }>
}

// Generate static params for all available years
export async function generateStaticParams() {
  const years = getAvailableYears()
  return years.map((year) => ({
    year: year.toString(),
  }))
}

// Generate metadata for each year
export async function generateMetadata({ params }: YearArchivePageProps) {
  const { year } = await params
  const posts = getPostsByYear(parseInt(year))
  
  if (posts.length === 0) {
    return {
      title: 'Year Not Found',
    }
  }

  return {
    title: `${year} Archive | Sherif Alghali`,
    description: `Tech blog posts from ${year} by Sherif Alghali. ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} covering Azure, cloud infrastructure, and technology insights.`,
  }
}

export default async function YearArchivePage({ params }: YearArchivePageProps) {
  const { year } = await params
  const yearNumber = parseInt(year)
  const posts = getPostsByYear(yearNumber)
  const allPosts = getAllPosts()

  if (posts.length === 0) {
    notFound()
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {year} Archive
              </h1>
              <p className="text-gray-600">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} from {year}
              </p>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostPreview key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 lg:flex-shrink-0">
            <SidebarArchive posts={allPosts} currentYear={yearNumber} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
