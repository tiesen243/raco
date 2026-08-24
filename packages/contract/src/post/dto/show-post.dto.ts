import * as Schema from 'effect/Schema'

import { PostSchema } from '@/post/domain/post.schema'
import { ApiResponseSchema } from '@/schema'

export class ShowPostDto extends Schema.TaggedClass<ShowPostDto>()(
  'post/dto/ShowPostDto',
  ApiResponseSchema({
    dataSchema: PostSchema,
  })
) {}

export namespace ShowPostDto {
  export const Input = Schema.Struct({
    id: PostSchema.fields.id,
  })
  export type Input = typeof Input.Type

  export const Output = ShowPostDto.fields.data
  export type Output = typeof Output.Type
}
