import * as Schema from 'effect/Schema'

import { PostSchema } from '@/post/domain/post.schema'
import { ApiResponseSchema } from '@/schema'

export class ListPostsDto extends Schema.TaggedClass<ListPostsDto>()(
  'post/dto/ListPostsDto',
  ApiResponseSchema({
    dataSchema: Schema.Array(PostSchema),
  })
) {}

export namespace ListPostsDto {
  export const Input = Schema.Struct({
    query: Schema.optional(Schema.String),
  })
  export type Input = typeof Input.Type

  export const Output = ListPostsDto.fields.data
  export type Output = typeof Output.Type
}
