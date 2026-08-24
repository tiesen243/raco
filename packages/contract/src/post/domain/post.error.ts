import { Schema } from 'effect'

import { ApiResponseSchema } from '@/schema'

export class PostNotFound extends Schema.TaggedError<PostNotFound>()(
  'post/domain/PostNotFound',
  ApiResponseSchema({
    status: 404,
    message: 'Post not found',
  }),
  { httpApiStatus: 404 }
) {}
