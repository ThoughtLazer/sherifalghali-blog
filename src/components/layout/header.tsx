import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          <Link href="/" className="hover:no-underline hover:text-blue-800 transition-colors">
            Sherif Alghali
          </Link>
        </h1>
        
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
