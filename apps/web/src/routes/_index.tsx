import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/runtime'

import type { Route } from './+types/_index'

export default function IndexPage(_: Route.ComponentProps) {
  const { data, error, isLoading, refetch } = useQuery(
    api.post.list.queryOptions({ query: {} })
  )

  const { mutate, isPending } = useMutation({
    ...api.post.create.mutationOptions(),
    onSuccess: () => refetch(),
  })

  return (
    <main className='container mx-auto max-w-6xl p-4 md:p-8 space-y-8'>
      <header className='border-b pb-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Post Dashboard</h1>
        <p className='text-muted-foreground text-sm mt-1'>
          Create, manage, and view all published posts in one place.
        </p>
      </header>

      <section className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        <h2 className='sr-only'>Post section</h2>

        <form
          className='lg:col-span-5'
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            mutate({
              title: formData.get('title') as string,
              content: formData.get('content') as string,
            })
          }}
        >
          <h3 className='sr-only'>Create Post section</h3>

          <FieldSet disabled={isPending}>
            <FieldLegend>Create New Post</FieldLegend>
            <FieldDescription>
              Fill out the title and content below to publish a new post.
            </FieldDescription>

            <FieldGroup className='space-y-4'>
              <Field>
                <FieldLabel htmlFor='title'>Title</FieldLabel>
                <Input
                  id='title'
                  name='title'
                  placeholder='Enter post title...'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='content'>Content</FieldLabel>
                <Textarea
                  id='content'
                  name='content'
                  placeholder='Write your content here...'
                  rows={5}
                  required
                />
              </Field>

              <Field>
                <Button type='submit'>
                  {isPending ? 'Publishing...' : 'Create Post'}
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>

        <section className='lg:col-span-7 grid gap-4 list-none p-0'>
          <h3 className='sr-only'>Post List section</h3>

          {isLoading || data?.data.length === 0 ? (
            <Card className='p-8 text-center text-muted-foreground'>
              No posts found. Be the first to create one!
            </Card>
          ) : (
            data?.data.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>#{post.id}</CardDescription>
                </CardHeader>
                <CardContent className='whitespace-pre-wrap leading-relaxed'>
                  {post.content}
                </CardContent>
              </Card>
            ))
          )}
          {error && (
            <pre className='text-destructive'>
              {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </section>
      </section>
    </main>
  )
}
