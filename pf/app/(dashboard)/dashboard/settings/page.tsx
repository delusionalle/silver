'use client'

import { FormEventHandler, useState } from 'react'
import Link from 'next/link'

import { env } from '@/env.mjs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default function SettingsPage() {
  const [data, setData] = useState()

  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    console.log('hi')
    const res = await fetch(`${env.MODEL_API_URL}/train`, {
      method: 'POST',
    }).then((r) => r.json())

    return setData(res)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Настройки"
        text="Управляйте своими предпочтениями"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <Button className={cn('m-10')} onSubmit={handleSubmit}>
          Перетренировать модель
        </Button>
        <div>{data}</div>
      </div>
    </DashboardShell>
  )
}
