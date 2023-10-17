import { getServerSession } from 'next-auth/next'

import { env } from '@/env.mjs'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 403 })
  }

  let res = await fetch(`${env.MODEL_API_URL}/accuracy`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
  return res
}
