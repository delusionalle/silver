'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isDiscordLoading, setIsDiscordLoading] = React.useState<boolean>(false)
  const [isGithubLoading, setIsGithubLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {/*<div className="relative">*/}
      {/*  <div className="absolute inset-0 flex items-center">*/}
      {/*    <span className="w-full border-t" />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<button*/}
      {/*  type="button"*/}
      {/*  className={cn(buttonVariants({ variant: 'outline' }))}*/}
      {/*  onClick={() => {*/}
      {/*    setIsDiscordLoading(true)*/}
      {/*    signIn('discord')*/}
      {/*  }}*/}
      {/*  disabled={*/}
      {/*    isLoading || isDiscordLoading || isGithubLoading || isGoogleLoading*/}
      {/*  }*/}
      {/*>*/}
      {/*  {isDiscordLoading ? (*/}
      {/*    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/}
      {/*  ) : (*/}
      {/*    <Icons.discord className="mr-2 h-4 w-4" />*/}
      {/*  )}*/}
      {/*  {'    '}*/}
      {/*  Discord*/}
      {/*</button>*/}
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsGithubLoading(true)
          signIn('github')
        }}
        disabled={
          isLoading || isDiscordLoading || isGithubLoading || isGoogleLoading
        }
      >
        {isGithubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHubSmall className="mr-2 h-4 w-4" />
        )}
        {'    '}
        GitHub
      </button>
      {/*<button*/}
      {/*  type="button"*/}
      {/*  className={cn(buttonVariants({ variant: 'outline' }))}*/}
      {/*  onClick={() => {*/}
      {/*    setIsGoogleLoading(true)*/}
      {/*    signIn('google')*/}
      {/*  }}*/}
      {/*  disabled={*/}
      {/*    isLoading || isDiscordLoading || isGithubLoading || isGoogleLoading*/}
      {/*  }*/}
      {/*>*/}
      {/*  {isGoogleLoading ? (*/}
      {/*    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/}
      {/*  ) : (*/}
      {/*    <Icons.google className="mr-2 h-4 w-4" />*/}
      {/*  )}*/}
      {/*  {'    '}*/}
      {/*  Google*/}
      {/*</button>*/}
    </div>
  )
}
