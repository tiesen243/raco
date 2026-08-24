import * as Cloudflare from 'alchemy/Cloudflare'
import * as Effect from 'effect/Effect'
import * as HttpRouter from 'effect/unstable/http/HttpRouter'

import { bootstrap } from '@/bootstrap'

export default Cloudflare.Worker(
  'api',
  { main: import.meta.url },
  Effect.gen(function* () {
    return {
      fetch: yield* HttpRouter.toHttpEffect(
        bootstrap()
      ) as Effect.Effect<never>,
    }
  }).pipe(Effect.provide(Cloudflare.Hyperdrive.ConnectBinding))
)
