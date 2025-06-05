import { Layout } from "@/components/layout/layout"
import { PostCarousel } from "@/components/carousel/post-carousel"
import { getNewestPosts } from "@/lib/posts"

export default function Home() {
  const newestPosts = getNewestPosts(3)

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Welcome to My Tech Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Exploring IT infrastructure, Azure cloud technologies, and sharing insights 
            from my journey as a certified technology professional.
          </p>
        </div>

        {/* Featured Posts Carousel */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Latest Posts
          </h2>
          <PostCarousel posts={newestPosts} />
        </div>

        {/* About Section */}
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            About This Blog
          </h3>
          <p className="text-gray-600 max-w-4xl mx-auto">
            This is where I share my experiences with cloud technologies, infrastructure design, 
            and the latest trends in IT. Whether you're looking to learn about Azure, 
            optimize your infrastructure, or explore new technologies, you'll find 
            practical insights and real-world experiences here.
          </p>
        </div>
      </div>
    </Layout>
  )
}
