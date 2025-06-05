"use client"

import { useState } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import Link from "next/link"
import { BlogPost } from "@/lib/posts"

interface CarouselProps {
  posts: BlogPost[]
}

export function PostCarousel({ posts }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length)
  }

  if (!posts.length) {
    return null
  }

  const currentPost = posts[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-96">
        {currentPost.featuredImage && (
          <img
            src={currentPost.featuredImage}
            alt={currentPost.title}
            className="w-full h-full object-cover"
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">
            {currentPost.title}
          </h3>
          <p className="text-gray-200 mb-4 line-clamp-3">
            {currentPost.excerpt}
          </p>
          <Link
            href={`/blog/posts/${currentPost.slug}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Read More
          </Link>
        </div>

        {/* Navigation buttons */}
        {posts.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
              aria-label="Previous post"
            >
              <MdChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
              aria-label="Next post"
            >
              <MdChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      {posts.length > 1 && (
        <div className="flex justify-center space-x-2 p-4">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
