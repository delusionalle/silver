import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your preferences"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border"></div>
    </DashboardShell>
  )
}
