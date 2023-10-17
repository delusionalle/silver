import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Overview"
        text="Data at a glance"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border"></div>
    </DashboardShell>
  )
}
