import { Effect } from 'effect'
import { Form, useNavigation } from 'react-router'

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
import { ApiClient } from '@/lib/api-client'
import { runtime } from '@/lib/runtime'

import type { Route } from './+types/_index'

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { searchParams } = new URL(request.url)

  const program = Effect.gen(function* () {
    const api = yield* ApiClient

    const query = searchParams.get('query') ?? ''
    return yield* api.post.list({ query: { query } })
  })

  const response = await runtime.runPromise(program)
  return response.data
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()

  const program = Effect.gen(function* () {
    const api = yield* ApiClient

    return yield* api.post.create({
      payload: {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
      },
    })
  })

  const response = await runtime.runPromise(program)
  return response.data
}

export default function IndexPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const posts = loaderData ?? []

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

        <Form method='post' className='lg:col-span-5'>
          <h3 className='sr-only'>Create Post section</h3>

          <FieldSet disabled={isSubmitting}>
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
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Publishing...' : 'Create Post'}
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </Form>

        <section className='lg:col-span-7 grid gap-4 list-none p-0'>
          <h3 className='sr-only'>Post List section</h3>

          {posts.length === 0 ? (
            <Card className='p-8 text-center text-muted-foreground'>
              No posts found. Be the first to create one!
            </Card>
          ) : (
            posts.map((post) => (
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
        </section>
      </section>
    </main>
  )
}
