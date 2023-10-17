import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { EntryItem } from '@/components/entry-item'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default async function DashboardPage() {
  const entries = await db.entry.findMany({
    take: 20,
    orderBy: {
      id: 'desc',
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Overview"
        text="Data at a glance"
      ></DashboardHeader>
      <div>
        {entries?.length ? (
          <div className="divide-border-200 divide-y rounded-md border">
            {entries.map((entry) => (
              <EntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div>No entries found. TEMP</div>
        )}
      </div>
    </DashboardShell>
  )
}
