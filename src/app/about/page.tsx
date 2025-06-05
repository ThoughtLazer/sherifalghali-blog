import { Layout } from "@/components/layout/layout"

export default function About() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            About Me
          </h1>
          <p className="text-xl text-gray-600">
            IT Infrastructure & Azure Cloud Professional
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-72 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Professional Photo</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Professional Background
              </h2>
              <p className="text-gray-600 leading-relaxed">
                I am an experienced IT professional specializing in infrastructure design, 
                cloud technologies, and Azure solutions. With a passion for technology and 
                continuous learning, I've dedicated my career to helping organizations 
                modernize their IT infrastructure and leverage cloud technologies effectively.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Areas of Expertise
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">• Azure Cloud Architecture & Administration</p>
                <p className="text-gray-600">• IT Infrastructure Design & Implementation</p>
                <p className="text-gray-600">• Virtualization Technologies (VMware, Hyper-V)</p>
                <p className="text-gray-600">• Cloud Migration & Hybrid Solutions</p>
                <p className="text-gray-600">• DevOps & Automation</p>
                <p className="text-gray-600">• Network Security & Compliance</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Certifications
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">• Microsoft Certified: Azure Administrator Associate (AZ-104)</p>
                <p className="text-gray-600">• VMware Certified Professional - Network Virtualization (VCP-NV)</p>
                <p className="text-gray-600">• Various other industry certifications</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Connect With Me
              </h3>
              <div className="flex gap-4">
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
                <a 
                  href="https://learn.microsoft.com/en-us/users/sherifalghali/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Microsoft Transcript
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-50 p-8 rounded-lg text-center mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            My Mission
          </h3>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            To share knowledge, experiences, and insights that help fellow IT professionals 
            and organizations successfully navigate their digital transformation journeys. 
            Through this blog, I aim to provide practical, real-world guidance on cloud 
            technologies, infrastructure best practices, and emerging trends in the industry.
          </p>
        </div>
      </div>
    </Layout>
  )
}
