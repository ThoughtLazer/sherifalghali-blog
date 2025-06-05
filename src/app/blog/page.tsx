import { Layout } from "@/components/layout/layout"
import { PostPreview } from "@/components/blog/post-preview"
import { SidebarArchive } from "@/components/blog/sidebar-archive"
import { getAllPosts } from "@/lib/posts"

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Tech Blog
              </h1>
            </div>
            
            <div className="space-y-6">
              {posts.map((post) => (
                <PostPreview key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 lg:flex-shrink-0">
          <SidebarArchive posts={posts} />
        </div>
      </div>
    </Layout>
  )
}
