import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from '@/components/user-auth-form'

export default async function HomePage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 ">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-5xl lg:text-5xl">
            Панель аналитики поставок
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Войдите чтобы продолжить.
          </p>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'sm' }),
              'px-4 mt-4'
            )}
          >
            Войти
          </Link>
        </div>
      </section>
    </>
  )
}
