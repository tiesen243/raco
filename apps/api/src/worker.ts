import * as BunHttpPlatform from '@effect/platform-bun/BunHttpPlatform'
import * as Cloudflare from 'alchemy/Cloudflare'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import * as HttpRouter from 'effect/unstable/http/HttpRouter'

import { bootstrap } from '@/bootstrap'

export default Cloudflare.Worker(
  'api',
  { main: import.meta.url, dev: { port: 3000 } },
  Effect.gen(function* () {
    return {
      fetch: yield* HttpRouter.toHttpEffect(
        bootstrap().pipe(
          Layer.provide(BunHttpPlatform.layer),
          Layer.provide(
            HttpRouter.cors({
              allowedOrigins: ['*'],
              allowedMethods: ['GET', 'POST', 'OPTIONS'],
              allowedHeaders: ['Content-Type'],
            })
          )
        )
      ) as Effect.Effect<never>,
    }
  })
)
