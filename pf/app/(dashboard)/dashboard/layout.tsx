import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { dashboardConfig } from '@/config/dashboard'
import { getCurrentUser } from '@/lib/session'
import { Footer } from '@/components/footer'
import { HNav } from '@/components/hnav'
import { DashboardNav } from '@/components/nav'
import { UserAccountNav } from '@/components/user-account-nav'

export const metadata: Metadata = {
  title: 'Панель',
}

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-20 items-center justify-between py-4">
          <HNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <Footer className="border-t" />
    </div>
  )
}
