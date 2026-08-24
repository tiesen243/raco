import Api from '@raco/api'
import * as Alchemy from 'alchemy'
import * as Cloudflare from 'alchemy/Cloudflare'
import * as Effect from 'effect/Effect'

export default Alchemy.Stack(
  'raco',
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const api = yield* Api
    const web = yield* Cloudflare.Website.Vite('web', {
      rootDir: '../../apps/web',
      compatibility: { flags: ['nodejs_compat'] },
      viteEnvironments: {
        entry: 'rsc',
        children: ['ssr'],
      },
      env: {
        VITE_API_URL: api.url.as<string>(),
      },
    })

    return {
      api: api.url,
      web: web.url,
    }
  })
)
