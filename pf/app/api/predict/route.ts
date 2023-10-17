import { env } from '@/env.mjs'

export async function GET(request: Request) {
  const res = await fetch(env.MODEL_API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request.json()),
  })

  const data = await res.json()
  return Response.json(data)
}
