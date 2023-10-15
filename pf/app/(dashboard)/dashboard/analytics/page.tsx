import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function AnalyticsPage() {
  return (
    <>
      <h1 className="text-2xl justify-center">analytics</h1>
      <Link href="/">
        <Button>go to homepage</Button>
      </Link>
    </>
  )
}
