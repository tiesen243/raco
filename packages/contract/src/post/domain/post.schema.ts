import * as Schema from 'effect/Schema'

export const PostId = Schema.String.pipe(Schema.brand('post/domain/PostId'))
export type PostId = typeof PostId.Type

export const PostSchema = Schema.Struct({
  id: PostId,
  title: Schema.String,
  content: Schema.String,
})
export type PostSchema = typeof PostSchema.Type
