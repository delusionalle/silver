import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Data',
      href: '/dashboard',
      icon: 'database',
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'graph',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
}
