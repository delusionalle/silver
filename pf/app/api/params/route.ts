import { env } from '@/env.mjs'

export async function GET() {
  const res = await fetch(`${env.MODEL_API_URL}/params`, {
    method: 'GET',
  })

  return res
}
