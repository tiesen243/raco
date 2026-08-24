import * as BunServices from '@effect/platform-bun/BunServices'
import * as Layer from 'effect/Layer'
import * as Etag from 'effect/unstable/http/Etag'
import * as HttpRouter from 'effect/unstable/http/HttpRouter'

import { bootstrap } from '@/bootstrap'

const { handler } = HttpRouter.toWebHandler(
  bootstrap().pipe(Layer.provide([Etag.layer, BunServices.layer]))
)

export default {
  fetch: handler,
}
