import Image from 'next/image'
import Link from 'next/link'

import { hNavConfig } from '@/config/hnavitems'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import { HNav } from '@/components/hnav'

export default function Home() {
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
                'px-4'
              )}
            >
              test
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 ">
        <Link href="/login" className="pl-5 pb-5 pt-5">
          <Button>login</Button>
        </Link>
        <Link href="/register" className="pl-5 pb-5">
          <Button>register</Button>
        </Link>
        <Link href="/dashboard" className="pl-5">
          <Button>dashboard</Button>
        </Link>
      </main>
      <Footer />
    </div>
  )
}
