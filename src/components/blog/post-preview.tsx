import Link from "next/link"
import { BlogPost } from "@/lib/posts"
import { format } from "date-fns"

interface PostPreviewProps {
  post: BlogPost
}

export function PostPreview({ post }: PostPreviewProps) {
  const postDate = new Date(post.date)
  const formattedDate = isNaN(postDate.getTime()) 
    ? "Invalid Date" 
    : format(postDate, "MMMM d, yyyy")

  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {post.category}
        </span>
        <span className="text-sm text-gray-500">
          {formattedDate}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-3">
        <Link 
          href={`/blog/posts/${post.slug}`}
          className="text-gray-900 hover:text-blue-600 hover:no-underline transition-colors"
        >
          {post.title}
        </Link>
      </h3>
      
      {post.excerpt && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
      )}
      
      {post.tags && post.tags.length > 0 && (
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
      )}
    </div>
  )
}
