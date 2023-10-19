import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Панель',
      href: '/dashboard',
    },
    {
      title: 'Документация',
      href: '/docs',
    },
    {
      title: 'Поддержка',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Обзор',
      href: '/dashboard',
      icon: 'chevronRight',
    },
    {
      title: 'Предсказания',
      href: '/dashboard/predict',
      icon: 'add',
    },
    {
      title: 'Аналитика',
      href: '/dashboard/analytics',
      icon: 'graph',
    },
    {
      title: 'Настройки',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
}
