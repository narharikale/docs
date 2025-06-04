import { MainLayout } from '@/components/layout/main-layout'
import { SidebarNav } from '@/components/layout/sidebar-nav'

export default function Home() {
  return (
    <MainLayout
      sidebar={<SidebarNav />}
      header={
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome to Documentation Portal
          </h1>
        </div>
      }
    >
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Documentation Portal
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Welcome to your documentation portal built with Next.js 15, Tailwind CSS, and MDX support.
              This layout features a responsive sidebar, dark mode toggle, and modern design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Responsive Design
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fully responsive layout that works on desktop, tablet, and mobile devices.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Dark Mode
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Toggle between light and dark themes with persistent preferences.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  MDX Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Write interactive documentation with JSX components in Markdown.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Layout Features
            </h2>
            
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• <strong>280px sidebar</strong> on desktop with collapsible mobile view</li>
              <li>• <strong>Responsive breakpoints:</strong> Mobile (&lt; 768px), Tablet (768px - 1024px), Desktop (&gt; 1024px)</li>
              <li>• <strong>Theme toggle</strong> with system preference detection</li>
              <li>• <strong>Smooth animations</strong> and transitions</li>
              <li>• <strong>Accessible navigation</strong> with keyboard support</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Test the Layout
              </h4>
              <p className="text-blue-800 dark:text-blue-300">
                Try resizing your browser window to see the responsive behavior, 
                or click the theme toggle in the header to switch between light and dark modes.
                On mobile devices, use the hamburger menu to open the sidebar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
