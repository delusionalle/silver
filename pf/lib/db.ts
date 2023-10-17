import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export interface EntryJson {
  supplier?: number
  material?: number
  category_manager?: number
  operations_manager?: number
  factory?: number
  buying_organisation?: number
  buying_group?: number
  balancing_unit?: number
  measuring_unit?: number
  material_group?: number
  delivery_variant?: number
  urgency_mark?: number
  length?: number
  until_delivery?: number
  month1?: number
  month2?: number
  month3?: number
  day_of_week?: number
  sum?: number
  number_of_positions?: number
  amount?: number
  amount_of_handlers_7?: number
  amount_of_handlers_15?: number
  amount_of_handlers_30?: number
  order_agreement_1?: number
  order_agreement_2?: number
  order_agreement_3?: number
  delivery_date_change_7?: number
  delivery_date_change_15?: number
  delivery_date_change_30?: number
  deblocking_cancellation_freq?: number
  delivery_date_change_freq?: number
  delivery_date_paper_change_freq?: number
  agreement_cycle_amount?: number
  change_after_agreement_amount?: number
  days_0_1?: number
  days_1_2?: number
  days_2_3?: number
  days_3_4?: number
  days_4_5?: number
  days_5_6?: number
  days_6_7?: number
  days_7_8?: number
}

export const db = prisma
