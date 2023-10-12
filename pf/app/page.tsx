import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-between p-24">
      <Link href="/login" className="p-5">
        <Button>login</Button>
      </Link>
      <Link href="/register" className="p-5">
        <Button>register</Button>
      </Link>
      <Link href="/dashboard" className="p-5">
        <Button>dashboard</Button>
      </Link>
    </main>
  )
}
