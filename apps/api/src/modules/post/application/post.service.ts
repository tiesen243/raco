import type { PostNotFound } from '@raco/contract/post/domain/post.error'
import type { ListPostsDto } from '@raco/contract/post/dto/list-posts.dto'
import type { ShowPostDto } from '@raco/contract/post/dto/show-post.dto'

import { CreatePostDto } from '@raco/contract/post/dto/create-post.dto'
import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'

export class PostService extends Context.Service<
  PostService,
  {
    readonly list: (
      input: ListPostsDto.Input
    ) => Effect.Effect<ListPostsDto.Output>

    readonly show: (
      input: ShowPostDto.Input
    ) => Effect.Effect<ShowPostDto.Output, PostNotFound>

    readonly create: (
      input: CreatePostDto.Input
    ) => Effect.Effect<CreatePostDto.Output>
  }
>()('post/application/PostService') {}
