import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl">dashboard</h1>
      <Link href="/">
        <Button>go to homepage</Button>
      </Link>
    </>
  )
}
