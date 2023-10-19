import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Обзор"
        text="Быстрый доступ к историческим данным"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border"></div>
    </DashboardShell>
  )
}
