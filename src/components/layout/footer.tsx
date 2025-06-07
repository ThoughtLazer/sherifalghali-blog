export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Sherif Alghali. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/salghali/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/ThoughtLazer" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
