import * as Cloudflare from 'alchemy/Cloudflare'
import * as Drizzle from 'alchemy/Drizzle/Postgres'
import * as Effect from 'effect/Effect'

import { Hyperdrive } from '@/shared/infrastructure/persistent/drizzle/drizzle.config'

export const DrizzleClient = Effect.gen(function* () {
  const conn = yield* Cloudflare.Hyperdrive.Connect(Hyperdrive)
  return yield* Drizzle.Postgres(conn.connectionString)
})
