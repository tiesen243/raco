import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint'
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup'

import { PostNotFound } from '@/post/domain/post.error'
import { CreatePostDto } from '@/post/dto/create-post.dto'
import { ListPostsDto } from '@/post/dto/list-posts.dto'
import { ShowPostDto } from '@/post/dto/show-post.dto'

export class PostGroup extends HttpApiGroup.make('post')
  .add(
    HttpApiEndpoint.get('list', '/', {
      query: ListPostsDto.Input,
      success: ListPostsDto,
    })
  )
  .add(
    HttpApiEndpoint.get('show', '/:id', {
      params: ShowPostDto.Input,
      success: ShowPostDto,
      error: [PostNotFound],
    })
  )

  .add(
    HttpApiEndpoint.post('create', '/', {
      payload: CreatePostDto.Input,
      success: CreatePostDto,
    })
  )

  .prefix('/api/posts') {}
