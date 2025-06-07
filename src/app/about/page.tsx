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
            <div className="w-72 h-72 rounded-lg overflow-hidden">
              <img
                src="https://sherifalghalistaticsite.blob.core.windows.net/images/20220210_170751740_iOS 1.jpg"
                alt="Sherif Alghali - Professional Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                As a Microsoft Certified Trainer (MCT), I am deeply passionate about learning and sharing 
                knowledge with others. My journey in technology is driven by curiosity and the joy of 
                helping fellow professionals grow their skills and advance their careers. I believe that 
                the best way to truly master something is to teach it, which is why I'm committed to 
                creating content, training materials, and resources that make complex technical concepts 
                accessible to everyone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When I'm not immersed in the world of cloud technologies and IT infrastructure, you'll 
                find me traveling to new destinations, getting lost in a good book, or expressing my 
                creativity through writing.
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
                <p className="text-gray-600">• M365 Tenant Migrations</p>
                <p className="text-gray-600">• Network Security & Compliance</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Certifications
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Microsoft Expert Level Certifications</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">• <strong>Microsoft 365 Certified: Administrator Expert</strong></p>
                    <p className="text-gray-700">• <strong>Azure Solutions Architect Expert</strong></p>
                    <p className="text-gray-700">• <strong>Cybersecurity Architect Expert</strong></p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Microsoft Associate Level Certifications</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">• <strong>Azure Network Engineer Associate</strong></p>
                    <p className="text-gray-700">• <strong>Azure Security Engineer Associate</strong></p>
                    <p className="text-gray-700">• <strong>Azure Administrator Associate</strong></p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Other Professional Certifications</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">• <strong>Microsoft Certified Trainer (MCT)</strong></p>
                    <p className="text-gray-700">• <strong>VMware Certified Professional - Network Virtualization (VCP-NV)</strong></p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/salghali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://bsky.app/profile/thoughtlazer.bsky.social" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  BlueSky
                </a>
                <a 
                  href="https://github.com/ThoughtLazer" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://learn.microsoft.com/en-us/users/sherifalghali-8310/transcript/d5l8kuy1yxl0gk5?tab=credentials-tab" 
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
