import type { PostId } from '@raco/contract/post/domain/post.schema'

import { snakeCase } from 'drizzle-orm/pg-core'

export const posts = snakeCase.table('posts', (t) => ({
  id: t.uuid().primaryKey().$type<PostId>(),
  title: t.text().notNull(),
  content: t.text().notNull(),
}))
