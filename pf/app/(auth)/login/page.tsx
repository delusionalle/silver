import { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'

export const metadata: Metadata = {
  title: 'Северсталь',
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mb-40">
        <div className="flex flex-col space-y-2 text-center justify-end">
          {/*<Icons.logo className="h-6 w-6 justify-center items-center mx-14" />*/}
          <h1 className="text-2xl font-semibold tracking-tight">
            Добро пожаловать
          </h1>
          <p className="text-sm text-muted-foreground">
            Используйте приложение, чтобы войти
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Нет аккаунта? Создать новый аккаунт
          </Link>
        </p>
      </div>
    </div>
  )
}
