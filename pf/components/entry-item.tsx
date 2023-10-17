import Link from 'next/link'
import { Entry } from '@prisma/client'

import { formatDate } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface EntryItemProps {
  entry: Pick<Entry, 'id' | 'createdAt'>
}

export function EntryItem({ entry }: EntryItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${entry.id}`}
          className="font-semibold hover:underline"
        >
          {entry.id}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(entry.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      {/*<PostOperations post={{ id: post.id, title: post.title }} />*/}
    </div>
  )
}

EntryItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
