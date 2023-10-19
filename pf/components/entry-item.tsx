import Link from 'next/link'
import { Entry, Prisma } from '@prisma/client'

import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface EntryItemProps {
  entry: Pick<Entry, 'id' | 'createdAt' | 'data'>
}

export function EntryItem({ entry }: EntryItemProps) {
  const data: Prisma.JsonArray[] = entry.data as Prisma.JsonArray[]

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <a className="font-semibold hover:underline">
          ID в базе: {entry.id} | ID поставщика: {data[0][1]?.toString()} | ID
          материала: {data[1][1]?.toString()}
        </a>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(entry.createdAt?.toDateString())} -{' '}
            {entry.createdAt?.toLocaleTimeString()}
          </p>
          <>
            {data[41][1] == 0 ? (
              <Badge>Вовремя</Badge>
            ) : (
              <Badge variant="destructive">Вероятен срыв</Badge>
            )}
          </>
        </div>
      </div>
    </div>
  )
}

EntryItem.Skeleton = function EntryItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
