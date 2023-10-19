import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next'

import { env } from '@/env.mjs'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  let json: { predictions: string } = await fetch(
    `${env.MODEL_API_URL}/predict`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    }
  ).then((r) => r.json())

  const arrEntries: Array<Object> = JSON.parse(json.predictions)

  for (let entry of arrEntries)
    await db.entry.create({
      data: {
        data: Object.entries(entry),
      },
    })

  return Response.json(json)
}
