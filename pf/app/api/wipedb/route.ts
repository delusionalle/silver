import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'

export async function POST() {
  await db.entry.deleteMany({})
  revalidatePath('/dashboard')
  redirect('/dashboard')
}
