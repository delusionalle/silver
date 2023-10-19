import Link from 'next/link'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DataEntryForm } from '@/components/data-entry-form'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Прогноз"
        text="Прогнозируйте данные с помощью алгоритма"
      />
      <div className="divide-border-200 divide-y rounded-md border">
        <DataEntryForm />
      </div>
    </DashboardShell>
  )
}
