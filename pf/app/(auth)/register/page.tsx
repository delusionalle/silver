import { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'

export const metadata: Metadata = {
  title: 'Silver | Log in',
}
export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Log in
      </Link>

      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            {/*<Icons.logo className="mx-auto h-6 w-6" />*/}
            <h1 className="text-2xl font-semibold tracking-tight">
              Создайте аккаунт
            </h1>
            <p className="text-sm text-muted-foreground">
              Используйте приложение, чтобы продолжить
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
