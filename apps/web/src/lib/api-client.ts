import { Api } from '@raco/contract'
import * as Context from 'effect/Context'
import * as Function from 'effect/Function'
import * as Layer from 'effect/Layer'
import * as FetchHttpClient from 'effect/unstable/http/FetchHttpClient'
import * as HttpClient from 'effect/unstable/http/HttpClient'
import * as HttpClientRequest from 'effect/unstable/http/HttpClientRequest'
import * as HttpApiClient from 'effect/unstable/httpapi/HttpApiClient'

export class ApiClient extends Context.Service<
  ApiClient,
  HttpApiClient.ForApi<typeof Api>
>()('ApiClient', {
  make: HttpApiClient.make(Api, {
    transformClient: (client) =>
      client.pipe(
        HttpClient.mapRequest(
          Function.flow(
            HttpClientRequest.prependUrl(import.meta.env.VITE_API_URL ?? ''),
            HttpClientRequest.acceptJson
          )
        ),
        HttpClient.filterStatusOk
      ),
  }),
}) {
  public static readonly layer = Layer.effect(this, this.make).pipe(
    Layer.provide(FetchHttpClient.layer)
  )
}
