import { PostNotFound } from '@raco/contract/post/domain/post.error'
import { PostId, PostSchema } from '@raco/contract/post/domain/post.schema'
import { eq } from 'drizzle-orm'
import * as Crypto from 'effect/Crypto'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

import { PostService } from '@/modules/post/application/post.service'
import { posts } from '@/modules/post/infratructure/persistent/drizzle/schema'
import { DrizzleClient } from '@/shared/infrastructure/persistent/drizzle/drizzle.client'

export const PostServiceLayer = Layer.effect(
  PostService,
  Effect.gen(function* () {
    const crypto = yield* Crypto.Crypto
    const db = yield* DrizzleClient

    return PostService.of({
      list: () => db.select().from(posts).pipe(Effect.orDie),

      show: Effect.fn(function* (input) {
        const [post] = yield* db
          .select()
          .from(posts)
          .where(eq(posts.id, input.id))
          .limit(1)
          .pipe(Effect.orDie)

        if (!post) return yield* Effect.fail(new PostNotFound())
        return post
      }),

      create: Effect.fn(function* (input) {
        const id = PostId.make(yield* crypto.randomUUIDv7.pipe(Effect.orDie))

        const post = PostSchema.make({
          id,
          title: input.title,
          content: input.content,
        })

        yield* db.insert(posts).values(post).pipe(Effect.orDie)

        return post
      }),
    })
  })
)
