import React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { ModeToggle } from '@/components/mode-toggle'

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.gitHubSmall />
          <p className="text-center text-sm leading-loose md:text-left">
            open-source{' '}
            <a
              href="https://github.com/delusionalle/silver"
              target="_blank"
              rel="norefferer"
              className="font-medium underline underline-offset-4"
            >
              @delusionalle/silver
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
