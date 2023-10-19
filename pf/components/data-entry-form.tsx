'use client'

import { redirect, RedirectType, useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const filenameExtensionRegex = /(?:\.([^.]+))?$/

const formSchema = z.object({
  file: z.custom<File>(),
})

export function DataEntryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  })

  const router = useRouter()
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('file', data.file)

    const json = await fetch('http://localhost:3000/api/predict', {
      method: 'POST',
      body: formData,
    }).then((r) => r.json())

    router.push('/dashboard')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-6 ml-6 mb-6">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Файл</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Принимает файлы типа CSV, XLS, XLSX.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Загрузить</Button>
        </div>
      </form>
    </Form>
  )
}
