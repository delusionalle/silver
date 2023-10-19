'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function WipeDbButton() {
  const router = useRouter()

  const handleWipeDb = async () => {
    await fetch('http://localhost:3000/api/wipedb', { method: 'POST' })
    router.refresh()
  }

  return (
    <Button onSubmit={handleWipeDb} variant="destructive" asChild>
      <Link href="/api/wipedb">Удалить сохраненные данные </Link>
    </Button>
  )
}
