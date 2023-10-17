import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default async function AnalyticsPage() {
  const res = await fetch('http://localhost:4000/accuracy', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics"
        text="Dive deeper into the data"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <Card className="w-[350px] m-8">
          <CardHeader>
            <CardTitle>Генеральная аналитика</CardTitle>
          </CardHeader>
          <CardContent>Точность модели: {res.status}</CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
