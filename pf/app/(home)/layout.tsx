import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { hNavConfig } from '@/config/hnavitems'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import { HNav } from '@/components/hnav'

interface HomeLayoutProps {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <HNav items={hNavConfig.hnavItems}></HNav>
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'px-4 mt-4'
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 ">{children}</main>
      <Footer />
    </div>
  )
}
