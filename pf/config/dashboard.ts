import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
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
      title: 'Predictions',
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
