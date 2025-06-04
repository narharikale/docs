import { MainLayout } from '@/components/layout/main-layout'
import { SidebarNav } from '@/components/layout/sidebar-nav'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout
      sidebar={<SidebarNav />}
      header={
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Documentation
          </h1>
        </div>
      }
    >
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </MainLayout>
  )
} 