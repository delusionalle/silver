import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    //NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.coerce.string().min(1),
    DATABASE_URL: z.coerce.string().min(1),
    DISCORD_CLIENT_ID: z.coerce.string().min(1),
    DISCORD_CLIENT_SECRET: z.coerce.string().min(1)
  },
  client: {
    //NEXT_PUBLIC_APP_URL: z.string().min(1)
  },
  runtimeEnv: {
    //NEXTAUTH_URL: z.coerce.string().url().optional(),
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET
  }
})