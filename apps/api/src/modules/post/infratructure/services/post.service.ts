import { PostNotFound } from '@raco/contract/post/domain/post.error'
import { PostId, PostSchema } from '@raco/contract/post/domain/post.schema'
import * as Crypto from 'effect/Crypto'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import * as Ref from 'effect/Ref'

import { PostService } from '@/modules/post/application/post.service'

export const PostServiceLayer = Layer.effect(
  PostService,
  Effect.gen(function* () {
    const posts = yield* Ref.make<Map<PostId, PostSchema>>(new Map())
    const crypto = yield* Crypto.Crypto

    return PostService.of({
      list: () => Ref.get(posts).pipe(Effect.map((dict) => [...dict.values()])),

      show: Effect.fn(function* (input) {
        const dict = yield* Ref.get(posts)
        const post = dict.get(input.id)

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

        const dict = yield* Ref.get(posts)
        yield* Ref.set(posts, dict.set(id, post))

        return post
      }),
    })
  })
)
