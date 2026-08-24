import * as HttpRouter from 'effect/unstable/http/HttpRouter'

import { bootstrap } from '@/bootstrap'

const { handler } = HttpRouter.toWebHandler(bootstrap())

export default {
  fetch: handler,
}
