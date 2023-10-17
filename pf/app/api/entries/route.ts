import { getServerSession } from 'next-auth/next'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { db, EntryJson } from '@/lib/db'

const entryCreateSchema = z.object({
  supplier: z.number(),
  material: z.number(),
  category_manager: z.number(),
  operations_manager: z.number(),
  factory: z.number(),
  buying_organisation: z.number(),
  buying_group: z.number(),
  balancing_unit: z.number(),
  measuring_unit: z.number(),
  material_group: z.number(),
  delivery_variant: z.number(),
  urgency_mark: z.number(),
  length: z.number(),
  until_delivery: z.number(),
  month1: z.number(),
  month2: z.number(),
  month3: z.number(),
  day_of_week: z.number(),
  sum: z.number(),
  number_of_positions: z.number(),
  amount: z.number(),
  amount_of_handlers_7: z.number(),
  amount_of_handlers_15: z.number(),
  amount_of_handlers_30: z.number(),
  deblocking_cancellation_freq: z.number(),
  delivery_date_change_freq: z.number(),
  delivery_date_paper_change_freq: z.number(),
  agreement_cycle_amount: z.number(),
  change_after_agreement_amount: z.number(),
  days_0_1: z.number(),
  days_1_2: z.number(),
  days_2_3: z.number(),
  days_3_4: z.number(),
  days_5_6: z.number(),
  days_6_7: z.number(),
  days_7_8: z.number(),
  is_late: z.number().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const entries = await db.entry.findMany({
      take: 20,
      orderBy: {
        id: 'desc',
      },
    })

    return new Response(JSON.stringify(entries))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const { user } = session

    const json = await req.json()
    const body = entryCreateSchema.parse(json)

    const entry = await db.entry.create({
      data: body,
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(entry))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
