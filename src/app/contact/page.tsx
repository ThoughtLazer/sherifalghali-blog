import { Layout } from "@/components/layout/layout"
import { MdEmail } from "react-icons/md"

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center py-12 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600">
            I'd love to hear from you
          </p>
        </div>

        {/* Contact Information */}
        <div className="py-8 space-y-6">
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
            <MdEmail className="w-8 h-8 text-blue-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Email Me
            </h2>
            <p className="text-gray-600 mb-4">
              Feel free to reach out for any questions, collaboration opportunities, 
              or just to say hello!
            </p>
            <a
              href="mailto:sherif@sherifalghali.com"
              className="text-blue-600 hover:text-blue-800 hover:underline text-lg font-semibold"
            >
              sherif@sherifalghali.com
            </a>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Connect with me on social media
            </h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://linkedin.com/in/sherifalghali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://bsky.app/profile/sherifalghali.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                BlueSky
              </a>
              <a
                href="https://github.com/sherifalghali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Response Time
          </h3>
          <p className="text-gray-600">
            I typically respond to emails within 24-48 hours. Thank you for your patience!
          </p>
        </div>
      </div>
    </Layout>
  )
}
