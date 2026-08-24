import { Api } from '@raco/contract'
import { CreatePostDto } from '@raco/contract/post/dto/create-post.dto'
import { ListPostsDto } from '@raco/contract/post/dto/list-posts.dto'
import { ShowPostDto } from '@raco/contract/post/dto/show-post.dto'
import * as Effect from 'effect/Effect'
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder'

import { PostService } from '@/modules/post/application/post.service'

export const PostHttp = HttpApiBuilder.group(Api, 'post', (handlers) =>
  handlers

    .handle('list', ({ query }) =>
      PostService.use((s) => s.list(query)).pipe(
        Effect.map((data) => ListPostsDto.make({ data }))
      )
    )

    .handle('show', ({ params }) =>
      PostService.use((s) => s.show(params)).pipe(
        Effect.map((data) => ShowPostDto.make({ data }))
      )
    )

    .handle('create', ({ payload }) =>
      PostService.use((s) => s.create(payload)).pipe(
        Effect.map((data) => CreatePostDto.make({ data }))
      )
    )
)
