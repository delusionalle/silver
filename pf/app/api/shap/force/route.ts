import { env } from '@/env.mjs'

export async function GET() {
  const res = await fetch(`${env.MODEL_API_URL}/plot`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  console.log(res.body)
  return res
}
