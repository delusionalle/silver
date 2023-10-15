import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-2xl justify-center">settings</h1>
      <Link href="/">
        <Button>go to homepage</Button>
      </Link>
    </>
  )
}
