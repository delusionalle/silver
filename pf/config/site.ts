import { env } from '@/env.mjs'

import { SiteConfig } from '../types'

export const siteConfig: SiteConfig = {
  name: 'Северсталь',
  description: 'Платформа для анализа работы поставок через ИИ',
  url: 'https://localhost',
  //ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    //twitter: "https://twitter.com/shadcn",
    github: 'https://github.com/delusionalle/silver',
  },
  verstr: env.NEXT_PUBLIC_NODE_ENV === 'production' ? '1.0.0' : `floating`,
  envstr: env.NEXT_PUBLIC_NODE_ENV === 'production' ? '' : 'dev',
}
