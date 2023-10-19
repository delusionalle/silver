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
import { Separator } from '@/components/ui/separator'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

  function parseWorstStatsStringToJsonToArrayOfArraysOfStringAndObjectToArrayOfArraysOfNumberAndNumber(
    str: string
  ) {
    // @ts-ignore
    let out = []
    let parsedObj = JSON.parse(str)
    // @ts-ignore
    parsedObj.map((obj, index) => {
      let parsedEntry = Object.entries(obj)
      out.push(parsedEntry)
    })
    // @ts-ignore
    return out
  }

  const worstMaterials =
    parseWorstStatsStringToJsonToArrayOfArraysOfStringAndObjectToArrayOfArraysOfNumberAndNumber(
      '[{"material":27439,"late_order_count":10097},{"material":1,"late_order_count":742},{"material":11,"late_order_count":91},{"material":3,"late_order_count":65},{"material":30,"late_order_count":64},{"material":158,"late_order_count":61},{"material":5,"late_order_count":59},{"material":26,"late_order_count":58},{"material":12,"late_order_count":56},{"material":48,"late_order_count":50},{"material":309,"late_order_count":44},{"material":98,"late_order_count":43},{"material":93,"late_order_count":42},{"material":4,"late_order_count":41},{"material":114,"late_order_count":40},{"material":398,"late_order_count":39},{"material":120,"late_order_count":39},{"material":72,"late_order_count":36},{"material":302,"late_order_count":35},{"material":102,"late_order_count":35},{"material":150,"late_order_count":33},{"material":19,"late_order_count":32},{"material":492,"late_order_count":32},{"material":100,"late_order_count":32},{"material":51,"late_order_count":29}]'
    )

  const worstSuppliers =
    parseWorstStatsStringToJsonToArrayOfArraysOfStringAndObjectToArrayOfArraysOfNumberAndNumber(
      '[{"supplier":1,"late_cnt":1768},{"supplier":7,"late_cnt":1538},{"supplier":2,"late_cnt":918},{"supplier":4,"late_cnt":494},{"supplier":3,"late_cnt":483},{"supplier":18,"late_cnt":384},{"supplier":39,"late_cnt":362},{"supplier":11,"late_cnt":329},{"supplier":10,"late_cnt":287},{"supplier":25,"late_cnt":280},{"supplier":104,"late_cnt":263},{"supplier":81,"late_cnt":240},{"supplier":117,"late_cnt":234},{"supplier":2720,"late_cnt":224},{"supplier":8,"late_cnt":221},{"supplier":6,"late_cnt":209},{"supplier":41,"late_cnt":203},{"supplier":96,"late_cnt":203},{"supplier":79,"late_cnt":186},{"supplier":15,"late_cnt":184},{"supplier":100,"late_cnt":178},{"supplier":28,"late_cnt":171},{"supplier":60,"late_cnt":169},{"supplier":12,"late_cnt":169},{"supplier":22,"late_cnt":167}]'
    )

  return (
    <DashboardShell suppressHydrationWarning>
      <DashboardHeader
        heading="Аналитика"
        text="Наблюдайте за данными поближе"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border flex flex-wrap justify-start align-top">
        <Card className="w-2/5 m-8">
          <CardHeader>
            <CardTitle>Параметры модели</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(params, null, 2)}</pre>
          </CardContent>
        </Card>
        <Card className="w-2/5 m-8">
          <CardHeader>
            <CardTitle>Аналитика классификатора</CardTitle>
          </CardHeader>
          <CardContent>
            <b className="mb-6">Точность модели: </b>
            {Math.round((await accuracyRes.json()) * 10000) / 10000}
            <Separator className="my-4" />
            <Link href={'/dashboard/analytics/force'}>
              <Button className="mt-2">(Shapley) Силовые графики</Button>
            </Link>{' '}
            <Link href={'/report.html'}>
              <Button className="mt-2">Профиль данных</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-2/5 m-8">
          <CardHeader>
            <CardTitle>Наиболее вероятна задержка:</CardTitle>
          </CardHeader>
          <CardContent>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Материал</TableHead>
                <TableHead className="right">Количество опозданий</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {worstMaterials.map((key, index) => {
                if (index > 5) return

                return (
                  <TableRow key={key[0]}>
                    <TableCell className="font-medium">{key[0][1]}</TableCell>
                    <TableCell className="font-medium">{key[1][1]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </CardContent>
        </Card>
        <Card className="w-2/5 m-8">
          <CardHeader>
            <CardTitle>Наиболее вероятна задержка:</CardTitle>
          </CardHeader>
          <CardContent>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Поставщик</TableHead>
                <TableHead className="right">Количество опозданий</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {worstSuppliers.map((key, index) => {
                if (index > 5) return

                return (
                  <TableRow key={key[0]}>
                    <TableCell className="font-medium">{key[0][1]}</TableCell>
                    <TableCell className="font-medium">{key[1][1]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
