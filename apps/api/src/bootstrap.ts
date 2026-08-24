import * as BunHttpPlatform from '@effect/platform-bun/BunHttpPlatform'
import { Api } from '@raco/contract'
import * as Layer from 'effect/Layer'
import * as HttpRouter from 'effect/unstable/http/HttpRouter'
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder'
import * as HttpApiScalar from 'effect/unstable/httpapi/HttpApiScalar'
import * as OpenApi from 'effect/unstable/httpapi/OpenApi'

import { PostModule } from '@/modules/post/post.module'

import * as pkgJson from '../package.json'

export function bootstrap() {
  const postModule = PostModule.create()

  const apiLive = HttpApiBuilder.layer(Api, {
    openapiPath: '/openapi.json',
  }).pipe(Layer.provide([postModule.http]))

  const docsLive = HttpApiScalar.layer(
    Api.annotateMerge(
      OpenApi.annotations({
        title: pkgJson.name,
        version: pkgJson.version,
      })
    ),
    { path: '/docs', scalar: { theme: 'kepler' } }
  )

  return Layer.merge(apiLive, docsLive).pipe(
    Layer.provide(BunHttpPlatform.layer),
    Layer.provide(
      HttpRouter.cors({
        allowedOrigins: ['*'],
        allowedMethods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
      })
    )
  )
}
