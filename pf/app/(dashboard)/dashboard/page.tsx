import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import WipeDbButton from '@/components/delete-db-button'
import { EntryItem } from '@/components/entry-item'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default async function DashboardPage() {
  const entries = await db.entry.findMany({
    take: 20,
    orderBy: {
      id: 'desc',
    },
    select: {
      id: true,
      createdAt: true,
      data: true,
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Обзор"
        text="Быстрый доступ к историческим данным"
      ></DashboardHeader>
      <div>
        <Separator />
      </div>
      <div>
        {entries?.length ? (
          <div className="divide-border-200 divide-y rounded-md border">
            {entries.map((entry) => (
              <EntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div>Нет данных.</div>
        )}
      </div>
    </DashboardShell>
  )
}
