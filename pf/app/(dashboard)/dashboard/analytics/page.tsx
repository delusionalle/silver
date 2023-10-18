import { headers } from 'next/headers'
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
  const h = headers()

  const accuracyRes = await fetch('http://localhost:3000/api/accuracy/', {
    method: 'GET',
    headers: headers(),
  })

  const paramsRes = await fetch('http://localhost:3000/api/params', {
    method: 'GET',
  })

  const params = await paramsRes.json()
  console.log(params)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics"
        text="Dive deeper into the data"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border flex flex-wrap justify-start align-top">
        <Card className="w-1/3 m-8 h-36">
          <CardHeader>
            <CardTitle>Генеральная аналитика</CardTitle>
          </CardHeader>
          <CardContent>
            <b>Точность модели: </b>
            {Math.round((await accuracyRes.json()) * 10000) / 10000}
          </CardContent>
        </Card>
        <Card className="w-1/3 m-8">
          <CardHeader>
            <CardTitle>Параметры модели</CardTitle>
          </CardHeader>
          <CardContent>
            {' '}
            <b>Параметры модели</b>
            <pre>{JSON.stringify(params, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
