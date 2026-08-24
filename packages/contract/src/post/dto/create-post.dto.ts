import * as Schema from 'effect/Schema'

import { PostSchema } from '@/post/domain/post.schema'
import { ApiResponseSchema } from '@/schema'

export class CreatePostDto extends Schema.TaggedClass<CreatePostDto>()(
  'post/dto/CreatePostDto',
  ApiResponseSchema({
    dataSchema: PostSchema,
  })
) {}

export namespace CreatePostDto {
  export const Input = Schema.Struct({
    title: PostSchema.fields.title,
    content: PostSchema.fields.content,
  })
  export type Input = typeof Input.Type

  export const Output = CreatePostDto.fields.data
  export type Output = typeof Output.Type
}
