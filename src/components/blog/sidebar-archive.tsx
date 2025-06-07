import Link from "next/link"
import { BlogPost } from "@/lib/posts"

interface SidebarArchiveProps {
  posts: BlogPost[]
  currentYear?: number
}

export function SidebarArchive({ posts, currentYear }: SidebarArchiveProps) {
  // Get unique years from posts, filtering out invalid years
  const years = [...new Set(posts
    .map((post) => parseInt(post.year))
    .filter((year) => !isNaN(year)))]
    .sort((a, b) => b - a)

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Archives
      </h3>
      <div className="flex flex-col gap-2">
        <Link
          href="/blog"
          className={`${
            !currentYear 
              ? "text-blue-600 font-semibold" 
              : "text-gray-600 hover:text-blue-600"
          } transition-colors`}
        >
          All Posts
        </Link>
        {years.map((year) => (
          <Link
            key={year}
            href={`/blog/year/${year}`}
            className={`${
              currentYear === year 
                ? "text-blue-600 font-semibold" 
                : "text-gray-600 hover:text-blue-600"
            } transition-colors`}
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SidebarArchive
