import { Header } from "./header"
import { Footer } from "./footer"

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <div className={`flex-1 ${showSidebar ? 'max-w-4xl' : 'max-w-6xl'} mx-auto px-6 py-8`}>
          {children}
        </div>
        {showSidebar && (
          <div className="w-72 px-6 py-8 border-l border-gray-200">
            {/* Sidebar content will be added later */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
