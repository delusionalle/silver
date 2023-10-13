import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 justify-evenly">
      <h1>dashboard</h1>
      <Link href="/">
        <Button>button</Button>
      </Link>
    </main>
  )
}
